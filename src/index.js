import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
});

const Songs = () => (
  <Query
    query={gql`
      {
        songs {
          id
          title
          authors
          language
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let sd = data.songs.sort((a, b) => a.title.localeCompare(b.title));

      return (
        <ol>
          {sd.map(song => (
            <li key={song.title}>
              <h4>{song.title}</h4> -- {song.authors}
            </li>
          ))}
        </ol>
      );
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app </h2>
      <Songs />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
