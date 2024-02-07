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

function helperSearchStoreItems(storeName, item, brand, productsList){
    // Helper method to check if a store has an item. Returns the price if it has it otherwise it is 0

    const anyBrand = brand == "Any brand" ? true : false;
    
    for (let product in productsList){

        if (anyBrand){
            if (productsList[product].store_id == storeName && productsList[product].name == item){
                return productsList[product].price;
            }
        } else {
            if (productsList[product].store_id == storeName && productsList[product].name == item && productsList[product].brand == brand){
                return productsList[product].price;
            }
        }
    }
    return 0;
}


function recommendedStoresForTotalShoppingList(shoppingList, sampleData, ranking="price"){

    // create object of objects of stores->need to track 
    // 1. how many items were found, 
    // 2. store name and 
    // 3. total cost
    const storesObj = {};

    // Capture list of stores 
    const storesList = [];
    for (let input in sampleData){
        if (!storesList.includes(sampleData[input].store_id)){
            storesList.push(sampleData[input].store_id);
            storesObj[sampleData[input].store_id] = { storeName: sampleData[input].store_id, itemsFound: 0, totalCost: 0};
        }
    }

    for (let product in shoppingList){
        for (let retailer in storesList){

            let storeName = storesList[retailer];
            // helper method returns the price of the product
            let hasItem = helperSearchStoreItems(storeName, shoppingList[product].name, shoppingList[product].brand, sampleData);

            if (hasItem > 0){
                storesObj[storeName] = {...storesObj[storeName], itemsFound: storesObj[storeName].itemsFound + 1, totalCost: storesObj[storeName].totalCost + hasItem};

            }
        }
    }

    let listOfRecommendations = Object.entries(storesObj);

    if (ranking == "price"){
        //Sort stores based on price
        listOfRecommendations.sort((a,b) => a[1].totalCost - b[1].totalCost);
    } else if (ranking == "store_name"){
        listOfRecommendations.sort((a,b) => b[1].storeName - a[1].storeName);
    } else if (ranking == "items"){
        // sort stores based on items found 
        listOfRecommendations.sort((a,b) => b[1].itemsFound - a[1].itemsFound);
    }

    let sortedList = [];
    for (let i=0; i< listOfRecommendations.length; i++){

        // Exclude stores with no items
        if (listOfRecommendations[i][1].itemsFound > 0){
            sortedList.push({storeName: listOfRecommendations[i][1].storeName, totalCost: listOfRecommendations[i][1].totalCost, numItems: listOfRecommendations[i][1].itemsFound });
        }
    }

    return sortedList;

}

// Method to return recommended items -> DONE
function giveSuggestedItems(products, targetItem){
    const similarItems = [];

    // get words in item user gave
    const targets = targetItem.split(" ");

    // Iterate through all items in database
    for (let product_id of Object.keys(products)){
        product = products[product_id].name
        
        //split the words in the item from main list 
        let words = product.split(" ");

        // check if there is a match for each word in item list with target item
        for (let target in targets){
            if (words.includes(targets[target])){
                if (!similarItems.includes(product)){
                    similarItems.push(product);
                }
            }
        }
    }
    return similarItems;

}

// Get list of brands -> DONE
function getBrandsList(targetItem, products){
    let listOfBrands = [];
    const selection = targetItem.toString().trimEnd();
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
function getItemsList(item_ids, allItems) {
    const items = []
    for (const id of item_ids){
        items.push(allItems[id])
    }
    return items
}

//Helper method to extract items available and items missing from the shopping list in a particular store
function getShoppingListItemsInStore(shoppingList, storeName, allItems, allStores){

    const breakdown = {itemsAvailable: [], itemsMissing: []};

    // First capture the items available
    for (let item in shoppingList){

        for (let store in allStores){
            if (allStores[store].name == storeName){
                for (let item_id in allItems){
                    if (shoppingList[item].includes(item_id) && allItems[item_id].store == store && !breakdown.itemsAvailable.includes(item)){
                        breakdown.itemsAvailable.push(item);
                    }
                }
            }
        }
    }

    // Capture missing items
    for (let missingItem in shoppingList){
        if (!breakdown.itemsAvailable.includes(missingItem)) breakdown.itemsMissing.push(missingItem);
    }

    return breakdown;

}

// Get dictionary with brand and product name details for a selected item in the shopping list
function getProductInShoppingListDetails(itemName, shoppingList){

    let productDetails = {};
    for (let product in shoppingList){
        if (shoppingList[product].name == itemName){
            productDetails.product = {name: itemName, brand: shoppingList[product].brand};
        }
    }
    return productDetails;
}

// Helper method to get the minimum price for an item in a store in the list of items
function getLowestPriceItem(itemsList, storeId, items){
    
    let lowestPrice = 10000; 

    // Iterate through the list of items
    for (let item in itemsList){
        
        // Check if available in target store
        if (items[itemsList[item]].store == storeId){
            if (items[itemsList[item]].price < lowestPrice){
                lowestPrice = items[itemsList[item]].price;
            }
        }
    }

    return lowestPrice;
}


// Method to return stores, number of items and total cost - Adjusted based on latest database schema
function getGoShoppingList(shoppingList, items, stores){

    const storeDetails = {};

    // Get total number of items in shopping list
    let itemsListed = 0;
    for (let rec in shoppingList){
        itemsListed += 1;
    }

    // Capture the name off each store
    for (let store in stores){
        if (!(store in storeDetails)){
            storeDetails[store] = {name: stores[store].name, totalCost: 0, numItems: 0, itemsInSL: itemsListed};
        }
    }

    // Iterate through every item in the shopping list
    for (let shoppingItem in shoppingList){
        
        // Capture all brands selected for an item in the shopping list
        const listBrands = shoppingList[shoppingItem];
        //Get lowest price for an item in each store

        for (let store in stores){
            const lowestPrice = getLowestPriceItem(listBrands, store, items);

            if (lowestPrice < 10000){
                storeDetails[store].totalCost = storeDetails[store].totalCost + lowestPrice;
                storeDetails[store].numItems = storeDetails[store].numItems + 1;
            }
        }
       
    }
    
    return storeDetails;
    
}

// Provide a ranking of stores by number of items found, store name and total cost
// takes as input the output of the getGoShoppingList function
function getStoresSorting(inputObject, sorting){

    let sortedList = Object.values(inputObject);

    if (sorting == "price"){
        sortedList.sort((a, b) => a.totalCost - b.totalCost);
    } else if (sorting == "items"){
        sortedList.sort((a, b) => b.numItems - a.numItems);
    } else if (sorting == "store_name"){
        sortedList.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB){
                return -1;
            } else if (nameA > nameB){
                return 1;
            } else {
                return 1
            }
        });
    }

    return sortedList;

}

// Function to sort a list of store options for a selected item by price, brand and store
function getItemSorting(items, sorting, stores){

    if (sorting == "price"){
        items.sort((a, b) => a.price - b.price);
    } else if (sorting == "brand"){
        items.sort((a, b) => {
            const prodA = a.brand.toUpperCase();
            const prodB = b.brand.toUpperCase();

            if (prodA < prodB){
                return -1;
            } else if (prodA > prodB){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sorting == "store"){
        items.sort((a, b) => {

            const nameA = stores[a.store].name.toUpperCase();
            const nameB = stores[b.store].name.toUpperCase();

            if (nameA < nameB){
                return -1;
            } else if (nameA > nameB){
                return 1;
            } else {
                return 0;
            }

        })
    }

    return items;
}   

export { getBrandsList, giveSuggestedItems, recommendedStoresForTotalShoppingList, getSelectedBrandsForProduct, getItemsList }
export { getShoppingListItemsInStore, getProductInShoppingListDetails, getGoShoppingList, getStoresSorting, getItemSorting }
