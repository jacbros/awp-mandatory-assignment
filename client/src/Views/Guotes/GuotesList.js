import { useEffect, useState } from "react";
import { Router } from "@reach/router";

import Guotes from "./Guotes";
import AddGuotes from "./AddGuote";
const API_URL = process.env.REACT_APP_API;

function GuotesMain() {
  const [guotes, setGuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/guotes/`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setGuotes(data);
    };
    fetchData();
  }, []);

  function addGuote(newGuote, newAuthor) {
    try {
      const data = {
        guote: newGuote,
        author: newAuthor,
      };
      const postData = async () => {
        const url = `${API_URL}/guotes/`;
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const reply = await response.json();
        if (!response.ok) {
          throw reply;
        }
        setGuotes([...guotes, reply]);
      };
      postData();
    } catch {}
  }

  function addLike(id) {
    try {
      const data = {
        id: id,
        number: 1,
      };
      const like = async () => {
        const url = `${API_URL}/guotes/`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const re = await response.json();
        if (!response.ok) {
          throw "error";
        }
        changeLike(guotes, id, 1);
      };
      like();
    } catch {
      console.log("error");
    }
  }

  function dislike(id) {
    try {
      const data = {
        id: id,
        number: -1,
      };
      const like = async () => {
        const url = `${API_URL}/guotes/`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
          throw "error";
        }

        changeLike(guotes, id, -1);
      };
      like();
    } catch {
      console.log("error");
    }
  }

  function changeLike(guotes, id, number) {
    const changeGuote = guotes.map((guote) => {
      if (guote._id == id) {
        guote.likes += number;
      }
      return guote;
    });

    setGuotes(changeGuote);
  }

  function addComment(comment, id) {
    const data = {
      comment: comment,
      id: id,
    };
    const url = `${API_URL}/guotes/${id}/`;
    try {
      const postComment = async () => {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
          throw res;
        }
        const addToState = guotes.map((guote) => {
          if (guote._id == id) {
            guote.comments.push(comment);
          }
          return guote;
        });

        setGuotes(addToState);
      };
      postComment();
    } catch {
      console.log("Error during fetch.");
    }
  }

  return (
    <>
      <AddGuotes addGuote={addGuote} />
      <h1 className="guotes_header">Display Guotes</h1>
      <ul>
        <Guotes
          guotes={guotes}
          addLike={addLike}
          addDislike={dislike}
          addComment={addComment}
        />
      </ul>
    </>
  );
}

export default GuotesMain;
