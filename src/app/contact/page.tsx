import ContactForm from "@/components/features/ContactForm";
import Card from "@/components/ui/Card";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <Card title="Email" description="example@batch-sample.dev">
            <p className="text-sm text-gray-500">We reply within 24 hours</p>
          </Card>
          <Card title="Office" description="Tokyo, Japan">
            <p className="text-sm text-gray-500">Mon - Fri, 9:00 - 18:00 JST</p>
          </Card>
          <Card title="Social" description="Follow us on social media">
            <div className="flex gap-4 text-blue-600">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">GitHub</a>
              <a href="#" className="hover:underline">LinkedIn</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
