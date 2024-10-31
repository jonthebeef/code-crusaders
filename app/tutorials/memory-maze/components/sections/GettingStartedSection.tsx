import React, { useEffect, useRef } from 'react'

interface GettingStartedSectionProps {
  id: string
  children?: React.ReactNode
  onView: () => void
}

// Inline the InlineCode component
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 font-mono text-sm">
      {children}
    </code>
  )
}

export function GettingStartedSection({ id, children, onView }: GettingStartedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onView]);

  return (
    <section id={id} ref={sectionRef} className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">Getting Started 🚀</h2>
      
      <div className="space-y-6">
        <div>
          <h3 id="what-youll-need" className="text-2xl font-bold text-green-600 mb-2">What You'll Need</h3>
          <ul className="list-disc list-inside text-lg space-y-1">
            <li>A computer (Windows, Mac, or Linux)</li>
            <li>A text editor to write your code (we'll help you choose one!)</li>
            <li>A web browser (like Chrome, Firefox, or Edge)</li>
          </ul>
        </div>

        <div>
          <h3 id="choosing-text-editor" className="text-2xl font-bold text-green-600 mb-2">Choosing Your Text Editor</h3>
          <p className="mb-2 text-lg">You can use any of these text editors - pick the one that works best for you:</p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">For Windows Users:</h4>
              <ul className="list-disc list-inside text-lg space-y-2">
                <li>
                  <span className="font-bold">Notepad</span> - Already on your computer!
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                    <li>Click the Start menu</li>
                    <li>Type "Notepad"</li>
                    <li>Click on Notepad when it appears</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Notepad++</span> - A bit fancier, with coloured text:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                    <li>Ask a grown-up to help you download it from <a href="https://notepad-plus-plus.org/downloads/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">notepad-plus-plus.org</a></li>
                    <li>Install it like any other program</li>
                    <li>Find it in your Start menu</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">For Mac Users:</h4>
              <ul className="list-disc list-inside text-lg space-y-2">
                <li>
                  <span className="font-bold">TextEdit</span> - Already on your Mac!
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                    <li>Open Finder</li>
                    <li>Click Applications</li>
                    <li>Find and open TextEdit</li>
                    <li>Important: Go to TextEdit → Preferences and select "Plain Text"</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 id="creating-game-files" className="text-2xl font-bold text-green-600 mb-2">Creating Your Game Files</h3>
          <p className="mb-2 text-lg">You'll need to create two files for your game:</p>
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>
              Create <InlineCode>index.html</InlineCode>:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>Open your text editor</li>
                <li>Click File → Save As</li>
                <li>Type "index.html" (including the quotes)</li>
                <li>Pick a folder to save it in</li>
              </ul>
            </li>
            <li>
              Create <InlineCode>game.js</InlineCode>:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>Open your text editor again</li>
                <li>Click File → Save As</li>
                <li>Type "game.js" (including the quotes)</li>
                <li>Save it in the same folder as index.html</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-2">Important Tips! 🌟</p>
          <ul className="list-disc list-inside text-lg space-y-1 text-yellow-800">
            <li>Keep both files in the same folder - they need to be together to work!</li>
            <li>Make sure your file names are exactly as shown - computers are very picky about spelling!</li>
            <li>Don't worry if your text doesn't have colours - the game will still work!</li>
            <li>If you're not sure about anything, ask a grown-up for help.</li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  )
}

export default GettingStartedSection