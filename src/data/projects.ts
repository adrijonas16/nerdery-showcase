export interface MediaItem {
  type: "image" | "gif" | "video";
  src: string;
  caption: string;
}

export interface ProposedImprovement {
  title: string;
  description: string;
  prompt?: string;
  skills?: string[];
}

export interface ComparisonPair {
  before: string;
  after: string;
  label: string;
  description: string;
}

export interface CrossAreaInsight {
  fromArea: string;
  insight: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  requirements: string[];
  improvements: string[];
  beforeDescription: string;
  afterDescription: string;
  notes: string;
  youtubeId: string;
  techStack: string[];
  stats?: { label: string; value: string }[];
  liveUrl?: string;
  repoUrl?: string;
  media?: MediaItem[];
  comparisons?: ComparisonPair[];
  liveComparison?: {
    beforeUrl: string;
    afterUrl: string;
    beforeLabel: string;
    afterLabel: string;
  };
  whatILearned?: string;
  proposedImprovements?: ProposedImprovement[];
  toolsUsed?: string[];
  crossAreaInsights?: CrossAreaInsight[];
}

export interface Area {
  id: string;
  title: string;
  color: string;
  icon: string;
  tagline: string;
  projects: Project[];
}

export const areas: Area[] = [
  {
    id: "frontend",
    title: "Frontend",
    color: "#6366f1",
    icon: "Monitor",
    tagline: "React, TypeScript, UI/UX",
    projects: [
      {
        id: "task-management",
        title: "Task Management App (Week 4 Capstone)",
        tagline: "Kanban board with React + TypeScript + GraphQL",
        description:
          "Week 4 capstone challenge: a task management app with a Kanban board (Backlog, Todo, In Progress, Done, Cancelled). Connects to a GraphQL API for CRUD operations. Built from the Figma design system, applying everything from weeks 1-3: hooks, TypeScript, testing, patterns, state management.",
        requirements: [
          "Dashboard with sidebar navigation, header with avatar/search/notifications, and task columns",
          "Task cards with name, tags, due date, estimated points, user avatar, and options menu",
          "Connect to GraphQL API: fetch tasks and place them in correct columns",
          "Loading indicators (spinners/skeletons) and error/empty states",
          "Create task modal with the + red icon, using createTask mutation",
          "Update task: edit due date, name, position, status, tags, estimated time via modal",
          "Delete task with confirmation dialog and deleteTask mutation",
          "Search and filter: by name, due date, owner, status, tags, estimated points",
          "Settings page showing user profile info (custom design matching app scheme)",
          "Follow the Figma design system for components, colors, spacing, and typography",
        ],
        improvements: [
          "Kanban board with 5 status columns, drag-and-drop to move tasks between columns",
          "Responsive mobile layout with iOS-style date picker and collapsible columns",
          "My Tasks list view as an alternative to the board, with collapsible status sections",
          "Advanced filter panel: status, assignee, due date, points, and tag filters",
          "Create/Edit task modals with chip-style selectors for estimate, assignee, tags",
          "Delete confirmation dialog before calling the API",
          "Toast notifications for success/failure on every mutation",
          "Error Boundary at the route level for graceful error handling",
          "Profile popover showing user info from the profile query",
          "Deployed on Vercel with live demo",
        ],
        beforeDescription:
          "What we built:\n\n- Kanban board with 5 columns, full CRUD via GraphQL, drag-and-drop, responsive mobile layout\n- 9/9 checkpoints passing (45/45 tests), deployed on Vercel\n- Custom hooks for task operations, Error Boundary, toast notifications\n- Advanced filter panel, list view, profile popover\n\nWhat can be better:\n\n- GraphQL types are maintained manually - they can drift from the API schema\n- Generic variable names: 'const result' used for every mutation in Dashboard.tsx and MyTasks.tsx\n- No E2E tests - only unit tests from the checkpoints\n- Form validation is inline instead of schema-based\n- No accessibility audit has been run on the deployed app",
        afterDescription:
          "With the proposed improvements:\n\n- GraphQL Codegen generates types and hooks automatically from the schema - zero type drift, fully type-safe queries and mutations\n- Every variable explains what it holds: 'createdTask', 'updatedTask', 'deleteConfirmation' instead of generic 'result'\n- Playwright E2E tests run against the live Vercel deploy, covering create/edit/delete/filter flows with screenshot evidence\n- Zod schemas centralize form validation, making rules testable and consistent with the API\n- Lighthouse + axe audit with measured contrast ratios and keyboard navigation verified\n- Code splitting with React.lazy for each route, reducing initial bundle size",
        notes: "Mentor advice applied and planned:\n\n- Use GraphQL Codegen to auto-generate types from the schema instead of maintaining them manually (Ricardo's recommendation)\n- Keep variable names descriptive and consistent - every variable should explain what it holds without needing to read the assignment\n- Use libraries that simplify code when they exist (Zod for validation, Codegen for types) - don't reinvent what's already solved\n- Quality over quantity: the challenge explicitly says to get as far as you can while maintaining a high quality standard\n\nProgram: 4 weeks, 9 checkpoints (45/45 tests), capstone project. Sources: Epic React, Total TypeScript, RAVN internal modules.",
        youtubeId: "",
        techStack: ["React", "TypeScript", "Vite", "GraphQL", "Figma"],
        liveUrl: "https://ravn-task-management.vercel.app",
        repoUrl: "https://github.com/adrianachipana-lab/ravn-task-management",
        media: [
          { type: "image", src: "/media/frontend/task-dashboard.png", caption: "Dashboard board view - 5 Kanban columns with task cards" },
          { type: "image", src: "/media/frontend/task-dashboard-mobile.png", caption: "Dashboard mobile - responsive layout with bottom navigation" },
          { type: "image", src: "/media/frontend/task-create.png", caption: "Create task modal - chip selectors for estimate, assignee, tags, date" },
          { type: "image", src: "/media/frontend/task-edit.png", caption: "Edit task modal - same form pre-filled with current values" },
          { type: "image", src: "/media/frontend/task-filters.png", caption: "Advanced filter panel - status, assignee, due date, points, tags" },
          { type: "image", src: "/media/frontend/task-list-view.png", caption: "My Tasks list view - collapsible status sections as alternative layout" },
          { type: "image", src: "/media/frontend/task-card-options.png", caption: "Task card options - edit and delete actions from the 3-dot menu" },
          { type: "image", src: "/media/frontend/task-delete.png", caption: "Delete confirmation - modal before calling the deleteTask mutation" },
        ],
        stats: [
          { label: "Checkpoints", value: "9/9" },
          { label: "Weeks", value: "4" },
          { label: "Tests", value: "45/45" },
        ],
        whatILearned: "I learned to build a full app from a Figma design in 4 weeks, progressing from React fundamentals to a complete Kanban board with GraphQL. The biggest lessons: TypeScript strict typing catches bugs before they happen, custom hooks keep logic reusable, and the quality standard matters more than completing every feature - quality over quantity was the challenge's core principle.",
        toolsUsed: ["React", "TypeScript", "Vite", "GraphQL", "Vitest", "Figma", "Claude Code", "Vercel", "Drag & Drop"],
        proposedImprovements: [
          {
            title: "Use GraphQL Codegen for type-safe queries",
            description: "Currently GraphQL queries are written manually and types are maintained separately. GraphQL Codegen auto-generates TypeScript types and typed hooks directly from the schema, eliminating type drift between the API and the frontend. Mentor recommendation.",
            prompt: "Install @graphql-codegen/cli and configure it for the task management app. Generate typed hooks for all queries (tasks, profile) and mutations (createTask, updateTask, deleteTask). Replace manual types in src/types/ with the generated ones.",
            skills: ["GraphQL Codegen", "@graphql-codegen/cli", "TypeScript"],
          },
          {
            title: "Rename generic variables to descriptive names",
            description: "Dashboard.tsx and MyTasks.tsx use 'const result' for every mutation (create, update, delete). Variables should explain what they hold: 'createdTask', 'updatedTask', 'deleteConfirmation'. Same principle applies across the codebase - naming should be self-documenting.",
            prompt: "Find all generic variable names like 'result', 'data', 'res' in src/. Rename each to describe its content: createTask result -> createdTask, updateTask result -> updatedTask, deleteTask result -> deleteConfirmation. List changes as a table.",
            skills: ["Code standards", "Naming conventions"],
          },
          {
            title: "Accessibility audit on the deployed app",
            description: "Run Lighthouse and axe-core on the live Vercel deploy. Focus on: color contrast on task card tags and due dates, keyboard navigation for the Kanban board and modals, screen reader support for drag-and-drop, and focus trapping inside modals.",
            prompt: "Run Lighthouse on https://ravn-task-management.vercel.app and generate an accessibility report. For each issue, propose the fix with exact code. Focus on Kanban board and modal interactions.",
            skills: ["Lighthouse", "axe-core", "WCAG"],
          },
          {
            title: "E2E tests with Playwright against the live deploy",
            description: "The app is deployed on Vercel - Playwright can test the real flows: create task, edit from 3-dot menu, delete with confirmation, filter by status, and verify responsive layout. Same approach as the QA module's MedApp tests.",
            prompt: "Create Playwright tests for https://ravn-task-management.vercel.app covering: 1. Create a task via the + button 2. Edit from the 3-dot menu 3. Delete with confirmation 4. Filter by status 5. Verify mobile responsive layout at 375px.",
            skills: ["Playwright", "@playwright/test"],
          },
          {
            title: "Extract reusable form validation with Zod or Yup",
            description: "Task create/edit modals have inline validation. A schema validation library (Zod or Yup) would centralize validation rules, make them testable independently, and ensure the frontend validates the same constraints as the API.",
            prompt: "Install zod and create validation schemas for CreateTaskInput and UpdateTaskInput. Replace inline validation in the task form components with schema.parse(). Add unit tests for the schemas covering edge cases.",
            skills: ["Zod", "Form validation", "Schema-first"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Design", color: "#fb923c", insight: "After the Vello module I started checking contrast ratios on my own components instead of assuming colors are fine. The design week drilled in that 'verify contrast' means computing the number, not eyeballing it." },
          { fromArea: "QA", color: "#f472b6", insight: "The QA week gave me the approach of testing against a live deploy with Playwright. Since the task management app is on Vercel, the same method applies: run E2E tests against the real URL, capture screenshots as evidence." },
          { fromArea: "PM", color: "#34d399", insight: "The ReNest 'no orphan features' principle changed how I think about the Kanban board. The challenge says 'quality over quantity', so every feature I built traces back to the core task management goal." },
          { fromArea: "AI", color: "#a78bfa", insight: "I learned from the Vello guardrail that giving Claude rules + context + method produces better code than just asking it to build something. I now write specific constraints before generating any component." },
        ],
      },
      {
        id: "week1-showcase",
        title: "Week 1 Showcase",
        tagline: "Responsive layout with BEM, semantic HTML, and RAVN styling conventions",
        description:
          "Week 1 deliverable from the frontend program. A fully responsive page built with semantic HTML, BEM naming convention for CSS classes, and RAVN's styling and layout standards. Deployed on Vercel.",
        requirements: [
          "Semantic HTML structure (header, nav, main, section, footer)",
          "BEM naming convention for all CSS classes (block__element--modifier)",
          "Responsive design: mobile-first, breakpoints for tablet and desktop",
          "Consistent spacing and sizing using CSS custom properties",
          "Proper use of Flexbox and Grid for layout",
          "Deployed on Vercel",
        ],
        improvements: [
          "Structured the HTML semantically: each section has a clear purpose and role",
          "Applied BEM consistently: every class follows block__element--modifier pattern for maintainability",
          "Built mobile-first: base styles for mobile, then media queries for larger screens",
          "Used CSS custom properties for colors, spacing, and font sizes so the design system is centralized",
          "Flexbox for component-level layout, Grid for page-level structure",
        ],
        beforeDescription: "Week 1 covered React Fundamentals, Hooks, and Styling. This was the styling checkpoint: take a design and implement it with clean HTML structure, BEM classes, responsive breakpoints, and RAVN conventions.",
        afterDescription: "A fully responsive page with semantic HTML, BEM naming throughout, CSS custom properties for the design system, and mobile-first media queries. The architecture separates layout (Grid) from component styling (Flexbox) and uses meaningful class names that any developer can read.",
        notes: "This was the first checkpoint of the program. The key learning was that styling is not just making things look right - it is structuring CSS so it is maintainable: BEM keeps classes predictable, custom properties keep values consistent, and semantic HTML keeps the document meaningful for accessibility and SEO.",
        youtubeId: "",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://week1-showcase.vercel.app",
        repoUrl: "https://github.com/adrijonas16/Ravn--BackEnd",
        comparisons: [
          {
            before: "/media/frontend/figma-week1-design.png",
            after: "/media/frontend/week1-live-desktop.png",
            label: "Figma design vs live implementation",
            description: "Left: the Figma design we received. Right: our implementation deployed on Vercel. Built with semantic HTML, BEM classes, CSS custom properties, and responsive breakpoints.",
          },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    color: "#22d3ee",
    icon: "Server",
    tagline: "NestJS, Prisma, PostgreSQL",
    projects: [
      {
        id: "tshirt-backend",
        title: "T-Shirt Store API",
        tagline: "REST API with NestJS + Prisma + PostgreSQL",
        description:
          "Full backend API for the t-shirt store. Includes JWT authentication, product CRUD with SKUs, orders, Stripe payments, user roles, and a delivery system.",
        requirements: [
          "Authentication: signup, signin, signout, forgot/reset password",
          "Product and SKU CRUD",
          "Order system with checkout",
          "Stripe payment integration",
          "Roles: manager, client, delivery_person",
          "Custom guards and decorators (JwtAuthGuard, RolesGuard, @CurrentUser)",
          "Swagger documentation",
          "Shopping cart with stock validation",
          "Promo codes with usage limits",
          "Low-stock notifications",
        ],
        improvements: [
          "FIX-01: Investigated JWT disabled user bug - confirmed false positive, validate() already checks status",
          "FIX-02: Race condition in order creation - moved ALL checkout logic inside Prisma $transaction",
          "FIX-03: Full delivery system - GET /orders/delivery-persons with workload, PATCH assign-delivery with capacity limit",
          "FIX-04: Duplicate PaymentIntents - reuses existing intent if still active in Stripe via retrieve()",
          "FIX-05: Demo payment stock validation - same checks as the real webhook flow",
          "FIX-06: Promo code restored on cancellation - deleteMany PromoCodeRedemption",
          "FIX-07: Disabled products blocked from cart - added status !== 'active' check",
          "FIX-08: Per-user promo code limit - findFirst by promoCodeId + userId before applying",
          "FIX-09: CartItems cleaned on cart conversion - deleteMany inside the transaction",
          "FIX-10: Stock reserved on order creation - decremented in create(), removed from webhook/demo. Cancelled orders restore stock",
          "FIX-11: Variants deactivated on product soft-delete - atomic $transaction with updateMany",
          "FIX-12: Webhook idempotency made atomic - try/catch on create, P2002 returns duplicate flag",
          "FIX-13: Slug collision handled - randomBytes(3) suffix + retry on P2002",
          "Cart stock exposure - formatCart() now includes SKU stock so the frontend can cap quantities",
        ],
        beforeDescription:
          "What we built and fixed (13 of 24 issues resolved, FIX-01 to FIX-13):\n\nP0 Critical (6): race condition in orders, delivery system missing, duplicate payments, demo stock validation, promo code on cancellation, cart items not cleaned\nP1 High (7): disabled products in cart, per-user promo limit, cart items orphaned, stock overselling, variants after soft-delete, webhook race condition, slug collisions\n\nAll 13 fixes applied with updated tests. Full audit documented 24 issues with P0-P3 severity.\n\nRemaining (11 issues, P2-P3): JWT stale after email update, cart stock warning, notifications pagination, likes on disabled products, payment link without transaction, inconsistent order responses, categories CRUD, address deletion, cart quantity limit, low-stock detection, decimal precision.",
        afterDescription:
          "What changed after applying the fixes:\n\n- Orders are safe from race conditions - entire checkout runs inside a single Prisma transaction\n- Stock is reserved when the order is created, not when payment arrives - no more overselling\n- Delivery system works end-to-end - managers see workload and assign with capacity limits\n- Payments are idempotent - no duplicate charges, no 500 errors on duplicate webhooks\n- Promo codes have per-user limits and are restored on cancellation\n- Products disabled by a manager can't sneak into carts\n- Soft-deleted products have their variants deactivated atomically\n- Slug collisions are practically impossible with random suffix + retry\n\nRemaining 11 issues (P2-P3) are documented with fix plans in FIXES-PENDIENTES.md",
        notes:
          "Mentor advice applied and planned:\n\n- Use descriptive variable names that explain what they hold: 'loginData' not 'data', 'userProfile' not 'result'. The name should tell you what's inside without reading the assignment\n- When a request returns something, name it after what it returns: 'orderResponse', 'paymentIntent', 'deliveryWorkload'\n- The audit found issues by testing the frontend and noticing things that didn't work or felt wrong - then tracing them back to the backend code\n- 8 Claude Code skills created to automate recurring tasks: /investigate-task, /verify-change, /security-check, /db-check, /api-contract-check, /test-coverage, /docs-sync, /env-check",
        youtubeId: "",
        techStack: [
          "NestJS",
          "Prisma",
          "PostgreSQL",
          "JWT",
          "Stripe",
          "Swagger",
          "BullMQ",
          "Redis",
        ],
        repoUrl: "https://github.com/adrijonas16/Ravn--BackEnd",
        liveUrl: "https://tshirt-frontend-gilt.vercel.app/",
        stats: [
          { label: "Endpoints", value: "27+" },
          { label: "Issues Found", value: "24" },
          { label: "Fixes Applied", value: "13" },
        ],
        whatILearned: "I learned to do a full audit of a production backend: identify race conditions, validate Prisma transactions, understand Stripe payment flows, and document issues with severity and fix plans. The most important lesson: the most dangerous bugs are concurrency bugs - two requests at the same time can create corrupt data if they're not inside a transaction.",
        toolsUsed: ["Claude Code", "/investigate-task", "/verify-change", "/security-check", "/db-check", "/api-contract-check", "/test-coverage", "NestJS", "Prisma", "Jest"],
        proposedImprovements: [
          {
            title: "FIX-14 to FIX-24: remaining P2-P3 issues (next steps)",
            description: "11 issues documented with fix plans: JWT stale after email update, cart stock warning field, notifications pagination, likes on disabled products, payment link transaction, inconsistent order response shapes, categories CRUD, address deletion safety, cart quantity limit, low-stock detection improvement, decimal precision helper.",
            prompt: "/investigate-task review FIXES-PENDIENTES.md FIX-14 through FIX-24. For each, estimate effort and impact. Prioritize using RICE.",
            skills: ["/investigate-task", "RICE prioritization"],
          },
          {
            title: "Increase test coverage for the 13 applied fixes",
            description: "Each fix has updated mocks but some paths need deeper tests: concurrent order creation (FIX-02), delivery capacity at the limit (FIX-03), expired PaymentIntent recovery (FIX-04), per-user promo with edge cases (FIX-08), stock restoration on cancellation (FIX-10).",
            prompt: "/test-coverage all - identify modules with untested critical paths in the 13 applied fixes and suggest test cases",
            skills: ["/test-coverage", "Jest", "@nestjs/testing"],
          },
          {
            title: "Use descriptive variable names in services",
            description: "Mentor feedback: variables should explain what they hold. Instead of 'data' use 'orderData', 'paymentResult'. The name should tell you what's inside without reading the assignment.",
            prompt: "Audit variable names in all backend services. Find generic names like 'data', 'result', 'item' and suggest descriptive replacements. List as: file:line | current | suggested.",
            skills: ["Code standards", "NestJS"],
          },
          {
            title: "Playwright E2E tests against the tshirt-store frontend",
            description: "The backend has its own frontend. Run Playwright tests for the full purchase flow to catch integration issues that unit tests miss, like the stock cap that only shows in the UI.",
            prompt: "Create Playwright tests for the tshirt-store frontend: signup, browse, add to cart, verify stock cap, checkout. Run against localhost with the backend running.",
            skills: ["Playwright", "Integration testing"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "QA", color: "#f472b6", insight: "I structured the 24 backend issues the same way I learned to write bug reports in QA week: severity, reproduction steps, expected vs actual, and evidence. A bug report without reproduction steps is just an opinion." },
          { fromArea: "Design", color: "#fb923c", insight: "The Vello audit taught me to put numbers on things. I started doing the same with API design: instead of 'the API should be fast', I set measurable thresholds (< 200ms response, < 50KB payload)." },
          { fromArea: "PM", color: "#34d399", insight: "I used the RICE framework from PM week to prioritize the remaining 18 fixes. FIX-07 (one-line fix, high confidence) ranked above FIX-10 (high impact but high effort). Not all P0 bugs should be fixed first." },
          { fromArea: "AI", color: "#a78bfa", insight: "The 8 Claude Code skills I built (/investigate-task, /verify-change, etc.) follow the same 'rules + context + method' pattern I learned from the guardrail evolution. Each skill is a mini-CLAUDE.md." },
        ],
      },
    ],
  },
  {
    id: "qa",
    title: "QA",
    color: "#f472b6",
    icon: "TestTube",
    tagline: "Testing, automation, bug reports, API testing",
    projects: [
      {
        id: "qa-medical-app",
        title: "QA Medical Appointments App",
        tagline: "Full QA week on a medical appointments app",
        description:
          "Intensive QA week on a medical appointments app (MEDIC). Included UI and API testing, formal bug reports, test plans, Gherkin scenarios, peer reviews, and a final capstone with CI workflow. Tested against reference Acceptance Criteria documenting gaps between what was specified and what was implemented.",
        requirements: [
          "Monday: App exploration, identify bugs, ask mentor about expected behavior",
          "Tuesday: Site map, Feature map, Test data sheet with seed script, Test plan with dry run",
          "Wednesday: 8+ own Gherkin scenarios, 2 tests against reference AC (MEDIC-101), document AC vs app gaps, peer review",
          "Thursday: Formal bug reports, API tests + regression suite, Automation Delta, Failure Triage Lab, API contract review, peer review",
          "Friday (Capstone): Risk register, Test plan, Feature map, Scenarios, Bug report, Development checklist, UI+API tests, CI workflow (stretch), Demo video",
          "Daily peer reviews of teammates (Cami, Emmanuel)",
          "Every red test must have an explanation of why it fails",
        ],
        improvements: [
          "Found real bugs proactively: appointment timezone (booked Oct 14 at 10:00, shows Oct 13 at 5:00am), missing confirmation on book/cancel, patient data exposed to doctor",
          "Identified state transition vulnerabilities: as a patient I could change appointments to 'completed' and 'approved' via API when only cancel should be allowed",
          "Detected that booking on past dates and outside doctor's shift hours was possible",
          "Documented every gap between AC and app: displayName vs name, 'Save Profile' vs 'Save changes', etc.",
          "Tests against reference AC (SCEN-MED101-01 and -02) with explicit documentation of why they fail",
          "Avoided scenarios the AC itself marks as unvalidated assumptions (-05, -08, -09)",
          "CI workflow as stretch: automated the test suite in a pipeline",
          "Proactive questions to mentor BEFORE reporting: distinguishing bugs from unimplemented features",
        ],
        beforeDescription:
          "What we built in 5 days:\n\n- Day 1: Proactive exploration - 7 critical questions to mentor before reporting, distinguishing bugs from pending features\n- Day 2: Site map, feature map, test data sheet with seed script, test plan with dry run\n- Day 3: 8+ Gherkin scenarios + 2 Playwright tests against reference AC (MEDIC-101) + state map hook audit\n- Day 4: Formal bug reports, API regression suite (7 tests), failure triage, API contract review\n- Day 5: Full capstone bundle (risk register, test plan, scenarios, bug report, UI+API tests, CI workflow)\n- 20+ PRs delivered, daily peer reviews\n\nWhat can be better:\n\n- Tests only cover booking, cancellation, and profile - many MEDIC features untested\n- No visual regression testing to catch CSS/layout breaks between releases\n- No accessibility checks (axe-core) integrated into the test suite\n- No performance metrics measured during tests",
        afterDescription:
          "With the proposed improvements:\n\n- Full test coverage across all MEDIC features: search, filters, doctor view, registration, edge cases (past dates, out-of-shift hours)\n- Visual regression with Playwright toHaveScreenshot() catching layout breaks automatically\n- axe-core integrated into every Playwright test, reporting accessibility violations with measured contrast ratios\n- Performance metrics collected during tests: page load times, API response times, alerts for anything over 2 seconds\n- Concurrent user tests (two browser contexts booking the same slot) to catch race conditions the backend module identified\n- Every test traces to a documented AC in Given/When/Then format (PM module applied to QA)",
        notes:
          "Mentor: Paulo\n\nHighlights:\n- Asking BEFORE reporting: the 7 Monday questions showed judgment in distinguishing bugs from pending features\n- Mentor confirmed that tests failing against the AC are correct: 'A test that fails because it encodes the agreed requirement is exactly how you document a gap'\n- Alerted me that the reference Design state map didn't exist (the Design track never ran) and proposed auditing the real data-testid hooks as a substitute\n- 20+ PRs delivered during the week\n- Capstone video: recorded and delivered",
        youtubeId: "",
        techStack: [
          "Playwright",
          "API Testing",
          "Gherkin",
          "CI/CD",
          "Bug Reports",
        ],
        repoUrl: "https://github.com/adrianachipana-lab/ravn-qa-week",
        media: [
          { type: "image", src: "/media/qa/patient-dashboard.png", caption: "MedApp - Patient dashboard after login" },
          { type: "image", src: "/media/qa/patient-appointments-list.png", caption: "MedApp - Patient appointments list with filters and search" },
          { type: "image", src: "/media/qa/patient-book-appointment.png", caption: "MedApp - Appointment booking form" },
          { type: "image", src: "/media/qa/patient-profile.png", caption: "MedApp - Patient profile (capstone feature MEDIC-108)" },
          { type: "image", src: "/media/qa/doctor-dashboard.png", caption: "MedApp - Doctor dashboard - clinic view" },
          { type: "image", src: "/media/qa/doctor-schedule.png", caption: "MedApp - Doctor schedule with patient appointments" },
          { type: "image", src: "/media/qa/playwright-book-passed.png", caption: "Playwright PASSED: SC-01 Book appointment - patient books slot and sees it as Scheduled" },
          { type: "video", src: "/media/qa/playwright-book-video.webm", caption: "Playwright video: full booking test (login -> select doctor -> pick date -> confirm -> verify)" },
          { type: "image", src: "/media/qa/playwright-cancel-passed.png", caption: "Playwright PASSED: SC-02 Cancel appointment - patient cancels and sees it as Cancelled" },
          { type: "video", src: "/media/qa/playwright-cancel-video.webm", caption: "Playwright video: full cancellation test (login -> find appointment -> cancel -> verify status)" },
          { type: "image", src: "/media/qa/playwright-test-failed-ui.png", caption: "Playwright FAILED: test against reference AC - documents gap between AC and app" },
          { type: "video", src: "/media/qa/playwright-test-video.webm", caption: "Playwright video: profile test that fails due to login change (gap evidence)" },
          { type: "image", src: "/media/qa/bug-timezone-lima.png", caption: "Bug found: incorrect timezone - appointment shows Lima time instead of local time" },
          { type: "image", src: "/media/qa/bug-stale-name-navbar.png", caption: "Capstone bug: old name persists in navbar after saving profile" },
          { type: "image", src: "/media/qa/bug-stale-name-reload.png", caption: "Capstone bug: on reload, old name returns - cache not invalidated" },
          { type: "image", src: "/media/qa/triage-t01-failure.png", caption: "Failure Triage: T01 - app says 'Appointment booked successfully' but AC expects message with date and doctor" },
          { type: "image", src: "/media/qa/triage-t02-failure.png", caption: "Failure Triage: T02 - already-taken slot remains visually enabled" },
          { type: "image", src: "/media/qa/patient-dashboard-mobile.png", caption: "MedApp mobile - Patient dashboard (375px)" },
          { type: "image", src: "/media/qa/patient-appointments-mobile.png", caption: "MedApp mobile - Responsive appointments list" },
        ],
        stats: [
          { label: "PRs Delivered", value: "20+" },
          { label: "Bugs Found", value: "7+" },
          { label: "Days", value: "5" },
        ],
        whatILearned: "I learned the full professional QA process: from exploration and mentor questions (distinguishing bugs from pending features) to test automation with Playwright, API testing, and formal bug reports. The most important lesson: a test that fails against the reference AC is NOT a bad test - it's exactly how you document a gap between what was specified and what was implemented. I also learned that in a real project, who decides what's wrong is the PO/PM, not QA.",
        toolsUsed: ["Playwright", "data-testid", "API Testing", "Gherkin (Given/When/Then)", "Bug Reports", "CI/CD (GitHub Actions)", "Claude Code"],
        proposedImprovements: [
          {
            title: "Expand tests to all MEDIC features",
            description: "Currently there are tests for booking (SC-01), cancellation (SC-02), and profile (MEDIC-108). Missing tests for: appointment search and filters, doctor view, user registration, and edge cases like booking outside the doctor's shift hours.",
            prompt: "Create Playwright tests for the following MedApp scenarios:\n1. Search appointments by doctor name\n2. Filter appointments by status (scheduled/cancelled/completed)\n3. Attempt to book on a past date (should fail)\n4. Attempt to book outside doctor's shift hours",
            skills: ["Playwright", "data-testid"],
          },
          {
            title: "Visual regression testing",
            description: "Add visual regression tests that compare screenshots pixel by pixel between releases. If a CSS change breaks the appointment list or booking form layout, the test catches it automatically.",
            prompt: "Configure visual regression testing with Playwright using toHaveScreenshot(). Take baseline screenshots of: login, dashboard, appointment list, booking form, and profile. Compare on each run.",
            skills: ["Playwright", "toHaveScreenshot", "CI/CD"],
          },
          {
            title: "Add contrast and accessibility checks to bug reports",
            description: "Based on feedback from the design module, audits should have concrete measurements. QA bug reports could include WCAG contrast ratios and accessibility checks with axe-core on every tested page.",
            prompt: "For each MedApp page, run axe-core inside Playwright and report accessibility violations. Include the contrast ratio for each text element.",
            skills: ["axe-core", "@axe-core/playwright"],
          },
          {
            title: "Performance testing with Playwright",
            description: "Measure page load times, time to interactive, and API response sizes. Alert if any endpoint takes more than 2 seconds.",
            prompt: "Add performance metrics to Playwright tests: measure page.waitForLoadState timing, intercept API responses and measure their times. Generate a report with the slowest pages.",
            skills: ["Playwright", "Performance API"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Backend", color: "#22d3ee", insight: "Finding race conditions in the backend (FIX-02, FIX-12) made me think about concurrency in QA too. Two users booking the same appointment slot is the same class of bug, and Playwright can test it with two browser contexts." },
          { fromArea: "Design", color: "#fb923c", insight: "After learning to measure contrast ratios in the design module, I started thinking about adding axe-core to the Playwright test suite so accessibility checks run automatically on every test." },
          { fromArea: "PM", color: "#34d399", insight: "I started writing test scenarios in Given/When/Then after learning the format in PM week. Each test now traces back to a documented requirement instead of just testing what feels important." },
          { fromArea: "AI", color: "#a78bfa", insight: "The guardrail principle 'a failing test documents a gap' applies directly to QA. When a test fails against the reference AC, the failure IS the finding, not a mistake to fix." },
        ],
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    color: "#fb923c",
    icon: "Palette",
    tagline: "UI/UX, Figma, Design Systems",
    projects: [
      {
        id: "vello-provider-card",
        title: "Vello ProviderCard",
        tagline: "AI-first design week: from design foundations to faithful code",
        description:
          "5-day AI-first design program on Vello, a hyperlocal neighbor services app. Covered the full design arc: foundations and vocabulary (Mon), discovery and research synthesis (Tue), UX architecture and flows (Wed), UI craft, systems and critique (Thu), and engineering handoff with a component audit (Fri). The Friday deliverable was a ProviderCard built with Claude, audited for token fidelity and accessibility.",
        requirements: [
          "Monday: Design foundations - product/UX/UI/visual vocabulary, design process phases, engineering touchpoints",
          "Tuesday: Discovery - synthesize interview transcripts with Claude, audit themes against verbatim evidence, extract data entities",
          "Wednesday: UX architecture - information architecture, user flows with all states (empty/loading/error/success), state-to-API contract table",
          "Thursday: UI craft - visual hierarchy, design system tokens, WCAG accessibility checks (contrast 4.5:1, 44px targets, focus states, semantics), AI critique comparison",
          "Friday: Engineering handoff - spec a component without inspect panel, generate with Claude, audit for token drift and accessibility, build a CLAUDE.md guardrail",
          "Every AI output must be verified against the source - a confident summary with no traceable source is fiction",
          "Consume semantic tokens, not raw values - 'color-primary-action' not '#557E26'",
          "The 5 rules: AI generates you decide, always verify against source, iterate in conversation, name your assumptions, the output is judgment not artifacts",
        ],
        improvements: [
          "Avatar fixed: from 21x20px to 64x64px using the real DS Avatar component",
          "Verification: from 2 duplicate signals (shield + chip) to 1 (VerifiedMark on avatar)",
          "Card height: from 246px ('Improved') to 154-175px (native ~155px)",
          "Placement: from new section above categories to second card in 'Trusted on your block'",
          "Available badge: didn't exist, now uses DS Badge brand (5.70:1 contrast)",
          "Distance: from only 'min walk' with map-pin to all 3 formats with correct icons",
          "Fixed price: from 'from $18' (incorrect) to '$18 / walk' (correct per data model)",
          "Keyboard focus: from 1.52:1 to 4.77:1 with solid --border-focus outline",
          "Clean CSS: 0 raw hex values or hardcoded sizes in components",
          "Unified data model: 1 shared providerModel.js between React and prototype",
          "CLAUDE.md evolved to v3.1 with error history and new rules for each failure",
        ],
        beforeDescription:
          "What we built and fixed:\n\n- Avatar: 21px -> 64px using real DS Avatar component\n- Verification: 2 signals -> 1 (VerifiedMark on avatar only)\n- Card height: 246px -> 154-175px (native ~155px, within +-15%)\n- Placement: above categories -> inside 'Trusted on your block' as second card\n- Available badge: didn't exist -> DS Badge brand (5.70:1 contrast)\n- Distance: only map-pin -> all 3 formats (footprints, milestone, map-pin)\n- CSS: raw hex values -> 0, all semantic tokens\n- CLAUDE.md evolved v1 -> v3.1 with 15 documented errors",
        afterDescription:
          "With the proposed improvements:\n\n- All weekly deliverables completed end-to-end, with core items finished before stretch goals\n- 10 open questions answered by the designer, each converting into a CLAUDE.md rule\n- Real provider photos added, validating the photo field end-to-end at 64x64px\n- Demo re-recorded with a timed script: problem (0:00) -> what Claude got wrong (0:30) -> how we fixed it (1:30) -> measured results (3:00) -> open questions (4:00) -> confident close (4:45)\n- Measured contrast table with 15 color pairs verified (not assumed)\n- CLAUDE.md pattern extracted as a reusable template for other teams",
        notes:
          "Key principles from the week:\n- Design is decision-making, not decoration. Every element answers a user question.\n- AI generates, you decide. Speed is not the skill - judging the output is.\n- Always verify against the source. A confident AI summary with no traceable source is fiction.\n- Iterate in conversation. One prompt is a first draft. The real work is the follow-up.\n- Accessibility is checkable facts, not taste: 4.5:1 contrast, 44px targets, semantic HTML, focus states.\n- A design system is a contract: tokens are the API of the UI. Consume semantic tokens, not raw values.\n- Critique the work, not the person. Anchor every point in a principle, not preference.\n\nThe 5-day arc: Foundations (Mon) -> Discovery (Tue) -> Architecture (Wed) -> Craft & Critique (Thu) -> Faithful Code (Fri).",
        youtubeId: "",
        techStack: [
          "React",
          "Vite",
          "Design Tokens",
          "WCAG",
          "Lucide Icons",
          "Claude AI",
        ],
        repoUrl: "https://github.com/adrianachipana-lab/vello-provider-card-deliverable",
        media: [
          { type: "image", src: "/media/design/neighbor-app-full.png", caption: "NeighborCard app - full view with state switcher and audit panel" },
          { type: "image", src: "/media/design/neighbor-card-closeup.png", caption: "NeighborCard closeup - photo, verified mark, Available badge, footprints, 5-star rating" },
          { type: "image", src: "/media/design/neighbor-state-available--featured.png", caption: "Available + featured state" },
          { type: "image", src: "/media/design/neighbor-state-not-available.png", caption: "Not available state - the absence of the badge IS the information" },
          { type: "image", src: "/media/design/neighbor-state-perfect-rating.png", caption: "Perfect rating state - all 5 stars filled" },
          { type: "image", src: "/media/design/neighbor-card-hover.png", caption: "Hover state - elevation and shadow change" },
          { type: "image", src: "/media/design/neighbor-keyboard-focus.png", caption: "Keyboard focus - visible outline for accessibility" },
          { type: "image", src: "/media/design/original-reference.jpg", caption: "Original reference image - the design we received with issues to find and fix" },
        ],
        liveUrl: "/vello-app/index.html",
        liveComparison: {
          beforeUrl: "/vello-before/index.html",
          afterUrl: "/vello-after/index.html",
          beforeLabel: "Vello app (original - design issues)",
          afterLabel: "Vello app (with our corrected NeighborCard)",
        },
        comparisons: [
          {
            before: "/media/design/original-reference.jpg",
            after: "/media/design/neighbor-card-closeup.png",
            label: "Original reference vs corrected NeighborCard",
            description: "Left: the reference we received - Available badge in coral/red (fails WCAG at 4.10:1), 'from $24' for a fixed price. Right: corrected NeighborCard with green Available badge (5.70:1), proper price format, semantic tokens, photo with verified mark.",
          },
        ],
        stats: [
          { label: "Final Score", value: "8.7" },
          { label: "CLAUDE.md Versions", value: "3" },
          { label: "Errors Documented", value: "15" },
        ],
        whatILearned: "I learned that design is not just how it looks, but how it's MEASURED. The mentor's feedback was clear: 'Add contrast ratios and other measured values to every audit.' I also learned that every element in a component answers a user question - the initials say 'hire a neighbor, not a stranger', the footprints say 'you can walk there'. Designing the absence (the unavailable state) is just as important as designing the presence.",
        toolsUsed: ["Claude Code", "CLAUDE.md (guardrail)", "Vello Design System", "Design Tokens", "WCAG Contrast Checker", "Playwright (screenshots)", "Vite"],
        proposedImprovements: [
          {
            title: "Prompt evolution: from generic to precise generation",
            description: "Step 1 prompt was generic: 'Generate a NeighborCard using the design system tokens.' Result: token drift, div instead of button, no availability state. Step 2 prompt was precise: 'Compare property by property - don't accept looks similar, it has to be the exact token.' Result: found 7/11 properties with drift. The lesson: one prompt is a first draft. The real work is the follow-up.",
            prompt: "Step 1 (weak): 'Generate a NeighborCard for Vello using the design system tokens.'\n\nStep 2 (strong): 'Compare this NeighborCard property by property against the Vello Design System. For each visual value (color, font, spacing, radius, shadow, border, icons), tell me: what semantic token it should use, what the component used, whether it matches or drifted, and the correction. Don't accept looks similar - it has to be the exact token and the native pattern.'",
            skills: ["Prompt iteration", "Token audit"],
          },
          {
            title: "Prompt evolution: from 'check accessibility' to specific rules",
            description: "The v1 CLAUDE.md said 'verify color contrast.' That's too vague - Claude 'verified' it without measuring. The v3 prompt lists every specific check: 'Is the card a button or div? Tap targets 44px? Focus-visible? prefers-reduced-motion? Correct ARIA? Does Available badge rely on color alone?' This found 5 real issues the vague prompt missed.",
            prompt: "Step 1 (weak): 'Check accessibility on this component.'\n\nStep 2 (strong): 'Review against WCAG: is the card a button or div? Tap targets minimum 44px? Focus-visible states? prefers-reduced-motion? Correct ARIA usage? Does the Available badge rely on color alone? Does the chevron have aria-hidden? Do the stars have aria-label? Does the photo have alt text?'",
            skills: ["WCAG", "Specific prompting"],
          },
          {
            title: "Prompt evolution: integration requires product context",
            description: "Step 4 prompt without context: 'Add this component to the page.' Result: overlay that felt outside the app. With context: 'Insert using Vello's native classes (nb, nb__avatar, nb__body...) inside Trusted on your block list.' Result: card that fits naturally. A component can render perfectly and still fail as a product. Integration rules had to go into the guardrail.",
            prompt: "Step 1 (failed): 'Integrate the NeighborCard into the Vello HTML prototype.'\n\nStep 2 (failed): 'Add it near the top of Home.'\n\nStep 3 (correct): 'Insert the card using Vello's native classes: nb, nb__avatar, nb__vmark, nb__body, nb__top, nb__name, nb__avail, nb__bio, nb__price, nb__meta, nb__walk, nb__tap. The card should look like another neighbor in the Trusted on your block list, not an external component.'",
            skills: ["Product integration", "Native patterns"],
          },
          {
            title: "Add measured contrast ratios to every audit finding",
            description: "Feedback: 'Add contrast ratios and other measured values to every audit.' The original audit had no numbers. After adding measurements: focus ring was 1.52:1 (needs 3:1), Available badge was 4.10:1 (needs 4.5:1 at 12px). Numbers turn opinions into facts.",
            prompt: "For every text/background pair in the ProviderCard and prototype, compute the WCAG contrast ratio. Format: pair name | hex values | computed ratio | pass/fail AA | pass/fail AAA. Flag anything below 4.5:1 for normal text or 3:1 for large text/UI components.",
            skills: ["WCAG", "WebAIM Contrast Checker"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Frontend", color: "#6366f1", insight: "Working with TypeScript in the frontend made me think about design tokens differently. Instead of accepting any string as a color, you define a union type of valid token names, and TypeScript catches raw hex at build time." },
          { fromArea: "QA", color: "#f472b6", insight: "The design fidelity audit is essentially the same thing as QA testing against reference AC. I structured the audit findings the same way: expected behavior, actual behavior, gap, and fix." },
          { fromArea: "Backend", color: "#22d3ee", insight: "I used the same P0-P3 severity classification from the backend audit for design issues. A broken 21px avatar is P0 (visually broken), while off-scale spacing is P2 (inconsistency)." },
          { fromArea: "PM", color: "#34d399", insight: "The 'no orphan features' principle from PM helped me think about design: every visual element should answer a user question. If it doesn't serve the user's task, it's the design equivalent of an orphan feature." },
        ],
      },
    ],
  },
  {
    id: "pm",
    title: "Product Management",
    color: "#34d399",
    icon: "ClipboardList",
    tagline: "Discovery, PRD, MVP, RICE, roadmap",
    projects: [
      {
        id: "renest-product",
        title: "ReNest - Product Management Week",
        tagline: "From problem to ship-ready MVP in 5 days",
        description:
          "Full Product Management week on ReNest, a used furniture marketplace. Took a real problem ('buyers can't tell whether a used item is worth contacting the seller about') from initial framing to a prioritized MVP with acceptance criteria, risks, and a go/no-go recommendation.",
        requirements: [
          "Day 1: Problem Frame - problem statement, persona (JTBD), North Star Metric, value proposition",
          "Day 2-3: Mini-PRD - goals, 5-8 candidate features, functional + non-functional requirements with measurable thresholds, MVP hypothesis, Now/Next/Later roadmap",
          "Day 4: Prioritization - RICE scores, MoSCoW, Value vs Effort, Kano model, North Star check (no orphan features), sensitivity analysis, guardrail metrics, dependency map",
          "Day 5: Delivery - acceptance criteria (Given/When/Then), top 3 risks with mitigation, go/no-go with criteria and rollback trigger, 5-minute video",
          "Every feature must trace back to the problem and persona - no orphan features",
          "Requirements with measurable thresholds (not 'fast' or 'easy')",
          "Genuinely small MVP - defending what's OUT is as important as what's IN",
        ],
        improvements: [
          "Specific problem statement: identifies who (buyers), what (can't assess real condition) and why it matters (listings go stale, buyers leave)",
          "Persona with substance: Laura, 28, analyst, with real context (phone, lunch breaks, 5-10 min sessions), concrete pains (burned twice driving 25 min), and current workaround (cross-checks Facebook Marketplace, buys new at IKEA)",
          "Non-vanity North Star: 'Weekly qualified connections' - only goes up when buyer contacts AND seller replies. Not views, not signups",
          "7 candidate features, each traceable to the problem. 0 orphan features in North Star check",
          "RICE with honest confidence scores: price comparison at 35% because there's no sales data, condition label at 90% because it's simple",
          "MVP 'trust trio': condition label + multi-angle photos + flaw disclosure. Each attacks a different aspect of the same trust problem",
          "Sensitivity analysis: stress-test of what happens if scores change - the MVP holds in most scenarios",
          "Guardrail metrics: listing completion rate can't drop more than 10%, time-to-list can't increase more than 3 min",
          "Dependency map: the MVP trio works as a unit, response-time is independent, price comparison is blocked by data pipeline",
          "Acceptance criteria with happy + unhappy paths: empty field, legacy listings without condition, images that don't load",
          "Go/no-go with 4 ship criteria, quantified rollback trigger (contact rate drops 5% or listing completion drops 10%), and post-launch metrics",
        ],
        beforeDescription:
          "What we built:\n\n- Problem Frame: specific problem statement, persona (Laura, 28) with JTBD, North Star (weekly qualified connections), value proposition\n- Mini-PRD: 7 candidate features, requirements with measurable thresholds (200ms, 3s per photo), MVP hypothesis with IN/OUT/WHY\n- Prioritization: RICE with honest confidence (price comparison at 35%), MoSCoW (only 3 Musts), Kano, sensitivity analysis, guardrail metrics, dependency map\n- Delivery: acceptance criteria with happy + 3 unhappy paths, top 3 risks, go/no-go recommendation: GO\n- Video: 5-minute recorded presentation\n\nWhat can be better:\n\n- RICE scores use estimates, not real data - no user interviews to validate assumptions\n- No A/B test plan to verify the MVP actually moves the North Star\n- No competitive analysis to benchmark against Facebook Marketplace, Craigslist, etc.\n- Confidence percentages are honest guesses, not data-backed",
        afterDescription:
          "What changed after feedback and reflection:\n\n- Swapped the response-time indicator requirements for flaw disclosure prompts so the requirements section matches the actual MVP (mentor's catch)\n- Acceptance criteria rewritten to be testable by QA: each one follows Given/When/Then and covers both happy and unhappy paths\n- Requirements all have measurable thresholds (200ms on 4G, 3 seconds per photo, 500ms for checklist) instead of vague words like 'fast'\n- Sensitivity analysis added: stress-tested what happens if RICE assumptions change, confirmed the MVP holds\n- Guardrail metrics defined to detect if the MVP causes unintended damage (listing completion can't drop > 10%)\n\nNext steps (not yet done):\n- User interviews to validate assumptions with real data\n- Competitive analysis to benchmark against existing marketplaces\n- A/B test plan for the trust trio before full rollout",
        notes:
          "Mentor feedback:\n\n'Your PRD has really strong traceability from persona to MVP, the condition/photos/flaw-disclosure trio tells a coherent trust story, and your NFRs are all genuinely testable. One nit: your requirements section details the response-time indicator, which you've deferred to Next - swap for flaw disclosure so requirements match the Now bucket.' -> Fixed.\n\n'The content is genuinely strong - you hit every beat. Surfacing the 35% confidence score as your reason for deferring price comparison is exactly the kind of honest prioritization reasoning a stakeholder wants to hear.'\n\n'Where to grow: the delivery reads as under-rehearsed - filler words, run-on sentences, and a very abrupt close that undersells a recommendation you'd actually earned. Try a dry run out loud before a meeting, and land your final recommendation as one clear, complete sentence.'\n\nKey lesson: a framework makes trade-offs visible, it doesn't make the decision for you. Garbage in, garbage out - a RICE score with made-up numbers is a made-up decision wearing a spreadsheet.",
        youtubeId: "",
        techStack: [
          "RICE",
          "MoSCoW",
          "Kano",
          "JTBD",
          "PRD",
          "Now/Next/Later",
        ],
        stats: [
          { label: "Features Evaluated", value: "7" },
          { label: "MVP Features", value: "3" },
          { label: "RICE #1 Score", value: "10,800" },
        ],
        whatILearned: "I learned that a PM's job is to make trade-offs visible and defend them. A framework (RICE, MoSCoW) doesn't make the decision - you make it and you own it. The most important lesson: garbage in, garbage out - a RICE score with 100% confidence on everything is a made-up decision wearing a spreadsheet. I also learned that a genuine MVP feels 'uncomfortably small', and defending what's OUT is as important as what's IN.",
        toolsUsed: ["RICE Framework", "MoSCoW", "Kano Model", "Value vs Effort", "JTBD", "North Star Metric", "Now/Next/Later Roadmap", "Given/When/Then (AC)", "Claude Code"],
        proposedImprovements: [
          {
            title: "Validate RICE assumptions with user interviews (next step)",
            description: "The RICE scores use reasonable estimates, not real data. Next step: 5-10 interviews with real marketplace users to validate whether condition is truly the #1 pain, and adjust confidence scores based on what users actually say.",
            prompt: "Design a 15-minute interview guide to validate the trust problem in used furniture listings. 5 open-ended questions that don't bias the answer. Include screening to ensure the interviewee has bought used furniture online in the last 6 months.",
            skills: ["User Research", "Interview Guide"],
          },
          {
            title: "Competitive analysis to benchmark the trust trio (next step)",
            description: "Compare ReNest with Facebook Marketplace, Craigslist, OfferUp on: how they show condition, what photos they require, and how they handle the trust gap. This would ground the RICE scores in real competitor data instead of estimates.",
            prompt: "Analyze 4 used furniture marketplaces. For each: how they show item condition, photo requirements, seller ratings, and trust features. Summarize in a comparative table.",
            skills: ["Competitive Analysis", "Market Research"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Backend", color: "#22d3ee", insight: "Finding 24 real issues in the backend audit taught me to think about unhappy paths in the PRD too. 'What happens if two users do X at the same time' is exactly the kind of scenario acceptance criteria should cover." },
          { fromArea: "QA", color: "#f472b6", insight: "QA week taught me that if QA can't test my acceptance criteria, they're not testable. I rewrote the ReNest AC so a QA engineer could turn each one into Given/When/Then without guessing." },
          { fromArea: "Design", color: "#fb923c", insight: "The design module's Definition of Done (measure, don't assume) changed how I write PRD requirements. Instead of 'fast' I write '< 200ms on 4G'. If you can't measure it, it's not a requirement." },
          { fromArea: "AI", color: "#a78bfa", insight: "I used Claude to stress-test my RICE scores by asking it to argue against my confidence percentages. The AI module taught me to use Claude as a challenger, not a yes-machine." },
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "IA",
    color: "#a78bfa",
    icon: "Bot",
    tagline: "Prompting, guardrails, CLAUDE.md evolution",
    projects: [
      {
        id: "ai-guardrail-evolution",
        title: "Guardrail Evolution: CLAUDE.md v1 to v3.1",
        tagline: "How to write prompts that guide Claude correctly",
        description:
          "The AI module is about how to give Claude instructions so it does its job well. A CLAUDE.md was evolved through 3 versions, each correcting concrete errors from the previous one. The core idea: rules alone aren't enough - you need context and method.",
        requirements: [
          "Create a guardrail (CLAUDE.md) that guides Claude on design tasks",
          "Identify what Claude gets wrong and why",
          "Iterate the prompt correcting each error with a new rule",
          "Document the evolution: what failed, why, and what rule fixes it",
          "Demonstrate that the improved version produces better results",
        ],
        improvements: [
          "v1 to v2: from basic rules ('only 6 hex colors') to semantic tokens - Claude stopped inventing colors",
          "v2 to v3: added data contract, native prototype anatomy, and measured contrast table",
          "v3 to v3.1: added mandatory method (5 steps in order), Definition of Done with checkboxes, and 'check DS before building'",
          "History of 15 documented errors: each has what Claude did, why it happened, and what rule was added",
          "10 open questions for the designer - things Claude must NOT resolve by guessing",
          "Measured WCAG contrast table (not assumed): 15 color pairs verified",
          "guardrail-evolution.md explaining the full evolution",
        ],
        beforeDescription:
          "What we built:\n\n- CLAUDE.md evolved through 3 versions, each correcting concrete errors\n- v3.1 has 3 layers: Rules + Context + Method\n- 15 errors documented with what Claude did, why, and the corrective rule\n- 10 open questions for the designer (things Claude must NOT guess)\n- Measured contrast table with 15 color pairs\n- Applied v3.1 and measured the results: avatar 21->64px, signals 2->1, height 246->154-175px\n\nWhat can be better:\n\n- Only tested on ProviderCard - unknown if rules generalize to other components\n- No automated pipeline for the Definition of Done (manual grep and measurement)\n- No anti-patterns section to help detect errors before they happen\n- No reusable template for other teams to adopt the pattern",
        afterDescription:
          "With the proposed improvements:\n\n- CLAUDE.md tested on a second component (BookingCard), validating which rules are general and which are ProviderCard-specific\n- Automated Node.js pipeline running §9 checks: grep for raw values, compute WCAG contrast ratios, take 375px screenshots, generate pass/fail report\n- Anti-patterns section: 'If you see Claude doing X, it's probably repeating error Y - verify Z' for each of the 15 documented errors\n- Reusable guardrail template with the structure (§0-§10) but generic placeholders, ready for any team to adopt\n- The pattern applied across all Nerdery areas: backend skills are mini-guardrails, QA test structure follows the method, PM deliverables use the 'measure, don't assume' principle",
        notes:
          "The main lesson: rules tell the AI WHAT to follow, context tells it WHY, and method tells it HOW to verify. All 3 together are necessary.\n\nEach version was born from concrete failures:\n- v1 failed because rules without context leave room for interpretation\n- v2 failed because context without method doesn't guarantee verification\n- v3 failed on things it didn't cover (not checking the DS, not measuring heights, DOM observer)\n- v3.1 fixes those last gaps\n\nThe error history at the end of CLAUDE.md is the most valuable part: anyone who reads it understands not just WHAT to do but WHY each rule exists.",
        youtubeId: "",
        techStack: [
          "Claude AI",
          "Prompt Engineering",
          "CLAUDE.md",
          "Design Tokens",
          "WCAG",
        ],
        repoUrl: "https://github.com/adrianachipana-lab/vello-provider-card-deliverable",
        stats: [
          { label: "Versions", value: "v1->v3.1" },
          { label: "Errors Tracked", value: "15" },
          { label: "Open Questions", value: "10" },
        ],
        whatILearned: "I learned that giving instructions to an AI has 3 layers, and all 3 are necessary:\n1. RULES: tell it WHAT to follow ('use semantic tokens')\n2. CONTEXT: tell it WHY ('this is the file where the tokens live, this is the decision already made')\n3. METHOD: tells it HOW to verify ('measure contrast, don't assume it; follow these 5 steps in order')\n\nWithout rules, Claude invents. Without context, Claude misinterprets. Without method, Claude doesn't verify. All 3 together are what makes a prompt actually work.",
        toolsUsed: ["CLAUDE.md (guardrail)", "Claude Code", "Playwright (screenshots)", "Design Tokens", "WCAG Contrast", "Vello Design System", "guardrail-evolution.md"],
        proposedImprovements: [
          {
            title: "CLAUDE.md v1 -> v2: from rules to context",
            description: "v1 said 'only 6 hex colors.' Claude followed it literally and still drifted - it used raw hex instead of semantic tokens because the rule said 'these colors' not 'use --surface-card.' v2 added token names, traced decisions, and the principle 'don't copy raw values into component CSS.' This fixed the color drift but didn't prevent Claude from skipping verification.",
            prompt: "v1 rule (weak): 'Only these six colors exist: paper #F6F2E7, forest #16462F, olive #557E26...'\n\nv2 rule (better): 'Component CSS uses semantic tokens only. Examples: --surface-card, --brand-primary, --text-muted. Do not copy raw hex values into component styles, even when the value matches a documented primitive. Raw primitives belong only in the token-definition layer.'",
            skills: ["CLAUDE.md v1", "CLAUDE.md v2"],
          },
          {
            title: "CLAUDE.md v2 -> v3: from context to method",
            description: "v2 had the right tokens but Claude still produced a 21px avatar, duplicated verification signals, and 'verified' contrast without measuring it. v3 added mandatory steps: 1) Look before building 2) Map the data 3) Build from one source 4) Verify with numbers 5) Record. Plus a Definition of Done with measurable checkboxes.",
            prompt: "v2 approach (no method): 'Use semantic tokens. Here are the token names.'\n\nv3 approach (with method): '§0 Workflow - run this every time, in order: 1. Look before building (read how the prototype already solves it) 2. Map the data (field by field) 3. Build from one source 4. Verify with numbers (measure contrast, avatar size, card height) 5. Record (update the audit with one row per property checked)'",
            skills: ["CLAUDE.md v3", "Definition of Done"],
          },
          {
            title: "CLAUDE.md v3 -> v3.1: from one test to generalization",
            description: "v3 was applied and Claude almost rebuilt a component the DS already shipped, planned on the wrong avatar color, and didn't render because the prototype replaces its HTML element after load. v3.1 added: 'check the DS component list FIRST', prototype mechanics docs, and the principle that if DS and prototype disagree, DS wins.",
            prompt: "v3 gap: '§1 pointed at the prototype, not the DS component list.'\n\nv3.1 fix: '§0 step 1: Before writing any code, check whether the design system already ships the component (§1: DS bundle component list), then read how the prototype uses it. Where the DS and the prototype disagree, write the disagreement down (§10).'",
            skills: ["CLAUDE.md v3.1", "Error-driven iteration"],
          },
          {
            title: "Automate the Definition of Done with a verification script",
            description: "§9 has 12 checkboxes that are currently checked manually: no raw hex in CSS, avatar size measured, card height measured, contrast recorded, etc. A Node.js script could automate most of them: grep for raw values, compute contrast ratios, take screenshots, and generate a pass/fail report.",
            prompt: "Create a Node.js script that automates CLAUDE.md §9:\n1. grep -r for hex/rgba outside the token block\n2. Measure contrasts for each color pair with the WCAG formula\n3. Take a 375px screenshot with Playwright\n4. Generate a markdown report with pass/fail for each checkbox",
            skills: ["Node.js", "Playwright", "Automation"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Frontend", color: "#6366f1", insight: "Seeing 'catch (apiError: any)' repeated 15 times in the frontend taught me that a CLAUDE.md rule could prevent it: 'Never use any in catch blocks.' The guardrail catches pattern mistakes before code review does." },
          { fromArea: "Backend", color: "#22d3ee", insight: "The 8 backend skills I built are the AI module applied to real work. Each skill follows the same 'rules + context + method' structure as the CLAUDE.md guardrail. The pattern transfers directly." },
          { fromArea: "QA", color: "#f472b6", insight: "The QA principle 'a failing test documents a gap' maps perfectly to guardrails: when Claude breaks a rule, the failure tells you what the next version needs. Every error in the change log became a new rule." },
          { fromArea: "PM", color: "#34d399", insight: "The PM 'no orphan features' principle became 'no orphan rules' in the guardrail. Every rule traces to a documented error. If no error produced it, it doesn't belong." },
        ],
      },
    ],
  },
];
