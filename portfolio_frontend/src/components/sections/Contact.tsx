"use client";

import { Section } from "@/components/common/Section";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { getEnv } from "@/lib/utils";

/**
 * PUBLIC_INTERFACE
 * Contact - Contact form using Formspree by default; optional EmailJS via env.
 * Validates fields, includes a honeypot, does basic rate limiting, and provides
 * robust error handling with minimal debug logs in development.
 */
export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [message, setMessage] = useState<string>("");

  // Read env at runtime on the client. Only NEXT_PUBLIC_* keys are exposed.
  const formspreeEndpoint = getEnv("NEXT_PUBLIC_CONTACT_ENDPOINT");
  const emailJsConfig = useMemo(() => {
    const service = getEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
    const template = getEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
    const pubKey = getEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
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

  const log = (...args: unknown[]) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
      console.log("[ContactForm]", ...args);
    }
  };

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

    // Honeypot: if filled, silently succeed to avoid tipping off bots.
    const honey = (fd.get("company") as string | null)?.trim();
    if (honey) {
      log("Honeypot triggered; skipping network request.");
      setStatus("success");
      setMessage("Thanks! Your message has been received.");
      formRef.current.reset();
      sessionStorage.setItem(rateLimitKey, String(now));
      return;
    }

    const name = (fd.get("name") as string | null)?.trim() || "";
    const email = (fd.get("email") as string | null)?.trim() || "";
    const subject = (fd.get("subject") as string | null)?.trim() || "";
    const body = (fd.get("message") as string | null)?.trim() || "";
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
    log("Submitting form", { using: formspreeEndpoint ? "Formspree" : emailJsConfig ? "EmailJS" : "none" });

    try {
      // Prefer Formspree when configured
      if (formspreeEndpoint) {
        // Send as FormData; Formspree accepts URL-encoded or multipart. Accept header for JSON response.
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
          mode: "cors",
          // credentials left as omit; Formspree doesn't require cookies
        });

        const text = await res.text();
        type FormspreeResponse =
          | { ok?: boolean; errors?: Array<{ message?: string }>; message?: string }
          | Record<string, unknown>;
        let data: FormspreeResponse = {};
        try {
          data = text ? (JSON.parse(text) as FormspreeResponse) : {};
        } catch {
          // Non-JSON response; ignore
        }

        log("Formspree response", { status: res.status, ok: res.ok, data });
        // Formspree returns 200/ok:true or 422 errors.
        if (!res.ok || (typeof (data as { ok?: unknown }).ok === "boolean" && (data as { ok?: boolean }).ok === false)) {
          let detail = `HTTP ${res.status}`;
          const d = data as { message?: unknown; errors?: unknown };
          if (d && typeof d === "object") {
            if (typeof d.message === "string" && d.message) {
              detail = d.message;
            } else if (Array.isArray(d.errors) && d.errors.length > 0) {
              const first = d.errors[0] as { message?: unknown };
              if (first && typeof first.message === "string" && first.message) {
                detail = first.message;
              }
            }
          }
          throw new Error(`Form submission failed: ${detail}`);
        }
      } else if (emailJsConfig) {
        // Guard EmailJS path behind full config
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
          mode: "cors",
        });
        log("EmailJS response", { status: res.status, ok: res.ok });
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(`Email service failed ${res.status}: ${errText}`);
        }
      } else {
        // Neither configured: prevent submission and inform user
        setStatus("error");
        setMessage(
          "Contact is not configured. Please set NEXT_PUBLIC_CONTACT_ENDPOINT (Formspree) or EmailJS keys."
        );
        log("Missing configuration", {
          NEXT_PUBLIC_CONTACT_ENDPOINT: formspreeEndpoint,
          hasEmailJs: false,
        });
        return;
      }

      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      formRef.current.reset();
      sessionStorage.setItem(rateLimitKey, String(now));
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong. Please try again later.";
      log("Submission error", msg);
      setStatus("error");
      setMessage(msg);
    }
  };

  const usingFormspree = Boolean(formspreeEndpoint);
  const usingEmailJs = Boolean(!usingFormspree && emailJsConfig);

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
        {/* Honeypot field (hidden to humans) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="off" tabIndex={-1} />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </Button>
          {usingFormspree && (
            <span className="text-xs text-slate-500">Secured by Formspree</span>
          )}
          {usingEmailJs && <span className="text-xs text-slate-500">Using EmailJS</span>}
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
