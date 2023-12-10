const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0ODExZDJjNmEwZDAwMTg0OTVmN2IiLCJpYXQiOjE3MDIxMzQwNDUsImV4cCI6MTcwMzM0MzY0NX0.k0CGv8YyTP3bF6_NasTnxo-A79eoV6aagbZ7HeJ690w";

fetch(endpoint, {
  headers: {
    Authorization: token,
  },
})
  .then((resp) => resp.json())
  .then((products) => {
    const row = document.getElementById("wrapper");
    console.log(products);

    products.forEach((product) => {
      const id = product._id;
      const col = document.createElement("div");
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card");
      const h3 = document.createElement("h3");
      h3.innerText = product.name;
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.classList.add("img-fluid");
      const brand = document.createElement("p");
      brand.innerText = "brand: " + product.brand;
      const price = document.createElement("p");
      price.classList.add("fs-5");
      price.innerText = "price: " + product.price + "€";
      const detailsLink = document.createElement("a");
      detailsLink.setAttribute("href", "./details.html" + "?resourceId=" + id);
      detailsLink.innerText = "Discover More...";
      row.appendChild(col);
      col.appendChild(card);
      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(price);
      card.appendChild(detailsLink);
    });
  })
  .catch((error) => console.log(error))
  .finally(() => {
    document.querySelector(".spinner-border").classList.add("d-none");
  });
