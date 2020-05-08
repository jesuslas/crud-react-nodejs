import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signIn, addUser } from "../../service/api.service";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions/user";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©  "}
      <Link color="inherit" href="https://github.com/jesuslas">
        Jalpino v1
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = props => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [formSignUp, setSignUp] = useState(false);
  const classes = useStyles();

  const login = async () => {
    setError(undefined);
    try {
      if (!user && !password) return null;
      const resp = await signIn(user, password);
      console.log("resp", resp);
      props.userSignIn(resp.data);
      props.history.push(`/dashboad`);
    } catch (error) {
      setError("Usuario no encontrado");
    }
  };
  const register = async () => {
    setError(undefined);
    try {
      if (!user && !password && !email) return null;
      const resp = await addUser({ name: user, password, email, roleId: 2 });
      const userdata = {
        ...resp.data,
        user_types: { name: "user" }
      };
      props.userSignIn(userdata);
      props.history.push(`/dashboad`);
    } catch (error) {
      setError("Usuario no encontrado");
    }
  };

  const textField = ({ name, label, type, action, subAction }) => (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type || "text"}
      autoComplete={name}
      onChange={({ target: { value } }) => action(value)}
      onKeyDown={subAction}
    />
  );
  const formLogin = () => (
    <>
      {textField({ name: "user", label: "User", action: setUser })}
      {textField({
        name: "password",
        label: "Password",
        type: "password",
        action: setPassword,
        subAction: e => {
          if (e.key === "Enter") {
            login();
          }
        }
      })}
    </>
  );
  const signUpForms = () => (
    <>
      {textField({ name: "user", label: "User", action: setUser })}
      {textField({
        name: "password",
        label: "Password",
        type: "password",
        action: setPassword
      })}
      {textField({ name: "email", label: "Email", action: setEmail })}
    </>
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {!formSignUp ? <LockOutlinedIcon /> : <AssignmentInd />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {!formSignUp ? "Sign In" : "Sign Up"}
        </Typography>
        {!formSignUp ? formLogin() : signUpForms()}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => (!formSignUp ? login() : register())}
        >
          {!formSignUp ? "Sign In" : "Sign Up"}
        </Button>
        {error && (
          <Typography component="p" color={"error"}>
            {error}
          </Typography>
        )}
        <Grid container>
          {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            {!formSignUp ? (
              <div>
                {"Don't have an account? "}{" "}
                <a
                  className={classes.signUp}
                  onClick={() => setSignUp(!formSignUp)}
                >
                  Sign Up
                </a>
              </div>
            ) : (
              <a
                className={classes.signUp}
                onClick={() => setSignUp(!formSignUp)}
              >
                Cancel
              </a>
            )}
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userSignIn
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signUp: {
    color: "blue",
    cursor: "pointer"
  }
}));
