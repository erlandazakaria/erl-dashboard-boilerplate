import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../Contexts/Auth";
import { useToast } from "../../Contexts/Toast";

import Logo from "../../Assets/logo-dark.png";

const Login = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const { openToast } = useToast();
  const [ username, setUsername ] = useState("");
  const [ isUsernameErr, setUsernameErr ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ isPasswordErr, setPasswordErr ] = useState(false);

  const onChange = (val, key) => {
    setUsernameErr(false);
    setPasswordErr(false);
    if(key === "u") {
      setUsername(val);
    } else if(key === "p") {
      setPassword(val);
    }
  };

  const onLogin = async () => {
    const res = await login({email: username, password});
    switch(res) {
      case "email":
        setUsernameErr(true);
        break;
      case "password":
        setPasswordErr(true);
        break;
      case "both":
        setUsernameErr(true); setPasswordErr(true);
        break;
      default:
        openToast("Successfully Login");
        break;
    }
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
