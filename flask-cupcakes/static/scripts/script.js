const $form = $("form");
const $list = $("#cupcake_list");

const BASE_URL = "http://127.0.0.1:5000";

resetList();

async function resetList() {
	$list.empty();
	fillList();
}

async function fillList() {
	let response = await axios({
		url: `${BASE_URL}/api/cupcakes`,
		method: "GET",
	});
	for (item in response.data.cupcakes) {
		let newLi = document.createElement("li");
		newLi.classList.add("small");
		newLi.textContent = stringRepr(response.data.cupcakes[item]);

		$list.append(newLi);
	}
}

function stringRepr(obj) {
	let str = "";
	for (item in obj) {
		str += `${item}: ${obj[item]} `;
	}
	return str;
}

$form.submit(async function (e) {
	e.preventDefault();
	const formDataObject = {};
	$(this)
		.serializeArray()
		.forEach(function (item) {
			formDataObject[item.name] = item.value;
		});

	const jsonData = JSON.stringify(formDataObject);

    let response = await axios({
		url: `${BASE_URL}/api/cupcakes`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: jsonData,
	});
    resetList()
});
