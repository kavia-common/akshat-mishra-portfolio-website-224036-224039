import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { certificates } from "@/lib/content";

/**
 * PUBLIC_INTERFACE
 * Certificates - list of certifications.
 */
export function Certificates() {
  return (
    <Section
      id="certificates"
      title="Certificates"
      subtitle="Professional certifications and achievements."
      alt
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c) => (
          <Card key={`${c.name}-${c.issuer}`}>
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-slate-600">{c.issuer}</p>
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline mt-2 inline-block"
              >
                View certificate
              </a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
