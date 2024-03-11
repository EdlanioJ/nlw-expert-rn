import { cn } from '@/utils/functions/cn'
import { Pressable, PressableProps, Text } from 'react-native'

type Props = {
  title: string
  isSelected?: boolean
} & PressableProps
export function CategoryButton({ title, isSelected, ...rest }: Props) {
  return (
    <Pressable
      className={cn('justify-center rounded-md bg-slate-800 px-4', {
        'border-2 border-lime-300': isSelected,
      })}
      {...rest}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
