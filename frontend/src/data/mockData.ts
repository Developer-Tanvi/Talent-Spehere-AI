import { Candidate, JobRequisition, AssessmentQuestion, AuditLogEntry } from '../types';

export const INITIAL_JOBS: JobRequisition[] = [
  {
    id: 'job-1042',
    reqCode: 'REQ-1042',
    title: 'Senior Java Developer',
    department: 'Backend Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    seniority: 'Senior',
    salaryRange: '$165,000 - $195,000',
    status: 'Active',
    applicantsCount: 450,
    shortlistedCount: 182,
    interviewingCount: 38,
    hiredCount: 2,
    targetHireDate: 'Nov 15, 2026',
    requiredSkills: ['Java 21', 'Spring Boot 3', 'Microservices', 'Kafka', 'PostgreSQL', 'Distributed Systems'],
    niceToHaveSkills: ['Kubernetes', 'AWS ECS', 'GraphQL', 'Redis', 'gRPC'],
    minExperienceYears: 5,
    description: 'We are seeking an experienced Senior Java Developer to architect and build high-throughput distributed backend services powering our real-time analytics and transaction pipelines.',
    responsibilities: [
      'Architect, develop, and scale mission-critical Java microservices capable of handling 50k+ QPS.',
      'Design resilient event-driven data streaming pipelines with Apache Kafka and RabbitMQ.',
      'Optimize complex PostgreSQL database schemas, indexing strategies, and connection pooling.',
      'Lead code reviews, mentor intermediate engineers, and champion automated testing best practices.'
    ],
    weights: {
      skills: 35,
      experience: 25,
      oaScore: 25,
      githubEvidence: 10,
      education: 5
    }
  },
  {
    id: 'job-1043',
    reqCode: 'REQ-1043',
    title: 'Staff Frontend Engineer',
    department: 'Product Experience',
    location: 'Remote (US/Canada)',
    type: 'Full-time',
    seniority: 'Staff',
    salaryRange: '$175,000 - $210,000',
    status: 'Active',
    applicantsCount: 310,
    shortlistedCount: 114,
    interviewingCount: 22,
    hiredCount: 1,
    targetHireDate: 'Dec 01, 2026',
    requiredSkills: ['React 19', 'TypeScript', 'Next.js', 'Web Performance', 'Design Systems', 'State Architecture'],
    niceToHaveSkills: ['Web Workers', 'Wasm', 'Tailwind CSS', 'GraphQL', 'Cypress'],
    minExperienceYears: 7,
    description: 'Lead the frontend technical direction of our core SaaS suite, driving micro-frontend architecture, sub-millisecond interaction latency, and high-standard design system adoption.',
    responsibilities: [
      'Define web performance benchmarks (Core Web Vitals) and eliminate rendering bottlenecks.',
      'Architect extensible UI component libraries and maintain strict accessibility (WCAG AAA).',
      'Collaborate closely with product designers and backend engineers on API contracts.'
    ],
    weights: {
      skills: 30,
      experience: 30,
      oaScore: 20,
      githubEvidence: 15,
      education: 5
    }
  },
  {
    id: 'job-1044',
    reqCode: 'REQ-1044',
    title: 'Cloud Infrastructure Architect',
    department: 'Platform & DevOps',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    seniority: 'Lead',
    salaryRange: '$185,000 - $225,000',
    status: 'Active',
    applicantsCount: 180,
    shortlistedCount: 65,
    interviewingCount: 12,
    hiredCount: 0,
    targetHireDate: 'Nov 30, 2026',
    requiredSkills: ['Kubernetes', 'Terraform', 'AWS / GCP', 'CI/CD Pipelines', 'Observability', 'Security Hardening'],
    niceToHaveSkills: ['Istio Service Mesh', 'Go', 'Prometheus/Grafana', 'SOC2 Compliance'],
    minExperienceYears: 6,
    description: 'Build enterprise-scale Kubernetes multi-region clusters, automate cloud infrastructure with Terraform, and guarantee 99.99% uptime for core production workloads.',
    responsibilities: [
      'Architect zero-downtime deployment pipelines using ArgoCD and GitHub Actions.',
      'Implement unified observability with OpenTelemetry, Prometheus, and Grafana.',
      'Establish disaster recovery protocols and manage multi-cloud redundancy.'
    ],
    weights: {
      skills: 35,
      experience: 25,
      oaScore: 20,
      githubEvidence: 15,
      education: 5
    }
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'elena.rodriguez@example.com',
    phone: '+1 (415) 892-4109',
    location: 'San Francisco, CA',
    title: 'Senior Backend Engineer',
    bio: 'Senior Backend Systems Architect with 6.5+ years building fault-tolerant distributed services, high-throughput Kafka pipelines, and low-latency microservices with Spring Boot and Java 21.',
    experienceYears: 6.5,
    currentCompany: 'FinTech Velocity Labs',
    isOpenToWork: true,
    resumeFileName: 'Elena_Rodriguez_Senior_Backend_Engineer.pdf',
    resumeUploadedAt: 'Oct 22, 2026 · 11:20 AM',
    education: {
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      year: '2019',
      gpa: '3.86'
    },
    jobId: 'job-1042',
    jobTitle: 'Senior Java Developer',
    appliedDate: '2 days ago',
    status: 'oa_completed',
    fitScore: 94,
    confidenceScore: 96,
    recommendation: 'PROCEED',
    recommendationReason: 'Exceptional match for REQ-1042. Demonstrated strong architectural expertise in Java 21 & Spring Boot microservices with verified 88% OA score and high commit consistency on GitHub open-source repositories.',
    factorBreakdown: {
      coreSkills: 96,
      experienceRelevance: 93,
      oaPerformance: 88,
      codeQuality: 95,
      profileConsistency: 98
    },
    topMatchedSkills: ['Spring Boot 3', 'Distributed Systems', 'Kafka Streams', 'PostgreSQL', 'Java 21', 'Microservices'],
    skillGaps: ['Kubernetes Cluster Ops (Minor)', 'GraphQL (Nice to have)'],
    professionalProfiles: [
      {
        id: 'prof-1',
        platform: 'GitHub',
        handle: 'elenarodriguez',
        url: 'https://github.com/elenarodriguez',
        verified: true,
        connectedAt: 'Oct 22, 2026',
        stats: '24 repos · 615 stars · 842 commits (top 2%)',
        badge: 'Top 2% Open Source Contributor'
      },
      {
        id: 'prof-2',
        platform: 'LinkedIn',
        handle: 'elena-rodriguez-dev',
        url: 'https://linkedin.com/in/elena-rodriguez-dev',
        verified: true,
        connectedAt: 'Oct 22, 2026',
        stats: '500+ connections · 18 skill endorsements',
        badge: 'Verified Identity & Work History'
      },
      {
        id: 'prof-3',
        platform: 'LeetCode',
        handle: 'elena_algo',
        url: 'https://leetcode.com/elena_algo',
        verified: true,
        connectedAt: 'Oct 23, 2026',
        stats: 'Rating 2,145 (Guardian Tier) · 640 solved (190 Hard)',
        badge: 'Guardian Tier (Top 1.5%)'
      },
      {
        id: 'prof-4',
        platform: 'Portfolio',
        handle: 'elena-tech.io',
        url: 'https://elena-tech.io',
        verified: true,
        connectedAt: 'Oct 23, 2026',
        stats: 'Live architecture case studies & tech blog',
        badge: 'Verified Domain'
      }
    ],
    applications: [
      {
        id: 'app-01',
        jobId: 'job-1042',
        jobTitle: 'Senior Java Developer',
        reqCode: 'REQ-1042',
        department: 'Backend Engineering',
        companyName: 'TalentSphere Systems Inc.',
        appliedDate: 'Oct 22, 2026',
        status: 'oa_completed',
        fitScore: 94,
        resumeFileName: 'Elena_Rodriguez_Senior_Backend_Engineer.pdf',
        coverNote: 'Excited about the high-throughput architecture challenges. My recent work at FinTech Velocity Labs matches the Kafka and Spring Boot requirements directly.',
        oaRequired: true,
        oaCompleted: true,
        oaScore: 88,
        stageProgress: [
          { stage: 'Application Submitted', completed: true, current: false, date: 'Oct 22, 2026' },
          { stage: 'AI Fit & ATS Screening', completed: true, current: false, date: 'Oct 23, 2026' },
          { stage: 'Online Coding Assessment (OA)', completed: true, current: false, date: 'Oct 24, 2026' },
          { stage: 'Technical Panel Interview', completed: false, current: true, date: 'Estimated Nov 02, 2026' },
          { stage: 'Final Hiring Decision', completed: false, current: false, date: 'Pending' }
        ]
      }
    ],
    verifiedSkills: [
      {
        name: 'Java 21 / JVM Internals',
        level: 'Expert',
        score: 96,
        evidenceSource: 'Assessment',
        evidenceSnippet: 'Scored in 98th percentile on JVM concurrency and memory leak troubleshooting module.',
        verified: true
      },
      {
        name: 'Spring Boot 3 & Security',
        level: 'Expert',
        score: 94,
        evidenceSource: 'GitHub',
        evidenceSnippet: 'Maintained 4 production microservices with Spring Cloud, OAuth2, and resilience4j patterns.',
        verified: true
      },
      {
        name: 'Apache Kafka & Event Streaming',
        level: 'Advanced',
        score: 92,
        evidenceSource: 'Work History',
        evidenceSnippet: 'Architected event pipeline ingesting 12M events/day at FinTech Velocity Labs.',
        verified: true
      },
      {
        name: 'PostgreSQL Query Optimization',
        level: 'Advanced',
        score: 90,
        evidenceSource: 'Assessment',
        evidenceSnippet: 'Optimized complex query execution plans reducing latency from 450ms to 18ms.',
        verified: true
      },
      {
        name: 'Kubernetes & Docker',
        level: 'Intermediate',
        score: 74,
        evidenceSource: 'Work History',
        evidenceSnippet: 'Basic Helm chart deployment experience; limited production cluster administration.',
        verified: true
      }
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Backend Engineer',
        company: 'FinTech Velocity Labs',
        period: '2022 — Present (2.5 yrs)',
        location: 'San Francisco, CA',
        description: [
          'Led a cross-functional pod of 5 engineers building real-time fraud scoring microservices.',
          'Migrated legacy monolith to Spring Boot 3 microservices with Kafka event brokers.',
          'Reduced API P99 latency by 42% through connection pooling and Redis multi-tier caching.'
        ],
        keyDeliverables: [
          'Zero-downtime migration of transaction ledger processing $40M daily volume.',
          'Built internal SDK for distributed tracing using OpenTelemetry and Jaeger.'
        ],
        skillsUsed: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
        relevanceScore: 96
      },
      {
        id: 'exp-2',
        role: 'Software Engineer II',
        company: 'Nexus Cloud Systems',
        period: '2019 — 2022 (3 yrs)',
        location: 'Oakland, CA',
        description: [
          'Engineered RESTful APIs and asynchronous batch processors in Java and Python.',
          'Authored comprehensive unit and integration test suites with 92% code coverage.',
          'Implemented automated CI/CD deployment pipelines.'
        ],
        keyDeliverables: [
          'Delivered customer webhook delivery engine with exponential backoff retry policies.',
          'Won internal Q3 Engineering Excellence award for database indexing overhaul.'
        ],
        skillsUsed: ['Java 17', 'Spring Cloud', 'MySQL', 'RabbitMQ', 'AWS SQS'],
        relevanceScore: 89
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Distributed Rate Limiter & Token Bucket Framework',
        description: 'High-performance Redis-backed distributed rate limiter with sliding-window log algorithms, supporting 100k req/sec with sub-millisecond overhead.',
        repoUrl: 'https://github.com/elenarodriguez/distributed-rate-limiter',
        stars: 342,
        commits: 128,
        techStack: ['Java 21', 'Redis', 'Lettuce', 'Docker', 'JUnit 5'],
        highlights: ['Published as an open-source library', 'Integrated into 3 commercial platforms', 'Zero memory leaks detected across 72-hour stress load'],
        complexityScore: 94
      },
      {
        id: 'proj-2',
        title: 'Kafka Event Sourcing Banking Engine',
        description: 'CQRS-based ledger accounting system with cryptographic transaction audit trails and event replay capabilities.',
        repoUrl: 'https://github.com/elenarodriguez/event-sourcing-ledger',
        stars: 189,
        commits: 94,
        techStack: ['Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Debezium'],
        highlights: ['Real-time balance reconciliation', '100% idempotent consumer semantics'],
        complexityScore: 91
      }
    ],
    oaResult: {
      assessmentId: 'oa-java-senior',
      title: 'Senior Java Backend Engineering OA',
      totalScore: 88,
      completedAt: 'Oct 24, 2026 · 14:32 PST',
      timeSpentMinutes: 42,
      sections: [
        { name: 'Algorithmic Problem Solving', score: 92, maxScore: 100 },
        { name: 'Concurrency & Thread Safety', score: 94, maxScore: 100 },
        { name: 'System Design & Scalability', score: 86, maxScore: 100 },
        { name: 'REST & API Security', score: 90, maxScore: 100 }
      ],
      codeQualityScore: 95,
      algorithmicScore: 92,
      systemDesignScore: 86,
      proctorTrustScore: 99,
      plagiarismIndex: 0.02
    },
    githubMetrics: {
      username: 'elenarodriguez',
      publicRepos: 24,
      totalStars: 615,
      totalCommitsLastYear: 842,
      contributedLanguages: [
        { lang: 'Java', percentage: 68 },
        { lang: 'SQL', percentage: 16 },
        { lang: 'Python', percentage: 11 },
        { lang: 'Shell', percentage: 5 }
      ],
      consistencyRating: 98,
      qualityRating: 94
    },
    interviewFocusAreas: [
      {
        topic: 'Distributed Transactions & 2-Phase Commit vs Saga',
        rationale: 'Her profile indicates deep microservices experience. Test her ability to handle partial failures across multi-service workflows.',
        suggestedQuestion: 'You have a Spring Boot service receiving 10,000 requests per minute that spans 3 payment gateways. How would you design failure compensation and eventual consistency without blocking worker threads?',
        expectedAnswerRubric: 'Candidate should explain the Saga pattern (Orchestration vs Choreography), idempotent request IDs, outbox pattern with Kafka, and dead-letter queues.',
        difficulty: 'Hard'
      },
      {
        topic: 'JVM Garbage Collection Tuning & Memory Dumps',
        rationale: 'Validate deep JVM runtime expertise beyond standard framework usage.',
        suggestedQuestion: 'Describe a situation where you diagnosed a long GC pause in a Java microservice. What tools and JVM flags did you utilize to identify the root cause?',
        expectedAnswerRubric: 'Mentions jstat, jmap, VisualVM/AsyncProfiler, G1GC / ZGC tuning parameters (MaxGCPauseMillis), and object allocation lifecycle.',
        difficulty: 'Hard'
      },
      {
        topic: 'Kubernetes Container Limits & Resilience (Identified Gap)',
        rationale: 'Identified as a slight gap during automated skill parsing.',
        suggestedQuestion: 'How do you configure readiness/liveness probes and JVM heap allocation inside Kubernetes pods to prevent Out-Of-Memory (OOM) Kills?',
        expectedAnswerRubric: 'Explains -XX:MaxRAMPercentage, cgroups v2 integration, graceful termination hooks in Spring Boot (spring.lifecycle.timeout-per-shutdown-phase).',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'cand-002',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'alex.chen@example.com',
    phone: '+1 (510) 334-9021',
    location: 'San Jose, CA',
    title: 'Senior Software Engineer',
    experienceYears: 5.5,
    currentCompany: 'ScaleFlow Dynamics',
    education: {
      degree: 'B.S. in Software Engineering',
      institution: 'San Jose State University',
      year: '2020',
      gpa: '3.78'
    },
    jobId: 'job-1042',
    jobTitle: 'Senior Java Developer',
    appliedDate: '3 days ago',
    status: 'interview_scheduled',
    fitScore: 91,
    confidenceScore: 94,
    recommendation: 'PROCEED',
    recommendationReason: 'Solid technical background with 88% OA score, exceptional algorithmic proficiency, and strong full-lifecycle Java development experience. Highly recommended for technical interview round.',
    factorBreakdown: {
      coreSkills: 92,
      experienceRelevance: 90,
      oaPerformance: 88,
      codeQuality: 92,
      profileConsistency: 96
    },
    topMatchedSkills: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs', 'Redis'],
    skillGaps: ['Kafka Streams (Basic)', 'Large scale distributed tracing'],
    verifiedSkills: [
      {
        name: 'Java & Spring Framework',
        level: 'Expert',
        score: 93,
        evidenceSource: 'Assessment',
        evidenceSnippet: 'Demonstrated clean SOLID architecture in live coding assessment.',
        verified: true
      },
      {
        name: 'SQL & Database Design',
        level: 'Advanced',
        score: 89,
        evidenceSource: 'Work History',
        evidenceSnippet: 'Managed production migration of 200GB Postgres databases.',
        verified: true
      },
      {
        name: 'System Architecture',
        level: 'Advanced',
        score: 87,
        evidenceSource: 'GitHub',
        evidenceSnippet: 'Designed scalable worker queue system with Celery and Redis.',
        verified: true
      }
    ],
    experience: [
      {
        id: 'exp-201',
        role: 'Senior Backend Engineer',
        company: 'ScaleFlow Dynamics',
        period: '2022 — Present',
        location: 'San Jose, CA',
        description: [
          'Engineered core transaction engine for real-time inventory management.',
          'Built microservices handling 25,000 requests per second with Spring Boot and Redis.',
          'Mentored 3 junior developers and conducted 50+ technical interviews.'
        ],
        keyDeliverables: [
          'Engineered automatic failover cluster reducing downtime to 99.98% SLA.',
          'Built high-performance caching layer saving $15k monthly cloud infrastructure cost.'
        ],
        skillsUsed: ['Java 17', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker', 'AWS'],
        relevanceScore: 92
      }
    ],
    projects: [
      {
        id: 'proj-201',
        title: 'High-Concurrency Redis Queue Driver',
        description: 'Lightweight asynchronous queue mechanism built for sub-millisecond job distribution in Java environments.',
        repoUrl: 'https://github.com/alexchen/redis-queue-driver',
        stars: 210,
        commits: 86,
        techStack: ['Java', 'Redis', 'Netty'],
        highlights: ['Benchmarked at 85k ops/sec', 'Full test coverage'],
        complexityScore: 88
      }
    ],
    oaResult: {
      assessmentId: 'oa-java-senior',
      title: 'Senior Java Backend Engineering OA',
      totalScore: 88,
      completedAt: 'Oct 23, 2026 · 11:15 PST',
      timeSpentMinutes: 38,
      sections: [
        { name: 'Algorithmic Problem Solving', score: 94, maxScore: 100 },
        { name: 'Concurrency & Thread Safety', score: 86, maxScore: 100 },
        { name: 'System Design & Scalability', score: 85, maxScore: 100 },
        { name: 'REST & API Security', score: 88, maxScore: 100 }
      ],
      codeQualityScore: 92,
      algorithmicScore: 94,
      systemDesignScore: 85,
      proctorTrustScore: 98,
      plagiarismIndex: 0.01
    },
    githubMetrics: {
      username: 'alexchen',
      publicRepos: 18,
      totalStars: 420,
      totalCommitsLastYear: 610,
      contributedLanguages: [
        { lang: 'Java', percentage: 74 },
        { lang: 'TypeScript', percentage: 16 },
        { lang: 'SQL', percentage: 10 }
      ],
      consistencyRating: 94,
      qualityRating: 91
    },
    interviewFocusAreas: [
      {
        topic: 'Distributed Caching Invalidation Strategies',
        rationale: 'Strong Redis experience; test depth on cache stampede prevention and double delete.',
        suggestedQuestion: 'How would you avoid cache stampedes during sudden traffic spikes when high-cardinality keys expire simultaneously?',
        expectedAnswerRubric: 'Mentions mutex locking, probabilistic early expiration (XFetch algorithm), background refresh workers.',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'cand-003',
    name: 'Jordan Reese',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'jordan.reese@example.com',
    phone: '+1 (408) 721-9981',
    location: 'Sunnyvale, CA',
    title: 'Backend Developer',
    experienceYears: 4.0,
    currentCompany: 'OmniCloud Tech',
    education: {
      degree: 'B.S. in Information Systems',
      institution: 'Santa Clara University',
      year: '2021',
      gpa: '3.45'
    },
    jobId: 'job-1042',
    jobTitle: 'Senior Java Developer',
    appliedDate: '4 days ago',
    status: 'oa_completed',
    fitScore: 78,
    confidenceScore: 84,
    recommendation: 'NEEDS_REVIEW',
    recommendationReason: 'Solid foundation in general Java development, but OA score (72%) and GitHub evidence show limited exposure to high-scale distributed systems and Kafka streaming required for Senior level.',
    factorBreakdown: {
      coreSkills: 80,
      experienceRelevance: 74,
      oaPerformance: 72,
      codeQuality: 79,
      profileConsistency: 85
    },
    topMatchedSkills: ['Java 17', 'Spring Boot', 'REST APIs', 'MySQL'],
    skillGaps: ['Distributed Systems', 'Kafka Streams', 'High Throughput Architecture', 'JVM Tuning'],
    verifiedSkills: [
      {
        name: 'Java Development',
        level: 'Advanced',
        score: 82,
        evidenceSource: 'Work History',
        evidenceSnippet: 'Maintained enterprise internal CRUD applications.',
        verified: true
      },
      {
        name: 'Spring Boot',
        level: 'Intermediate',
        score: 76,
        evidenceSource: 'Assessment',
        evidenceSnippet: 'Good basic endpoint building; struggled with non-blocking reactive streams.',
        verified: true
      }
    ],
    experience: [
      {
        id: 'exp-301',
        role: 'Software Developer',
        company: 'OmniCloud Tech',
        period: '2021 — Present (3.5 yrs)',
        location: 'Sunnyvale, CA',
        description: [
          'Developed internal administrative REST services in Java 17 and Spring Boot.',
          'Integrated third-party payment gateways and webhook ingestion endpoints.'
        ],
        keyDeliverables: [
          'Built customer onboarding flow with automatic validation checks.'
        ],
        skillsUsed: ['Java 17', 'Spring Boot', 'MySQL', 'Git'],
        relevanceScore: 74
      }
    ],
    projects: [
      {
        id: 'proj-301',
        title: 'Inventory Web Portal',
        description: 'Internal warehouse tracking app with Spring Data JPA and Thymeleaf UI.',
        repoUrl: 'https://github.com/jordanreese/inventory-portal',
        stars: 12,
        commits: 34,
        techStack: ['Java', 'Spring Boot', 'MySQL'],
        highlights: ['Role-based access control'],
        complexityScore: 68
      }
    ],
    oaResult: {
      assessmentId: 'oa-java-senior',
      title: 'Senior Java Backend Engineering OA',
      totalScore: 72,
      completedAt: 'Oct 22, 2026 · 16:45 PST',
      timeSpentMinutes: 58,
      sections: [
        { name: 'Algorithmic Problem Solving', score: 70, maxScore: 100 },
        { name: 'Concurrency & Thread Safety', score: 68, maxScore: 100 },
        { name: 'System Design & Scalability', score: 74, maxScore: 100 },
        { name: 'REST & API Security', score: 76, maxScore: 100 }
      ],
      codeQualityScore: 79,
      algorithmicScore: 70,
      systemDesignScore: 74,
      proctorTrustScore: 96,
      plagiarismIndex: 0.04
    },
    githubMetrics: {
      username: 'jordanreese',
      publicRepos: 8,
      totalStars: 24,
      totalCommitsLastYear: 140,
      contributedLanguages: [
        { lang: 'Java', percentage: 80 },
        { lang: 'JavaScript', percentage: 20 }
      ],
      consistencyRating: 78,
      qualityRating: 72
    },
    interviewFocusAreas: [
      {
        topic: 'Concurrency & Thread Safety',
        rationale: 'Candidate had lower score on OA concurrency test cases.',
        suggestedQuestion: 'Explain the difference between Synchronized blocks, ReentrantLock, and AtomicInteger in Java multi-threaded execution.',
        expectedAnswerRubric: 'Contrasts intrinsic monitor locking vs explicit locks, lock fairness, compare-and-swap (CAS) CPU primitives.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'cand-004',
    name: 'Sarah Lin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'sarah.lin@example.com',
    phone: '+1 (206) 555-0192',
    location: 'Seattle, WA (Remote)',
    title: 'Lead Frontend Architect',
    experienceYears: 8.0,
    currentCompany: 'Vortex Design Systems',
    education: {
      degree: 'M.S. in Human-Computer Interaction',
      institution: 'University of Washington',
      year: '2018',
      gpa: '3.92'
    },
    jobId: 'job-1043',
    jobTitle: 'Staff Frontend Engineer',
    appliedDate: '1 day ago',
    status: 'interview_scheduled',
    fitScore: 97,
    confidenceScore: 98,
    recommendation: 'PROCEED',
    recommendationReason: 'Outstanding candidate for Staff Frontend. Created major open-source UI libraries, author of web performance guides, 96% OA frontend score with flawless accessibility and architectural depth.',
    factorBreakdown: {
      coreSkills: 98,
      experienceRelevance: 97,
      oaPerformance: 96,
      codeQuality: 98,
      profileConsistency: 99
    },
    topMatchedSkills: ['React 19', 'TypeScript', 'Design Systems', 'Web Performance', 'Next.js', 'WCAG AAA'],
    skillGaps: ['None identified'],
    verifiedSkills: [
      {
        name: 'React 19 & State Architecture',
        level: 'Expert',
        score: 98,
        evidenceSource: 'Assessment',
        evidenceSnippet: 'Built zero-layout-shift data visualizer with Server Components and Suspense.',
        verified: true
      },
      {
        name: 'TypeScript & Type Systems',
        level: 'Expert',
        score: 97,
        evidenceSource: 'GitHub',
        evidenceSnippet: 'Author of typescript-strict-guards (1.2M monthly downloads).',
        verified: true
      }
    ],
    experience: [
      {
        id: 'exp-401',
        role: 'Lead Frontend Architect',
        company: 'Vortex Design Systems',
        period: '2021 — Present (3.5 yrs)',
        location: 'Seattle, WA',
        description: [
          'Architected global multi-brand UI system deployed across 14 enterprise applications.',
          'Reduced time-to-interactive by 68% and bundle payload by 450KB across the flagship suite.'
        ],
        keyDeliverables: [
          'Designed micro-frontend federation system serving 18M monthly active users.'
        ],
        skillsUsed: ['React', 'TypeScript', 'Module Federation', 'Tailwind', 'Storybook'],
        relevanceScore: 98
      }
    ],
    projects: [
      {
        id: 'proj-401',
        title: 'Ultra-Fast Virtualized Grid Engine',
        description: 'Canvas + DOM hybrid virtual table capable of rendering 1,000,000 cells at steady 60fps.',
        repoUrl: 'https://github.com/sarahlin/grid-engine',
        stars: 1840,
        commits: 340,
        techStack: ['TypeScript', 'WebGL', 'React'],
        highlights: ['Used by Fortune 500 trading platforms', 'Zero dependencies'],
        complexityScore: 98
      }
    ],
    oaResult: {
      assessmentId: 'oa-frontend-staff',
      title: 'Staff Frontend Architecture OA',
      totalScore: 96,
      completedAt: 'Oct 24, 2026 · 09:12 PST',
      timeSpentMinutes: 35,
      sections: [
        { name: 'Component Architecture', score: 98, maxScore: 100 },
        { name: 'Core Web Vitals & Optimization', score: 96, maxScore: 100 },
        { name: 'Accessibility (a11y) & WCAG', score: 95, maxScore: 100 }
      ],
      codeQualityScore: 98,
      algorithmicScore: 94,
      systemDesignScore: 98,
      proctorTrustScore: 99,
      plagiarismIndex: 0.01
    },
    githubMetrics: {
      username: 'sarahlin',
      publicRepos: 32,
      totalStars: 3420,
      totalCommitsLastYear: 1240,
      contributedLanguages: [
        { lang: 'TypeScript', percentage: 82 },
        { lang: 'CSS/HTML', percentage: 12 },
        { lang: 'Rust', percentage: 6 }
      ],
      consistencyRating: 99,
      qualityRating: 98
    },
    interviewFocusAreas: [
      {
        topic: 'Micro-Frontend Orchestration & Shared State',
        rationale: 'Assessing her vision for unifying large disparate engineering teams.',
        suggestedQuestion: 'How would you architect cross-app authentication token sync and event buses across 5 isolated micro-frontends without tight coupling?',
        expectedAnswerRubric: 'Details BroadcastChannel API, CustomEvent bus with schema validation, shared Web Worker tokens.',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'cand-005',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'marcus.vance@example.com',
    phone: '+1 (917) 440-2819',
    location: 'New York, NY',
    title: 'Cloud Infrastructure Engineer',
    experienceYears: 7.0,
    currentCompany: 'AeroCloud Defense',
    education: {
      degree: 'B.S. in Computer Engineering',
      institution: 'Columbia University',
      year: '2019',
      gpa: '3.70'
    },
    jobId: 'job-1044',
    jobTitle: 'Cloud Infrastructure Architect',
    appliedDate: '5 days ago',
    status: 'ai_review',
    fitScore: 89,
    confidenceScore: 92,
    recommendation: 'PROCEED',
    recommendationReason: 'Extensive Kubernetes, Terraform, and multi-region AWS deployment track record. Strong fit for Infrastructure Architect role.',
    factorBreakdown: {
      coreSkills: 91,
      experienceRelevance: 90,
      oaPerformance: 85,
      codeQuality: 88,
      profileConsistency: 92
    },
    topMatchedSkills: ['Kubernetes', 'Terraform', 'AWS Multi-Region', 'CI/CD Pipelines', 'Prometheus'],
    skillGaps: ['GCP Anthos (Minor)'],
    verifiedSkills: [
      {
        name: 'Kubernetes Cluster Administration',
        level: 'Expert',
        score: 94,
        evidenceSource: 'Work History',
        evidenceSnippet: 'Managed 40+ production EKS clusters with automated node auto-scaling.',
        verified: true
      },
      {
        name: 'Infrastructure as Code (Terraform)',
        level: 'Expert',
        score: 92,
        evidenceSource: 'GitHub',
        evidenceSnippet: 'Authored modular Terraform modules for VPC peering and IAM least-privilege.',
        verified: true
      }
    ],
    experience: [
      {
        id: 'exp-501',
        role: 'Lead Cloud Infrastructure Engineer',
        company: 'AeroCloud Defense',
        period: '2021 — Present (3 yrs)',
        location: 'New York, NY',
        description: [
          'Designed high-compliance AWS infrastructure adhering to SOC2 Type II.',
          'Built GitOps delivery pipeline with ArgoCD and Helm across 6 environments.'
        ],
        keyDeliverables: [
          'Zero security incidents over 36 months of mission-critical cloud hosting.'
        ],
        skillsUsed: ['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus'],
        relevanceScore: 91
      }
    ],
    projects: [
      {
        id: 'proj-501',
        title: 'Multi-Cloud Disaster Recovery Failover Controller',
        description: 'Kubernetes operator that automatically shifts DNS and ingress traffic across AWS and GCP during region outage.',
        repoUrl: 'https://github.com/marcusvance/k8s-multi-cloud-operator',
        stars: 480,
        commits: 112,
        techStack: ['Go', 'Kubernetes API', 'AWS Route53', 'Cloudflare API'],
        highlights: ['Failover complete in under 30 seconds'],
        complexityScore: 92
      }
    ],
    oaResult: {
      assessmentId: 'oa-infra-lead',
      title: 'Cloud Infrastructure Architecture OA',
      totalScore: 85,
      completedAt: 'Oct 21, 2026 · 15:20 EST',
      timeSpentMinutes: 44,
      sections: [
        { name: 'Kubernetes Networking & Ingress', score: 92, maxScore: 100 },
        { name: 'Terraform State & Disaster Recovery', score: 86, maxScore: 100 },
        { name: 'Security & Least-Privilege IAM', score: 78, maxScore: 100 }
      ],
      codeQualityScore: 88,
      algorithmicScore: 82,
      systemDesignScore: 92,
      proctorTrustScore: 99,
      plagiarismIndex: 0.0
    },
    githubMetrics: {
      username: 'marcusvance',
      publicRepos: 15,
      totalStars: 720,
      totalCommitsLastYear: 520,
      contributedLanguages: [
        { lang: 'Go', percentage: 55 },
        { lang: 'HCL (Terraform)', percentage: 35 },
        { lang: 'Python', percentage: 10 }
      ],
      consistencyRating: 92,
      qualityRating: 90
    },
    interviewFocusAreas: [
      {
        topic: 'Kubernetes Zero-Trust Service Mesh & mTLS',
        rationale: 'Assessing experience with modern microservice network encryption.',
        suggestedQuestion: 'How would you implement Istio or Linkerd service mesh across multi-cluster Kubernetes with automated certificate rotation?',
        expectedAnswerRubric: 'Explains SPIRE / cert-manager, mutual TLS handshakes, Envoy sidecar proxies, and latency overhead mitigation.',
        difficulty: 'Hard'
      }
    ]
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    title: 'REST API Distributed Rate Limiter',
    difficulty: 'Medium',
    type: 'coding',
    category: 'Distributed Systems & Concurrency',
    timeLimitMinutes: 25,
    description: `Implement a high-throughput **RateLimiter** class that controls the rate of requests allowed for any given client ID based on a sliding window rate-limiting algorithm.

### Requirements:
1. \`allowRequest(String clientId, long timestampMs)\`: Returns \`true\` if the request is permitted within the configured \`maxRequestsPerWindow\`, or \`false\` if the limit has been exceeded.
2. The rate limiter must support arbitrary time windows (e.g. 100 requests per 60,000 milliseconds).
3. Ensure thread-safety and constant memory overhead per active client.`,
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class RateLimiter {
    private final int maxRequests;
    private final long windowSizeMs;
    private final Map<String, Deque<Long>> clientWindows;

    public RateLimiter(int maxRequests, long windowSizeMs) {
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeMs;
        this.clientWindows = new ConcurrentHashMap<>();
    }

    public synchronized boolean allowRequest(String clientId, long timestampMs) {
        // TODO: Implement sliding window rate limiting
        Deque<Long> timestamps = clientWindows.computeIfAbsent(clientId, k -> new ArrayDeque<>());
        
        // Evict expired timestamps outside the sliding window
        while (!timestamps.isEmpty() && (timestampMs - timestamps.peekFirst() >= windowSizeMs)) {
            timestamps.pollFirst();
        }
        
        if (timestamps.size() < maxRequests) {
            timestamps.addLast(timestampMs);
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        RateLimiter limiter = new RateLimiter(3, 1000);
        System.out.println("T=100: " + limiter.allowRequest("user_1", 100)); // true
        System.out.println("T=200: " + limiter.allowRequest("user_1", 200)); // true
        System.out.println("T=300: " + limiter.allowRequest("user_1", 300)); // true
        System.out.println("T=400: " + limiter.allowRequest("user_1", 400)); // false (exceeded)
        System.out.println("T=1200: " + limiter.allowRequest("user_1", 1200)); // true (window moved)
    }
}`,
      typescript: `export class RateLimiter {
  private maxRequests: number;
  private windowSizeMs: number;
  private clientWindows: Map<string, number[]>;

  constructor(maxRequests: number, windowSizeMs: number) {
    this.maxRequests = maxRequests;
    this.windowSizeMs = windowSizeMs;
    this.clientWindows = new Map();
  }

  public allowRequest(clientId: string, timestampMs: number): boolean {
    if (!this.clientWindows.has(clientId)) {
      this.clientWindows.set(clientId, []);
    }
    const timestamps = this.clientWindows.get(clientId)!;
    
    // Evict old timestamps
    while (timestamps.length > 0 && (timestampMs - timestamps[0] >= this.windowSizeMs)) {
      timestamps.shift();
    }

    if (timestamps.length < this.maxRequests) {
      timestamps.push(timestampMs);
      return true;
    }
    return false;
  }
}`,
      python: `from collections import deque

class RateLimiter:
    def __init__(self, max_requests: int, window_size_ms: int):
        self.max_requests = max_requests
        self.window_size_ms = window_size_ms
        self.client_windows = {}

    def allow_request(self, client_id: str, timestamp_ms: int) -> bool:
        if client_id not in self.client_windows:
            self.client_windows[client_id] = deque()
        
        timestamps = self.client_windows[client_id]
        while timestamps and (timestamp_ms - timestamps[0] >= self.window_size_ms):
            timestamps.popleft()
            
        if len(timestamps) < self.max_requests:
            timestamps.append(timestamp_ms)
            return True
        return False`
    },
    examples: [
      {
        input: 'limiter = RateLimiter(maxRequests=3, windowSizeMs=1000)\nallowRequest("user_1", 100)\nallowRequest("user_1", 200)\nallowRequest("user_1", 300)\nallowRequest("user_1", 400)',
        output: 'true, true, true, false',
        explanation: 'The 4th request at timestamp 400ms exceeds the 3-request limit for the 1000ms window.'
      }
    ],
    constraints: [
      '1 <= maxRequests <= 100,000',
      '100 <= windowSizeMs <= 86,400,000 (24h)',
      '1 <= clientId length <= 64',
      'Timestamps are monotonically non-decreasing'
    ],
    testCases: [
      { id: 'tc-1', input: '3 requests in 1000ms window', expectedOutput: 'Passed: 3 allowed, 4th throttled', isHidden: false },
      { id: 'tc-2', input: 'Sliding window expiration after 1100ms', expectedOutput: 'Passed: Old token evicted, new request allowed', isHidden: false },
      { id: 'tc-3', input: 'Concurrent distinct client IDs (multi-tenant)', expectedOutput: 'Passed: Client A limit does not impact Client B', isHidden: true },
      { id: 'tc-4', input: 'Burst load stress test (10,000 reqs)', expectedOutput: 'Passed: 0 memory leaks, latency < 0.05ms', isHidden: true }
    ],
    tags: ['Algorithms', 'Concurrency', 'Sliding Window', 'REST API']
  },
  {
    id: 2,
    title: 'Concurrent LRU Cache with TTL Eviction',
    difficulty: 'Hard',
    type: 'coding',
    category: 'Data Structures & Concurrency',
    timeLimitMinutes: 30,
    description: `Design and implement an in-memory **LRUCache** supporting Time-To-Live (TTL) expiration and constant time $O(1)$ \`get\` and \`put\` operations.

### Requirements:
1. \`get(key)\`: Returns value if key exists and has not expired; otherwise returns \`-1\`.
2. \`put(key, value, ttlMs)\`: Inserts or updates the key-value pair. If cache capacity is exceeded, evicts the Least Recently Used unexpired item.`,
    starterCode: {
      java: `import java.util.*;

public class LRUCacheWithTTL<K, V> {
    private final int capacity;

    public LRUCacheWithTTL(int capacity) {
        this.capacity = capacity;
    }

    public synchronized V get(K key) {
        // TODO: Return value or null if expired
        return null;
    }

    public synchronized void put(K key, V value, long ttlMs) {
        // TODO: Store with expiration and maintain LRU ordering
    }
}`,
      typescript: `export class LRUCacheWithTTL<K, V> {
  private capacity: number;
  private cache: Map<K, { value: V; expiresAt: number }>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | null {
    // TODO: implement
    return null;
  }

  put(key: K, value: V, ttlMs: number): void {
    // TODO: implement
  }
}`,
      python: `import time

class LRUCacheWithTTL:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key):
        # TODO: implement
        return None

    def put(self, key, value, ttl_ms: int):
        # TODO: implement
        pass`
    },
    examples: [
      {
        input: 'cache = LRUCacheWithTTL(2)\ncache.put("A", 100, ttlMs=500)\ncache.get("A")',
        output: '100 (if retrieved before 500ms)',
        explanation: 'Returns 100 while active, -1 after TTL expiration.'
      }
    ],
    constraints: [
      'Capacity: 1 <= capacity <= 50,000',
      'Time complexity for get() and put() must be strictly O(1)'
    ],
    testCases: [
      { id: 'tc-1', input: 'Basic LRU eviction when capacity reached', expectedOutput: 'Passed: Oldest untouched key evicted', isHidden: false },
      { id: 'tc-2', input: 'TTL expiration before retrieval', expectedOutput: 'Passed: Expired item returns null', isHidden: false },
      { id: 'tc-3', input: 'High-frequency read/write race condition', expectedOutput: 'Passed: Thread-safe data integrity maintained', isHidden: true }
    ],
    tags: ['Data Structures', 'LRU', 'TTL', 'System Design']
  },
  {
    id: 3,
    title: 'Graph Dependency Cycle Detector (DAG Validator)',
    difficulty: 'Medium',
    type: 'coding',
    category: 'Algorithms & Graph Theory',
    timeLimitMinutes: 20,
    description: `Given a set of build tasks and their directional dependencies, determine if a valid build execution order exists without any cyclic deadlocks. Return the topological order or an empty array if a cycle is detected.`,
    starterCode: {
      java: `import java.util.*;

public class DAGValidator {
    public static List<String> findBuildOrder(List<String> tasks, List<String[]> dependencies) {
        // TODO: Return topological sort or empty list if cycle exists
        return new ArrayList<>();
    }
}`,
      typescript: `export function findBuildOrder(tasks: string[], dependencies: [string, string][]): string[] {
  // TODO: Topological sort with Kahn's algorithm or DFS
  return [];
}`,
      python: `def find_build_order(tasks: list, dependencies: list) -> list:
    # TODO: Topological sort
    return []`
    },
    examples: [
      {
        input: 'tasks=["compile", "test", "package", "deploy"], dependencies=[["compile", "test"], ["test", "package"], ["package", "deploy"]]',
        output: '["compile", "test", "package", "deploy"]',
        explanation: 'Linear dependency chain with no cycles.'
      }
    ],
    constraints: ['1 <= tasks.length <= 10,000', '0 <= dependencies.length <= 50,000'],
    testCases: [
      { id: 'tc-1', input: 'Standard DAG without cycles', expectedOutput: 'Passed: Valid topological order returned', isHidden: false },
      { id: 'tc-2', input: 'A -> B -> C -> A cycle detection', expectedOutput: 'Passed: Returns empty array on deadlock cycle', isHidden: false }
    ],
    tags: ['Graph', 'Topological Sort', 'Kahn Algorithm']
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2026-10-24 16:42:10 PST',
    candidateId: 'cand-001',
    candidateName: 'Elena Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Senior Java Developer (REQ-1042)',
    aiRecommendation: 'PROCEED',
    aiFitScore: 94,
    recruiterAction: 'Approved for Interview',
    recruiterName: 'David Sterling (Lead Tech Recruiter)',
    isOverride: false,
    notes: 'Agreed with AI recommendation. Candidate demonstrated stellar microservice architecture in OA and verified GitHub repositories.'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-24 14:15:33 PST',
    candidateId: 'cand-002',
    candidateName: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Senior Java Developer (REQ-1042)',
    aiRecommendation: 'PROCEED',
    aiFitScore: 91,
    recruiterAction: 'Approved for Interview',
    recruiterName: 'David Sterling (Lead Tech Recruiter)',
    isOverride: false,
    notes: 'Strong OA results (88%) and clean coding conventions. Scheduled for Round 2 technical panel.'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-24 11:20:05 PST',
    candidateId: 'cand-003',
    candidateName: 'Jordan Reese',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Senior Java Developer (REQ-1042)',
    aiRecommendation: 'NEEDS_REVIEW',
    aiFitScore: 78,
    recruiterAction: 'Flagged for Review',
    recruiterName: 'Jessica Martinez (Engineering Manager)',
    isOverride: false,
    notes: 'Candidate seems strong for Mid-level Java role, but not Senior REQ-1042. Suggested routing to Mid-level pipeline REQ-1049.'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-23 18:05:44 PST',
    candidateId: 'cand-004',
    candidateName: 'Sarah Lin',
    candidateAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Staff Frontend Engineer (REQ-1043)',
    aiRecommendation: 'PROCEED',
    aiFitScore: 97,
    recruiterAction: 'Approved for Interview',
    recruiterName: 'David Sterling (Lead Tech Recruiter)',
    isOverride: false,
    notes: 'Exceptional candidate. Fast-tracked straight to VP Engineering interview loop.'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-23 09:30:12 PST',
    candidateId: 'cand-005',
    candidateName: 'Marcus Vance',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Cloud Infrastructure Architect (REQ-1044)',
    aiRecommendation: 'PROCEED',
    aiFitScore: 89,
    recruiterAction: 'Approved for OA',
    recruiterName: 'Jessica Martinez (Engineering Manager)',
    isOverride: false,
    notes: 'Strong DevOps track record, dispatched customized Kubernetes & Terraform OA module.'
  }
];

export const PIPELINE_STAGES = [
  { id: 'applied', label: 'Applied', color: 'bg-slate-500' },
  { id: 'ats_shortlist', label: 'ATS Shortlist', color: 'bg-blue-500' },
  { id: 'ai_review', label: 'AI Review', color: 'bg-purple-500' },
  { id: 'oa_pending', label: 'OA Stage', color: 'bg-amber-500' },
  { id: 'interview_scheduled', label: 'Interview', color: 'bg-indigo-500' },
  { id: 'offer_extended', label: 'Offer / Hired', color: 'bg-emerald-500' }
];

export const mockJobs = INITIAL_JOBS;
export const mockCandidates = INITIAL_CANDIDATES;
export const mockQuestions = ASSESSMENT_QUESTIONS;
export const mockAuditLogs = INITIAL_AUDIT_LOGS;

