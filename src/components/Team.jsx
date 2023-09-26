import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import Player from "./Player";

function Team({team, pushBackPlayer, teams, setBackTeams}) {

  function changeTeamStuff(e) {
    const { name, value } = e.target;
    const updatedTeam = { ...teams[team.id - 1], [name]: value };
    const newTeams = [...teams];
    newTeams[team.id - 1] = updatedTeam;
    /* setTeams(newTeams); */
    setBackTeams(newTeams);
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

  function removePlayerFromTeam(player) {
    /* update teams array */
    const newTeamPlayers = team.players.filter((plr) => plr.id !== player.id);
    const updatedTeam = {...team, "players": newTeamPlayers};
    const newTeams = [...teams];
    newTeams[team.id - 1] = updatedTeam;
    /* setTeams(newTeams); */
    setBackTeams(newTeams);
    /* remove cost from player */
    delete player.cost;
    /* pushback player in the auction list */
    pushBackPlayer(player)
  }


  /* credits managment */

  const spentCredits = team.players.reduce((tot, curr) => tot + Number(curr.cost), 0);
  const resCredits = team.startingCredits - spentCredits;
  const maxOffer = resCredits - (team.numPlayers - team.players.length) + 1;

  
  /* CONCURRENCY MAY BE A PROBLEM */
  const firstRenderDone = useRef(false)
  /* const prevTeamPlayers = useRef(["prova"]); */

  useLayoutEffect(() =>{
    console.log("useffect")
    if (firstRenderDone.current) {
      console.log("useffectiiiiiiiiiiiiin")
      /* prevTeamPlayers.current = team.players; */
      const updatedTeam = {...team, "spentCredits": spentCredits, "resCredits": resCredits, "maxOffer": maxOffer}
      const newTeams = [...teams];
      newTeams[team.id - 1] = updatedTeam;
      /* setTeams(newTeams); */
      setBackTeams(newTeams);
    }else{
      firstRenderDone.current = true;
    }
  },[team.players])


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

      <div className="credits"> Tot: {team.startingCredits}</div>
      <div className="res-credits">Res:  {resCredits}</div>
      <div className="max-offer">Offerta max:  {maxOffer}</div>
      

      <div className="team-players">
        {team.players.map((player, idx) => (
          <Player key={idx} player={player} removePlayer={removePlayerFromTeam} />
        ))}
      </div>
    </div>
  );
}

export default Team;
