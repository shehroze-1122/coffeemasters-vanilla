import API from "./API.js"

export const loadData = async () => {
    const data = await API.fetchMenu()
    window.app.store.menu = data
}

export const getProductByID = async (id) => {
    if(!window.app.store.menu) await loadData()
    const menu = window.app.store.menu
    
    if(!menu) return null

    let product = null;
    for(let i = 0; i<menu.length; i++){
        const { products } = menu[i]
        const matchingProduct = products.find(product => product.id === id)
        if(matchingProduct){
            product = matchingProduct
            break
        }
    }

    return product
}