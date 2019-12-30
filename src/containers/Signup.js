import React, { useState } from "react";
import {
	Button,
	FormGroup,
	FormControl,
	FormLabel
} from "react-bootstrap";
import "./Signup.css";

export default function Signup(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
	event.preventDefault();
	props.signup({ user: { email: email, password: password, password_confirmation: confirmPassword }})
}



  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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