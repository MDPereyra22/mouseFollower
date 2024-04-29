import { useEffect, useState } from "react"


const FollowMouse =()=>{
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    console.log("UseEffect", { enabled })

    const handleMove = ((event) => {
      const { clientX, clientY } = event
      console.log("handelMove", { clientX, clientY })
      setPosition({x: clientX, y: clientY})
    })

    if(enabled){
      window.addEventListener("pointermove", handleMove)
    }

    return () =>{
      window.removeEventListener("pointermove", handleMove);
    }
  }, [enabled])

  useEffect(()=>{
    document.body.classList.toggle("no-cursor", enabled)

    return()=>{
      document.body.classList.remove("no-cursor")
    }
  },[enabled])




  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button
        onClick={(() => {
          setEnabled(!enabled)
        })}
      >{enabled ? "Desactivar" : "Activar"} seguimiento de puntero</button>
    </main>
    )
}



function App() {
  const [mounted, setMounted] = useState(true);
  return (
  <main>
    {mounted && <FollowMouse/>}
    <button 
    onClick={()=> setMounted(!mounted) }
    >
      Toggle mounted FollowMouse Component
    </button>
  </main>
  )
}

export default App
