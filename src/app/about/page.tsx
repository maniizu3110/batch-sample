import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const team = [
  { name: "Alice", role: "Frontend Developer", skill: "React" },
  { name: "Bob", role: "Backend Developer", skill: "Node.js" },
  { name: "Charlie", role: "Designer", skill: "Figma" },
  { name: "Diana", role: "DevOps Engineer", skill: "AWS" },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We build sample applications to demonstrate the power of modern development tools.
          This project specifically showcases how Claude Code /batch command can transform
          codebases efficiently.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} title={member.name} description={member.role}>
              <Badge color="blue">{member.skill}</Badge>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
