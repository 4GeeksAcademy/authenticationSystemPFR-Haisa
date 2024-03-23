const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			actions: {
				signup: async (email, password, navigate) => {
				  try {
					const response = await fetch('https://bug-free-trout-rjpp5pwg9xjcp6xq-3000.app.github.dev/signup', {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
						'Origin': 'https://bug-free-trout-rjpp5pwg9xjcp6xq-3000.app.github.dev/',
					  },
					  mode: 'cors',
					  body: JSON.stringify({ email, password }),
					});
		  
					if (response.status === 200) {
					  // Registro exitoso, redirige a la vista de inicio de sesión
					  navigate('/login');
					} else {
					  const data = await response.json();
					  alert(data.error || 'Error en el servidor');
					}
				  } catch (error) {
					console.error('Error de red:', error);
					alert('Error de red');
				  }
				},
		  
				login: async (email, password) => {
				  try {
					const response = await fetch('https://bug-free-trout-rjpp5pwg9xjcp6xq-3000.app.github.dev/login', {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
					  },
					  body: JSON.stringify({ email, password }),
					});
		  
					if (response.ok) {
					  const data = await response.json();
					  sessionStorage.setItem('token', data.token);
					  navigate('/private');
					} else {
					  const data = await response.json();
					  alert(data.error || 'Error en el servidor');
					}
				  } catch (error) {
					console.error('Error de red:', error);
					alert('Error de red');
				  }
				},
		  
				logout: () => {
				  sessionStorage.removeItem('token');
				  navigate('/');
				},
		  
				getMessage: async () => {
				  try {
					const resp = await fetch('https://bug-free-trout-rjpp5pwg9xjcp6xq-3000.app.github.dev/api/hello');
					if (!resp.ok) {
					  throw new Error("Error al obtener el mensaje");
					}
		  
					const data = await resp.json();
					setStore({ message: data.message });
		  
					return data;
				  } catch (error) {
					console.log("Error al cargar el mensaje desde el backend", error);
					throw error;
				  }
				},
			},
		}
	};
};

export default getState;
