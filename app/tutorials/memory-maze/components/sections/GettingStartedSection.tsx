import React from 'react'
import { InlineCode } from '../shared'

export function GettingStartedSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Getting Started 🚀</h2>
      <p className="mb-8 text-lg">Before we start coding our awesome memory game, let's get everything set up! Here's what you'll need:</p>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">What You'll Need</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>A computer (Windows, Mac, or Linux)</li>
            <li>A text editor to write your code (we'll help you choose one!)</li>
            <li>A web browser (like Chrome, Firefox, or Edge)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Choosing Your Text Editor</h3>
          <p className="mb-4 text-lg">You can use any of these text editors - pick the one that works best for you:</p>
          
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">For Windows Users:</h4>
              <ul className="list-disc list-inside text-lg space-y-4">
                <li>
                  <span className="font-bold">Notepad</span> - Already on your computer!
                  <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                    <li>Click the Start menu</li>
                    <li>Type "Notepad"</li>
                    <li>Click on Notepad when it appears</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Notepad++</span> - A bit fancier, with coloured text:
                  <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                    <li>Ask a grown-up to help you download it from <a href="https://notepad-plus-plus.org/downloads/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">notepad-plus-plus.org</a></li>
                    <li>Install it like any other program</li>
                    <li>Find it in your Start menu</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">For Mac Users:</h4>
              <ul className="list-disc list-inside text-lg space-y-4">
                <li>
                  <span className="font-bold">TextEdit</span> - Already on your Mac!
                  <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                    <li>Open Finder</li>
                    <li>Click Applications</li>
                    <li>Find and open TextEdit</li>
                    <li>Important: Go to TextEdit → Preferences and select "Plain Text"</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">Want Something More Advanced?</h4>
              <p className="mb-2 text-lg">If you're feeling confident, you can try Visual Studio Code:</p>
              <ul className="list-disc list-inside text-lg space-y-2">
                <li>Download from <a href="https://code.visualstudio.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">code.visualstudio.com</a></li>
                <li>Ask a grown-up to help you install it</li>
                <li>It has lots of cool features to help you code!</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Creating Your Game Files</h3>
          <p className="mb-4">You'll need to create two files for your game:</p>
          <ul className="list-disc list-inside text-lg space-y-4">
            <li>
              <InlineCode>index.html</InlineCode>: This is your main file that contains:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                <li>The structure of your game</li>
                <li>The styles to make it look cool</li>
                <li>The game board where everything happens</li>
              </ul>
            </li>
            <li>
              <InlineCode>game.js</InlineCode>: This is where all the fun stuff happens:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                <li>The game logic</li>
                <li>The code that makes cells light up</li>
                <li>The part that checks if you clicked the right squares</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Creating Your Files</h3>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">In Notepad or TextEdit:</h4>
              <ol className="list-decimal list-inside text-lg space-y-4">
                <li>
                  Create <InlineCode>index.html</InlineCode>:
                  <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                    <li>Open your text editor</li>
                    <li>Click File → Save As</li>
                    <li>Type "index.html" (including the quotes)</li>
                    <li>Pick a folder to save it in</li>
                  </ul>
                </li>
                <li>
                  Create <InlineCode>game.js</InlineCode>:
                  <ul className="list-disc list-inside ml-8 mt-2 space-y-2 text-gray-600">
                    <li>Open your text editor again</li>
                    <li>Click File → Save As</li>
                    <li>Type "game.js" (including the quotes)</li>
                    <li>Save it in the same folder as index.html</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-purple-600 mb-2">In Notepad++:</h4>
              <ol className="list-decimal list-inside text-lg space-y-4">
                <li>Click File → New</li>
                <li>Save both files like above</li>
                <li>Bonus: Notepad++ will make the code colourful!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Important Tips! 🌟</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>Keep both files in the same folder - they need to be together to work!</li>
            <li>Make sure to type the file names exactly as shown - computers are very picky about spelling!</li>
            <li>Don't worry if your text doesn't have colours - the game will still work!</li>
            <li>If you're not sure about anything, ask a grown-up for help.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}