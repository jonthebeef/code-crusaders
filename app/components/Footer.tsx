import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-dark-charcoal to-vibrant-purple text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" aria-label="Facebook" className="text-3xl hover:text-neon-yellow transition-colors duration-300">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" aria-label="Twitter" className="text-3xl hover:text-neon-yellow transition-colors duration-300">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" aria-label="Instagram" className="text-3xl hover:text-neon-yellow transition-colors duration-300">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" aria-label="YouTube" className="text-3xl hover:text-neon-yellow transition-colors duration-300">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <p className="text-sm mb-4">© Average Superhuman Ltd 2024</p>
        <div className="space-x-4">
          <Link href="#" className="text-neon-yellow hover:text-deep-orange transition-colors duration-300">Terms of Service</Link>
          <Link href="#" className="text-neon-yellow hover:text-deep-orange transition-colors duration-300">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer