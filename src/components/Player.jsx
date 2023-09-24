function Player({player, removePlayer}) {
  
  return (
    <>
      <div>{player.giocatore} {player.cost}</div>
      <button onClick={() => removePlayer(player)}>remove</button>
    </>
  )
}

export default Player