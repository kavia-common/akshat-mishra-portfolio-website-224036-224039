import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { education } from "@/lib/content";

/**
 * PUBLIC_INTERFACE
 * Education - academic background.
 */
export function Education() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic qualifications and coursework."
    >
      <div className="grid gap-4">
        {education.map((e) => (
          <Card key={`${e.institution}-${e.degree}`} as="article" className="reveal-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold gradient-text">{e.institution}</h3>
              <p className="text-sm text-slate-600">{e.period}</p>
            </div>
            <p className="text-slate-700 mt-1">{e.degree}</p>
            {e.details && <p className="text-slate-600 mt-2">{e.details}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
}
