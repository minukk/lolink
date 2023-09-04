import React from 'react'

interface IButton {
  title: string;
  color: string;
  onclick?: any
}

const Button = ({ title, color, onclick }: IButton) => {
  const colors: any = {
    green: 'bg-green hover:bg-ongreen',
    red: 'bg-red hover:bg-onred'
  }

  return (
    <button onClick={onclick} className={`text-center ${colors[color]} text-white p-8 rounded-lg`}>{title}</button>
  )
}

export default Button