const date = document.querySelector("#date")
const liste = document.querySelector("#liste")
const element = document.querySelector("#element")
const input = document.querySelector("#input")
const botonEnter = document.querySelector("#boton-enter")
const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineThrough = "line-through"
let LIST

let id

const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString("en-US", {
	weekday: "long",
	month: "short",
	day: "numeric",
})

function ajouterTask(task, id, fait, supprime) {
	if (supprime) {
		return
	} 

	const FAIT = fait ? check : uncheck 

	const LINE = fait ? lineThrough : ""

	const element = `
                        <li id="element">
                        <i class="far ${FAIT}" data="fait" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-trash de" data="supprime" id="${id}"></i> 
                        </li>
                    `
	liste.insertAdjacentHTML("beforeend", element)
}



function taskFaite(element) {
	element.classList.toggle(check)
	element.classList.toggle(uncheck)
	element.parentNode.querySelector(".text").classList.toggle(lineThrough)
	LIST[element.id].fait = LIST[element.id].fait ? false : true //Si
	
}

function taskSupprime(element) {
	element.parentNode.parentNode.removeChild(element.parentNode)
	LIST[element.id].supprime = true
	console.log(LIST)
}



botonEnter.addEventListener("click", () => {
	const task = input.value
	if (task) {
		ajouterTask(task, id, false, false)
		LIST.push({
			nom: task,
			id: id,
			fait: false,
			supprime: false,
		})
		localStorage.setItem("TODO", JSON.stringify(LIST))
		id++
		input.value = ""
	}
})

document.addEventListener("keyup", function (event) {
	if (event.key == "Enter") {
		const task = input.value
		if (task) {
			ajouterTask(task, id, false, false)
			LIST.push({
				nom: task,
				id: id,
				fait: false,
				supprime: false,
			})
			localStorage.setItem("TODO", JSON.stringify(LIST))

			input.value = ""
			id++
			console.log(LIST)
		}
	}
})

liste.addEventListener("click", function (event) {
	const element = event.target
	const elementData = element.attributes.data.value
	console.log(elementData)

	if (elementData == "fait") {
		taskFaite(element)
	} else if (elementData == "supprime") {
		taskSupprime(element)
		console.log("elimnado")
	}
	localStorage.setItem("TODO", JSON.stringify(LIST))
})

let data = localStorage.getItem("TODO")
if (data) {
	LIST = JSON.parse(data)
	console.log(LIST)
	id = LIST.length
	cargarliste(LIST)
} else {
	LIST = []
	id = 0
}

function cargarliste(array) {
	array.forEach(function (item) {
		ajouterTask(item.nom, item.id, item.fait, item.supprime)
	})
}
