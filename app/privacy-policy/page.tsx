// app/privacy-policy/page.tsx
import { Lexend } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const lexend = Lexend({ subsets: ['latin'] })

export default function PrivacyPolicy() {
  return (
    <div className={`${lexend.className} flex flex-col min-h-screen bg-white`}>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4">Effective Date: 21 October 2024</p>
        
        <div className="space-y-4">
          <p>
            At Code Crusaders, accessible from codecrusaders.co.uk, we are committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our website and services.
          </p>

          <h2 className="text-xl font-semibold mt-4">Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li>Personal Data: While using our site, we may ask you to provide us with certain personally identifiable information, including your name, email address, and any other information you choose to provide.</li>
            <li>Usage Data: We collect information that your browser sends whenever you visit our site, which may include your IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and the time spent on those pages.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Use of Data</h2>
          <p>Code Crusaders uses the collected data for various purposes:</p>
          <ul className="list-disc list-inside">
            <li>To provide and maintain our services.</li>
            <li>To notify you about changes to our services.</li>
            <li>To allow you to participate in interactive features when you choose to do so.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our services.</li>
            <li>To monitor the usage of our site.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Third-Party Services</h2>
          <p>
            We may employ third-party companies and services, such as Google Analytics and Mailchimp, to facilitate our services, provide the services on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2 className="text-xl font-semibold mt-4">Data Retention</h2>
          <p>
            We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
          </p>

          <h2 className="text-xl font-semibold mt-4">Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-xl font-semibold mt-4">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including:
          </p>
          <ul className="list-disc list-inside">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right to rectification if your personal data is inaccurate or incomplete.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right to request that we restrict the processing of your personal data.</li>
            <li>The right to data portability.</li>
          </ul>
          <p>If you wish to exercise any of these rights, please contact us.</p>

          <h2 className="text-xl font-semibold mt-4">Children's Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information from our servers.
          </p>

          <h2 className="text-xl font-semibold mt-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside">
            <li>Email: info@codecrusaders.co.uk</li>
            <li>Website: codecrusaders.co.uk</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}