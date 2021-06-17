import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from './routes';
import Header from "../../Components/Header";
import Toast from "../../Components/Toast";

import { useToast } from "../../Contexts/Toast";

const Layout = () => {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  const { toast, closeToast } = useToast();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth={false} className="container-creator full-height">
      <Toast isOpen={toast.isOpen} onClose={closeToast} message={toast.message} />
      <div className={classes.root}>
        <CssBaseline />
        <Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes />
        </main>
      </div>
    </Container>
  );
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
