import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		
		navigate('/');
	};


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication_JWT</span>
				</Link>
				<Link to="/signup">
					<button className="btn btn-success">Signup</button>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-danger" onClick={handleLogout}>
							Cerrar Sesión
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
