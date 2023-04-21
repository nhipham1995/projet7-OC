const ingredientOption = document.getElementById("ingre-button");
const ingreList = document.getElementById("dropdown-menu");
ingredientOption.addEventListener("click", () => {
  ingredientOption.style.display = "none";
  ingreList.style.display = "block";
});
ingreList.addEventListener("click", () => {
  ingredientOption.style.display = "block";
  ingreList.style.display = "none";
});
