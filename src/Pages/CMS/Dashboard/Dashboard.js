import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Dashboard = () => {
  const classes = useStyles();
  return(
    <Grid container spacing={3} className="fluid-container">
      <Grid item xs={3}>
        <Card className={classes.root} style={{backgroundColor: "darkslateblue"}}>
          <CardContent>
            <Typography variant="h5">
              Today Queque
            </Typography>
            <br />
            <Typography variant="h5">
              100
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root} style={{backgroundColor: "darkgreen"}}>
          <CardContent>
            <Typography variant="h5">
              Today Hit
            </Typography>
            <br />
            <Typography variant="h5">
              200
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root} style={{backgroundColor: "darkmagenta"}}>
          <CardContent>
            <Typography variant="h5">
              Total Queque
            </Typography>
            <br />
            <Typography variant="h5">
              100.000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root} style={{backgroundColor: "darkorange"}}>
          <CardContent>
            <Typography variant="h5">
              Total Hit
            </Typography>
            <br />
            <Typography variant="h5">
              200.000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard; 

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    color: "white"
  }
});
