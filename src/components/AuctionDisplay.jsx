import Role from "./Role";
import useLocalStorage from "../utility/useLocalStorage";
import { GiTwoCoins } from "react-icons/gi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function AuctionDisplay({goPrev, goNext, openModal, selPlayer, progressIndex, playersLength}) {
  const noCampUrl =
    "https://content.fantacalcio.it/web/campioncini/card2021/NO-CAMPIONCINO.png?v=35";

  const [settings, setSettings] = useLocalStorage("settings", null);

  return (
    <>
    <div className="auction-wrapper">
      <div className="auction-cont">
        <button className="btn-skip" onClick={goPrev}><MdKeyboardArrowLeft/></button>
        <div className="auct-core">
          <div  className="player-cont">
            <div>
              {/* <div>{selPlayer.sortId + 1}</div> */} {/* useful for debugging */}
              <div>{progressIndex+1}/{playersLength}</div>
              <img
                src= {selPlayer.urlCampioncino}
                alt="Campioncino"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src=noCampUrl;
                }}
                className="campioncino"
              />
            </div>
            <div className="player-info">
              <div className="player-name">{selPlayer.giocatore}</div>
              <div>{selPlayer.squadra}</div>
                <Role roleClass="auct-roles-cont" role={settings.mode === "classic" ? selPlayer.ruoloClassic : selPlayer.ruoliMantra}/>
                <div className="auct-quot"><span>{settings.mode === "classic" ? selPlayer.quotClass : selPlayer.quotMan}</span>
                  <GiTwoCoins className="credits-icon" size={19}/>
                </div>
              <div>Quotazione</div>
            </div>
          </div>
          <button className="btn btn-assign btn-new" onClick={openModal}>Assegna</button>
        </div>

        <button className="btn-skip" onClick={goNext}><MdKeyboardArrowRight/></button>
      </div>
    </div>
    </>
  );
}

export default AuctionDisplay;
