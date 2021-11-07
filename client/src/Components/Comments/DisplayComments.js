import AddComments from "./AddComments";

function Comments(props) {
  const { comments, id, addComment } = props;

  return (
    <section className="comments">
      <AddComments id={id} addComment={addComment} />
      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="comment" key={index}>
              <p>{comment}</p>
            </div>
          );
        })}
    </section>
  );
}

export default Comments;
