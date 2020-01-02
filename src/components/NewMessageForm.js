import React, { useState } from "react";
import {
	Button,
	FormGroup,
    FormControl
} from "react-bootstrap";
import "./NewMessageForm.css";


export default function NewMessageForm({ currentUser, createMessage, selectedTicketId }) {

  const [content, setContent] =  useState("");


  function validateForm() {
    return (
      content.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    createMessage({ message: { content: content, ticket_id: parseInt(selectedTicketId), user_id: parseInt(currentUser.id) }})
    setContent("")
  }



  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl 
            // as="textarea" rows="3" 
            type="text"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </FormGroup>


        <Button
          block
          type="submit"
          disabled={!validateForm()}
        >
          Send
        </Button>
      </form>
    );
  }

  return (
    <div className="new-message-form">
      { renderForm() }
    </div>
  );
}