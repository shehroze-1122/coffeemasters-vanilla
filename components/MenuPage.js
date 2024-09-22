export class MenuPage extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({ mode: "open" })
        const style = document.createElement("style")
        this.root.appendChild(style)        
        async function loadCSS () {
            const response = await fetch("/components/MenuPage.css")
            style.textContent = await response.text()
            
        }
        loadCSS()
    }

    connectedCallback() {
        const template = document.getElementById("menu-page-template")
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)
        window.addEventListener("appmenuchange", this.handleMenuChange.bind(this))
        this.handleMenuChange()
    }

    handleMenuChange() {
        const menuListContainer = this.root.querySelector("#menu") 
        if(window.app.store.menu){
            menuListContainer.innerHTML = ""
            for(let category of window.app.store.menu){
                const categoryItem = document.createElement("li")
                categoryItem.innerHTML = `
                <h3>${category.name}</h3>
                <ul class="products"></ul>
                `
                menuListContainer.appendChild(categoryItem)
                const productsContainer = categoryItem.querySelector(".products")
                for (let product of category.products){
                    const productItemElement = document.createElement("product-item")
                    productItemElement.dataset.product = JSON.stringify(product)
                    productsContainer.appendChild(productItemElement)
                }
            }

        } else {
            menuListContainer.innerHTML = "Loading..."
        }
    }
}

customElements.define("menu-page", MenuPage)