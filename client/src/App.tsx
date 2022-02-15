import { configureApollo } from './config';
import { ApolloSubscribedUsers, ApolloUsers, RestUsers } from './users';

const ApolloProvider = configureApollo();

const App = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', rowGap: 32, }}>
			<p>
				app page
			</p>

			<RestUsers />

			<ApolloProvider>
				<ApolloUsers />

				<ApolloSubscribedUsers />
			</ApolloProvider>
		</div>
	);
};

export { App };
