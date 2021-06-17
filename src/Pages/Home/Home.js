import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Button from "@material-ui/core/Button";
import Logo from "../../Assets/logo-dark.png";
import GooglePlay from "../../Assets/google-play.png";

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className="container flex-column">
      <img alt="logo" src={Logo} className={classes.logo} />
      <div className={classes.tagline}>
        Antri dari mana aja
      </div>
      <img
        alt="google play"
        onClick={() => window.location ="https://play.google.com/store/apps/details?id=com.antrio"}
        src={GooglePlay} 
        className={classes.googlePlay}
      />
      <div className={clsx("flex-row", classes.btnContainer)}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => history.push("/about")}
        >About Us</Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.btn, classes.btnRight)}
          onClick={() => history.push("/contact")}
        >Contact</Button>
      </div>
    </div>
  );
}

export default Home;

const useStyles = makeStyles(() => ({
  logo: {
    height: "100px", 
    alignSelf: "center"
  },
  tagline: {
    marginTop: "10px", 
    alignSelf: "center", 
    fontSize: "24px", 
    fontStyle: "italic",
  },
  googlePlay: {
    marginTop: "20px", 
    height: "75px", 
    alignSelf: "center"
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
