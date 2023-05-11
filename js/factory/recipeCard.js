function recipeCard(data) {
	const { id, name, time, ingredients, description } = data;

	//   const picture = `assets/photographers/${portrait}`;

	function getRecipeCardDOM() {
		const article = document.createElement("article");
		const divWrapper = document.createElement("div");
		divWrapper.classList.add("card");
		const img = document.createElement("img");
		img.setAttribute("src", "./assets/images/ingre-demo.jpg");
		img.classList.add("card-img-top");
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");
		const cardTitleWrapper = document.createElement("div");
		cardTitleWrapper.classList.add("card-title-wrapper");
		const h5 = document.createElement("h5");
		h5.classList.add("card-title");
		h5.textContent = name;
		const timeCook = document.createElement("div");
		timeCook.classList.add("time-cook");
		const timeIcon = document.createElement("img");
		timeIcon.setAttribute("src", "./assets/images/time.png");
		const timeText = document.createElement("p");
		timeText.textContent = time + " min";
		const cardDescription = document.createElement("div");
		cardDescription.classList.add("card-description");
		const listIngre = document.createElement("div");
		listIngre.classList.add("list-ingredient");

		{
			ingredients.length &&
				ingredients.forEach((ingre) => {
					const wrapper = document.createElement("p");
					wrapper.classList.add("ingre-item-wrapper");
					const item = document.createElement("span");
					const span = document.createElement("span");
					span.classList.add("ingredient-name");
					span.textContent = ingre.ingredient + ":\u00a0";
					wrapper.appendChild(span);
					wrapper.appendChild(item);
					item.textContent =
						(ingre.quantity ? ingre.quantity : "") +
						"\u00a0" +
						(ingre.unit ? ingre.unit : "");
					listIngre.appendChild(wrapper);
				});
		}
		const descriptionPara = document.createElement("p");
		descriptionPara.textContent =
			description.length < 180
				? description
				: description.slice(0, 180) + "...";
		article.appendChild(divWrapper);
		divWrapper.appendChild(img);
		divWrapper.appendChild(cardBody);
		cardBody.appendChild(cardTitleWrapper);
		cardTitleWrapper.appendChild(h5);
		cardTitleWrapper.appendChild(timeCook);
		timeCook.appendChild(timeIcon);
		timeCook.appendChild(timeText);
		cardBody.appendChild(cardDescription);
		cardDescription.appendChild(listIngre);
		cardDescription.appendChild(descriptionPara);

		return article;
	}

	return { getRecipeCardDOM };
}
