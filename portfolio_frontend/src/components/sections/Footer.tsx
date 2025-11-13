import Link from "next/link";
import { socials } from "@/lib/content";
import { Icon } from "@/components/common/Icon";

/**
 * PUBLIC_INTERFACE
 * Footer - Site footer with socials and copyright.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="container-responsive py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} <span className="gradient-text font-semibold">Akshat Mishra</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
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
            <Link href="#contact" aria-label="Email" className="text-slate-700 hover:text-slate-900">
              <Icon name="mail" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
