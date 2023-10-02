import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Player from "./Player";

import { MdEdit } from "react-icons/md";

function Team({team, teams, updateTeams, remPlayer, dragscroll}) {

  const [clickDrag, setClickDrag] = dragscroll; /* for disabling mouse click and drag scrolling */

  function changeTeamStuff(e) {
    const { name, value } = e.target;
    const updatedTeam = { ...teams[team.id - 1], [name]: value };
    const newTeams = [...teams];
    newTeams[team.id - 1] = updatedTeam;
    updateTeams(newTeams);
  }

  /* ----------------- changeTeamName ------------------------*/
  const inputRef = useRef(null);
  const buttonRef = useRef(null)

  const [editOn, setEditOn] = useState(false);

  function changeEditMode(){
    setEditOn(!editOn);
    setClickDrag(!clickDrag);
  }
  
  function confirmInput(){
    setEditOn(false);
    setClickDrag(true);
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


  /* ----------------- credits managment ------------------------*/

  const spentCredits = team.players.reduce((tot, curr) => tot + Number(curr.cost), 0);
  const resCredits = team.startingCredits - spentCredits;
  const maxOffer = resCredits - (team.numPlayers - team.players.length) + 1;

  
  /* CONCURRENCY MAY BE A PROBLEM */
  const firstRenderDone = useRef(false)

  useLayoutEffect(() =>{
    if (firstRenderDone.current) {
      const updatedTeam = {...team, "spentCredits": spentCredits, "resCredits": resCredits, "maxOffer": maxOffer}
      const newTeams = [...teams];
      newTeams[team.id - 1] = updatedTeam;
      /* setTeams(newTeams); */
      updateTeams(newTeams);
    }else{
      firstRenderDone.current = true;
    }
  }, [team.players])



  return (
    <div className="team">
      <div className="team-name-cont">
        
        {editOn?(
          <>
            <input type="text" ref={inputRef} name="name" value={team.name}
                onChange={changeTeamStuff} onKeyUp={handleKeyUp} autoFocus />
          </>
        ):(
          <div className="team-name" onDoubleClick={changeEditMode}>{team.name}</div>
        )}

        <button className="btn-team-edit" ref={buttonRef} onClick={changeEditMode}><MdEdit/></button>
      </div>

      <div className="credits"> Tot: {team.startingCredits}</div>
      <div className="res-credits">Res:  {resCredits}</div>
      <div className="max-offer">Offerta max: {maxOffer}</div>
      
      <div className="team-players">
        {team.players.map((player, idx) => (
          <Player key={idx} player={player} team={team} remPlayer={remPlayer}/>
        ))}
      </div>
    </div>
  );
}

export default Team;
