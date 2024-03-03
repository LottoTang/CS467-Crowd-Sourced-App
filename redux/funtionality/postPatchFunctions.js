// Handle post and patch requests to the database

import axios from 'axios';

// post a new product
async function addProduct(product_name, brands) {
    try {
        const response = await axios.post(`http://10.0.2.2:3000/products`,
            {
                name: product_name.toLowerCase(),
                brands: brands
            }
        )
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };
}

// update the brands of a specified product
async function updateBrands(product_id, brand) {
    let res;

    try {
        const response = await axios.patch(`http://10.0.2.2:3000/products/${product_id}`,
            {
                brand: brand
            }
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };

    return res
}

// post a new promotion
async function createPromotion(promotion_type) {
    let res;

    try {
        const response = await axios.post(`http://10.0.2.2:3000/promotions`,
            {
                promotion_type: promotion_type
            }
        ).then(result => {
            res = result.data._id;
            })
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };

    return res;
}

// post a new item
async function addItem(item) {
    try {
        const response = await axios.post(`http://10.0.2.2:3000/items`, item)
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };
}

// update an existing item
async function updateItem(item_id, item) {
    try {
        const response = await axios.patch(`http://10.0.2.2:3000/items/${item_id}`, item)
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };
}

// update the shopping list
async function updateShoppingList(user_id, new_list) {
    let res;

    try {
        const response = await axios.patch(`http://10.0.2.2:3000/users/shopping-list-item/${user_id}`,
            new_list
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };

    return res
}

export { addProduct, updateBrands, createPromotion, addItem, updateItem, updateShoppingList }