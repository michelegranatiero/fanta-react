import { useEffect, useMemo, useRef, useState} from "react";
import { useDraggable } from "react-use-draggable-scroll";

import useLocalStorage from "../utility/useLocalStorage";
import playerValidation from "../utility/playerValidation";

import PlayersImport from "../components/PlayersImport";
import Team from "../components/Team";
import AuctionDisplay from "../components/AuctionDisplay";
import Modal from "../components/Modal";
import SearchBox from "../components/SearchBox";

import { MdUploadFile } from "react-icons/md";
import { BiExport, BiImport} from "react-icons/bi"

const Draft = () => {

  const [settings, setSettings] = useLocalStorage("settings", null);

  const [players, setPlayers] = useLocalStorage("players", null)

  const [selPlayer, setSelPlayer] = useLocalStorage("selPlayer", null);
  const [currIndex, setCurrIndex] = useLocalStorage("currIndex", 0);

  const [teams, setTeams] = useLocalStorage("teams", null);


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
  const [modalToggle, setModalToggle] = useState({
    assign: false,
    delete: false,
  });

  function modalToggleHandler(val) {
    /* reverse because is going to change */
    const toggle = modalToggle[val];
    !toggle ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
    setModalToggle((prev) => ({...prev, [val]: !toggle}));
  }

  /* Assegnamento Giocatore da Modal*/
  function pushPlayerValidation(teamId, cost, player = selPlayer) {
    if(playerValidation(player, teamId, cost, teams, settings)){
      /* if all ok */
      pushPlayerIntoTeam(player, teamId, cost)
    }
  }

/*   useEffect(() => {
    console.log("maxofferchange",teams)
  }, [teams[0].maxOffer])
 */

  function pushPlayerIntoTeam(player, teamId, cost){
    const newPlayer = {...player, "cost" : cost};
    const idx = teamId - 1;
    const oldTeamPlayers = teams[idx].players;
    /* slice for UPDATING */
    const newTeams = [...teams.slice(0, idx), {...teams[idx], "players": [...oldTeamPlayers, newPlayer]}, ...teams.slice(idx + 1)]
    setTeams(newTeams);
    /* remove player from players list*/
    removePlayerFromAuction(player.id)
    /* eventually add player to history */
    modalToggleHandler("assign");
  }

  function pushBackPlayerIntoAuction(player){
    let newPlayers = players;
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


  const [toRemove, setToRemove] = useState([]);


  function removePlayerFromTeam() {
    /* update teams array */
    const [player, team] = toRemove;
    const newTeamPlayers = team.players.filter((plr) => plr.id !== player.id);
    const updatedTeam = {...team, "players": newTeamPlayers};
    const newTeams = [...teams];
    newTeams[team.id - 1] = updatedTeam;
    /* setTeams(newTeams); */
    setTeams(newTeams);
    /* remove cost from player */
    delete player.cost;
    /* pushback player in the auction list */
    pushBackPlayerIntoAuction(player)
  }


  function removeHandler(){
    removePlayerFromTeam()
    modalToggleHandler("delete");
  }


  const [drag, setDrag] = useState(true)

  const ref = useRef();
  const { events } = useDraggable(ref, {applyRubberBandEffect: true, isMounted: drag});




  const [query, setQuery] = useState("");

  const searchItems = useMemo(() => {
    let quot = settings.mode === "classic" ? "quotClass" : "quotMan";
    if (players){
      return players.filter(item => 
        item.giocatore.toLowerCase().includes(query.toLowerCase()))
        .sort((a,b) => b[quot] - a[quot]) 
    }
  }, [players, query]) 


  function selSearchedPlayer(playerIdx){
    let idx = players.findIndex(player => playerIdx === player.sortId )
    setSelPlayer(players[idx]);
    setCurrIndex(idx);
  }


  const [sortingMode, setSortingMode] = useState("acquisto");



  async function downloadRose(){

    const genData = () => {
      let data = ""
      teams.forEach((team) => {
        if (team.players.length > 0){
          data += "$,$,$\n"
          team.players.forEach(pl =>{
            data += `${team.name},${pl.id},${pl.cost}\n`
          })
        }
      })
      return data;
    }

    const blob = new Blob([genData()], { type: "text/csv" });
    const fileName = "rosters-" + new Date().toLocaleDateString() + ".csv";
    

    const anchorTag = document.createElement("a");
    anchorTag.href = URL.createObjectURL(blob);
    anchorTag.download = fileName;
    anchorTag.style.display = "none";
    anchorTag.click();
  }

  /* function importRose(){

  } */


  return (
    <>
      {!players && <PlayersImport updatePlayers={updatePlayersList} >
          <span>Importa lista giocatori</span> 
          <MdUploadFile size={22} />
        </PlayersImport>}
      {players && selPlayer && (
        <div className="top-container">
          <div className="history-cont">
            Cronologia Acquisti
          </div>
          <AuctionDisplay
            goPrev={goPrevPlayer}
            goNext={goNextPlayer}
            openModal={() => modalToggleHandler("assign")}
            selPlayer={selPlayer}
            progressIndex={currIndex}
            players={players}
          >
            <div className="search-box-cont">
              <SearchBox searchItems={searchItems} query={query} setQuery={setQuery} changePlayer={selSearchedPlayer} mode={settings.mode}/>
            </div>
          </AuctionDisplay>
          <div className="tools-cont">
            <div>
              <button className="btn btn-export" onClick={downloadRose}>
                <span>Esporta Rose</span>
                <BiExport className="btn-icon"/>
              </button>
            </div>
            {/* <div>
              <button className="btn" onClick={importRose}>
                <span>Importa Rose</span>
                <BiImport/>
              </button>
            </div> */}
            <div className="sorting-cont">
              <div className="sorting-label">Ordinamento</div>
              <select name="sortSelect" id="sortSelect" defaultValue={sortingMode} onChange={(e) => setSortingMode(e.target.value)}>
                <option value="acquisto"> Acquisto </option>
                <option value="acquisto-reverse"> Acquisto inverso </option>
                <option value="ruolo"> Ruolo </option>
                <option value="ruolo-reverse"> Ruolo inverso</option>
              </select>
            </div>
            
          </div>
        </div>
      )}
      {/* Teams */}
      <div style={{ position: "relative"}} >

          <div className="teams-wrapper">
            <div className="teams-cont" {...events} ref={ref} id="drag-scroll">
              {teams.map((team) => (
                <Team key={team.id} team={team} teams={teams} mode={settings.mode}
                  sortingMode={sortingMode}
                  updateTeams={(val) => setTeams(val)} 
                  remPlayer={[toRemove, setToRemove, () => modalToggleHandler("delete")]}
                  dragscroll={[drag, setDrag]}/>
              ))}
            </div>
          </div>


      </div>
      
      {/* Modal */}
      {modalToggle.assign && <Modal onCancel={() => modalToggleHandler("assign")} onSubmitHandler={pushPlayerValidation} selPlayer={selPlayer} mode={settings.mode} type={"add"}/>}
      {modalToggle.delete && <Modal onCancel={() => modalToggleHandler("delete")} onSubmitHandler={removeHandler} selPlayer={toRemove[0]} mode={settings.mode} type={"delete"}/>}
    </>
  );
};

export default Draft;
