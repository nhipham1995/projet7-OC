const ustensileOption = document.getElementById("ustensile-button");
console.log(ustensileOption);
const ustensileList = document.getElementById("dropdown-menu-ustensile");
const closeUstensileDropdown = document.getElementById("icon-ustensile-close");
const ustensileInput = document.getElementById("ustensil-input-search");
// open, close the ingredient dropdown
ustensileOption.addEventListener("click", () => {
	ustensileOption.style.display = "none";
	ustensileList.style.display = "block";
	closeAppareil();
	closeIngre();
	ustensileInput.value = "";
	ustensileSearch();
});
function closeUstensil() {
	ustensileOption.style.display = "block";
	ustensileList.style.display = "none";
}
closeUstensileDropdown.addEventListener("click", () => {
	closeUstensil();
});
let ustensileTagsTaken;
let ustensileValue = [];
ustensileInput.addEventListener("keyup", async (event) => {
	ustensileSearch(event);
});
let resultFromUstensile = [];
const ustensileSearch = (event) => {
	// let list = resultfromAppareil.length
	// 	? [...resultfromAppareil]
	// 	: resultFromIngre.length
	// 	? [...resultFromIngre]
	// 	: [...fixRecipesArr];
	let list = checkOtherTags();
	// let list = [...fixRecipesArr];
	ustensileValue = [];
	const instanceUstensileTags = checkUstensileTags();
	// check if ingredient tags change => update
	if (ustensileTagsTaken !== instanceUstensileTags) {
		ustensileTagsTaken = instanceUstensileTags;
		instanceUstensileTags &&
			ustensileTagsTaken.map((v) => ustensileValue.push(v));
	}
	let ustensileResult;
	console.log(ustensileValue);
	console.log(ustensileInput.value);
	if (ustensileInput.value.length > 2) {
		ustensileValue.push(ustensileInput.value);
		if (event && event.value === "Backspace") {
			// ingreItems = fixRecipesArr;
			// list = resultfromAppareil.length
			// 	? [...resultfromAppareil]
			// 	: resultFromIngre.length
			// 	? [...resultFromIngre]
			// 	: [...fixRecipesArr];
			list = checkOtherTags();
		}
		console.log(ustensileValue);
		const value = ustensileValue.flatMap((v) => v.split(" "));
		console.log("Value ustensile:", value);

		value.map((keyword) => {
			// filter array of recipes in which keyword exists in array of ingredients
			list = checkUstensilehaskeyword(list, keyword);
			console.log(list);

			// filter array of ingredients which contain keyword
			ustensileResult = keywordUstensileArr(list, keyword);
		});

		displayRecipes(list);
		displayUstensileItems(ustensileResult);
		resultFromUstensile = list;
	} else {
		// showedItems = list;
		// ustensileValue.push(ustensileInput.value);
		if (ustensileValue.length) {
			console.log("has lengthhhhhh");
			ustensileValue.map((keyword) => {
				console.log(keyword);
				// filter array of recipes in which keyword exists in array of ingredients
				list = checkUstensilehaskeyword(list, keyword);
				// filter array of ingredients which contain keyword
				// let ingreResults = keywordIngredientArr(list, keyword);
				// list = checkListustensileOfRecipe(list, keyword);
				ustensileList;
				console.log(list);
				// console.log(ingreResults);
			});
			ustensileResult = list.flatMap((item) => item.ustensils);

			console.log(ustensileResult);
			displayRecipes(list);
			resultFromUstensile = list;
			return displayUstensileItems(ustensileResult);
		} else {
			// const initialList = resultfromAppareil.length
			// 	? [...resultfromAppareil]
			// 	: resultFromIngre.length
			// 	? [...resultFromIngre]
			// 	: [...fixRecipesArr];
			const initialList = checkOtherTags();
			console.log(initialList);
			ustensileResult = initialList.flatMap((v) => v.ustensils);
			ustensileResult = ustensileResult.map((v) => v.toLowerCase());
			// displayRecipes(
			// 	resultfromAppareil.length
			// 		? [...resultfromAppareil]
			// 		: resultFromIngre.length
			// 		? [...resultFromIngre]
			// 		: [...fixRecipesArr]
			// );
			displayRecipes(checkOtherTags());
			resultFromUstensile = initialList;
			console.log(ustensileResult);
			console.log(resultFromIngre);
			displayUstensileItems(ustensileResult);
			// resultFromIngre = fixRecipesArr;
		}
	}
};
async function displayUstensileItems(items) {
	const ustensileDropwdownSection = document.getElementById(
		"recommend-ustensile"
	);
	const lowerCaseItems = items.map((x) => x.toLowerCase());
	console.log(ustensileDropwdownSection);
	while (ustensileDropwdownSection.hasChildNodes())
		ustensileDropwdownSection.firstChild.remove();
	// remove repeated item
	let uniqueItems = [...new Set(lowerCaseItems)];
	// if (uniqueItems.length > 29) uniqueItems = uniqueItems.slice(0, 30);
	let actualTags = checkUstensileTags();
	if (actualTags) {
		uniqueItems = uniqueItems.filter((v) => !actualTags.includes(v));
		console.log(uniqueItems);
	}
	if (uniqueItems.length) {
		uniqueItems.forEach((item) => {
			const ustensileModel = ustensileItem(item);
			const ustensileDOM = ustensileModel.getUstensileItemDOM();
			ustensileDropwdownSection.appendChild(ustensileDOM);
		});
	} else {
		const ustensileModel = ustensileItem("Il n'y a plus d'ustensil!", 0);
		const ustensileDOM = ustensileModel.getUstensileItemDOM();
		ustensileDropwdownSection.appendChild(ustensileDOM);
	}
}

const checkUstensilehaskeyword = (arr, keyword) => {
	const recipecontainKeyword = [];
	const keywordLowerCase = keyword.toLowerCase();

	// take all the ingredients of recipe
	console.log(keyword);
	// arr[0].map((recipe) => {
	arr.map((recipe) => {
		// const ustensileArr = recipe.map((v) => v.appliance.toLowerCase());
		// ustensileArr.map((app) => {
		// 	const keywordLowerCase = keyword.toLowerCase();
		// 	if (!(app.indexOf(keywordLowerCase) == -1))
		// 		return recipecontainKeyword.push(recipe);
		// });
		const ustensileArr = recipe.ustensils.map((v) => v.toLowerCase());
		ustensileArr.map((v) => {
			if (v.indexOf(keywordLowerCase) !== -1) {
				return recipecontainKeyword.push(recipe);
			}
		});
	});
	console.log(recipecontainKeyword);
	return recipecontainKeyword;
};

const keywordUstensileArr = (arr, keyword) => {
	let results = [];

	const items = arr.flatMap((v) => v.ustensils);
	console.log(items, keyword);
	items.map((item) => {
		if (item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
			results.push(item);
	});
	return results;
};

const checkUstensileTags = () => {
	if (document.getElementsByClassName("ustensile-tag")) {
		const ustensileTags = document.getElementsByClassName("ustensile-tag");
		if (ustensileTags.length > 0) {
			let array = [];
			for (let i = 0; i < ustensileTags.length; i++) {
				array.push(ustensileTags[i].childNodes[0].innerHTML);
			}
			return array;
		}
	}
};
