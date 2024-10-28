import React from 'react'
import useAppSettings from '../../../zustand/useAppSettings'
import useUserSettings from '../../../zustand/useUserSettings'
const Header = () => {
  const { pageTitle } = useAppSettings()
  const { currentUser } = useUserSettings()
  return (
    <div className='bg-accent flex w-full p-3 bold mb-3 ' >
    <h3 className='text-white font-semibold'> {pageTitle} </h3>
    </div>
  )
}

export default Header