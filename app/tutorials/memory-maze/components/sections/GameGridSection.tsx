import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

const jsConstants = `// Game constants
const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');`

const jsDrawGrid = `// Function to draw the grid
function drawGrid() {
    ctx.fillStyle = '#ddd';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
    }
}

// Draw the initial grid
drawGrid();`

export function GameGridSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Stage 2: Creating the Game Grid 🏗️</h2>
      <p className="mb-8 text-lg">Now let's break down our JavaScript code into smaller parts:</p>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Setting up Constants and Canvas</h3>
          <CodeBlock code={jsConstants} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this code does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li><InlineCode>GRID_SIZE</InlineCode>: Sets how many cells we want in each row and column.</li>
              <li><InlineCode>CELL_SIZE</InlineCode>: Sets how big each cell should be in pixels.</li>
              <li><InlineCode>CANVAS_SIZE</InlineCode>: Calculates the total size of our game area.</li>
              <li>The last two lines get our canvas ready for drawing.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Drawing the Grid</h3>
          <CodeBlock code={jsDrawGrid} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Sets the colour to light grey (<InlineCode>'#ddd'</InlineCode>).</li>
              <li>Uses two loops to draw a square for each cell in our grid.</li>
              <li>Calls the function to draw the initial grid.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg"><strong>Why is this important?</strong></p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>This creates the game board where we'll play our memory game.</li>
            <li>It's like drawing a grid on paper before we start playing noughts and crosses.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Customisation opportunities:</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>Try changing the <InlineCode>GRID_SIZE</InlineCode> to make the grid bigger or smaller.</li>
            <li>Change the colour in <InlineCode>ctx.fillStyle</InlineCode> to make the grid a different colour.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}