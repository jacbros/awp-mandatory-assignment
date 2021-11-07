import { useEffect, useState } from "react";
import Comments from "../../Components/Comments/DisplayComments.js";
import Likes from "../../Components/Likes.js";
const API_URL = process.env.REACT_APP_API;

function Guote(props) {
  const { id } = props;

  const [guote, setGuote] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/guotes/${id}/`;
      const response = await fetch(url);
      const data = await response.json();
      setGuote(data);
    };
    fetchData();
  }, []);

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
        changeLike(1);
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
        const re = await response.json();
        if (!response.ok) {
          throw "error";
        }

        changeLike(-1);
      };
      like();
    } catch {
      console.log("error");
    }
  }

  function changeLike(number) {
    setGuote({ ...guote, likes: (guote.likes += number) });
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
        const re = await response.json();
        if (!response.ok) {
          throw re;
        }
        let newComment = [...guote.comments, comment];
        setGuote({ ...guote, comments: newComment });
      };
      postComment();
    } catch {
      console.log("Fetch failed");
    }
  }

  return (
    <>
      <article className="guote">
        <p className="guote_guote">
          <strong>{guote.guote}</strong>
        </p>
        <p className="guote_author">
          <strong>~{guote.author}</strong>
        </p>
        <p>Likes: {guote.likes}</p>
        <Likes id={guote._id} addLike={addLike} addDislike={dislike} />
        {guote.comments && (
          <Comments
            comments={guote.comments}
            id={guote._id}
            addComment={addComment}
          />
        )}
      </article>
    </>
  );
}

export default Guote;
