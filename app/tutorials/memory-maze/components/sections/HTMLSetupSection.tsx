import React from 'react'
import { CodeBlock, InlineCode } from '../shared'

const htmlStructure = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Maze</title>
    <style>
        /* CSS styles will go here */
    </style>
</head>
<body>
    <div id="gameContainer">
        <h1>Memory Maze</h1>
        <div id="score">Score: 0</div>
        <canvas id="gameCanvas" width="300" height="300"></canvas>
    </div>
    <script src="game.js"></script>
</body>
</html>`

const htmlStyles = `<style>
    body {
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
    }
    #gameContainer {
        text-align: center;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
        color: #333;
        margin-bottom: 10px;
    }
    #score {
        color: #666;
        margin-bottom: 20px;
        font-size: 18px;
    }
    canvas {
        border: 2px solid #333;
        border-radius: 5px;
    }
</style>`

export function HTMLSetupSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Stage 1: Setting Up the Game Board 🖼️</h2>
      <p className="mb-8 text-lg">Let's break down our HTML file into smaller parts and understand what each part does:</p>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">HTML Structure</h3>
          <CodeBlock code={htmlStructure} language="html" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What each part does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li><InlineCode>&lt;!DOCTYPE html&gt;</InlineCode>: Tells the browser this is an HTML5 document.</li>
              <li><InlineCode>&lt;html lang="en"&gt;</InlineCode>: The root element of the HTML page, set to English language.</li>
              <li><InlineCode>&lt;head&gt;</InlineCode>: Contains meta information about the document.</li>
              <li><InlineCode>&lt;meta charset="UTF-8"&gt;</InlineCode>: Specifies the character encoding for the document (UTF-8).</li>
              <li><InlineCode>&lt;meta name="viewport"&gt;</InlineCode>: Makes the website look good on all devices.</li>
              <li><InlineCode>&lt;title&gt;</InlineCode>: Sets the title of the web page.</li>
              <li><InlineCode>&lt;style&gt;</InlineCode>: Contains CSS to style our game (we'll look at this next).</li>
              <li><InlineCode>&lt;body&gt;</InlineCode>: Contains the visible content of the document.</li>
              <li><InlineCode>&lt;div id="gameContainer"&gt;</InlineCode>: A container for our game elements.</li>
              <li><InlineCode>&lt;h1&gt;</InlineCode>: The main title of our game.</li>
              <li><InlineCode>&lt;div id="score"&gt;</InlineCode>: Where we'll display the player's score.</li>
              <li><InlineCode>&lt;canvas&gt;</InlineCode>: Where we'll draw our game grid.</li>
              <li><InlineCode>&lt;script src="game.js"&gt;</InlineCode>: Links to our JavaScript file where we'll write our game logic.</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">CSS Styles</h3>
          <CodeBlock code={htmlStyles} language="css" />
          <div className="mt-6 space-y-4">
            <p className="text-lg"><strong>What each style does:</strong></p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li><InlineCode>body</InlineCode>: Sets the background colour and centres the content.</li>
              <li><InlineCode>#gameContainer</InlineCode>: Styles the main game container with a white background and rounded corners.</li>
              <li><InlineCode>h1</InlineCode>: Styles the main title.</li>
              <li><InlineCode>#score</InlineCode>: Styles the score display.</li>
              <li><InlineCode>canvas</InlineCode>: Adds a border to our game canvas.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg"><strong>Why is this important?</strong></p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>The HTML structure organises our game elements.</li>
            <li>The CSS styles make our game look nice and organised on the screen.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-lg font-bold text-yellow-800 mb-4">Customisation opportunities:</p>
          <ul className="list-disc list-inside text-lg space-y-2 text-yellow-800">
            <li>Try changing the <InlineCode>background</InlineCode> colour in the <InlineCode>body</InlineCode> style.</li>
            <li>Experiment with different <InlineCode>font-family</InlineCode> values to change how the text looks.</li>
            <li>Adjust the <InlineCode>border-radius</InlineCode> of the <InlineCode>#gameContainer</InlineCode> to make the corners more or less rounded.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}