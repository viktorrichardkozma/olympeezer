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

const animations = {
    pulse: 'animate-pulse'
}

const ControlIcon = ({size, children, onClick, className, disabled = false, animation} : IControlIcon) : ReactElement => {

    const sizes = {
        'sm': 'w-3',
        'md': 'w-6',
        'lg': 'w-9'
    }

    return <div onClick={onClick && !disabled ? () => onClick() : undefined}
                className={
                    classNames(
                        sizes[size], 
                        animation !== undefined ? animations[animation] : '',
                        'transition-all',
                        disabled ?
                            'text-gray-100 group-hover:text-gray-300 cursor-not-allowed' :
                            'group-hover:hover:text-gray-600 group-hover:text-gray-500 group-hover:active:text-gray-600 text-gray-300 cursor-pointer transform active:scale-95 ',
                        className
                )} > 
        {children}
    </div>
}
  
const SimpleIcon = ({size, children, className, animation} : IIcon) : ReactElement => {

    const sizes = {
        'sm': 'w-3',
        'md': 'w-6',
        'lg': 'w-9'
    }


    return <div className={
                    classNames(
                        sizes[size], 
                        animation !== undefined ? animations[animation] : '',
                        'text-gray-500',
                        className
            )}>
        {children}
    </div>
}

export {
    ControlIcon,
    SimpleIcon
}