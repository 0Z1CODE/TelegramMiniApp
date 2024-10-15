import React from 'react'

const LoaderCircle = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-20 h-20 border-8 border-t-8 border-accent rounded-full animate-spin"></div>
    </div>
  )
}

export default LoaderCircle