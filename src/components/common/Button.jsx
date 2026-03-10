import React from 'react'

const Button = ({onClick, title}) => {
  return (
    <button 
    type='button'
    onClick={onClick}
    className="p-3 hover:bg-custom-green bg-green-600 text-white font-medium tracking-wide text-sm rounded-full ">
        {title}
    </button>
  )
}

export default Button