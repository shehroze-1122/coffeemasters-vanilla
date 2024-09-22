import { removeItemFromCart } from "../services/order.js";

export class CartItem extends HTMLElement {
    constructor() {
        super();    
    }   

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);
        this.innerHTML = ""; // Clear the element

        const template = document.getElementById("cart-item-template");
        const content = template.content.cloneNode(true);

        this.appendChild(content);    

        this.querySelector(".qty").textContent = `${item.quantity}x`;
        this.querySelector(".name").textContent = item.name;
        this.querySelector(".price").textContent = `$${item.price.toFixed(2)}`;
        this.querySelector("a.delete-button").addEventListener("click", event => {
            event.preventDefault()
            removeItemFromCart(item.id);
        })
      }
}

customElements.define("cart-item", CartItem);