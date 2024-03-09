// Handle post and patch requests to the database

import axios from 'axios';

// post a new product
async function addProduct(product_name, brands) {
    try {
        const response = await axios.post(`http://${address}:3000/products`,
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
        const response = await axios.patch(`http://${address}:3000/products/${product_id}`,
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
        const response = await axios.post(`http://${address}:3000/promotions`,
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
    let res;

    try {
        const response = await axios.post(`http://${address}:3000/items`, item)
        .then(result => {
            res = result.data
            })
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };

    return res
}

// update an existing item
async function updateItem(item_id, item) {
    try {
        const response = await axios.patch(`http://${address}:3000/items/${item_id}`, item)
        .catch(error => console.log(error))
    } catch(error) {
        console.error(error);
    };
}

// update the shopping list
async function updateShoppingList(user_id, new_list) {
    let res;

    try {
        const response = await axios.patch(`http://${address}:3000/users/shopping-list-item/${user_id}`,
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

// Method to make a new post
async function makeLiveFeedPost(item_id, store_id, review, price, username, date){
    try {
        const response = await axios.post(`http://${address}:3000/livefeeds`,{
            item_id: item_id,
            store_id: store_id,
            review: review,
            price: price,
            username: username,
            date: date,
        }).catch(error => console.log(error));
    } catch(error) {
        console.log(error);
    }
}

// Method to increase posts count for the user and shopping level.
async function increaseItemCount(user_id){
    let res;

    try {
        const response = await axios.patch(`http://${address}:3000/users/shopping_level/${user_id}`)
        .then(result=> {
            console.log("Feeds count increased")
            res = result.data;
            })
        .catch(error => console.log(error));
    }catch(error){
        console.log(error);
    }

    return res
}

// Method to update users level
async function updateLastPostDateForUser(user_id, date){
    try{
        const response = await axios.patch(`http://${address}:3000/users/${user_id}`,{
            user_creation_date: date,
        }).catch(error=>console.log(error));
    } catch(error){
        console.log(error);
    }
}

// Method to downgrade users level
async function decreaseUserLevel(user_id){
    let res;

    try {
        const response = await axios.patch(`http://${address}:3000/users/lower_shopping_level/${user_id}`)
        .then(result => {
            res = result.data;
            console.log("Shopper's level was downgraded")
            })
        .catch(error=> console.log(error));
    } catch (error) {
        console.log(error);
    }

    return res
}

// Method to remove old live feeds
async function deleteLiveFeed(feed_id){
    try{
        const response = await axios.delete(`http://${address}:3000/livefeeds/${feed_id}`,
        ).catch(error=>console.log(error));
    } catch(error){
        console.log(error);
    }
}


export { addProduct, updateBrands, createPromotion, addItem, updateItem, updateShoppingList,
makeLiveFeedPost, increaseItemCount, updateLastPostDateForUser, decreaseUserLevel, deleteLiveFeed }