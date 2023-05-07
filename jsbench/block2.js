const resultData = (keyword, recipes) => {
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
resultData(keyword, recipes);
