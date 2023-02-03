import React, { useState } from "react";
import { send } from "emailjs-com";

function Contact() {
  const [waitMessage, setWaitMessage] = useState(false);
  const [toSend, setToSend] = useState({
    from_name: "",
    message: "",
    reply_to: "",
  });

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send("service_e4z12js", "template_hglneew", toSend, "Rtyk9g_-Sb-RBw80h")
      .then(() => {
        alert(`Thanks ${toSend.from_name}, you message have been sent!`);
        setWaitMessage(false);
        setToSend({
          from_name: "",
          message: "",
          reply_to: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="section contact">
      <h2>Contact</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          required
          type="text"
          name="from_name"
          value={toSend.from_name}
          placeholder="Name"
          onChange={(e) => handleChange(e)}
        />
        <input
          required
          type="email"
          name="reply_to"
          value={toSend.reply_to}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <textarea
          required
          name="message"
          value={toSend.message}
          placeholder="Your message"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" onClick={() => setWaitMessage(true)}>
          Send
        </button>
        {waitMessage ? (
          <small>
            Please wait for the confirmation Alert... It can take a few seconds.
          </small>
        ) : null}
      </form>
    </div>
  );
}

export default Contact;
