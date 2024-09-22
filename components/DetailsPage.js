import { getProductByID } from "../services/menu.js"
import { addItemToCart } from "../services/order.js"
import Router from "../services/Router.js"

export class DetailsPage extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({ mode: "open" })
        const template = document.getElementById("details-page-template")
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)
        const style = document.createElement("style")
        this.root.appendChild(style)
        async function loadCSS(){
            const response = await fetch("/components/DetailsPage.css")
            style.innerText = await response.text()
        }
        loadCSS()
    }

    // <template id="details-page-template">
    //     <header>   
    //         <a href="#" onclick="app.router.navigate('/'); event.preventDefault()">&lt; Back</a>
    //         <h2></h2>
    //         <a></a>
    //     </header>
    //     <img src="">
    //     <p class="description"></p>
    //     <p class="price"></p>
    //     <button>Add to cart</button>
    // </template>

    // {
    //     "id": 11,
    //     "name": "Black Americano",
    //     "price": 1.50,
    //     "description": "Freshly pulled shots of espresso combined with hot water.",
    //     "image": "blackamericano.png"
    // },

    render() {
        const productId = this.dataset.id
        getProductByID(Number(productId)).then(product => {
            if(!product) {
                throw new Error("Invalid product")
            }
            this.root.querySelector(".description").textContent = product.description
            this.root.querySelector(".price").textContent = `$${product.price}`
            this.root.querySelector("img").src = `/data/images/${product.image}`
            this.root.querySelector("h2").innerText = product.name
            this.root.querySelector("button").addEventListener("click", () => {
                addItemToCart(product.id)
            })
        }).catch((e) => {
            alert(e.message)
        })
    }
    connectedCallback(){
        this.render()
    }
}

customElements.define("details-page", DetailsPage)