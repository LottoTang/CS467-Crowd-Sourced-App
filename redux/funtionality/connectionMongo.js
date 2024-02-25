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



export { getUser, fetchItems, fetchStores };