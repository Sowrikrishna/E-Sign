import React from 'react'

const Adminpage = () => {
  return (
    <>
    <div>Adminpage</div>
    <button onClick={() => {localStorage.setItem("validated", undefined)
     console.log('cleared');
    }}>clear</button>
    </>
  )
}

export default Adminpage