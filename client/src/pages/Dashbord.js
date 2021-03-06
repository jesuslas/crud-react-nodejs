import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MainTabs from "../components/tabs/TabsAuth";

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
    <div className={classes.myBody}>
      <MainTabs {...{ userId: id, tick, setTick, isAdmin, ...props }}/>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const useStyles = makeStyles(() => ({
  myBody: {
    // marginTop: 50
  }
}));

export default connect(mapStateToProps)(Dashboard);
