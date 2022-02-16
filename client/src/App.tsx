import { configureApollo } from './config';
import { ApolloSubscribedUsers, SimpleSubscribedUsers } from './ApolloSubscribedUsers';
import { ApolloUsers } from './ApolloUsers';

const ApolloProvider = configureApollo();

const App = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', rowGap: 32, }}>
			<p>
				app page
			</p>

			<ApolloProvider>
				<ApolloUsers />

				<SimpleSubscribedUsers />
				<br/>
				<br/>
				<br/>
				<ApolloSubscribedUsers />
			</ApolloProvider>
		</div>
	);
};

export { App };
