import { DetailsPage } from "./components/DetailsPage.js"
import { MenuPage } from "./components/MenuPage.js"
import { ProductItem } from "./components/ProductItem.js"
import { OrderPage } from "./components/OrderPage.js"
import { CartItem } from "./components/CartItem.js"

import { loadData } from "./services/menu.js"
import Router from "./services/Router.js"
import Store from "./services/Store.js"

window.app = {}
app.store = Store
app.router = Router

window.addEventListener("DOMContentLoaded", () => {
    loadData()
    app.router.init()
})

window.addEventListener("appcartchange", (e) => {
    const badge = document.querySelector("#badge")
    const count = window.app.store.cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0)
    badge.textContent = count
    badge.hidden = count === 0
})