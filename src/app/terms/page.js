import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Terms & Conditions - Fusion of Dried Nuts Private Limited',
  description: 'Website Terms of Use and Governance for Fusion of Dried Nuts Private Limited.',
};

export default function TermsPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-40 pb-24 px-4 sm:px-6 lg:px-8 w-full text-black">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-gray-500 font-medium">Fusion of Dried Nuts Private Limited Governance</p>
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mt-1">Legal Protocol Active</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Electronic Record / IT Act 2000</h2>
              <p className="text-base leading-relaxed text-gray-800">
                This document is an electronic record generated under the provisions of the Information Technology Act, 2000 and the applicable rules. Published in line with Rule 3(1) of the IT (Intermediaries Guidelines) Rules, 2011, which mandates the publication of the website’s terms of use and privacy policy for user interaction on <strong>fusionofdriednuts.co.in</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-01: Introduction</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>By using our website, you accept these terms and conditions in full; accordingly, if you disagree, you must not use our website.</li>
                <li>Registration or service usage requires express agreement to these terms.</li>
                <li>You warrant and represent that you are at least 18 years of age.</li>
                <li>Consent to cookie usage is implied as per our Privacy Policy.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-02: Acceptable Use</h2>
              <p className="text-base leading-relaxed text-gray-700">You must not:</p>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Cause damage or impairment to platform accessibility.</li>
                <li>Engage in unlawful, fraudulent, or harmful activities.</li>
                <li>Distribute spyware, viruses, or malicious software.</li>
                <li>Conduct automated data collection/scraping without consent.</li>
                <li>Use data for unauthorized direct marketing activities.</li>
                <li>Inhibit or restrict others&apos; enjoyment of the site.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-03: User Accounts</h2>
              <p className="text-base leading-relaxed text-gray-700">
                You are responsible for account confidentiality. We reserve the right to suspend, edit, or cancel accounts at our sole discretion without notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-04: Product Information</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Descriptions and pricing are provided for accuracy but not guaranteed. We reserve the right to correct errors and update information without prior notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-06: Intellectual Property</h2>
              <p className="text-base leading-relaxed text-gray-700">
                All content — including text, images, graphics, and logos — is owned or licensed by <strong>Fusion of Dried Nuts Private Limited</strong>. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">T&C-11: Governing Law</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Interpreted in accordance with the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.
              </p>
            </section>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Contact Protocol</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> Info@fusionofdriednutspvtltd.co.in | fusionofdriednuts19pvtltd@gmail.com</p>
              <p><strong>Phone:</strong> +91 73699 35610</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-2">Headquarters</h3>
              <p className="text-sm text-gray-600">
                1863 Rajdanga Main Road, E.K.T<br />
                Kolkata, WB - 700107
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
