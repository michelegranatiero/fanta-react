import { MdAddCircle, MdSportsSoccer } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="btn-container">
        <button className="btn-new" onClick={() => navigate("new-draft")}>
          <MdAddCircle size={22} /> New Draft
        </button>
      </div>
      <div className="cards-container">
        {/* caricare tutte le aste dal db fetch and display (nome+modalità) */}
        <div className="card"> Asta 1</div>
        <div className="card"> Asta 2</div>
        <div className="card"> Asta 3 di prova </div>
      </div>
    </>
  );
}

export default Home;
