import React, {useState, useEffect} from "react"; //1. importar el hook useState

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [addTarea, setaddTarea] = useState("")
	const [lista, setLista] = useState([])
	const [boton, setBoton] = useState(false)
		
	function handleLista(e) {
		setaddTarea(e.target.value)


	}
	function eliminar(index) {
		const arr = lista.filter((todo, index2) => {
			return index2 !== index

		})
		setLista(arr)
		agregar(arr)
		
	}
	function handleAgregar(e) {
		e.preventDefault()
		const nuevaTarea = {
			done:false,
			label: addTarea

		}
		setLista([...lista, nuevaTarea])
		setaddTarea("")
		agregar([...lista, nuevaTarea])
		
	}
	 async function agregar(lista) {
		try {
			 await fetch('https://playground.4geeks.com/apis/fake/todos/user/agustin2',{
				method:'PUT',
				headers: { "Content-Type":"application/json"},
				  body: JSON.stringify(lista), 
			})
		
	}catch(error) {}
}



	async function crearUsuario() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/agustin2',{
				method:'POST',
				headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify([]), 
			})
			let data = await response.json()
			console.log(data);
			

		} catch (error) {
			console.log(error);
			
		}
	}
	
	async function eliminar1() {
		try {
		const response= await fetch('https://playground.4geeks.com/apis/fake/todos/user/agustin2',{
			method:'DELETE',
			headers: {
				"Content-Type": "application/json"
			  },

		})
		let data = await response.json()
		console.log(data);
		// setLista([])
		crearUsuario()

	} catch (error) {
		console.log(error);
		
		
	}


		
	}

	async function obtenerTareas() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/agustin2')//especificamos la url donde vamos a buscar info
			let data = await response.json()
			setLista(data);
			console.log(data);
	
		} catch (error) {
			console.log(error);
	
		}

	}


	// useEffect(funcion anonima,array vacio)
	 useEffect(function () {// onload => ejecutar codigo ni bien cargue el componente
	//bloque de codigo que queremos ejecutar

		crearUsuario()
		obtenerTareas()
	 },[])
	 function borrarTodo() {
		setLista([])
		
	 }


	return (
		<div className="lista">
			<h1 className="h1 text-center">todos</h1>
		<div className="text-center w-50 mx-auto border border-light-subtle mt-4">
			
			<form onSubmit={handleAgregar}>
				<div className="mb-3">

					<input type="text" value={addTarea} onChange={handleLista} className="form-control"  aria-describedby="emailHelp" />

				</div>

				<div className="mb-3">
					<ul className="list-group shadow p-1 mb-2 ">

						{
							lista.map((addTarea, index) => {
								return <li onMouseEnter={function () {

									setBoton(true)
								}} onMouseLeave={function () {
									setBoton(false)

								}} 
								className="list-group-item d-flex flex-row justify-content-between shadow p-2 mb-1">
									<p className="m-0 p-0">{addTarea.label}</p>
									{boton === true && <p className="text-danger opacity-50 m-o p-0" onClick={function () {
										eliminar(index)

									}}>X</p>}
								</li>
							})
						}


					</ul>
					<div className="items ms-4">
					
					{lista.length === 0 ? "No hay tareas pendientes, agregar tarea" : lista.length + "items restantes"}
					</div>
					<button onClick={eliminar1}>click here</button>
										

				</div>

			</form>
		</div>
		</div>
	);
};

export default Home;
