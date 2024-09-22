const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault()
                Router.navigate(event.target.getAttribute("href"))
            })
        })

        window.addEventListener("popstate", (event) => {
            Router.navigate(event.state.route, true)
        })
        Router.navigate(window.location.pathname)
        
    },
    navigate: (route, replace = false) => {
        if(!replace){
            history.pushState({ route }, null, route)
        }
        let pageElement = null
        switch(route){
            case "/":
                pageElement = document.createElement("menu-page")
                break;
            case "/order":
                pageElement = document.createElement("order-page")
                break;
            default:{
                if(route.startsWith("/product/")){
                    const id = route.split("/product/").at(-1)
                    pageElement = document.createElement("details-page")
                    pageElement.dataset.id = id
                }
            }
        }
        if(pageElement){
            const main = document.querySelector("main")
            main.children[0]?.remove()
            main.appendChild(pageElement)
        } else {

        }
        window.scrollX = 0
        window.scrollY = 0
    }
}

export default Router