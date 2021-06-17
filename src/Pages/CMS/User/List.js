import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { useToast } from "../../../Contexts/Toast";
import { USER_LIST, DELETE_USER } from "../../../Queries/User";
import Table from "../../../Components/Table";
import Dialog from "../../../Components/Dialog";
import { USER_TABLE_COLUMN, USER_TABLE_SEARCH_KEY, ROLE_IN_WORD } from "./enum";

const Users = () => {
  const classes = useStyles();
  const history = useHistory();
  const { openToast } = useToast();
  const [ dialog, setDialog ] = useState(null);
  const { data } = useQuery(USER_LIST , {fetchPolicy: "cache-and-network",});
  const [ deleteUser ] = useMutation(DELETE_USER, {
    refetchQueries: ["getUserList"],
    onCompleted: (val) => {
      openToast(val.deleteUser.message);
      setDialog(null)
    }
  });

  const handleDelete = (user) => {
    setDialog({
      id: user._id,
      name: user.name,
      email: user.email,
      role: ROLE_IN_WORD[user.role]
    })
  };

  return (
    <Grid container spacing={3} className="fluid-container" justify="center">
      <Dialog
        isOpen={!!dialog}
        data={dialog ?? {}}
        handleClose={() => setDialog(null)}
        handleConfirm={() => deleteUser({variables: {id: dialog.id}})}
      />
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Table
            title="User List"
            allData={data && data.getUserList}
            column={USER_TABLE_COLUMN}
            searchKeys={USER_TABLE_SEARCH_KEY}
            onAdd={() => history.push(`/cms/add-user`)}
            onView={user => history.push(`/cms/user/${user._id}`)}
            onEdit={user => history.push(`/cms/edit-user/${user._id}`)}
            onDelete={handleDelete}
            whiteList={["role"]}
            whiteListExec={{role: (role) => ROLE_IN_WORD[role]}}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Users;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
}));
