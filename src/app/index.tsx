import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'
import { Link } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'
import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Product } from '@/components/product'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const sectionRef = useRef<SectionList<ProductProps>>(null)
  const cartStore = useCartStore()

  const cartItemsQuantity = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  function handleCategorySelect(category: string) {
    setSelectedCategory(category)
    const sectionIndex = CATEGORIES.findIndex((c) => c === category)
    sectionRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
    })
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça o seu pedido" cartItemsQuantity={cartItemsQuantity} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handleCategorySelect(item)}
            isSelected={selectedCategory === item}
          />
        )}
        className="mt-5 max-h-12 bg-slate-900 pb-3"
        contentContainerClassName="gap-4 px-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <SectionList
        sections={MENU}
        ref={sectionRef}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        className="flex-1 p-5"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="font-heading mb-3 mt-8 text-xl text-white">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
      />
    </View>
  )
}
