import { ApolloClient, InMemoryCache } from '@apollo/client';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1F1F43',
      contrastText: 'white'
    },
    secondary: {
      main: '#FFE920',
      contrastText: '#1F1F43'
    },
  },
  typography: {
    fontFamily: "Poppins"
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getUserList: {
          merge(existing, incoming) {
            // Equivalent to what happens if there is no custom merge function.
            return incoming;
          },
        }
      },
    },
  },
});

export const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  cache: cache
});
