// The purpose of this document is to contain helper methods for the app

// import data from test file 2
import { items, products, stores, promotions } from "../../testData/testingData2";

import { getItem, getStoreName, getPromotion } from '../../redux/funtionality/connectionMongo.js';

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
function giveSuggestedItems(options, target_item){
    const similar_items = [];

    // Iterate through all options provided
    for (let option of options){
        // check if the option string includes the letters in the target string
        if (option.includes(target_item)) similar_items.push(option)
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
async function getShoppingListItemsInStore(shopping_list, store_id){
    const breakdown = {items_available: [], items_missing: []};

    // iterate over all products in the shopping list
    for (let product in shopping_list){
        // check each item stored in that product's list
        for (let item_id of shopping_list[product]) {
            if (item_id) {
                const item = await getItem(item_id._id)
                if (item) {
                    // if that item is in the provided store, add it to the items_available
                    if (item.store_id == store_id) {
                        breakdown.items_available.push(product)
                        // once one item has been found, no need to check other items
                        break
                    }
                }
            }
        }
        // if no items were found for that product, add it to the items_missing
        if (!breakdown.items_available.includes(product)) {
            breakdown.items_missing.push(product)
        }

        /*
        for (let store in all_stores){
            if (all_stores[store].name == store_name){
                for (let item_id in all_items){
                    if (shopping_list[product].includes(item_id) && all_items[item_id].store == store && !breakdown.items_available.includes(product)){
                        breakdown.items_available.push(product);
                    }
                }
            }
        }
        */
    }

    /*
    // Capture missing items
    for (let missing_item in shopping_list){
        if (!breakdown.items_available.includes(missing_item)) breakdown.items_missing.push(missing_item);
    }
    */

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


// Method to return stores, number of items and total cost - Adjusted based on latest database schema
async function getGoShoppingList(shopping_list, stores, city, state){

    const store_details = {};
    
    // Capture the name off each store
    for (let store of stores){
        if (store.city == city && store.state == state){

            if (!(store._id in store_details)){
                store_details[store._id] = {
                    name: store.name,
                    total_cost: 0,
                    num_items: 0,
                    _id: store._id
                }
            }
        }
    }

    // Iterate through every item in the shopping list
    for (let shopping_item in shopping_list){
        
        // Capture all items connected to a product in the shopping list
        const ids_list = shopping_list[shopping_item];
        //Get lowest price for an item in each store

        for (const id of ids_list) {
            const item = await getItem(id._id)
            const store = store_details[item.store_id]
            store.total_cost += item.price
            store.num_items += 1
        }
    }

    return store_details;
    
}

// Provide a ranking of stores by number of items found, store name and total cost
// takes as input the output of the getGoShoppingList function
function getStoresSorting(input_object, sorting){

    let sorted_list = Object.values(input_object);

    if (sorting == "Price"){
        sorted_list.sort((a, b) => a.total_cost - b.total_cost);
    } else if (sorting == "Items Found"){
        sorted_list.sort((a, b) => b.num_items - a.num_items);
    } else if (sorting == "Store"){
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
function getItemSorting(items, sorting){
    if (sorting == "Price"){
        items.sort((a, b) => a.price - b.price);
    } else if (sorting == "Brand"){
        items.sort((a, b) => {

            // If brand is added to back to the filters, use this
            //const prod_a = a.brand.toUpperCase();
            //const prod_b = b.brand.toUpperCase();

            const prod_a = a.name.toUpperCase();
            const prod_b = b.name.toUpperCase();

            if (prod_a < prod_b){
                return -1;
            } else if (prod_a > prod_b){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sorting == "Store"){
        items.sort((a, b) => {

            // Previous format of the database. Save it if database schema changes again.
            //const name_a = stores[a.store].name.toUpperCase();
            //const name_b = stores[b.store].name.toUpperCase();

            const name_a = a.store.toUpperCase();
            const name_b = b.store.toUpperCase();

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

function sortLiveFeeds(data) {
    data.sort((a, b) => {
        const time_a = (new Date(a.date)).getTime();
        const time_b = (new Date(b.date)).getTime();

        if (time_a > time_b){
            return -1;
        } else if (time_a < time_b){
            return 1;
        } else {
            return 1
        }
    });
    return data
}

function sortAlphabetically(list) {
    list.sort((a, b) => {
        const name_a = a.toUpperCase();
        const name_b = b.toUpperCase();

        if (name_a < name_b){
            return -1;
        } else if (name_a > name_b){
            return 1;
        } else {
            return 1
        }
    });
    return list
}

// Helper method to return the live feeds
// The method should be looking at the feeds table, stores table, all items and products table
// Returns an array of objects with details
function returnLiveFeeds(feeds, stores, items, products){

    let feedResults = [];
    
    for (let feed in feeds){
        if(!(feeds[feed].store_id in stores)) continue
        let feedInput = {
            review: "",
            item: "",
            store: "",
            user: feeds[feed].username,
            date: feeds[feed].date, brand: "",
            pricing: -1,
            promotion: null
        };
        feedInput.review = feeds[feed].review;
        
        // Check if it is a store related or item related message
        if (feeds[feed].price != undefined){

            feedInput.pricing = feeds[feed].price;
        }

        // Get item information
        for (let item in items){
            
            if (item == feeds[feed].item_id){
                
                feedInput.item = items[item].name;
                feedInput.brand = items[item].brand;

                // Populate for item post
                if (feeds[feed].price != undefined){
                    feeds[feed].review = items[item].name + " - " + items[item].brand + " $" + feeds[feed].price;
                    feedInput.review = feeds[feed].review;
                }

                // Check if item has a promotion 
                if (items[item].promotion_id){
                    feedInput.promotion = items[item].promotion_id;
                }
                
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
    
    // clear data if a feed is empty 
    const finalFeed =[]
    for (let key in feedResults){
        if (feedResults[key].review != ""){
            finalFeed.push(feedResults[key]);
        }
    }
    return finalFeed;
}

// Helper method to provide filter for all feeds in the feeds page
// It takes as argument the return value from returnLiveFeeds, the filtered value and the filter you want to apply
function filterLiveFeeds(liveFeeds, filter){

    const feedsCopy = JSON.parse(JSON.stringify(liveFeeds));

    if (filter.metric != "all"){
        const feedsObject = Object.fromEntries(
            Object.entries(feedsCopy).filter(([key, value])=>{
                
                //Check store change
                if (filter.store != "all" && (filter.post == "all" || (filter.post.includes("Item Updates") && filter.post.includes("Store Reviews"))))
                    return filter.store.includes(value.store);
                else if (filter.store !="all" && filter.post.includes("Item Updates") && !filter.post.includes("Store Reviews")) return (filter.store.includes(value.store) && value.pricing > -1);
                else if (filter.store != "all" && filter.post.includes("Store Reviews") && !filter.post.includes("Item Updates")) return (filter.store.includes(value.store) && value.pricing == -1);
                else if (filter.store == "all" && filter.post.includes("Item Updates") && !filter.post.includes("Store Reviews")) return value.pricing > -1;
                else if (filter.store == "all" && (filter.post.includes("Store Reviews") && !filter.post.includes("Item Updates"))) return value.pricing == -1;
                
                else return feedsCopy;
            })
        ); 

        return Object.values(feedsObject);
        
    } else {
        return feedsCopy;
    }

}


// Helper method to take input from the database and return it to a format for the ViewItem page
async function convertItemsOutput(databaseItems){
    const output = [];
    for (let item of databaseItems){
        const element = {};
        element.brand = item.brand;
        element.name = item.name;
        element.price = item.price;
        element.product = item._id;
        if (item.promotion_id) {
            const promo = await getPromotion(item.promotion_id)
            element.promotion = promo.promotion_type;
        }
        element.store = await getStoreName(item.store_id);
        if (!element.store) element.store = "Store not in database yet"
        element.date = item.date
        element.username = item.username
        output.push(element);
    }

    return output;
}

// Helper method for removing an item from the shopping list in preparation for sending the request to the database
function removeSelectedItem(shoppingList, targetItem){
    let copyList = {...shoppingList};

    delete copyList[targetItem];
    return copyList;
}

// Helper method to prepare shopping list message 
function prepareShoppingListInput(product, itemList, allItems){
    let newShoppingList = {...itemList};

    const values = allItems.map(itemValue => ({_id: itemValue._id.toString()}));
    newShoppingList[product] = values;

    return newShoppingList;
}

// Helper function to populate a list of selected items to push after in database
function getListOfBrandsForDB(selected_brands, itemIDs){

    const idsShoppingList = [];

    if (selected_brands.includes("Any brand")){
        
        for (let key in itemIDs){

            for (let item in itemIDs[key]){
                idsShoppingList.push(itemIDs[key][item]);
            }
        }
    } else {

        for (let key in itemIDs){

            if (selected_brands.includes(key)){
                for (let item in itemIDs[key]){
                    idsShoppingList.push(itemIDs[key][item]);
                }
            }
        }
    }

    const newItems = idsShoppingList.map(itemId => ({_id: itemId}));
    return newItems;
}

// Helper method to take the list and add the new product and return the object
function prepareShoppingList(currentList, allItems){
    
    const newShoppingList = {};
    
    for (let item in currentList){
        const brands = new Set();
        for (let item_obj of allItems){
            for (let id_obj of currentList[item]){
                if (id_obj._id == item_obj._id){
                    brands.add(item_obj.brand);
                }
            }
        }
        newShoppingList[item] = Array.from(brands)
    }
    
    return newShoppingList;
}

// Helper method to give a user friendly date
function convertDateForPosts(date){

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate; 
}

export { getBrandsList, giveSuggestedItems, recommendedStoresForTotalShoppingList, getSelectedBrandsForProduct, getItemsList }
export { getShoppingListItemsInStore, getProductInShoppingListDetails, getGoShoppingList, getStoresSorting, getItemSorting, sortLiveFeeds, sortAlphabetically }
export { returnLiveFeeds, filterLiveFeeds, convertItemsOutput, removeSelectedItem, prepareShoppingListInput, getListOfBrandsForDB }
export { prepareShoppingList, convertDateForPosts }
