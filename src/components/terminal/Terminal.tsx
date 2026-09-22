import { useEffect, useState } from 'react'

const command = '1-4m-5p33d@portfolio ~> fastfetch'
const art = `
⢀⣀⣀⣀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⡿⢀⣠⣴⣾⣿⣿⣿⣿⣇⡀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⠟⢋⡙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⡿⠓⡐⠒⢶⣤⣄⡀⠀
⠸⠿⠇⢰⣿⣿⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡷⠈⣿⣿⣉⠁
⠀⠀⠀⠀⠈⠉⠀⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠈⠉⠁⠀⠈⠉⠉`

export function Terminal() {
  const [typed, setTyped] = useState('')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let i = 0
    const interval = window.setInterval(() => {
      i += 1; setTyped(command.slice(0, i))
      if (i === command.length) { window.clearInterval(interval); window.setTimeout(() => setReady(true), 280) }
    }, 27)
    return () => window.clearInterval(interval)
  }, [])
  return <section className="terminal-stage" aria-label="Portfolio terminal">
    <div className="terminal">
      <div className="command">{typed}<span className="cursor">▋</span></div>
      {ready && <div className="fetch"><pre>{art}</pre><div className="facts">
        <p><span>Name</span>Aditya Trivedi</p><p><span>College</span>MIT Manipal</p><p><span>Studying</span>CS &amp; Fintech</p>
        <p><span>GitHub</span><a href="https://github.com/1-4m-5p33d" target="_blank" rel="noreferrer">github.com/1-4m-5p33d</a></p>
        <p><span>LinkedIn</span><a href="https://www.linkedin.com/in/1-4m-5p33d/" target="_blank" rel="noreferrer">linkedin.com/in/1-4m-5p33d</a></p>
      </div></div>}
    </div>
  </section>
}
