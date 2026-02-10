import { useLocation, Link } from 'react-router-dom';
import Styles from './navbar.module.scss';

export const Navbar = () => {
	const location = useLocation();

	const links = [
		{ path: '/', label: 'Welcome' },
		{ path: '/about', label: 'About' },
		{ type: 'pdf', url: '/cafe-speak-menu.pdf', label: 'Menu' },
		{ path: '/contact', label: 'Contact' }
	];

	return (
		<nav className={Styles.navbar}>
			<div className={Styles.navLinks}>
				{links.map((link) => {
					if (link.type === 'pdf') {
						return (
							<a
								key={link.label}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className={Styles.navButton}
							>
								{link.label}
							</a>
						);
					}

					return (
						<Link
							key={link.path}
							to={link.path}
							className={`
								${Styles.navButton} ${location.pathname === link.path ? Styles.selected : ''
						}`}
						>
							{link.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};
