const URL = "https://striveschool-api.herokuapp.com/api/product/";

const addProduct = {
  name: document.getElementById("name").value,
  description: document.getElementById("description").value,
  brand: document.getElementById("brand").value,
  imageUrl: document.getElementById("imageUrl").value,
  price: document.getElementById("price").value,
};

fetch(URL, {
  method,
  body: JSON.stringify(addProduct),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resp) => resp.json())
  .then((newObject) => {
    showAlert("Risorsa con id: " + newObject._id + " creata con successo!");
  })
  .catch((error) => console.log(error));
