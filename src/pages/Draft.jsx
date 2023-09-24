import { useState, useEffect, useContext} from "react";

import PlayersImport from "../components/PlayersImport";
import Team from "../components/Team";
import AuctionDisplay from "../components/AuctionDisplay";
import Modal from "../components/Modal";
import Backdrop from "../utility/Backdrop";

import { PlayersCtx, SelPlayerCtx, SettingsCtx, TeamsCtx } from "../utility/Context";

const Draft = () => {
  const [settings, setSettings] = useContext(SettingsCtx);

  /* const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players"))
  ); */ /* if set, else null */

  const [players, setPlayers] = useContext(PlayersCtx)

  const [selPlayer, setSelPlayer] = useContext(SelPlayerCtx);
  const [currIndex, setCurrIndex] = useState(null);

  const [teams, setTeams] = useContext(TeamsCtx);


  useEffect(() => {
    if (players){
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  /* useEffect(() => {
    if (!players && JSON.parse(localStorage.getItem("players"))) {
      setPlayers(JSON.parse(localStorage.getItem("players")))
    }
  }) */

  function updatePlayersList(data) {
    /* shuffling players */
    let shuffle = data.sort(() => Math.random() - 0.5);
    /* add sortId for sorting players*/
    shuffle.forEach((elem, idx) => {
      elem["sortId"] = idx;
    });
    setPlayers(shuffle);
    /* set selector to the first player */
    if (shuffle){
      setSelPlayer(shuffle[0]);
      setCurrIndex(0);
    }
  }

  function goNextPlayer() {
    let idx = 0;
    if (currIndex < players.length -1) idx = currIndex + 1;
    setSelPlayer(players[idx]);
    setCurrIndex(idx);
  }

  function goPrevPlayer() {
    let idx = players.length - 1;
    if (currIndex > 0) idx = currIndex - 1;
    setSelPlayer(players[idx]);
    setCurrIndex(idx);
  }

  function removePlayerFromAuction(playerId) {
    let idx = currIndex;
    const newPlayers = players.filter((player) => player.id !== playerId);
    if (idx >= newPlayers.length) {
      idx -= 1;
      setCurrIndex(idx);
    }
    setSelPlayer(newPlayers[idx])
    setPlayers(newPlayers);
  }

  /* Modal */
  const [modalToggle, setModalToggle] = useState(false);

  function ModalToggleHandlder() {
    /* reverse because is going to change */
    !modalToggle ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
    setModalToggle(!modalToggle);
  }

  /* Assegnamento Giocatore da Modal*/
  function pushPlayerValidation(teamId, cost) {
    if(cost<1){
      alert('il costo del giocatore non può essere inferiore a 1')
    }else if(cost > teams[teamId-1].maxOffer){
      alert('Il costo del giocatore supera la massima offerta che la squadra selezionata può presentare')
    }else if(teams[teamId-1].players.length >= teams[teamId-1].numPlayers){
      alert('La squadra selezionata è al completo')
    }else{
      /* if all ok */
      pushPlayerIntoTeam(teamId, cost)
    }
  }

  function pushPlayerIntoTeam(teamId, cost){
    const newPlayer = {...selPlayer, "cost" : cost};
    const idx = teamId - 1;
    const oldTeamPlayers = teams[idx].players;
    /* slice for UPDATING */
    const newTeams = [...teams.slice(0, idx), {...teams[idx], "players": [...oldTeamPlayers, newPlayer]}, ...teams.slice(idx + 1)]
    setTeams(newTeams);
    /* remove player from players list*/
    removePlayerFromAuction(selPlayer.id)
    /* eventually add player to history */
    ModalToggleHandlder();
  }

  function pushBackPlayerIntoAuction(player){
    let newPlayers = players;
    /* newPlayers.push(player); */

    let idx = players.length;
    for (let i=0; i < players.length; i+=1) {
      if (players[i].sortId > player.sortId) {
        idx = i;
        break;
      }
    }
    /* slice for INSERTING */
    newPlayers = [...newPlayers.slice(0,idx), player, ...newPlayers.slice(idx)]
    setPlayers(newPlayers);
    /* adjust auction index */
    let idx2 = currIndex + 1;
    setCurrIndex(idx2)
    setSelPlayer(newPlayers[idx2])
  }


  return (
    <>
      {!players && <PlayersImport updatePlayers={updatePlayersList} />}
      {selPlayer && (
        <AuctionDisplay
          goPrev={goPrevPlayer}
          goNext={goNextPlayer}
          openModal={ModalToggleHandlder}
          selPlayer={selPlayer}
          progressIndex={players.findIndex((elem) => elem === selPlayer)}
          playersLength = {players.length}
          
        />
      )}
      {players && (
        <div className="teams-cont">
          {teams.map((team) => (
            <Team key={team.id} id={team.id} team={team} pushBackPlayer={pushBackPlayerIntoAuction}/>
          ))}
        </div>
      )}
      {modalToggle && <Modal onCancel={ModalToggleHandlder} onSubmitHandler={pushPlayerValidation} selPlayer={selPlayer} mode={settings.mode} />}
      {modalToggle && <Backdrop onClick={ModalToggleHandlder} />}
    </>
  );
};

export default Draft;
