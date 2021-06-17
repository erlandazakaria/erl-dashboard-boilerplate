import DialogMUI from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { titleCase } from "../../Utils/helper";

const renderDelete = (data) => {
  return Object.keys(data).map(key => {
    return (
      <DialogContentText key={`dialog-content-${key}`}>
        {titleCase(key)}: {data[key]}
      </DialogContentText>
    );
  })
};

const Dialog = ({isOpen=false, type="delete", handleConfirm=()=>{}, handleClose=()=>{}, data={}}) => {
  const title = titleCase(type);
  return (
    <DialogMUI open={isOpen} onClose={handleClose} aria-labelledby={`dialog-${type}`}>
      <DialogTitle id={`dialog-${type}`}>{title} Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to {type === "delete" ? "delete" : "change"} this data?
        </DialogContentText>
        {renderDelete(data)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text" color="primary">
          Batal
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          {title}
        </Button>
      </DialogActions>
    </DialogMUI>
  );
};

export default Dialog;
