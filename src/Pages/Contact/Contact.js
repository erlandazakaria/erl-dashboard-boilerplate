import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Button from "@material-ui/core/Button";
import Logo from "../../Assets/logo-dark.png";

const Contact = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className="container flex-column">
      <img alt="logo" src={Logo} className={classes.logo} />
      <div className={classes.tagline}>
        <div className="text-center">Contact us at</div>
        <a href="mailto: erlandazakaria@gmail.com">erlandazakaria@gmail.com</a>
      </div>
      <div className={clsx("flex-row", classes.btnContainer)}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => history.push("/")}
        >Home</Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.btn, classes.btnRight)}
          onClick={() => history.push("/about")}
        >About Us</Button>
      </div>
    </div>
  );
}

export default Contact;

const useStyles = makeStyles(() => ({
  logo: {
    height: "100px", 
    alignSelf: "center"
  },
  tagline: {
    marginTop: "50px", 
    alignSelf: "center", 
    fontSize: "24px"
  },
  btnContainer: {
    alignSelf: "center",
    marginTop: "50px"
  },
  btn: {
    height: "30px", 
    width: "150px"
  },
  btnRight: {
    marginLeft: "10px"
  }
}));
