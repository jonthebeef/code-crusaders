import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

const jsHighlightCell = `// Function to highlight a cell
function highlightCell(index) {
    const x = (index % GRID_SIZE) * CELL_SIZE;
    const y = Math.floor(index / GRID_SIZE) * CELL_SIZE;
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1);
}

// Test highlighting a cell
highlightCell(12);`

export function HighlightingCellsSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Stage 3: Highlighting Cells 🔦</h2>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Highlight Cell Function</h3>
          <CodeBlock code={jsHighlightCell} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Takes a number (<InlineCode>index</InlineCode>) and figures out which cell it corresponds to.</li>
              <li>Sets the colour to pink (<InlineCode>'#ff69b4'</InlineCode>).</li>
              <li>Draws a pink square over the cell we want to highlight.</li>
              <li>Tests the function by highlighting cell number 12.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg"><strong>Why is this important?</strong></p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>This function will be used to show the player which cells they need to remember.</li>
            <li>It's like using a highlighter to mark important words in a book.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Customisation opportunities:</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>Change the colour of the highlighted cell by changing <InlineCode>'#ff69b4'</InlineCode> to another colour.</li>
            <li>Try changing the number in <InlineCode>highlightCell(12)</InlineCode> to highlight different cells.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}