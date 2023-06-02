// using Boucle Native (while, for)
let showedItems;
let recipeListe;
const searchInput = document.querySelector(".basic-search-input");
let singleValue = "";
let filterArr;
let fixRecipesArr;

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
		filterArr = showedItems;
	} else {
		init();
		filterArr = showedItems;
	}
	fixRecipesArr = showedItems;
	const ingreList = keywordIngredientArr(showedItems, "");
	displayIngreItems(ingreList);
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
	for (let m = 0; m < recipes.length; m++) {
		let tokenArr = [];
		const recipe = Object.values(recipes[m]);

		for (let i = 0; i < recipe.length; i++) {
			if (
				(typeof recipe[i] === "string") |
				(typeof recipe[i] === "number")
			) {
				tokenArr.push(recipe[i]);
			} else {
				props = Object.values(recipe[i]);
				for (let j = 0; j < props.length; j++) {
					if (
						(typeof props[j] === "string") |
						(typeof props[j] === "number")
					) {
						tokenArr.push(props[j]);
					} else {
						subProps = Object.values(props[j]);
						for (let k = 0; k < subProps.length; k++) {
							if (
								(typeof subProps[k] === "string") |
								(typeof subProps[k] === "number")
							) {
								tokenArr.push(subProps[k]);
							} else {
								sub2Props = Object.values(subProps[k]);
								for (let l = 0; l < sub2Props.length; l++) {
									tokenArr.push(sub2Props[l]);
								}
							}
						}
					}
				}
			}
		}
		let isKeyword = false;
		for (let t = 0; t < tokenArr.length; t++) {
			let newitem = tokenArr[t].toString().toLowerCase();
			if (newitem.includes(keyword)) {
				isKeyword = true;
			}
		}
		if (isKeyword) resultArr.push(recipes[m]);
	}
	showedItems = resultArr;
	console.log(resultArr);
	return resultArr;
};

async function displayRecipes(Recipes) {
	const recipes = [...new Set(Recipes)];
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
	fixRecipesArr = showedItems;
	displayRecipes(showedItems);
	const ingreResult = keywordIngredientArr(showedItems, "");
	displayIngreItems(ingreResult);
};

init();
