import useLocalStorage from "../utility/useLocalStorage";
import Role from "./Role";

import { MdPersonRemove } from "react-icons/md";


function Player({player, removePlayer}) {

  const [settings, setSettings] = useLocalStorage("settings", null);
  
  return (
    <>
      <div className="player-box">
        <div className="player-data">
          <Role roleClass="auct-roles-cont" role={settings.mode === "classic" ? player.ruoloClassic : player.ruoliMantra}/>
          {player.giocatore}
        </div>
        {player.cost} 
        <button className="btn-rem-player" onClick={() => removePlayer(player)}> <MdPersonRemove/> </button>
      </div>
      
    </>
  )
}

export default Player