import React, { ReactElement } from "react";
import classNames from 'classnames'

interface IIcon { 
    size: 'sm' | 'md' | 'lg',
    animation?: 'pulse'
    children?: React.ReactNode,
    className?: string,
}

interface IControlIcon extends IIcon {
    onClick?: () => void,
    label: string,
    disabled?: boolean
}

const ControlIcon = ({size, children, onClick, className, disabled = false, animation} : IControlIcon) : ReactElement => {

    const sizes = {
        'sm': 'w-3',
        'md': 'w-6',
        'lg': 'w-9'
    }

    const animations = {
        pulse: 'animate-pulse'
    }

    return <div onClick={onClick && !disabled ? () => onClick() : undefined}
                className={
                    classNames(
                        sizes[size], 
                        animation !== undefined ? animations[animation] : '',
                        disabled ? 'text-gray-300 cursor-not-allowed' : ' hover:text-gray-600 text-gray-500 cursor-pointer transform active:scale-95 active:text-gray-600',
                        className
                )} > 
        {children}
    </div>

}
  
export {
    ControlIcon
}