import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Icon } from "@/components/common/Icon";
import { projects } from "@/lib/content";

/**
 * PUBLIC_INTERFACE
 * Projects - grid of featured projects.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected projects highlighting engineering and problem-solving."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <Card key={p.title} hover as="article">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold gradient-text">{p.title}</h3>
              <div className="flex items-center gap-2">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-slate-900"
                    aria-label="Live demo"
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
                    className="text-slate-700 hover:text-slate-900"
                    aria-label="Source code"
                    title="Source code"
                  >
                    <Icon name="github" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-slate-700 mt-2">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Badge key={s} color="primary">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
