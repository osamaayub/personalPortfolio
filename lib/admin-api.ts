import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { isAdmin } from "@/lib/auth";
import { connectDb, isDbConfigured } from "@/lib/db";

/** Returns an error response if the caller cannot use the admin API, else null. */
export async function guard(): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "MONGODB_URI is not configured" }, { status: 503 });
  }
  try {
    await connectDb();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return NextResponse.json(
      { error: "Could not connect to MongoDB. Check MONGODB_URI and that your IP is allowed in Atlas." },
      { status: 503 },
    );
  }
  return null;
}

export const validId = (id: string) => mongoose.isValidObjectId(id);
