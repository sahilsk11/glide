import React, { useState } from "react";
import "./email-signup.css";

export default function EmailSignup() {
  const [email, updateEmail] = useState("");
  const myChangeHandler = (event) => {
    updateEmail(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const host = "http://localhost:5000";
    fetch(host + "/emailSignup?email=" + email)
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          alert("We couldn't add your email right now. Try again later!");
        } else {
          alert("Email added!");
        }
      })
      .catch(err => {
        alert("We couldn't add your email right now. Try again later!");
      })
  }
  return (
    <div className="email-container">
      <h2 className="email-title">Resume Hacks. SWE Jobs. Plain and Simple.</h2>
      <p className="email-subtitle">We’ll send you the occasional resume tip No B.S. Upsubscribe anytime.</p>
      <form className="email-form-container">
        <input
          className="email-input"
          placeholder="Get one resume tip every week" value={email} onChange={myChangeHandler}
        />
        <Submit handleSubmit={handleSubmit} />
      </form>
      <p className="email-subtext" >Join the hundreds of student developers getting smarter with Glide.</p>
    </div>
  )
}

function Submit({ handleSubmit }) {
  return (
    <>
      <button className="glide-btn email-submit-btn" onClick={handleSubmit} type="submit">Get Resume Tips 🔑</button>
      <button className="glide-btn email-submit-btn-mobile" onClick={handleSubmit} type="submit">Get Tips</button>
    </>
  )
}
// }
// <div>
//           <input
//             className="email-input"
//             placeholder="Get one resume tip every week" value={email} onChange={myChangeHandler}
//           />
//         </div>
//         <button className="glide-btn email-form-btn" onClick={handleSubmit} type="submit">Get Resume Tips 🔑</button>
