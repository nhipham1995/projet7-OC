// using Boucle Native (while, for)
let showedItems;
let recipeListe;
const searchInput = document.querySelector(".basic-search-input");
let singleValue = "";

searchInput.addEventListener("keyup", async (event) => {
	singleValue = searchInput.value;
	if (searchInput.value.length > 2) {
		singleValue = searchInput.value;
		if ((event.value = "Backspace")) {
			showedItems = recipeListe;
		}
		const newInput = singleValue.split(" ");
		newInput.map((keyword) => {
			resultData(keyword, showedItems);
		});
		displayRecipes(showedItems);
	} else {
		init();
	}
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
const resultData = async (keyword, recipes) => {
	const resultArr = [];
	recipes.map(async (recipe) => {
		let tokenArr = [];
		const checkType = function (item) {
			let isStop = true;
			Object.values(item).map((prop, index) => {
				if ((typeof prop === "string") | (typeof id === "number")) {
					isStop = false;
					tokenArr.push(prop);
				} else {
					checkType(prop);
				}
				if (index == Object.keys(item).length - 1 && isStop) {
					return;
				}
			});
		};
		checkType(recipe);
		let isKeyword = false;
		tokenArr.map((item) => {
			let newitem = item.toString().toLowerCase();
			if (newitem.includes(keyword)) {
				return (isKeyword = true);
			}
		});
		if (isKeyword) resultArr.push(recipe);
	});
	showedItems = resultArr;
	return resultArr;
};

async function displayRecipes(recipes) {
	const recipesSection = document.getElementById("recipe-list");
	while (recipesSection.hasChildNodes()) recipesSection.firstChild.remove();

	recipes.forEach((recipe) => {
		const recipeModel = recipeCard(recipe);
		const recipeCardDOM = recipeModel.getRecipeCardDOM();
		recipesSection.appendChild(recipeCardDOM);
	});
}

const init = async () => {
	recipeListe = await fetchData();
	showedItems = recipeListe;
	displayRecipes(showedItems);
};

init();
