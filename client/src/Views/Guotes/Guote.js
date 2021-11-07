function Guote(props) {
  const { guote } = props;

  return (
    <div className="guote_container">
      <section key={guote._id} className="guote">
        <p className="guote_guote">
          <strong>{guote.guote}</strong>
        </p>
        <p className="guote_author">
          <strong>Author: {guote.author}</strong>
        </p>
        <p>Likes: {guote.likes}</p>
      </section>
    </div>
  );
}

export default Guote;
