"use client";

import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { socials } from "@/lib/content";
import Link from "next/link";
import { Section } from "@/components/common/Section";
import { useCallback, useState } from "react";

/**
 * Attempt to copy text to clipboard in a permission-policy safe way.
 * - Only runs on explicit user click (caller responsibility: call from onClick)
 * - Feature-detects navigator.clipboard.writeText
 * - Falls back to a temporary textarea + document.execCommand("copy")
 * - Returns true on success, false on failure (so UI can show manual-copy hint)
 */
// PUBLIC_INTERFACE
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Swallow and try fallback
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    textarea.style.left = "-1000px";
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const prevRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const ok = document.execCommand("copy");

    document.body.removeChild(textarea);
    if (prevRange && selection) {
      selection.removeAllRanges();
      selection.addRange(prevRange);
    }
    return ok;
  } catch {
    return false;
  }
}

/**
 * PUBLIC_INTERFACE
 * Hero - Intro section with profile, title, CTA buttons.
 */
export function Hero() {
  const [copyHint, setCopyHint] = useState<"idle" | "success" | "manual">("idle");

  const onCopyEmail = useCallback(async () => {
    const email = socials.email?.startsWith("mailto:")
      ? socials.email.replace(/^mailto:/i, "")
      : socials.email || "";

    if (!email) {
      setCopyHint("manual");
      return;
    }

    const ok = await safeCopyToClipboard(email);
    if (ok) {
      setCopyHint("success");
      setTimeout(() => setCopyHint("idle"), 2000);
    } else {
      setCopyHint("manual");
    }
  }, []);

  return (
    <Section id="home" alt title={undefined} subtitle={undefined}>
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 reveal-up">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
            <span className="block gradient-text">Akshat Mishra</span>
          </h1>
          <p className="mt-3 text-lg text-slate-700 accent-underline max-w-prose">
            Software Developer building modern web applications with a focus on performance,
            accessibility, and clean code.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#projects">
              <Button className="btn-primary hover-glow" rightIcon={<Icon name="arrow-right" />}>
                View Projects
              </Button>
            </Link>
            <a href="/resume.pdf" rel="noopener" className="btn-base btn-ghost hover-card">
              <Icon name="download" /> Download Resume
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-700 hover:text-slate-900"
              >
                <Icon name="github" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-700 hover:text-slate-900"
              >
                <Icon name="linkedin" />
              </a>
            )}
            {socials.email && (
              <>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="text-slate-700 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md inline-flex items-center gap-2"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  <Icon name="mail" />
                  <span className="sr-only">Copy email</span>
                </button>
                <a href="#contact" aria-label="Email via contact form" className="sr-only">
                  Contact
                </a>
              </>
            )}
          </div>
          {/* Removed technology stack badges under social links to meet UI request, layout spacer retained intentionally */}
          <div className="mt-6" />
          {copyHint !== "idle" && (
            <p
              role="status"
              aria-live="polite"
              className={
                copyHint === "success" ? "mt-2 text-sm text-green-600" : "mt-2 text-sm text-slate-600"
              }
            >
              {copyHint === "success"
                ? "Email copied!"
                : "Copy blocked by browser. Press Ctrl/Cmd+C to copy from the email field or use the contact form."}
            </p>
          )}
        </div>
        <div
          className="w-40 h-40 sm:w-56 sm:h-56 relative reveal-up"
          style={{ animationDelay: "120ms" } as React.CSSProperties}
        >
          <Image
            src="/profile.jpg"
            alt="Akshat Mishra portrait"
            fill
            className="rounded-[28px] object-cover border border-slate-200 shadow-sm hover-card hover-glow"
            sizes="224px"
            priority
            unoptimized
          />
        </div>
      </div>
    </Section>
  );
}
