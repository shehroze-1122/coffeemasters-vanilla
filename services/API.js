const API = {
    url: "/data/menu.json",
    fetchMenu: async () => {
        const response = await fetch(API.url)
        return response.json()
    }
}

export default API