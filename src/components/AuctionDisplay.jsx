import { useState, useContext } from "react";
import { SelPlayerCtx, SettingsCtx } from "../utility/Context";

function AuctionDisplay({goPrev, goNext, openModal, selPlayer}) {
  const noCampUrl =
    "https://content.fantacalcio.it/web/campioncini/card2021/NO-CAMPIONCINO.png?v=35";

  const [error, setError] = useState(false);

  const [settings, setSettings] = useContext(SettingsCtx);

  return (
    <>
      <div className="auction-cont">
        <button onClick={goPrev}>left</button>
        {/* <div>{selPlayer.id}</div> */}
        <div>{selPlayer.sortId + 1}</div>
        <img
          src={error ? noCampUrl : selPlayer.urlCampioncino}
          alt="Campioncino"
          onError={() => setError(true)}
          className="campioncino"
        />
        <div>{selPlayer.giocatore}</div>
        <div>{selPlayer.squadra}</div>

        {settings.mode === "classic" ? (
          <>
            <div>{selPlayer.ruoloClassic}</div>
            <div>{selPlayer.quotClass}</div>
          </>
        ) : ( /* modeIsMantra */
          <>
            <div>{selPlayer.ruoliMantra}</div>
            <div>{selPlayer.quotMan}</div>
          </>
        )}
        <button onClick={openModal}>Assegna</button>

        <button onClick={goNext}>right</button>
      </div>
    </>
  );
}

export default AuctionDisplay;
