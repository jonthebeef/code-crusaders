import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

interface GameGridSectionProps {
  id: string
  children?: React.ReactNode
  onView: () => void
}

const gameGridCode = `// Constants for our game
const GRID_SIZE = 4;
const CELL_SIZE = 100;
const CELL_GAP = 10;

// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = GRID_SIZE * (CELL_SIZE + CELL_GAP) - CELL_GAP;
canvas.height = canvas.width;

// Function to draw the grid
function drawGrid() {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const x = col * (CELL_SIZE + CELL_GAP);
            const y = row * (CELL_SIZE + CELL_GAP);

            ctx.fillStyle = '#fff';
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

// Call the function to draw the grid
drawGrid();`

export function GameGridSection({ id, children, onView }: GameGridSectionProps) {
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
    <section id={id} ref={sectionRef} className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">Creating the Game Grid 🧩</h2>
      
      <div className="space-y-4">
        <p className="text-lg">
          Now that we have our HTML and CSS set up, let's start creating our game grid using JavaScript!
          We'll use the <InlineCode>canvas</InlineCode> element to draw our grid.
        </p>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-2">🎨 What's a Canvas?</p>
          <p className="text-lg text-yellow-800">
            Think of a canvas as a digital drawing board. It lets us use JavaScript to draw shapes, 
            lines, and even images. It's perfect for creating games and other interactive graphics!
          </p>
        </div>

        <p className="text-lg">
          Let's add the following code to our <InlineCode>game.js</InlineCode> file:
        </p>

        <CodeBlock code={gameGridCode} language="javascript" />

        <div className="space-y-4">
          <p className="text-lg font-bold">Let's break down what this code does:</p>
          
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>
              We set up some constants:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li><InlineCode>GRID_SIZE</InlineCode>: The number of cells in each row and column (4x4 grid)</li>
                <li><InlineCode>CELL_SIZE</InlineCode>: The size of each cell in pixels</li>
                <li><InlineCode>CELL_GAP</InlineCode>: The space between cells</li>
              </ul>
            </li>
            <li>We get the canvas element from our HTML and set up the drawing context.</li>
            <li>We calculate and set the canvas size based on our grid size and cell size.</li>
            <li>
              We create a <InlineCode>drawGrid()</InlineCode> function that:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>Fills the entire canvas with a light gray color (#ccc)</li>
                <li>Draws a white square for each cell in our grid</li>
              </ul>
            </li>
            <li>Finally, we call the <InlineCode>drawGrid()</InlineCode> function to display our grid.</li>
          </ol>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-purple-800 mb-2">🧪 Try it out!</p>
          <p className="text-lg text-purple-800">
            Save your <InlineCode>game.js</InlineCode> file and refresh your web browser. 
            You should see a 4x4 grid of white squares on a light gray background. 
            This is the foundation of our Memory Maze game!
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-green-800 mb-2">🌈 Customisation Ideas:</p>
          <ul className="list-disc list-inside text-lg space-y-1 text-green-800">
            <li>Try changing the <InlineCode>GRID_SIZE</InlineCode> to make the game easier or harder.</li>
            <li>Experiment with different colors for the background and cells.</li>
            <li>Adjust the <InlineCode>CELL_SIZE</InlineCode> and <InlineCode>CELL_GAP</InlineCode> to change the look of your grid.</li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  )
}

export default GameGridSection