import Role from "./Role";
import useLocalStorage from "../utility/useLocalStorage";
import { GiTwoCoins } from "react-icons/gi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useSwipeable } from "react-swipeable";

function AuctionDisplay({goPrev, goNext, openModal, selPlayer, progressIndex, playersLength, children}) {
  const noCampUrl =
    "https://content.fantacalcio.it/web/campioncini/card2021/NO-CAMPIONCINO.png?v=35";

  const [settings, setSettings] = useLocalStorage("settings", null);
  
  const [players, setPlayers] = useLocalStorage("players", null)

  const config = {
    delta: 50,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: false,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: 500,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  }

  const swipeHandlers = useSwipeable({
    /* onSwiped: (eventData) => console.log("User Swiped!", eventData), */
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    ...config,
  });


  
  /* const playersImages = players.map( (pl) => {
    let img = new Image();
    img.src = pl.urlCampioncino;
    return img
  }); */



  return (
    <>
    <div className="auction-wrapper">
      <div className="auction-cont" /* swipe handlers */ {...swipeHandlers} /* style={{ touchAction: 'pan-y' }} */>
        <button className="btn-skip" onClick={goPrev}><MdKeyboardArrowLeft/></button>
        <div className="auct-core">
          <div className="player-cont">
            <div>
              {/* <div>{selPlayer.sortId + 1}</div> */} {/* useful for debugging */}
              <div>{progressIndex+1}/{playersLength}</div>
              <div className="image-slider">
                <div className="camp-cont">
                  {players.map(pl => (
                    <img
                      key={pl.id}
                      src= {pl.urlCampioncino}
                      loading="lazy"
                      alt="Campioncino"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=noCampUrl;
                      }}
                      className="campioncino"
                      style={{translate: `${-150 * progressIndex -25}%`}}
                    />
                  ))}
                </div>
              </div>
              {/* <img
                src= {playersImages[progressIndex].src}
                alt="Campioncino"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src=noCampUrl;
                }}
                className="campioncino"
              /> */}
            </div>
            <div className="search-and-player-cont">
              {children}{/* searchbox */}
              <div className="player-info">
                <div className="player-name">{selPlayer.giocatore} <div>{selPlayer.ceduto === "1" && "*"}</div></div>
                <div>{selPlayer.squadra}</div>
                  <Role roleClass="auct-roles-cont" role={settings.mode === "classic" ? selPlayer.ruoloClassic : selPlayer.ruoliMantra}/>
                  <div className="auct-quot"><span>{settings.mode === "classic" ? selPlayer.quotClass : selPlayer.quotMan}</span>
                    <GiTwoCoins className="credits-icon" size={19}/>
                  </div>
                <div>Quotazione</div>
              </div>
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
