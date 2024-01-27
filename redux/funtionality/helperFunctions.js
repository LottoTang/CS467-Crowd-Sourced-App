// The purpose of this document is to contain helper methods for the app

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


function recommendedStores(shoppingList){

    // create object of stores
    const storesList = {};

    // list of items in shopping list
    const itemsList = [];
    for (let item in shoppingList){
        itemsList.push(shoppingList[item].item_id);
    }

    // Iterate through every item in the list to for each store and calculate the total


    // add store to the object
}

// Method to return recommended items
function giveSuggestedItems(shoppingList){

}

// Get all Stores that have an item
function getListOfStores(ListOfBrands){


}

// Get list of brands
function getBrandsList(targetItem){
    let listOfBrands = [];
    for (let item in brandsList){
        if (brandsList[item].name == targetItem)
        listOfBrands.push({brandName: brandsList[item].brand});
    }

    return listOfBrands;
}


//console.log(getBrandsList("tomato sauce", brandsList));

export { getBrandsList }
