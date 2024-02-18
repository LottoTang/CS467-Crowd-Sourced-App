
const fetchData = async () =>{
  try{
    const response = await fetch("http://localhost:3000/items/65c7fdb6147f07dee6575251");
    const data = response.data;
    console.log(data);
  } catch(error){
    console.error(error);
  }
}

fetchData();