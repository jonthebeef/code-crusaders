import Link from 'next/link'

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-yellow-300 p-8">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">Code Crusaders Tutorials</h1>
          <p className="text-xl text-center text-purple-600">Choose a tutorial to start learning!</p>
        </div>
        
        <div className="p-12 space-y-8">
          <div className="grid gap-6">
            <Link 
              href="/tutorials/memory-maze"
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Memory Maze Game 🧠</h2>
              <p className="text-gray-600">Build a fun memory game using JavaScript! Perfect for beginners.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}