import { useState } from 'react';
import { configureApollo } from './configureApollo';
import { ManualSubscribedUsers, HookSubscribedUsers } from './ManualSubscribedUsers';
import { ApolloUsers } from './ApolloUsers';

const [ApolloProvider] = configureApollo();

const App = () => {
  const [showQueryUsers, setShowQueryUsers] = useState(true);
  const [showHookSubscription, setShowHookSubscription] = useState(true);
  const [showManualSubscription, setShowManualSubscription] = useState(true);
  const [showDirectSubscription, setShowDirectSubscription] = useState(true);

  const [directedProviders, setDirectedProviders] = useState<ReturnType<typeof configureApollo>[]>([]);
  const [baseUrl, setBaseUrl] = useState('localhost:5000');

  return (
    <div style={{ display: 'grid', columnGap: 32, gridTemplateColumns: '1fr 300px', padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 32, }}>
        <h3>Work Area</h3>

        <ApolloProvider>
          {showQueryUsers ? <ApolloUsers/> : null}
          <br/>
          {showHookSubscription ? <HookSubscribedUsers/> : null}
          <br/>
          {showManualSubscription ? <ManualSubscribedUsers/> : null}
        </ApolloProvider>

        <br/>

        {showDirectSubscription ? (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, border: '1px solid black' }}>
            <h3>Direct subscriptions</h3>

            {directedProviders.map(([Provider, key]) => (
              <Provider key={key}>
                <HookSubscribedUsers/>
              </Provider>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
        <h3>Config</h3>

        <div>
          <input type="checkbox" id="query" checked={showQueryUsers}
                 onChange={event => setShowQueryUsers(event.target.checked)}/>
          <label htmlFor="query">Show query</label>
        </div>

        <div>
          <input type="checkbox" id="hook-subscription" checked={showHookSubscription}
                 onChange={event => setShowHookSubscription(event.target.checked)}/>
          <label htmlFor="hook-subscription">Show subscription with hooks</label>
        </div>

        <div>
          <input type="checkbox" id="manual-subscription" checked={showManualSubscription}
                 onChange={event => setShowManualSubscription(event.target.checked)}/>
          <label htmlFor="manual-subscription">Show manual subscription</label>
        </div>

        <div>
          <input type="checkbox" id="direct-subscription" checked={showDirectSubscription}
                 onChange={event => setShowDirectSubscription(event.target.checked)}/>
          <label htmlFor="direct-subscription">Show subscription to specified servers</label>

          <div>
            {directedProviders.map(([Provider, key], index) => (
              <div key={key}>
                <label>#{index}</label>
                <button
                  onClick={() => setDirectedProviders(state => {
                    state.splice(index, 1);
                    return [...state];
                  })}
                >
                  remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <button onClick={() => setDirectedProviders(state => [...state, configureApollo(baseUrl)])}>
              Add provider
            </button>
            <input value={baseUrl} onChange={event => setBaseUrl(event.target.value)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export { App };
