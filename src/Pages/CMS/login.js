import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../Contexts/Auth";
import { useToast } from "../../Contexts/Toast";

import Logo from "../../Assets/logo-dark.png";
import { LOGIN } from "../../Queries/User";

const Login = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const { openToast } = useToast();
  const [ username, setUsername ] = useState("");
  const [ isUsernameErr, setUsernameErr ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ isPasswordErr, setPasswordErr ] = useState(false);
  const [ reqLogin ] = useLazyQuery(LOGIN, {
    onCompleted: (val) => {
      if(val.login.__typename === 'Message') {
        if(val.login.message.includes('Email')) {
          setUsernameErr(true);
        } else if(val.login.message.includes('Password')) {
          setPasswordErr(true);
        } else {
          setUsernameErr(true); setPasswordErr(true);
        }
      } else {
        openToast("Successfully Login");
        login(val.login)
      }
    }
  });

  const onChange = (val, key) => {
    setUsernameErr(false);
    setPasswordErr(false);
    if(key === "u") {
      setUsername(val);
    } else if(key === "p") {
      setPassword(val);
    }
  };

  const onLogin = () => {
    reqLogin({variables: {email: username, password}});
  };

  return (
    <Container maxWidth={false} className="container">
      <Grid container direction="column" justify="center" alignItems="center" className="full-height">
        <img alt="logo" src={Logo} className={classes.logo} />
        <TextField 
          label="Username" 
          variant="outlined" 
          placeholder="Username" 
          color="primary" 
          margin="dense"
          value={username}
          error={isUsernameErr}
          onChange={(e) => onChange(e.target.value, "u")}
        />
        <TextField 
          label="Password" 
          variant="outlined" 
          placeholder="Password" 
          color="primary" 
          margin="dense"
          type="password"
          value={password}
          error={isPasswordErr}
          onKeyPress={(e) => { 
            if(e.key === "Enter") {
              e.preventDefault(); 
              onLogin();
            }
          }}
          onChange={(e) => onChange(e.target.value, "p")}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onLogin}
        >Login</Button>
      </Grid>
    </Container>
  );
}

export default Login;

const useStyles = makeStyles(() => ({
  logo: {
    height: "75px",
    marginBottom: "50px"
  },
  btn: {
    height: "30px", 
    width: "150px", 
    marginTop: "20px"
  }
}));
