import { addItemToCart } from "../services/order.js"
import Router from "../services/Router.js"

export class ProductItem extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback() {
        const template = document.querySelector("#product-item-template")
        const content = template.content.cloneNode(true)
        this.appendChild(content)

        const product = JSON.parse(this.dataset.product)
        this.querySelector("h4").textContent = product.name
        this.querySelector(".price").textContent = product.price
        this.querySelector("img").src = `/data/images/${product.image}`
        this.querySelector("a").addEventListener("click", (event) => {
            if(event.target.tagName.toLowerCase() === "button"){
                // add to cart
                addItemToCart(product.id)
            } else {
                Router.navigate(`/product/${product.id}`)
            }
            event.preventDefault()
        })
    }
}

customElements.define("product-item", ProductItem)