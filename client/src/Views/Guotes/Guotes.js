import { Link } from "@reach/router";
import Guote from "./Guote.js";
import DisplayComments from "../../Components/Comments/DisplayComments";
import Likes from "../../Components/Likes";

function Guotes(props) {
  const { guotes, addLike, addDislike, addComment } = props;

  return (
    <>
      <section className="guotes">
        {guotes.map((guote) => {
          return (
            <div key={guote._id}>
              <Link to={`/${guote._id}`}>
                <Guote guote={guote} />
              </Link>
              <Likes id={guote._id} addLike={addLike} addDislike={addDislike} />

              <DisplayComments
                comments={guote.comments}
                id={guote._id}
                addComment={addComment}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Guotes;
