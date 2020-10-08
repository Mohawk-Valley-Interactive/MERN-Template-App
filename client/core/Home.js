import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import splashImg from "./../assets/aw-yiss.jpg";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme
      .spacing(2.0)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 550
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            MERN Template App
          </Typography>
          <CardMedia
            className={classes.media}
            image={splashImg}
            title="Happy Goo$e"
          />
          <CardContent>
            <Typography type="body1" component="p">
              You might want to change this... ;-)
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
