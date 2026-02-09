import { AppRouter } from 'components/appRouter';
import { HeroSection } from 'components/heroSection';
import { routes } from 'components/appRouter/routes';
import { Footer } from 'components/footer';
import Styles from './app.module.scss';

function App() {
	return (
		<Layout>
			<HeroSection />
			<AppRouter routes={routes} />
			<Footer />
		</Layout>
	);
}

const Layout = ({ children }) => (
	<div className={Styles.mainContainer}>
		<div className={Styles.contentContainer}>
			{children}
		</div>
	</div>
);

export { App };
