import type {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  ReactElement,
  SVGProps,
} from 'react'

interface ISupportModalProps {
  icon: JSXElementConstructor<SVGProps<SVGSVGElement>>
  title: string
  description: string
  children?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
}

export type { ISupportModalProps }
