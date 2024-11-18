import React, { HTMLAttributes } from 'react'
import GradientLayer from '../atoms/gradient-layer'
import { cn } from '@/utils'

type GradientsProps = HTMLAttributes<HTMLDivElement> & {
    layers: number[]
}

const Gradients = ({className, layers = [], ...props}: GradientsProps) => {

  return (
    <div className={cn('flex flex-col fixed top-0 left-0 right-0', className)} {...props}>
        {
            layers.map((gradient, index) => (
                <GradientLayer gradient={gradient} key={index} />
            ))
        }
    </div>
  )
}

export default Gradients