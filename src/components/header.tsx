import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

type Props = {
  title: string
  cartItemsQuantity?: number
}
export function Header({ title, cartItemsQuantity = 0 }: Props) {
  return (
    <View className="mx-5 flex-row items-center border-b border-slate-700 pb-5">
      <View className="flex-1">
        <Image
          alt="LOGO"
          className="h-6 w-32"
          source={require('@/assets/logo.png')}
        />

        <Text className="mt-2 font-heading text-xl text-white">{title}</Text>
      </View>

      {cartItemsQuantity > 0 && (
        <Link href="/cart" asChild>
          <TouchableOpacity activeOpacity={0.7} className="relative">
            <View className="absolute -right-1.5 z-10 h-4 w-4 items-center justify-center rounded-full bg-lime-300">
              <Text className="font-bold text-xs text-slate-900">
                {cartItemsQuantity}
              </Text>
            </View>

            <Feather name="shopping-bag" size={24} color={colors.white} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
