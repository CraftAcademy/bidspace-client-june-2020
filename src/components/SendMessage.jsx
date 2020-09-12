import React, { useEffect, useState } from "react";
import axios from "axios";

const SendMessage = (props) => {
  const [responseMessage, setResponseMessage] = useState(undefined)

  const submitMessage = async (event) => {
    event.preventDefault()
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let message
    try {
      let response = await axios.post(`biddings/${props.bid.id}/messages`, {
        message: { body: event.target.children.message.value }
      }, {
        headers: headers
      });

      message = response.data.message
    } catch (error) {
      message = error.response.data.message
    } finally {
      setResponseMessage(message)
    }
  }

  return (
    <form onSubmit={submitMessage}>
      <input id="message" placeholder="Send bidder a message"/>
      <button>Send</button>
    </form>
  )
}

export default SendMessage
