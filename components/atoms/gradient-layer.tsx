import { cn } from '@/utils'
import React, { HTMLAttributes } from 'react'

type GradientLayerProps  = HTMLAttributes<HTMLDivElement> & {
    gradient: number;
}

const GradientLayer = ({className, gradient, ...props}: GradientLayerProps) => {
  return (
    <div className={cn(`w-screen h-4 bg-gradient-to-b from-white/${gradient} to-white/${gradient} backdrop-blur-[${gradient}px] pointer-events-none`, className)} {...props} />
  )
}

export default GradientLayer