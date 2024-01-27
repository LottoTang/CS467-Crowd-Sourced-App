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


function recommendedStoresForTotalShoppingList(shoppingList, sampleData){

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

    // Iterate through every item in the list to for each store and calculate the total
    for (let record in sampleData){
        for (let product in shoppingList){   
            if (sampleData[record].name == shoppingList[product].name && sampleData[record].brand == shoppingList[product].brand ){
                const storeName = sampleData[record].store_id;
                storesObj[storeName] = {...storesObj[storeName], itemsFound: storesObj[storeName].itemsFound + 1,  totalCost: storesObj[storeName].totalCost + sampleData[record].price};
            }
        }
    }

    //Sort stores based on price
    let listOfRecommendations = Object.entries(storesObj);
    listOfRecommendations.sort((a,b) => a[1].totalCost - b[1].totalCost);

    let sortedList = [];
    for (let i=0; i< listOfRecommendations.length; i++){
        sortedList.push({storeName: listOfRecommendations[i][1].storeName, totalCost: listOfRecommendations[i][1].totalCost, numItems: listOfRecommendations[i][1].itemsFound });
    }

    return sortedList;

}

// Method to return recommended items -> DONE
function giveSuggestedItems(shoppingList, targetItem){

    const similarItems = [];

    // get words in item user gave
    const targets = targetItem.split(" ");

    // Iterate throuh all items in database
    for (let item in shoppingList){
        
        //split the words in the item from main list 
        let words = shoppingList[item].name.split(" ");

        // check if there is a match for each word in item list with target item
        for (let target in targets){
            if (words.includes(targets[target])){
                if (!similarItems.includes(shoppingList[item].name)){
                    similarItems.push(shoppingList[item].name);
                }
            }
        }
    }
    return similarItems;

}

// Get all Stores that have an item
function getListOfStores(ListOfBrands){


}

// Get list of brands -> DONE
function getBrandsList(targetItem, sampleData){
    let listOfBrands = [];
    const selection = targetItem.toString().trimEnd();
    for (let item in sampleData){
        
        if (sampleData[item].name == selection){
            
            listOfBrands.push(sampleData[item].brand);
        }
    }
    //console.log(listOfBrands);
    return listOfBrands;
}


//console.log(getBrandsList("tomato sauce", sampleData));
//console.log(giveSuggestedItems(sampleData, "tomato sauce"));


export { getBrandsList, giveSuggestedItems, recommendedStoresForTotalShoppingList }