'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Section {
  title: string;
  content: React.ReactNode;
}

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto mt-8 mb-8">
    <code className={`language-${language}`}>{code}</code>
  </pre>
)

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-800 text-gray-100 px-2 py-1 rounded text-lg font-mono">
    {children}
  </code>
)

interface TableOfContentsProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, currentSection, onSectionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full bg-electric-blue text-white py-2 px-4 rounded-lg flex justify-between items-center"
      >
        <span>Table of Contents</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`md:block ${isOpen ? 'block' : 'hidden'} w-full`}>
        <h2 className="text-xl font-bold p-4 bg-electric-blue text-white hidden md:block">Table of Contents</h2>
        <ul className="py-2">
          {sections.map((section, index) => (
            <li key={index} className="w-full">
              <button
                onClick={() => {
                  onSectionClick(index);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 ${
                  currentSection === index
                    ? 'bg-electric-blue text-white'
                    : 'text-dark-charcoal hover:bg-gray-200'
                }`}
              >
                <span className="block w-full overflow-hidden text-ellipsis">
                  {section.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MemoryMazeTutorial() {
  const [currentSection, setCurrentSection] = useState(0)
  const [direction, setDirection] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const sections: Section[] = [
    {
      title: "Getting Started 🚀",
      content: (
        <section key="getting-started" className="mb-8">
          <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">Getting Started 🚀</h2>
          <p>We've designed this tutorial to be really easy, and aside from a computer, you won't need anything else (other than your 🧠). Try and complete this tutorial on your own, and remember to give us some feedback at the end.</p>
          <h3 className="text-2xl font-semibold mt-12 mb-6">What You'll Need</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>A computer (Windows, Mac, or Linux)</li>
            <li>A text editor to write your code (we'll help you choose one!)</li>
            <li>A web browser (like Chrome, Firefox, or Edge)</li>
          </ul>

        <h3 className="text-2xl font-semibold mt-12 mb-6">Choosing Your Text Editor</h3>
        <p className="mb-4">You can use any of these text editors - pick the one that works best for you:</p>

        <h4 className="text-lg font-semibold mb-2">For Windows Users:</h4>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Notepad - Already on your computer!
            <ul className="list-disc pl-6 mt-2">
              <li>Click the Start menu</li>
              <li>Type &quot;Notepad&quot;</li>
              <li>Click on Notepad when it appears</li>
            </ul>
          </li>
          <li>
            Notepad++ - A bit fancier, with coloured text:
            <ul className="list-disc pl-6 mt-2">
              <li>Ask a grown-up to help you download it from notepad-plus-plus.org</li>
              <li>Install it like any other program</li>
              <li>Find it in your Start menu</li>
            </ul>
          </li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">For Mac Users:</h4>
        <ul className="list-disc pl-6 mb-4">
          <li>
            TextEdit - Already on your Mac!
            <ul className="list-disc pl-6 mt-2">
              <li>Hold down the command key and press the space bar</li>
              <li>Type "Textedit" (without the quotes)</li>
              <li>Find, and click to open TextEdit</li>
              <li>Now you're in the application, this is important: Go to the menu bar at the top of the screen, click TextEdit → Format → select &quot;Make Plain Text&quot;</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-12 mb-6">When You See a Codeblock</h3>
        <p className="mb-4">You can highlight the code inside, and copy, then paste it.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Highlight the content by hovering over the first letter or number.</li>
          <li>Hold down the mouse button and drag along the block of code or text</li>
          <li>Press Edit → "Copy", to copy the code to your clipboard</li>
          <li>Press Edit → "Paste" in the place you want it to go.</li>  
          <li>See if you can learn the keyboard shortcuts! </li>
        </ul>
        <CodeBlock code={`Try copying all this text and pasting it into a document.`} language="html"/>
         <p>If you struggle to get it right, keep trying - it&apos;s a very useful way of using a computer to know. And we&apos;re pretty sure a grown up can help you if it&apos;s really difficult!</p>
      </section>
    )
  },
    {title: "1. Setting Up Our Game Space",
      content:
    // Section 1: Setting Up Our Game Space
    (
      <section key="setting-up-game-space" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">1. Setting Up Our Game Space</h2>
        <p className="mb-4">Now, let&apos;s create the basic structure for our game, piece by piece. Follow these steps carefully:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">We&apos;ll add the code line by line. Copy the code below.</li>
        </ol>

        <CodeBlock
          code={`<!DOCTYPE html>
<html lang="en">`}
          language="html"
        />

        <p className="my-4">Paste these two lines at the very top of your index.html file. This tells the web browser that we&apos;re using HTML5 and that our content is in English.</p>

        <p className="mb-4">Now, let&apos;s add the <InlineCode>&lt;head&gt;</InlineCode> section. Copy and paste these lines right after the ones you just added:</p>

        <CodeBlock
          code={`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Maze Game</title>
  <style>
    /* We'll add some cool styles here later! */
  </style>
</head>`}
          language="html"
        />

        <p className="my-4">This part contains information about our webpage that doesn&apos;t show up on the page itself. It sets up how the browser should read our text and display our page.</p>

        <p className="mb-4">Next, let&apos;s start the <InlineCode>&lt;body&gt;</InlineCode> section. Add these lines after the <InlineCode>&lt;/head&gt;</InlineCode> tag:</p>

        <CodeBlock
          code={`<body>
  <div id="game-container">
    <h1>Memory Maze</h1>
    <!-- We'll add new elements here -->
  </div>`}
          language="html"
        />

        <p className="my-4">The <InlineCode>&lt;body&gt;</InlineCode> is where we put everything we want to show on our webpage. We&apos;ve created a container for our game and added a title.</p>

        <p className="mb-4">Finally, let&apos;s add the script section and close our HTML tags. Add these lines at the end of your file:</p>

        <CodeBlock
          code={`  <script>
    // We'll add our game code here soon!
  </script>
</body>
</html>`}
          language="html"
        />

        <p className="my-4">This is where we&apos;ll put our JavaScript code later to make our game work.</p>

        <p className="mb-4">Now, let&apos;s check if you&apos;ve put everything together correctly. Your complete file should look like this:</p>

        <CodeBlock
          code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Maze Game</title>
  <style>
    /* We'll add some cool styles here later! */
  </style>
</head>
<body>
  <div id="game-container">
    <h1>Memory Maze</h1>
    <!-- We'll add new elements here -->
  </div>

  <script>
    // We'll add our game code here soon!
  </script>
</body>
</html>`}
          language="html"
        />

        <p className="my-4">If your code matches this, great job! If not, double-check each line and make sure you didn&apos;t miss anything.</p>

        <p className="mb-4">Now, let&apos;s save your file:</p>

        <ol className="list-decimal pl-6 mb-4">
          <li>Click on &quot;File&quot; in the top menu of your text editor</li>
          <li>Click on &quot;Save As&quot;</li>
          <li>Choose a folder where you want to save your game</li>
          <li>Name your file &quot;memory-maze.html&quot; (make sure it ends with .html)</li>
          <li>Click &quot;Save&quot;</li>
        </ol>

        <p className="mb-4">To see your work:</p>

        <ol className="list-decimal pl-6 mb-4">
          <li>Open your web browser (like Chrome or Firefox)</li>
          <li>Press Ctrl+O (on Windows) or Cmd+O (on Mac)</li>
          <li>Find the &quot;memory-maze.html&quot; file you just saved and open it</li>
        </ol>

        <p className="my-4">You should see &quot;Memory Maze&quot; as a heading on an otherwise blank page. This is the start of your game!</p>

        <p className="mb-4">Remember, whenever we make changes to our code:</p>

        <ol className="list-decimal pl-6 mb-4">
          <li>Save the file in the text editor (Ctrl+S on Windows, Cmd+S on Mac)</li>
          <li>Go back to the browser and refresh the page (F5 on Windows, Cmd+R on Mac)</li>
        </ol>

        <p className="my-4">Great job! You&apos;ve set up the basic structure for your Memory Maze game. In the next section, we&apos;ll start making it look cool with some colors and style!</p>
      </section>
    )
  },
    {title: "2. Making Our Game Look Cool",
      content: 
    // Section 2: Making Our Game Look Cool
    (
      <section key="making-game-look-cool" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">2. Making Our Game Look Cool</h2>
        <p className="mb-4">Now that we have the basic structure of our game, let&apos;s add some style to make it look awesome. We&apos;ll use something called CSS (Cascading Style Sheets) to do this. CSS is like a paintbrush for our webpage - it lets us add colors, change sizes, and make things look just how we want!</p>

        <p className="mb-4">Follow these steps carefully:</p>

        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">First, let&apos;s add our cool retro font. Find the <InlineCode>&lt;head&gt;</InlineCode> section in your HTML file and add this line just before the <InlineCode>&lt;style&gt;</InlineCode> tag:</li>
        </ol>

        <CodeBlock
          code={`<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">`}
          language="html"
        />

        <ol start={3} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Now, find the <InlineCode>&lt;style&gt;</InlineCode> tag in your HTML file. It should be empty right now, looking like this:</li>
        </ol>

        <CodeBlock
          code={`<style>
    /* We'll add some cool styles here later! */
</style>`}
          language="html"
        />

        <ol start={4} className="list-decimal pl-6 mb-4">
          <li className="mb-2">We&apos;re going to replace the comment inside the <InlineCode>&lt;style&gt;</InlineCode> tags with our CSS rules. Delete the comment line and add these lines inside the <InlineCode>&lt;style&gt;</InlineCode> tags:</li>
        </ol>

        <CodeBlock
          code={`body {
    font-family: 'Press Start 2P', cursive;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}`}
          language="css"
        />

        <p className="mb-4">Make sure each property is on a new line, just like in the example above. This makes our code easier to read!</p>

        <ol start={5} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Right after the closing curly brace {'}'} of the body style, add these lines for our game container:</li>
        </ol>

        <CodeBlock
          code={`#game-container {
    text-align: center;
}`}
          language="css"
        />

        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Next, we&apos;ll add a placeholder for our canvas style. Add these lines right after the game-container style:</li>
        </ol>

        <CodeBlock
          code={`canvas {
    /* We'll style this later */
}`}
          language="css"
        />

        <ol start={7} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Now, let&apos;s style our overlay. Add these lines right after the canvas style:</li>
        </ol>

        <CodeBlock
          code={`.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}`}
          language="css"
        />

        <ol start={8} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Finally, let&apos;s style our button. Add these lines at the end, right before the closing <InlineCode>&lt;/style&gt;</InlineCode> tag:</li>
        </ol>

        <CodeBlock
          code={`button {
    font-family: 'Press Start 2P', cursive;
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}

button:hover {
    background-color: #2563eb;
}`}
          language="css"
        />

        <p className="mb-4">Now, your entire <InlineCode>&lt;style&gt;</InlineCode> section should look like this:</p>

        <CodeBlock
          code={`<style>
    body {
        font-family: 'Press Start 2P', cursive;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }
    #game-container {
        text-align: center;
    }
    canvas {
        /* We'll style this later */
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    button {
        font-family: 'Press Start 2P', cursive;
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
    button:hover {
        background-color: #2563eb;
    }
</style>`}
          language="html"
        />

        <p className="mb-4">Make sure each opening curly brace {'{'} is on the same line as the selector (like <InlineCode>body {'{'}</InlineCode>), and each closing curly brace {'}'} is on its own line.</p>

        <p className="mb-4">Now, save your file and refresh your browser. Wow! Look at that change!</p>

        <p className="mb-4">🎨 Customization Tip: Try changing the <InlineCode>background-color</InlineCode> of the body or the button. You can use color names like &quot;red&quot;, &quot;blue&quot;, or &quot;yellow&quot;, or find hex codes for more specific colors online.</p>

        <p className="mb-4">Great job! You&apos;ve just styled your game and made it look like a real retro arcade game. In the next section, we&apos;ll start adding the JavaScript code to make our game actually work. Get ready to bring your Memory Maze to life!</p>

        <p className="mb-4">Remember: If you don&apos;t see the changes, make sure you&apos;ve saved your file and refreshed your browser page. Don&apos;t be afraid to experiment with different colors and styles - that&apos;s how you learn and make your game unique!</p>
      </section>
    )
  },
    {title: "3. Building the Game Board",
    content:
        // Section 3: Building the Game Board
        (
          <section key="building-game-board" className="mb-8">
            <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">3. Building the Game Board</h2>
            <p className="mb-4">Now that we have our basic page set up, let&apos;s add the remaining elements to complete our game board for Memory Maze. We&apos;ll go through each new part step by step.</p>
            <p className="mb-4">First, let&apos;s open your &quot;memory-maze.html&quot; file in your text editor. Find the <InlineCode>&lt;div id=&quot;game-container&quot;&gt;</InlineCode> we created earlier. It should look like this:</p>
            <CodeBlock
              code={`<div id="game-container">
        <h1>Memory Maze</h1>
        <!-- We'll add new elements here -->
    </div>`}
              language="html"
            />
            <p className="mb-4">We already have our game title, so we don&apos;t need to add another <InlineCode>&lt;h1&gt;</InlineCode> tag. Let&apos;s add the rest of our game elements inside this container, right after the <InlineCode>&lt;h1&gt;</InlineCode> tag.</p>
            <ol className="list-decimal pl-6 mb-4">
              <li className="mb-2">Add a place to show the player&apos;s score:</li>
            </ol>
            <p className="mb-4">On a new line right after the <InlineCode>&lt;h1&gt;Memory Maze&lt;/h1&gt;</InlineCode> line, add this code:</p>
            <CodeBlock
              code={`<div id="score">Score: 0</div>`}
              language="html"
            />
            <p className="mb-4">This creates a special area to display the score. We start with &quot;Score: 0&quot; because when the game begins, the player hasn&apos;t scored any points yet.</p>
            <ol start={2} className="list-decimal pl-6 mb-4">
              <li className="mb-2">Next, let&apos;s create a space for our game grid:</li>
            </ol>
            <p className="mb-4">On a new line right after the score <InlineCode>&lt;div&gt;</InlineCode> we just added, paste this code:</p>
            <CodeBlock
              code={`<div style="position: relative; width: 340px; height: 340px; margin: 0 auto;">
        <canvas id="gameCanvas" width="340" height="340"></canvas>
    </div>`}
              language="html"
            />
            <p className="mb-4">This does two things:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The outer <InlineCode>&lt;div&gt;</InlineCode> creates a container for our game grid.</li>
              <li>Inside, we have a <InlineCode>&lt;canvas&gt;</InlineCode> element. Think of this as a special drawing board for our game.</li>
            </ul>
            <ol start={3} className="list-decimal pl-6 mb-4">
              <li className="mb-2">Lastly, we&apos;ll add an overlay for game messages:</li>
            </ol>
            <p className="mb-4">Right after the <InlineCode>&lt;canvas&gt;</InlineCode> tag (but still inside the <InlineCode>&lt;div&gt;</InlineCode> we just created), add this code:</p>
            <CodeBlock
              code={`<div id="overlay" class="overlay">
        <h2 id="overlayTitle">Ready to Play?</h2>
        <p id="finalScore" style="display: none;">Your score: 0</p>
        <button id="startButton" onclick="startGame()">Start Game</button>
    </div>`}
              language="html"
            />
            <p className="mb-4">This creates an overlay that will appear on top of our game grid. It includes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>A title asking if the player is ready to play.</li>
              <li>A place to show the final score (which is hidden at first).</li>
              <li>A button to start the game.</li>
            </ul>
            <p className="mb-4">Now, let&apos;s check our work. Your complete <InlineCode>&lt;div id=&quot;game-container&quot;&gt;</InlineCode> should look like this:</p>
            <CodeBlock
              code={`<div id="game-container">
        <h1>Memory Maze</h1>
        <div id="score">Score: 0</div>
        <div style="position: relative; width: 340px; height: 340px; margin: 0 auto;">
            <canvas id="gameCanvas" width="340" height="340"></canvas>
            <div id="overlay" class="overlay">
                <h2 id="overlayTitle">Ready to Play?</h2>
                <p id="finalScore" style="display: none;">Your score: 0</p>
                <button id="startButton" onclick="startGame()">Start Game</button>
            </div>
        </div>
    </div>`}
              language="html"
            />
            <p className="mb-4">Make sure your code matches this exactly. Each opening tag (like <InlineCode>&lt;div&gt;</InlineCode>) should be on its own line, and the closing tags (like <InlineCode>&lt;/div&gt;</InlineCode>) should line up with their opening tags.</p>
            <p className="mb-4">🎨 Customization Tip: If you want, you can change the text inside the <InlineCode>&lt;h2&gt;</InlineCode> tag to say something different. For example, you could change &quot;Ready to Play?&quot; to &quot;Let&apos;s Begin!&quot; or &quot;Start Your Memory Challenge!&quot;.</p>
            <p className="mb-4">Now, save your file and refresh your browser. You should see:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Your game title &quot;Memory Maze&quot; at the top</li>
              <li>A score of 0 below the title</li>
              <li>A &quot;Start Game&quot; button</li>
            </ol>
            <p className="mb-4">If you don&apos;t see these changes:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Make sure you saved your file after making changes</li>
              <li>Refresh your browser page (you can usually do this by pressing F5 on your keyboard)</li>
              <li>Double-check that you&apos;ve pasted all the new code in the right places</li>
            </ol>
            <p className="mb-4">Remember, it&apos;s okay if things don&apos;t work perfectly the first time. Coding is all about trying, checking, and fixing until everything works just right!</p>
            <p className="mb-4">In the next section, we&apos;ll start adding the JavaScript code to make our game actually work. Get ready to bring your Memory Maze to life!</p>
          </section>
        )
      },
      {
        title: "4. Setting Up Our Game Logic",
        content: 
    // Section 4: Setting Up Our Game Logic
    (
      <section key="setting-up-game-logic" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">4. Setting Up Our Game Logic</h2>
        <p className="mb-4">Now that we have our script tags in place, let&apos;s add the JavaScript code that will make our game work. We&apos;ll do this step by step, explaining each part as we go.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags near the bottom of your file, just before the closing <InlineCode>&lt;/body&gt;</InlineCode> tag. They should be empty or contain a comment like <InlineCode>{'// We\'ll add our game code here'}</InlineCode>.</li>
          <li className="mb-2">If there&apos;s any existing content inside the <InlineCode>&lt;script&gt;</InlineCode> tags, delete it. We&apos;re going to start fresh.</li>
          <li className="mb-2">On a new line inside the <InlineCode>&lt;script&gt;</InlineCode> tags, let&apos;s start by adding some rules for our game. Copy and paste this code:</li>
        </ol>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;`}
          language="javascript"
        />
        <p className="mb-4">Make sure each constant is on its own line, just like in the example above.</p>
        <ol start={5} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the last constant (NEXT_SEQUENCE_DELAY), press Enter twice to create a blank line. Then, on this new line, add the following code for our game variables:</li>
        </ol>
        <CodeBlock
          code={`// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;`}
          language="javascript"
        />
        <p className="mb-4">Again, make sure each variable is on its own line.</p>
        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the last variable (lastClickTimeout), press Enter twice to create another blank line. On this new line, add the following code to select elements from our HTML:</li>
        </ol>
        <CodeBlock
          code={`// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');`}
          language="javascript"
        />
        <p className="mb-4">Ensure each element selection is on its own line.</p>
        <p className="mb-4">Your complete <InlineCode>&lt;script&gt;</InlineCode> section should now look like this:</p>
        <CodeBlock
          code={`<script>
    // Game constants
    const GRID_SIZE = 5;
    const CELL_SIZE = 60;
    const CELL_GAP = 10;
    const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
    const INITIAL_SEQUENCE_LENGTH = 3;
    const SEQUENCE_INCREASE = 1;
    const SEQUENCE_SHOW_INTERVAL = 600;
    const START_GAME_DELAY = 1000;
    const CLICK_HIGHLIGHT_DURATION = 300;
    const NEXT_SEQUENCE_DELAY = 1000;

    // Game variables
    let gameState = 'ready';
    let score = 0;
    let sequence = [];
    let playerSequence = [];
    let showingSequence = false;
    let gameActive = false;
    let lastClickTimeout = null;

    // DOM elements
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('overlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const startButton = document.getElementById('startButton');
    const finalScoreElement = document.getElementById('finalScore');
    const scoreElement = document.getElementById('score');
</script>`}
          language="html"
        />
        <p className="mb-4">Great job! You&apos;ve just set up the basic structure for your Memory Maze game. In the next part, we&apos;ll add the functions that make the game work.</p>
        <p className="mb-4">Remember, if something doesn&apos;t look right, double-check your code for any typos. It&apos;s normal to make mistakes when you&apos;re learning to code. Just keep trying, and you&apos;ll get it!</p>
        <p className="mb-4">🎨 Customization Tip: Try changing some of the numbers in the game constants. For example, you could make <InlineCode>GRID_SIZE</InlineCode> smaller for an easier game or larger for a harder one. Just remember to test your game after making changes!</p>
      </section>
    )
  },
  {
    title: "5. Drawing Our Game Board",
    content: 
    // Section 5: Drawing Our Game Board
    (
      <section key="drawing-game-board" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">5. Drawing Our Game Board</h2>
        <p className="mb-4">Now that we have our basic setup, let&apos;s create the functions that will draw our game board. We&apos;ll add two important functions: <InlineCode>drawGrid</InlineCode> and <InlineCode>drawCell</InlineCode>. These functions will work together to create and update our game board.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we added our game constants and variables.</li>
          <li className="mb-2">At the end of the script, after all the DOM elements, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>drawGrid</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}`}
          language="javascript"
        />
        <ol start={5} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the <InlineCode>drawGrid</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>drawCell</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}`}
          language="javascript"
        />
        <p className="mb-4">Let&apos;s break down what these functions do:</p>
        <p className="mb-4">The <InlineCode>drawGrid</InlineCode> function:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>This function sets up our entire game board at once.</li>
          <li>It uses a dark gray color (#444) to draw all the squares.</li>
          <li>It uses two loops (one inside the other) to draw each square in our grid.</li>
          <li>It uses our <InlineCode>GRID_SIZE</InlineCode>, <InlineCode>CELL_SIZE</InlineCode>, and <InlineCode>CELL_GAP</InlineCode> constants to position each square correctly.</li>
        </ul>
        <p className="mb-4">The <InlineCode>drawCell</InlineCode> function:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>This function draws or updates just one square at a time.</li>
          <li>It calculates the position of a single cell based on its index.</li>
          <li>If the cell is &apos;active&apos;, it creates a cool gradient from pink (#FF69B4) to purple (#8A2BE2).</li>
          <li>If the cell is not active, it fills it with the same dark gray as the grid.</li>
          <li>It then draws the cell at the calculated position.</li>
        </ul>
        <p className="mb-4">How these functions work together:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><InlineCode>drawGrid</InlineCode> is like setting up a whole LEGO baseplate with gray bricks. It creates our entire game board at once.</li>
          <li><InlineCode>drawCell</InlineCode> is like swapping out one LEGO brick at a time. We use it to change individual squares during the game, like when we&apos;re showing the sequence or when a player clicks.</li>
        </ul>
        <p className="mb-4">Both functions use <InlineCode>ctx</InlineCode>, which we set up earlier. It&apos;s our special drawing tool that helps us create our game board on the screen.</p>
        <p className="mb-4">🚀 Cool Connection: These functions use the constants we set up earlier, like <InlineCode>GRID_SIZE</InlineCode> and <InlineCode>CELL_SIZE</InlineCode>. This shows how important it was to set those up first!</p>
        <p className="mb-4">🎨 Customization tip: In the <InlineCode>drawCell</InlineCode> function, try changing the gradient colors to create your own unique light-up effect. For example, you could change &apos;#FF69B4&apos; to &apos;#00FF00&apos; for a green start color.</p>
        <p className="mb-4">Remember, after adding these functions:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Here&apos;s what your complete JavaScript code should look like at this point:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">In the next section, we&apos;ll add more functions to create and show the sequences for our Memory Maze game. Keep up the great work!</p>
      </section>
    )
  },
  {
    title: "6. Creating and Showing the Sequence",
    content: 
    // Section 6: Creating and Showing the Sequence
    (
      <section key="creating-showing-sequence" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">6. Creating and Showing the Sequence</h2>
        <p className="mb-4">Now that we have our game board set up, let&apos;s create the functions that will generate and show the sequence of squares for the player to remember. We&apos;ll add two new functions to our JavaScript code.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we&apos;ve been adding our JavaScript code.</li>
          <li className="mb-2">Scroll to the bottom of the script, after the <InlineCode>drawCell</InlineCode> function we added in the last section.</li>
          <li className="mb-2">On a new line after the closing curly brace {'}'} of the <InlineCode>drawCell</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>generateSequence</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}`}
          language="javascript"
        />
        <p className="mb-4">This function does the following:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It creates a list of random numbers, where each number represents a square on our game board.</li>
          <li>The <InlineCode>length</InlineCode> parameter tells it how many numbers to create.</li>
          <li>It uses <InlineCode>GRID_SIZE</InlineCode> to make sure it only picks numbers that match squares on our board.</li>
        </ul>
        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the <InlineCode>generateSequence</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>showSequence</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}`}
          language="javascript"
        />
        <p className="mb-4">This function does the following:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It sets <InlineCode>showingSequence</InlineCode> to true, telling the game we&apos;re currently showing the pattern.</li>
          <li>It goes through each number in our <InlineCode>sequence</InlineCode>.</li>
          <li>For each number, it:
            <ul className="list-disc pl-6 mt-2">
              <li>Lights up the corresponding square using <InlineCode>drawCell(cell, true)</InlineCode>.</li>
              <li>Waits for half of <InlineCode>SEQUENCE_SHOW_INTERVAL</InlineCode>.</li>
              <li>Turns off the square using <InlineCode>drawCell(cell, false)</InlineCode>.</li>
              <li>Waits for another half of <InlineCode>SEQUENCE_SHOW_INTERVAL</InlineCode>.</li>
            </ul>
          </li>
          <li>After showing all squares, it sets <InlineCode>showingSequence</InlineCode> back to false.</li>
        </ul>
        <p className="mb-4">How these functions work together:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li><InlineCode>generateSequence</InlineCode> creates the pattern of squares to remember.</li>
          <li><InlineCode>showSequence</InlineCode> uses that pattern to light up the squares on the game board.</li>
        </ol>
        <p className="mb-4">🚀 Cool Connection: Remember the <InlineCode>sequence</InlineCode> variable we set up earlier? <InlineCode>generateSequence</InlineCode> fills it with numbers, and <InlineCode>showSequence</InlineCode> uses those numbers to know which squares to light up!</p>
        <p className="mb-4">🎨 Customization tip: Try changing <InlineCode>SEQUENCE_SHOW_INTERVAL</InlineCode> in your game constants to make the sequence show faster or slower!</p>
        <p className="mb-4">Remember, after adding these functions:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Here&apos;s what your complete JavaScript code should look like at this point:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}

async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">In the next section, we&apos;ll see how we handle player clicks and check if they&apos;ve remembered the sequence correctly. It&apos;s going to be super fun!</p>
      </section>
    )
  },
  {
    title: "7. Handling Player Clicks",
    content: 
    // Section 7: Handling Player Clicks
    (
      <section key="handling-player-clicks" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">7. Handling Player Clicks</h2>
        <p className="mb-4">Now we&apos;ll add the <InlineCode>handleClick</InlineCode> function, which controls what happens when a player clicks on a square in the game. This function is crucial for our game&apos;s interactivity and builds on the functions we&apos;ve created earlier.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we&apos;ve been adding our JavaScript code.</li>
          <li className="mb-2">Scroll to the bottom of the script, after the <InlineCode>showSequence</InlineCode> function we added in the last section.</li>
          <li className="mb-2">On a new line after the closing curly brace {'}'} of the <InlineCode>showSequence</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code:</li>
        </ol>
        <CodeBlock
          code={`function handleClick(event) {
    if (showingSequence || !gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    const index = row * GRID_SIZE + col;

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return;

    playerSequence.push(index);
    drawCell(index, true);

    if (lastClickTimeout) {
        clearTimeout(lastClickTimeout);
    }`}
          language="javascript"
        />
        <p className="mb-4">This first part of the function does the following:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It checks if it&apos;s okay to click (not showing a sequence and game is active).</li>
          <li>It calculates which square was clicked using the <InlineCode>CELL_SIZE</InlineCode> and <InlineCode>CELL_GAP</InlineCode> we defined earlier.</li>
          <li>It adds the clicked square to the <InlineCode>playerSequence</InlineCode> we created in our game variables.</li>
          <li>It uses the <InlineCode>drawCell</InlineCode> function we made earlier to light up the clicked square.</li>
        </ul>
        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">On a new line right after the code you just added, add this next part:</li>
        </ol>
        <CodeBlock
          code={`    const isLastClick = playerSequence.length === sequence.length;
    const isCorrect = playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1];

    if (!isCorrect) {
        gameActive = false;
        gameState = 'gameOver';
        showGameOver();
        return;
    }`}
          language="javascript"
        />
        <p className="mb-4">This part:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Checks if this is the last click in the sequence.</li>
          <li>Checks if the click was correct by comparing it to our <InlineCode>sequence</InlineCode> variable.</li>
          <li>If the click was incorrect, it ends the game (we&apos;ll create the <InlineCode>showGameOver</InlineCode> function later).</li>
        </ul>
        <ol start={7} className="list-decimal pl-6 mb-4">
          <li className="mb-2">Finally, add this last part of the function:</li>
        </ol>
        <CodeBlock
          code={`    lastClickTimeout = setTimeout(() => {
        if (gameActive) {
            drawCell(index, false);
            
            if (isLastClick) {
                score++;
                updateScore();
                sequence.push(generateSequence(SEQUENCE_INCREASE)[0]);
                playerSequence = [];
                
                setTimeout(() => {
                    if (gameActive) {
                        drawGrid();
                        showSequence();
                    }
                }, NEXT_SEQUENCE_DELAY);
            }
        }
    }, CLICK_HIGHLIGHT_DURATION);
}`}
          language="javascript"
        />
        <p className="mb-4">This final part:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Uses <InlineCode>setTimeout</InlineCode> to turn off the light on the clicked square after a short delay.</li>
          <li>If the player completed the whole sequence correctly:</li>
          <ul className="list-disc pl-6 mb-4">
            <li>It increases the score (we&apos;ll create the <InlineCode>updateScore</InlineCode> function later).</li>
            <li>It makes the sequence longer using the <InlineCode>generateSequence</InlineCode> function we created earlier.</li>
            <li>It resets the <InlineCode>playerSequence</InlineCode> for the next round.</li>
            <li>It sets up the next round by redrawing the grid and showing the new sequence.</li>
          </ul>
        </ul>
        <p className="mb-4">🚀 Cool Connection: This function uses almost all the parts we&apos;ve created so far - the game variables, the <InlineCode>drawCell</InlineCode> and <InlineCode>drawGrid</InlineCode> functions, and the <InlineCode>generateSequence</InlineCode> function!</p>
        <p className="mb-4">🎨 Customization tip: Try changing <InlineCode>CLICK_HIGHLIGHT_DURATION</InlineCode> in your game constants to make the squares stay lit up for longer or shorter when you click them!</p>
        <p className="mb-4">Remember, after adding this function:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Here&apos;s what your complete JavaScript code should look like at this point:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}

async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}

function handleClick(event) {
    if (showingSequence || !gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    const index = row * GRID_SIZE + col;

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return;

    playerSequence.push(index);
    drawCell(index, true);

    if (lastClickTimeout) {
        clearTimeout(lastClickTimeout);
    }

    const isLastClick = playerSequence.length === sequence.length;
    const isCorrect = playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1];

    if (!isCorrect) {
        gameActive = false;
        gameState = 'gameOver';
        showGameOver();
        return;
    }

    lastClickTimeout = setTimeout(() => {
        if (gameActive) {
            drawCell(index, false);
            
            if (isLastClick) {
                score++;
                updateScore();
                sequence.push(generateSequence(SEQUENCE_INCREASE)[0]);
                playerSequence = [];
                
                setTimeout(() => {
                    if (gameActive) {
                        drawGrid();
                        showSequence();
                    }
                }, NEXT_SEQUENCE_DELAY);
            }
        }
    }, CLICK_HIGHLIGHT_DURATION);
}`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">In the next section, we&apos;ll create the functions to update the score and show the game over screen. You&apos;re doing great!</p>
      </section>
    )
  },
  {
    title: "8. Updating the Score and Ending the Game",
    content: 
    // Section 8: Updating the Score and Ending the Game
    (
      <section key="updating-score-ending-game" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">8. Updating the Score and Ending the Game</h2>
        <p className="mb-4">Now we&apos;ll add two small but important functions: <InlineCode>updateScore</InlineCode> and <InlineCode>showGameOver</InlineCode>. These functions help us keep track of your score and show you when the game ends.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we&apos;ve been adding our JavaScript code.</li>
          <li className="mb-2">Scroll to the bottom of the script, after the <InlineCode>handleClick</InlineCode> function we added in the last section.</li>
          <li className="mb-2">On a new line after the closing curly brace {'}'} of the <InlineCode>handleClick</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>updateScore</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function updateScore() {
    scoreElement.textContent = \`Score: \${score}\`;
}`}
          language="javascript"
        />
        <p className="mb-4">This function does one simple thing:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It updates the score display on the screen using the <InlineCode>score</InlineCode> variable we set up earlier.</li>
        </ul>
        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the <InlineCode>updateScore</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>showGameOver</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function showGameOver() {
    overlay.style.display = 'flex';
    overlayTitle.textContent = 'Game Over';
    finalScoreElement.textContent = \`Your score: \${score}\`;
    finalScoreElement.style.display = 'block';
    startButton.textContent = 'Play Again';
}`}
          language="javascript"
        />
        <p className="mb-4">This function does several things when the game ends:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It makes the overlay visible by changing its display style to &apos;flex&apos;.</li>
          <li>It sets the title of the overlay to &quot;Game Over&quot;.</li>
          <li>It shows your final score.</li>
          <li>It makes the final score visible.</li>
          <li>It changes the text on the start button to &quot;Play Again&quot;.</li>
        </ul>
        <p className="mb-4">🚀 Cool Connection: These functions use the DOM elements we set up at the beginning of our script, like <InlineCode>scoreElement</InlineCode> and <InlineCode>overlay</InlineCode>!</p>
        <p className="mb-4">🎨 Customization tip: In the <InlineCode>showGameOver</InlineCode> function, try changing the &apos;Game Over&apos; text to something fun like &apos;Oops!&apos; or &apos;Better luck next time!&apos;.</p>
        <p className="mb-4">Remember, after adding these functions:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Here&apos;s what your complete JavaScript code should look like at this point:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}

async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}

function handleClick(event) {
    if (showingSequence || !gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    const index = row * GRID_SIZE + col;

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return;

    playerSequence.push(index);
    drawCell(index, true);

    if (lastClickTimeout) {
        clearTimeout(lastClickTimeout);
    }

    const isLastClick = playerSequence.length === sequence.length;
    const isCorrect = playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1];

    if (!isCorrect) {
        gameActive = false;
        gameState = 'gameOver';
        showGameOver();
        return;
    }

    lastClickTimeout = setTimeout(() => {
        if (gameActive) {
            drawCell(index, false);
            
            if (isLastClick) {
                score++;
                updateScore();
                sequence.push(generateSequence(SEQUENCE_INCREASE)[0]);
                playerSequence = [];
                
                setTimeout(() => {
                    if (gameActive) {
                        drawGrid();
                        showSequence();
                    }
                }, NEXT_SEQUENCE_DELAY);
            }
        }
    }, CLICK_HIGHLIGHT_DURATION);
}

function updateScore() {
    scoreElement.textContent = \`Score: \${score}\`;
}

function showGameOver() {
    overlay.style.display = 'flex';
    overlayTitle.textContent = 'Game Over';
    finalScoreElement.textContent = \`Your score: \${score}\`;
    finalScoreElement.style.display = 'block';
    startButton.textContent = 'Play Again';
}`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">In the next section, we&apos;ll add the final pieces to start a new game when you click the &quot;Play Again&quot; button. You&apos;re almost done with your Memory Maze game!</p>
      </section>
    )
  },
  {
    title: "9. Starting a New Game",
    content: 
    // Section 9: Starting a New Game
    (
      <section key="starting-new-game" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">9. Starting a New Game</h2>
        <p className="mb-4">Now we&apos;ll add two important functions that work together to start and reset our game: <InlineCode>startNewGame</InlineCode> and <InlineCode>startGame</InlineCode>. These functions will help us begin a new game when we first start playing or when we want to play again after a game over.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we&apos;ve been adding our JavaScript code.</li>
          <li className="mb-2">Scroll to the bottom of the script, after the <InlineCode>showGameOver</InlineCode> function we added in the last section.</li>
          <li className="mb-2">On a new line after the closing curly brace {'}'} of the <InlineCode>showGameOver</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>startNewGame</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function startNewGame() {
    sequence = generateSequence(INITIAL_SEQUENCE_LENGTH);
    playerSequence = [];
    score = 0;
    updateScore();
    gameState = 'playing';
    gameActive = true;
    drawGrid();

    setTimeout(() => {
        showSequence();
    }, START_GAME_DELAY);
}`}
          language="javascript"
        />
        <p className="mb-4">This function does several things to set up a new game:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It creates a new sequence for the player to remember.</li>
          <li>It resets the player&apos;s sequence and score.</li>
          <li>It updates the score display.</li>
          <li>It sets the game state to &apos;playing&apos; and activates the game.</li>
          <li>It draws the game grid.</li>
          <li>After a short delay, it shows the first sequence to remember.</li>
        </ul>
        <ol start={6} className="list-decimal pl-6 mb-4">
          <li className="mb-2">After the <InlineCode>startNewGame</InlineCode> function, press Enter twice to create two blank lines.</li>
          <li className="mb-2">On the new line, add the following code for the <InlineCode>startGame</InlineCode> function:</li>
        </ol>
        <CodeBlock
          code={`function startGame() {
    overlay.style.display = 'none';
    finalScoreElement.style.display = 'none';
    startNewGame();
}`}
          language="javascript"
        />
        <p className="mb-4">This function does three simple things:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>It hides the overlay (the screen that shows &quot;Game Over&quot; or &quot;Ready to Play?&quot;).</li>
          <li>It hides the final score display.</li>
          <li>It calls <InlineCode>startNewGame</InlineCode> to begin a fresh game.</li>
        </ul>
        <p className="mb-4">🚀 Cool Connection: The <InlineCode>startGame</InlineCode> function uses the <InlineCode>overlay</InlineCode> and <InlineCode>finalScoreElement</InlineCode> we set up at the beginning of our script!</p>
        <p className="mb-4">🎨 Customization tip: Try changing <InlineCode>INITIAL_SEQUENCE_LENGTH</InlineCode> in your game constants to make the game start easier or harder. A smaller number will make it easier, a larger number will make it harder!</p>
        <p className="mb-4">Remember, after adding these functions:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Here&apos;s what your complete JavaScript code should look like at this point:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}

async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}

function handleClick(event) {
    if (showingSequence || !gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    const index = row * GRID_SIZE + col;

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return;

    playerSequence.push(index);
    drawCell(index, true);

    if (lastClickTimeout) {
        clearTimeout(lastClickTimeout);
    }

    const isLastClick = playerSequence.length === sequence.length;
    const isCorrect = playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1];

    if (!isCorrect) {
        gameActive = false;
        gameState = 'gameOver';
        showGameOver();
        return;
    }

    lastClickTimeout = setTimeout(() => {
        if (gameActive) {
            drawCell(index, false);
            
            if (isLastClick) {
                score++;
                updateScore();
                sequence.push(generateSequence(SEQUENCE_INCREASE)[0]);
                playerSequence = [];
                
                setTimeout(() => {
                    if (gameActive) {
                        drawGrid();
                        showSequence();
                    }
                }, NEXT_SEQUENCE_DELAY);
            }
        }
    }, CLICK_HIGHLIGHT_DURATION);
}

function updateScore() {
    scoreElement.textContent = \`Score: \${score}\`;
}

function showGameOver() {
    overlay.style.display = 'flex';
    overlayTitle.textContent = 'Game Over';
    finalScoreElement.textContent = \`Your score: \${score}\`;
    finalScoreElement.style.display = 'block';
    startButton.textContent = 'Play Again';
}

function startNewGame() {
    sequence = generateSequence(INITIAL_SEQUENCE_LENGTH);
    playerSequence = [];
    score = 0;
    updateScore();
    gameState = 'playing';
    gameActive = true;
    drawGrid();

    setTimeout(() => {
        showSequence();
    }, START_GAME_DELAY);
}

function startGame() {
    overlay.style.display = 'none';
    finalScoreElement.style.display = 'none';
    startNewGame();
}`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">In the next and final section, we&apos;ll add the event listener to make our game start when we click the &quot;Start Game&quot; button. You&apos;re almost done with your Memory Maze game!</p>
      </section>
    )
  },
    {
      title: "10. Setting Up the Game to Start",
      content:
    // Section 10: Setting Up the Game to Start
    (
      <section key="setting-up-game-to-start" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">10. Setting Up the Game to Start</h2>
        <p className="mb-4">We&apos;re at the final step of creating our Memory Maze game! We just need to add two important lines of code that will make our game ready to play.</p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">Open your &quot;memory-maze.html&quot; file in your text editor.</li>
          <li className="mb-2">Find the <InlineCode>&lt;script&gt;</InlineCode> tags where we&apos;ve been adding our JavaScript code.</li>
          <li className="mb-2">Scroll to the very bottom of the script, after all the functions we&apos;ve added.</li>
          <li className="mb-2">On a new line at the very end of the script, add these two lines:</li>
        </ol>
        <CodeBlock
          code={`// Event listeners
canvas.addEventListener('click', handleClick);

// Initial setup
drawGrid();`}
          language="javascript"
        />
        <p className="mb-4">Let&apos;s break down what these lines do:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><InlineCode>canvas.addEventListener(&apos;click&apos;, handleClick);</InlineCode> tells the game to listen for clicks on the game board. When you click, it will run the <InlineCode>handleClick</InlineCode> function we created earlier.</li>
          <li><InlineCode>drawGrid();</InlineCode> draws the initial game board when the page loads, using the <InlineCode>drawGrid</InlineCode> function we made before.</li>
        </ul>
        <p className="mb-4">🚀 Cool Connection: These lines use the <InlineCode>canvas</InlineCode> we set up at the beginning and the <InlineCode>handleClick</InlineCode> and <InlineCode>drawGrid</InlineCode> functions we created earlier!</p>
        <p className="mb-4">Remember, after adding these lines:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file.</li>
          <li>Refresh your browser to see the changes.</li>
        </ol>
        <p className="mb-4">Congratulations! You&apos;ve now completed all the parts of your Memory Maze game. Let&apos;s look at the complete JavaScript code to make sure everything is in place:</p>
        <CodeBlock
          code={`// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
const INITIAL_SEQUENCE_LENGTH = 3;
const SEQUENCE_INCREASE = 1;
const SEQUENCE_SHOW_INTERVAL = 600;
const START_GAME_DELAY = 1000;
const CLICK_HIGHLIGHT_DURATION = 300;
const NEXT_SEQUENCE_DELAY = 1000;

// Game variables
let gameState = 'ready';
let score = 0;
let sequence = [];
let playerSequence = [];
let showingSequence = false;
let gameActive = false;
let lastClickTimeout = null;

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const startButton = document.getElementById('startButton');
const finalScoreElement = document.getElementById('finalScore');
const scoreElement = document.getElementById('score');

// Game functions
function drawGrid() {
    ctx.fillStyle = '#444';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * (CELL_SIZE + CELL_GAP);
            const y = i * (CELL_SIZE + CELL_GAP);
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawCell(index, active) {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP);
    if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#8A2BE2');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#444';
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function generateSequence(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
}

async function showSequence() {
    showingSequence = true;
    for (const cell of sequence) {
        drawCell(cell, true);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
        drawCell(cell, false);
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2));
    }
    showingSequence = false;
}

function startNewGame() {
    sequence = generateSequence(INITIAL_SEQUENCE_LENGTH);
    playerSequence = [];
    score = 0;
    updateScore();
    gameState = 'playing';
    gameActive = true;
    drawGrid();

    setTimeout(() => {
        showSequence();
    }, START_GAME_DELAY);
}

function handleClick(event) {
    if (showingSequence || !gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    const index = row * GRID_SIZE + col;

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return;

    playerSequence.push(index);
    drawCell(index, true);

    if (lastClickTimeout) {
        clearTimeout(lastClickTimeout);
    }

    const isLastClick = playerSequence.length === sequence.length;
    const isCorrect = playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1];

    if (!isCorrect) {
        gameActive = false;
        gameState = 'gameOver';
        showGameOver();
        return;
    }

    lastClickTimeout = setTimeout(() => {
        if (gameActive) {
            drawCell(index, false);
            
            if (isLastClick) {
                score++;
                updateScore();
                sequence.push(generateSequence(SEQUENCE_INCREASE)[0]);
                playerSequence = [];
                
                setTimeout(() => {
                    if (gameActive) {
                        drawGrid();
                        showSequence();
                    }
                }, NEXT_SEQUENCE_DELAY);
            }
        }
    }, CLICK_HIGHLIGHT_DURATION);
}

function updateScore() {
    scoreElement.textContent = \`Score: \${score}\`;
}

function showGameOver() {
    overlay.style.display = 'flex';
    overlayTitle.textContent = 'Game Over';
    finalScoreElement.textContent = \`Your score: \${score}\`;
    finalScoreElement.style.display = 'block';
    startButton.textContent = 'Play Again';
}

function startGame() {
    overlay.style.display = 'none';
    finalScoreElement.style.display = 'none';
    startNewGame();
}

// Event listeners
canvas.addEventListener('click', handleClick);

// Initial setup
drawGrid();`}
          language="javascript"
        />
        <p className="mb-4">Make sure your code matches this exactly. If you notice any differences, go back and make the necessary changes. Remember, every character matters in coding!</p>
        <p className="mb-4">🎉 Congratulations! You&apos;ve successfully created your Memory Maze game! Here&apos;s what you can do now:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Save your file one last time.</li>
          <li>Open your &quot;memory-maze.html&quot; file in your web browser.</li>
          <li>Click the &quot;Start Game&quot; button and enjoy playing your very own Memory Maze game!</li>
        </ol>
        <p className="mb-4">You&apos;ve learned so much about JavaScript, game development, and problem-solving. Great job sticking with it and creating something awesome!</p>
      </section>
    )
  },
  {
    title: "11. Stuff to try next",
    content:
    // Congratulations Section
    (
      <section key="congratulations" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">Congratulations!</h2>
        <p className="mb-4">You&apos;ve done an amazing job building your very own Memory Maze game. You&apos;ve learned about how games are put together, from drawing the board to handling player clicks. That&apos;s really impressive!</p>
        <p className="mb-4">Now that you&apos;ve got your game working, why not try making it even cooler? Here are some fun ideas to take your game to the next level:</p>
        <h3 className="text-2xl font-semibold mt-16 mb-6">1. Add Different Difficulty Levels</h3>
        <p className="mb-4">You could create an &quot;Easy&quot;, &quot;Medium&quot;, and &quot;Hard&quot; mode. Here&apos;s how:</p>
        <CodeBlock
          code={`const DIFFICULTY = {
  EASY: { INITIAL_SEQUENCE_LENGTH: 2, SEQUENCE_SHOW_INTERVAL: 800 },
  MEDIUM: { INITIAL_SEQUENCE_LENGTH: 3, SEQUENCE_SHOW_INTERVAL: 600 },
  HARD: { INITIAL_SEQUENCE_LENGTH: 4, SEQUENCE_SHOW_INTERVAL: 400 }
};

function setDifficulty(level) {
  INITIAL_SEQUENCE_LENGTH = DIFFICULTY[level].INITIAL_SEQUENCE_LENGTH;
  SEQUENCE_SHOW_INTERVAL = DIFFICULTY[level].SEQUENCE_SHOW_INTERVAL;
}`}
          language="javascript"
        />
        <p className="mb-4">Call <InlineCode>setDifficulty(&apos;EASY&apos;)</InlineCode> (or &apos;MEDIUM&apos; or &apos;HARD&apos;) before starting a new game!</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">2. Add Sound Effects</h3>
        <p className="mb-4">Make your game more exciting with sounds! You could add a sound when a square lights up, when you click correctly, or when the game ends. Here&apos;s how you could start:</p>
        <CodeBlock
          code={`const correctSound = new Audio('https://example.com/correct.mp3');
const wrongSound = new Audio('https://example.com/wrong.mp3');

function playSound(sound) {
  sound.play();
}`}
          language="javascript"
        />
        <p className="mb-4">Then call <InlineCode>playSound(correctSound)</InlineCode> when the player clicks correctly, and <InlineCode>playSound(wrongSound)</InlineCode> when they make a mistake!</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">3. Create a High Score System</h3>
        <p className="mb-4">Keep track of the best scores! You could store the top 5 scores like this:</p>
        <CodeBlock
          code={`let highScores = [];

function updateHighScores(newScore) {
  highScores.push(newScore);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5);
  // You could display these scores on your game over screen!
}`}
          language="javascript"
        />
        <p className="mb-4">Call <InlineCode>updateHighScores(score)</InlineCode> when the game ends!</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">4. Add Power-Ups</h3>
        <p className="mb-4">Create special squares that give the player an advantage. For example, a power-up that shows the sequence again:</p>
        <CodeBlock
          code={`function addPowerUp() {
  const powerUpIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
  drawCell(powerUpIndex, false, true); // Add a new parameter to drawCell for power-ups
}

function usePowerUp() {
  showSequence();
}`}
          language="javascript"
        />
        <p className="mb-4">Call <InlineCode>addPowerUp()</InlineCode> occasionally in your game loop, and <InlineCode>usePowerUp()</InlineCode> when a player clicks on a power-up square!</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">5. Create Different Patterns</h3>
        <p className="mb-4">Instead of random sequences, create specific patterns like spirals or zigzags:</p>
        <CodeBlock
          code={`function generateSpiralSequence(length) {
  const spiral = [];
  let x = 0, y = 0, dx = 1, dy = 0;
  for (let i = 0; i < length; i++) {
    spiral.push(y * GRID_SIZE + x);
    if (x + dx === GRID_SIZE || x + dx < 0 || (dx !== 0 && spiral.includes((y + dy) * GRID_SIZE + (x + dx)))) {
      [dx, dy] = [-dy, dx];
    }
    x += dx;
    y += dy;
  }
  return spiral;
}`}
          language="javascript"
        />
        <p className="mb-4">Use <InlineCode>generateSpiralSequence(INITIAL_SEQUENCE_LENGTH)</InlineCode> instead of <InlineCode>generateSequence</InlineCode> to create spiral patterns!</p>
        <p className="mt-6">Remember, coding is all about experimenting and having fun. Don&apos;t be afraid to try new things and see what happens. You might create something amazing! Keep up the great work!</p>
      </section>
    )
  },
  {
    title: "12. What did you think?",
    content:
    // Feedback Section
    (
      <section key="feedback" className="mb-8">
        <h2 className="text-3xl font-semibold mt-8 mb-6 text-vibrant-purple">We&apos;d Love to Hear From You! 🎮</h2>
        <p className="mb-4">Hey there, awesome game creator! Now that you&apos;ve built your Memory Maze game, we&apos;d love to know what you thought about making it. Your feedback will help us make our tutorials even better for other young coders like you!</p>
        <p className="mb-4">Could you take a quick moment to tell us about your experience? It&apos;s super easy and fun - just like playing your new game!</p>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => window.open('https://forms.gle/Jjdp6bFeQeLKK9N7A', '_blank')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Give Feedback
          </button>
        </div>
        <p className="mb-4">Your thoughts and ideas are super important to us. They&apos;ll help us create more awesome coding projects for kids just like you!</p>
        <p className="mb-4">Thank you for being part of our coding community! Keep creating amazing things! 🌟</p>
      </section>
    )
  }
  ]

  const handleSectionChange = (newSection: number) => {
    setCurrentSection(newSection);
    setDirection(newSection > currentSection ? 1 : -1);

    if (mainContentRef.current) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = mainContentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    if (typeof window.trackTutorialProgress === 'function') {
      window.trackTutorialProgress(sections[newSection].title);
    }
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      handleSectionChange(currentSection + 1);
    }
  }
  
  const prevSection = () => {
    if (currentSection > 0) {
      handleSectionChange(currentSection - 1);
    }
  }

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  useEffect(() => {
    setCurrentSection(prevSection => Math.min(prevSection, sections.length - 1))
    
    if (typeof window.trackTutorialProgress === 'function') {
      window.trackTutorialProgress('Tutorial Start');
    }
  }, [sections.length])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8" ref={mainContentRef}>
        <h1 className="text-4xl font-bold mb-8">Memory Maze Tutorial</h1>
        <div className="md:flex md:space-x-8">
          <div className="w-full md:w-2/3 text-xl leading-relaxed">
            <div className="md:hidden mb-8">
              <TableOfContents
                sections={sections}
                currentSection={currentSection}
                onSectionClick={handleSectionChange}
              />
            </div>
            <div className="relative" ref={contentRef}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentSection}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={pageTransition}
                  className="w-full"
                >
                  {sections[currentSection].content}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-12 space-y-4 sm:space-y-0">
              {currentSection > 0 && (
                <button
                  onClick={prevSection}
                  className="bg-electric-blue hover:bg-electric-blue/90 text-white text-xl font-bold py-3 px-6 rounded w-full sm:w-auto"
                >
                  Previous
                </button>
              )}
              {currentSection < sections.length - 1 && (
                <button
                  onClick={nextSection}
                  className="bg-electric-blue hover:bg-electric-blue/90 text-white text-xl font-bold py-3 px-6 rounded w-full sm:w-auto sm:ml-auto"
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:block" style={{ width: '300px' }}>
            <div 
              className="bg-gray-100 rounded-lg overflow-hidden"
              style={{ 
                position: 'sticky',
                top: '140px',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
              }}
            >
              <TableOfContents
                sections={sections}
                currentSection={currentSection}
                onSectionClick={handleSectionChange}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}