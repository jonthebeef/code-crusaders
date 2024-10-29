import React from 'react'

interface WaveDividerProps {
  topColor?: string;
  bottomColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ topColor = '#ffffff', bottomColor = '#ffffff' }) => {
  const isGradient = topColor.startsWith('gradient,')

  return (
    <div className="wave-divider" style={{ background: bottomColor }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {isGradient ? (
              topColor.split(',').slice(1).map((color, index, array) => (
                <stop key={index} offset={`${(index / (array.length - 1)) * 100}%`} stopColor={color.trim()} />
              ))
            ) : (
              <stop offset="0%" stopColor={topColor} />
            )}
          </linearGradient>
        </defs>
        <path 
          fill="url(#waveGradient)"
          fillOpacity="1"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  )
}

export default Wav

eDivider