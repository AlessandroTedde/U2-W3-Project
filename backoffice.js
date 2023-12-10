const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0ODExZDJjNmEwZDAwMTg0OTVmN2IiLCJpYXQiOjE3MDIxMzQwNDUsImV4cCI6MTcwMzM0MzY0NX0.k0CGv8YyTP3bF6_NasTnxo-A79eoV6aagbZ7HeJ690w";
const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log(resourceId);
if (resourceId) {
  method = "PUT";
  URL = endpoint + resourceId;
} else {
  method = "POST";
  URL = endpoint;
}

window.addEventListener("DOMContentLoaded", () => {
  const confirmButton = document.getElementById("confirm");
  const trashCan = document.getElementById("delete");
  const formDesc = document.getElementById("formTitle");

  if (resourceId) {
    formDesc.innerText = "Modify Product Form";
    confirmButton.innerText = "Modify Product";
    confirmButton.classList.remove("btn-primary");
    confirmButton.classList.add("btn-warning");

    fetch(URL, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then(({ name, description, brand, imageUrl, price }) => {
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      });
  } else {
    trashCan.classList.add("d-none");
  }
});

const trashCan = document.getElementById("delete");
trashCan.addEventListener("click", () => {
  const confirmedErase = confirm("Do you really want to delete this product?");
  if (confirmedErase) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedProduct) => {
        window.alert("You have deleted " + deletedProduct.name + " which had id n: " + deletedProduct._id);
      });
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

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
      Authorization: token,
    },
  })
    .then((response) => {
      console.log(response);

      if (response.status === 404) throw new Error("Error, resource not found");
      if (response.status >= 400 && response.status < 500) throw new Error("Client Error");
      if (response.status >= 500 && response.status < 600) throw new Error("Server Error");
      if (!response.ok) throw new Error("Error filling data");

      return response.json();
    })
    .then((newProduct) => {
      resourceId
        ? window.alert("You have successfully modified your product with id n: " + newProduct._id + " !")
        : window.alert("You have successfully added your product! The id n. is: " + newProduct._id);
    })
    .catch((error) => console.log(error));
};
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
});
