import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { useNavigation } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'

const PHONE_NUMBER = '244921299139'

export default function Cart() {
  const [address, setAddress] = useState('')
  const navigation = useNavigation()
  const cartStore = useCartStore()
  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover o produto ${product.title}?`, [
      { text: 'Cancelar' },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe o endereço de entrega')
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join('')

    const message = `
      NOVO PEDIDO

      \n entregar em: ${address}

      ${products}
      
      Valor total: ${total}
      `

    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )
    cartStore.clear()
    navigation.goBack()
  }
  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="my-8 text-center font-body text-slate-400">
                Seu carrinho esta vazio.
              </Text>
            )}

            <View className="mb-4 mt-5 flex-row items-center gap-2">
              <Text className="font-subtitle text-xl text-white">Total</Text>
              <Text className="font-heading text-2xl text-lime-400">
                {total}
              </Text>
            </View>
            <Input
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              placeholder="informe o endereço de entrega com rua, bloco, prédio, apartamento"
              blurOnSubmit
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="gap-5 p-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
