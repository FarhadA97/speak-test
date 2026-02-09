import { Routes, Route } from 'react-router-dom';

export const AppRouter = ({ routes }) => {
	return (
		<Routes>
			{routes.map(({
				path, title, component
			}) => (
				<Route
					key={path}
					path={path}
					element={
						<RouteComponent
							title={title}
							component={component} />
					} />
			))}
		</Routes>
	);
};

const RouteComponent = ({ component: Component, ...props }) => {
	document.title = props.title;

	return <Component />;
};
