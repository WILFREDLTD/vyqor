import fs from "fs";
import path from "path";

const BASE_URL = "https://vicotech.netlify.app";
const today = new Date().toISOString().slice(0, 10);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const pages = [
  {
    route: "/about",
    title: "About | VicoTech",
    description: "VicoTech is an African infrastructure engineering company focused on backend systems, integrations, and enterprise-grade reliability.",
    keywords: "infrastructure engineering, African fintech, enterprise systems, reliability",
    heroLabel: "About",
    heroTitle: "Infrastructure engineering for African businesses",
    heroLead: "We build backend systems, operational automation, and integration platforms that run reliably under real enterprise loads.",
    sections: [
      {
        heading: "Mission",
        body: "Deliver enterprise-grade infrastructure, security, and reliability for fast-growing digital businesses across Africa.",
      },
      {
        heading: "Engineering mindset",
        body: "We prioritize observability, resilience, and architecture patterns that scale with complexity.",
      },
    ],
  },
  {
    route: "/contact",
    title: "Contact | VicoTech",
    description: "Contact VicoTech for enterprise integrations, backend architecture, cloud operations, and technical partnerships.",
    keywords: "enterprise contact, architecture consultation, fintech partnerships, infrastructure inquiry",
    heroLabel: "Contact",
    heroTitle: "Talk to a systems engineering team",
    heroLead: "Reach out for enterprise consultations, infrastructure planning, or integration projects.",
    sections: [
      {
        heading: "Inquiry types",
        body: "Sales, architecture reviews, platform integration planning, and long-term operational support.",
      },
    ],
  },
  {
    route: "/services",
    title: "Services | VicoTech",
    description: "Services for backend engineering, cloud operations, payment integrations, API development, and enterprise systems.",
    keywords: "backend engineering, cloud DevOps, payment integrations, API development, enterprise systems",
    heroLabel: "Services",
    heroTitle: "Infrastructure-focused engineering services",
    heroLead: "We deliver the technical services that power modern digital platforms: backend, APIs, integrations, cloud, and security.",
    cards: [
      { title: "Backend Engineering", text: "Designing scalable APIs, event-driven systems, and transactional platforms." },
      { title: "Cloud & DevOps", text: "Deployments, infrastructure automation, and operational tooling for uptime." },
      { title: "Integrations", text: "Payment rails, ERP, POS, and banking systems connected securely." },
    ],
  },
  {
    route: "/services/backend-engineering",
    title: "Backend Engineering | VicoTech",
    description: "Scalable backend engineering for APIs, microservices, event pipelines, and reliable transaction processing.",
    keywords: "backend engineering, microservices, event-driven architecture, APIs, transaction processing",
    heroLabel: "Service",
    heroTitle: "Backend engineering for scale",
    heroLead: "Build the core systems, APIs, and data flows that support modern enterprise operations.",
    sections: [
      { heading: "What we deliver", body: "Microservices, event-driven pipelines, data orchestration, and resilient business logic." },
      { heading: "Why it matters", body: "A strong backend means higher uptime, faster integrations, and less operational risk." },
    ],
  },
  {
    route: "/services/payment-integrations",
    title: "Payment Integrations | VicoTech",
    description: "Payment integration services for M-Pesa, banking APIs, POS systems, and reconciliation workflows.",
    keywords: "payment integrations, M-Pesa, banking APIs, POS integration, reconciliation",
    heroLabel: "Service",
    heroTitle: "Payment and transaction integration services",
    heroLead: "Connect payment rails, automate settlements, and build reconciliation workflows for fintech operations.",
    sections: [
      { heading: "Core capabilities", body: "Integrate local payment networks, bank APIs, and merchant systems with secure transaction flows." },
      { heading: "Operational trust", body: "Monitor payment events, handle exceptions, and reduce reconciliation gaps." },
    ],
  },
  {
    route: "/services/cloud-devops",
    title: "Cloud & DevOps | VicoTech",
    description: "Cloud architecture and DevOps services for infrastructure automation, observability, and deployment reliability.",
    keywords: "cloud architecture, DevOps, infrastructure automation, observability, CI/CD",
    heroLabel: "Service",
    heroTitle: "Cloud and DevOps engineering",
    heroLead: "Build infrastructure that deploys safely, scales reliably, and is easy to operate over time.",
    sections: [
      { heading: "Infrastructure automation", body: "IaC, deployment pipelines, and repeatable environments." },
      { heading: "Observability", body: "Monitoring, alerts, and operational dashboards for platform health." },
    ],
  },
  {
    route: "/services/api-development",
    title: "API Development | VicoTech",
    description: "Enterprise API development for secure integrations, developer adoption, and platform extensibility.",
    keywords: "API development, API architecture, developer portals, secure APIs, enterprise APIs",
    heroLabel: "Service",
    heroTitle: "API development for ecosystem integration",
    heroLead: "Design APIs that are easy to adopt, secure, and built for long-term platform growth.",
    sections: [
      { heading: "Design principles", body: "Semantic endpoints, versioning, and robust authentication patterns." },
      { heading: "Developer experience", body: "Documentation, SDK support, and reliable API contracts." },
    ],
  },
  {
    route: "/services/enterprise-systems",
    title: "Enterprise Systems | VicoTech",
    description: "Enterprise systems services for ERP, operations platforms, and integration-ready infrastructure.",
    keywords: "enterprise systems, ERP, operations platforms, enterprise infrastructure",
    heroLabel: "Service",
    heroTitle: "Enterprise systems engineering",
    heroLead: "Create the operational platforms that support commerce, inventory, finance, and logistics." ,
    sections: [
      { heading: "Enterprise structure", body: "Modular platforms that connect core operations, finance, and customer workflows." },
      { heading: "Integration-ready", body: "Built to connect with payments, POS, ERP, and analytics systems." },
    ],
  },
  {
    route: "/services/cybersecurity",
    title: "Cybersecurity | VicoTech",
    description: "Cybersecurity services for infrastructure hardening, access control, encryption, and audit readiness.",
    keywords: "cybersecurity, access control, encryption, audit readiness, infrastructure security",
    heroLabel: "Service",
    heroTitle: "Cybersecurity for infrastructure",
    heroLead: "Protect systems with secure access, encrypted data flows, and monitoring for anomalous activity.",
    sections: [
      { heading: "Risk reduction", body: "RBAC, secure data flow controls, and defense-in-depth architecture." },
      { heading: "Compliance readiness", body: "Audit trails, logging, and secure operations for enterprise environments." },
    ],
  },
  {
    route: "/services/mobile-development",
    title: "Mobile Development | VicoTech",
    description: "Mobile development services for cross-platform apps, native experiences, and backend integrations.",
    keywords: "mobile development, React Native, Flutter, native iOS, native Android, backend integration",
    heroLabel: "Service",
    heroTitle: "Mobile development with backend-ready architecture",
    heroLead: "Build mobile experiences that connect securely to payments, APIs, and enterprise services.",
    sections: [
      { heading: "Platform support", body: "Cross-platform and native mobile apps with shared backend contracts." },
      { heading: "Operational support", body: "CI/CD, app deployment, and performance monitoring for mobile releases." },
    ],
  },
  {
    route: "/services/ecommerce-platforms",
    title: "E-commerce Platforms | VicoTech",
    description: "E-commerce platform engineering for checkout, inventory, payments, and complex retail operations.",
    keywords: "ecommerce platforms, checkout systems, inventory management, retail infrastructure",
    heroLabel: "Service",
    heroTitle: "E-commerce platform engineering",
    heroLead: "Deliver commerce systems that handle inventory, payments, and fulfillment at enterprise scale.",
    sections: [
      { heading: "Commerce reliability", body: "Order processing, inventory rules, and checkout orchestration." },
      { heading: "Retail operations", body: "Integrated workflows for payments, reconciliation, and customer experience." },
    ],
  },
  {
    route: "/solutions",
    title: "Solutions | VicoTech",
    description: "Solution platforms for retail operations, analytics, notifications, and enterprise infrastructure.",
    keywords: "solutions, retail infrastructure, analytics platforms, notifications, enterprise systems",
    heroLabel: "Solutions",
    heroTitle: "Platform solutions for infrastructure teams",
    heroLead: "We build solution platforms that solve operational challenges and reduce complexity across digital products.",
    cards: [
      { title: "ERP systems", text: "Operational systems for inventory, finance, and retail workflows." },
      { title: "Analytics platforms", text: "Data pipelines and dashboards for real-time operational insight." },
      { title: "Notification systems", text: "Reliable messaging and alerting across customer and operations channels." },
    ],
  },
  {
    route: "/solutions/erp-systems",
    title: "ERP Systems | VicoTech",
    description: "ERP systems for inventory, finance, supply chain, and enterprise workflow orchestration.",
    keywords: "ERP systems, enterprise resource planning, inventory systems, supply chain",
    heroLabel: "Solution",
    heroTitle: "ERP systems for modern operations",
    heroLead: "Design and deploy enterprise resource planning systems that connect inventory, finance, and supply chain workflows.",
    sections: [
      { heading: "Business impact", body: "Unify core operational data and workflows into a single, maintainable platform." },
      { heading: "Integration", body: "Connect ERP with payments, warehouse systems, and analytics workflows." },
    ],
  },
  {
    route: "/solutions/retail-infrastructure",
    title: "Retail Infrastructure | VicoTech",
    description: "Retail infrastructure platforms for POS integration, inventory control, payment reconciliation, and omnichannel operations.",
    keywords: "retail infrastructure, POS integration, inventory control, payment reconciliation",
    heroLabel: "Solution",
    heroTitle: "Retail infrastructure for enterprise commerce",
    heroLead: "Build retail platforms that connect point-of-sale systems, payment rails, and operational reporting.",
    sections: [
      { heading: "Retail operations", body: "Connect stores, payment flows, and inventory in a resilient infrastructure model." },
      { heading: "Omnichannel support", body: "Support online and physical retail with aligned data and transaction flows." },
    ],
  },
  {
    route: "/solutions/analytics-platforms",
    title: "Analytics Platforms | VicoTech",
    description: "Analytics platforms for operational reporting, dashboards, and data-driven decision making.",
    keywords: "analytics platforms, reporting, dashboards, operational intelligence",
    heroLabel: "Solution",
    heroTitle: "Analytics platforms for business visibility",
    heroLead: "Deliver analytics systems that turn operational and payment data into actionable insight.",
    sections: [
      { heading: "Operational insight", body: "Monitor transactions, performance, and business metrics in real time." },
      { heading: "Data pipeline", body: "Build reliable ingestion, transformation, and reporting pipelines." },
    ],
  },
  {
    route: "/solutions/notification-systems",
    title: "Notification Systems | VicoTech",
    description: "Notification systems for transactional alerts, customer messaging, and operational workflows.",
    keywords: "notification systems, transactional alerts, customer messaging, operational workflows",
    heroLabel: "Solution",
    heroTitle: "Reliable notification systems",
    heroLead: "Create messaging platforms that deliver alerts, confirmations, and operational events consistently.",
    sections: [
      { heading: "Message reliability", body: "Ensure notifications are delivered and audited across email, SMS, and mobile channels." },
      { heading: "Operational alerts", body: "Surface issues to teams with high-priority alerts and incident workflows." },
    ],
  },
  {
    route: "/industries",
    title: "Industries | VicoTech",
    description: "Industry-focused infrastructure for fintech, retail, logistics, healthcare, and sports operations.",
    keywords: "industry infrastructure, fintech, retail, logistics, healthcare, sports",
    heroLabel: "Industries",
    heroTitle: "Infrastructure for core industries",
    heroLead: "We solve operational and technology challenges across finance, retail, logistics, healthcare, and sports.",
    cards: [
      { title: "Fintech", text: "Payments, compliance, and ledger systems for financial services." },
      { title: "Retail", text: "POS, inventory, and settlement platforms for retail networks." },
      { title: "Logistics", text: "Tracking, fulfillment, and operational visibility systems." },
    ],
  },
  {
    route: "/industries/retail",
    title: "Retail Infrastructure | VicoTech",
    description: "Retail infrastructure engineering for POS, inventory, payments, and omnichannel operations.",
    keywords: "retail infrastructure, POS, inventory, omnichannel, payments",
    heroLabel: "Industry",
    heroTitle: "Retail infrastructure engineering",
    heroLead: "Build retail platforms that tie sales, stock, and payment data into reliable workflows.",
    sections: [
      { heading: "Core challenges", body: "Managing inventory, POS data, and settlements across stores and channels." },
      { heading: "Platform benefits", body: "Faster reconciliation, fewer outages, and consistent store operations." },
    ],
  },
  {
    route: "/industries/fintech",
    title: "Fintech Infrastructure | VicoTech",
    description: "Fintech infrastructure for payments, ledgers, reconciliation, and secure operations.",
    keywords: "fintech infrastructure, payments, reconciliation, ledgers, financial platforms",
    heroLabel: "Industry",
    heroTitle: "Fintech infrastructure for Africa",
    heroLead: "Deliver reliable payment systems, compliance-aware platforms, and transaction processing infrastructure.",
    sections: [
      { heading: "Key needs", body: "Trustworthy payments, auditability, and secure transaction orchestration." },
      { heading: "Platform impact", body: "Stability of financial operations and clear settlement workflows." },
    ],
  },
  {
    route: "/industries/logistics",
    title: "Logistics Infrastructure | VicoTech",
    description: "Logistics infrastructure for tracking, routing, delivery orchestration, and operational visibility.",
    keywords: "logistics infrastructure, tracking, routing, delivery, operational visibility",
    heroLabel: "Industry",
    heroTitle: "Logistics infrastructure engineering",
    heroLead: "Build platforms that manage routes, delivery status, and operational metrics in real-time.",
    sections: [
      { heading: "Operational view", body: "Track shipments, coordinate deliveries, and manage exceptions with system alerts." },
      { heading: "Systems integration", body: "Connect logistics workflows to payments, warehouses, and customer updates." },
    ],
  },
  {
    route: "/industries/healthcare",
    title: "Healthcare Infrastructure | VicoTech",
    description: "Healthcare infrastructure for secure data flows, patient operations, and compliant integrations.",
    keywords: "healthcare infrastructure, secure data, compliance, patient operations",
    heroLabel: "Industry",
    heroTitle: "Healthcare infrastructure systems",
    heroLead: "Deliver secure and compliant infrastructure for medical operations, records, and logistics.",
    sections: [
      { heading: "Security and compliance", body: "Protected health data, audit trails, and access controls." },
      { heading: "Operational reliability", body: "Uptime for care systems and dependable workflows for services." },
    ],
  },
  {
    route: "/industries/sports",
    title: "Sports Infrastructure | VicoTech",
    description: "Sports technology infrastructure for ticketing, events, registrations, and performance operations.",
    keywords: "sports infrastructure, event systems, ticketing, registration, performance",
    heroLabel: "Industry",
    heroTitle: "Sports infrastructure engineering",
    heroLead: "Build systems for event registrations, ticketing, and operational coordination in sports ecosystems.",
    sections: [
      { heading: "Event readiness", body: "Manage registration, attendance, and communication for sports events." },
      { heading: "Performance systems", body: "Offer reliable systems for scheduling, team coordination, and metrics." },
    ],
  },
  {
    route: "/security",
    title: "Security | VicoTech",
    description: "Infrastructure security services for TLS, RBAC, audit logs, compliance readiness, and disaster recovery.",
    keywords: "security, TLS, RBAC, audit logs, disaster recovery, compliance",
    heroLabel: "Security",
    heroTitle: "Infrastructure security and compliance",
    heroLead: "Protect systems with secure connections, access controls, auditability, and recovery planning.",
    sections: [
      { heading: "Defenses", body: "TLS, secure integrations, and perimeter protections for infrastructure." },
      { heading: "Trust", body: "RBAC, audit logging, and policy controls for enterprise operations." },
    ],
  },
  {
    route: "/integrations",
    title: "Integrations | VicoTech",
    description: "Integration services for M-Pesa, banking APIs, ERP, POS, and accounting systems.",
    keywords: "integrations, M-Pesa, banking APIs, ERP, POS, accounting",
    heroLabel: "Integrations",
    heroTitle: "Ecosystem integration services",
    heroLead: "Connect platforms across payment, enterprise, and operational ecosystems with secure integration patterns.",
    cards: [
      { title: "M-Pesa", text: "Local mobile money and payment workflows." },
      { title: "Banking APIs", text: "Secure and compliant bank integrations." },
      { title: "ERP", text: "Enterprise resource planning system connections." },
    ],
  },
  {
    route: "/integrations/mpesa",
    title: "M-Pesa Integrations | VicoTech",
    description: "M-Pesa integration services for payment acceptance, reconciliation, and operational flows.",
    keywords: "M-Pesa integrations, mobile money, payment acceptance, reconciliation",
    heroLabel: "Integration",
    heroTitle: "M-Pesa integration services",
    heroLead: "Connect mobile money payments into your platform with reliable reconciliation and settlement support.",
    sections: [
      { heading: "Local payments", body: "Integrate M-Pesa into transactional workflows and reporting systems." },
      { heading: "Stability", body: "Handle network retries, confirmations, and exception reconciliation." },
    ],
  },
  {
    route: "/integrations/banking",
    title: "Banking Integrations | VicoTech",
    description: "Banking API integration services for transfers, settlements, and account orchestration.",
    keywords: "banking integrations, banking APIs, transfers, settlements",
    heroLabel: "Integration",
    heroTitle: "Banking API integrations",
    heroLead: "Connect your platform to bank APIs for transfers, settlements, and account workflows.",
    sections: [
      { heading: "Connected finance", body: "Enable bank-level transfers and reconciliation in your systems." },
      { heading: "Operational controls", body: "Build secure workflows for payouts, receipts, and account state." },
    ],
  },
  {
    route: "/integrations/erp",
    title: "ERP Integrations | VicoTech",
    description: "ERP integration services that connect finance, inventory, and operational systems.",
    keywords: "ERP integrations, finance systems, inventory systems, operational integration",
    heroLabel: "Integration",
    heroTitle: "ERP integration services",
    heroLead: "Link ERP systems into payments, inventory, and enterprise workflows." ,
    sections: [
      { heading: "Data synchronization", body: "Keep financial and inventory data aligned across platforms." },
      { heading: "Process automation", body: "Automate routine enterprise workflows with integrated systems." },
    ],
  },
  {
    route: "/integrations/pos",
    title: "POS Integrations | VicoTech",
    description: "POS integration services for retail checkout, inventory updates, and reconciled transactions.",
    keywords: "POS integrations, retail checkout, inventory updates, transaction reconciliation",
    heroLabel: "Integration",
    heroTitle: "POS integration services",
    heroLead: "Connect point-of-sale systems to central operations, inventory, and payments platforms.",
    sections: [
      { heading: "Retail accuracy", body: "Keep sales, stock, and payments aligned in real time." },
      { heading: "Settlement workflows", body: "Reconcile POS activity with finance and payments systems." },
    ],
  },
  {
    route: "/integrations/accounting",
    title: "Accounting Integrations | VicoTech",
    description: "Accounting system integration services for ledger synchronization and financial reporting.",
    keywords: "accounting integrations, ledger sync, financial reporting, ERP accounting",
    heroLabel: "Integration",
    heroTitle: "Accounting integrations",
    heroLead: "Connect accounting ledgers, invoices, and financial reporting systems to your infrastructure.",
    sections: [
      { heading: "Financial clarity", body: "Push transaction and invoice data into accounting systems cleanly." },
      { heading: "Audit readiness", body: "Create a reliable financial trail for reporting and compliance." },
    ],
  },
  {
    route: "/engineering",
    title: "Engineering | VicoTech",
    description: "Engineering and architecture services for event-driven systems, observability, reliability, and scalable deployments.",
    keywords: "engineering, architecture, event-driven systems, observability, reliability",
    heroLabel: "Engineering",
    heroTitle: "Architecture and engineering for reliable systems",
    heroLead: "Design infrastructure with event-driven patterns, observability, and deployment discipline.",
    sections: [
      { heading: "Design goals", body: "Event-driven workflows, distributed systems, and resilient service design." },
      { heading: "Operational excellence", body: "Observability, deployments, and reliability engineering baked into architecture." },
    ],
  },
  {
    route: "/insights",
    title: "Insights | VicoTech",
    description: "Insights on payment systems, observability, event-driven architecture, and infrastructure strategy.",
    keywords: "insights, payment systems, observability, event driven architecture, infrastructure strategy",
    heroLabel: "Insights",
    heroTitle: "Technical insights on infrastructure engineering",
    heroLead: "Read technical content focused on modern systems, payments, observability, and platform operations.",
    cards: [
      { title: "Scaling fintech systems", text: "Patterns for handling transaction volume and reliability." },
      { title: "Backend observability", text: "Monitoring and metrics for backend operations." },
      { title: "Event-driven architecture", text: "Design patterns for decoupled, resilient systems." },
    ],
  },
  {
    route: "/insights/event-driven-architecture",
    title: "Event-Driven Architecture | VicoTech",
    description: "Insights on event-driven architecture, asynchronous flows, and resilient system design.",
    keywords: "event-driven architecture, asynchronous systems, resilient design, infrastructure insights",
    heroLabel: "Insight",
    heroTitle: "Event-driven architecture patterns",
    heroLead: "Use events to build decoupled and scalable systems that handle asynchronous workflows cleanly.",
    sections: [
      { heading: "Architecture pattern", body: "Event streams, message processing, and resilient retry behavior." },
      { heading: "Operational benefits", body: "Better scalability, fault isolation, and integration flexibility." },
    ],
  },
  {
    route: "/insights/scaling-fintech-systems",
    title: "Scaling Fintech Systems | VicoTech",
    description: "Insights on scaling fintech platforms, payment resiliency, and operational stability.",
    keywords: "scaling fintech systems, payment resiliency, operational stability, infrastructure insights",
    heroLabel: "Insight",
    heroTitle: "Scaling fintech systems",
    heroLead: "Learn infrastructure patterns for reliable and scalable financial platforms.",
    sections: [
      { heading: "Resiliency", body: "Design for transaction retries, queuing, and service isolation." },
      { heading: "Throughput", body: "Support higher volumes without compromising reliability." },
    ],
  },
  {
    route: "/insights/mpesa-integration-patterns",
    title: "M-Pesa Integration Patterns | VicoTech",
    description: "Insights on M-Pesa integration patterns, reconciliation, and transaction orchestration.",
    keywords: "M-Pesa integration patterns, reconciliation, transaction orchestration, insights",
    heroLabel: "Insight",
    heroTitle: "M-Pesa integration patterns",
    heroLead: "Best practices for connecting mobile money into enterprise platforms.",
    sections: [
      { heading: "Integration patterns", body: "Polling, callbacks, and transaction confirmation handling." },
      { heading: "Reconciliation", body: "Align M-Pesa events with settlement and reporting systems." },
    ],
  },
  {
    route: "/insights/backend-observability",
    title: "Backend Observability | VicoTech",
    description: "Insights on backend observability, dashboards, logs, and incident readiness.",
    keywords: "backend observability, logs, dashboards, incident readiness, infrastructure insights",
    heroLabel: "Insight",
    heroTitle: "Backend observability and platform health",
    heroLead: "Build monitoring and logging into your backend systems so issues are detected and resolved quickly.",
    sections: [
      { heading: "Visibility", body: "Metrics, logs, and traces for backend performance and reliability." },
      { heading: "Incident readiness", body: "Alerting, runbooks, and operational insight for rapid response." },
    ],
  },
  {
    route: "/case-studies",
    title: "Case Studies | VicoTech",
    description: "Case studies showing infrastructure architecture, problem solving, and measurable outcomes.",
    keywords: "case studies, infrastructure architecture, problem solving, outcomes",
    heroLabel: "Case Studies",
    heroTitle: "Infrastructure case studies",
    heroLead: "Read how infrastructure, integrations, and operations were designed for enterprise-ready outcomes.",
    cards: [
      { title: "Payment infrastructure", text: "Reliable transaction routing and settlement processes." },
      { title: "Retail automation", text: "Connected checkout, inventory, and financial workflows." },
      { title: "Logistics dashboards", text: "Operational visibility for delivery and fulfillment." },
    ],
  },
  {
    route: "/case-studies/payment-infrastructure",
    title: "Payment Infrastructure Case Study | VicoTech",
    description: "A case study on building payment infrastructure, reconciliation, and transaction reliability.",
    keywords: "payment infrastructure case study, reconciliation, transaction reliability",
    heroLabel: "Case Study",
    heroTitle: "Payment infrastructure architecture",
    heroLead: "A project example describing payment routing, settlement workflows, and operational reliability.",
    sections: [
      { heading: "Challenge", body: "Designing payment infrastructure for high-volume transaction processing." },
      { heading: "Outcome", body: "Improved settlement accuracy and operational visibility." },
    ],
  },
  {
    route: "/case-studies/retail-automation",
    title: "Retail Automation Case Study | VicoTech",
    description: "A case study on retail automation, POS connectivity, and inventory control.",
    keywords: "retail automation case study, POS connectivity, inventory control",
    heroLabel: "Case Study",
    heroTitle: "Retail automation architecture",
    heroLead: "A case study showing how retail operations were automated and data flows stabilized.",
    sections: [
      { heading: "Challenge", body: "Connecting POS systems, inventory, and payment reconciliation." },
      { heading: "Outcome", body: "Faster reconciliation and more accurate stock reporting." },
    ],
  },
  {
    route: "/case-studies/logistics-dashboard",
    title: "Logistics Dashboard Case Study | VicoTech",
    description: "A case study on building logistics dashboards for delivery tracking and operational control.",
    keywords: "logistics dashboard case study, delivery tracking, operational control",
    heroLabel: "Case Study",
    heroTitle: "Logistics dashboard architecture",
    heroLead: "A case study on delivering operational dashboards for logistics and fulfillment teams.",
    sections: [
      { heading: "Challenge", body: "Providing real-time visibility into delivery and fulfillment operations." },
      { heading: "Outcome", body: "Improved delivery monitoring and issue resolution." },
    ],
  },
];

function renderNav() {
  return navLinks
    .map(
      (link) => `<a href="${link.href}" class="nav-link">${link.label}</a>`
    )
    .join("\n          ");
}

function renderCards(cards = []) {
  return cards
    .map(
      (card) => `<div class="card"><h3>${card.title}</h3><p class="muted">${card.text}</p></div>`
    )
    .join("\n        ");
}

function renderSections(sections = []) {
  return sections
    .map(
      (section) => `<section style="margin-top:20px"><h3>${section.heading}</h3><p>${section.body}</p></section>`
    )
    .join("\n      ");
}

function buildBreadcrumbList(page) {
  const items = [
    { position: 1, name: "Home", item: `${BASE_URL}/` },
    { position: 2, name: page.title.replace(/ \|.*$/, ""), item: `${BASE_URL}${page.route}` },
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };
}

function buildPageSchema(page) {
  const pageUrl = `${BASE_URL}${page.route}`;
  const baseWebPage = {
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: pageUrl,
  };

  if (page.route === "/about") {
    return { ...baseWebPage, "@type": "AboutPage" };
  }

  if (page.route === "/contact") {
    return {
      ...baseWebPage,
      "@type": "ContactPage",
      potentialAction: {
        "@type": "CommunicateAction",
        name: "Contact VicoTech",
      },
    };
  }

  if (page.route.startsWith("/services/") && page.route !== "/services") {
    return {
      "@type": "Service",
      name: page.title,
      description: page.description,
      provider: {
        "@type": "Organization",
        name: "VicoTech",
        url: BASE_URL,
      },
      areaServed: "Africa",
      serviceType: page.title.replace(" | VicoTech", ""),
      url: pageUrl,
    };
  }

  if (page.route === "/services") {
    return {
      ...baseWebPage,
      "@type": "CollectionPage",
      hasPart: page.cards?.map((card, index) => ({
        "@type": "Service",
        name: card.title,
        description: card.text,
      })),
    };
  }

  if (page.route.startsWith("/solutions/")) {
    return {
      "@type": "Product",
      name: page.title,
      description: page.description,
      brand: {
        "@type": "Brand",
        name: "VicoTech",
      },
      url: pageUrl,
    };
  }

  if (page.route === "/solutions") {
    return {
      ...baseWebPage,
      "@type": "CollectionPage",
      hasPart: page.cards?.map((card) => ({
        "@type": "Product",
        name: card.title,
        description: card.text,
      })),
    };
  }

  if (page.route.startsWith("/industries/")) {
    return {
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: pageUrl,
      about: {
        "@type": "Thing",
        name: page.title.replace(" | VicoTech", ""),
      },
    };
  }

  if (page.route === "/industries") {
    return {
      ...baseWebPage,
      "@type": "CollectionPage",
      hasPart: page.cards?.map((card) => ({
        "@type": "Thing",
        name: card.title,
        description: card.text,
      })),
    };
  }

  if (page.route.startsWith("/insights")) {
    return {
      "@type": "Article",
      headline: page.title,
      description: page.description,
      url: pageUrl,
      datePublished: today,
      author: {
        "@type": "Organization",
        name: "VicoTech",
      },
      publisher: {
        "@type": "Organization",
        name: "VicoTech",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/vico.png`,
        },
      },
    };
  }

  if (page.route.startsWith("/case-studies")) {
    return {
      "@type": "Article",
      headline: page.title,
      description: page.description,
      url: pageUrl,
      datePublished: today,
      articleSection: "Case Study",
      author: {
        "@type": "Organization",
        name: "VicoTech",
      },
      publisher: {
        "@type": "Organization",
        name: "VicoTech",
      },
    };
  }

  if (page.route === "/security" || page.route === "/integrations" || page.route === "/engineering") {
    return {
      ...baseWebPage,
      "@type": "WebPage",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE_URL}/nexus.png`,
      },
    };
  }

  return baseWebPage;
}

function renderStructuredData(page) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VicoTech",
    url: BASE_URL,
    logo: `${BASE_URL}/vico.png`,
    sameAs: [],
  };

  const pageSchema = buildPageSchema(page);
  const breadcrumb = buildBreadcrumbList(page);

  return JSON.stringify([organization, pageSchema, breadcrumb], null, 2);
}

function buildHtml(page) {
  const canonical = `${BASE_URL}${page.route}`;
  const ogImage = `${BASE_URL}/nexus.png`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="${page.keywords}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${ogImage}">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="brand brand-gradient">vico softwares</div>
      <nav>
        ${renderNav()}
      </nav>
    </header>
    <main>
      <section class="hero">
        <div class="pill">${page.heroLabel}</div>
        <h1>${page.heroTitle}</h1>
        <p class="lead">${page.heroLead}</p>
        <p><a class="cta" href="${BASE_URL}/contact">Talk to our team</a></p>
      </section>
      ${page.cards ? `<section class="grid">${renderCards(page.cards)}</section>` : ""}
      ${renderSections(page.sections || [])}
    </main>
    <footer>
      <div class="muted">VicoTech — Infrastructure engineering for enterprise systems. <a href="${BASE_URL}">Official site</a></div>
    </footer>
  </div>
  <script type="application/ld+json">
  ${renderStructuredData(page)}
  </script>
</body>
</html>`;
}

const sitemapEntries = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/solutions", changefreq: "weekly", priority: "0.9" },
  { loc: "/services", changefreq: "weekly", priority: "0.85" },
  { loc: "/industries", changefreq: "weekly", priority: "0.8" },
  { loc: "/case-studies", changefreq: "monthly", priority: "0.75" },
  { loc: "/insights", changefreq: "weekly", priority: "0.7" },
  { loc: "/engineering", changefreq: "monthly", priority: "0.7" },
  { loc: "/security", changefreq: "monthly", priority: "0.7" },
  { loc: "/integrations", changefreq: "weekly", priority: "0.75" },
  { loc: "/about", changefreq: "monthly", priority: "0.55" },
  { loc: "/contact", changefreq: "monthly", priority: "0.6" },
];

const pageRoutes = pages.map((page) => page.route);
const cleanRouteSet = new Set(pageRoutes);

for (const page of pages) {
  const dir = path.join(process.cwd(), "public", page.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), buildHtml(page), "utf8");
  if (!sitemapEntries.some((entry) => entry.loc === page.route)) {
    sitemapEntries.push({ loc: page.route, changefreq: "weekly", priority: "0.65" });
  }
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemapContent, "utf8");
console.log("Generated static pages and sitemap.");
