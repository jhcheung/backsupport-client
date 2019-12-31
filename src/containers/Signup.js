import React, { useState } from "react";
import {
	Button,
	FormGroup,
	FormControl,
	FormLabel
} from "react-bootstrap";
import "./Signup.css";

export default function Signup(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function validateForm() {
    return (
      username.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let newUser = { user: { username: username, password: password, password_confirmation: confirmPassword }}
    if (props.agent && props.admin) {
      newUser.user.agent = true
      newUser.user.agent = true
    } else if (props.agent) {
      newUser.user.agent = true
    } else if (props.admin) {
      newUser.user.agent = true
    }
    props.signup(newUser)
  }



  function renderForm() {
    console.log(props)
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          disabled={!validateForm()}
        >
          Signup
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}