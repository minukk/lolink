import React from 'react'

interface IButton {
  title: string;
  color: string;
}

const Button = ({ title, color }: IButton) => {
  const colors: any = {
    green: 'bg-green hover:bg-ongreen',
    red: 'bg-red hover:bg-onred'
  }

  return (
    <div>
      <button className={`text-center ${colors[color]} text-white p-8 border-r-8`}>{title}</button>
    </div>
  )
}

export default Button