import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackitems] = useState();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const router = useRouter();

  function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // emailInputRef.current.value = "";
    // feedbackInputRef.current.value = "";
  }
  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbackitems(data.feedback);
      });
  }
  // function FeedbackPage() {
  //   router.push("/feedback");
  // }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email: </label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback: </label>
          <br />
          <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit...</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems &&
          feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
      {/* <div>
        <button onClick={FeedbackPage}>Feedback Page</button>
        <Link href="/feedback">FeedbackPage</Link>
      </div> */}
    </div>
  );
}

export default HomePage;
