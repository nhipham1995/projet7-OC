function ustensileItem(data, noresult) {
	function getUstensileItemDOM() {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.textContent = data;
		li.appendChild(a);
		if (noresult !== 0) {
			a.classList.add("dropdown-item");

			li.addEventListener("click", () => {
				const tagsWrapper =
					document.getElementsByClassName("tags-wrapper")[0];
				const model = tag(data, "ustensile-tag");
				const tagItem = model.getTagDOM();
				tagsWrapper.appendChild(tagItem);
				// ingreValue.push(data);
				// let list = [...showedItems];
				// const value = ingreValue.flatMap((v) => v.split(" "));
				// console.log(value);
				// value.map((keyword) => {
				// 	console.log(keyword);

				// 	console.log(list);
				// 	// filter array of recipes in which keyword exists in array of ingredients
				// 	list = checkIngrehaskeyword(list, keyword);
				// 	// filter array of ingredients which contain keyword
				// 	ingreResult = keywordIngredientArr(list, keyword);
				// 	console.log(ingreResult);
				// });

				// console.log(filterArr);
				// displayRecipes(list);
				// displayIngreItems(ingreResult);
				// console.log(ingreValue);

				ustensileSearch();
				applianceSearch();
				ingredientSearch();
			});
		} else {
			a.style.marginLeft = "20px";
		}

		return li;
	}
	return { getUstensileItemDOM };
}
