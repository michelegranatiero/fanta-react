import useLocalStorage from "../utility/useLocalStorage";
import Role from "./Role";

import { MdPersonRemove } from "react-icons/md";

function Player({player, team, remPlayer}) {

  const [settings, setSettings] = useLocalStorage("settings", null);

  /* Modal */

  const [toRemove, setToRemove, toggleModal] = remPlayer;

  function modalToggleHandler(e) {
    e.preventDefault();
    setToRemove([player, team])
    toggleModal();
  }

  

  return (
    <>
      <div className="player-box">
        <div className="player-data">
          <Role roleClass="auct-roles-cont" role={settings.mode === "classic" ? player.ruoloClassic : player.ruoliMantra}/>
          {player.giocatore}
        </div>
        <div className="player-cost">{player.cost}</div>
        <button className="btn-rem-player" onClick={modalToggleHandler}> <MdPersonRemove/> </button>
      </div>
      
    </>
  )
}

export default Player