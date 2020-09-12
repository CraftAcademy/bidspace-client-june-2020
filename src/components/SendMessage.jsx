import React, { useEffect, useState } from "react";
import { Form, TextArea, Button } from 'semantic-ui-react'

import axios from "axios";

const SendMessage = (props) => {
  const [responseMessage, setResponseMessage] = useState(undefined)

  const submitMessage = async (event) => {
    event.preventDefault()
    const inputField = event.target.children.message
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let message
    try {
      let response = await axios.post(`biddings/${props.bid.id}/messages`, {
        message: { body: event.target.children.message.value }
      }, {
        headers: headers
      });

      message = response.data.message
      if (props.userBids) {
        props.getBids()
      } else {
        props.getMySingleListing()
      }

      inputField.value = ''
    } catch (error) {
      message = error.response.data.message
    } finally {
      setResponseMessage(message)
    }
  }

  return (
    <Form onSubmit={submitMessage}>
      <TextArea
        size="mini"
        id="message"
        placeholder="Send a message to the bidder..." />
      {/* <button>Send</button> */}
      <Button
        data-cy={`submit`}
        basic
        fluid
        color="blue"
      >
        Send
      </Button>
    </Form>
  )
}

export default SendMessage
