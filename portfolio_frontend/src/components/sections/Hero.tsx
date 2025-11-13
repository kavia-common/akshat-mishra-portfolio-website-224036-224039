import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { socials } from "@/lib/content";
import Link from "next/link";
import { Section } from "@/components/common/Section";

/**
 * PUBLIC_INTERFACE
 * Hero - Intro section with profile, title, CTA buttons.
 */
export function Hero() {
  return (
    <Section
      id="home"
      alt
      title={undefined}
      subtitle={undefined}
    >
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
              <a href="#contact" aria-label="Email" className="text-slate-700 hover:text-slate-900">
                <Icon name="mail" />
              </a>
            )}
          </div>
        </div>
        <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
          <Image
            src="/profile.jpg"
            alt="Akshat Mishra portrait"
            fill
            className="rounded-full object-cover border border-slate-200 shadow-sm"
            sizes="192px"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
