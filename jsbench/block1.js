const resultData = (keyword, recipes) => {
	let resultArr = [];
	recipes.map((recipe) => {
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
resultData(keyword, recipes);
