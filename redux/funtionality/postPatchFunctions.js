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
async function updateBrands(product_id, brands) {
    let res;

    // TODO: update product function doesn't exist on back end

    /*
    try {
        const response = await axios.patch(`http://10.0.2.2:3000/products/${product_id}`,
            {
                brands: brands
            }
        ).then(result => {
            res = result.data;
            })
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };
    */

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
    console.log(item)
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

export { addProduct, updateBrands, createPromotion, addItem, updateItem }