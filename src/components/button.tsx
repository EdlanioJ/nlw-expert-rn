import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonProps = {
  children: React.ReactNode
} & TouchableOpacityProps

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-12 flex-row items-center justify-center rounded-md bg-lime-400"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

type ButtonTextProps = {
  children: React.ReactNode
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="mx-2 font-heading text-base text-black">{children}</Text>
  )
}

type ButtonIconProps = {
  children: React.ReactNode
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
