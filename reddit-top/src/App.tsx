import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery } from "./__generated__/AppQuery.graphql";

const appQuery = graphql`
  query AppQuery {
    viewer
  }
`;

function App() {
  const { viewer } = useLazyLoadQuery<AppQuery>(appQuery, {});
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          sssadasd ad Edit <code>src/App.tsx</code> and save toad asd reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn {viewer}
        </a>
      </header>
    </div>
  );
}

export default App;
