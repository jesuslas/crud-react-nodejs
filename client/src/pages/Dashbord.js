import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "../components/tabs/Tabs";

const Dashboard = props => {
  const {
    user: {
      user_types: { name: role },
      id,
      name
    }
  } = props || {};
  const isAdmin = role === "admin";
  const classes = useStyles();
  const [tick, setTick] = useState(0);

  return (
    <Container maxWidth="md" className={classes.myBody}>
      <Tabs
        {...{  userId: id, tick, setTick, isAdmin,...props }}
      />
      User Connected: {name}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const useStyles = makeStyles(() => ({
  myBody: {
    marginTop: 50
  }
}));

export default connect(mapStateToProps)(Dashboard);
