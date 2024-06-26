// Handle connectivity with the database

import axios from 'axios';
import { sortAlphabetically } from "./helperFunctions";

// fetch a user based on their id
async function getUser(user_id) {
    let res;

    try {
        const response = await axios.get(`http://${address}/users/${user_id}`, {}
            ).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return res
}

// fetches an item based on the item id
async function getItem(item_id) {
    let res;

    try {
        const response = await axios.get(`http://${address}/items/${item_id}`, {}
            ).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return res
}

// fetch all items that include the specified product in their tags
async function fetchItems(product) {
    let res;

    try{
        const response = await axios.get(`http://${address}/items/`, {
            params: {
                tag: `${product}`,
            }
        }).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    return res
}

// fetch a store from the given id and return the name
async function getStoreName(store_id) {
    let res;

    try{
        const response = await axios.get(`http://${address}/stores/${store_id}`, {}
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    if (res) return res.name
    return res
}

// fetch all stores related to a search
async function searchStores(store_name) {
    let res;

    try {
        const response = await axios.get(`http://${address}/stores/search`, {
                params: {
                    name: store_name,
                }
            }).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return sortAlphabetically(res)
}

// fetch all stores
async function fetchStores() {
    let res;

    try {
        const response = await axios.get(`http://${address}/stores`
            ).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return res
}

// fetch all brands for a product
async function fetchBrands(product) {
    let res = [];

    try{
        const response = await axios.get(`http://${address}/products/brands`, {
            params: {
                name: `${product}`,
            }
        }).then(result => {
            res = result.data;
            })
        .catch(error => {
            if (error.response.status == 404) console.log("Product not found")
            else console.error(error)
        });
    }catch(error){ console.error(error) };

    return res
}

// fetch all products related to a search
async function searchProducts(product_name) {
    let res;

    try{
        const response = await axios.get(`http://${address}/products/search`, {
            params: {
                name: `${product_name.toLowerCase()}`,
            }
        }).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    return sortAlphabetically(res)
}

// fetch the product object corresponding to the name
async function fetchProduct(product_name) {
    let res;

    try{
        const response = await axios.get(`http://${address}/products/`, {
            params: {
                name: `${product_name.toLowerCase()}`,
            }
        }).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    return res
}

// fetch a promotion from the given id
async function getPromotion(promotion_id) {
    let res;

    try{
        const response = await axios.get(`http://${address}/promotions/${promotion_id}`, {}
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    return res
}

// get all promotions
async function fetchPromotions() {
    let res;

    try{
        const response = await axios.get(`http://${address}/promotions/`, {}
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    return res
}

// fetch all promotions related to a search (returns a list of types)
async function searchPromotions(search) {
    let res;

    try {
        const response = await axios.get(`http://${address}/promotions/search`, {
            params: {
                promotion_type: search
            }
            }).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return sortAlphabetically(res)
}


// fetch an item based on it's barcode and the store where it is located
async function getItemByBarcode(barcode, store) {
    let res;

    try {
        const response = await axios.get(`http://${address}/items/barcode`, {
            params: {
                barcode_id: barcode,
                store_id: store
            }
            }).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };

    return res
}

// Fetch all live feeds from database 
async function getAllLiveFeeds(){

    let data;
    try{
        const response = await axios.get(`http://${address}/livefeeds`)
        .then(result => {
            data = result.data;
        }).catch(error => console.log(error));
    } catch(error){
        console.log(error);
    }

    return data;
}

// Get all items from database and store them in a state using the set state method storeData
async function getAllItems(){
    let res;

    try{
        const response =await axios.get(`http://${address}/items/allitems`)
        .then(result =>{
            res = result.data
        }).catch(error=> console.log(error));
    }catch(error){
        console.log(error);
    }

    return res
}

export { getUser, getItem, fetchItems, getStoreName, searchStores, fetchStores, fetchBrands, searchProducts, fetchProduct };

export { getPromotion, fetchPromotions, searchPromotions, getItemByBarcode, getAllLiveFeeds, getAllItems };