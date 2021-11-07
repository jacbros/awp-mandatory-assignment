import { Router } from "@reach/router";
import GuotesMain from "../Views/Guotes/GuotesList.js";
import Guote from "../Views/Guote/guote.js";

function router() {
  return (
    <>
      <Router>
        <GuotesMain path="/"></GuotesMain>
        <Guote path="/:id"></Guote>
      </Router>
    </>
  );
}

export default router;
