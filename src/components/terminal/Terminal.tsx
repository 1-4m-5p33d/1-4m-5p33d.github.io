import React from 'react'

const command = 'fastfetch'
const art = `
⢀⣀⣀⣀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⡿⢀⣠⣴⣾⣿⣿⣿⣿⣇⡀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⣿⠟⢋⡙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⡿⠓⡐⠒⢶⣤⣄⡀⠀
⠸⠿⠇⢰⣿⣿⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡷⠈⣿⣿⣉⠁
⠀⠀⠀⠀⠈⠉⠀⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠈⠉⠁⠀⠈⠉⠉`

export function Terminal() {
  return (
    <section className="terminal-stage" aria-label="Portfolio terminal">
      <div className="terminal">
        {/* Terminal Window Header */}
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
          </div>
          <div className="terminal-title font-mono">aditya@manipal: ~</div>
        </div>

        {/* Command line */}
        <div className="command">
          $ <span className="typed-command">{command}</span>
          <span className="cursor">▋</span>
        </div>

        {/* Fastfetch Output */}
        <div className="fetch">
          <pre>{art}</pre>
          <div className="facts">
            <p>
              <span>Name</span>Aditya Trivedi
            </p>
            <p>
              <span>College</span>MIT Manipal
            </p>
            <p>
              <span>Studying</span>CS &amp; Fintech
            </p>
            <p>
              <span>GitHub</span>
              <a href="https://github.com/1-4m-5p33d" target="_blank" rel="noreferrer">
                github.com/1-4m-5p33d
              </a>
            </p>
            <p>
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/in/1-4m-5p33d/" target="_blank" rel="noreferrer">
                linkedin.com/in/1-4m-5p33d
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
