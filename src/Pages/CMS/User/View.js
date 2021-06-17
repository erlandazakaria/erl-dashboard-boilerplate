import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { USER } from "../../../Queries/User";
import { DEFAULT_KEY, ROLE_IN_WORD } from "./enum";

const User = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data } = useQuery(USER, {variables: {id}});
  const [ displayData, setDisplayData ] = useState(DEFAULT_KEY);
  const classes = useStyles();

  useEffect(() => {
    if(data && data.getUser) {
      setDisplayData(data.getUser);
    }
  }, [data]);

  return (
    <Grid container spacing={3} className="fluid-container" justify="center">
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <TextField
            id={`${id}-name`}
            className={classes.input}
            disabled
            label="Name"
            value={displayData && displayData.name}
          />
          <TextField 
            id={`${id}-email`} 
            className={classes.input}
            disabled
            label="Email" 
            value={displayData && displayData.email} 
          />
          <TextField 
            id={`${id}-password`} 
            className={classes.input}
            type="password"
            disabled 
            label="Password" 
            value={displayData && displayData.password} 
          />
          <TextField 
            id={`${id}-role`} 
            className={classes.input}
            disabled 
            label="Role" 
            value={displayData && ROLE_IN_WORD[displayData.role]} 
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => history.push(`/cms/edit-user/${id}`)}
          >Edit</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default User;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5, 5),
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  btn: {
    alignSelf: "flex-end",
    height: "30px", 
    width: "75px", 
    marginTop: "10px"
  }
}));
