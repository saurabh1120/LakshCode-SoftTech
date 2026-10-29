// ============================================================
//  FALLBACK DATA — shown ONLY when the backend is down / returns nothing.
//  When the backend is live and returns data, this file is ignored.
// ============================================================

// Full URL so imgUrl() uses it as-is.
// Local images live in public/images/projects; others are free Unsplash photos.
const img = (file) => window.location.origin + '/images/projects/' + file

// icon must be one of: FaGlobe, FaMobile, FaCloud, FaBriefcase, FaPencilRuler,
// FaCode, FaServer, FaShieldAlt, FaRocket, FaDatabase
export const fallbackServices = [
  {
    id: 1, displayOrder: 1, active: true, icon: 'FaGlobe',
    title: 'Web Development',
    description: 'Fast, responsive, SEO-friendly websites and web apps built with React and modern tooling — from business sites to full customer portals.',
  },
  {
    id: 2, displayOrder: 2, active: true, icon: 'FaCloud',
    title: 'SaaS Product Development',
    description: 'Multi-tenant SaaS platforms with subscriptions, role-based access and admin dashboards — the same architecture behind LakshFit and LakshDine.',
  },
  {
    id: 3, displayOrder: 3, active: true, icon: 'FaServer',
    title: 'Backend & API Development',
    description: 'Secure, scalable REST APIs with Java & Spring Boot, JWT authentication, MySQL and clean, maintainable architecture.',
  },
  {
    id: 4, displayOrder: 4, active: true, icon: 'FaBriefcase',
    title: 'Custom Business Software',
    description: 'CRM, lead management, billing, inventory and workflow tools designed around how your team actually works — no more spreadsheets.',
  },
  {
    id: 5, displayOrder: 5, active: true, icon: 'FaMobile',
    title: 'Mobile-First Apps',
    description: 'Mobile-friendly web apps and PWAs that feel native on every phone, with WhatsApp & email notifications built in.',
  },
  {
    id: 6, displayOrder: 6, active: true, icon: 'FaPencilRuler',
    title: 'UI/UX Design',
    description: 'Clean, modern interfaces and dashboards that your customers and staff enjoy using — designed for clarity and conversion.',
  },
]

// techStack -> comma separated, features -> one per line (\n)
export const fallbackProjects = [
  {
    id: 1, displayOrder: 1, active: true,
    title: 'LakshFit — Gym Management SaaS',
    description: 'A complete multi-tenant gym management platform for Indian gyms. Owners manage members, memberships, payments, staff and expenses from one dashboard, while members get their own portal for workouts, diet plans and attendance.',
    techStack: 'React, Spring Boot, MySQL, JWT, Tailwind CSS, WhatsApp API',
    features: [
      'Member management with membership plans, renewals and dues tracking',
      'QR-based attendance, kiosk mode and staff attendance',
      'Member portal — dashboard, workout plan, diet plan, progress photos',
      'Automated WhatsApp & email notifications',
      'Referral program and loyalty points',
      'Revenue, expenses and net-profit reports',
    ].join('\n'),
    liveLink: 'https://lakshfit.in',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 2, displayOrder: 2, active: true,
    title: 'LakshDine — Restaurant & Café Platform',
    description: 'A premium digital dining platform for restaurants and cafés. Guests scan a QR code at the table to browse the menu and order; orders flow straight to the kitchen, and owners get billing and analytics in real time.',
    techStack: 'React, Spring Boot, MySQL, Cloudinary, JWT',
    features: [
      'QR table ordering — Scan, Order, Enjoy',
      'Live kitchen order board',
      'Billing and cashier module',
      '7 roles: Super Admin, Owner, Manager, Waiter, Kitchen Staff, Cashier, Customer',
      'Sales analytics and public restaurant website',
    ].join('\n'),
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1652021979353-2288f1835b65?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 3, displayOrder: 3, active: true,
    title: 'Meri Gullak — Personal Finance App',
    description: 'A personal finance and expense-tracking app that makes saving simple. Track income and expenses across accounts, set savings goals, plan budgets and split bills with friends.',
    techStack: 'React, Spring Boot, MySQL, Chart.js',
    features: [
      'Multiple accounts, income/expense tracking with receipt upload',
      'Gullak savings goals and budget alerts',
      'Splitwise-style group expense splitting',
      'Dashboard with charts, analytics and gamification',
      'OTP login, email notifications, dark/light theme',
    ].join('\n'),
    liveLink: '',
    imageUrl: img('meri-gullak.jpg'),
  },
  {
    id: 4, displayOrder: 4, active: true,
    title: 'UrjaLytics — Solar Agency Operations',
    description: 'A multi-tenant operations platform for solar installation agencies — from lead capture and site survey to installation, documentation and subsidy tracking.',
    techStack: 'React, Spring Boot, MySQL, JWT',
    features: [
      'Lead pipeline and follow-ups',
      'Site survey and installation tracking',
      'Customer documents and subsidy status',
      'Team roles and agency-level dashboards',
    ].join('\n'),
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1711214622639-42bb82a167e8?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 5, displayOrder: 5, active: true,
    title: 'Loan Operations & Lead Management Platform',
    description: 'A large-scale platform for a housing-finance client that digitised a fully manual Lead → Application → Processing → Decision → Tracking pipeline across 11 user roles.',
    techStack: 'React, Spring Boot, Spring Security, MySQL, Zustand',
    features: [
      '11-role access control with role-based dashboards',
      'Lead module with automated status transitions',
      '8-step application onboarding wizard',
      'HR employee onboarding with auto-generated employee IDs',
      '32-table relational database design',
    ].join('\n'),
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1735547876935-7be80eae1c88?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 6, displayOrder: 6, active: true,
    title: 'LakshCode Website & Admin CMS',
    description: 'Our own company website with a full admin panel — services, projects, blogs, testimonials, inquiries and site settings are all manageable without touching code.',
    techStack: 'React, Vite, Framer Motion, Spring Boot, MySQL, Cloudinary',
    features: [
      'Animated, mobile-responsive public website',
      'Secure admin panel with JWT login',
      'Manage services, projects, blogs and testimonials',
      'Inquiry inbox with status and notes',
    ].join('\n'),
    liveLink: 'https://lakshcode.in',
    imageUrl: img('lakshcode-cms.jpg'),
  },
]

// ---------------- CONTACT DETAILS ----------------
// Shown when the backend is down. Backend values (when available) take priority.
export const fallbackSettings = {
  companyName: 'LakshCode SoftTech',
  email: 'support.lakshcode@gmail.com',
  phone: '+91 7974485587',
  whatsapp: '+91 7974485587',
  address: 'Raipur, Chhattisgarh, India',
  footerTagline: 'Building Digital Futures — Premium Software Solutions that Scale with your Business.',
}

// Message pre-filled when someone opens WhatsApp from the website
export const whatsappGreeting = "Hi LakshCode SoftTech, I'd like to discuss a project."

// Merge backend settings over the fallback (ignores empty backend values)
export function withFallbackSettings(data) {
  const out = Object.assign({}, fallbackSettings)
  if (data) {
    Object.keys(data).forEach(function (k) {
      if (data[k] !== null && data[k] !== undefined && data[k] !== '') out[k] = data[k]
    })
  }
  return out
}

// WhatsApp chat link for a number like '+91 7974485587'
export function whatsappLink(number) {
  return 'https://wa.me/' + String(number || '').replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(whatsappGreeting)
}

// ---------------- BLOGS ----------------
// content is HTML (h2, p, ul/li, strong, a are styled by the blog page)
const blogImg = (file) => window.location.origin + '/images/blogs/' + file
const unsplash = (id) => 'https://images.unsplash.com/photo-' + id + '?w=1200&q=80&auto=format&fit=crop'

export const fallbackBlogs = [
  {
    id: 1, published: true,
    title: 'Why Every Gym Needs Management Software in 2026',
    excerpt: 'Registers, hand-typed WhatsApp reminders and missed renewals quietly cost gyms money every month. Here is how software fixes that.',
    thumbnailUrl: unsplash('1750698544726-8bc312ac1ffd'),
    createdAt: '2026-10-20T10:00:00',
    content: `
<p>Most gyms in India still run on a register, a calculator and the owner's memory. It works — until the gym grows past 100 members. Then renewals get missed, dues pile up, and nobody knows which members have quietly stopped coming.</p>
<h2>The hidden cost of manual work</h2>
<p>If even 10 members forget to renew each month, that is revenue that never shows up in any register. Add the hours spent calling members, writing receipts and chasing payments, and "free" manual management turns out to be the most expensive option.</p>
<h2>What good gym software does for you</h2>
<ul style="list-style:disc;padding-left:22px">
  <li><strong>Automatic WhatsApp reminders</strong> before a membership expires — no more manual follow-ups.</li>
  <li><strong>QR-based attendance</strong> so you know exactly who is active and who needs a nudge.</li>
  <li><strong>Payments and dues in one place</strong>, with revenue, expense and profit reports.</li>
  <li><strong>A member app</strong> with workout and diet plans — a premium experience that keeps members loyal.</li>
  <li><strong>Referral and loyalty rewards</strong> that turn happy members into new admissions.</li>
</ul>
<h2>Built for Indian gyms</h2>
<p>We built <a href="https://lakshfit.in" target="_blank" rel="noopener">LakshFit</a> to solve exactly these problems. It is simple enough for a single-trainer studio and powerful enough for multi-branch gyms — and it works perfectly on a mobile phone.</p>
<p>Want to see it in action? Message us on WhatsApp and we will set up a free demo for your gym.</p>`,
  },
  {
    id: 2, published: true,
    title: 'QR Ordering: How Restaurants Are Serving Faster and Earning More',
    excerpt: 'Guests scan, order and pay from their table. Here is why QR ordering is becoming the standard for modern restaurants and cafés.',
    thumbnailUrl: unsplash('1600147131759-880e94a6185f'),
    createdAt: '2026-10-08T10:00:00',
    content: `
<p>Walk into any busy café on a weekend and you will see the same problem: guests waiting to order, waiters running between tables, and orders getting mixed up in the kitchen. QR ordering solves all three.</p>
<h2>How it works</h2>
<p>Each table gets a QR code. Guests scan it, browse a beautiful digital menu with photos, and place their order directly. The order appears instantly on the kitchen screen — no paper slips, no shouting across the counter.</p>
<h2>Why owners love it</h2>
<ul style="list-style:disc;padding-left:22px">
  <li><strong>Faster table turnover</strong> — guests do not wait for a waiter to take the order.</li>
  <li><strong>Fewer mistakes</strong> — what the guest selects is exactly what the kitchen sees.</li>
  <li><strong>Higher bills</strong> — photos and suggestions like "add a dessert" increase average order value.</li>
  <li><strong>Instant menu updates</strong> — change prices or mark items sold out in seconds.</li>
  <li><strong>Real-time sales analytics</strong> — know your best-selling dishes and peak hours.</li>
</ul>
<h2>Service still matters</h2>
<p>QR ordering does not replace your staff — it frees them to focus on hospitality instead of note-taking. That is exactly the idea behind <strong>LakshDine</strong>: <em>Scan, Order, Enjoy</em>.</p>
<p>Running a restaurant or café? Let us show you how it would work for your tables.</p>`,
  },
  {
    id: 3, published: true,
    title: '5 Signs Your Business Has Outgrown Excel and WhatsApp',
    excerpt: 'Spreadsheets and chat groups are great for starting out — but they start costing you time and money as you grow. Watch for these signs.',
    thumbnailUrl: unsplash('1686061593213-98dad7c599b9'),
    createdAt: '2026-09-25T10:00:00',
    content: `
<p>Almost every business starts with Excel sheets and WhatsApp groups. They are free, familiar and fast. But at some point, they stop helping and start slowing you down. Here are the five signs that moment has arrived.</p>
<h2>1. The same data lives in five places</h2>
<p>Customer details in one sheet, payments in another, follow-ups in a WhatsApp chat. Every update has to be copied by hand — and mistakes creep in.</p>
<h2>2. Only one person knows how things work</h2>
<p>If the business stops when one employee is on leave, your process lives in someone's head instead of a system.</p>
<h2>3. Leads and follow-ups get missed</h2>
<p>When enquiries are buried in chats, some inevitably go unanswered. Each one is lost revenue.</p>
<h2>4. Reports take hours</h2>
<p>If preparing a monthly summary means a full day of copy-paste, you are paying a high price for information you should have instantly.</p>
<h2>5. You cannot control who sees what</h2>
<p>Spreadsheets are all-or-nothing. Real software gives each role — owner, manager, staff — exactly the access they need.</p>
<h2>The fix</h2>
<p>Custom business software brings everything into one place, built around how <em>your</em> team works. We have built lead management, billing and operations platforms for businesses with up to 11 user roles. Tell us about your workflow — we will suggest the simplest system that fits.</p>`,
  },
  {
    id: 4, published: true,
    title: 'Does Your Business Need a Website or a Web App?',
    excerpt: 'A website tells people about your business. A web app runs your business. Here is how to know which one you need.',
    thumbnailUrl: blogImg('lakshcode-brand.jpg'),
    createdAt: '2026-09-12T10:00:00',
    content: `
<p>"We need a website" is one of the most common things we hear. Sometimes that is exactly right. Other times, what the business really needs is a web <em>application</em>. The difference matters for your budget and your results.</p>
<h2>A website is your digital storefront</h2>
<p>A website presents your business: who you are, what you offer, your work and how to reach you. It is perfect for building trust and generating enquiries.</p>
<ul style="list-style:disc;padding-left:22px">
  <li>Company profile, services and portfolio</li>
  <li>Contact forms and WhatsApp integration</li>
  <li>Blog and SEO to get found on Google</li>
</ul>
<h2>A web app is your digital workplace</h2>
<p>A web application lets people <em>do</em> things: log in, manage data, place orders, track work. It replaces manual processes.</p>
<ul style="list-style:disc;padding-left:22px">
  <li>Customer or member portals with login</li>
  <li>Booking, ordering and billing systems</li>
  <li>Admin dashboards, reports and role-based access</li>
</ul>
<h2>Many businesses need both</h2>
<p>A gym, for example, benefits from a public website to attract members <strong>and</strong> a management app to run daily operations. The best approach is to start with what brings the fastest return and grow from there.</p>
<p>Not sure which one you need? Book a free consultation — we will give you an honest recommendation.</p>`,
  },
  {
    id: 5, published: true,
    title: 'Think Twice, Code Once: How We Build Software That Lasts',
    excerpt: 'Planning first, coding second. The principles we follow to ship software that does not break the moment your business grows.',
    thumbnailUrl: blogImg('think-twice-code-once.jpg'),
    createdAt: '2026-08-28T10:00:00',
    content: `
<p>Fast code is easy. Code that is still easy to change a year later is hard. At LakshCode SoftTech, we follow a few simple principles on every project.</p>
<h2>1. Understand the workflow before the screens</h2>
<p>We map how your business actually works — who does what, and in what order — before we design a single page. Software should fit your process, not the other way round.</p>
<h2>2. Build in vertical slices</h2>
<p>Each feature is built end to end — database, API and screen together — so you can see and test real progress every few days instead of waiting months for a big reveal.</p>
<h2>3. Secure and multi-tenant from day one</h2>
<p>Role-based access, JWT authentication and clean data separation are part of the foundation, not an afterthought.</p>
<h2>4. Mobile-first, always</h2>
<p>Your customers and staff live on their phones. Every screen we build is designed to work beautifully on mobile.</p>
<h2>5. Production safety</h2>
<p>Once your software is live, every change is tightly scoped and tested. Nothing that works today should break tomorrow.</p>`,
  },
  {
    id: 6, published: true,
    title: 'How AI Is Changing Small-Business Software',
    excerpt: 'AI is no longer only for big tech. Here are practical ways small businesses can use it today — without the hype.',
    thumbnailUrl: blogImg('ai.jpg'),
    createdAt: '2026-08-10T10:00:00',
    content: `
<p>AI has moved from research labs into everyday business tools. For small and medium businesses, the opportunity is not about replacing people — it is about removing repetitive work.</p>
<h2>Where AI helps today</h2>
<ul style="list-style:disc;padding-left:22px">
  <li><strong>Customer replies:</strong> drafting answers to common questions on WhatsApp and email.</li>
  <li><strong>Reports:</strong> turning raw sales and expense data into plain-language summaries.</li>
  <li><strong>Content:</strong> product descriptions, social posts, and diet or workout plan drafts.</li>
  <li><strong>Lead scoring:</strong> highlighting which enquiries are most likely to convert.</li>
</ul>
<h2>Start small, measure, expand</h2>
<p>The best results come from adding AI to one painful step of an existing workflow, measuring the time saved, and expanding from there. Big-bang "AI transformation" projects rarely pay off for small teams.</p>
<h2>Keep a human in the loop</h2>
<p>AI drafts, people decide. That simple rule keeps quality high and avoids embarrassing mistakes with customers.</p>
<p>Curious what AI could do for your business? Tell us about your workflow and we will suggest where it fits.</p>`,
  },
]
