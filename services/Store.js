const Store = {
    menu: null,
    cart: []
}

const storeProxy = new Proxy(Store, {
    set: (target, property, newValue) => {
        target[property] = newValue

        if(property === "menu"){
            window.dispatchEvent(new Event("appmenuchange"))
        }
        if(property === "cart"){
            window.dispatchEvent(new Event("appcartchange"))
        }

        return true
    }
})

export default storeProxy