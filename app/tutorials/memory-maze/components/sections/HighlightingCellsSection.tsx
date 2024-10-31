import React from 'react'

// Inline the CodeBlock component
function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <pre className={`language-${language}`}>
      <code>{code}</code>
    </pre>
  )
}

// Inline the InlineCode component
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 font-mono text-sm">
      {children}
    </code>
  )
}

interface HighlightingCellsSectionProps {
  id: string
  children?: React.ReactNode // Make children optional
}

const highlightCellCode = `// Function to highlight a cell
function highlightCell(row, col, color) {
    const x = col * (CELL_SIZE + CELL_GAP);
    const y = row * (CELL_SIZE + CELL_GAP);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

// Example usage:
// highlightCell(1, 2, 'yellow'); // This will highlight the cell at row 1, column 2 with yellow color
`

export function HighlightingCellsSection({ id, children }: HighlightingCellsSectionProps) {
  return (
    <section id={id} className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">Highlighting Cells 🔦</h2>
      
      <div className="space-y-4">
        <p className="text-lg">
          Now that we have our grid, let's create a function to highlight individual cells. 
          This will be useful for showing the sequence that players need to remember!
        </p>

        <p className="text-lg">
          Add this new function to your <InlineCode>game.js</InlineCode> file:
        </p>

        <CodeBlock code={highlightCellCode} language="javascript" />

        <div className="space-y-4">
          <p className="text-lg font-bold">Let's break down what this function does:</p>
          
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>
              The function takes three parameters:
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li><InlineCode>row</InlineCode>: Which row the cell is in (0 to 3)</li>
                <li><InlineCode>col</InlineCode>: Which column the cell is in (0 to 3)</li>
                <li><InlineCode>color</InlineCode>: What color to highlight the cell with</li>
              </ul>
            </li>
            <li>It calculates the <InlineCode>x</InlineCode> and <InlineCode>y</InlineCode> position of the cell on the canvas.</li>
            <li>It sets the fill color to the specified color.</li>
            <li>Finally, it draws a filled rectangle at the calculated position, effectively highlighting the cell.</li>
          </ol>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-2">🧠 Understanding Coordinates</p>
          <p className="text-lg text-yellow-800">
            Remember, in our grid:
          </p>
          <ul className="list-disc list-inside text-lg space-y-1 text-yellow-800">
            <li>Rows go from top to bottom (0 at the top, 3 at the bottom)</li>
            <li>Columns go from left to right (0 at the left, 3 at the right)</li>
          </ul>
          <p className="text-lg text-yellow-800 mt-2">
            So, <InlineCode>highlightCell(0, 0, 'red')</InlineCode> would highlight the top-left cell in red, 
            while <InlineCode>highlightCell(3, 3, 'blue')</InlineCode> would highlight the bottom-right cell in blue.
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-purple-800 mb-2">🎨 Try it out!</p>
          <p className="text-lg text-purple-800">
            To test your new function, add these lines at the end of your <InlineCode>game.js</InlineCode> file:
          </p>
          <CodeBlock code={`
// Test our highlightCell function
highlightCell(0, 0, 'red');
highlightCell(1, 1, 'blue');
highlightCell(2, 2, 'green');
highlightCell(3, 3, 'yellow');
          `} language="javascript" />
          <p className="text-lg text-purple-800 mt-2">
            Save your file and refresh your browser. You should see four cells highlighted in different colors!
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-bold text-green-800 mb-2">🌈 Customization Ideas:</p>
          <ul className="list-disc list-inside text-lg space-y-1 text-green-800">
            <li>Try highlighting different cells with various colors.</li>
            <li>Can you make a pattern or a smiley face using highlighted cells?</li>
            <li>Experiment with partially highlighting cells by adjusting the size of the filled rectangle.</li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  )
}

export default HighlightingCellsSection