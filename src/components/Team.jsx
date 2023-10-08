import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import Player from "./Player";

import { MdEdit } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";

import customSortingByRole from "../utility/customSortingByRole";


function Team({team, teams, mode, sortingMode, updateTeams, remPlayer, dragscroll}) {

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
    /* const timer = setTimeout(() => setClickDrag(!clickDrag), 1000)
    return () => clearTimeout(timer) */
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
      /* sorting */
      /* const orderedPlayers = team.players.sort((a,b) => customSortingByRole(a, b, mode)); */
      /* credits */
      const updatedTeam = {...team, /* "players": orderedPlayers, */"spentCredits": spentCredits, "resCredits": resCredits, "maxOffer": maxOffer}
      const newTeams = [...teams];
      newTeams[team.id - 1] = updatedTeam;
      updateTeams(newTeams);
    }else{
      firstRenderDone.current = true;
    }
  }, [team.players])


  const sortedPlayers = useMemo(() => {
    console.log(team.players)
    let plrsCopy = [...team.players];
    if (sortingMode === "ruolo") {
      return plrsCopy.sort((a,b) => customSortingByRole(a, b, mode));
    }else if(sortingMode === "ruolo-reverse"){
      return plrsCopy.sort((a,b) => customSortingByRole(a, b, mode)).reverse();
    }else if (sortingMode === "acquisto-reverse"){
      return plrsCopy.reverse();
    }else{  /* acquisto */
      return plrsCopy;
    }
  }, [team.players, sortingMode]) 



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

        <button className="btn-team-edit" ref={buttonRef} onMouseUp={changeEditMode}><MdEdit/></button>
      </div>
      
      <div className="credits-cont">
        <div className="credits">
          <div className="credits-icon"><GiTwoCoins /> </div>
          <div className="res-credits"> {resCredits} </div>
           / 
          <div>{team.startingCredits}</div>
        </div> 
        <div className="max-offer-cont">
          <div className="max-credits-icon">
            <div className="credits-icon"> <GiTwoCoins /> </div> 
            <div className="max-text">max</div>
          </div>
          <div className="max-offer"> {maxOffer} </div> 
        </div>
      </div>
      
      
      <div className="team-players">
        {sortedPlayers.map((player, idx) => (
          <Player key={idx} player={player} team={team} remPlayer={remPlayer}/>
        ))
        }
      </div>
    </div>
  );
}

export default Team;
