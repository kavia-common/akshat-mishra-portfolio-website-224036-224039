import { Section } from "@/components/common/Section";
import { Badge } from "@/components/common/Badge";
import { skills } from "@/lib/content";

/**
 * PUBLIC_INTERFACE
 * Skills - grouped skill badges.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with."
      alt
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group) => (
          <div key={group.category} className="card p-5">
            <h3 className="font-semibold">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} color="success">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
