import { getProductByID } from "./menu.js"

export const addItemToCart = async (id) => {
    const product = await getProductByID(id)
    if(!product) return 
    const existingItem = window.app.store.cart.find(item => item.id === id)
    if(existingItem){
        window.app.store.cart = window.app.store.cart.map(item => {
            if(item.id ===  id){
                return {...item, quantity: item.quantity+1}
            }
            return item
        })
    } else {
        window.app.store.cart = [...window.app.store.cart, { ...product, quantity: 1}]
    }
}

export const removeItemFromCart = (id) => {
    window.app.store.cart = window.app.store.cart.filter(item => item.id !== id)
}