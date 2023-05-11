const ingredientOption = document.getElementById("ingre-button");
const ingreList = document.getElementById("dropdown-menu");
const closeIngreDropdown = document.getElementById("icon-ingre-close");
const ingreInput = document.getElementById("ingre-input-search");
ingredientOption.addEventListener("click", () => {
	ingredientOption.style.display = "none";
	ingreList.style.display = "block";
});
closeIngreDropdown.addEventListener("click", () => {
	ingredientOption.style.display = "block";
	ingreList.style.display = "none";
});
let ingreValue = "";
ingreInput.addEventListener("keyup", async (event) => {
	let list = [...showedItems];
	console.log(list, showedItems);
	ingreValue = ingreInput.value;
	let ingreResult;
	console.log(ingreValue);
	if (ingreInput.value.length > 2) {
		ingreValue = ingreInput.value;
		if ((event.value = "Backspace")) {
			// ingreItems = fixRecipesArr;
			list = [...fixRecipesArr];
			console.log(list);
		}
		const value = ingreValue.split(" ");
		value.map((keyword) => {
			console.log(keyword);
			// console.log(showedItems);
			// resultData(keyword, showedItems)
			console.log(list);
			// resultData(keyword, list);
			// filter array of recipes in which keyword exists in array of ingredients
			list = checkIngrehaskeyword(list, keyword);
			// filter array of ingredients which contain keyword
			ingreResult = keywordIngredientArr(list, keyword);
			console.log(ingreResult);
		});

		console.log(filterArr);
		displayRecipes(list);
		displayIngreItems(ingreResult);
	} else {
		// showedItems = list;

		console.log(fixRecipesArr);
		ingreResult = keywordIngredientArr(fixRecipesArr, "");
		displayRecipes(fixRecipesArr);
		displayIngreItems(ingreResult);
	}
});
async function displayIngreItems(items) {
	const ingreDropwdownSection = document.querySelector(".dropdown-col");
	while (ingreDropwdownSection.hasChildNodes())
		ingreDropwdownSection.firstChild.remove();
	// remove repeated item
	let uniqueItems = [...new Set(items)];
	if (uniqueItems.length > 29) uniqueItems = uniqueItems.slice(0, 30);
	console.log(uniqueItems.length);
	console.log(uniqueItems);
	uniqueItems.forEach((item) => {
		const ingreModel = ingreItem(item);
		const ingreDOM = ingreModel.getIngreItemDOM();
		ingreDropwdownSection.appendChild(ingreDOM);
	});
}
const checkIngrehaskeyword = (arr, keyword) => {
	const recipecontainKeyword = [];
	console.log();
	console.log("Concombre".toLowerCase().indexOf("con"));
	// take all the ingredients of recipe
	arr.map((recipe) => {
		const ingreArr = recipe.ingredients.flatMap((v) =>
			v.ingredient.toLowerCase()
		);
		console.log(ingreArr);
		ingreArr.map((ingre) => {
			const keywordLowerCase = keyword.toLowerCase();
			console.log(keywordLowerCase);
			if (!(ingre.indexOf(keywordLowerCase) == -1))
				return recipecontainKeyword.push(recipe);
		});
	});
	console.log(recipecontainKeyword);
	return recipecontainKeyword;
};

const keywordIngredientArr = (arr, keyword) => {
	let results = [];
	const items = arr.flatMap((v) =>
		v.ingredients.flatMap((v) => v.ingredient)
	);
	items.map((item) => {
		if (item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
			results.push(item);
	});
	return results;
};
