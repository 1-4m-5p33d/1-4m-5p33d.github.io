const projects = ['FlowCap', 'NewsFlo', 'Static Website', 'CTF / Security']
export function Projects() { return <section className="projects"><p>$ ls projects/</p>{projects.map((project) => <div key={project}>{project}/</div>)}</section> }
