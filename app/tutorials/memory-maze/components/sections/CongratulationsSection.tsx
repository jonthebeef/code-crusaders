import React from 'react'

interface CongratulationsSectionProps {
  id: string
}

export function CongratulationsSection({ id }: CongratulationsSectionProps) {
  return (
    <section id={id} className="space-y-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Congratulations! 🎉</h2>
      <p className="mb-8 text-lg">You've built your very own memory game! Here are some ideas for further customisation:</p>
      
      <div className="bg-yellow-100 p-8 rounded-lg">
        <p className="text-lg font-bold text-yellow-800 mb-6">More ways to make the game your own:</p>
        <ol className="list-decimal list-inside space-y-4 text-lg text-yellow-800">
          <li>Change the colours of the grid and highlighted cells to make the game look how you want.</li>
          <li>Adjust the grid size to make the game easier or harder.</li>
          <li>Change the speed of the sequence to adjust the difficulty.</li>
          <li>Add sound effects or background music to make the game more exciting.</li>
          <li>Create different levels that get progressively harder as the player's score increases.</li>
        </ol>
      </div>
      
      <p className="mt-8 text-xl font-bold text-purple-600">Remember, coding is all about experimenting and having fun. Don't be afraid to try new things and see what happens. Happy coding! 🚀</p>
    </section>
  )
}