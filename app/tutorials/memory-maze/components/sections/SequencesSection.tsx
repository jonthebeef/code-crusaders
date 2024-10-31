import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

interface SequencesSectionProps {
  id: string
  children?: React.ReactNode
  onView: () => void
}

const jsGameVariables = `// Game variables
let sequence = [];
let playerSequence = [];
let score = 0;`

const jsGenerateSequence = `// Function to generate a new sequence
function generateSequence() {
    return Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
}`

const jsShowSequence = `// Function to show the sequence
function showSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        if (i < sequence.length) {
            drawGrid();
            highlightCell(sequence[i]);
            i++;
        } else {
            clearInterval(intervalId);
            drawGrid();
        }
    }, 600);
}`

const jsStartNewGame = `// Function to start a new game
function startNewGame() {
    sequence = [generateSequence()];
    playerSequence = [];
    score = 0;
    updateScore();
    drawGrid();
    setTimeout(showSequence, 500);
}

// Start the game
startNewGame();`

export function SequencesSection({ id, children, onView }: SequencesSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
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
    <section id={id} ref={sectionRef} className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Stage 4: Creating and Showing Sequences 🎭</h2>

      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-purple-800 mb-4">🧠 Time to Add Game Logic!</h3>
        <div className="space-y-4">
          <p className="text-lg">Now we're going to add the core game logic. Here's what to do:</p>
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>Open your <InlineCode>game.js</InlineCode> file</li>
            <li>Go to the end of the file</li>
            <li>Add each code block below, one at a time</li>
            <li>After adding each block, save your file and refresh your web browser to see what changes!</li>
          </ol>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h3 id="game-variables" className="text-2xl font-bold text-green-600 mb-4">Game Variables</h3>
          <CodeBlock code={jsGameVariables} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What these variables do:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li><InlineCode>sequence</InlineCode>: Stores the pattern of cells the player needs to remember.</li>
              <li><InlineCode>playerSequence</InlineCode>: Keeps track of the cells the player has clicked.</li>
              <li><InlineCode>score</InlineCode>: Keeps track of the player's current score.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 id="generate-sequence" className="text-2xl font-bold text-green-600 mb-4">Generate Sequence Function</h3>
          <CodeBlock code={jsGenerateSequence} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Creates a random number between 0 and the total number of cells.</li>
              <li>This number represents a random cell in our grid.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 id="show-sequence" className="text-2xl font-bold text-green-600 mb-4">Show Sequence Function</h3>
          <CodeBlock code={jsShowSequence} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Goes through each number in our sequence one by one.</li>
              <li>Highlights the corresponding cell for each number.</li>
              <li>Waits a short time between each highlight so the player can see the sequence.</li>
              <li>After showing all cells, it clears the grid back to normal.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 id="start-new-game" className="text-2xl font-bold text-green-600 mb-4">Start New Game Function</h3>
          <CodeBlock code={jsStartNewGame} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Creates a new sequence with one random cell.</li>
              <li>Resets the player's sequence and score.</li>
              <li>Updates the score display.</li>
              <li>Draws the grid and shows the new sequence.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg"><strong>Why is this important?</strong></p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>These functions work together to create and show the pattern players need to remember.</li>
            <li>It's like a friend showing you a series of moves that you need to copy.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Customisation opportunities:</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>In <InlineCode>showSequence</InlineCode>, try changing <InlineCode>600</InlineCode> to make the sequence show faster or slower.</li>
            <li>In <InlineCode>startNewGame</InlineCode>, you could start with more than one cell in the sequence.</li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  )
}

export default SequencesSection