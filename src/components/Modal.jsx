import { useState, useContext, useRef } from "react";
import { TeamsCtx } from "../utility/Context";

function Modal({ onCancel, onSubmit, selPlayer, mode }) {

  const [teams] = useContext(TeamsCtx)

  const [cost, setCost] = useState(1);
  const [selTeamId, setSelTeamId] = useState(teams[0].id);

  const inputRef  = useRef()


  return (
    <div className="modal">
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
        <input ref={inputRef} type="number" id="cost" name="cost" value={cost} min={1} onChange={(e) => setCost(e.target.value)}/>

      </div>

      <button className="btn" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={(e) => onSubmit(e, selTeamId, cost)}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
