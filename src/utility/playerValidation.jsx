const playerValidation = (player, teamId, cost, teams, settings) => {

  const teamDst = teams[teamId-1];

  if(cost<1 || isNaN(cost)|| cost === ""){
    alert('il costo del giocatore non può essere inferiore a 1')
  }else if(cost > teamDst.maxOffer){
    alert('Il costo del giocatore supera la massima offerta che la squadra selezionata può presentare')
  }else if(teamDst.players.length >= teamDst.numPlayers){
    alert('La squadra selezionata è al completo')
  }

  // Verifica se settings.mode è valido
  if(settings.mode !== "classic" && settings.mode !== "mantra"){
    alert("Modalità di gioco non valida.")
    return false;
  }

  // Esegue la verifica appropriata in base alla modalità di gioco
  if(settings.mode === "classic"){
    const count = teamDst.players.filter(p => p.ruoloClassic === player.ruoloClassic).length;
    if(count >= settings[player.ruoloClassic.toLowerCase()]){
      alert(`Il numero di giocatori con ruolo ${player.ruoloClassic} nella squadra è maggiore o uguale al limite impostato.`);
      return false;
    }
  }else if(settings.mode === "mantra"){
    if(player.ruoliMantra.includes("Por")){
      const count = teamDst.players.filter(p => p.ruoliMantra.includes("Por")).length;
      if(count >= settings.por){
        alert("Il numero di portieri nella squadra è maggiore o uguale al limite impostato.");
        return false;
      }
    }else{
      const count = teamDst.players.filter(p => !p.ruoliMantra.includes("Por")).length;
      if(count >= settings.gm){
        alert("Il numero di giocatori che non sono portieri nella squadra è maggiore o uguale al limite impostato.");
        return false;
      }
    }
  }

  return true;
}

export default playerValidation;