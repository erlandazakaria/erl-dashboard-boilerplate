import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/Auth";

import Loading from "./loading";
import Login from "./login";
import Layout from "./layout";

const Check = () => {
  const { authState, checkAuth } = useAuth();
  const [ isLoaded, setLoad ] = useState(false);
  const [ isLoggedIn, setLogin ] = useState(false);

  useEffect(() => {
    const isAuthed = checkAuth();
    if(isAuthed) {
      setLogin(true);
    }
    setTimeout(() => {
      setLoad(true);
    }, 2000)
  }, []);

  useEffect(() => {
    if(authState && authState.email && !isLoggedIn) {
      setLogin(true);
    }
    if((!authState || !authState.email) && isLoggedIn) {
      setLogin(false);
    }
  }, [authState]);

  if(!isLoaded) {
    return <Loading />
  } else {
    return isLoggedIn ? <Layout /> : <Login />
  }
}

export default Check;
