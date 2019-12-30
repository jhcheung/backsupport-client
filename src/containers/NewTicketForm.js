import React, { useState } from "react";
import {
	Button,
	FormGroup,
	FormControl,
	FormLabel
} from "react-bootstrap";
import "./NewTicketForm.css";


export default function NewTicketForm(props) {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] =  useState("");


  function validateForm() {
    return (
      // email.length > 0 &&
      // password.length > 0 &&
      // password === confirmPassword
      title.length > 0 &&
      content.length > 0
    );
  }

  async function handleSubmit(event) {
	  event.preventDefault();
  }



  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        {/* <FormGroup controlId="email">
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
        </FormGroup> */}
        <FormGroup controlId="title">
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </FormGroup>
        <FormGroup controlId="content">
          <FormLabel>Content</FormLabel>
          <FormControl 
            as="textarea" rows="3" 
            type="textarea"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </FormGroup>


        <Button
          block
          type="submit"
          disabled={!validateForm()}
        >
          Create New Ticket
        </Button>
      </form>
    );
  }

  return (
    <div className="new-ticket-form">
      {renderForm()}
    </div>
  );
}