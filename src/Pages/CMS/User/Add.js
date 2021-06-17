import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import { useToast } from "../../../Contexts/Toast";
import { ADD_USER } from "../../../Queries/User";
import { DEFAULT_KEY, ROLE_IN_ARRAY } from "./enum";

const Add = () => {
  const classes = useStyles();
  const history = useHistory();
  const { openToast } = useToast();
  const [ displayData, setDisplayData ] = useState(DEFAULT_KEY);
  const [ addUser ] = useMutation(ADD_USER, {
    refetchQueries: ["getUserList"],
    onCompleted: (val) => {
      openToast(val.addUser.message);
      history.push("/cms/users")
    }
  });

  const changeHandler = (type, val) => {
    setDisplayData({...displayData, [type]: val});
  };

  return (
    <Grid container spacing={3} className="fluid-container" justify="center">
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            New User
          </Typography>
          <TextField
            id="new-user-name"
            className={classes.input}
            label="Name"
            value={displayData && displayData.name}
            onChange={(e) => changeHandler("name", e.target.value)}
          />
          <TextField 
            id="new-user-email"
            className={classes.input}
            label="Email" 
            value={displayData && displayData.email} 
            onChange={(e) => changeHandler("email", e.target.value)}
          />
          <TextField 
            id="new-user-password"
            className={classes.input} 
            label="Password" 
            type="password"
            value={displayData && displayData.password} 
            onChange={(e) => changeHandler("password", e.target.value)}
          />
          <InputLabel id="add-user-role">Role</InputLabel>
          <Select
            labelId="add-user-role"
            id="add-user-select-role"
            value={displayData && displayData.role} 
            onChange={(e) => changeHandler("role", e.target.value)}
          >
            {ROLE_IN_ARRAY.map(x => (
              <MenuItem key={`option-${x.val}`} value={x.val}>{x.word}</MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => addUser({variables: displayData})}
          >Save</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Add;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5, 5),
    display: "flex",
    flexDirection: "column"
  },
  title: {
    marginBottom: theme.spacing(4)
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
