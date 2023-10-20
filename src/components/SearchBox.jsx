import { useState } from "react";
import useClickOutside from "../utility/useClickOutside";
import Role from "./Role";

import { MdSearch } from "react-icons/md";

function SearchBox({searchItems, query, setQuery, changePlayer, mode}) {

  const [showResults, setShowResults] = useState(false);

  const searchRef = useClickOutside(() => {
    setShowResults(false);
    setQuery("")
})

  function selectPlayer(e, playerIdx){
    e.preventDefault();
    changePlayer(playerIdx);
    setQuery("");
    setShowResults(false)
  }

  return (
    <div ref={searchRef}>
      <div className="search-div">
        <input type="search" className="input-search-box" value={query} placeholder="Cerca giocatore"
          onChange={e => setQuery(e.target.value)} onClick={() => setShowResults(true)}/>
        <MdSearch className="search-icon"/>
      </div>
      {searchItems.length > 0 && showResults && (
        <div className="searchedItemsList">
          {searchItems.map(item => (
            <div className="searchedItem" key={item.id} onClick={(e) => selectPlayer(e, item.sortId)}>
              <Role roleClass="auct-roles-cont" role={mode === "classic" ? item.ruoloClassic : item.ruoliMantra}/>
              <div className="srch-player">{item.giocatore}</div>
              <div className="srch-team">{item.squadra}</div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default SearchBox