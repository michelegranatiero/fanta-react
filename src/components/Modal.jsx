import { useState, useRef } from "react";
import useLocalStorage from "../utility/useLocalStorage";

function Modal({ onCancel, onSubmitHandler, selPlayer, mode }) {

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
  
  function submitForm(e){
    e.preventDefault();
    onSubmitHandler(selTeamId,parseInt(cost));
  }

  return (
    <form id="player-form" onSubmit={submitForm} className="player-form">
      <div className="modal-info">
        {mode === "classic" ? (
          <>
            <div>{selPlayer.ruoloClassic}</div>
            <div>{selPlayer.quotClass}</div>
          </>
        ) : (
          /* modeIsMantra */
          <>
            <div>{selPlayer.ruoliMantra}</div>
            <div>{selPlayer.quotMan}</div>
          </>
        )}
        <div>{selPlayer.giocatore}</div>
      </div>
      <div className="modal-info">
        <select name="selTeam" id="selTeam" defaultValue={selTeamId} onChange={(e) => (setSelTeamId(e.target.value))}>
          {teams.map((team) => (
             <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <input ref={inputRef} type="number" id="cost" name="cost" value={cost} autoFocus onChange={costInputHandler}/>

      </div>

      <button type="button" className="btn" onClick={onCancel} >
        Cancel
      </button>
      <button type="submit" className="btn" >
        Confirm
      </button>
    </form>
  );
}

export default Modal;
