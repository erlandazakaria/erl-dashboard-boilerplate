import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import { useToast } from "../../../Contexts/Toast";
import { USER, EDIT_USER } from "../../../Queries/User";
import Dialog from "../../../Components/Dialog";
import { DEFAULT_KEY, ROLE_IN_ARRAY, ROLE_IN_WORD } from "./enum";

const Edit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { openToast } = useToast();
  const { id } = useParams();
  const [ displayData, setDisplayData ] = useState(DEFAULT_KEY);
  const [ dialog, setDialog ] = useState(null);
  const { data } = useQuery(USER, {variables: {id}});
  const [ editUser ] = useMutation(EDIT_USER, {
    refetchQueries: ["getUserList"],
    onCompleted: (val) => {
      openToast(val.editUser.message);
      history.push("/cms/users")
    }
  });

  useEffect(() => {
    if(data && data.getUser) {
      setDisplayData(data.getUser);
    }
  }, [data]);

  const changeHandler = (type, val) => {
    setDisplayData({...displayData, [type]: val});
  };

  const handleEdit = () => {
    setDialog({
      name: displayData.name,
      email: displayData.email,
      role: ROLE_IN_WORD[displayData.role]
    })
  };
  
  return (
    <Grid container spacing={3} className="fluid-container" justify="center">
      <Dialog
        isOpen={!!dialog}
        type="edit"
        data={dialog ?? {}}
        handleClose={() => setDialog(null)}
        handleConfirm={() => editUser({variables: {
          id: displayData._id,
          name: displayData.name,
          email: displayData.email,
          password: displayData.password,
          role: displayData.role
        }})}
      />
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <TextField
            id={`${id}-name`}
            className={classes.input}
            label="Name"
            value={displayData && displayData.name}
            onChange={(e) => changeHandler("name", e.target.value)}
          />
          <TextField 
            id={`${id}-email`} 
            className={classes.input}
            label="Email" 
            value={displayData && displayData.email} 
            onChange={(e) => changeHandler("email", e.target.value)}
          />
          <TextField 
            id={`${id}-password`} 
            className={classes.input} 
            label="Password" 
            type="password"
            value={displayData && displayData.password} 
            onChange={(e) => changeHandler("password", e.target.value)}
          />
          <InputLabel id="edit-user-role">Role</InputLabel>
          <Select
            labelId="edit-user-role"
            id="edit-user-select-role"
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
            onClick={handleEdit}
          >Save</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Edit;

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
