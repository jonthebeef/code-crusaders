// app/terms_and_conditions/page.tsx
import { Lexend } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const lexend = Lexend({ subsets: ['latin'] })

export default function TermsAndConditions() {
  return (
    <div className={`${lexend.className} flex flex-col min-h-screen bg-white`}>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 mb-4">Effective Date: 21 October 2024</p>
        
        <div className="space-y-4">
          <p>
            Welcome to Code Crusaders! These terms and conditions outline the rules and regulations for the use of our website, located at CodeCrusaders.co.uk.
          </p>

          <h2 className="text-xl font-semibold mt-4">Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2 className="text-xl font-semibold mt-4">Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, Code Crusaders and/or its licensors own the intellectual property rights for all material on Code Crusaders. All intellectual property rights are reserved. You may access this from Code Crusaders for your own personal use, subject to restrictions set in these terms and conditions.
          </p>

          <h2 className="text-xl font-semibold mt-4">User Responsibilities</h2>
          <p>
            You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others. You agree not to:
          </p>
          <ul className="list-disc list-inside">
            <li>Use the service in any way that violates any applicable national or international law.</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Links to Other Websites</h2>
          <p>
            Our service may contain links to third-party websites or services that are not owned or controlled by Code Crusaders. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2 className="text-xl font-semibold mt-4">Limitation of Liability</h2>
          <p>
            In no event shall Code Crusaders, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of (or inability to access or use) our service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content.
          </p>

          <h2 className="text-xl font-semibold mt-4">Changes to These Terms</h2>
          <p>
            We may update our Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page. You are advised to review these Terms periodically for any changes.
          </p>
        
          <h2 className="text-xl font-semibold mt-4">Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us:
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