import { ProductProps } from '@/utils/data/products'
import { ProductCartProps } from '../cart-store'

export function add(
  products: ProductCartProps[],
  newProduct: ProductProps,
): ProductCartProps[] {
  const existingProduct = products.find(
    (product) => product.id === newProduct.id,
  )

  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product,
    )
  }

  return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(
  products: ProductCartProps[],
  productId: string,
): ProductCartProps[] {
  const updatedProducts = products.map((product) =>
    productId === product.id
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product,
  )
  return updatedProducts.filter((product) => product.quantity > 0)
}
