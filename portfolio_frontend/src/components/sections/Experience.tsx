import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { experience } from "@/lib/content";
import { Icon } from "@/components/common/Icon";

/**
 * PUBLIC_INTERFACE
 * Experience - timeline-like list of roles.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional roles and responsibilities."
      alt
    >
      <div className="grid gap-4">
        {experience.map((role) => (
          <Card as="article" hover key={`${role.company}-${role.title}`} className="reveal-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold gradient-text">{role.title}</h3>
              <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm text-slate-600">
                <Icon name="calendar" />
                <span>{role.period}</span>
              </div>
            </div>
            <p className="text-slate-600 mt-1">{role.company} · {role.location}</p>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-1">
              {role.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {role.stack.map((s) => (
                <Badge key={s} color="secondary">
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
