import { createContext, useReducer, useMemo, useContext} from "react";
import { readLocalUser, writeLocalUser, deleteLocalUser } from "../Utils/localStorage";
import { gqlClient } from "../config";
import { LOGIN } from "../Queries/User";

const AuthContext = createContext();

const initialAuthState = false;

function AuthReducer(state, action) {
  switch (action.type) {
      case "SET_AUTH": {
          return action.payload;
      }
      case "UNSET_AUTH": {
          return {};
      }
      default: {
          throw new Error(`Unhandled type: ${action.type}`);
      }
  }
}

export function AuthProvider(props) {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
    const value = useMemo(() => [state, dispatch], [state]);
    return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  const [state, dispatch] = context;
  
  const checkAuth = () => {
    const local = readLocalUser();
    if(local && local.username) {
      dispatch({ type: "SET_AUTH", payload: local });
      return true;
    } else {
      return false;
    }
  };
  const login = async (payload) => {
    const { data } = await gqlClient.mutate({
      mutation: LOGIN,
      variables: payload
    });
    if(data.login.__typename === 'Message') {
      if(data.login.message.includes('Email')) {
        return("email");
      } else if(data.login.message.includes('Password')) {
        return("password");
      } else {
        return("both")
      }
    } else {
      if(state !== data.login) {
        writeLocalUser(data.login);
        dispatch({ type: "SET_AUTH", payload: data.login });
      }
    }
  };
  const logout = () => {
    deleteLocalUser();
    dispatch({ type: "UNSET_AUTH" })
  };

  return { authState: state, checkAuth, login, logout };
}
