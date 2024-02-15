'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'

const Logo = (size) => {
  const [displayedText, setDisplayedText] = useState('NEKODE')
  const [hovered, setHovered] = useState(false)

  const handleMouseOver = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setDisplayedText('NEKODE')
  }

  useEffect(() => {
    if (hovered) {
      const letters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let iteration = 0
      const interval = setInterval(() => {
        const newText = displayedText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') {
              return ' '
            }
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join('')

        setDisplayedText(newText)

        if (iteration >= displayedText.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }
  }, [hovered, displayedText])

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className='flex items-center justify-center gap-x-2.5 lg:gap-x-5 text-white'
    >
      {displayedText.split('').map((letter, index) => (
        <div
          key={index}
          className={`${
            size.size
          } p-2 pt-4 flex justify-center items-center border-gray-500 ${
            letter === ' ' ? 'none' : 'border'
          }`}
        >
          {letter === ' ' ? (
            <span>&nbsp;</span>
          ) : (
            <span
              className={`${hovered === true ? 'text-gray-500' : 'text-white'}`}
            >
              {letter}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Logo
