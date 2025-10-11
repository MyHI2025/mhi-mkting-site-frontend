// Real MHI Blog Articles Data
export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  userTypes: string[];
  topicTags: string[];
  image: string;
  featured?: boolean;
  trending?: boolean;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  thumbnail: string;
  category: string;
}

// Real MHI Blog Articles
export const blogArticles: BlogArticle[] = [
  {
    id: "overcoming-challenges-with-mhi-private-physicians",
    title: "Overcoming Challenges with MHI: A Guide for Private Physicians",
    excerpt: "How MHI helps private physicians tackle tech, cost, patient adoption, and infrastructure hurdles with practical solutions.",
    content: `At My Health Integral (MHI), we understand the evolving demands of modern healthcare and the challenges that private physicians face when adopting new technology. Whether you're managing a virtual-only practice, incorporating virtual consultations into your in-person routine, or starting small and planning to grow, our platform is designed to empower you.

We also recognize that integrating new technology into your practice can bring hurdles. Below, we explore these challenges and how MHI provides tailored solutions to ensure a smooth transition.

## Navigating and Adapting to the App

### The Challenge:
Physicians may struggle with the learning curve of new technology, especially if it doesn't integrate well with their current systems or requires significant time to master.

### MHI Solution:
- User-friendly interface designed for ease of use.
- Personalized training sessions tailored to your practice.
- 24/7 technical support for rapid issue resolution.
- Dedicated setup and troubleshooting assistance.

## Ensuring Data Security and Privacy

### The Challenge:
Concerns about patient data safety, privacy, and regulatory compliance (HIPAA, NDPR, GDPR) are critical.

### MHI Solution:
- End-to-end encryption and two-factor authentication.
- Regular security audits to preempt threats.
- HIPAA-compliant protocols and clear regulatory guidelines.

## Getting Patients on Board with MHI

### The Challenge:
Some patients resist managing appointments or accessing health info through an app.

### MHI Solution:
- Tutorials, in-app guides, and FAQs to ease onboarding.
- Engagement tools like notifications and reminders.
- Integrated features: teleconsultations, appointment scheduling, wellness tools, health records, insurance, emergency services, prescriptions, and lab results.

## Addressing Cost Concerns for Private Physicians

### The Challenge:
Smaller practices often face budget limitations for digital tools and ongoing subscriptions.

### MHI Solution:
- Flexible pricing plans that scale with your practice.
- Free trials for risk-free evaluation.
- Commission-based options (pay-per-consultation).
- Features that improve ROI through efficiency and patient satisfaction.

## Internet and Infrastructure Limitations

### The Challenge:
Inconsistent internet or infrastructure access can limit digital platform usability.

### MHI Solution:
- Low-bandwidth and offline functionality support.
- Partnerships with telecom providers in underserved areas.

## MHI: A Solution Designed for Private Physicians

At MHI, we're not just offering a digital platform—we're providing a complete solution tailored to the unique needs of private physicians. By addressing these common challenges, MHI empowers you to:

- Streamline workflows and reduce admin burden.
- Deliver more efficient care.
- Confidently grow your practice—virtually, hybrid, or in-person.

Ready to transform your practice? Join the MHI beta program today and experience how we're revolutionizing healthcare for private physicians like you.`,
    author: "Anita Porsche",
    date: "July 7, 2025",
    readTime: "8 min read",
    category: "MHI Innovation",
    userTypes: ["Private Physicians"],
    topicTags: ["MHI Innovation", "Telemedicine Tips"],
    image: "/blog/mhi-designs-20.png", // Placeholder - replace with uploaded image
    featured: true,
    trending: true
  },
  {
    id: "digital-health-access",
    title: "Digital Health, Simplified: How MHI Breaks Down Barriers for Patients",
    excerpt: "Meet Femi. She's a middle-aged diabetic patient managing diabetes and looking to improve their health with a digital health app. But like many others, they face hurdles...",
    content: `Meet Femi. She's a middle-aged diabetic patient managing diabetes and looking to improve their health with a digital health app. But like many others, they face hurdles.

Femi's story is all too familiar. Patients often encounter challenges like these when adopting digital health platforms, making the transition to modern healthcare seem overwhelming.

## 1. Digital Literacy and Accessibility Issues

### The Concern:
Many patients, especially older adults, people with disabilities, or those in rural areas, find it difficult to navigate digital platforms due to limited technological experience.

### MHI Solution:
- Simple, Intuitive Design: MHI offers a user-friendly interface that guides patients step-by-step.
- Comprehensive Support: 24/7 customer support, tutorials, and guides assist users confidently.
- Device Compatibility: Works seamlessly across a wide range of devices.

## 2. Internet Access and Power Supply

### The Concern:
Unreliable internet and power affect patients' ability to use digital healthcare platforms.

### MHI Solution:
- Offline Functionality: Key features available offline.
- Partnerships for Access: Collaborations with solar companies and telecoms for power/data support.

## 3. Trust in Online Health Platforms

### The Concern:
Patients fear losing personal touch compared to physical consultations.

### MHI Solution:
- Secure video consultations and messaging for personalized interactions.
- Virtual health coaches provide ongoing support.

## 4. Language Barriers

### The Concern:
Patients from diverse backgrounds may struggle with non-local languages.

### MHI Solution:
- Multilingual Support: Available in multiple local and international languages.
- Local Expertise: Connect with fluent healthcare providers.

## 5. Financial Barriers

### The Concern:
Subscription fees and data costs create barriers to access.

### MHI Solution:
- Free basic plan with essential features.
- Low-bandwidth version of the app to reduce data usage.

## 6. Behavioral and Psychological Barriers

### The Concern:
Patients struggle with forming habits or using health apps regularly.

### MHI Solution:
- Daily reminders, challenges, and rewards.
- Interactive educational tools and tips.

## 7. Privacy and Security Concerns

### The Concern:
Patients are concerned about how their data is handled on digital platforms.

### MHI Solution:
- End-to-end encryption and two-factor authentication.
- Clear, transparent privacy policies.

## MHI: Healthcare Made Simple, Secure, and Accessible

At MHI, we believe that healthcare should be easy to access and tailored to the needs of every individual. By addressing these challenges, we make digital health adoption simple and empowering.

Join Femi and countless others transforming their healthcare with MHI.`,
    author: "Anita Porsche", 
    date: "June 6, 2025",
    readTime: "7 min read",
    category: "Health and Wellness",
    userTypes: ["Patients"],
    topicTags: ["Health and Wellness", "MHI Innovation"],
    image: "/blog/digital-health-barriers.png", // Placeholder - replace with uploaded image
    trending: true
  },
  {
    id: "operation",
    title: "Healthcare at Your Fingertips: How MHI is Changing the Patient Experience",
    excerpt: "You wake up feeling unwell and decide to call your doctor. After being passed around to different departments, you're told the earliest appointment is weeks away...",
    content: `## Imagine This

You wake up feeling unwell and decide to call your doctor. After being passed around to different departments, you're told the earliest appointment is weeks away. When you finally get to the clinic, you spend hours waiting – only to meet the doctor for a rushed ten-minute consultation. Does this sound familiar?

For many patients, healthcare feels like an endless cycle of delays, confusion, and frustration. Common struggles include:

- Delays in booking appointments, especially with specialists.
- Difficulty finding the right healthcare provider for your specific condition.
- Fragmented medical records, with information lost between doctors, labs, and pharmacies.
- Unexpected medical bills that cause financial stress.
- Late detection of illnesses due to delayed interventions.

This broken system is why healthcare is shifting toward digital solutions – and My Health Integral (MHI) is here to revolutionise your experience.

## How Does MHI Change the Game for You?

### A One-Stop Healthcare Experience
Instead of jumping between disconnected doctors, pharmacies, labs, and insurance providers, MHI unifies all your healthcare needs – appointments, prescriptions, lab results, wellness apps & devices – are seamlessly integrated on a single platform.

### Transparent, Upfront Pricing
No more surprise bills. MHI provides clear pricing for consultations, lab tests, and services upfront.

### 24/7 Access to Care
Skip the waiting room. With MHI, you can access medical care anytime, anywhere.

### AI-Driven Symptom Analysis
At MHI, we harness the power of AI to provide initial diagnoses and recommendations based on your symptoms.

### Comprehensive Digital Health Services
- AI-powered initial diagnosis to guide your care journey.
- Global telemedicine access, connecting you to top physicians worldwide.
- An online pharmacy for fast, convenient medication delivery.
- Integrated diagnostics testing, with lab results delivered straight to your device.
- Electronic Health Records (EHR) integration for streamlined access to your medical history.
- Personalised health and wellness programs tailored to your needs.
- Remote health monitoring with device integration to track vitals and detect issues early.
- Health insurance integration, simplifying claims and coverage management.
- A healthcare marketplace where you can find the right providers, buy medical products, and book tests.

### Big Savings Over Traditional Healthcare
MHI saves patients an average of 35–65% on healthcare costs compared to traditional care.

### Enhanced Accessibility
Whether you're in a city or rural village, MHI connects you to healthcare providers near and far.

### Your Health, Simplified
At MHI, our mission is to make healthcare affordable, accessible, and integrated for everyone.

Don't Wait. Take Control of Your Health Today.`,
    author: "Anita Porsche",
    date: "May 5, 2025", 
    readTime: "6 min read",
    category: "MHI Innovation",
    userTypes: ["Patients"],
    topicTags: ["MHI Innovation", "Telemedicine Tips"],
    image: "/blog/mhi-infographics.png" // Placeholder - replace with uploaded image
  },
  {
    id: "mhi-private-physicians-v2",
    title: "Overcoming Challenges with MHI: A Complete Guide for Private Physicians",
    excerpt: "How MHI supports private physicians in adapting to digital healthcare with flexible solutions and comprehensive support.",
    content: `At My Health Integral (MHI), we understand the evolving demands of modern healthcare and the challenges that private physicians face when adopting new technology. Whether you're managing a virtual-only practice, incorporating virtual consultations into your in-person routine, or starting small and planning to grow, our platform is designed to empower you.

We also recognize that integrating new technology into your practice can bring hurdles. Below, we explore these challenges and how MHI provides tailored solutions to ensure a smooth transition.

## Navigating and Adapting to the App

### The Challenge:
Physicians may struggle with the learning curve of new technology, especially if it doesn't integrate well with their current systems or requires significant time to master.

### MHI Solution:
- User-friendly interface to simplify your experience.
- Personalized training sessions tailored to your practice.
- 24/7 technical support to address challenges quickly.
- Dedicated support team for setup and troubleshooting.

## Ensuring Data Security and Privacy

### The Challenge:
Patient confidentiality is a top priority. Concerns about HIPAA, NDPR, GDPR compliance, and data safety make digital adoption daunting.

### MHI Solution:
- End-to-end encryption and two-factor authentication.
- Regular security audits to address vulnerabilities.
- HIPAA-compliant protocols and clear guidelines.

With MHI, you can confidently assure your patients that their data is secure and private.

## Getting Patients on Board with MHI

### The Challenge:
Patients may resist using an app for managing care, appointments, or communication.

### MHI Solution:
- Customizable onboarding tools: tutorials, in-app guides, FAQs.
- In-app notifications and reminders.
- Integrated features: teleconsultations, scheduling, health records, pharmacy, insurance, and lab access.

By simplifying the patient experience, MHI makes adoption effortless.

## Addressing Cost Concerns for Private Physicians or Smaller Practices

### The Challenge:
Budget constraints and ongoing costs may seem like barriers to adoption.

### MHI Solution:
- Flexible, affordable subscription options.
- Free trials to test the platform.
- Commission-based model: pay per consultation.
- Cost-effective features that boost ROI by improving efficiency and satisfaction.

## Internet and Infrastructure Limitations

### The Challenge:
Limited internet access and infrastructure in some areas can disrupt digital care.

### MHI Solution:
- Low-bandwidth optimization and offline functionality.
- Partnerships with telecoms to provide connectivity in underserved areas.

## MHI: A Solution Designed for Private Physicians

At MHI, we're not just offering a digital platform—we're providing a complete solution tailored to private physicians. We help you streamline operations, improve care, and grow with confidence.

## Ready to Transform Your Practice?

Join the MHI Beta Program Now.`,
    author: "Anita Porsche",
    date: "July 7, 2025",
    readTime: "7 min read",
    category: "MHI Innovation", 
    userTypes: ["Private Physicians"],
    topicTags: ["MHI Innovation", "Telemedicine Tips"],
    image: "/blog/mhi-infographics-2.png" // Placeholder - replace with uploaded image
  }
];

export const videoContent: VideoContent[] = [
  {
    id: "platform-demo",
    title: "MHI Platform Demo: Complete Healthcare Journey",
    description: "A comprehensive walkthrough of how patients navigate the My Health Integral platform from registration to treatment completion.",
    duration: "12:45",
    views: "5.2K views",
    date: "2 weeks ago",
    thumbnail: "/videos/platform-demo-thumb.png",
    category: "Product Demo"
  },
  {
    id: "ceo-interview", 
    title: "CEO Interview: The Vision Behind My Health Integral",
    description: "Learn about the personal experiences and vision that led to founding MHI and transforming healthcare in Africa.",
    duration: "18:30",
    views: "12.8K views", 
    date: "3 weeks ago",
    thumbnail: "/videos/ceo-interview-thumb.png",
    category: "Leadership"
  },
  {
    id: "patient-success-story",
    title: "Patient Success Story: Rural Healthcare Transformation", 
    description: "How MHI's telemedicine services enabled life-saving care for patients in remote communities.",
    duration: "8:20",
    views: "7.9K views",
    date: "1 month ago", 
    thumbnail: "/videos/patient-story-thumb.png",
    category: "Success Stories"
  }
];

// User type filters
export const userTypes = [
  "All User Types",
  "Patients", 
  "Private Physicians",
  "Hospitals/Health Facilities",
  "Pharmacies",
  "Medical Laboratories", 
  "Health Insurance Providers",
  "Emergency Services Providers"
];

// Topic category filters  
export const topicCategories = [
  "All Topics",
  "MHI Innovation",
  "Testimonials", 
  "News and Update",
  "Telemedicine Tips",
  "Health and Wellness",
  "Faces of MHI"
];

// Helper function to get article by ID
export const getArticleById = (id: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.id === id);
};

// Helper function to filter articles
export const filterArticles = (
  articles: BlogArticle[],
  searchTerm: string = "",
  selectedUserType: string = "All User Types", 
  selectedTopicCategory: string = "All Topics"
): BlogArticle[] => {
  return articles.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUserType = selectedUserType === "All User Types" || 
      article.userTypes.includes(selectedUserType);
    
    const matchesTopicCategory = selectedTopicCategory === "All Topics" ||
      article.topicTags.includes(selectedTopicCategory);
    
    return matchesSearch && matchesUserType && matchesTopicCategory;
  });
};