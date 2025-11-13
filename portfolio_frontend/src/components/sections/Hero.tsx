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
      // Using Clipboard API (requires user gesture and may be blocked by Permissions Policy)
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Swallow and try fallback
  }

  // Fallback: use a hidden textarea and execCommand("copy")
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

    // Cleanup
    document.body.removeChild(textarea);
    if (prevRange && selection) {
      selection.removeAllRanges();
      selection.addRange(prevRange);
    }
    return ok;
  } catch {
    // Final failure: caller should show manual instructions
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
    // Explicitly called from a click handler to satisfy user gesture requirement
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
      // Clear hint after a short delay
      setTimeout(() => setCopyHint("idle"), 2000);
    } else {
      setCopyHint("manual");
    }
  }, []);

  return (
    <Section id="home" alt title={undefined} subtitle={undefined}>
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Akshat Mishra
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Software Developer building modern web applications with a focus on
            performance, accessibility, and clean code.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#projects">
              <Button rightIcon={<Icon name="arrow-right" />}>
                View Projects
              </Button>
            </Link>
            <a href="/resume.pdf" rel="noopener" className="btn-base btn-ghost">
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
                <a
                  href="#contact"
                  aria-label="Email via contact form"
                  className="sr-only"
                >
                  Contact
                </a>
              </>
            )}
          </div>
          {copyHint !== "idle" && (
            <p
              role="status"
              aria-live="polite"
              className={
                copyHint === "success"
                  ? "mt-2 text-sm text-green-600"
                  : "mt-2 text-sm text-slate-600"
              }
            >
              {copyHint === "success"
                ? "Email copied!"
                : "Copy blocked by browser. Press Ctrl/Cmd+C to copy from the email field or use the contact form."}
            </p>
          )}
        </div>
        <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
          <Image
            src="/profile.jpg"
            alt="Akshat Mishra portrait"
            fill
            className="rounded-full object-cover border border-slate-200 shadow-sm"
            sizes="192px"
            priority
            // Redundant due to next.config images.unoptimized, but safe per-component
            unoptimized
          />
        </div>
      </div>
    </Section>
  );
}
