const command = 'fastfetch'
const art = `
⢀⣀⣀⣀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⡿⢀⣠⣴⣾⣿⣿⣿⣿⣇⡀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⠟⢋⡙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⡿⠓⡐⠒⢶⣤⣄⡀⠀
⠸⠿⠇⢰⣿⣿⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡷⠈⣿⣿⣉⠁
⠀⠀⠀⠀⠈⠉⠀⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠈⠉⠁⠀⠈⠉⠉`

export function Terminal() {
  return <section className="terminal-stage" aria-label="Portfolio terminal">
    <div className="terminal">
      <div className="command">$ <span className="typed-command">{command}</span><span className="cursor">▋</span></div>
      <div className="fetch"><pre>{art}</pre><div className="facts">
        <p><span>Name</span>Aditya Trivedi</p><p><span>College</span>MIT Manipal</p><p><span>Studying</span>CS &amp; Fintech</p>
        <p><span>GitHub</span><a href="https://github.com/1-4m-5p33d" target="_blank" rel="noreferrer">github.com/1-4m-5p33d</a></p>
        <p><span>LinkedIn</span><a href="https://www.linkedin.com/in/1-4m-5p33d/" target="_blank" rel="noreferrer">linkedin.com/in/1-4m-5p33d</a></p>
      </div></div>
    </div>
  </section>
}
