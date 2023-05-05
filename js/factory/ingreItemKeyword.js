function ingreItem(data) {
	function getIngreItemDOM() {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.classList.add("dropdown-item");
		a.classList.add("ingredient");
		a.textContent = data;
		li.appendChild(a);
		return li;
	}
	return { getIngreItemDOM };
}
