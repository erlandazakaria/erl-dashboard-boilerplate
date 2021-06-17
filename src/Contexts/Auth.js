import { createContext, useReducer, useMemo, useContext} from "react";
import { readLocalUser, writeLocalUser, deleteLocalUser } from "../Utils/localStorage";

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
  const login = (payload) => {
    if(state !== payload) {
      writeLocalUser(payload);
      dispatch({ type: "SET_AUTH", payload });
    }
  };
  const logout = () => {
    deleteLocalUser();
    dispatch({ type: "UNSET_AUTH" })
  };

  return { authState: state, checkAuth, login, logout };
}
