import React, { memo } from "react";
import { Redirect, Switch, Router, Link, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { createBrowserHistory } from "history";
import { Dashboard, Logout, Facturation } from "../../pages/index";
import { Tabs, Tab, Grid, AppBar, Typography } from "@material-ui/core";
import { toLowerCaseAndRemoveSpaces } from "../utils";
import { makeStyles } from "@material-ui/core/styles";

const hist = createBrowserHistory();
function RouterApp() {
  const routes = [
    {
      path: "/auth",
      component: Dashboard,
      name: "auth",
      routes: [
        {
          name: "Tickets",
          path: "/auth/tickets"
        },
        {
          name: "Users",
          path: "/auth/users"
        },
        {
          name: "roles",
          path: "/auth/users"
        }
      ]
    },
    {
      path: "/invoice",
      component: Facturation,
      name: "Invoice",
      routes: [
        {
          name: "Invoices",
          path: "/invoice/invoices"
        },
        {
          name: "Invoice Item",
          path: "/invoice/itemType"
        },
        {
          name: "Invoice Item Types",
          path: "/invoice/invoiceItemTypes"
        }
      ]
    },
    // { path: "/logout", name: "Logout", component: Logout }
  ];
  const classes = useStyles();
  return (
    <Router history={hist}>
          <Route>
            {({ location, match }) => {
              const currentLocation = location.pathname;
              return (
                <div className={classes.root}>
                  <Grid container >
                    <Grid xs={1}/>
                    <Grid xs={1} >
                        <AppBar
                        position="static"
                        color="transparent"
                        className={classes.shadowTabs}
                      >
                        <Tabs
                          value={currentLocation}
                          indicatorColor="primary"
                          textColor="primary"
                          centered={true}
                          // onChange={onChange}
                          variant={"filled"}
                          scrollButtons="on"
                          orientation={"vertical"}
                        >
                          {routes.map(({ name, path }, index) => {
                            return(
                            <Tab
                              to={path}
                              value={path}
                              key={name}
                              label={name}
                              component={Link}
                              className={`${classes.tabButton} tabButton`}
                              tabIndex={index}
                            />
                          )})}
                        </Tabs>
                      </AppBar>
                    </Grid>
                    <Grid xs={9} >
                      <Switch>
                        {routes.map(route => (
                          <RouteWithSubRoutes key={route.path} {...route} />
                        ))}
                        <Redirect to="/auth" />
                      </Switch>
                    </Grid>
                    <Grid xs={1}/>
                  </Grid>
                </div>
              );
            }}
          </Route>
        )
    </Router>
  );
}
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    flexGrow: 1,
    marginTop: 50
  },
  shadowTabs: {
    boxShadow: "none"
  },
  tabButton: {
    "&:focus": {
      outline: "none"
    },
    width: 80
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "20px"
  }
}));
export default memo(RouterApp, (prev, next) => prev.user.id === next.user.id);
