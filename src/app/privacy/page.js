import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy - Fusion of Dried Nuts Private Limited',
  description: 'Privacy Policy and data collection guidelines for Fusion of Dried Nuts Private Limited.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-40 pb-24 px-4 sm:px-6 lg:px-8 w-full text-black">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500 font-medium">Fusion of Dried Nuts Private Limited Registry</p>
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mt-1">Security Protocol Active</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            <p className="text-base leading-relaxed text-gray-800">
              <strong>Fusion of Dried Nuts Private Limited</strong> is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">01. Information We Collect</h2>
              <p className="text-base leading-relaxed text-gray-700">We may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other details you provide during checkout, account registration, or service requests.</li>
                <li><strong>Payment Information:</strong> We do not store your payment card details. Payments are processed securely through third-party payment gateways in accordance with their privacy policies.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">02. How We Use Your Information</h2>
              <p className="text-base leading-relaxed text-gray-700">We use the collected information to:</p>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Process and fulfil orders and deliver services.</li>
                <li>Communicate with you about your orders, inquiries, or other requests.</li>
                <li>Improve our website, products, and services.</li>
                <li>Send promotional emails or newsletters, if you have opted in.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">03. Sharing Your Information</h2>
              <p className="text-base leading-relaxed text-gray-700">We do not sell or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website, processing payments, delivering products, or servicing you.</li>
                <li><strong>Legal Requirements:</strong> If required by law, we may disclose your information to comply with legal obligations or protect our legal rights.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">04. Data Security</h2>
              <p className="text-base leading-relaxed text-gray-700">
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">05. Data Retention</h2>
              <p className="text-base leading-relaxed text-gray-700">
                We retain your personal information only for as long as necessary to fulfil the purposes described in this policy or to comply with legal and regulatory requirements. After that, the data is securely deleted or anonymized.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">06. Changes to This Policy</h2>
              <p className="text-base leading-relaxed text-gray-700">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">07. Your Rights</h2>
              <p className="text-base leading-relaxed text-gray-700">
                You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <strong>Info@fusionofdriednutspvtltd.co.in</strong>. We will respond within 7 business days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">08. Your Privacy Matters to Us</h2>
              <p className="text-base leading-relaxed text-gray-700">
                In accordance with the Information Technology Act, 2000 and applicable rules, we are committed to addressing any concerns or feedback you may have regarding this Privacy Policy or the handling of your personal information.
              </p>
            </section>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Official Contact Point</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> Info@fusionofdriednutspvtltd.co.in | fusionofdriednuts19pvtltd@gmail.com</p>
              <p><strong>Phone:</strong> +91 73699 35610</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-2">Corporate Address</h3>
              <p className="text-sm text-gray-600">
                Block- GD, 1st Floor, 1863 Rajdanga Main Road, E.K.T<br />
                Kolkata, Kol-700107 West Bengal
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
