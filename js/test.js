const checkTypeTTTTT = function (item, arr) {
	let isStop = true;
	Object.values(item).map((prop, index) => {
		if ((typeof prop === "string") | (typeof id === "number")) {
			// console.log(prop, arr);
			isStop = false;
			arr.push(prop);
		} else {
			// if (index == Object.keys(item).length - 1 && isStop) {
			// 	console.log(arr);
			// 	return arr;
			// } else {
			// 	checkType(prop, arr);
			// }
			checkType(prop, arr);
		}
		if (index == Object.keys(item).length - 1 && isStop) {
			console.log(arr);
			return arr;
		}
	});
};
// Object.values(recipe).map((prop) => {
// 	if ((typeof prop === "string") | (typeof id === "number")) {
// 		tokenArr.push(prop);
// 	} else {
// 		Object.values(prop).map((item) => {
// 			if (
// 				(typeof item === "string") |
// 				(typeof item === "number")
// 			) {
// 				tokenArr.push(item);
// 			} else {
// 				Object.values(item).map((id) => {
// 					if (
// 						(typeof id === "string") |
// 						(typeof id == "number")
// 					) {
// 						tokenArr.push(id);
// 					} else {
// 						Object.values(id).map((inge) =>
// 							tokenArr.push(inge)
// 						);
// 					}
// 				});
// 			}
// 		});
// 	}
// });
