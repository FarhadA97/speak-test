import { Link } from 'react-router-dom';
import Styles from './footer.module.scss';

export const Footer = () => {
	return (
		<div className={Styles.footer}>
			<p>
				Designed and Built by {' '}
				<Link to="https://stellarminore.com" target="_blank" rel="noopener noreferrer">
					Stellar Minore
				</Link>
			</p>
		</div>
	);
};
