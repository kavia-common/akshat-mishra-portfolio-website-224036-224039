import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";

/**
 * PUBLIC_INTERFACE
 * About section - brief bio and highlights.
 */
export function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="A short introduction about Akshat and his passion for building user-centered software."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="reveal-up">
          <p className="text-slate-700">
            I am a dedicated software developer with a strong focus on building scalable, user-centered applications. I enjoy solving real-world problems through clean architecture, performance optimization, and thoughtful design. With experience across the stack, I love turning ideas into reliable, impactful products.
          </p>
        </Card>
        <Card className="reveal-up" >
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Full-stack web development</li>
            <li>TypeScript, React, Node.js</li>
            <li>Performance and accessibility</li>
            <li>CI/CD and maintainable systems</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}
