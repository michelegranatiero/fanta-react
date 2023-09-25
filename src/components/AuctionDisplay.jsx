import useLocalStorage from "../utility/useLocalStorage";

function AuctionDisplay({goPrev, goNext, openModal, selPlayer, progressIndex, playersLength}) {
  const noCampUrl =
    "https://content.fantacalcio.it/web/campioncini/card2021/NO-CAMPIONCINO.png?v=35";

  const [settings, setSettings] = useLocalStorage("settings", null);

  return (
    <>
      <div className="auction-cont">
        <button onClick={goPrev}>left</button>
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
