import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

const variants = {
  primary: 'bg-primary text-white hover:bg-slate-800',
  outline: 'border border-slate-200 text-primary hover:border-primary hover:text-primary',
  ghost: 'text-primary hover:bg-slate-100',
}

const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button
    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
    {...props}
  />
)

export default Button
