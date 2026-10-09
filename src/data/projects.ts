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
  code?: { before?: string; after: string; file: string };
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
          "What we built:\n\n- Kanban board with 5 columns, full CRUD via GraphQL, drag-and-drop, responsive mobile layout\n- 9/9 checkpoints passing (45/45 tests), deployed on Vercel\n- Custom hooks for task operations, Error Boundary, toast notifications\n- Advanced filter panel, list view, profile popover\n\nCode review found 7 issues (all one theme: concurrency and time):\n\n- dueDate filter off by one day (UTC parse + local render)\n- Drag fires N mutations and overlapping drags fight over one slot\n- Silent validation, submit button never disables during flight\n- Refetch-everything after every mutation\n- Modal uses <dialog open> instead of showModal() (not truly modal)\n- Search fires a query per keystroke (undebounced)\n- Dashboard.tsx and MyTasks.tsx have duplicated handler code",
        afterDescription:
          "All 7 code review issues fixed:\n\n1. dueDate: replaced Date().toDateString() comparison with direct string comparison using formatDateInputValue() (local parts, no UTC shift)\n2. Drag race condition: added a drag queue (dragQueueRef) so overlapping drags execute sequentially\n3. Silent validation: added nameError state with inline error (role='alert', aria-invalid) + isSubmitting to disable button during flight\n4. Refetch: create uses refetchQueries (targeted), delete uses cache.modify() (no network request)\n5. Modal: uses dialog.showModal() for native focus trap + backdrop + keyboard. Added aria-modal, role='dialog', dynamic ariaLabel\n6. Search: added 300ms debounce with local searchInput state for instant UI while delaying the query\n7. Duplicated code: extracted useTaskActions() hook with shared handlers. Both pages import from it, ~60 lines removed",
        notes: "PR #2 (code review fixes): github.com/adrianachipana-lab/ravn-task-management/pull/2\nBranch: fix/code-review-week4\n\nCode review highlights (what was done well):\n- TaskForm with optional initialData is exactly the right shape - one form, zero create/edit duplication\n- Discriminated result type ({ success: true } | { success: false; error: string }) forces every caller to handle failure\n- Toasts have aria-live='polite'\n- Only drag-and-drop in the cohort that reindexes siblings with honest per-move toasts\n- No index keys, no state mutation, no conditional hooks\n- 62/62 tests pass, typecheck and lint clean\n- README documents every deviation with a reason\n\nCode review theme: concurrency and time - parallel mutations, in-flight double-submits, undebounced queries, timezone parsing. That is the next layer of frontend skill after correctness.\n\nMentor advice: use GraphQL Codegen (Ricardo), keep variable names descriptive, use libraries that simplify code.",
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
            title: "Fix 1: dueDate off by one day",
            description: "Date-only ISO string parses as UTC midnight, but .toDateString() renders in local time. In any timezone behind UTC, filtering for Aug 11 matched Aug 10.",
            code: {
              before: "const filterDate = new Date(filters.dueDate).toDateString();\nreturn all.filter((task) =>\n  new Date(task.dueDate).toDateString() === filterDate\n);",
              after: "// Compare date strings directly - no UTC/local mismatch\nreturn all.filter((task) =>\n  formatDateInputValue(task.dueDate) === filters.dueDate\n);",
              file: "src/hooks/useTasks.ts:38-40",
            },
            skills: ["UTC vs local time", "Date handling"],
          },
          {
            title: "Fix 2: Drag race condition",
            description: "One drop fired N mutations via Promise.all. If two drags overlapped, drag B overwrote drag A's pending state. Added a drag queue so each drag chains onto the previous Promise.",
            code: {
              before: "const updateTasks = async (inputs) => {\n  await Promise.all(\n    inputs.map((input) => runUpdateTaskMutation(input))\n  );\n  await refetch();\n};",
              after: "// Each drag chains onto the previous\nconst dragQueueRef = useRef(\n  Promise.resolve({ success: true })\n);\n\nconst updateTasks = (inputs) => {\n  dragQueueRef.current = dragQueueRef.current.then(\n    async () => {\n      await Promise.all(inputs.map(runUpdateTaskMutation));\n      await refetch();\n      return { success: true };\n    }\n  );\n  return dragQueueRef.current;\n};",
              file: "src/hooks/useTasks.ts:99-118",
            },
            skills: ["Concurrency", "Promise chaining"],
          },
          {
            title: "Fix 3: Silent validation + double-submit",
            description: "Empty name just returned silently. Submit button never disabled during flight. Added nameError state with aria-invalid and isSubmitting to disable the button.",
            code: {
              before: "if (!name.trim()) return;",
              after: "if (!name.trim()) {\n  setNameError('Task title is required');\n  titleRef.current?.focus();\n  return;\n}\nsetNameError('');\nsetIsSubmitting(true);\n\n// In JSX:\n<textarea\n  aria-invalid={!!nameError}\n/>\n{nameError && (\n  <span role=\"alert\">{nameError}</span>\n)}\n<button disabled={isSubmitting}>Save</button>",
              file: "src/components/TaskForm/TaskForm.tsx:73-94",
            },
            skills: ["Form validation", "Accessibility", "aria-invalid"],
          },
          {
            title: "Fix 5: Modal not truly modal",
            description: "<dialog open> is non-modal: background stays tabbable, no focus trap. Switched to dialog.showModal() which gives native focus trap, ::backdrop, and keyboard handling for free.",
            code: {
              before: "<dialog open={isOpen}>\n  {/* no focus trap, no aria-modal */}\n</dialog>",
              after: "// showModal() provides native focus trap and semantics\nif (isOpen && !dialog.open) {\n  dialog.showModal();\n}\n\n<dialog\n  ref={dialogRef}\n  aria-modal=\"true\"\n  role=\"dialog\"\n  aria-label={ariaLabel}\n/>",
              file: "src/components/Modal/Modal.tsx:42-55",
            },
            skills: ["dialog.showModal()", "Focus trap", "ARIA"],
          },
          {
            title: "Fix 7: Duplicated page code extracted to shared hook",
            description: "Dashboard.tsx and MyTasks.tsx had identical handleCreate/handleUpdate/handleDelete. Extracted useTaskActions() hook - both pages import from it, ~60 lines removed.",
            code: {
              after: "// New shared hook\nexport function useTaskActions(showNotification) {\n  const { createTask, updateTask, deleteTask } = useTasks();\n  \n  const handleCreate = async (input) => {\n    const result = await createTask(input);\n    showNotification(result.success\n      ? 'Task created' : result.error);\n  };\n  // ... handleUpdate, handleDelete\n  return { handleCreate, handleUpdate, handleDelete,\n    editingTask, deletingTaskId, modals... };\n}",
              file: "src/hooks/useTaskActions.ts (new file)",
            },
            skills: ["Custom hooks", "DRY", "Code extraction"],
          },
          {
            title: "GraphQL Codegen for type-safe queries (next step)",
            description: "Mentor recommendation: auto-generate types from the schema instead of maintaining them manually. Eliminates type drift between API and frontend.",
            prompt: "Install @graphql-codegen/cli and generate typed hooks for all queries and mutations. Replace manual types in src/types/.",
            skills: ["GraphQL Codegen", "TypeScript"],
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
        beforeDescription: "",
        afterDescription: "",
        notes: "",
        youtubeId: "",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://week1-showcase.vercel.app",
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
          "FIX-02: Race condition in order creation - moved ALL checkout logic inside Prisma $transaction. If two requests arrive simultaneously, the second sees the cart as 'converted' and fails safely",
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
          "FIX-14: JWT now returns fresh token after profile update",
          "FIX-15: Cart shows stockWarning when quantity exceeds available stock",
          "FIX-16: Notifications now paginated with page/limit/totalItems",
          "FIX-17: Likes blocked on disabled products - added status: 'active' check",
          "FIX-18: createPaymentLink reserves stock in $transaction, processPaymentFailure restores stock + promo",
          "FIX-19: Order detail response now matches list format - consistent shapes for frontend",
          "FIX-20: Categories CRUD for managers - create, update, delete (blocks if has active products)",
          "FIX-21: Address deletion blocked when active orders reference it",
          "FIX-22: Cart quantity capped at 99 units per item",
          "FIX-23: Low-stock alerts fire for any stock below threshold with 24h dedup",
          "FIX-24: toMoney() utility for consistent 2-decimal rounding across services",
          "Cart stock exposure - formatCart() now includes SKU stock so the frontend can cap quantities",
        ],
        beforeDescription:
          "Full audit: 24 issues found, all 24 fixed.\n\nP0 Critical (6+1): race condition in orders, delivery system missing, duplicate payments, demo stock validation, promo code on cancellation, cart items not cleaned, direct purchase stock gap\nP1 High (7): disabled products in cart, per-user promo limit, cart items orphaned, stock overselling, variants after soft-delete, webhook race condition, slug collisions\nP2 Medium (7): JWT stale after update, cart stock warning, notifications pagination, likes on disabled products, order response inconsistency, categories read-only, direct purchase no transaction\nP3 Low (4): address deletion safety, cart quantity limit, low-stock detection, decimal precision\n\nHow I found them: traced every data flow end to end (cart to order, order to payment, payment to webhook, cancellation). For each flow I checked transaction boundaries, race conditions, data consistency across services, and what happens when things fail.\n\nFinal review caught 3 gaps that my own fixes introduced (FIX-18) - proof that reviewing your own changes is essential.",
        afterDescription:
          "All 24 issues fixed. 100 tests passing, build clean, lint clean.\n\nCritical fixes:\n- Orders safe from race conditions - entire checkout inside Prisma $transaction\n- Stock reserved at order creation, consistent across ALL paths (cart, direct purchase, cancellation, payment failure)\n- Delivery system functional - managers see workload and assign with capacity limits\n- Payments idempotent - no duplicate charges, no 500 on duplicate webhooks\n- Promo codes have per-user limits, restored on cancellation and payment failure\n\nHigh fixes:\n- Disabled products blocked from cart, variants deactivated on soft-delete\n- Webhook idempotency atomic, slug collisions handled with random suffix + retry\n\nMedium fixes:\n- JWT refreshed after profile update, cart warns about insufficient stock\n- Notifications paginated, likes blocked on disabled products\n- Order responses consistent between list and detail, categories have full CRUD\n\nLow fixes:\n- Address deletion blocked with active orders, cart quantity capped at 99\n- Low-stock alerts fire below threshold with 24h dedup, decimal precision centralized",
        notes:
          "Branch: fix/api-audit-p0-p1 (6 commits, 100 tests passing)\nPR (audit fixes): https://github.com/adrijonas16/Ravn--BackEnd/pull/3\nPR (AI skills): https://github.com/adrijonas16/Ravn--BackEnd/pull/1\nAI skills branch: ai-module-skills-assignment\n\nWhat went well:\n- Full end-to-end audit tracing every data flow (cart -> order -> payment -> webhook -> cancellation)\n- Found 24 real issues including race conditions, stock overselling, and idempotency gaps\n- Fixed all 24 with updated tests, 100 passing\n- Found 3 bugs our own fixes introduced (FIX-18) - proves self-review works\n- Built a frontend to demonstrate the flows visually\n\nMentor advice:\n- Use descriptive variable names: 'loginData' not 'data', 'userProfile' not 'result'\n- Name variables after what they return: 'orderResponse', 'paymentIntent', 'deliveryWorkload'\n- The audit approach (test the frontend, notice what doesn't work, trace back to the backend) is how real bugs are found",
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
          { label: "Fixes Applied", value: "24/24" },
          { label: "Tests Passing", value: "100" },
        ],
        whatILearned: "I learned to do a full audit of a production backend: identify race conditions, validate Prisma transactions, understand Stripe payment flows, and document issues with severity and fix plans. The most important lesson: the most dangerous bugs are concurrency bugs - two requests at the same time can create corrupt data if they're not inside a transaction.",
        toolsUsed: ["Claude Code", "/investigate-task", "/verify-change", "/security-check", "/db-check", "/api-contract-check", "/test-coverage", "NestJS", "Prisma", "Jest"],
        proposedImprovements: [
          {
            title: "FIX-02: Race condition - entire checkout inside $transaction",
            description: "Before: cart lookup, stock validation, and promo validation ran outside the transaction. Two concurrent requests could both find the same active cart and create duplicate orders.",
            code: {
              before: "// Cart lookup OUTSIDE transaction\nconst cart = await this.prisma.cart.findFirst({\n  where: { userId, status: 'active' },\n});\n// ... validate stock, promo ...\n// Transaction only for order creation\nawait this.prisma.$transaction(async (tx) => {\n  // Create order\n});",
              after: "// EVERYTHING inside the transaction\nconst order = await this.prisma.$transaction(async (tx) => {\n  // Cart lookup INSIDE transaction\n  const cart = await tx.cart.findFirst({\n    where: { userId, status: 'active' },\n  });\n  // Validate stock INSIDE transaction\n  // Validate promo INSIDE transaction\n  // Create order, clean cart items, mark converted\n  await tx.cartItem.deleteMany({ where: { cartId: cart.id } });\n  await tx.cart.update({ where: { id: cart.id }, data: { status: 'converted' } });\n  return created;\n});",
              file: "src/orders/orders.service.ts",
            },
            skills: ["Prisma $transaction", "Race condition prevention"],
          },
          {
            title: "FIX-07: Disabled products blocked from cart (one-line fix)",
            description: "A manager could disable a product without deleting it, but clients could still add it to their cart because the status check was missing.",
            code: {
              before: "if (!sku || !sku.isActive || sku.product.deletedAt) {\n  throw new NotFoundException('Product SKU not found or inactive');\n}",
              after: "if (!sku || !sku.isActive || sku.product.deletedAt\n    || sku.product.status !== 'active') {\n  throw new NotFoundException('Product SKU not found or inactive');\n}",
              file: "src/cart/cart.service.ts:74-81",
            },
            skills: ["Input validation", "Defense in depth"],
          },
          {
            title: "FIX-08: Per-user promo code limit",
            description: "A user could use the same promo code on multiple orders because the validation only checked the global redemption count, not per-user.",
            code: {
              after: "// After global limit check, verify per-user limit\nconst userRedemption = await tx.promoCodeRedemption.findFirst({\n  where: { promoCodeId: promo.id, userId },\n});\nif (userRedemption) {\n  throw new BadRequestException(\n    'You have already used this promo code',\n  );\n}",
              file: "src/orders/orders.service.ts:134-142",
            },
            skills: ["/security-check", "Per-user validation"],
          },
          {
            title: "FIX-12: Webhook idempotency made atomic",
            description: "Before: findUnique + create as separate operations. Two identical webhooks arriving simultaneously could both pass findUnique and the second would cause a 500 error.",
            code: {
              before: "// Check if already processed\nconst existing = await this.prisma.stripeWebhookEvent.findUnique({\n  where: { stripeEventId: event.id },\n});\nif (existing) return { received: true, duplicate: true };\n// Create record\nawait this.prisma.stripeWebhookEvent.create({ ... });",
              after: "// Atomic: try to create, catch duplicate\ntry {\n  await this.prisma.stripeWebhookEvent.create({\n    data: { stripeEventId: event.id, eventType: event.type, ... },\n  });\n} catch (error: any) {\n  if (error.code === 'P2002') {\n    return { received: true, duplicate: true };\n  }\n  throw error;\n}",
              file: "src/webhooks/webhooks.service.ts:56-72",
            },
            skills: ["Idempotency", "Prisma P2002"],
          },
          {
            title: "Final review: 3 gaps our own fixes introduced",
            description: "After applying FIX-10 (stock reserved on order creation), we found that createPaymentLink (direct purchase) and processPaymentFailure were not updated. The review caught these consistency gaps and fixed them. 100 tests passing after all fixes.",
            code: {
              after: "// createPaymentLink now decrements stock inside $transaction\nawait tx.productVariant.update({\n  where: { id: item.productVariantId },\n  data: { stock: { decrement: item.quantity } },\n});\n\n// processPaymentFailure now restores stock\nfor (const item of order.items) {\n  await tx.productVariant.update({\n    where: { id: item.productVariantId },\n    data: { stock: { increment: item.quantity } },\n  });\n}",
              file: "src/payments/payments.service.ts + src/webhooks/webhooks.service.ts",
            },
            skills: ["Consistency review", "Stock flow integrity"],
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
          { fromArea: "PM", color: "#34d399", insight: "I used the RICE framework from PM week to prioritize the 24 fixes. FIX-07 (one-line fix, high confidence) ranked above FIX-10 (high impact but high effort). Not all P0 bugs should be fixed first." },
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
          "What we plan to improve next:\n\n- Expand test coverage to all MEDIC features: search, filters, doctor view, registration, edge cases\n- Add visual regression testing with Playwright toHaveScreenshot()\n- Integrate axe-core for automated accessibility checks\n- Add performance metrics to tests (page load times, API response times)\n- Add concurrent user tests for race condition scenarios",
        notes:
          "Repo: github.com/adrianachipana-lab/ravn-qa-week\nTest files: wednesday/tests/, thursday/api-tests/, friday-capstone/tests/\nCI workflow: friday-capstone/ci/playwright-capstone.yml\n\nWhat went well:\n- Asked 7 critical questions BEFORE reporting bugs on Day 1, showing judgment to distinguish bugs from pending features\n- Tests against reference AC with explicit gap documentation - each red test explains the difference between AC and app\n- Found real bugs proactively: timezone issue, state transition vulnerability (patient changing to 'completed' via API), booking on past dates\n- 20+ PRs delivered in 5 days with daily peer reviews\n- CI workflow as stretch goal\n\nMentor teaching moments:\n- A test that fails against the AC is documentation, not a mistake\n- Who decides what's wrong is the PO/PM, not QA or Dev\n- Outdated AC = update the story, not a bug. Incorrect implementation = bug with Low/Medium severity\n- The reference Design state map didn't exist (track never ran) - mentor proposed auditing real data-testid hooks as substitute\n- Test data strategy: isolated environments + unique data with UUID > snapshot/restore",
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
        id: "vello-neighbor-card",
        title: "Vello NeighborCard",
        tagline: "AI-first design week: from design foundations to faithful code",
        description:
          "5-day AI-first design program on Vello, a hyperlocal neighbor services app. Covered the full design arc: foundations and vocabulary (Mon), discovery and research synthesis (Tue), UX architecture and flows (Wed), UI craft, systems and critique (Thu), and engineering handoff with a component audit (Fri). The Friday deliverable was a NeighborCard built with Claude, audited for token fidelity and accessibility.",
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
          "Built the NeighborCard component with semantic tokens from the Vello design system",
          "Photo with verified mark (shield SVG), Available badge, footprints distance icon, 5-star rating",
          "All states implemented: available, unavailable, featured, no vouches, different pricing",
          "Integrated the card into the Vello prototype using native .nb classes so it fits naturally in the list",
          "Profile view: clicking the card opens Maya Rivera's real profile in the prototype",
          "Token fidelity audit: every visual property traced to a semantic token, no raw hex values",
          "Accessibility: button element (not div), aria-labels on stars and badge, focus-visible states",
          "Available badge contrast fixed: from 4.12:1 (failing AA) to 5.70:1 (passing) by using --text-brand (green-700)",
          "CLAUDE.md guardrail evolved through 3 versions, each fixing concrete errors from the previous one",
          "Measured contrast audit: 11 color pairs verified with WCAG 2.1 formulas",
        ],
        beforeDescription:
          "What we built and fixed:\n\n- Avatar: 21px -> 64px using real DS Avatar component\n- Verification: 2 signals -> 1 (VerifiedMark on avatar only)\n- Card height: 246px -> 154-175px (native ~155px, within +-15%)\n- Placement: above categories -> inside 'Trusted on your block' as second card\n- Available badge: didn't exist -> DS Badge brand (5.70:1 contrast)\n- Distance: only map-pin -> all 3 formats (footprints, milestone, map-pin)\n- CSS: raw hex values -> 0, all semantic tokens\n- CLAUDE.md evolved v1 -> v3.1 with 15 documented errors",
        afterDescription:
          "What we improved after feedback (PR #1):\n\n- Measured all 11 color combinations with WCAG 2.1 formulas in a contrast audit (day4-thursday/contrast-audit.md). Found 1 failing pair.\n- Available badge fix: text color was --brand-primary (green-600) at 4.12:1, failing AA for 12px text. Changed to --text-brand (green-700) at 5.70:1. Applied to both card and profile view.\n- Fixed stale 'coral' references in Day 2 and Day 3 docs that still referenced the first buggy badge color.\n- Added feedback response doc mapping each mentor feedback point to the specific change made.\n- Timeline of the badge bug is now explicit: missing -> coral -> green -> contrast-fixed green.",
        notes:
          "Repo: github.com/adrianachipana-lab/vello-provider-card-deliverable\nPR #1: github.com/adrianachipana-lab/vello-provider-card-deliverable/pull/1\nBranches: main (first delivery), improve/neighbor-card-feedback (fixes)\n\nWhat went well (mentor feedback):\n- Tied every element to the product: connected the initials failure to Vello's bet that you hire a neighbor, not a stranger\n- Caught what Claude got wrong piece by piece: initials instead of photos, generic check mark, no availability badge, wrong distance format\n- Guardrail grew from real failures: 4 iterations, each triggered by a named problem\n- Designed the absence: built the unavailable state on the idea that the absence is the information\n- Showed how thinking changed: before the week a card needed a name and basic info, now every element answers a question\n- Went the extra mile: design QA of the whole app, report in two languages, recorded demo, left designer questions with reasons\n\nWhere to grow (mentor feedback):\n- Early week deliverables were thin - two of seven complete end to end\n- Add measurements: audit had no contrast numbers. Measuring makes good reasoning easier to trust -> Fixed in PR #1\n\nThe 5-day arc: Foundations (Mon) -> Discovery (Tue) -> Architecture (Wed) -> Craft & Critique (Thu) -> Faithful Code (Fri).",
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
        liveComparison: {
          beforeUrl: "/vello-before/index.html",
          afterUrl: "/vello-after/index.html",
          beforeLabel: "Vello app (original - design issues)",
          afterLabel: "Vello app (NeighborCard with contrast fixes)",
        },
        stats: [
          { label: "CLAUDE.md Versions", value: "3" },
          { label: "Errors Found", value: "15" },
          { label: "Design Days", value: "5" },
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
            prompt: "For every text/background pair in the NeighborCard and prototype, compute the WCAG contrast ratio. Format: pair name | hex values | computed ratio | pass/fail AA | pass/fail AAA. Flag anything below 4.5:1 for normal text or 3:1 for large text/UI components.",
            skills: ["WCAG", "WebAIM Contrast Checker"],
          },
          {
            title: "CLAUDE.md guardrail: how we taught Claude the design system",
            description: "We gave Claude the full Vello design system (tokens, components, prototype HTML) as context, then built a CLAUDE.md file that evolved through 3 versions. Each version fixed errors the previous one missed. This is how we controlled what Claude generated instead of just accepting the first output.",
            code: {
              before: "# CLAUDE.md v1 - too vague\n\n## Tokens\nOnly these six colors exist:\npaper #F6F2E7, forest #16462F, olive #557E26,\npersimmon #F0623B, amber #F4B740, ink #1B1C18.\n\n## Accessibility\nVerify color contrast.\n\n# Result: Claude used raw hex instead of\n# semantic tokens. 'Verified' contrast\n# without measuring it.",
              after: "# CLAUDE.md v3 - rules + context + method\n\n## §0 Workflow (run every time)\n1. Look before building - read how the\n   prototype already solves it\n2. Map the data field by field\n3. Build from one source\n4. Verify with numbers (measure, don't assume)\n5. Record in the audit\n\n## §2 Tokens\nComponent CSS uses semantic tokens ONLY:\n--surface-card, --brand-primary, --text-muted\nNever raw hex, even if the value matches.\n\n## §8 Contrast (measured, not assumed)\n| Pair              | Ratio  | Verdict |\n| text-strong/card  | 17.13  | pass    |\n| text-brand/card   | 6.60   | pass    |\n| focus-ring/card   | 1.52   | FAIL    |\n\n# Result: Claude followed the method,\n# measured contrast, used correct tokens.",
              file: "CLAUDE.md (v1 vs v3)",
            },
            skills: ["CLAUDE.md guardrail", "Prompt engineering", "Iterative improvement"],
          },
          {
            title: "Giving Claude the full design context",
            description: "Before generating any component, we loaded the Vello design system, the prototype HTML, and the product brief into Claude's context. This is what made the difference between Claude guessing and Claude following the system.",
            prompt: "Context loaded before generation:\n1. Vello Design System (all tokens: colors, fonts, spacing, radii, shadows)\n2. Vello Prototype HTML (the real app with native .nb card structure)\n3. Product Brief (what Vello is, the 3 roles, the trust model)\n4. CLAUDE.md guardrail (rules, traced decisions, accessibility floor)\n\nThen: 'Generate a NeighborCard for Vello. Follow CLAUDE.md. Use the design system tokens, not raw hex. Match the native .nb structure from the prototype.'",
            skills: ["Context engineering", "Design system", "Prototype reference"],
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
          "RICE with realistic reach estimates (users per quarter, not inflated) and honest confidence scores: price comparison at 35% because there's no sales data, condition label at 90% because it's simple",
          "MVP 'trust trio': condition label + multi-angle photos + flaw disclosure. Each attacks a different aspect of the same trust problem",
          "Sensitivity analysis: stress-test of what happens if scores change - the MVP holds in most scenarios",
          "Guardrail metrics: listing completion rate can't drop more than 10%, time-to-list can't increase more than 3 min",
          "Dependency map: the MVP trio works as a unit, response-time is independent, price comparison is blocked by data pipeline",
          "Acceptance criteria with happy + unhappy paths: empty field, legacy listings without condition, images that don't load",
          "Go/no-go with 4 ship criteria, quantified rollback trigger (contact rate drops 5% or listing completion drops 10%), and post-launch metrics",
        ],
        beforeDescription:
          "What we built:\n\n- Problem Frame: specific problem statement, persona (Laura, 28) with JTBD, North Star (weekly qualified connections), value proposition\n- Mini-PRD: 7 candidate features, requirements with measurable thresholds (200ms, 3s per photo), MVP hypothesis with IN/OUT/WHY\n- Prioritization: RICE with realistic reach and honest confidence (price comparison at 35%), MoSCoW (only 3 Musts), Kano, sensitivity analysis, guardrail metrics, dependency map\n- Delivery: acceptance criteria with happy + 3 unhappy paths, top 3 risks, go/no-go recommendation: GO\n- Video: 5-minute recorded presentation\n\nWhat can be better:\n\n- RICE scores use estimates, not real data - no user interviews to validate assumptions\n- No A/B test plan to verify the MVP actually moves the North Star\n- No competitive analysis to benchmark against Facebook Marketplace, Craigslist, etc.\n- Confidence percentages are honest guesses, not data-backed",
        afterDescription:
          "What changed after feedback and how I improved it:\n\n- Mentor said requirements section had the response-time indicator (deferred to Next) instead of flaw disclosure (in MVP). I swapped them so the documented requirements match what we're actually building.\n- Mentor said NFRs are testable - I made sure every requirement has a number: 200ms on 4G, 3 seconds per photo upload, 500ms for the checklist load. No 'fast' or 'easy'.\n- I added sensitivity analysis after realizing RICE scores are only as good as the assumptions. Stress-tested: what if multi-angle photos confidence drops to 60%? MVP still holds.\n- I defined guardrail metrics to catch unintended damage: listing completion can't drop > 10%, time-to-list can't increase > 3 min. These protect against the risk of adding friction for sellers.\n- Acceptance criteria now cover unhappy paths: empty condition field blocks publish, legacy listings show 'Not specified', tooltip images are progressive enhancement.",
        notes:
          "What went well (mentor feedback):\n- Strong traceability from persona to MVP - the trust trio tells a coherent story\n- NFRs are all genuinely testable (measurable thresholds, not vague words)\n- Content is genuinely strong - hit every beat\n- Surfacing the 35% confidence score as reason for deferring price comparison is exactly the kind of honest prioritization reasoning a stakeholder wants to hear\n- Defended the most expensive MVP feature (multi-angle photos) with a clear trade-off argument\n\nWhere to grow (mentor feedback):\n- Requirements section had the wrong feature (response-time indicator instead of flaw disclosure) -> Fixed\n- RICE scores use estimates, not validated data -> next step: user interviews\n\nKey lesson: a framework makes trade-offs visible, it doesn't make the decision for you. Garbage in, garbage out - a RICE score with made-up numbers is a made-up decision wearing a spreadsheet.",
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
          { label: "RICE #1 Score", value: "480" },
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
    tagline: "Claude Code skills, automation, AI-assisted development",
    projects: [
      {
        id: "ai-skills-module",
        title: "AI Module: 8 Claude Code Skills",
        tagline: "Reusable skills that automate investigation, verification, security, and more",
        description:
          "Built 8 reusable Claude Code skills that automate recurring development tasks: investigating bugs, verifying changes, checking security, validating API contracts, measuring test coverage, syncing docs, checking DB schema, and validating environment variables. Each skill runs as a fresh-session agent with no prior context. Also included a real project improvement: capping cart quantities by available stock.",
        requirements: [
          "Build Claude Code skills with 2026 best practices: allowed-tools, argument-hint, dynamic context, routing-rule descriptions",
          "Each skill has a clear phase: before coding (investigate, env-check), during coding (db-check, security-check, api-contract-check), after coding (verify-change, test-coverage, docs-sync)",
          "Shared reference.md centralizing project paths, modules, auth architecture, and commands",
          "A real project improvement as evidence that the skills work",
          "Fresh-session runs as proof: skills must work without prior conversation context",
          "Full writeup at docs/ai-module/writeup.md with evidence of completed runs",
          "PR with mentor review and feedback addressed",
        ],
        improvements: [
          "/investigate-task: turns a vague bug report into a scoped plan with root cause, file:line references, and validation steps (25 tool calls, 67s in fresh session)",
          "/verify-change: runs targeted tests, then broader checks (full tests, build, lint), records every command + exit code (21 tool calls, 138s)",
          "/security-check: checks @UseGuards, @Roles, @Exclude, input validation, IDOR, mass assignment per endpoint",
          "/db-check: runs prisma validate + migrate status, compares schema fields vs DTOs with file:line citations",
          "/api-contract-check: decision rule for investigating BE, FE, or both; output template in separate file",
          "/test-coverage: finds untested critical paths and suggests test cases with file:line",
          "/docs-sync: dynamic baseline tied to the task (not arbitrary HEAD~3), reports missing baseline instead of suppressing error",
          "/env-check: validates env vars are present and correctly formatted, tests connectivity without exposing secrets",
          "Cart stock fix: backend exposes stock field in formatCart(), frontend disables quantity buttons when at limit",
          "After review: verify-change extended with HTTP, DB, and browser checks (Playwright for cart stock verification)",
        ],
        beforeDescription:
          "What we built:\n\n- 8 Claude Code skills covering the full development lifecycle (before/during/after coding)\n- Each skill uses allowed-tools frontmatter, argument-hint for autocomplete, dynamic context for fresh data, and routing-rule descriptions with trigger phrases\n- Shared reference.md so all skills know the project structure without duplicating info\n- Cart stock validation as a real improvement: formatCart() exposes stock, frontend caps quantities\n- Fresh-session evidence: investigate-task ran 25 tool calls in 67s, verify-change ran 21 tool calls in 138s, both with zero prior context\n- PR #1 submitted with full writeup and evidence",
        afterDescription:
          "What changed after mentor review:\n\n- api-contract-check: added decision rule for when to investigate BE, FE, or both. Extracted output template to a separate file\n- docs-sync and investigate-task: replaced arbitrary HEAD~3 baseline with task-specific SHA. Now reports missing baseline instead of silently returning empty results\n- verify-change: extended beyond unit tests with criteria for HTTP checks (request/response wiring), DB checks (persistence), and browser checks (Playwright)\n- All 8 skills updated to reference ../reference.md (was pointing to wrong path)\n- Replaced planned invocations with evidence of completed fresh-session runs\n- Added Playwright cart-stock browser verification test\n\nMentor review: 'The skills are lean, straightforward, and easy to read and understand. The progressive disclosure keeps the main instructions focused.' LGTM at commit c71a947.",
        notes:
          "Branch: ai-module-skills-assignment\nPR: github.com/adrijonas16/Ravn--BackEnd/pull/1 (13 commits, LGTM at c71a947)\nSkills location: .claude/skills/ (8 SKILL.md files + reference.md)\n\nWhat went well (mentor feedback):\n- Skills are lean, straightforward, and easy to read and understand\n- Progressive disclosure keeps the main instructions focused\n- Fresh-session evidence proves skills work without prior context\n- Cart stock fix demonstrates real impact of the skills\n\nWhere to grow (mentor feedback):\n- api-contract-check: needed a decision rule for when to investigate BE, FE, or both -> Fixed\n- docs-sync and investigate-task: HEAD~3 baseline was arbitrary and failed silently -> Fixed with task-specific SHA\n- verify-change: needed criteria beyond unit tests (HTTP, DB, browser checks) -> Fixed with Playwright\n- All skills referenced wrong path for reference.md -> Fixed\n- Write-up had planned invocations instead of completed runs -> Fixed with real evidence\n\nKey lesson: a silently empty result looks like 'no changes' when it might mean 'the command failed'. Always report failures explicitly.",
        youtubeId: "",
        techStack: [
          "Claude Code",
          "Skills/Agents",
          "NestJS",
          "Playwright",
          "Jest",
        ],
        repoUrl: "https://github.com/adrijonas16/Ravn--BackEnd",
        stats: [
          { label: "Skills Built", value: "8" },
          { label: "Commits", value: "13" },
          { label: "Tests Passing", value: "69" },
        ],
        whatILearned: "I learned that Claude Code skills are essentially reusable prompts with guardrails. Each skill encodes a method so Claude doesn't skip steps. The key insight: dynamic context (loading fresh data at invocation) is what makes skills reliable across sessions. A skill that depends on prior conversation context is fragile. The mentor review taught me that silent failures are worse than loud ones - when docs-sync returned empty because HEAD~3 didn't exist, it looked like success when it was actually a broken command.",
        toolsUsed: ["Claude Code", "/investigate-task", "/verify-change", "/security-check", "/db-check", "/api-contract-check", "/test-coverage", "/docs-sync", "/env-check", "Playwright", "Jest"],
        proposedImprovements: [
          {
            title: "How the skills work: allowed-tools + dynamic context",
            description: "Each skill has YAML frontmatter that pre-approves specific tools (Read, Grep, Bash commands) so Claude doesn't ask for permission during execution. Dynamic context loads fresh data when the skill is invoked.",
            code: {
              after: "---\nallowed-tools: [Read, Grep, Glob, Bash(npm run test*)]\nargument-hint: \"describe the bug or behavior to investigate\"\n---\n\n# investigate-task\n\n!git diff --name-only $(git merge-base HEAD main) HEAD\n!cat .claude/skills/reference.md\n\n## Steps\n1. Restate expected vs actual behavior\n2. Determine scope (BE/FE/both)\n3. Find similar working code\n4. Form hypothesis and test it\n5. Produce plan with file:line references",
              file: ".claude/skills/investigate-task/SKILL.md",
            },
            skills: ["allowed-tools", "dynamic context", "argument-hint"],
          },
          {
            title: "Shared reference.md: project knowledge in one place",
            description: "All 8 skills import the same reference file instead of duplicating project info. It contains paths, module list, auth architecture, and common commands.",
            code: {
              after: "# Project Reference\n\n## Paths\n- Backend: BackEnd/tshirt-store-api/tshirt-api\n- Frontend: BackEnd/tshirt-store-api/tshirt-frontend\n\n## Modules\nauth, cart, products, orders, payments, delivery,\npromo-codes, notifications, webhooks, storage\n\n## Auth\n- JWT + Passport, guards: JwtAuthGuard, RolesGuard\n- Roles: manager, client, delivery_person\n- Custom decorator: @CurrentUser\n\n## Commands\n- Tests: npm run test -- <pattern> --runInBand\n- Build: npm run build\n- Lint: npx eslint \"{src,apps,libs,test}/**/*.ts\"",
              file: ".claude/skills/reference.md",
            },
            skills: ["Shared context", "DRY"],
          },
          {
            title: "Review feedback: dynamic baseline for docs-sync",
            description: "The mentor caught that git diff HEAD~3 fails silently when there are fewer than 3 commits. The fix: use the task's actual merge-base SHA as baseline, and report when the baseline is missing instead of returning empty results.",
            code: {
              before: "# Load recent changes\n!git diff --name-only HEAD~3 2>/dev/null || true",
              after: "# Load changes since the task branched from main\n!git diff --name-only $(git merge-base HEAD main) HEAD\n\n# If the above is empty, check staged + unstaged separately\n!git diff --name-only --cached\n!git diff --name-only\n\n## Important: if all three are empty, say so explicitly.\n## Do NOT treat empty output as 'no changes' - it may mean\n## the command failed or the baseline is wrong.",
              file: ".claude/skills/docs-sync/SKILL.md",
            },
            skills: ["Dynamic baseline", "Explicit failure reporting"],
          },
          {
            title: "Cart stock fix: the real improvement the skills produced",
            description: "Used /investigate-task to find the root cause (formatCart() not exposing stock), /verify-change to confirm the fix (13/13 cart tests pass), and Playwright to verify the browser behavior (quantity buttons disabled at stock limit).",
            code: {
              after: "// cart.service.ts - formatCart() now exposes stock\nreturn {\n  id: item.id,\n  productVariantId: item.productVariantId,\n  quantity: item.quantity,\n  stock: item.productVariant.stock, // NEW: frontend uses this\n  // ... rest of fields\n};\n\n// CartPage.tsx - frontend caps quantity\n<button\n  disabled={item.quantity >= item.stock}\n  onClick={() => updateQuantity(Math.min(item.stock, quantity))}\n>\n  +\n</button>",
              file: "cart.service.ts + CartPage.tsx",
            },
            skills: ["/investigate-task", "/verify-change", "Playwright"],
          },
        ],
        crossAreaInsights: [
          { fromArea: "Frontend", color: "#6366f1", insight: "The frontend's repetitive 'catch (apiError: any)' pattern is exactly what a skill could prevent. A /code-standards skill could grep for anti-patterns and suggest typed alternatives before code review." },
          { fromArea: "Backend", color: "#22d3ee", insight: "The 8 skills were born from the backend audit. Each recurring task (investigate a bug, verify a fix, check security) became a skill so the same method runs every time without forgetting steps." },
          { fromArea: "QA", color: "#f472b6", insight: "The QA principle 'a failing test documents a gap' applies to skills too: when /verify-change fails, the failure output tells you exactly what broke and where, same as a Playwright test failure." },
          { fromArea: "Design", color: "#fb923c", insight: "The CLAUDE.md guardrail from the design module follows the same pattern as a skill: rules (allowed-tools), context (reference.md), and method (step-by-step instructions). The design week taught me the pattern, the AI module applied it 8 times." },
        ],
      },
    ],
  },
];
