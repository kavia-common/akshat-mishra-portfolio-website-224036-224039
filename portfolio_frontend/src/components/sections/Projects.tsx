import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { projects } from "@/lib/content";

/**
 * PUBLIC_INTERFACE
 * Projects - grid of featured projects with accessible cards, media area, and clear hierarchy.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected projects highlighting engineering and problem-solving."
    >
      {/* Responsive grid: 1 column on mobile, 2 on small/medium, 3 on large+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p) => {
          const primaryLink = p.demo || p.repo;
          const hasBoth = !!(p.demo && p.repo);
          return (
            <Card
              key={p.title}
              hover
              as="article"
              className="group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-white"
            >
              {/* Media/thumbnail placeholder for consistent height and visual balance */}
              <div
                className="relative overflow-hidden rounded-md bg-gradient-to-br from-blue-50 to-cyan-50 border border-slate-200 h-36 sm:h-40"
                aria-hidden="true"
              >
                {/* Decorative gradient stripes */}
                <div className="absolute inset-0 opacity-70">
                  <div className="absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rotate-12 bg-gradient-to-tr from-blue-200/50 to-fuchsia-200/40 blur-2xl" />
                  <div className="absolute right-0 -bottom-6 h-28 w-28 -rotate-6 bg-gradient-to-tr from-cyan-200/50 to-blue-200/40 blur-xl" />
                </div>
                {/* Subtle icon watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center justify-center text-blue-400/40">
                    <Icon name="github" />
                  </span>
                </div>
              </div>

              {/* Content area: title > role/meta > description */}
              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold tracking-tight gradient-text">
                    {p.title}
                  </h3>
                  {/* External links compact area for quick access; also duplicated in CTA below for prominence */}
                  <div className="flex items-center gap-2">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label={`Open live demo for ${p.title}`}
                        title="Live demo"
                      >
                        <Icon name="external" />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label={`Open source code repository for ${p.title}`}
                        title="Source code"
                      >
                        <Icon name="github" />
                      </a>
                    )}
                  </div>
                </div>

                {/* A subtle 'role/meta' line could be inserted here in future without changing data */}
                <p className="text-slate-700 mt-2">{p.description}</p>

                {/* Enhanced tags: wrap and spacing */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Badge
                      key={s}
                      color="primary"
                      className="!text-[0.72rem] !font-semibold"
                    >
                      {/* bullet dot to enhance scan-ability */}
                      <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {s}
                    </Badge>
                  ))}
                </div>

                {/* Prominent CTA with icon; keyboard reachable and descriptive */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {primaryLink && (
                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="primary"
                        rightIcon={<Icon name="external" />}
                        aria-label={`View ${p.demo ? "Live" : "Repository"} for ${p.title}`}
                      >
                        {p.demo ? "View Live" : "View Repo"}
                      </Button>
                    </a>
                  )}
                  {hasBoth && p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="ghost"
                        rightIcon={<Icon name="github" />}
                        aria-label={`Open GitHub repository for ${p.title}`}
                      >
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
