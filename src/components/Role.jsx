import React from 'react'

function Role({role, roleClass}) {

  const newRoles = role.split(";");

  return (
    <div className={roleClass}>
      {newRoles.map((r) => {
        return <div key={r} className={` role role-${r}`}>{r}</div>
      })}
    </div>
  )
}

export default Role