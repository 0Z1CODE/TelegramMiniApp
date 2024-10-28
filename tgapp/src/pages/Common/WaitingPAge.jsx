import React from 'react'
import LoaderCircle from '../../components/common/Loader/LoaderCircle'

const WaitingPAge = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-bars text-accent loading-lg"></span>
      </div>
    </>
  )
}

export default WaitingPAge