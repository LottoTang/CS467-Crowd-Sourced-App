const products = {
    item_1: {
        name: "tomato sauce",
        brands: ["Rao's", "Preggo", "Barilla", "Ragu", "Pomi"]
    },
    item_2: {
        name: "potatoes",
        brands: ["Bowl and Basket", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_3: {
        name: "cherries",
        brands: ["Bowl and Basket", "Nature", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_4: {
        name: "chicken",
        brands: ["Tyson's", "Gordons", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_5: {
        name: "bread crumbs",
        brands: ["Knorr", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_6: {
        name: "tuna",
        brands: ["Shoprite", "Gordons", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_7: {
        name: "bell peppers",
        brands: ["Bowl and Basket", "Shoprite", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_8: {
        name: "coffee",
        brands: ["Lavazza", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_9: {
        name: "peanuts",
        brands: ["Nature", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_10: {
        name: "tomato",
        brands: ["Bowl and Basket", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    },
    item_11: {
        name: "tomato juice",
        brands: ["Shoprite", "Half Foods", "Brand 3", "Brand 4", "Brand 5"]
    }
}

const stores = {
    store_1: {
        name: "Shawn's",
        city: "Boston",
        state: "Massachusetts"
    },
    store_2: {
        name: "Half Foods",
        city: "San Diego",
        state: "California"
    },
    store_3: {
        name: "Walmart",
        city: "Cleveland",
        state: "Ohio"
    },
    store_4: {
        name: "Shoprite",
        city: "Atlanta",
        state: "Georgia"
    },
}

const promotions = {}
possible_promotions = ["50% off", "20% off", "50¢ off", "$1 off", "Buy 1 Get 1 Free"]
for (const idx in possible_promotions){
    promotions[idx] = {   promotion_type: possible_promotions[idx],
                            // start between 0 and 5 days before today, end 0-5 days after today
                            // Used Date.now() method instead of new Date due to returning error otherwise
                            //start_time : Date.now() - 86400000 * Math.floor(Math.random() * 5),
                            //end_time : Date.now() + 86400000 * Math.floor(Math.random() * 5) }

                            start_time: new Date(+new Date() - 86400000 * Math.floor(Math.random()*5)),
                            end_time: new Date(+new Date() + 86400000 * Math.floor(Math.random()*5)) }
}

const items = {}
let i = 100
for (const product_id of Object.keys(products)){
    for (const brand of products[product_id].brands){
        for (const store_id of Object.keys(stores)){
            // 1 in 2 chance that a store has the specified brand-product
            if (Math.floor(Math.random()*2) == 1) {

                let promotion_id = -1
                // 1 in 4 chance that item has a promotion
                if (Math.floor(Math.random()*4) == 1) {
                    // promotion is selected randomly
                    promotion_id = Math.floor(Math.random()*possible_promotions.length)
                }

                items[i] = {
                    store: store_id,
                    product: product_id,
                    brand: brand,
                    price: ((Math.floor(Math.random()*900) + 100) / 100),
                    promotion: promotion_id
                }
                i += 1
            }
        }
    }
}

// create a randomly generated shopping list
function generateShoppingList() {
    // include at least the first few tomato sauce items
    const items_in_list = [100, 101, 102, 103, 104, 105]
    const possible_items = Object.keys(items).length

    // randomly select items to add to the list
    for (let i = 0; i < 5; i++){
        let random = Math.floor(Math.random()*(possible_items)) + 100
        while (items_in_list.includes(random))
            random = Math.floor(Math.random()*(possible_items)) + 100
        items_in_list.push(random)
    }

    // evaluate the items in the list, pull their product name and brands
    const products_dict = {}
    for (const item_id of items_in_list) {
        const item = items[item_id]

        const product = products[item.product].name

        if (product in products_dict) products_dict[product].add(item.brand)
        else products_dict[product] = new Set([item.brand])
    }

    // create the list itself by adding all items with specified product and brands
    const shopping_list = {}
    for (const check_product of Object.keys(products_dict)) {
        const shopping_items = []
        for (const item_id of Object.keys(items)){
            const item = items[item_id]
            const product = products[item.product].name
            if (product == check_product) {
                if (products_dict[product].has(item.brand)) shopping_items.push(item_id)
            }
        }
        shopping_list[check_product] = shopping_items
    }
    return shopping_list
}

export {products, stores, promotions, items, generateShoppingList}



shopping_list_looks_like = {
    "tomato": ["item_id1", "item_id2", "item_id3"],
    "potato": ["item_id1", "item_id2", "item_id3"]
}