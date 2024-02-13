// The purpose of this document is to contain helper methods for the app

// import data from test file 2
import { items, products, stores, promotions } from "../../testData/testingData2";

// Test data
const testData = [
    { item_id: "123", store_id: "Shoprite", name: "tomato sauce", brand: "Barilla", category: "groceries", price: 4.99 },
    { item_id: "456", store_id: "Shoprite", name: "potatoes", brand: "Shoprite", category: "groceries", price: 3.99 },
    { item_id: "789", store_id: "Shoprite", name: "cherries", brand: "Nature", category: "fruits", price: 5.99 },
    { item_id: "111", store_id: "Shoprite", name: "chicken", brand: "Tyson", category: "Meats", price: 5.99 },
    { item_id: "122", store_id: "Shoprite", name: "bread crumbs", brand: "Knorr", category: "groceries", price: 3.99 },
    { item_id: "987", store_id: "Shoprite", name: "coffee", brand: "Lavazza", category: "groceries", price: 4.99 },
];

const compStore1 = [
    { item_id: "123", store_id: "Stop & Shop", name: "tomato sauce", brand: "Barilla", category: "groceries", price: 5.99 },
    { item_id: "456", store_id: "Stop & Shop", name: "potatoes", brand: "Shoprite", category: "groceries", price: 4.29 },
    { item_id: "789", store_id: "Stop & Shop", name: "cherries", brand: "Nature", category: "fruits", price: 6.50 },
    { item_id: "111", store_id: "Stop & Shop", name: "chicken", brand: "Tyson", category: "Meats", price: 4.99 },
    { item_id: "122", store_id: "Stop & Shop", name: "bread crumbs", brand: "Knorr", category: "groceries", price: 5.99 },
    { item_id: "987", store_id: "Stop & Shop", name: "coffee", brand: "Lavazza", category: "groceries", price: 6.99 },
];

const compStore2 = [
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Barilla", category: "groceries", price: 2.99 },
    { item_id: "456", store_id: "Walmart", name: "potatoes", brand: "Shoprite", category: "groceries", price: 1.99 },
    { item_id: "789", store_id: "Walmart", name: "cherries", brand: "Nature", category: "fruits", price: 4.99 },
    { item_id: "111", store_id: "Walmart", name: "chicken", brand: "Tyson", category: "Meats", price: 4.99 },
    { item_id: "122", store_id: "Walmart", name: "bread crumbs", brand: "Knorr", category: "groceries", price: 3.49 },
    { item_id: "987", store_id: "Walmart", name: "coffee", brand: "Lavazza", category: "groceries", price: 4.99 },
];

const comparableItems = [
    { item_id: "224", name: "tomato", brand: "Fresh", category: "vegetables" },
    { item_id: "224", name: "tomato Juice", brand: "Orange", category: "juice" },
    { item_id: "224", name: "tomato sauce", brand: "Barilla", category: "groceries" },
    { item_id: "224", name: "tomato rice", brand: "Uncle Bens", category: "groceries" },
    { item_id: "224", name: "paper towels", brand: "Bounty", category: "utilities" },
    { item_id: "224", name: "toilet paper", brand: "scots", category: "utilities" },
    { item_id: "224", name: "paper plates", brand: "Dicna", category: "utilities" },
]

const brandsList = [
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand1", category: "groceries", price: 2.99 },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand2", category: "groceries", price: 2.99 },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand3", category: "groceries", price: 2.99 },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand4", category: "groceries", price: 2.99 },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand5", category: "groceries", price: 2.99 },
]

export const sampleData = [
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand2", category: "groceries", price: 3.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand3", category: "groceries", price: 4.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand4", category: "groceries", price: 5.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Walmart", name: "tomato sauce", brand: "Brand5", category: "groceries", price: 6.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Shoprite", name: "tomato", brand: "Brand1", category: "groceries", price: 2.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Shoprite", name: "tomato", brand: "Brand2", category: "groceries", price: 3.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Shoprite", name: "tomato", brand: "Brand4", category: "groceries", price: 5.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "Shoprite", name: "tomato", brand: "Brand5", category: "groceries", price: 6.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "ACME", name: "tomato juice", brand: "Brand1", category: "groceries", price: 2.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "ACME", name: "tomato juice", brand: "Brand2", category: "groceries", price: 3.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "ACME", name: "tomato juice", brand: "Brand3", category: "groceries", price: 4.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "ACME", name: "tomato juice", brand: "Brand4", category: "groceries", price: 5.99, barcode: "14141241241241222" },
    { item_id: "123", store_id: "ACME", name: "tomato juice", brand: "Brand5", category: "groceries", price: 5.99, barcode: "14141241241241222" },
]

function helperSearchStoreItems(store_name, item, brand, products_list){
    // Helper method to check if a store has an item. Returns the price if it has it otherwise it is 0

    const any_brand = brand == "Any brand" ? true : false;
    
    for (let product in products_list){

        if (any_brand){
            if (products_list[product].store_id == store_name && products_list[product].name == item){
                return products_list[product].price;
            }
        } else {
            if (products_list[product].store_id == store_name && products_list[product].name == item && products_list[product].brand == brand){
                return products_list[product].price;
            }
        }
    }
    return 0;
}


function recommendedStoresForTotalShoppingList(shopping_list, sampleData, ranking="price"){

    // create object of objects of stores->need to track 
    // 1. how many items were found, 
    // 2. store name and 
    // 3. total cost
    const stores_obj = {};

    // Capture list of stores 
    const stores_list = [];
    for (let input in sampleData){
        if (!stores_list.includes(sampleData[input].store_id)){
            stores_list.push(sampleData[input].store_id);
            stores_obj[sampleData[input].store_id] = { store_name: sampleData[input].store_id, items_found: 0, total_cost: 0};
        }
    }

    for (let product in shopping_list){
        for (let retailer in stores_list){

            let store_name = stores_list[retailer];
            // helper method returns the price of the product
            let has_item = helperSearchStoreItems(store_name, shopping_list[product].name, shopping_list[product].brand, sampleData);

            if (has_item > 0){
                stores_obj[store_name] = {...stores_obj[store_name], items_found: stores_obj[store_name].items_found + 1, total_cost: stores_obj[store_name].total_cost + has_item};

            }
        }
    }

    let recommendations_list = Object.entries(stores_obj);

    if (ranking == "price"){
        //Sort stores based on price
        recommendations_list.sort((a,b) => a[1].total_cost - b[1].total_cost);
    } else if (ranking == "store_name"){
        recommendations_list.sort((a,b) => b[1].store_name - a[1].store_name);
    } else if (ranking == "items"){
        // sort stores based on items found 
        recommendations_list.sort((a,b) => b[1].items_found - a[1].items_found);
    }

    let sorted_list = [];
    for (let i=0; i< recommendations_list.length; i++){

        // Exclude stores with no items
        if (recommendations_list[i][1].items_found > 0){
            sorted_list.push({
                store_name: recommendations_list[i][1].store_name,
                total_cost: recommendations_list[i][1].total_cost,
                num_items: recommendations_list[i][1].items_found
            });
        }
    }

    return sorted_list;

}

// Method to return recommended items -> DONE
function giveSuggestedItems(products, target_item){
    const similar_items = [];

    // get words in item user gave
    const targets = target_item.split(" ");

    // Iterate through all items in database
    for (let product_id of Object.keys(products)){
        product = products[product_id].name
        
        //split the words in the item from main list 
        let words = product.split(" ");

        // check if there is a match for each word in item list with target item
        for (let target in targets){
            if (words.includes(targets[target])){
                if (!similar_items.includes(product)){
                    similar_items.push(product);
                }
            }
        }
    }
    return similar_items;

}

// Get list of brands -> DONE
function getBrandsList(target_item, products){
    const selection = target_item.toString().trimEnd();
    for (let product_id of Object.keys(products)){
        if (products[product_id].name == selection){
            return products[product_id].brands
        }
    }
}

// Get list of brands selected for a product based on the items corresponding to the product
function getSelectedBrandsForProduct(items){
    const brands = new Set()
    for (let item of items){
        brands.add(item.brand)
    }
    return Array.from(brands);

}

// given a list of item ids, retrieves the items from the collection of all items
function getItemsList(item_ids, all_items) {
    const items = []
    for (const id of item_ids){
        items.push(all_items[id])
    }
    return items
}

//Helper method to extract items available and items missing from the shopping list in a particular store
function getShoppingListItemsInStore(shopping_list, store_name, all_items, all_stores){

    const breakdown = {items_available: [], items_missing: []};

    // First capture the items available
    for (let item in shopping_list){

        for (let store in all_stores){
            if (all_stores[store].name == store_name){
                for (let item_id in all_items){
                    if (shopping_list[item].includes(item_id) && all_items[item_id].store == store && !breakdown.items_available.includes(item)){
                        breakdown.items_available.push(item);
                    }
                }
            }
        }
    }

    // Capture missing items
    for (let missing_item in shopping_list){
        if (!breakdown.items_available.includes(missing_item)) breakdown.items_missing.push(missing_item);
    }

    return breakdown;

}

// Get dictionary with brand and product name details for a selected item in the shopping list
function getProductInShoppingListDetails(item_name, shopping_list){

    let product_details = {};
    for (let product in shopping_list){
        if (shopping_list[product].name == item_name){
            product_details.product = {name: item_name, brand: shopping_list[product].brand};
        }
    }
    return product_details;
}

// Helper method to get the minimum price for an item in a store in the list of items
function getLowestPriceItem(items_list, store_id, items){
    
    let lowest_price = 10000;

    // Iterate through the list of items
    for (let item in items_list){
        
        // Check if available in target store
        if (items[items_list[item]].store == store_id){
            if (items[items_list[item]].price < lowest_price){
                lowest_price = items[items_list[item]].price;
            }
        }
    }

    return lowest_price;
}


// Method to return stores, number of items and total cost - Adjusted based on latest database schema
function getGoShoppingList(shopping_list, items, stores){

    const store_details = {};

    // Capture the name off each store
    for (let store in stores){
        if (!(store in store_details)){
            store_details[store] = {
                name: stores[store].name,
                total_cost: 0,
                num_items: 0,
            };
        }
    }

    // Iterate through every item in the shopping list
    for (let shopping_item in shopping_list){
        
        // Capture all brands selected for an item in the shopping list
        const list_brands = shopping_list[shopping_item];
        //Get lowest price for an item in each store

        for (let store in stores){
            const lowest_price = getLowestPriceItem(list_brands, store, items);

            if (lowest_price < 10000){
                store_details[store].total_cost = store_details[store].total_cost + lowest_price;
                store_details[store].num_items = store_details[store].num_items + 1;
            }
        }
       
    }
    
    return store_details;
    
}

// Provide a ranking of stores by number of items found, store name and total cost
// takes as input the output of the getGoShoppingList function
function getStoresSorting(input_object, sorting){

    let sorted_list = Object.values(input_object);

    if (sorting == "price"){
        sorted_list.sort((a, b) => a.total_cost - b.total_cost);
    } else if (sorting == "items"){
        sorted_list.sort((a, b) => b.num_items - a.num_items);
    } else if (sorting == "store_name"){
        sorted_list.sort((a, b) => {
            const name_a = a.name.toUpperCase();
            const name_b = b.name.toUpperCase();

            if (name_a < name_b){
                return -1;
            } else if (name_a > name_b){
                return 1;
            } else {
                return 1
            }
        });
    }

    return sorted_list;

}

// Function to sort a list of store options for a selected item by price, brand and store
function getItemSorting(items, sorting, stores){

    if (sorting == "price"){
        items.sort((a, b) => a.price - b.price);
    } else if (sorting == "brand"){
        items.sort((a, b) => {
            const prod_a = a.brand.toUpperCase();
            const prod_b = b.brand.toUpperCase();

            if (prod_a < prod_b){
                return -1;
            } else if (prod_a > prod_b){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sorting == "store"){
        items.sort((a, b) => {

            const name_a = stores[a.store].name.toUpperCase();
            const name_b = stores[b.store].name.toUpperCase();

            if (name_a < name_b){
                return -1;
            } else if (name_a > name_b){
                return 1;
            } else {
                return 0;
            }

        })
    }

    return items;
}   

// Helper method to return the live feeds
// The method should be looking at the feeds table, stores table, all items and products table
// Returns an array of objects with details
function returnLiveFeeds(feeds, stores, items, products){

    let feedResults = [];

    for (let feed in feeds){
        let feedInput = {review: "", item: "", store: "", user: feeds[feed].user_id, date: feeds[feed].date, brand: "" };
        feedInput.review = feeds[feed].review;
        
        // Check if it is a store related or item related message
            
        // Get item information
        for (let item in items){
                
            if (item == feeds[feed].item_id){

                const productName = products[items[item].product];
                feedInput.item = productName.name + " - " + items[item].brand;
                feedInput.brand = items[item].brand;
            }
        } 
        
        for (let store in stores){

            if (store == feeds[feed].store_id){
                    
                const storeName = stores[store].name;
                feedInput.store = storeName;
            }
        }
        
        feedResults.push(feedInput);
    }

    return feedResults
}

// Helper method to provide filter for all feeds in the feeds page
// It takes as argument the return value from returnLiveFeeds, the filtered value and the filter you want to apply
function filterLiveFeeds(liveFeeds, filter){
    
    if (filter.metric != "all"){
        const feedsObject = Object.fromEntries(
            Object.entries(liveFeeds).filter(([key, value])=>{
                console.log(filter)
                // Check store change
                if (filter.user_id == "all" && filter.brand == "all" && filter.store != "all") return value.store == filter.store;
                else if (filter.user_id != "all" && filter.brand == "all" && filter.store != "all") return (value.store == filter.store && value.user == filter.user_id);
                else if (filter.user_id == "all" && filter.brand != "all" && filter.store != "all") return (value.store == filter.store && value.brand == filter.brand);
                else if (filter.user_id != "all" && filter.brand != "all" && filter.store != "all") return (value.store == filter.store && value.user == filter.user_id && value.brand == filter.brand);
                
                // check user id changing
                else if (filter.store == "all" && filter.brand == "all" && filter.user_id != "all") return value.user == filter.user_id; 
                else if (filter.store == "all" && filter.brand != "all" && filter.user_id != "all") return (value.user == filter.user_id && value.brand == filter.brand);
                
                // check brand changing
                else if (filter.store == "all" && filter.user_id == "all" && filter.brand != "all") return value.brand == filter.brand;
                else if (filter.store != "all" && filter.user_id == "all" && filter.brand != "all") return (value.brand == filter.brand && value.store == filter.store);
                else if (filter.store == "all" && filter.user_id != "all" && filter.brand != "all") return (value.brand == filter.brand && value.user == filter.user_id);
                
                else return liveFeeds;
            })
        );

        return Object.values(feedsObject);
        
    } else {
        return liveFeeds;
    }

}

export { getBrandsList, giveSuggestedItems, recommendedStoresForTotalShoppingList, getSelectedBrandsForProduct, getItemsList }
export { getShoppingListItemsInStore, getProductInShoppingListDetails, getGoShoppingList, getStoresSorting, getItemSorting }
export { returnLiveFeeds, filterLiveFeeds }
