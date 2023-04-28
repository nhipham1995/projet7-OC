function recipeCard(data) {
  const { id, name, time, ingredients } = data;

  //   const picture = `assets/photographers/${portrait}`;

  function getRecipeCardDOM() {
    const article = document.createElement("article");
    const divWrapper = document.createElement("div");
    divWrapper.classList.add("card");
    const img = document.createElement("img");
    img.setAttribute("src", "./assets/images/ingre-demo.jpg");
    img.classList.add("card-img-top");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitleWrapper = document.createElement("div");
    cardTitleWrapper.classList.add("card-title-wrapper");
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = name;
    const timeCook = document.createElement("div");
    timeCook.classList.add("time-cook");
    const timeIcon = document.createElement("img");
    timeIcon.setAttribute("src", "./assets/images/time.png");
    const timeText = document.createElement("p");
    timeText.textContent = time + " min";
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    const listIngre = document.createElement("div");
    listIngre.classList.add("list-ingredient");
    //     ingredients.map((ingre) => {
    //       const p = document.createElement(p);
    //       const span = createElement("span");
    //       span.classList.add("ingredient-name");
    //       span.textContent = ingre.ingredient;
    //       p.appendChild(span);
    //       p.textContent = ingre?.quantity + ingre?.unit;
    //       listIngre.appendChild(p);
    //     });
    article.appendChild(divWrapper);
    divWrapper.appendChild(img);
    divWrapper.appendChild(cardBody);
    cardBody.appendChild(cardTitleWrapper);
    cardTitleWrapper.appendChild(h5);
    cardTitleWrapper.appendChild(timeCook);
    timeCook.appendChild(timeIcon);
    timeCook.appendChild(timeText);
    return article;
  }
  return { getRecipeCardDOM };
}
