import React, {useEffect} from 'react';
import useAuth from '../hooks/useAuth';
function Navbar() {

	// const { auth, setAuth } = useAuth();
	// const token = Cookies.get('token');

	// useEffect(() => {
	// 	setAuth({
	// 		token
	// 	});
	// }, []);

	const handleLogout = () => {
		Cookies.remove('token');
	};

 	// if (token) {
	// 	<header>
	// 		<h3>LOGO</h3>
	// 		<nav>
	// 			<a href="/#">Accueil</a>
	// 			<a href="/" onClick={handleLogout}>Se déconnecter</a>
	// 			<a href="/#">Profile</a>
	// 			<a href="/#">Administration</a>
	// 		</nav>
	// 	</header>;
	// }
	return (
		<header>
			<h3>LOGO</h3>
			<nav>
				<a href="/#">Accueil</a>
				<a href="/#">Profile</a>
				<a href="/login">Se connecter</a>
				<a href="/" onClick={handleLogout}>Se déconnecter</a>
				<a href="/#">Administration</a>
			</nav>
		</header>
	);
}

export default Navbar;