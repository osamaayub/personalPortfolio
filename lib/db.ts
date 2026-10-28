import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

// Reuse one connection across hot reloads and warm serverless invocations.
const globalCache = globalThis as unknown as { _mongoose?: Cache };
const cache: Cache = (globalCache._mongoose ??= { conn: null, promise: null });

export const isDbConfigured = Boolean(uri);

export async function connectDb() {
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (cache.conn) return cache.conn;

  cache.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
