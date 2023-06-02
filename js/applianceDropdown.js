const appareilOption = document.getElementById("appareil-button");

const appareilList = document.getElementById("dropdown-menu-appareil");
const closeAppareilDropdown = document.getElementById("icon-appareil-close");
const appareilInput = document.getElementById("appareil-input-search");
// open, close the ingredient dropdown
appareilOption.addEventListener("click", () => {
	console.log("click");
	appareilOption.style.display = "none";
	appareilList.style.display = "block";
	closeUstensil();
	closeIngre();
	appareilInput.value = "";
	applianceSearch();
});
function closeAppareil() {
	appareilOption.style.display = "block";
	appareilList.style.display = "none";
}
closeAppareilDropdown.addEventListener("click", () => {
	closeAppareil();
});
let appareilTagsTaken;
let appareilValue = [];
let resultfromAppareil = [];
appareilInput.addEventListener("keyup", async (event) => {
	applianceSearch(event);
});

const applianceSearch = (event) => {
	console.log("appliance search");
	// let list = resultFromUstensile.length
	// 	? [...resultFromUstensile]
	// 	: resultFromIngre.length
	// 	? [...resultFromIngre]
	// 	: [...fixRecipesArr];
	let list = checkOtherTags();
	// let checkTags = checkOtherTags();
	// if (checkTags) {
	// 	let idRecipes = checkTags.map((r) => r.id);
	// 	console.log(idRecipes);
	// 	let idList = list.map((v) => v.id);
	// 	let ids = idList.filter((v) => idRecipes.includes(v));
	// 	console.log(ids);
	// 	list = list.filter(({ id }) => ids.includes(id));
	// 	console.log(list);
	// }
	appareilValue = [];
	const instanceAppareilTags = checkAppareilTags();
	// check if ingredient tags change => update
	if (appareilTagsTaken !== instanceAppareilTags) {
		appareilTagsTaken = instanceAppareilTags;
		instanceAppareilTags &&
			appareilTagsTaken.map((v) => appareilValue.push(v));
	}
	let appareilResult;
	console.log(appareilValue);
	console.log(appareilInput.value);
	if (appareilInput.value.length > 2) {
		appareilValue.push(appareilInput.value);
		if (event && event.value === "Backspace") {
			// ingreItems = fixRecipesArr;
			list = resultFromUstensile.length
				? [...resultFromUstensile]
				: resultFromIngre.length
				? [...resultFromIngre]
				: [...fixRecipesArr];
		}
		console.log(appareilValue);
		const value = appareilValue.flatMap((v) => v.split(" "));
		console.log(list);

		value.map((keyword) => {
			// filter array of recipes in which keyword exists in array of ingredients
			list = checkAppareilhaskeyword(list, keyword);
			console.log(list);

			// filter array of ingredients which contain keyword
			appareilResult = keywordAppareilArr(list, keyword);
		});

		displayRecipes(list);
		displayAppareilItems(appareilResult);
		resultfromAppareil = list;
	} else {
		// showedItems = list;
		// appareilValue.push(appareilInput.value);
		if (appareilValue.length) {
			console.log(appareilValue);
			appareilValue.map((keyword) => {
				console.log(keyword);
				// filter array of recipes in which keyword exists in array of ingredients
				list = checkAppareilhaskeyword(list, keyword);
				// filter array of ingredients which contain keyword
				// let ingreResults = keywordIngredientArr(list, keyword);
				// list = checkListAppareilOfRecipe(list, keyword);
				appareilList;
				console.log(list);
				// console.log(ingreResults);
				resultfromAppareil = list;
			});
			appareilResult = list.flatMap((item) => item.appliance);

			console.log(appareilResult);
			displayRecipes(list);
			resultfromAppareil = list;
			return displayAppareilItems(appareilResult);
		}

		// const initialList = resultFromUstensile.length
		// 	? [...resultFromUstensile]
		// 	: resultFromIngre.length
		// 	? [...resultFromIngre]
		// 	: [...fixRecipesArr];
		const initialList = checkOtherTags();
		appareilResult = initialList.map((v) => v.appliance);
		displayRecipes(
			resultFromUstensile.length
				? [...resultFromUstensile]
				: resultFromIngre.length
				? [...resultFromIngre]
				: [...fixRecipesArr]
		);
		console.log(appareilResult);
		console.log(resultFromIngre);
		displayAppareilItems(appareilResult);
		resultfromAppareil = initialList;

		// resultFromIngre = fixRecipesArr;
	}
};
async function displayAppareilItems(items) {
	const appareilDropwdownSection =
		document.getElementById("recommend-appareil");
	console.log(appareilDropwdownSection);
	while (appareilDropwdownSection.hasChildNodes())
		appareilDropwdownSection.firstChild.remove();
	// remove repeated item
	let uniqueItems = [...new Set(items)];
	// if (uniqueItems.length > 29) uniqueItems = uniqueItems.slice(0, 30);
	let actualTags = checkAppareilTags();
	if (actualTags) {
		uniqueItems = uniqueItems.filter((v) => !actualTags.includes(v));
		console.log(uniqueItems);
	}

	if (uniqueItems.length) {
		uniqueItems.forEach((item) => {
			const appareilModel = appareilItem(item);
			const appareilDOM = appareilModel.getAppareilItemDOM();
			appareilDropwdownSection.appendChild(appareilDOM);
		});
	} else {
		const appareilModel = appareilItem("Il n'y a plus d'appliance!", 0);
		const appareilDOM = appareilModel.getAppareilItemDOM();
		appareilDropwdownSection.appendChild(appareilDOM);
	}
}

const checkAppareilhaskeyword = (arr, keyword) => {
	const recipecontainKeyword = [];
	const keywordLowerCase = keyword.toLowerCase();

	// take all the ingredients of recipe
	console.log(arr);
	// arr[0].map((recipe) => {
	arr.map((recipe) => {
		// const appareilArr = recipe.map((v) => v.appliance.toLowerCase());
		// appareilArr.map((app) => {
		// 	const keywordLowerCase = keyword.toLowerCase();
		// 	if (!(app.indexOf(keywordLowerCase) == -1))
		// 		return recipecontainKeyword.push(recipe);
		// });
		const appareilArr = recipe.appliance.toLowerCase();
		if (appareilArr.indexOf(keywordLowerCase) !== -1)
			return recipecontainKeyword.push(recipe);
	});
	console.log(recipecontainKeyword);
	return recipecontainKeyword;
};

const keywordAppareilArr = (arr, keyword) => {
	let results = [];

	const items = arr.map((v) => v.appliance);
	console.log(items, keyword);
	items.map((item) => {
		if (item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
			results.push(item);
	});
	return results;
};

const checkAppareilTags = () => {
	if (document.getElementsByClassName("appareil-tag")) {
		const appareilTags = document.getElementsByClassName("appareil-tag");
		if (appareilTags.length > 0) {
			let array = [];
			for (let i = 0; i < appareilTags.length; i++) {
				array.push(appareilTags[i].childNodes[0].innerHTML);
			}
			console.log("appareil tags: ", array);
			return array;
		}
	}
};
