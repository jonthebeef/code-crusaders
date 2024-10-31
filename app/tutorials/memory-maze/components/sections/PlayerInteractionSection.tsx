import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

interface PlayerInteractionSectionProps {
  id: string
  children?: React.ReactNode
  onView: () => void
}

const jsUpdateScore = `// Function to update the score
function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}`

const jsHandleClick = `// Function to handle player clicks
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);
    const index = cellY * GRID_SIZE + cellX;

    playerSequence.push(index);
    highlightCell(index);

    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        alert('Game Over! Your score: ' + score);
        startNewGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score++;
        updateScore();
        playerSequence = [];
        sequence.push(generateSequence());
        setTimeout(showSequence, 1000);
    }
}

// Add click event listener to the canvas
canvas.addEventListener('click', handleClick);`

export function PlayerInteractionSection({ id, children, onView }: PlayerInteractionSectionProps) {
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
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Stage 5: Handling Player Clicks 👆</h2>

      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-purple-800 mb-4">🎮 Time to Make the Game Interactive!</h3>
        <div className="space-y-4">
          <p className="text-lg">Now we're going to add the code that lets players interact with the game. Here's what to do:</p>
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>Open your <InlineCode>game.js</InlineCode> file</li>
            <li>Go to the end of the file</li>
            <li>Add each code block below, one at a time</li>
            <li>After adding each block, save your file and refresh your web browser to test the game!</li>
          </ol>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h3 id="update-score" className="text-2xl font-bold text-green-600 mb-4">Update Score Function</h3>
          <CodeBlock code={jsUpdateScore} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Updates the score display on the webpage with the current score.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 id="handle-click" className="text-2xl font-bold text-green-600 mb-4">Handle Click Function</h3>
          <CodeBlock code={jsHandleClick} language="javascript" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What this function does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Figures out which cell was clicked based on where the player clicked on the canvas.</li>
              <li>Adds the clicked cell to the player's sequence and highlights it.</li>
              <li>Checks if the clicked cell matches the correct cell in the sequence:</li>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>If it's wrong, it ends the game and shows the final score.</li>
                <li>If it's correct and completes the sequence, it increases the score, adds a new cell to remember, and shows the new sequence.</li>
              </ul>
              <li>Adds a listener to detect when the player clicks on the canvas.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg"><strong>Why is this important?</strong></p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>This turns our project from a simple animation into an interactive game.</li>
            <li>It allows the player to test their memory and try to achieve a high score.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Customisation opportunities:</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>Try changing <InlineCode>setTimeout(showSequence, 1000)</InlineCode> to make the game show the new sequence faster or slower.</li>
            <li>You could add a sound effect when the player clicks a cell (this would be an advanced feature!).</li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  )
}

export default PlayerInteractionSection