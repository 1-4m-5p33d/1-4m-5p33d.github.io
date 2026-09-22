export function Car() {
  return (
    <div className="car" aria-label="Formula-style single-seater climbing the circuit" role="img">
      <svg viewBox="0 0 220 110" aria-hidden="true">
        <path className="tyres" d="M23 14h31v27H23zM23 69h31v27H23zM164 8h33v29h-33zM164 73h33v29h-33z" />
        <path className="body" d="M45 43 85 31l20-18h32l15 18 23 8v30l-23 8-15 18h-32L85 79 45 67z" />
        <path className="nose" d="m45 48 40 5v5l-40 5z" />
        <path className="wing" d="M15 35h44v10H15zM15 65h44v10H15z" />
        <path className="cockpit" d="M104 34c8-9 27-9 34 0l-4 20h-25z" />
        <path className="accent" d="m73 49 30-7 14 14-14 13-30-7z" />
      </svg>
    </div>
  )
}
