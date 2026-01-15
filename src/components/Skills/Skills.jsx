import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Skills.css";

const Skills = () => {
  const navigate = useNavigate();
  const skillsListRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("languages");
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);



  // Skills data organized by category
  const skillsData = {
    languages: {
      title: "Languages",
      items: [
        { name: "Java", level: "proficient", color: "#f89820" },
        { name: "JavaScript", level: "proficient", color: "#f0db4f" },
        { name: "SQL", level: "proficient", color: "#00758f" },
        { name: "C", level: "intermediate", color: "#00599c" },
        { name: "Python", level: "basic", color: "#3776ab" },
        { name: "HTML/CSS", level: "proficient", color: "#e34c26" },
      ]
    },
    webDev: {
      title: "Web Development",
      items: [
        { name: "React.js", level: "proficient", color: "#61dafb" },
        { name: "Spring Boot", level: "proficient", color: "#6db33f" },
        { name: "Node.js", level: "intermediate", color: "#339933" },
        { name: "Express.js", level: "intermediate", color: "#000000" },
        { name: "Redux", level: "intermediate", color: "#764abc" },
        { name: "Tailwind CSS", level: "proficient", color: "#06b6d4" },
      ]
    },
    databases: {
      title: "Databases",
      items: [
        { name: "PostgreSQL", level: "proficient", color: "#336791" },
        { name: "MySQL", level: "proficient", color: "#4479a1" },
        { name: "MongoDB", level: "intermediate", color: "#47a248" },
      ]
    },
    aiMl: {
      title: "AI/ML",
      items: [
        { name: "Machine Learning", level: "fundamental", color: "#ff6b6b" },
        { name: "Ensemble Techniques", level: "exposure", color: "#4ecdc4" },
      ]
    },
    devOps: {
      title: "DevOps & Tools",
      items: [
        { name: "Docker", level: "intermediate", color: "#2496ed" },
        { name: "Git", level: "proficient", color: "#f1502f" },
        { name: "GitHub", level: "proficient", color: "#181717" },
      ]
    }
  };

  // Level descriptions for tooltips
  const levelDescriptions = {
    proficient: "Deep understanding, extensive production experience",
    intermediate: "Solid knowledge, multiple projects completed",
    basic: "Working knowledge, can build with guidance",
    fundamental: "Core understanding of concepts & applications",
    exposure: "Familiar with concepts, beginning practical application"
  };

  useEffect(() => {
    // Auto-rotate categories every 5 seconds
    let rotateInterval;
    if (autoRotate) {
      rotateInterval = setInterval(() => {
        const categories = Object.keys(skillsData);
        const currentIndex = categories.indexOf(activeCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        setActiveCategory(categories[nextIndex]);
      }, 5000);
    }

    return () => {
      if (rotateInterval) clearInterval(rotateInterval);
    };
  }, [activeCategory, autoRotate]);


  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setAutoRotate(false); // Stop auto-rotation when user manually selects
    
    // Scroll skills list to top when category changes
    if (skillsListRef.current) {
      skillsListRef.current.scrollTop = 0;
    }
  };

  return (
    <div 
      className="skills-page"
    >
      {/* SIMPLE GRID BACKGROUND */}
      <div className="skills-grid">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-dot" style={{ 
            left: `${5 + (i % 5) * 20}%`,
            top: `${5 + Math.floor(i / 5) * 20}%`,
            animationDelay: `${i * 0.1}s`
          }} />
        ))}
      </div>

      <main className="skills-container">
        {/* HEADER */}
        <header className="skills-header">
          <button 
            className="back-button"
            onClick={() => navigate("/")}
            aria-label="Back to home"
          >
            <span className="back-arrow">←</span>
            <span className="back-text">Home</span>
          </button>
          
          <div className="header-content">
            <h1 className="skills-title">
              Skills<span className="accent-dot">.</span>
            </h1>
            <p className="skills-subtitle">
              Technologies I use to build exceptional digital experiences
            </p>
          </div>
        </header>

        {/* CATEGORY SELECTION - PILL STYLE */}
        <nav className="categories-pills">
          {Object.entries(skillsData).map(([key, category], index) => (
            <button
              key={key}
              className={`category-pill ${activeCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryClick(key)}
              onMouseEnter={() => setHoveredSkill(null)}
            >
              <span className="pill-number">0{index + 1}</span>
              <span className="pill-title">{category.title}</span>
              {activeCategory === key && (
                <div className="pill-indicator" />
              )}
            </button>
          ))}
        </nav>

        {/* SKILLS VISUALIZATION - SCROLLABLE */}
        <div className="skills-main">
          {/* LEFT: SCROLLABLE SKILLS LIST */}
          <div className="skills-left">
            <div className="skills-list-scrollable" ref={skillsListRef}>
              <div className="skills-list">
                {skillsData[activeCategory].items.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`skill-item ${hoveredSkill === skill.name ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="skill-header">
                      <div className="skill-name-container">
                        <span 
                          className="skill-name"
                          style={{ color: skill.color }}
                        >
                          {skill.name}
                        </span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      
                      {/* PROGRESS BAR (NO PERCENTAGE) */}
                      <div className="progress-container">
                        <div className="progress-track">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: skill.level === 'proficient' ? '100%' :
                                     skill.level === 'intermediate' ? '75%' :
                                     skill.level === 'basic' ? '50%' :
                                     skill.level === 'fundamental' ? '60%' :
                                     '40%',
                              backgroundColor: skill.color
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* LEVEL DESCRIPTION */}
                    <div className="skill-description">
                      {levelDescriptions[skill.level]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AUTO-ROTATE TOGGLE */}
            <div className="rotate-toggle">
              <span className="toggle-label">Auto-rotate categories</span>
              <button 
                className={`toggle-button ${autoRotate ? 'on' : 'off'}`}
                onClick={() => setAutoRotate(!autoRotate)}
                aria-label={autoRotate ? "Pause auto-rotation" : "Start auto-rotation"}
              >
                <div className="toggle-slider" />
              </button>
            </div>
          </div>

          {/* RIGHT: CATEGORY OVERVIEW */}
          <div className="skills-right">
            <div className="category-overview">
              <h2 className="overview-title">
                {skillsData[activeCategory].title}
                <span className="overview-count">
                  ({skillsData[activeCategory].items.length})
                </span>
              </h2>
              
              <div className="overview-stats">
                <div className="stat-item">
                  <span className="stat-value">
                    {skillsData[activeCategory].items.filter(s => s.level === 'proficient').length}
                  </span>
                  <span className="stat-label">Proficient</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {skillsData[activeCategory].items.filter(s => s.level === 'intermediate').length}
                  </span>
                  <span className="stat-label">Intermediate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {skillsData[activeCategory].items.filter(s => ['basic', 'fundamental', 'exposure'].includes(s.level)).length}
                  </span>
                  <span className="stat-label">Learning</span>
                </div>
              </div>

              {/* SKILL PILLS VISUALIZATION */}
              <div className="skill-pills">
                {skillsData[activeCategory].items.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-pill"
                    style={{ 
                      backgroundColor: skill.color + '20',
                      borderColor: skill.color,
                      color: skill.color
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span className="pill-name">{skill.name}</span>
                    <span className="pill-level">{skill.level}</span>
                  </div>
                ))}
              </div>

              {/* CATEGORY DESCRIPTION */}
              <div className="category-description">
                {activeCategory === 'languages' && (
                  <p>Core programming languages for system design, web development, and data manipulation.</p>
                )}
                {activeCategory === 'webDev' && (
                  <p>Modern web technologies for building scalable, responsive, and performant applications.</p>
                )}
                {activeCategory === 'databases' && (
                  <p>Database systems for data storage, retrieval, and management across different use cases.</p>
                )}
                {activeCategory === 'aiMl' && (
                  <p>Artificial Intelligence and Machine Learning fundamentals for intelligent system design.</p>
                )}
                {activeCategory === 'devOps' && (
                  <p>Development operations tools for version control, containerization, and workflow automation.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* COMPLETE STACK OVERVIEW - SIMPLE PILLS */}
        <div className="complete-stack">
          <h3 className="stack-title">Complete Tech Stack</h3>
          <p className="stack-subtitle">
            All {Object.values(skillsData).reduce((acc, cat) => acc + cat.items.length, 0)} technologies across categories
          </p>
          
          <div className="all-skills-pills">
            {Object.values(skillsData).map((category) => (
              category.items.map((skill) => (
                <div
                  key={skill.name}
                  className="stack-pill"
                  style={{ 
                    backgroundColor: skill.color + '15',
                    color: skill.color,
                    borderColor: skill.color
                  }}
                  onMouseEnter={() => {
                    setHoveredSkill(skill.name);
                    // Find and highlight the category
                    const categoryKey = Object.keys(skillsData).find(key => 
                      skillsData[key].items.some(s => s.name === skill.name)
                    );
                    if (categoryKey && categoryKey !== activeCategory) {
                      setActiveCategory(categoryKey);
                    }
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.name}
                </div>
              ))
            ))}
          </div>
        </div>

        {/* FOOTER NAVIGATION */}
        <footer className="skills-footer">
          <div className="nav-section">
            <div className="nav-group">
              <button 
                className="nav-button work-btn"
                onClick={() => navigate("/work")}
                aria-label="Back to work"
              >
                <div className="nav-icon">↑</div>
                <div className="nav-label">Work</div>
              </button>
              
              <div className="nav-divider" />
              
              <button
                className="nav-button about-btn"
                onClick={() => navigate("/about")}
                aria-label="Go to about"
              >
                <div className="nav-icon">↓</div>
                <div className="nav-label">About</div>
              </button>
            </div>
            
            <div className="nav-hint">
              
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Skills;