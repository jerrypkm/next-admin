import { getCookie, hasCookie, setCookie } from "cookies-next"
import type { ShoppingCart } from "../interfaces/shoppingCart.interface"

export const getCookieCart = (): { [id: string]: number } => {
  
  if(hasCookie('cart')){
    const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' ) as ShoppingCart
    return cookieCart
  }

  return {}
}

export const addProductToCart = ( id: string ) => {

  const cookieCart = getCookieCart();

  if( cookieCart[id] ){
    cookieCart[id] += 1
  }
  else{
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const deleteProductFromCart = ( id: string ) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id]

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = ( id: string ) => {

  const cookieCart = getCookieCart();
  if(!cookieCart[id]) return

  if( cookieCart[id] > 1 ){
    cookieCart[id] -= 1
  }
  else{
    delete cookieCart[id]
  }

  setCookie('cart', JSON.stringify(cookieCart))
}