const ingredientOption = document.getElementById("ingre-button");
const ingreList = document.getElementById("dropdown-menu");
const closeIngreDropdown = document.getElementById("icon-ingre-close");
ingredientOption.addEventListener("click", () => {
  ingredientOption.style.display = "none";
  ingreList.style.display = "block";
});
closeIngreDropdown.addEventListener("click", () => {
  ingredientOption.style.display = "block";
  ingreList.style.display = "none";
});
