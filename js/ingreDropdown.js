const ingredientOption = document.getElementById("ingre-button");
const ingreList = document.getElementById("dropdown-menu-ingre");
const closeIngreDropdown = document.getElementById("icon-ingre-close");
const ingreInput = document.getElementById("ingre-input-search");
// open, close the ingredient dropdown
ingredientOption.addEventListener("click", () => {
	ingredientOption.style.display = "none";
	ingreList.style.display = "block";
	closeAppareil();
	closeUstensil();
	ingreInput.value = "";
	ingredientSearch();
});
function closeIngre() {
	ingredientOption.style.display = "block";
	ingreList.style.display = "none";
}
closeIngreDropdown.addEventListener("click", () => {
	closeIngre();
});
let ingreValue = [];
let tagsTaken;
let resultFromIngre = [];
// execute when texting the input
ingreInput.addEventListener("keyup", async (event) => {
	ingredientSearch(event);
});

const ingredientSearch = (event) => {
	let list = [...showedItems];
	ingreValue = [];
	const instanceIngreTags = checkIngredientTags();
	console.log("run");
	// check if ingredient tags change => update
	if (tagsTaken !== instanceIngreTags) {
		tagsTaken = instanceIngreTags;
		instanceIngreTags && tagsTaken.map((v) => ingreValue.push(v));
	}
	let ingreResult;
	if (ingreInput.value.length > 2) {
		ingreValue.push(ingreInput.value);
		if (event && event.value === "Backspace") {
			// ingreItems = fixRecipesArr;
			list = [...fixRecipesArr];
		}
		const value = ingreValue.flatMap((v) => v.split(" "));
		value.map((keyword) => {
			// filter array of recipes in which keyword exists in array of ingredients
			list = checkIngrehaskeyword(list, keyword);
			console.log(list);
			ingreResult = checkOtherTags();
			// filter array of ingredients which contain keyword
			ingreResult = keywordIngredientArr(list, keyword);
		});

		displayRecipes(list);
		console.log(ingreResult);
		displayIngreItems(ingreResult);
		resultFromIngre = list;
	} else {
		// showedItems = list;
		if (ingreValue.length) {
			console.log("ingrevalue has lengthhhhh");
			ingreValue.map((keyword) => {
				console.log(keyword);
				// filter array of recipes in which keyword exists in array of ingredients
				list = checkIngrehaskeyword(list, keyword);
				// filter array of ingredients which contain keyword
				// let ingreResults = keywordIngredientArr(list, keyword);
				list = checkListIngreOfRecipe(list, keyword);
				ingreList;
				console.log(list);
				resultFromIngre = list;
			});

			const resultAppareil = checkOtherTags();
			if (resultAppareil) {
				let idRecipes = resultAppareil.map((r) => r.id);
				console.log(idRecipes);
				let idList = list.map((v) => v.id);
				let ids = idList.filter((v) => idRecipes.includes(v));
				console.log(ids);
				list = list.filter(({ id }) => ids.includes(id));
				console.log(list);
			}

			ingreResult = list.flatMap((item) =>
				item.ingredients.flatMap((ingre) => ingre.ingredient)
			);
			console.log(list);
			console.log(ingreResult);
			displayRecipes(list);
			return displayIngreItems(ingreResult);
		}
		console.log(fixRecipesArr);
		// ingreResult = keywordIngredientArr(fixRecipesArr, "");
		// const restIngreArr = checkOtherTags(ingreResult);
		// if (restIngreArr.length > 0) {
		// 	ingreResult = checkOtherTags(ingreResult);
		// }
		const newRecipes = checkOtherTags(fixRecipesArr);
		// if (newRecipes) {
		console.log(newRecipes);
		ingreResult = keywordIngredientArr(newRecipes, "");
		displayRecipes(newRecipes);
		displayIngreItems(ingreResult);
		console.log("ingreValue is none");
		resultFromIngre = fixRecipesArr;
		// } else {
		// 	ingreResult = keywordIngredientArr(fixRecipesArr, "");
		// 	displayRecipes(fixRecipesArr);
		// 	displayIngreItems(ingreResult);
		// 	console.log("ingreValue is none");
		// 	resultFromIngre = fixRecipesArr;
		// }
	}
};
async function displayIngreItems(items) {
	console.log("Argument items:", items);
	const ingreDropwdownSection = document.querySelector(".dropdown-col-ingre");
	while (ingreDropwdownSection.hasChildNodes())
		ingreDropwdownSection.firstChild.remove();

	// remove repeated item
	let uniqueItems = [...new Set(items.map((v) => v.toLowerCase()))];
	// if (uniqueItems.length > 29) uniqueItems = uniqueItems.slice(0, 30);
	// filter the actual tags
	let actualTags = checkIngredientTags();
	if (actualTags) {
		uniqueItems = uniqueItems.filter((v) => !actualTags.includes(v));
		console.log(uniqueItems);
	}
	if (uniqueItems.length) {
		uniqueItems.forEach((item) => {
			const ingreModel = ingreItem(item);
			const ingreDOM = ingreModel.getIngreItemDOM();
			ingreDropwdownSection.appendChild(ingreDOM);
		});
	} else {
		const ingreModel = ingreItem("Il n'y a plus d'ingrédient!", 0);
		const ingreDOM = ingreModel.getIngreItemDOM();
		ingreDropwdownSection.appendChild(ingreDOM);
	}
}
const checkIngrehaskeyword = (arr, keyword) => {
	const recipecontainKeyword = [];
	// take all the ingredients of recipe
	arr.map((recipe) => {
		const ingreArr = recipe.ingredients.flatMap((v) =>
			v.ingredient.toLowerCase()
		);
		ingreArr.map((ingre) => {
			const keywordLowerCase = keyword.toLowerCase();
			if (!(ingre.indexOf(keywordLowerCase) == -1))
				return recipecontainKeyword.push(recipe);
		});
	});
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

const checkListIngreOfRecipe = (list, keyword) => {
	const result = list.map((recipe) => {
		if (
			recipe.ingredients.map(
				(ingre) => ingre.ingredient.indexOf(keyword) !== -1
			)
		) {
			return recipe;
		}
	});
	return result;
};

const checkIngredientTags = () => {
	if (document.getElementsByClassName("ingredient-tag")) {
		const ingreTags = document.getElementsByClassName("ingredient-tag");
		if (ingreTags.length > 0) {
			let array = [];
			for (let i = 0; i < ingreTags.length; i++) {
				array.push(ingreTags[i].childNodes[0].innerHTML);
			}
			return array;
		}
	}
};

const checkOtherTags = () => {
	const appareilTags = checkAppareilTags();
	const ustensilTags = checkUstensileTags();
	const ingreTags = checkIngredientTags();
	if (appareilTags && !ustensilTags) {
		if (ingreTags) {
			let ids;
			ids = resultfromAppareil.map((v) => v.id);
			return resultFromIngre.filter((v) => ids.includes(v.id));
		}
		return resultfromAppareil;
	}
	if (ustensilTags && appareilTags) {
		let ids;
		ids = resultfromAppareil.map((v) => v.id);
		let filterResult = resultFromUstensile.filter((v) =>
			ids.includes(v.id)
		);
		if (ingreTags) {
			let ingreIds = resultFromIngre.map((v) => v.id);
			return filterResult.filter((v) => ingreIds.includes(v.id));
		}
		return filterResult;
	}
	if (!appareilTags && ustensilTags) {
		return resultFromUstensile;
	}
	if (!appareilTags && !ustensilTags) {
		if (ingreTags) {
			return resultFromIngre;
		}
		return fixRecipesArr;
	}
};
