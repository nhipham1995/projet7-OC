function tag(data, type) {
	function getTagDOM() {
		const wrapper = document.createElement("div");
		wrapper.classList.add("tags");
		wrapper.classList.add(type);
		const p = document.createElement("p");
		p.textContent = data;
		const closeButton = document.createElement("button");
		closeButton.classList.add("close");
		closeButton.type = "button";
		const iconCloseButton = document.createElement("img");
		iconCloseButton.src = "../../assets/images/close-icon.png";
		wrapper.appendChild(p);
		wrapper.appendChild(closeButton);
		closeButton.appendChild(iconCloseButton);
		closeButton.addEventListener("click", async () => {
			wrapper.remove();
			switch (type) {
				case "ingredient-tag":
					await ingredientSearch();
					applianceSearch();
					ustensileSearch();
					break;
				case "appareil-tag":
					resultfromAppareil = [...fixRecipesArr];
					await applianceSearch();
					ingredientSearch();
					ustensileSearch();

					break;
				case "ustensile-tag":
					resultFromUstensile = [...fixRecipesArr];
					await ustensileSearch();
					applianceSearch();
					ingredientSearch();
					break;
			}
		});
		return wrapper;
	}
	return { getTagDOM };
}
