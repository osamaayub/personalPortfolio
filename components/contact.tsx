"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "./section-heading";
import SubmitBtn from "./submit-btn";
import { useSectionInView } from "@/hooks/hooks";


const USE_MOCK_API = false;

const Contact = () => {
  const { ref } = useSectionInView("Contact");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const senderEmail = (form.elements.namedItem("senderEmail") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      let result;

      if (USE_MOCK_API) {
       
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        result = { success: true, data: { id: "mock-email" } };
      } else {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ senderEmail, message }),
        });

        try {
          result = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        if (!response.ok) throw new Error(result.error || "Something went wrong");
      }

      toast.success("Email sent successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send email");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:osama.ayubwebdev@gmail.com">
          osama.ayubwebdev@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form className="mt-10 flex flex-col dark:text-black" onSubmit={handleSubmit}>
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
          disabled={submitting}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
          disabled={submitting}
        />
        <SubmitBtn disabled={submitting} />
      </form>
    </motion.section>
  );
};

export default Contact;
