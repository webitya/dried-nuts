import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping Policy - Fusion of Dried Nuts Private Limited',
  description: 'Shipping, delivery, and logistics policies for Fusion of Dried Nuts Private Limited.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-40 pb-24 px-4 sm:px-6 lg:px-8 w-full text-black">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Policy</h1>
            <p className="text-gray-500 font-medium">Fusion of Dried Nuts Private Limited Logistics</p>
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mt-1">Logistics Registry Active</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            <p className="text-base leading-relaxed text-gray-800">
              At <strong>Fusion of Dried Nuts Private Limited</strong> (“we,” “our,” or “us”), we strive to deliver your orders safely and on time. This Shipping Policy explains the terms and conditions related to shipping, delivery, and related charges for products purchased from our website.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-01: Shipping Areas</h2>
              <p className="text-base leading-relaxed text-gray-700">
                We currently deliver products to addresses within India. If you have questions about shipping to a specific location, please contact us before placing your order.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-02: Order Processing</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Orders are processed within 1&ndash;2 business days after confirmation of payment.</li>
                <li>Orders placed on weekends or public holidays will be processed on the next working day.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-03: Shipping Methods & Delivery Time</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>We use reliable courier partners to deliver your orders. Standard delivery usually takes 3&ndash;7 business days, depending on your location.</li>
                <li>Delivery timelines may vary due to unforeseen circumstances such as weather, holidays, or courier delays.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-04: Shipping Charges</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Shipping charges are calculated at checkout and may vary based on location and order weight.</li>
                <li>Free shipping may be offered on eligible orders as per our promotions.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-05: Order Tracking</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Once your order is shipped, you will receive a tracking number via email or WhatsApp.</li>
                <li>You can use the tracking number to check the delivery status on the courier&apos;s website registry.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">LGS-06: Damaged or Lost Shipments</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>If a product is damaged or lost during transit, please contact us immediately within 48 hours of delivery.</li>
                <li>We will guide you through the replacement or refund process as per our Refund Policy.</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Logistics Desk</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> Info@fusionofdriednutspvtltd.co.in | fusionofdriednuts19pvtltd@gmail.com</p>
              <p><strong>Phone:</strong> +91 73699 35610</p>
              <p className="text-green-600 font-medium">WhatsApp Connectivity Active</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-2">Corporate Logistics HQ</h3>
              <p className="text-sm text-gray-600">
                Fusion of Dried Nuts Private Limited<br />
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
