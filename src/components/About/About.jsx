import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  // Resume data
  const resumeData = {
    filename: "Sai_Sadwiik_Resume.pdf",
    url: "https://drive.google.com/file/d/1scgD213L1oG61FUJXTTxsp9qzc7OrcTL/view?usp=drive_link",
    lastUpdated: "January 2024",
    fileSize: "1.2 MB"
  };

  // Education data
  const btechEducation = {
    degree: "BTech Computer Science & Engineering",
    university: "KL University",
    duration: "2023 - 2027",
    gpa: "9.6/10.0",
    focus: "Software Engineering, Data Structures, Algorithms, DBMS"
  };

  const intermediateEducation = {
    qualification: "Intermediate (12th Grade)",
    board: "BIEAP",
    duration: "2021 - 2023",
    percentage: "93.4%",
    subjects: "Mathematics, Physics, Chemistry"
  };

  // Coding Profiles
  const codingProfiles = [
    {
      platform: "LeetCode",
      username: "sadwiik06",
      url: "https://leetcode.com/u/klu2300032291/",
      icon: "⚡",
      color: "#FFA116",
      stats: "200+ problems"
    },
    {
      platform: "GitHub",
      username: "sadwiik06",
      url: "https://github.com/sadwiik06",
      icon: "💻",
      color: "#181717",
      stats: "20+ repos"
    },
    {
      platform: "HackerRank",
      username: "sadwiik06",
      url: "https://www.hackerrank.com/profile/h2300032291",
      icon: "🏆",
      color: "#00EA64",
      stats: "5-star Java"
    },
    {
      platform: "Codeforces",
      username: "sadwiik06",
      url: "https://codeforces.com/profile/klu2300032291",
      icon: "🚀",
      color: "#3B5998",
      stats: "CP-31"
    }
  ];

  // Certifications
  const certifications = [
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    year: "2024",
    skills: [
      "MongoDB",
      "NoSQL Databases",
      "CRUD Operations",
      "Aggregation Framework",
      "Schema Design"
    ],
    verifyUrl: "#"
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: "2024",
    skills: [
      "Cloud Computing",
      "Microsoft Azure",
      "Cloud Concepts",
      "Azure Services",
      "Security & Compliance"
    ],
    verifyUrl: "#"
  }
];

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY < -50) navigate("/skills");
    };
    window.addEventListener("wheel", handleScroll, { once: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [navigate]);

  return (
    <div className="about-page">
      <main className="about-container">
        {/* HEADER */}
        <header className="about-header">
          <button className="back-button" onClick={() => navigate("/skills")}>
            ← Skills
          </button>
          <div className="header-content">
            <h1 className="about-title">About<span className="accent-dot">.</span></h1>
            <p className="about-subtitle">Academic background & coding profiles</p>
          </div>
        </header>

        {/* MAIN GRID - SIMPLE 2x2 */}
        <div className="main-grid">
          {/* TOP LEFT: CODING PROFILES */}
          <div className="grid-card coding-profiles">
            <h2 className="card-title">Coding Profiles</h2>
            <div className="profiles-grid">
              {codingProfiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-item"
                  style={{ '--profile-color': profile.color }}
                >
                  <div className="profile-icon">{profile.icon}</div>
                  <div className="profile-info">
                    <h4>{profile.platform}</h4>
                    <p className="profile-stats">{profile.stats}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* TOP RIGHT: B.TECH */}
          <div className="grid-card education">
            <h2 className="card-title">B.Tech Education</h2>
            <div className="education-content">
              <div className="edu-icon">🎓</div>
              <div className="edu-details">
                <h3>{btechEducation.degree}</h3>
                <p className="edu-meta">{btechEducation.university} • {btechEducation.duration}</p>
                <p className="edu-gpa">GPA: {btechEducation.gpa}</p>
                <p className="edu-focus">{btechEducation.focus}</p>
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT: RESUME */}
          <div className="grid-card resume">
            <h2 className="card-title">Resume</h2>
            <div className="resume-content">
              <div className="resume-icon">📄</div>
              <div className="resume-details">
                <h3>{resumeData.filename}</h3>
                <p className="resume-meta">Updated: {resumeData.lastUpdated} • {resumeData.fileSize}</p>
                <button 
                  className="open-resume"
                  onClick={() => window.open(resumeData.url, '_blank')}
                >
                  Open Resume →
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: INTERMEDIATE */}
          <div className="grid-card education">
            <h2 className="card-title">Intermediate Education</h2>
            <div className="education-content">
              <div className="edu-icon">📚</div>
              <div className="edu-details">
                <h3>{intermediateEducation.qualification}</h3>
                <p className="edu-meta">{intermediateEducation.board} • {intermediateEducation.duration}</p>
                <p className="edu-gpa">Percentage: {intermediateEducation.percentage}</p>
                <p className="edu-focus">{intermediateEducation.subjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="certifications-section">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert) => (
              <div 
                key={cert.title}
                className="cert-card"
                onClick={() => cert.verifyUrl && window.open(cert.verifyUrl, '_blank')}
              >
                <div className="cert-icon">📜</div>
                <div className="cert-details">
                  <h3>{cert.title}</h3>
                  <p className="cert-meta">{cert.issuer} • {cert.year}</p>
                  <div className="cert-tags">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="cert-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="about-footer">
          <div className="nav-buttons">
            <button onClick={() => navigate("/skills")}>↑ Skills</button>
            <button onClick={() => navigate("/contact")}>↓ Contact</button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default About;