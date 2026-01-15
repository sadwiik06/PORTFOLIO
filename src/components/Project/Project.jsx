import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import workData from "../Work/WorkData";
import "./Project.css";

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);

  useEffect(() => {
    const currentProject = workData.find((p) => p.id === id);
    const currentIndex = workData.findIndex((p) => p.id === id);

    setProject(currentProject);
    setNextProject(currentIndex < workData.length - 1 ? workData[currentIndex + 1] : null);
    setPrevProject(currentIndex > 0 ? workData[currentIndex - 1] : null);

    // Scroll to top on project change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return (
      <div className="project-page">
        <div className="project-not-found">
          Project not found
          <button className="back-button" onClick={() => navigate("/work")}>
            Return to work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page">
      {/* MINIMAL HEADER */}
      <header className="project-header">
        <button 
          className="header-back"
          onClick={() => navigate("/work")}
          aria-label="Back to all projects"
        >
          ← All Projects
        </button>
        
        <div className="header-meta">
          <span className="meta-number">0{workData.findIndex(p => p.id === id) + 1}</span>
          <span className="meta-separator">/</span>
          <span className="meta-total">0{workData.length}</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="project-main">
        {/* PROJECT HEADING */}
        <div className="project-heading">
          <h1 className="project-title">
            {project.title}
            <span className="accent-dot">.</span>
          </h1>
          
          <div className="title-line" />
          
          <div className="project-meta">
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-value">{project.year}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">{project.role}</span>
            </div>
            {project.duration && (
              <div className="meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">{project.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* PROJECT CONTENT */}
        <div className="project-content">
          {/* PROBLEM */}
          <section className="content-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2 className="section-title">Problem</h2>
            </div>
            <p className="section-text">{project.problem}</p>
          </section>

          {/* SOLUTION */}
          <section className="content-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h2 className="section-title">Solution</h2>
            </div>
            <p className="section-text">{project.solution}</p>
            {project.technologies && (
              <div className="tech-stack">
                <span className="tech-label">Technologies:</span>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* RESULT */}
          <section className="content-section">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2 className="section-title">Result</h2>
            </div>
            <p className="section-text">{project.result}</p>
            
            {project.metrics && (
              <div className="result-metrics">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* LEARNINGS (OPTIONAL) */}
          {project.learnings && (
            <section className="content-section">
              <div className="section-header">
                <span className="section-number">04</span>
                <h2 className="section-title">Learnings</h2>
              </div>
              <ul className="learnings-list">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="learning-item">
                    <span className="learning-bullet">•</span>
                    {learning}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      {/* PROJECT NAVIGATION */}
      <nav className="project-navigation">
        {prevProject && (
          <button
            className="nav-button prev"
            onClick={() => navigate(`/work/${prevProject.id}`)}
          >
            <div className="nav-arrow">←</div>
            <div className="nav-info">
              <span className="nav-label">Previous</span>
              <span className="nav-project">{prevProject.title}</span>
            </div>
          </button>
        )}

        {prevProject && nextProject && <div className="nav-divider" />}

        {nextProject && (
          <button
            className="nav-button next"
            onClick={() => navigate(`/work/${nextProject.id}`)}
          >
            <div className="nav-info">
              <span className="nav-label">Next</span>
              <span className="nav-project">{nextProject.title}</span>
            </div>
            <div className="nav-arrow">→</div>
          </button>
        )}
      </nav>

      {/* FLOATING HOME LINK */}
      <button 
        className="floating-home"
        onClick={() => navigate("/")}
        aria-label="Return home"
      >
        <span className="home-text">Home</span>
      </button>

      {/* BACKGROUND ELEMENTS */}
      <div className="grid-lines">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="grid-line" style={{ left: `${i * 10}%` }} />
        ))}
      </div>
    </div>
  );
};

export default Project;