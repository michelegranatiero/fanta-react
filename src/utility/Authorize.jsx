import { Navigate } from "react-router-dom";

function Authorize({children}) {

  if (localStorage.getItem("fantagment")){
    return children;
  }

  return <Navigate to="/" />

  
}

export default Authorize