import { ProductProps } from '@/utils/data/products'
import { forwardRef } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type Props = TouchableOpacityProps & {
  data: ProductProps & { quantity?: number }
}
const Product = forwardRef<TouchableOpacity, Props>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...rest}
        className="w-full flex-row items-center pb-4"
      >
        <Image
          source={data.thumbnail}
          alt={'product img'}
          className="h-20 w-20 rounded-md"
        />

        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="font-subtitle flex-1 text-base text-slate-100">
              {data.title}
            </Text>

            {data.quantity && (
              <Text className="font-subtitle text-sm text-slate-400">
                x {data.quantity}
              </Text>
            )}
          </View>
          <Text className="5 mt-0 text-xs leading-5 text-slate-400">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)

Product.displayName = 'Product'
export { Product }
