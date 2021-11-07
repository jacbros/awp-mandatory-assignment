import { useState } from 'react';

function AddGuote(props) {
  const { addGuote } = props;

  const [guote, setGuote] = useState("");
  const [author, setAuthor] = useState("");

  // Conditional rendering
  return (
    <>
      <h3>Add Guote</h3>

      <input onChange={(event) => setGuote(event.target.value)} type="text" />
      <input onChange={(event) => setAuthor(event.target.value)} type="text" />

      <button type="button" onClick={(event) => {
        addGuote(guote, author);
      }}>Add Guote
      </button>
    </>
  );
}

export default AddGuote;
