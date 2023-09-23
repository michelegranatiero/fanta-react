import { useContext, useEffect, useRef, useState } from "react";
import { TeamsCtx } from "../utility/Context";

import Player from "./Player";

function Team({team}) {

  const [teams, setTeams] = useContext(TeamsCtx);

  function changeTeamStuff(e) {
    const { name, value } = e.target;
    const updatedTeam = { ...teams[team.id - 1], [name]: value };
    const newTeams = [...teams];
    newTeams[team.id - 1] = updatedTeam;
    setTeams(newTeams);
  }


  /* ----------------- changeTeam name ------------------------*/
  const inputRef = useRef(null);
  const buttonRef = useRef(null)

  const [editOn, setEditOn] = useState(false);

  function changeEditMode(){
    setEditOn(!editOn);
  }
  
  function confirmInput(){
    setEditOn(false);
  }

  function handleKeyUp(e){
    if(e.key === "Enter"){
      confirmInput();
    }
  }

  useEffect(() => {   
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target) && !buttonRef.current.contains(e.target)){
        confirmInput();
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
  }, [inputRef])

  /* ----------------------end------------------- */

  return (
    <div className="team">
      {editOn?(
        <>
          <input
            type="text"
            ref={inputRef}
            name="name"
            value={team.name}
            onChange={changeTeamStuff}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </>
      ):(
        <h3 onDoubleClick={changeEditMode}>{team.name}</h3>
      )}
      <button ref={buttonRef} onClick={changeEditMode}>change</button>
      <div className="team-players">
        {team.players.map((player, idx) => (
          <Player key={idx} player={player} />
        ))}
      </div>
    </div>
  );
}

export default Team;
