const workData = [
  {
    id: "socialflow",
    title: "SocialFlow",
    summary:
      "Developed a learning-focused, production-style social media platform inspired by Instagram with real-time interaction.",
    year: "2025",
    role: "Full Stack Developer",
    duration: "Jan 2025 – June 2025",

    technologies: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Socket.IO",
      "JWT",
      "REST APIs"
    ],

    problem:
      "Building modern social platforms requires combining real-time communication, user-generated content, and secure access patterns. For developers, these challenges are difficult to learn without building an end-to-end system that closely resembles production workflows. Many small-scale social apps miss real-time features, clean API design, and proper authentication, making them poor learning substitutes for real-world systems.",

    solution:
      "Built SocialFlow as a learning-focused, production-style social platform inspired by Instagram. Implemented core social features such as user authentication, profile pages, interactive user search, posts, likes, and comments using the MERN stack. Integrated Socket.IO to enable real-time one-to-one messaging, designed a dedicated Reels module for short-form video content exploration, and secured the backend using JWT-based authorization with a modular, maintainable API architecture.",

    result:
      "SocialFlow demonstrates a complete social media workflow with real-time interaction and secure access. The platform supports smooth navigation, instant messaging without page reloads, and clean separation of frontend and backend responsibilities. The project serves as a strong foundation for understanding how real-world social platforms are architected and extended.",

    metrics: [
      { value: "Real-time", label: "Chat using Socket.IO" },
      { value: "JWT-secured", label: "Authentication & authorization" },
      { value: "Modular", label: "Backend API structure" }
    ],

    learnings: [
      "Real-time systems require careful event lifecycle management to avoid memory leaks and inconsistent state",
      "Clean data modeling is critical for social features like likes, comments, and user relationships",
      "JWT-based security simplifies stateless authentication but requires careful token handling",
      "Scalability in social platforms depends more on architecture decisions than feature count"
    ]
  },
  {
    id: "intelligent-task-outsourcing",
    title: "Intelligent Task Outsourcing Platform",
    summary:
      "Building a production-style task outsourcing platform with intelligent freelancer recommendation and milestone-based workflows.",
    year: "2025",
    role: "Full Stack Developer",
    duration: "Dec 2025 – Ongoing",

    technologies: [
      "React.js",
      "Spring Boot",
      "MySQL",
      "JWT",
      "REST APIs"
    ],

    problem:
      "Task outsourcing platforms often struggle with fair freelancer selection, transparent progress tracking, and trust between clients and workers. Simple bidding or first-come models ignore key factors such as skill relevance, reliability, and current workload, leading to poor task outcomes and dissatisfaction on both sides.",

    solution:
      "Designed and developed an intelligent task outsourcing platform where clients post tasks and receive system-driven freelancer recommendations. Implemented a weighted scoring engine that evaluates freelancers based on skill match, historical success rate, deadline adherence, active workload, and past client ratings. Built milestone-based task submissions with review cycles, rejection cooldowns, deadline penalties, and fairness-focused rules to promote transparency and balanced opportunity.",

    result:
      "The platform enables structured task execution with clearer expectations and reduced bias in freelancer selection. By combining rule-based intelligence with transparent workflows, the system demonstrates how trust and fairness can be engineered into marketplace-style applications at a learning and prototype scale.",

    metrics: [
      { value: "Weighted", label: "Freelancer scoring model" },
      { value: "Milestone-based", label: "Task submission workflow" },
      { value: "JWT-secured", label: "Authentication & access control" }
    ],

    learnings: [
      "Recommendation quality improves significantly when multiple signals are weighted instead of relying on a single metric",
      "Fairness mechanisms are essential in two-sided marketplaces to prevent exploitation and burnout",
      "Designing milestone workflows requires careful state management and clear failure-handling rules",
      "Backend-driven authorization simplifies enforcing role-based platform rules"
    ]
  }

  
];

export default workData;