const URL = "https://striveschool-api.herokuapp.com/api/product/";
fetch(URL)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((respObj) => {
    const row = document.getElementById("wrapper");
    console.log(respObj);

    respObj.forEach((obj) => {
      const col = document.createElement("div");
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card");
      const h3 = document.createElement("h3");
      h3.innerText = obj.name;
      const img = document.createElement("img");
      img.src = obj.img;
      img.classList.add("img-fluid");
      const brand = document.createElement("p");
      img.classList.add("fs-5");
      p.innerText = "brand: " + obj.brand;
      const desc = document.createElement("p");
      img.classList.add("fs-5");
      p.innerText = obj.description;
      const price = document.createElement("p");
      img.classList.add("fs-5");
      p.innerText = "price: " + obj.price;
      const detailsLink = document.createElement("a");
      detailsLink.innerText = "Discover More...";
      detailsLink.href = "./backoffice.html";
    });
  })
  .catch((error) => console.log(error));
