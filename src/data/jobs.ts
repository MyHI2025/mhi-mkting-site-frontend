export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  fullDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
}

export const jobOpenings: Job[] = [
  {
    id: 1,
    title: "Sales Representative",
    department: "Sales Representative",
    location: "Abuja/Lagos (Hybrid)",
    type: "Internship",
    description: "Join MHI as a Sales Representative Intern to drive growth by identifying, engaging, and nurturing client relationships.",
    fullDescription: "As a Sales Representative Intern at My Health Integral, you will play a crucial role in driving our mission to transform healthcare accessibility across Africa. This position offers hands-on experience in healthcare sales, client relationship management, and business development within the rapidly growing digital health sector.",
    responsibilities: [
      "Identify and engage potential clients across healthcare sectors",
      "Build and maintain strong relationships with healthcare providers, patients, and partners",
      "Support lead generation and qualification processes",
      "Assist in developing sales strategies and market penetration tactics",
      "Participate in client presentations and product demonstrations",
      "Maintain accurate records of client interactions and sales activities",
      "Collaborate with marketing and product teams to optimize customer engagement",
      "Support contract negotiations and client onboarding processes"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, Healthcare Administration, or related field",
      "Strong communication and interpersonal skills",
      "Interest in healthcare technology and digital transformation",
      "Ability to work in a fast-paced, dynamic environment",
      "Basic understanding of sales processes and client relationship management",
      "Proficiency in Microsoft Office Suite and CRM tools",
      "Willingness to travel within Lagos/Abuja regions as needed",
      "Fluency in English; additional Nigerian languages are an advantage"
    ],
    benefits: [
      "Comprehensive training and mentorship program",
      "Exposure to cutting-edge healthcare technology",
      "Networking opportunities with industry leaders",
      "Performance-based recognition and growth opportunities",
      "Flexible hybrid working arrangement",
      "Access to health and wellness programs"
    ]
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Frontend Developer",
    location: "Remote",
    type: "Internship",
    description: "Shape user-facing components of our platform using modern frontend technologies.",
    fullDescription: "Join our engineering team as a Frontend Developer Intern and contribute to building the next generation of healthcare technology platforms. You'll work with React, TypeScript, and modern web technologies to create intuitive user interfaces that serve millions of healthcare users across Africa.",
    responsibilities: [
      "Develop responsive web applications using React and TypeScript",
      "Collaborate with UX/UI designers to implement pixel-perfect designs",
      "Build reusable component libraries and maintain design systems",
      "Optimize application performance and ensure cross-browser compatibility",
      "Work with backend teams to integrate APIs and manage application state",
      "Participate in code reviews and maintain high code quality standards",
      "Implement automated testing for frontend components",
      "Stay updated with latest frontend development trends and best practices"
    ],
    requirements: [
      "Strong proficiency in HTML, CSS, and JavaScript",
      "Experience with React and modern JavaScript frameworks",
      "Knowledge of TypeScript and component-based architecture",
      "Familiarity with version control systems (Git)",
      "Understanding of responsive design and mobile-first development",
      "Basic knowledge of testing frameworks (Jest, React Testing Library)",
      "Experience with build tools and package managers (Webpack, npm/yarn)",
      "Portfolio demonstrating frontend development projects"
    ],
    benefits: [
      "Mentorship from senior developers",
      "Exposure to modern development practices and technologies",
      "Flexible remote working environment",
      "Access to learning resources and professional development",
      "Opportunity to contribute to meaningful healthcare solutions",
      "Collaborative and innovative team culture"
    ]
  },
  {
    id: 3,
    title: "Backend Developer",
    department: "Backend Developer",
    location: "Remote",
    type: "Internship",
    description: "Assist in developing and maintaining backend systems using PHP, Node.js, MySQL, MongoDB, and Firebase.",
    fullDescription: "As a Backend Developer Intern at MHI, you'll work on the server-side infrastructure that powers our healthcare platform. This role offers comprehensive experience in backend technologies, database management, and API development within a healthcare context that prioritizes security, scalability, and reliability.",
    responsibilities: [
      "Develop and maintain RESTful APIs using Node.js and PHP",
      "Design and optimize database schemas in MySQL and MongoDB",
      "Implement secure authentication and authorization systems",
      "Work with Firebase for real-time data synchronization",
      "Monitor system performance and implement optimization strategies",
      "Participate in system architecture decisions and technical planning",
      "Ensure HIPAA compliance and healthcare data security standards",
      "Collaborate with frontend teams on API integration"
    ],
    requirements: [
      "Proficiency in Node.js and PHP development",
      "Experience with MySQL and MongoDB databases",
      "Understanding of RESTful API design principles",
      "Knowledge of Firebase services and real-time databases",
      "Familiarity with version control and collaborative development",
      "Basic understanding of security best practices",
      "Experience with cloud platforms (AWS, Google Cloud, or Azure)",
      "Strong problem-solving and debugging skills"
    ],
    benefits: [
      "Hands-on experience with enterprise-level systems",
      "Mentorship in healthcare technology development",
      "Exposure to scalable architecture patterns",
      "Remote-first work culture with flexible hours",
      "Professional development and certification opportunities",
      "Direct impact on healthcare accessibility in Africa"
    ]
  },
  {
    id: 4,
    title: "AI/ML Engineer",
    department: "AI/ML Engineer",
    location: "Remote",
    type: "Internship",
    description: "Develop and deploy machine learning models to enhance healthcare solutions.",
    fullDescription: "As an AI/ML Engineer Intern at My Health Integral, you'll work on developing and implementing machine learning solutions that directly impact healthcare delivery and patient outcomes across Africa. This role offers exposure to cutting-edge AI technologies in healthcare applications.",
    responsibilities: [
      "Develop machine learning models for healthcare prediction and diagnosis",
      "Work with large healthcare datasets and implement data preprocessing pipelines",
      "Deploy models to production environments and monitor their performance",
      "Collaborate with healthcare professionals to understand clinical requirements",
      "Research and implement state-of-the-art ML techniques in healthcare",
      "Optimize model performance and ensure scalability",
      "Document model development processes and maintain model versioning",
      "Participate in research initiatives and contribute to healthcare AI publications"
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, Data Science, or related field",
      "Strong proficiency in Python and ML libraries (TensorFlow, PyTorch, scikit-learn)",
      "Experience with data preprocessing and feature engineering",
      "Knowledge of deep learning architectures and techniques",
      "Understanding of statistical methods and data analysis",
      "Familiarity with cloud ML platforms (AWS SageMaker, Google AI Platform)",
      "Interest in healthcare applications and medical data analysis",
      "Strong analytical and problem-solving skills"
    ],
    benefits: [
      "Work on impactful healthcare AI projects",
      "Access to large healthcare datasets",
      "Mentorship from experienced AI researchers",
      "Flexible remote work environment",
      "Conference and research publication opportunities",
      "Professional development in AI and healthcare domains"
    ]
  },
  {
    id: 5,
    title: "Mobile App Developer",
    department: "Mobile App Developer",
    location: "Remote",
    type: "Internship",
    description: "Build and enhance our cross-platform mobile app using Flutter.",
    fullDescription: "Join our mobile development team as a Flutter Developer Intern and help create mobile applications that make healthcare accessible to millions across Africa. You'll work on cross-platform mobile solutions that connect patients with healthcare services.",
    responsibilities: [
      "Develop mobile applications using Flutter and Dart",
      "Implement responsive UI designs for both iOS and Android platforms",
      "Integrate mobile apps with backend APIs and services",
      "Optimize app performance and ensure smooth user experience",
      "Implement push notifications and real-time features",
      "Test applications across different devices and screen sizes",
      "Collaborate with designers to implement mobile-first designs",
      "Maintain app store submissions and updates"
    ],
    requirements: [
      "Experience with Flutter and Dart programming language",
      "Understanding of mobile app development lifecycle",
      "Knowledge of RESTful API integration",
      "Familiarity with mobile UI/UX design principles",
      "Experience with version control systems (Git)",
      "Understanding of app store deployment processes",
      "Knowledge of mobile security best practices",
      "Portfolio showcasing mobile app development projects"
    ],
    benefits: [
      "Work on high-impact mobile healthcare applications",
      "Mentorship from experienced mobile developers",
      "Exposure to latest mobile development technologies",
      "Flexible remote work arrangement",
      "Opportunity to reach millions of mobile users",
      "Professional development in mobile technologies"
    ]
  },
  {
    id: 6,
    title: "UI/UX Designer",
    department: "UI/UX Designer",
    location: "Remote",
    type: "Internship",
    description: "Design intuitive user interfaces and impactful experiences for web and mobile.",
    fullDescription: "As a UI/UX Designer Intern at My Health Integral, you'll be responsible for creating user-centered designs that make healthcare services accessible and intuitive. You'll work on designing interfaces for web and mobile platforms that serve diverse user groups across Africa.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs for web and mobile platforms",
      "Conduct user research and usability testing to inform design decisions",
      "Develop and maintain design systems and component libraries",
      "Collaborate with developers to ensure design implementation accuracy",
      "Design accessible interfaces that comply with WCAG guidelines",
      "Create user journey maps and information architecture",
      "Participate in design reviews and iterate based on feedback",
      "Stay updated with design trends and healthcare UX best practices"
    ],
    requirements: [
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Understanding of user-centered design principles",
      "Knowledge of web and mobile design patterns",
      "Experience with design systems and component libraries",
      "Basic understanding of HTML/CSS for design implementation",
      "Portfolio demonstrating UI/UX design projects",
      "Understanding of accessibility standards (WCAG 2.1)",
      "Strong communication and presentation skills"
    ],
    benefits: [
      "Work on meaningful healthcare design projects",
      "Mentorship from experienced UX designers",
      "Access to user research and testing opportunities",
      "Flexible remote work environment",
      "Portfolio building with real-world projects",
      "Professional development in healthcare UX design"
    ]
  },
  {
    id: 7,
    title: "Head of Technology",
    department: "Head of Technology",
    location: "Remote",
    type: "Full-time",
    description: "Lead all technical aspects of our platform development from strategy to execution.",
    fullDescription: "As Head of Technology at My Health Integral, you will lead our technical vision and strategy while managing a distributed team of engineers and developers. This senior leadership role requires expertise in healthcare technology, team management, and strategic planning.",
    responsibilities: [
      "Define and execute the technical strategy and roadmap for MHI's platforms",
      "Lead and manage engineering teams across frontend, backend, mobile, and AI/ML domains",
      "Oversee system architecture decisions and ensure scalability and security",
      "Collaborate with executive team on product strategy and business objectives",
      "Establish engineering best practices, code quality standards, and development workflows",
      "Manage technology budget and resource allocation",
      "Ensure HIPAA compliance and healthcare regulatory requirements",
      "Drive innovation in healthcare technology and digital transformation",
      "Build and maintain relationships with technology partners and vendors",
      "Recruit and mentor top engineering talent"
    ],
    requirements: [
      "10+ years of experience in technology leadership roles",
      "Strong background in healthcare technology and digital health platforms",
      "Experience managing distributed engineering teams",
      "Proven track record of scaling technology platforms",
      "Deep understanding of cloud infrastructure, security, and compliance",
      "Experience with modern web technologies, mobile development, and AI/ML",
      "Strong leadership, communication, and strategic thinking skills",
      "MBA or advanced degree in Computer Science or related field preferred",
      "Experience with healthcare regulatory compliance (HIPAA, FDA)",
      "Track record of successful product launches and technical innovation"
    ],
    benefits: [
      "Competitive executive compensation package",
      "Equity participation in high-growth healthcare technology company",
      "Opportunity to lead technology transformation in African healthcare",
      "Flexible remote work with travel opportunities",
      "Executive development and leadership programs",
      "Direct impact on millions of healthcare users across Africa"
    ]
  },
  {
    id: 8,
    title: "Human Resources Officer",
    department: "Human Resources Officer",
    location: "Remote",
    type: "Volunteer",
    description: "Support MHI's HR operations by developing policies, managing employee relations, and fostering a productive work environment.",
    fullDescription: "As a Volunteer Human Resources Officer, you'll contribute to building and maintaining a positive organizational culture at My Health Integral while supporting our mission to transform healthcare accessibility across Africa.",
    responsibilities: [
      "Develop and implement HR policies and procedures",
      "Support recruitment and onboarding processes",
      "Manage employee relations and resolve workplace issues",
      "Coordinate performance management and review processes",
      "Assist with employee development and training programs",
      "Maintain HR records and ensure compliance with labor laws",
      "Support organizational development initiatives",
      "Contribute to diversity and inclusion programs"
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Psychology, or related field",
      "HR certification or relevant professional development",
      "Understanding of employment law and HR best practices",
      "Strong interpersonal and communication skills",
      "Experience with HR information systems",
      "Ability to handle confidential information discretely",
      "Passion for healthcare and social impact"
    ],
    benefits: [
      "Professional development in healthcare HR",
      "Flexible volunteer schedule",
      "Networking with healthcare professionals",
      "Contribution to meaningful healthcare mission",
      "Letter of recommendation upon completion"
    ]
  },
  {
    id: 9,
    title: "Customer Support Officer",
    department: "Customer Support Officer",
    location: "Remote",
    type: "Volunteer",
    description: "Support MHI's users by delivering timely and professional assistance across digital platforms, ensuring satisfaction and service excellence.",
    fullDescription: "As a Volunteer Customer Support Officer, you'll be the first point of contact for our healthcare platform users, providing exceptional support and ensuring positive user experiences across our digital health services.",
    responsibilities: [
      "Respond to user inquiries via chat, email, and phone",
      "Troubleshoot technical issues and provide platform guidance",
      "Document customer interactions and feedback",
      "Escalate complex issues to appropriate teams",
      "Maintain knowledge base and support documentation",
      "Conduct user satisfaction surveys",
      "Support onboarding for new platform users",
      "Collaborate with product team on user experience improvements"
    ],
    requirements: [
      "Excellent communication and customer service skills",
      "Technical aptitude for troubleshooting software issues",
      "Patience and empathy when dealing with healthcare-related inquiries",
      "Ability to work independently in remote environment",
      "Proficiency in customer support tools and platforms",
      "Multilingual capabilities preferred",
      "Interest in healthcare technology"
    ],
    benefits: [
      "Customer service experience in healthcare technology",
      "Flexible volunteer schedule",
      "Training in healthcare platform operations",
      "Direct impact on user satisfaction",
      "Professional reference upon completion"
    ]
  },
  {
    id: 10,
    title: "Graphic Designer",
    department: "Graphic Designer",
    location: "Remote",
    type: "Volunteer",
    description: "Design visually compelling graphics that support MHI's brand identity, marketing efforts, and audience engagement across platforms.",
    fullDescription: "As a Volunteer Graphic Designer, you'll create visual content that communicates MHI's mission and enhances our brand presence across digital platforms, supporting our healthcare transformation initiatives through impactful design.",
    responsibilities: [
      "Create marketing materials, social media graphics, and web assets",
      "Develop brand-consistent visual content for campaigns",
      "Design presentations and educational materials",
      "Support website and app interface design",
      "Create infographics for healthcare education",
      "Maintain brand consistency across all visual communications",
      "Collaborate with marketing team on campaign visuals",
      "Design print materials for events and partnerships"
    ],
    requirements: [
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Strong portfolio demonstrating graphic design skills",
      "Understanding of brand identity and visual consistency",
      "Knowledge of web design principles and digital formats",
      "Ability to work with brand guidelines",
      "Creative thinking and attention to detail",
      "Interest in healthcare and social impact design"
    ],
    benefits: [
      "Portfolio building with healthcare industry projects",
      "Flexible volunteer schedule",
      "Creative freedom in meaningful projects",
      "Exposure to healthcare marketing",
      "Professional reference and portfolio pieces"
    ]
  },
  {
    id: 11,
    title: "Content Creator/Writer",
    department: "Content Creator/Writer",
    location: "Remote",
    type: "Volunteer",
    description: "Create compelling and informative written content to support MHI's brand messaging, user education, and audience engagement.",
    fullDescription: "As a Volunteer Content Creator/Writer, you'll develop written content that educates users about digital healthcare, promotes MHI's services, and supports our mission to make healthcare accessible across Africa.",
    responsibilities: [
      "Write blog posts, articles, and web content about digital healthcare",
      "Create user guides and educational materials",
      "Develop social media content and captions",
      "Write email newsletters and marketing copy",
      "Create case studies and success stories",
      "Edit and proofread content for accuracy and consistency",
      "Research healthcare trends and topics",
      "Collaborate with subject matter experts on technical content"
    ],
    requirements: [
      "Excellent writing and communication skills",
      "Experience in content creation and copywriting",
      "Understanding of SEO principles and content optimization",
      "Ability to write for diverse audiences",
      "Research skills for healthcare and technology topics",
      "Familiarity with content management systems",
      "Interest in healthcare and digital transformation"
    ],
    benefits: [
      "Writing experience in healthcare industry",
      "Portfolio building with published content",
      "Flexible volunteer schedule",
      "Education in healthcare technology",
      "Professional writing references"
    ]
  },
  {
    id: 12,
    title: "Video Content Creator/Editor",
    department: "Video Content Creator/Editor",
    location: "Remote",
    type: "Volunteer",
    description: "Produce engaging video content to enhance MHI's brand, educate users, and promote digital health services across various platforms.",
    fullDescription: "As a Volunteer Video Content Creator/Editor, you'll produce video content that showcases MHI's impact, educates users about digital healthcare, and promotes our services through compelling visual storytelling.",
    responsibilities: [
      "Create and edit promotional and educational videos",
      "Develop video content for social media platforms",
      "Edit testimonials and case study videos",
      "Create animated explainer videos for healthcare topics",
      "Manage video content workflow from concept to publication",
      "Optimize videos for different platforms and formats",
      "Collaborate with marketing team on video campaigns",
      "Maintain video content library and archives"
    ],
    requirements: [
      "Proficiency in video editing software (Adobe Premiere, After Effects, Final Cut)",
      "Experience in video production and post-production",
      "Understanding of video optimization for social media",
      "Creative storytelling abilities",
      "Knowledge of animation and motion graphics preferred",
      "Portfolio demonstrating video content creation",
      "Interest in healthcare communication"
    ],
    benefits: [
      "Video production experience in healthcare sector",
      "Portfolio building with professional projects",
      "Flexible volunteer schedule",
      "Access to professional video content tools",
      "Creative freedom in meaningful projects"
    ]
  },
  {
    id: 13,
    title: "Social Media Manager",
    department: "Social Media Manager",
    location: "Remote",
    type: "Volunteer",
    description: "Manage MHI's social media presence to build community, drive engagement, and promote brand-aligned digital health content.",
    fullDescription: "As a Volunteer Social Media Manager, you'll develop and execute social media strategies that build community around digital healthcare, engage our audience, and promote MHI's mission across multiple platforms.",
    responsibilities: [
      "Develop and implement social media strategy across platforms",
      "Create and schedule social media content",
      "Engage with followers and respond to comments/messages",
      "Monitor social media metrics and analyze performance",
      "Coordinate social media campaigns and promotions",
      "Collaborate with content creators on social media assets",
      "Stay updated on social media trends and best practices",
      "Build online community around healthcare topics"
    ],
    requirements: [
      "Experience managing social media accounts for organizations",
      "Knowledge of social media platforms and their unique characteristics",
      "Understanding of social media analytics and reporting",
      "Creative content development skills",
      "Excellent communication and engagement abilities",
      "Familiarity with social media management tools",
      "Interest in healthcare and community building"
    ],
    benefits: [
      "Social media management experience in healthcare",
      "Community building and engagement skills",
      "Flexible volunteer schedule",
      "Access to social media management tools",
      "Professional reference in digital marketing"
    ]
  },
  {
    id: 14,
    title: "Legal and Compliance Associate",
    department: "Legal and Compliance Associate",
    location: "Remote",
    type: "Volunteer",
    description: "Provide legal support to ensure MHI's operations comply with applicable laws and industry standards, with a focus on contracts, compliance, and healthcare regulations.",
    fullDescription: "As a Volunteer Legal and Compliance Associate, you'll support MHI's legal and regulatory compliance efforts, ensuring our healthcare platform operates within applicable laws and industry standards while supporting our mission to transform healthcare accessibility.",
    responsibilities: [
      "Review and draft contracts and legal documents",
      "Ensure compliance with healthcare regulations and data privacy laws",
      "Support intellectual property protection initiatives",
      "Assist with regulatory submissions and documentation",
      "Conduct legal research on healthcare and technology issues",
      "Support partnership agreement negotiations",
      "Maintain compliance documentation and policies",
      "Provide legal guidance on business operations"
    ],
    requirements: [
      "Law degree or paralegal certification",
      "Understanding of healthcare regulations and compliance",
      "Knowledge of data privacy laws (HIPAA, GDPR)",
      "Experience with contract review and drafting",
      "Research and analytical skills",
      "Attention to detail and accuracy",
      "Interest in healthcare technology legal issues"
    ],
    benefits: [
      "Legal experience in healthcare technology sector",
      "Exposure to regulatory compliance issues",
      "Professional legal reference",
      "Flexible volunteer schedule",
      "Networking with healthcare legal professionals"
    ]
  },
  {
    id: 15,
    title: "Finance Officer",
    department: "Finance Officer",
    location: "Remote",
    type: "Volunteer",
    description: "Oversee MHI's financial operations, ensuring resource efficiency, accurate reporting, and compliance to support organizational growth.",
    fullDescription: "As a Volunteer Finance Officer, you'll support MHI's financial management and reporting, ensuring fiscal responsibility while supporting our mission to transform healthcare accessibility through sound financial practices.",
    responsibilities: [
      "Assist with financial planning and budgeting processes",
      "Support financial reporting and analysis",
      "Monitor expenses and ensure budget compliance",
      "Assist with grant applications and funding proposals",
      "Support accounts payable and receivable processes",
      "Maintain financial records and documentation",
      "Assist with financial audits and compliance",
      "Analyze financial performance and trends"
    ],
    requirements: [
      "Bachelor's degree in Finance, Accounting, or related field",
      "Understanding of financial principles and accounting practices",
      "Experience with financial software and spreadsheet applications",
      "Analytical and problem-solving skills",
      "Attention to detail and accuracy",
      "Knowledge of nonprofit financial management preferred",
      "Interest in healthcare and social impact finance"
    ],
    benefits: [
      "Financial management experience in healthcare sector",
      "Exposure to nonprofit and social impact finance",
      "Professional financial reference",
      "Flexible volunteer schedule",
      "Contribution to meaningful healthcare mission"
    ]
  },
  {
    id: 16,
    title: "Project Manager",
    department: "Project Manager",
    location: "Remote",
    type: "Volunteer",
    description: "Lead cross-functional teams to plan and execute strategic projects that drive MHI's mission and operational efficiency.",
    fullDescription: "As a Volunteer Project Manager, you'll coordinate strategic initiatives and cross-functional projects that advance MHI's mission to transform healthcare accessibility, ensuring successful project delivery and organizational growth.",
    responsibilities: [
      "Plan and manage strategic projects from initiation to completion",
      "Coordinate cross-functional teams and stakeholders",
      "Develop project timelines, budgets, and resource plans",
      "Monitor project progress and ensure deliverable quality",
      "Facilitate project meetings and communication",
      "Manage project risks and implement mitigation strategies",
      "Report project status to leadership and stakeholders",
      "Implement project management best practices"
    ],
    requirements: [
      "PMP certification or equivalent project management experience",
      "Experience managing complex projects with multiple stakeholders",
      "Proficiency in project management tools and methodologies",
      "Strong leadership and communication skills",
      "Problem-solving and critical thinking abilities",
      "Understanding of healthcare or technology projects preferred",
      "Ability to work effectively in remote environment"
    ],
    benefits: [
      "Project management experience in healthcare technology",
      "Leadership development opportunities",
      "Professional project management reference",
      "Flexible volunteer schedule",
      "Direct impact on healthcare accessibility projects"
    ]
  },
  {
    id: 17,
    title: "Executive Assistant",
    department: "Executive Assistant",
    location: "Remote",
    type: "Volunteer",
    description: "Support MHI's executive team with administrative coordination, communication, and scheduling to ensure smooth organizational operations.",
    fullDescription: "As a Volunteer Executive Assistant, you'll provide high-level administrative support to MHI's executive team, ensuring efficient operations and communication while supporting our mission to transform healthcare accessibility.",
    responsibilities: [
      "Manage executive calendars and scheduling",
      "Coordinate meetings and prepare meeting materials",
      "Handle executive correspondence and communication",
      "Support travel planning and logistics",
      "Manage executive projects and follow-up on action items",
      "Prepare reports and presentations for leadership",
      "Coordinate with internal and external stakeholders",
      "Maintain confidential files and documentation"
    ],
    requirements: [
      "Experience as executive assistant or in similar administrative role",
      "Excellent organizational and time management skills",
      "Professional communication and interpersonal abilities",
      "Proficiency in office software and productivity tools",
      "Discretion and ability to handle confidential information",
      "Proactive problem-solving approach",
      "Interest in supporting healthcare mission"
    ],
    benefits: [
      "Executive-level administrative experience",
      "Exposure to healthcare industry leadership",
      "Professional reference from executive team",
      "Flexible volunteer schedule",
      "Direct support to impactful healthcare initiatives"
    ]
  },
  {
    id: 18,
    title: "UI/UX Designer (Volunteer)",
    department: "UI/UX Designer",
    location: "Remote",
    type: "Volunteer",
    description: "Design intuitive and accessible user interfaces that enhance user experience across MHI's digital health platforms.",
    fullDescription: "As a Volunteer UI/UX Designer, you'll create user-centered designs that make our healthcare platforms intuitive and accessible, directly contributing to improved healthcare experiences for users across Africa.",
    responsibilities: [
      "Design user interfaces for web and mobile healthcare platforms",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and design specifications",
      "Ensure accessibility compliance in all designs",
      "Collaborate with development teams on implementation",
      "Maintain and evolve design systems",
      "Optimize user flows and information architecture",
      "Design for diverse user groups and accessibility needs"
    ],
    requirements: [
      "Portfolio demonstrating UI/UX design skills",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Understanding of user-centered design principles",
      "Knowledge of accessibility standards (WCAG 2.1)",
      "Experience with design systems and component libraries",
      "Understanding of web and mobile design patterns",
      "Interest in healthcare user experience design"
    ],
    benefits: [
      "Healthcare UX design portfolio building",
      "Experience designing for social impact",
      "Flexible volunteer schedule",
      "Mentorship from design professionals",
      "Contribution to accessible healthcare technology"
    ]
  },
  {
    id: 19,
    title: "Frontend Developer (Volunteer)",
    department: "Frontend Developer",
    location: "Remote",
    type: "Volunteer",
    description: "Develop and maintain user-facing components of MHI's digital platforms, ensuring responsive, accessible, and engaging user experiences.",
    fullDescription: "As a Volunteer Frontend Developer, you'll contribute to building responsive and accessible web applications that serve healthcare users across Africa, using modern technologies to create impactful digital health experiences.",
    responsibilities: [
      "Develop responsive web applications using modern JavaScript frameworks",
      "Implement accessible user interfaces following WCAG guidelines",
      "Optimize application performance and cross-browser compatibility",
      "Collaborate with designers to implement pixel-perfect designs",
      "Integrate frontend applications with backend APIs",
      "Write and maintain automated tests for frontend components",
      "Contribute to frontend architecture and technology decisions",
      "Participate in code reviews and maintain coding standards"
    ],
    requirements: [
      "Strong proficiency in HTML, CSS, and JavaScript",
      "Experience with modern frontend frameworks (React, Vue, Angular)",
      "Understanding of responsive design and mobile-first development",
      "Knowledge of accessibility principles and implementation",
      "Familiarity with version control systems (Git)",
      "Experience with frontend build tools and workflows",
      "Portfolio demonstrating frontend development projects"
    ],
    benefits: [
      "Frontend development experience in healthcare technology",
      "Open source contribution opportunities",
      "Mentorship from experienced developers",
      "Flexible volunteer schedule",
      "Direct impact on healthcare accessibility"
    ]
  },
  {
    id: 20,
    title: "Backend Developer (Volunteer)",
    department: "Backend Developer",
    location: "Remote",
    type: "Volunteer",
    description: "Design and maintain the server-side components of MHI's platforms, focusing on secure, efficient, and scalable backend systems.",
    fullDescription: "As a Volunteer Backend Developer, you'll work on the server-side infrastructure that powers our healthcare platforms, ensuring secure, scalable, and reliable systems that serve healthcare users across Africa.",
    responsibilities: [
      "Develop and maintain RESTful APIs and backend services",
      "Design and optimize database schemas and queries",
      "Implement secure authentication and authorization systems",
      "Ensure system scalability and performance optimization",
      "Implement security best practices for healthcare data",
      "Monitor system performance and implement logging",
      "Collaborate with frontend teams on API design",
      "Participate in system architecture decisions"
    ],
    requirements: [
      "Strong proficiency in backend programming languages",
      "Experience with database design and optimization",
      "Understanding of RESTful API design principles",
      "Knowledge of security best practices",
      "Familiarity with cloud platforms and deployment",
      "Experience with version control and collaborative development",
      "Understanding of healthcare data privacy requirements"
    ],
    benefits: [
      "Backend development experience in healthcare",
      "Exposure to scalable system architecture",
      "Mentorship from senior developers",
      "Flexible volunteer schedule",
      "Contribution to secure healthcare technology"
    ]
  },
  {
    id: 21,
    title: "Market Researcher/Research Analyst",
    department: "Market Researcher/Research Analyst",
    location: "Remote",
    type: "Volunteer",
    description: "Conduct research and analysis to support MHI's digital health strategies, uncover market trends, and guide decision-making.",
    fullDescription: "As a Volunteer Market Researcher/Research Analyst, you'll conduct market research and analysis that informs MHI's strategic decisions and helps identify opportunities to expand healthcare accessibility across Africa.",
    responsibilities: [
      "Conduct market research on healthcare technology trends",
      "Analyze competitive landscape and market opportunities",
      "Research target demographics and user behavior",
      "Compile and analyze market data and statistics",
      "Prepare research reports and presentations",
      "Support strategic planning with market insights",
      "Monitor industry developments and regulatory changes",
      "Collaborate with teams to inform product development"
    ],
    requirements: [
      "Background in market research, business analysis, or related field",
      "Strong analytical and data interpretation skills",
      "Proficiency in research methodologies and tools",
      "Excellent written and verbal communication skills",
      "Experience with survey design and data collection",
      "Knowledge of statistical analysis and reporting",
      "Interest in healthcare markets and technology trends"
    ],
    benefits: [
      "Market research experience in healthcare technology",
      "Exposure to African healthcare market dynamics",
      "Professional research reference",
      "Flexible volunteer schedule",
      "Direct contribution to strategic decision-making"
    ]
  },
  {
    id: 22,
    title: "AI/ML Engineer (Volunteer)",
    department: "AI/ML Engineer",
    location: "Remote",
    type: "Volunteer",
    description: "Design and deploy AI and machine learning models to improve MHI's digital health solutions and patient outcomes.",
    fullDescription: "As a Volunteer AI/ML Engineer, you'll develop artificial intelligence and machine learning solutions that enhance healthcare delivery and improve patient outcomes through data-driven insights and automated systems.",
    responsibilities: [
      "Develop machine learning models for healthcare applications",
      "Implement data preprocessing and feature engineering pipelines",
      "Deploy models to production and monitor performance",
      "Research and implement state-of-the-art ML techniques",
      "Collaborate with healthcare professionals on model requirements",
      "Ensure model accuracy, fairness, and interpretability",
      "Document model development and deployment processes",
      "Stay updated on AI/ML developments in healthcare"
    ],
    requirements: [
      "Strong background in machine learning and data science",
      "Proficiency in Python and ML frameworks",
      "Experience with data preprocessing and model deployment",
      "Understanding of healthcare data and applications",
      "Knowledge of model evaluation and validation techniques",
      "Experience with cloud ML platforms preferred",
      "Interest in AI applications for social good"
    ],
    benefits: [
      "AI/ML experience in healthcare applications",
      "Opportunity to work on impactful ML projects",
      "Access to healthcare datasets and use cases",
      "Mentorship from AI/ML professionals",
      "Contribution to AI for social good initiatives"
    ]
  },
  {
    id: 23,
    title: "Business Development Officer",
    department: "Business Development Officer",
    location: "Remote",
    type: "Volunteer",
    description: "Identify and develop new business opportunities and strategic partnerships to drive growth for MHI.",
    fullDescription: "As a Volunteer Business Development Officer, you'll identify and pursue strategic partnerships and business opportunities that expand MHI's reach and impact in transforming healthcare accessibility across Africa.",
    responsibilities: [
      "Identify potential partnership opportunities and business development prospects",
      "Research and analyze market opportunities for expansion",
      "Support partnership negotiations and agreement development",
      "Develop business development strategies and proposals",
      "Build relationships with key stakeholders and partners",
      "Support market entry and expansion initiatives",
      "Analyze competitive landscape and positioning",
      "Collaborate with leadership on strategic planning"
    ],
    requirements: [
      "Background in business development or strategic partnerships",
      "Strong networking and relationship building skills",
      "Understanding of healthcare industry dynamics",
      "Excellent communication and presentation abilities",
      "Analytical skills for market and opportunity analysis",
      "Experience with partnership development preferred",
      "Interest in healthcare technology and social impact"
    ],
    benefits: [
      "Business development experience in healthcare technology",
      "Network building with industry professionals",
      "Strategic thinking and partnership development skills",
      "Flexible volunteer schedule",
      "Direct impact on MHI's growth and expansion"
    ]
  },
  {
    id: 24,
    title: "Business and Financial Analyst",
    department: "Business and Financial Analyst",
    location: "Remote",
    type: "Volunteer",
    description: "Support strategic decisions through financial analysis, forecasting, and budgeting to ensure effective resource allocation.",
    fullDescription: "As a Volunteer Business and Financial Analyst, you'll provide analytical support for strategic decision-making through financial modeling, forecasting, and business analysis that guides MHI's growth and resource allocation.",
    responsibilities: [
      "Conduct financial analysis and modeling for strategic initiatives",
      "Support budgeting and forecasting processes",
      "Analyze business performance metrics and KPIs",
      "Prepare financial reports and presentations",
      "Support investment and funding analysis",
      "Conduct cost-benefit analysis for projects and initiatives",
      "Monitor financial performance against budgets and forecasts",
      "Collaborate with teams on business planning and analysis"
    ],
    requirements: [
      "Strong background in finance, accounting, or business analysis",
      "Proficiency in financial modeling and analysis tools",
      "Experience with budgeting and forecasting processes",
      "Strong analytical and problem-solving skills",
      "Excellent Excel and presentation skills",
      "Understanding of business metrics and KPIs",
      "Interest in healthcare industry financial analysis"
    ],
    benefits: [
      "Financial analysis experience in healthcare sector",
      "Strategic planning and business modeling skills",
      "Professional financial analysis reference",
      "Flexible volunteer schedule",
      "Contribution to data-driven decision making"
    ]
  },
  {
    id: 25,
    title: "Business Analyst",
    department: "Business Analyst",
    location: "Remote",
    type: "Volunteer",
    description: "Analyze business processes and develop solutions to improve operational efficiency and service delivery.",
    fullDescription: "As a Volunteer Business Analyst, you'll analyze MHI's business processes and systems to identify improvement opportunities and support the optimization of our healthcare service delivery.",
    responsibilities: [
      "Analyze business processes and identify improvement opportunities",
      "Document business requirements and functional specifications",
      "Support process improvement and optimization initiatives",
      "Conduct stakeholder interviews and requirements gathering",
      "Develop business process documentation and workflows",
      "Support system implementation and user acceptance testing",
      "Analyze data to support business decision-making",
      "Collaborate with teams on process design and improvement"
    ],
    requirements: [
      "Background in business analysis or process improvement",
      "Strong analytical and problem-solving abilities",
      "Experience with business process documentation",
      "Understanding of systems analysis and design",
      "Excellent communication and documentation skills",
      "Knowledge of process improvement methodologies",
      "Interest in healthcare operations and efficiency"
    ],
    benefits: [
      "Business analysis experience in healthcare technology",
      "Process improvement and optimization skills",
      "Systems analysis and documentation experience",
      "Flexible volunteer schedule",
      "Direct contribution to operational excellence"
    ]
  },
  {
    id: 26,
    title: "Fullstack Developer",
    department: "Fullstack Developer",
    location: "Remote",
    type: "Volunteer",
    description: "Design and maintain frontend and backend components to build scalable and secure digital health applications.",
    fullDescription: "As a Volunteer Fullstack Developer, you'll work on both frontend and backend components of MHI's healthcare platforms, contributing to the development of comprehensive digital health solutions that serve users across Africa.",
    responsibilities: [
      "Develop both frontend and backend components of web applications",
      "Design and implement full-stack solutions for healthcare use cases",
      "Integrate frontend applications with backend APIs and databases",
      "Ensure application security and performance optimization",
      "Implement responsive design and cross-browser compatibility",
      "Write and maintain automated tests for full-stack applications",
      "Collaborate with designers and stakeholders on feature development",
      "Participate in code reviews and maintain coding standards"
    ],
    requirements: [
      "Strong proficiency in both frontend and backend technologies",
      "Experience with modern web development frameworks",
      "Understanding of database design and API development",
      "Knowledge of web security best practices",
      "Familiarity with cloud deployment and DevOps practices",
      "Experience with version control and collaborative development",
      "Portfolio demonstrating full-stack development projects"
    ],
    benefits: [
      "Full-stack development experience in healthcare technology",
      "Comprehensive web development skills building",
      "Mentorship from experienced developers",
      "Flexible volunteer schedule",
      "End-to-end contribution to healthcare applications"
    ]
  },
  {
    id: 27,
    title: "Medical Laboratory Scientist",
    department: "Medical Laboratory Scientist",
    location: "Remote",
    type: "Volunteer",
    description: "Validate and refine MHI's platform features to support laboratory operations with a focus on clinical standards and usability.",
    fullDescription: "As a Volunteer Medical Laboratory Scientist, you'll provide clinical expertise to enhance MHI's laboratory platform features, ensuring they meet clinical standards and support effective laboratory operations across Africa.",
    responsibilities: [
      "Review and validate laboratory workflow features in MHI platforms",
      "Provide clinical input on laboratory result interpretation and reporting",
      "Support development of laboratory quality control features",
      "Ensure compliance with clinical laboratory standards",
      "Test laboratory-focused platform features and provide feedback",
      "Contribute to laboratory education and training materials",
      "Support integration with laboratory information systems",
      "Provide expertise on laboratory data management and security"
    ],
    requirements: [
      "Bachelor's degree in Medical Laboratory Science or related field",
      "Professional certification and clinical laboratory experience",
      "Understanding of laboratory information systems",
      "Knowledge of clinical laboratory standards and regulations",
      "Experience with laboratory quality control and assurance",
      "Strong attention to detail and analytical skills",
      "Interest in digital health and laboratory technology"
    ],
    benefits: [
      "Healthcare technology experience in laboratory domain",
      "Contribution to laboratory digital transformation",
      "Professional development in health tech",
      "Flexible volunteer schedule",
      "Direct impact on laboratory service accessibility"
    ]
  },
  {
    id: 28,
    title: "Radiologist",
    department: "Radiologist",
    location: "Remote",
    type: "Volunteer",
    description: "Validate and refine MHI's platform features supporting imaging operations to meet clinical and industry standards.",
    fullDescription: "As a Volunteer Radiologist, you'll provide clinical expertise to enhance MHI's imaging platform features, ensuring they support effective radiology operations and meet clinical standards for imaging services.",
    responsibilities: [
      "Review and validate imaging workflow features in MHI platforms",
      "Provide clinical input on imaging result interpretation and reporting",
      "Support development of imaging quality control features",
      "Ensure compliance with radiology clinical standards",
      "Test imaging-focused platform features and provide feedback",
      "Contribute to radiology education and training materials",
      "Support integration with Picture Archiving and Communication Systems (PACS)",
      "Provide expertise on imaging data management and security"
    ],
    requirements: [
      "Medical degree with specialization in Radiology",
      "Board certification and clinical radiology experience",
      "Understanding of medical imaging systems and PACS",
      "Knowledge of radiology clinical standards and regulations",
      "Experience with imaging quality control and assurance",
      "Strong analytical and diagnostic skills",
      "Interest in digital health and imaging technology"
    ],
    benefits: [
      "Healthcare technology experience in radiology domain",
      "Contribution to imaging digital transformation",
      "Professional development in health tech",
      "Flexible volunteer schedule",
      "Direct impact on imaging service accessibility"
    ]
  },
  {
    id: 29,
    title: "Pharmacist",
    department: "Pharmacist",
    location: "Remote",
    type: "Volunteer",
    description: "Validate and refine MHI's platform features for pharmacy operations, ensuring regulatory compliance and operational effectiveness.",
    fullDescription: "As a Volunteer Pharmacist, you'll provide pharmaceutical expertise to enhance MHI's pharmacy platform features, ensuring they support effective pharmacy operations and meet regulatory standards for pharmaceutical services.",
    responsibilities: [
      "Review and validate pharmacy workflow features in MHI platforms",
      "Provide clinical input on medication management and dispensing processes",
      "Support development of pharmacy quality control and safety features",
      "Ensure compliance with pharmaceutical regulations and standards",
      "Test pharmacy-focused platform features and provide feedback",
      "Contribute to pharmacy education and patient counseling materials",
      "Support integration with pharmacy information systems",
      "Provide expertise on pharmaceutical data management and security"
    ],
    requirements: [
      "Doctor of Pharmacy degree or equivalent",
      "Licensed pharmacist with clinical pharmacy experience",
      "Understanding of pharmacy information systems",
      "Knowledge of pharmaceutical regulations and standards",
      "Experience with medication management and patient counseling",
      "Strong attention to detail and patient safety focus",
      "Interest in digital health and pharmacy technology"
    ],
    benefits: [
      "Healthcare technology experience in pharmacy domain",
      "Contribution to pharmacy digital transformation",
      "Professional development in health tech",
      "Flexible volunteer schedule",
      "Direct impact on pharmaceutical service accessibility"
    ]
  },
  {
    id: 30,
    title: "Physician",
    department: "Physician",
    location: "Remote",
    type: "Volunteer",
    description: "Validate and refine MHI's platform features for private practitioners, patients, and healthcare facilities, ensuring clinical and operational standards.",
    fullDescription: "As a Volunteer Physician, you'll provide clinical expertise to enhance MHI's healthcare platform features, ensuring they support effective medical practice and meet clinical standards for patient care delivery.",
    responsibilities: [
      "Review and validate clinical workflow features in MHI platforms",
      "Provide clinical input on patient care processes and documentation",
      "Support development of clinical decision support features",
      "Ensure compliance with medical practice standards",
      "Test physician-focused platform features and provide feedback",
      "Contribute to medical education and patient care materials",
      "Support integration with Electronic Health Record systems",
      "Provide expertise on clinical data management and privacy"
    ],
    requirements: [
      "Medical degree with valid medical license",
      "Clinical practice experience in relevant medical specialty",
      "Understanding of Electronic Health Record systems",
      "Knowledge of medical practice standards and regulations",
      "Experience with clinical documentation and patient care",
      "Strong clinical judgment and patient care focus",
      "Interest in digital health and telemedicine"
    ],
    benefits: [
      "Healthcare technology experience in clinical practice",
      "Contribution to clinical digital transformation",
      "Professional development in health tech",
      "Flexible volunteer schedule",
      "Direct impact on clinical care accessibility"
    ]
  },
  {
    id: 31,
    title: "Health Insurance Specialist",
    department: "Health Insurance Specialist",
    location: "Remote",
    type: "Volunteer",
    description: "Validate and enhance MHI's platform features for insurance providers, ensuring compliance and industry needs are met.",
    fullDescription: "As a Volunteer Health Insurance Specialist, you'll provide insurance industry expertise to enhance MHI's insurance platform features, ensuring they support effective insurance operations and meet industry standards for health insurance services.",
    responsibilities: [
      "Review and validate insurance workflow features in MHI platforms",
      "Provide input on claims processing and insurance verification processes",
      "Support development of insurance integration and billing features",
      "Ensure compliance with health insurance regulations and standards",
      "Test insurance-focused platform features and provide feedback",
      "Contribute to insurance education and patient advocacy materials",
      "Support integration with health insurance information systems",
      "Provide expertise on insurance data management and privacy"
    ],
    requirements: [
      "Background in health insurance or healthcare administration",
      "Understanding of health insurance operations and claims processing",
      "Knowledge of health insurance regulations and compliance",
      "Experience with insurance verification and billing processes",
      "Strong analytical skills and attention to detail",
      "Customer service orientation for insurance advocacy",
      "Interest in digital health and insurance technology"
    ],
    benefits: [
      "Healthcare technology experience in insurance domain",
      "Contribution to insurance digital transformation",
      "Professional development in health tech",
      "Flexible volunteer schedule",
      "Direct impact on insurance service accessibility"
    ]
  },
  {
    id: 32,
    title: "Partnership Manager",
    department: "Partnership Manager",
    location: "Remote",
    type: "Volunteer",
    description: "Establish and nurture strategic partnerships with organizations aligned with MHI's mission to drive growth and impact.",
    fullDescription: "As a Volunteer Partnership Manager, you'll develop and manage strategic partnerships that expand MHI's reach and enhance our ability to transform healthcare accessibility across Africa through collaborative relationships.",
    responsibilities: [
      "Identify and evaluate potential partnership opportunities",
      "Develop partnership strategies aligned with organizational goals",
      "Build and maintain relationships with partner organizations",
      "Support partnership agreement negotiations and development",
      "Coordinate partnership activities and collaborative initiatives",
      "Monitor partnership performance and outcomes",
      "Facilitate communication between MHI and partner organizations",
      "Support partnership expansion and renewal processes"
    ],
    requirements: [
      "Experience in partnership development or relationship management",
      "Strong networking and relationship building skills",
      "Understanding of healthcare industry partnerships",
      "Excellent communication and negotiation abilities",
      "Project management and coordination skills",
      "Strategic thinking and business development acumen",
      "Interest in healthcare collaboration and social impact"
    ],
    benefits: [
      "Partnership management experience in healthcare sector",
      "Network building with healthcare organizations",
      "Strategic relationship development skills",
      "Flexible volunteer schedule",
      "Direct contribution to MHI's collaborative impact"
    ]
  },
  {
    id: 33,
    title: "Marketing and Sales Officer",
    department: "Marketing and Sales Officer",
    location: "Remote",
    type: "Volunteer",
    description: "Develop and execute marketing and sales strategies to build MHI's brand, generate leads, and support market entry.",
    fullDescription: "As a Volunteer Marketing and Sales Officer, you'll develop and implement marketing strategies that build MHI's brand awareness and support sales efforts to expand our healthcare services across African markets.",
    responsibilities: [
      "Develop marketing strategies and campaigns for healthcare services",
      "Create marketing materials and promotional content",
      "Support lead generation and sales funnel development",
      "Conduct market analysis and competitive research",
      "Manage marketing campaigns across digital and traditional channels",
      "Support sales processes and customer acquisition efforts",
      "Analyze marketing performance and optimize strategies",
      "Collaborate with teams on brand messaging and positioning"
    ],
    requirements: [
      "Background in marketing, sales, or business development",
      "Experience with digital marketing and campaign management",
      "Understanding of healthcare marketing regulations and ethics",
      "Strong creative and analytical skills",
      "Proficiency in marketing tools and analytics platforms",
      "Excellent communication and presentation abilities",
      "Interest in healthcare marketing and social impact"
    ],
    benefits: [
      "Marketing and sales experience in healthcare technology",
      "Brand building and campaign management skills",
      "Digital marketing and analytics experience",
      "Flexible volunteer schedule",
      "Direct contribution to MHI's growth and visibility"
    ]
  },
  {
    id: 34,
    title: "Grant and Funding Specialist",
    department: "Grant and Funding Specialist",
    location: "Remote",
    type: "Volunteer",
    description: "Identify, apply for, and secure funding opportunities to support MHI's programs and growth initiatives.",
    fullDescription: "As a Volunteer Grant and Funding Specialist, you'll identify and pursue funding opportunities that support MHI's mission to transform healthcare accessibility, helping secure resources for program expansion and impact growth.",
    responsibilities: [
      "Research and identify grant and funding opportunities",
      "Prepare grant applications and funding proposals",
      "Develop relationships with funders and grant organizations",
      "Support donor cultivation and stewardship activities",
      "Monitor grant compliance and reporting requirements",
      "Track funding pipeline and application deadlines",
      "Collaborate with teams on program development for funding alignment",
      "Maintain database of funding sources and application status"
    ],
    requirements: [
      "Experience in grant writing and fundraising",
      "Understanding of nonprofit and social enterprise funding",
      "Strong writing and communication skills",
      "Research and analytical abilities for funding identification",
      "Project management and deadline management skills",
      "Knowledge of healthcare and social impact funding sources",
      "Interest in supporting healthcare accessibility initiatives"
    ],
    benefits: [
      "Grant writing and fundraising experience in healthcare",
      "Nonprofit and social impact funding knowledge",
      "Professional development in development sector",
      "Flexible volunteer schedule",
      "Direct contribution to MHI's sustainability and growth"
    ]
  },
  {
    id: 35,
    title: "Data Analyst",
    department: "Data Analyst", 
    location: "Remote",
    type: "Volunteer",
    description: "Analyze healthcare data to provide insights that drive strategic decisions and improve patient outcomes across MHI's platform.",
    fullDescription: "As a Volunteer Data Analyst at My Health Integral, you'll work with healthcare data to generate insights that inform strategic decisions, improve patient outcomes, and support our mission to transform healthcare accessibility across Africa through data-driven approaches.",
    responsibilities: [
      "Analyze healthcare data to identify trends and patterns",
      "Create reports and dashboards for stakeholder decision-making",
      "Support data collection and quality assurance processes",
      "Develop metrics and KPIs to track platform performance",
      "Collaborate with teams to define data requirements",
      "Ensure data privacy and security in all analysis activities",
      "Present findings to leadership and cross-functional teams",
      "Support predictive modeling and forecasting initiatives"
    ],
    requirements: [
      "Bachelor's degree in Statistics, Data Science, or related field",
      "Proficiency in data analysis tools (Python, R, SQL)",
      "Experience with data visualization tools (Tableau, Power BI)",
      "Understanding of statistical analysis and interpretation",
      "Knowledge of healthcare data privacy regulations",
      "Strong analytical and problem-solving skills",
      "Interest in healthcare analytics and social impact"
    ],
    benefits: [
      "Healthcare analytics experience with real-world impact",
      "Professional development in data science",
      "Exposure to healthcare data and privacy practices",
      "Flexible volunteer schedule",
      "Direct contribution to data-driven healthcare improvements"
    ]
  }
];

// Helper function to get job by ID
export const getJobById = (id: number): Job | undefined => {
  return jobOpenings.find(job => job.id === id);
};