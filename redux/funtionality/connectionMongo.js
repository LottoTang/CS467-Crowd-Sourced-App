// Handle connectivity with the database

import axios from 'axios';

// fetch a user based on their id
async function getUser(user_id) {
    let res;

    try {
        const response = await axios.get(`http://10.0.2.2:3000/users/${user_id}`, {}
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
        const response = await axios.get(`http://10.0.2.2:3000/items/${item_id}`, {}
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
        const response = await axios.get(`http://10.0.2.2:3000/items/`, {
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
        const response = await axios.get(`http://10.0.2.2:3000/stores/${store_id}`, {}
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    if (res) return res.name
    return res
}

// fetch all stores
async function fetchStores() {
    let res;

    try {
        const response = await axios.get(`http://10.0.2.2:3000/stores`
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
        const response = await axios.get(`http://10.0.2.2:3000/products/brands`, {
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
        const response = await axios.get(`http://10.0.2.2:3000/products/search`, {
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

// fetch the product object corresponding to the name
async function fetchProduct(product_name) {
    let res;

    try{
        const response = await axios.get(`http://10.0.2.2:3000/products/`, {
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

// fetch a promotion from the given id and return the type
async function getPromotionName(promotion_id) {
    let res;

    try{
        const response = await axios.get(`http://10.0.2.2:3000/promotions/${promotion_id}`, {}
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.error(error));
    }catch(error){ console.error(error) };

    if (res) return res.promotion_type
    return res
}

// fetch all promotions
async function fetchPromotions() {
    let res;

    // TODO: get all promotions doesn't exist

    /*
    try {
        const response = await axios.get(`http://10.0.2.2:3000/promotions`
            ).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };
    */

    return res
}


// fetch an item based on it's barcode and the store where it is located
async function getItemByBarcode(barcode, store) {
    let res;

    // TODO: get item by barcode doesn't exist

    /*
    try {
        const response = await axios.get(`http://10.0.2.2:3000/promotions`
            ).then(result => {
                res = result.data
                })
            .catch(error => console.log(error))
    } catch(error) { console.error(error) };
    */

    return res
}



export { getUser, getItem, fetchItems, getStoreName, fetchStores, fetchBrands, searchProducts, fetchProduct, getPromotionName, fetchPromotions, getItemByBarcode };