import React, { useState } from "react";

function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div id="contact" className="section contact">
      <h2>Contact</h2>
      <form>
        <input
          type="text"
          name="firstname"
          value={firstname}
          placeHolder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          value={lastname}
          placeHolder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeHolder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          value={message}
          placeHolder="Your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
