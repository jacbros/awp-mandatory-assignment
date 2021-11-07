function Likes(props) {
  const { id, addLike, addDislike } = props;

  return (
    <section className="likes">
      <button onClick={() => addLike(id)}>Like</button>
      <button onClick={() => addDislike(id)}>Dislike</button>
    </section>
  );
}

export default Likes;
