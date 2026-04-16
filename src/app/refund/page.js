import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refund Policy - Fusion of Dried Nuts Private Limited',
  description: 'Refund, return, and exchange protocols for Fusion of Dried Nuts Private Limited.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-40 pb-24 px-4 sm:px-6 lg:px-8 w-full text-black">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Policy</h1>
            <p className="text-gray-500 font-medium">Fusion of Dried Nuts Private Limited Protocol</p>
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mt-1">Claims Registry Active</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            <p className="text-base leading-relaxed text-gray-800">
              Thank you for shopping with <strong>Fusion of Dried Nuts Private Limited</strong>. We value your satisfaction and strive to provide quality products. Please review our refund and return policy below regarding the Fusion of Dried Nuts ecosystem.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-01: Returns</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>We accept returns of products within 7 days of purchase.</li>
                <li>Items must be unused, in their original packaging, and in the same condition as received.</li>
                <li>To complete your return, we require a receipt or proof of purchase.</li>
              </ul>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded mt-4">
                <strong>Note: Certain items are non-returnable, including:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Perishable goods</li>
                  <li>Custom or made-to-order items</li>
                  <li>Personal care and hygiene products</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-02: Refunds</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.</li>
                <li>Approved refunds will be processed within 7 business days.</li>
                <li>A partial refund may be issued at our discretion for items that are not in their original condition, are damaged, or have missing parts for reasons not due to our error.</li>
                <li>Refunds will be issued through a method communicated to you at the time of approval.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-03: Exchanges</h2>
              <p className="text-base leading-relaxed text-gray-700">
                To initiate a return or exchange, please contact our customer support at <strong>Info@fusionofdriednutspvtltd.co.in</strong> or <strong>+91 73699 35610</strong>.
              </p>
              <p className="text-base leading-relaxed text-gray-700 mt-2">
                Alternatively, submit a return request. Our team will guide you through the process and provide necessary individual instructions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-04: Shipping Returns</h2>
              <p className="text-base leading-relaxed text-gray-700">
                You are responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-05: Exceptional Circumstances</h2>
              <p className="text-base leading-relaxed text-gray-700">
                We are not liable for any delays in processing returns, exchanges, or refunds caused by circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, government actions, or disruptions in transport or payment systems.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">RET-06: Governing Law</h2>
              <p className="text-base leading-relaxed text-gray-700">
                This Refund and Cancellation Policy shall be governed by and construed in accordance with the laws of India, including the Consumer Protection Act, 2019, and other applicable laws. Any disputes arising under or in connection with this policy shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.
              </p>
            </section>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Registry Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Support Portal Email:</strong> Info@fusionofdriednutspvtltd.co.in | fusionofdriednuts19pvtltd@gmail.com</p>
              <p><strong>Phone:</strong> +91 73699 35610</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-2">Official Address</h3>
              <p className="text-sm text-gray-600">
                1863 Rajdanga Main Road, E.K.T<br />
                Kolkata, WB - 700107
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Authenticated Registry | Global Ops Profile</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
