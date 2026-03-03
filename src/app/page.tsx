import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BatchSample
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A sample Next.js project for testing Claude Code /batch command
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">Learn More</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card title="Fast" description="Built with Next.js for optimal performance">
          <Badge color="green">Performance</Badge>
        </Card>
        <Card title="Scalable" description="Designed to grow with your needs">
          <Badge color="blue">Architecture</Badge>
        </Card>
        <Card title="Modern" description="Using the latest web technologies">
          <Badge color="yellow">Technology</Badge>
        </Card>
      </section>

      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to try /batch?
        </h2>
        <p className="text-gray-600 mb-6">
          This project has multiple pages and components perfect for batch operations.
        </p>
        <Button variant="primary">Explore the Code</Button>
      </section>
    </div>
  );
}
