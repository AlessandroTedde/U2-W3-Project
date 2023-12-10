const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0ODExZDJjNmEwZDAwMTg0OTVmN2IiLCJpYXQiOjE3MDIxMzQwNDUsImV4cCI6MTcwMzM0MzY0NX0.k0CGv8YyTP3bF6_NasTnxo-A79eoV6aagbZ7HeJ690w";
const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log(resourceId);
URL = endpoint + resourceId;

fetch(URL, {
  headers: {
    Authorization: token,
  },
})
  .then((resp) => resp.json())
  .then(({ name, description, brand, imageUrl, price }) => {
    document.getElementById("prodImg").setAttribute("src", imageUrl);
    document.getElementById("prodName").innerText = name;
    document.getElementById("prodBrand").innerText = brand;
    document.getElementById("prodDesc").innerText = description;
    document.getElementById("prodPrice").innerText = price + "€";
    document.getElementById("modLink").setAttribute("href", "./backoffice.html" + "?resourceId=" + resourceId);
  })
  .finally(() => {
    document.querySelector(".spinner-border").classList.add("d-none");
  });
