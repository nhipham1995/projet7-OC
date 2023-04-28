// using Boucle Native (while, for)
const searchInput = document.querySelector(".basic-search-input");
let singleValue = "";
searchInput.addEventListener("keyup", async () => {
  singleValue = searchInput.value;
  if (searchInput.value.length > 2) {
    singleValue = searchInput.value;
    console.log(singleValue);
    const showedItems = await resultData(singleValue);
    // return console.log(showedItems);
    displayRecipes(showedItems);
  }
  const showedItems = await fetchData();

  return console.log(showedItems);
});

const fetchData = async () => {
  const response = await fetch("../js/recipes.js").then((res) =>
    res
      .text()
      .then((res) => res.split("=", 2))
      .then((result) => eval(result[1]))
  );
  return response;
};
const resultData = async (keyword) => {
  const resultArr = [];
  const res = await fetchData();
  res.map((recipe) => {
    const tokenArr = [];
    Object.values(recipe).map((prop) => {
      if ((typeof prop === "string") | (typeof id === "number")) {
        tokenArr.push(prop);
      } else {
        Object.values(prop).map((item) => {
          if ((typeof item === "string") | (typeof item === "number")) {
            tokenArr.push(item);
          } else {
            Object.values(item).map((id) => {
              if ((typeof id === "string") | (typeof id == "number")) {
                tokenArr.push(id);
              } else {
                Object.values(id).map((inge) => tokenArr.push(inge));
              }
            });
          }
        });
      }
    });
    let isKeyword = false;
    tokenArr.map((item) => {
      let newitem = item.toString();
      if (newitem.includes(keyword)) {
        return (isKeyword = true);
      }
    });
    if (isKeyword) resultArr.push(recipe);
  });
  console.log(resultArr);
  return resultArr;
};

async function displayRecipes(recipes) {
  const recipesSection = document.getElementById("recipe-list");

  recipes.forEach((recipe) => {
    const recipeModel = recipeCard(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
    console.log("hello");
  });
}
