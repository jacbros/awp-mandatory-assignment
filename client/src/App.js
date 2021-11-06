import { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";

import Guotes from "./Guotes";
import Guote from "./Guote";

import "./style.css";
const API_URL = process.env.REACT_APP_API;

function App() {
  const [guotes, setGuotes] = useState([]);

  useEffect(() => {
    async function getGuotes() {
      const url = `${API_URL}/guotes`;
      const response = await fetch(url);
      const data = await response.json();
      setGuotes(data);
    }
    getGuotes();
  }, []);

  function getGuote(id) {
    return guotes.find((guote) => guote.id === parseInt(id));
  }

  function addGuote(guote, author) {
    const newGuote = {
      id: guotes.length + 1,
      guote: guote,
      author: author,
    };

    fetch(API_URL, {
      // PUT instead of POST because we overwrite the whole bin with a new version
      // https://jsonbin.io/api-reference/v3/bins/update
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Simple version where we overwrite the entire "database" store with a new list
      body: JSON.stringify([...guotes, newGuote]),
    })
      .then((response) => response.json())
      .then((data) => setGuotes(data.record))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      
    </>
  );
}

export default App;
