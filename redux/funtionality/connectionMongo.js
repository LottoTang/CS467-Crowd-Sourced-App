// Handle connectivity with the database

import axios from 'axios';

// Testing function 1
function getData(id){
  return (
    fetch(`http://localhost:3000/items/${id}`)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  );
}


// Testing function 2
async function setData(id){
  try{
    const response = await fetch(`http://localhost:3000/api/items/${id}`);
      return await response.json();
  }catch (error){
    console.log(error);
  }
}

// Testing function 3
function handleData(){
  setData('65d1068bd8eb909b1da3f09d')
  .then(data => { 
    console.log(data);
    console.log("Should have returned tests");
  })
  .catch(error => console.log(error));
}

// Get all products with a specific name
async function collectAllBrands(productName){
  fetch(`http://10.0.2.2:3000/products/${productName}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

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

//console.log(await fetchItemWithId('65d1068bd8eb909b1da3f09d'));

export { getUser };