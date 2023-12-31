import { MdAddCircle, MdSportsSoccer } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const savedDraft = localStorage.getItem("fantagment");

  return (
    <>
      <div className="btn-cont-home">
        {savedDraft && (
          <button className="btn btn-bigger" onClick={() => navigate("draft")}>
            <span>Riprendi Asta</span>
          </button>
        )}
        <button className="btn btn-new btn-bigger" onClick={() => navigate("new-draft")}>
          <span className="btn-icon"><MdAddCircle size={22} /></span>
          <span className="btn-text">Nuova Asta</span>
        </button>
      </div>
      {/* <div className="cards-container">
        <div className="card"> Asta 1</div>
      </div> */}
    </>
  );
}

export default Home;
