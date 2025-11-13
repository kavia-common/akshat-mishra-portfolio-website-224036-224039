"use client";

import { Section } from "@/components/common/Section";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/common/Button";

/**
 * PUBLIC_INTERFACE
 * Contact - Contact form using Formspree by default; optional EmailJS via env.
 * Validates fields, includes a honeypot, and simple sessionStorage rate limit.
 */
export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [message, setMessage] = useState<string>("");

  const formspreeEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const emailJsConfig = useMemo(() => {
    const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const pubKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (service && template && pubKey) {
      return { service, template, pubKey };
    }
    return null;
  }, []);

  useEffect(() => {
    return () => {
      setStatus("idle");
      setMessage("");
    };
  }, []);

  const rateLimitKey = "contact_last_submit";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const last = sessionStorage.getItem(rateLimitKey);
    const now = Date.now();
    if (last && now - parseInt(last, 10) < 30_000) {
      setStatus("error");
      setMessage("Please wait a few seconds before sending another message.");
      return;
    }

    const fd = new FormData(formRef.current);

    if ((fd.get("company") as string)?.trim()) {
      setStatus("success");
      setMessage("Thanks! Your message has been received.");
      return;
    }

    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const subject = (fd.get("subject") as string)?.trim();
    const body = (fd.get("message") as string)?.trim();
    if (!name || !email || !body) {
      setStatus("error");
      setMessage("Name, email and message are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      if (emailJsConfig) {
        const payload = {
          service_id: emailJsConfig.service,
          template_id: emailJsConfig.template,
          user_id: emailJsConfig.pubKey,
          template_params: { name, email, subject, message: body },
        };
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Email service failed");
      } else {
        if (!formspreeEndpoint) {
          throw new Error(
            "Missing NEXT_PUBLIC_CONTACT_ENDPOINT. Please configure .env."
          );
        }
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(formRef.current),
          mode: "cors",
        });
        if (!res.ok) throw new Error("Form submission failed");
        const data = await res.json().catch(() => ({} as { ok?: boolean }));
        if (data?.ok === false) throw new Error("Form service returned error");
      }

      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      formRef.current.reset();
      sessionStorage.setItem(rateLimitKey, String(now));
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Have a question or want to collaborate? Send a message."
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="card p-6 grid gap-4"
        aria-describedby="contact-status"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input id="name" name="name" className="input mt-1" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input mt-1"
              required
              inputMode="email"
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input id="subject" name="subject" className="input mt-1" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea id="message" name="message" className="textarea mt-1" required />
        </div>
        {/* Honeypot field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="off" tabIndex={-1} />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </Button>
          {process.env.NEXT_PUBLIC_CONTACT_ENDPOINT && (
            <span className="text-xs text-slate-500">Secured by Formspree</span>
          )}
          {emailJsConfig && <span className="text-xs text-slate-500">Using EmailJS</span>}
        </div>
        <p
          id="contact-status"
          role="status"
          aria-live="polite"
          className={
            status === "error"
              ? "text-sm text-red-600"
              : status === "success"
              ? "text-sm text-green-600"
              : "text-sm text-slate-600"
          }
        >
          {message}
        </p>
      </form>
    </Section>
  );
}
