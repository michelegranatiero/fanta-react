import { useState, useRef } from "react";
import useLocalStorage from "../utility/useLocalStorage";
import Role from "./Role";
import { GiTwoCoins } from "react-icons/gi";
import { MdClose, MdCheck } from "react-icons/md";

function Modal({ onCancel, onSubmitHandler, selPlayer, mode, type }) {

  const [teams, setTeams] = useLocalStorage("teams", null);

  const [cost, setCost] = useState(1);
  const [selTeamId, setSelTeamId] = useState(teams[0].id);

  const inputRef  = useRef()

  const regex = /^[1-9][0-9]*$/;

  function costInputHandler(e){
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCost(e.target.value);
    }
  }
  function costOnFocus(e){
    e.target.select()
  }
  
  function submitForm(e){
    e.preventDefault();
    if (type == "add") onSubmitHandler(selTeamId, parseInt(cost));
    else if (type == "delete") onSubmitHandler();
  }

  return (
    <div>
      <div className="player-form-cont">
        <form id="player-form" onSubmit={submitForm} className="player-form">
          <div className="modal-info">
            <Role roleClass="auct-roles-cont" role={mode === "classic" ? selPlayer.ruoloClassic : selPlayer.ruoliMantra}/>
            <div className="player-name">{selPlayer.giocatore}</div>
            <div className="player-team">{selPlayer.squadra}</div>
            {/* <div className="auct-quot-cont">
              <div className="auct-quot"> <span>{mode === "classic" ? selPlayer.quotClass : selPlayer.quotMan}</span> 
                <GiTwoCoins className="credits-icon" size={19}/>
              </div>
              <div style={{fontSize: "12px"}}>Quotazione</div>
            </div> */}
          </div>
          {type == "add" && (
            <div className="modal-form">
              <select name="selTeam" id="selTeam" defaultValue={selTeamId} onChange={(e) => (setSelTeamId(e.target.value))}>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
              <div className="cost-cont">
                <input ref={inputRef} type="number" id="cost" name="cost" value={cost} autoFocus onChange={costInputHandler} onFocus={costOnFocus}/>
                <GiTwoCoins className="credits-icon" />
              </div>

            </div>
          )}
          {type == "delete" && (
            <div className="remove-warning">
              Sei sicuro di voler cancellare questa operazione?
            </div>
          )}
          <div className="modal-buttons">
            <button type="button" className="btn btn-cancel" onClick={onCancel} >
              Annulla
            </button>
            {type == "add" ? (
              <button type="submit" className="btn btn-confirm" >
                Conferma
              </button>
            ):(
              <button type="submit" className="btn btn-delete" autoFocus>
                Elimina
              </button>
            )}
          </div>       
          
        </form>
      </div>
      <div className="backdrop" onClick={onCancel}/>;
    </div>
  );
}

export default Modal;
