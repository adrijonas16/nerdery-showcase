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
  prUrl?: string;
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
          "All 7 code review issues fixed + 7 follow-up improvements (verified with build + 81 tests + lint):\n\n1. dueDate: replaced Date().toDateString() comparison with direct string comparison using formatDateInputValue() (local parts, no UTC shift)\n2. Drag race condition: added a drag queue (dragQueueRef) so overlapping drags execute sequentially\n3. Silent validation: added nameError state with inline error (role='alert', aria-invalid) + isSubmitting to disable button during flight\n4. Refetch: create uses refetchQueries (targeted), delete uses cache.modify() (no network request)\n5. Modal: uses dialog.showModal() for native focus trap + backdrop + keyboard. Added aria-modal, role='dialog', dynamic ariaLabel\n6. Search: added 300ms debounce with local searchInput state for instant UI while delaying the query\n7. Duplicated code: extracted useTaskActions() hook with shared handlers. Both pages import from it, ~60 lines removed\n\nFollow-up fixes (verified):\n8. Form stuck after failure: wrapped onSubmit in try/finally so isSubmitting always resets\n9. Drag queue resilience: Promise.allSettled + refetch wrapped in try/catch so queue never rejects. Subsequent operations always execute.\n10. Delete + move full coordination: delete goes through dragQueueRef (not just await). isDeletingRef blocks new moves during delete. updateTask waits for queue before editing.\n11. Optimistic UI recovery: pendingMoveCountRef tracks concurrent moves. Only clears optimistic state when all complete. Delete failure falls back to server state. Multiple drags no longer share a single pendingMoveUpdates.\n12. Debounce stale filter fix: filtersRef prevents 300ms timer from overwriting concurrent filter changes. searchInput syncs when filters are cleared. Pending timer cancelled on clear.\n13. DnD library migration: replaced native draggable/dataTransfer/events with @dnd-kit/core + @dnd-kit/sortable. Keyboard (KeyboardSensor) and touch (TouchSensor) support added. Position calculation extracted to testable utility.\n14. Test coverage: 81 tests (up from 63). New tests: drag position calculations, queue serialization, refetch failure recovery, delete-during-move coordination, optimistic state lifecycle.",
        notes: "PR #2 (code review fixes): github.com/adrianachipana-lab/ravn-task-management/pull/2\nBranch: fix/code-review-issues\n\nVerification: npm run build (clean), npm run test:run (81/81), npm run lint (0 warnings)\n\nCode review highlights (what was done well):\n- TaskForm with optional initialData is exactly the right shape - one form, zero create/edit duplication\n- Discriminated result type ({ success: true } | { success: false; error: string }) forces every caller to handle failure\n- Toasts have aria-live='polite'\n- Only drag-and-drop in the cohort that reindexes siblings with honest per-move toasts\n- No index keys, no state mutation, no conditional hooks\n- README documents every deviation with a reason\n\nCode review theme: concurrency and time - parallel mutations, in-flight double-submits, undebounced queries, timezone parsing. That is the next layer of frontend skill after correctness.\n\nMentor advice: use GraphQL Codegen (Ricardo), keep variable names descriptive, use libraries that simplify code.\n\nPending recommendations (not yet implemented):\n- GraphQL Codegen for type-safe queries\n- Browser E2E tests (Playwright) for the full drag-and-drop flow",
        youtubeId: "",
        techStack: ["React", "TypeScript", "Vite", "GraphQL", "Figma"],
        liveUrl: "https://ravn-task-management.vercel.app",
        repoUrl: "https://github.com/adrianachipana-lab/ravn-task-management",
        prUrl: "https://github.com/adrianachipana-lab/ravn-task-management/pull/2",
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
          { label: "Tests", value: "81/81" },
        ],
        whatILearned: "I learned to build a full app from a Figma design in 4 weeks, progressing from React fundamentals to a complete Kanban board with GraphQL. The biggest lessons: TypeScript strict typing catches bugs before they happen, custom hooks keep logic reusable, and the quality standard matters more than completing every feature - quality over quantity was the challenge's core principle.",
        toolsUsed: ["React", "TypeScript", "Vite", "GraphQL", "Vitest", "Figma", "Claude Code", "Vercel", "@dnd-kit"],
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
            title: "Fix 8: Form stuck after failure (follow-up)",
            description: "isSubmitting was set to true but never reset when onSubmit failed. The button stayed disabled forever and the user couldn't retry. Wrapped onSubmit in try/finally so isSubmitting always resets. Form data is preserved on failure so the user can fix and retry.",
            code: {
              before: "setIsSubmitting(true);\nonSubmit({ name, status, ... });",
              after: "setIsSubmitting(true);\ntry {\n  await onSubmit({ name, status, ... });\n} finally {\n  setIsSubmitting(false);\n}",
              file: "src/components/TaskForm/TaskForm.tsx:82-91",
            },
            skills: ["Error recovery", "try/finally"],
          },
          {
            title: "Fix 9: Drag queue partial failure handling (follow-up)",
            description: "Promise.all rejects on the first failure, but other mutations from the same drag keep running. The old catch returned a result but didn't reconcile the partial server state. Replaced with Promise.allSettled so all updates complete, then always refetch to reconcile.",
            code: {
              before: "await Promise.all(inputs.map(runUpdateTaskMutation));\nawait refetch();",
              after: "const settled = await Promise.allSettled(\n  inputs.map(runUpdateTaskMutation)\n);\n// Always refetch to reconcile with server\nawait refetch();\nif (failures.length > 0) {\n  return { success: false,\n    error: `${failures.length} of ${inputs.length} failed` };\n}",
              file: "src/hooks/useTasks.ts:104-118",
            },
            skills: ["Promise.allSettled", "Server reconciliation"],
          },
          {
            title: "Fix 10: Delete + move full coordination",
            description: "Original fix only awaited the queue then called deleteTask outside it. New version: delete goes through dragQueueRef so subsequent drags wait. isDeletingRef blocks new moves while deleting. updateTask also waits for the queue before editing.",
            code: {
              after: "// Delete enters the queue and blocks new moves\nconst safeDeleteTask = (taskId) => {\n  isDeletingRef.current = true;\n  const op = dragQueueRef.current.then(async () => {\n    try { return await deleteTask(taskId); }\n    finally { isDeletingRef.current = false; }\n  });\n  dragQueueRef.current = op;\n  return op;\n};\n\n// updateTasks checks the flag\nif (isDeletingRef.current)\n  return { success: false, error: 'delete in progress' };",
              file: "src/hooks/useTasks.ts:130-150",
            },
            skills: ["Queue coordination", "Ref-based flags"],
          },
          {
            title: "Fix 11: Optimistic UI recovery",
            description: "Multiple drags shared a single pendingMoveUpdates array. One failure cleared state for all pending moves. Replaced with pendingMoveCountRef: each move increments on start, decrements in finally. Optimistic state only clears when count reaches 0. Delete failure falls back to server state.",
            code: {
              before: "const [pendingMoveUpdates, setPendingMoveUpdates] = useState([]);\n// One failure clears all:\nsetOptimisticTasks(null);\nsetPendingMoveUpdates([]);",
              after: "const pendingMoveCountRef = useRef(0);\n\n// In handleMoveTasks:\npendingMoveCountRef.current++;\ntry { ... } finally {\n  pendingMoveCountRef.current--;\n  if (pendingMoveCountRef.current === 0)\n    setOptimisticTasks(null);\n}",
              file: "src/pages/Dashboard/Dashboard.tsx:50-75",
            },
            skills: ["Optimistic UI", "Concurrent state"],
          },
          {
            title: "Fix 12: Debounce stale filter fix",
            description: "The 300ms timer captured filters at closure time. Changing another filter before the timer fired overwrote it. Fixed with filtersRef. Also syncs searchInput when clearFilters is called and cancels pending timers.",
            code: {
              before: "const handleSearchChange = useCallback((value) => {\n  setFilters({ ...filters, name: value || undefined });\n}, [filters, setFilters]);",
              after: "const filtersRef = useRef(filters);\nfiltersRef.current = filters;\n\nconst handleSearchChange = useCallback((value) => {\n  debounceRef.current = setTimeout(() => {\n    setFilters({ ...filtersRef.current, name: value || undefined });\n  }, 300);\n}, [setFilters]);\n\n// Sync on clear\nuseEffect(() => {\n  if (filters.name === undefined && searchInput !== '') {\n    setSearchInput('');\n    clearTimeout(debounceRef.current);\n  }\n}, [filters.name, searchInput]);",
              file: "src/App.tsx:31-48",
            },
            skills: ["Debounce", "Stale closures", "useRef"],
          },
          {
            title: "Fix 13: DnD library migration (@dnd-kit)",
            description: "Replaced native draggable/dataTransfer/events with @dnd-kit/core + @dnd-kit/sortable. DndContext at Dashboard level, SortableContext per column, DragOverlay for the preview. Added PointerSensor, TouchSensor, and KeyboardSensor with sortableKeyboardCoordinates. Position calculation extracted to a pure testable function.",
            code: {
              after: "// Dashboard.tsx\n<DndContext sensors={sensors}\n  collisionDetection={closestCorners}\n  onDragEnd={handleDragEnd}>\n  <TaskColumn ... />\n  <DragOverlay>\n    {activeTask && <TaskCard task={activeTask} />}\n  </DragOverlay>\n</DndContext>\n\n// TaskColumn.tsx\n<SortableContext items={taskIds}\n  strategy={verticalListSortingStrategy}>\n  {tasks.map(t => <SortableTaskCard ... />)}\n</SortableContext>",
              file: "src/pages/Dashboard/Dashboard.tsx + src/components/TaskColumn/TaskColumn.tsx",
            },
            skills: ["@dnd-kit", "Keyboard a11y", "Touch support"],
          },
          {
            title: "Fix 14: Test coverage (63 -> 81 tests)",
            description: "Added 18 new tests covering: drag position calculations (8 cases), queue serialization and error recovery (6 cases), optimistic state lifecycle (2 cases), TaskColumn rendering (4 cases). Queue tests simulate the ref-based promise chain to verify moves serialize, refetch failures don't break the chain, and deletes block concurrent moves.",
            code: {
              after: "// useTaskQueue.test.ts - queue simulation\nit('continues after refetch fails', async () => {\n  const r1 = q.enqueueMove(\n    async () => {},\n    async () => { throw new Error('refetch failed'); },\n  );\n  const r2 = q.enqueueMove(async () => {}, async () => {});\n  expect((await r1).success).toBe(true);  // mutation ok\n  expect((await r2).success).toBe(true);  // chain intact\n});",
              file: "src/hooks/useTaskQueue.test.ts + src/utils/dragPositions.test.ts",
            },
            skills: ["Vitest", "Queue testing", "Pure function testing"],
          },
          {
            title: "GraphQL Codegen for type-safe queries (pending recommendation)",
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
          "FIX-25: Cron job auto-cancels abandoned orders (pending > 2h) every 15 min — restores reserved stock, creates cancellation inventory movements, frees promo code redemptions",
          "Cart stock exposure - formatCart() now includes SKU stock so the frontend can cap quantities",
        ],
        beforeDescription:
          "Full audit: 25 issues found, all 25 fixed.\n\nP0 Critical (6+1): race condition in orders, delivery system missing, duplicate payments, demo stock validation, promo code on cancellation, cart items not cleaned, direct purchase stock gap\nP1 High (7): disabled products in cart, per-user promo limit, cart items orphaned, stock overselling, variants after soft-delete, webhook race condition, slug collisions\nP2 Medium (7): JWT stale after update, cart stock warning, notifications pagination, likes on disabled products, order response inconsistency, categories read-only, direct purchase no transaction\nP3 Low (4+1): address deletion safety, cart quantity limit, low-stock detection, decimal precision, abandoned order cleanup cron\n\nHow I found them: traced every data flow end to end (cart to order, order to payment, payment to webhook, cancellation). For each flow I checked transaction boundaries, race conditions, data consistency across services, and what happens when things fail.\n\nFinal review caught 3 gaps that my own fixes introduced (FIX-18) - proof that reviewing your own changes is essential.",
        afterDescription:
          "All 25 issues fixed. 100 tests passing, build clean, lint clean.\n\nCritical fixes:\n- Orders safe from race conditions - entire checkout inside Prisma $transaction\n- Stock reserved at order creation, consistent across ALL paths (cart, direct purchase, cancellation, payment failure)\n- Delivery system functional - managers see workload and assign with capacity limits\n- Payments idempotent - no duplicate charges, no 500 on duplicate webhooks\n- Promo codes have per-user limits, restored on cancellation and payment failure\n\nHigh fixes:\n- Disabled products blocked from cart, variants deactivated on soft-delete\n- Webhook idempotency atomic, slug collisions handled with random suffix + retry\n\nMedium fixes:\n- JWT refreshed after profile update, cart warns about insufficient stock\n- Notifications paginated, likes blocked on disabled products\n- Order responses consistent between list and detail, categories have full CRUD\n\nLow fixes:\n- Address deletion blocked with active orders, cart quantity capped at 99\n- Low-stock alerts fire below threshold with 24h dedup, decimal precision centralized\n- Cron job auto-cancels abandoned orders after 2h, restoring stock and freeing promo codes",
        notes:
          "Branch: fix/api-audit-p0-p1 (5 commits, 100 tests passing)\nPR: https://github.com/adrijonas16/Ravn--BackEnd/pull/3\n\nWhat went well:\n- Full end-to-end audit tracing every data flow (cart -> order -> payment -> webhook -> cancellation)\n- Found 25 real issues including race conditions, stock overselling, and idempotency gaps\n- Fixed all 25 with updated tests, 100 passing\n- Found 3 bugs our own fixes introduced (FIX-18) - proves self-review works\n- Built a frontend to demonstrate the flows visually\n- Added cron job to auto-cancel abandoned orders, completing the stock reservation lifecycle\n\nMentor advice:\n- Use descriptive variable names: 'loginData' not 'data', 'userProfile' not 'result'\n- Name variables after what they return: 'orderResponse', 'paymentIntent', 'deliveryWorkload'\n- The audit approach (test the frontend, notice what doesn't work, trace back to the backend) is how real bugs are found",
        youtubeId: "_1guhp4rFR4",
        techStack: [
          "NestJS",
          "Prisma",
          "PostgreSQL",
          "JWT",
          "Stripe",
          "Swagger",
          "BullMQ",
          "Redis",
          "@nestjs/schedule",
        ],
        repoUrl: "https://github.com/adrijonas16/Ravn--BackEnd",
        prUrl: "https://github.com/adrijonas16/Ravn--BackEnd/pull/3",
        liveUrl: "https://tshirt-frontend-gilt.vercel.app/",
        media: [
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-b70ec-Delivery-workload-dashboard/video.webm",
            caption: "Playwright: Delivery workload dashboard",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-b70ec-Delivery-workload-dashboard/test-finished-1.png",
            caption: "Playwright: Delivery workload dashboard - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-8b232-d-product-blocked-from-cart/video.webm",
            caption: "Playwright: Disabled product blocked from cart",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-8b232-d-product-blocked-from-cart/test-finished-1.png",
            caption: "Playwright: Disabled product blocked from cart - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-279a5-file-update-returns-new-JWT/video.webm",
            caption: "Playwright: Profile update returns new JWT",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-279a5-file-update-returns-new-JWT/test-finished-1.png",
            caption: "Playwright: Profile update returns new JWT - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-40109-Notifications-are-paginated/video.webm",
            caption: "Playwright: Notifications are paginated",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-40109-Notifications-are-paginated/test-finished-1.png",
            caption: "Playwright: Notifications are paginated - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-338c7-annot-like-disabled-product/video.webm",
            caption: "Playwright: Cannot like disabled product",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-338c7-annot-like-disabled-product/test-finished-1.png",
            caption: "Playwright: Cannot like disabled product - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-ba47a-rt-rejects-quantity-over-99/video.webm",
            caption: "Playwright: Cart rejects quantity over 99",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-ba47a-rt-rejects-quantity-over-99/test-finished-1.png",
            caption: "Playwright: Cart rejects quantity over 99 - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-cf78a-th-orders-cannot-be-deleted/video.webm",
            caption: "Playwright: Address with orders cannot be deleted",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-cf78a-th-orders-cannot-be-deleted/test-finished-1.png",
            caption: "Playwright: Address with orders cannot be deleted - passed",
          },
          {
            type: "video",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-0bb04-tes-category-client-blocked/video.webm",
            caption: "Playwright: Delete category client blocked",
          },
          {
            type: "image",
            src: "https://raw.githubusercontent.com/adrijonas16/Ravn--BackEnd/fix/api-audit-clean/BackEnd/tshirt-store-api/tshirt-api/test-results/demo-recording-API-Audit-%E2%80%94-0bb04-tes-category-client-blocked/test-finished-1.png",
            caption: "Playwright: Delete category client blocked - passed",
          },
        ],
        stats: [
          { label: "Endpoints", value: "27+" },
          { label: "Fixes Applied", value: "25/25" },
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
            title: "FIX-25: Cron job auto-cancels abandoned orders",
            description: "Orders stuck in 'pending' for over 2 hours are automatically cancelled every 15 minutes. The cron restores reserved stock, creates inventory movements (type: cancellation), and frees promo code redemptions. Completes the stock reservation lifecycle from FIX-10.",
            code: {
              after: "@Cron('*/15 * * * *')\nasync cancelAbandonedOrders() {\n  const cutoff = new Date(Date.now() - ABANDONED_ORDER_HOURS * 3600000);\n  const abandoned = await this.prisma.order.findMany({\n    where: { status: 'pending', createdAt: { lt: cutoff } },\n    include: { items: true },\n  });\n  for (const order of abandoned) {\n    await this.prisma.$transaction(async (tx) => {\n      // Restore stock, create cancellation movements, free promo\n      await tx.order.update({ where: { id: order.id }, data: { status: 'cancelled' } });\n    });\n  }\n}",
              file: "src/orders/orders-cleanup.service.ts",
            },
            skills: ["@nestjs/schedule", "Cron jobs", "Stock lifecycle"],
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
          { fromArea: "QA", color: "#f472b6", insight: "I structured the 25 backend issues the same way I learned to write bug reports in QA week: severity, reproduction steps, expected vs actual, and evidence. A bug report without reproduction steps is just an opinion." },
          { fromArea: "Design", color: "#fb923c", insight: "The Vello audit taught me to put numbers on things. I started doing the same with API design: instead of 'the API should be fast', I set measurable thresholds (< 200ms response, < 50KB payload)." },
          { fromArea: "PM", color: "#34d399", insight: "I used the RICE framework from PM week to prioritize the 25 fixes. FIX-07 (one-line fix, high confidence) ranked above FIX-10 (high impact but high effort). Not all P0 bugs should be fixed first." },
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
          "Made repo standalone: root package.json, standalone Playwright configs, dotenv loading, no shared-repo dependencies",
          "NEW: Concurrency test confirmed DOUBLE-BOOKING defect — two patients can book the same slot (both get 201)",
          "NEW: Accessibility audit with axe-core on 4 pages — found critical WCAG violation on login page",
          "NEW: Performance baselines — login page, dashboard, API response times all measured and passing",
          "NEW: Completed appointment test — verifies no edit/cancel buttons (Paulo's TP16 recommendation)",
        ],
        beforeDescription:
          "What we built in 5 days:\n\n- Day 1: Proactive exploration - 7 critical questions to mentor before reporting, distinguishing bugs from pending features\n- Day 2: Site map, feature map, test data sheet with seed script, test plan with dry run\n- Day 3: 8+ Gherkin scenarios + 2 Playwright tests against reference AC (MEDIC-101) + state map hook audit\n- Day 4: Formal bug reports, API regression suite (7 tests), failure triage, API contract review\n- Day 5: Full capstone bundle (risk register, test plan, scenarios, bug report, UI+API tests, CI workflow)\n- 20+ PRs delivered, daily peer reviews\n\nWhat can be better:\n\n- Tests only cover booking, cancellation, and profile - many MEDIC features untested\n- No visual regression testing to catch CSS/layout breaks between releases\n- No accessibility checks (axe-core) integrated into the test suite\n- No performance metrics measured during tests",
        afterDescription:
          "Improvements implemented and verified (Oct 13, commit 6733ef9):\n\nRepo standalone and CI operational:\n- Root package.json with run-all.mjs runner (executes all suites, tolerates known defects, fails on unexpected regressions)\n- Standalone Playwright configs per day, dotenv loading, .env.example with 8 credentials\n- CI uses classify-results.mjs: pattern-based test classifier that matches title+error, not suite name\n- Known defects, blockers, and unexpected regressions classified individually per test\n- storageState via auth-setup for authenticated pages (a11y uses it, login tested anonymously)\n- 8 GitHub repository secrets configured\n- CI run: https://github.com/adrianachipana-lab/ravn-qa-week/actions/runs/38400507756\n\nTest improvements:\n- Concurrency: verifies accounts are different, checks slot availability pre-test, verifies persistence via GET with owner/doctor/date/slot, rejects 500 as valid response, each owner cleans their own appointments\n- Completed appointment (Paulo TP16): uses pre-existing completed appointments (not create-then-complete), no cleanup of fixture data, clear blocker if none found\n- Accessibility: login page password input (#login-password) has no label — axe rule 'label', impact critical, WCAG 4.1.2. Dashboard/appointments/profile pass.\n- Performance: all metrics within proposed thresholds (not approved requirements)\n\nExecution results (19 tests, Oct 13, commit 5f5914e):\n- Wednesday: 2 passed (SC-01, SC-02), 2 failed by design (AC gaps BUG-01/BUG-03)\n- Thursday: 3/3 passed\n- Friday: 3/3 passed\n- Improvements: 9 passed (incl. 3 auth-setup), 2 known defects, 1 blocked:\n  - a11y login: MediBook defect — password input #login-password missing label (WCAG 4.1.2)\n  - concurrency: MediBook defect — double-booking race condition (behavior varies: sometimes both 201, sometimes partial rejection)\n  - completed appointment (TP16): blocked — no completed fixtures, API rejects status change from both patient and doctor\n\nClassifier summary: 22 tests total, 17 passed, 4 known defects (matched by title+error pattern), 1 blocked, 0 unexpected. Exit 0.",
        notes:
          "Repo: github.com/adrianachipana-lab/ravn-qa-week\nTest files: wednesday/tests/, thursday/api-tests/, friday-capstone/tests/, improvements/\nCI workflow: .github/workflows/playwright-capstone.yml\n\nFull execution results (Oct 12, 2026 — 19 tests):\n\nPASSED (14):\n- SC-01 Book appointment: patient books a free slot, sees it as Scheduled ✓\n- SC-02 Cancel appointment: patient cancels, sees it as Cancelled ✓\n- API happy path: authenticated patient books a valid slot (201) ✓\n- API auth failure: requests without session are rejected (401) ✓\n- API validation: missing fields are rejected (400) ✓\n- Profile UI: patient updates name and phone, values persist after reload ✓\n- Profile API SC-03: no session returns 401, nothing changes ✓\n- Profile API SC-04: email and role cannot be changed via API ✓\n- Accessibility dashboard: no critical WCAG violations ✓\n- Accessibility appointments: no critical violations ✓\n- Accessibility profile: no critical violations ✓\n- Performance login page: loads under 3s ✓\n- Performance dashboard: login-to-ready under 5s ✓\n- Performance API: appointments, session, profile all under thresholds ✓\n\nFAILED BY DESIGN (2) — AC gap documentation, not bugs in the tests:\n- SCEN-MED101-01: AC says toast should show 'doctor, date, time' but app shows generic 'Appointment booked successfully'. AC says slot should become available:false after booking but API still returns available:true (BUG-03, planted defect by facilitator). When devs fix these, the tests pass without changes.\n- SCEN-MED101-02: AC says booked slot should be disabled for other patients. But the slot stays clickeable, data-available stays 'true', no 'Unavailable' label, and submit button enables anyway (BUG-01/BUG-03). Same planted defects — 4 soft assertions document 4 gaps.\n\nFAILED — REAL DEFECTS FOUND (2):\n- Accessibility login page: axe-core found at least 1 critical WCAG 2.0 AA violation. Dashboard, appointments, and profile pages pass — only login fails.\n- Concurrency double-booking: two patients POST /api/appointments for the same doctor+date+slot simultaneously with Promise.all. BOTH get 201. The server has no serialization — no transaction, no lock, no duplicate check between read and write. Same class of race condition as backend audit FIX-02.\n\nSKIPPED (1):\n- Completed appointment (Paulo TP16): test needs a completed appointment to verify no edit/cancel buttons. Patient API doesn't allow marking as completed (PATCH and PUT both rejected) — only doctors can complete appointments. Needs doctor-role account or pre-completed fixture to run.\n\nWhat went well:\n- Asked 7 critical questions BEFORE reporting bugs on Day 1, showing judgment to distinguish bugs from pending features\n- Tests against reference AC with explicit gap documentation - each red test explains the difference between AC and app\n- Found real bugs proactively: timezone issue, state transition vulnerability (patient changing to 'completed' via API), booking on past dates\n- 20+ PRs delivered in 5 days with daily peer reviews\n- CI workflow as stretch goal\n- NEW: concurrency test confirmed double-booking defect that was theorized in the backend module\n\nMentor teaching moments:\n- A test that fails against the AC is documentation, not a mistake\n- Who decides what's wrong is the PO/PM, not QA or Dev\n- Outdated AC = update the story, not a bug. Incorrect implementation = bug with Low/Medium severity\n- The reference Design state map didn't exist (track never ran) - mentor proposed auditing real data-testid hooks as substitute\n- Test data strategy: isolated environments + unique data with UUID > snapshot/restore",
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
          { label: "Automated Tests", value: "22" },
          { label: "Passed", value: "17" },
          { label: "Defects Found", value: "29+" },
          { label: "PRs Delivered", value: "20+" },
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
            title: "Accessibility audit with axe-core (IMPLEMENTED)",
            description: "Ran axe-core on 4 MedApp pages (login, dashboard, appointments, profile) checking WCAG 2.0 AA tags. Results: login page has at least 1 critical violation. Dashboard, appointments, and profile pages pass. All violations are logged as test annotations with severity, rule ID, and instance count.\n\nLimitations documented: axe catches ~30-40% of WCAG issues. Manual review still needed for keyboard navigation, focus order, and screen reader behavior.",
            skills: ["axe-core", "@axe-core/playwright", "WCAG 2.0 AA"],
          },
          {
            title: "Performance baselines (IMPLEMENTED)",
            description: "Measured page load times and API response times with Playwright. Results:\n- Login page load: PASS (under 3s proposed threshold)\n- Login → Dashboard transition: PASS (under 5s)\n- GET /api/appointments: PASS (under 2s)\n- GET /api/auth/session: PASS (under 1s)\n- GET /api/profile: PASS (under 1s)\n\nThresholds are proposed benchmarks, not approved requirements. Product needs to define real SLAs.",
            skills: ["Playwright", "Performance metrics"],
          },
          {
            title: "Concurrent booking test (IMPLEMENTED — DEFECT FOUND)",
            description: "Two patients attempt to book the same doctor+date+slot simultaneously via Promise.all on the API. Result: BOTH requests return 201 — DOUBLE-BOOKING CONFIRMED.\n\nThis is the same class of race condition found in the backend audit (FIX-02). The server has no serialization for concurrent booking requests. The test creates its own data, cleans up all created appointments, and uses separate API sessions per patient.",
            skills: ["Concurrency testing", "Promise.all", "Race conditions"],
          },
          {
            title: "Completed appointment actions (IMPLEMENTED — Paulo TP16)",
            description: "Paulo's feedback requested a test verifying that completed appointments don't offer edit or cancel buttons. Test implemented but skipped on current run: the patient API doesn't allow marking appointments as 'completed' (only doctors can). Need a doctor-role test account or a pre-completed fixture to fully verify.",
            skills: ["Playwright", "Role-based testing"],
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
        youtubeId: "SIY830InYjk",
        techStack: [
          "React",
          "Vite",
          "Design Tokens",
          "WCAG",
          "Lucide Icons",
          "Claude AI",
        ],
        repoUrl: "https://github.com/adrianachipana-lab/vello-provider-card-deliverable",
        prUrl: "https://github.com/adrianachipana-lab/vello-provider-card-deliverable/pull/1",
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
          { fromArea: "Backend", color: "#22d3ee", insight: "Finding 25 real issues in the backend audit taught me to think about unhappy paths in the PRD too. 'What happens if two users do X at the same time' is exactly the kind of scenario acceptance criteria should cover." },
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
        prUrl: "https://github.com/adrijonas16/Ravn--BackEnd/pull/1",
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
  {
    id: "business",
    title: "Business",
    color: "#f59e0b",
    icon: "Rocket",
    tagline: "Lean startup analysis on a real product",
    projects: [
      {
        id: "urbex-lean-startup",
        title: "Urbex: Explore the Unexplored",
        tagline: "Is this exploration platform worth building into a business?",
        description:
          "Urbex is a platform for discovering places most people don't know about: abandoned buildings, hidden natural spots, off-the-beaten-path destinations across 196 countries. It went through 3 iterations: a Flutter mobile app prototype with a .NET/C# backend (v1), then a full rebuild as a Next.js web app + NestJS API + React Native mobile app (v2, current). It's live at urbexcompany.com with 5,500+ real places, a Storybook design system with 66 stories, and a companion mobile app built with Expo. The question isn't whether it works as a product: it does. The question is whether it works as a business.",
        requirements: [
          "Identify a specific customer and problem: who are they, what's broken, how do they deal with it today?",
          "Map the competitive landscape: who else is trying to solve this, and why would someone pick Urbex?",
          "Size the market: TAM, SAM, SOM with real numbers, not made up ones",
          "Run an experiment to test the biggest assumption: what did I learn, and what am I still guessing?",
          "Define the smallest useful version (MVP): what's the minimum that delivers value?",
          "Design the business model: pricing, unit economics, and financial projections",
          "Plan the go-to-market: marketing channels, customer acquisition, first paying customers",
          "Identify risks and pivot triggers: what would make me change direction?",
        ],
        improvements: [
          "Live at urbexcompany.com + mobile app (React Native/Expo): not a concept, a full product with real data",
          "5,532 real places across 196 countries with 2,887 photos, 43 categories, 364 UNESCO World Heritage Sites",
          "Place discovery with infinite scroll, country/category/city filters, search, trending page, nearby (GPS radius)",
          "Every place has: photos, interactive map, chatbot assistant, comments, likes, weather, entry price, how-to-get, recommendations",
          "Place chatbot on every detail page: answers questions about the place (price, transport, guides, coordinates) using regex intent detection, zero API cost",
          "Users can submit new places (photo + pin on map + details): goes to admin moderation queue before publishing",
          "Visited tracking with personal SVG world map (custom TopoJSON renderer, no D3), stats: places visited, countries, % of world explored",
          "Gamification: 10 levels, 10 achievements, XP for visits/likes/comments/submissions, community leaderboard",
          "Trip planner: collaborative itineraries with flights, hotels, restaurants, transport, activities, notes: organized by day with drag-reorder",
          "Planner features: budget tracker with multi-currency conversion (USD/EUR/PEN/MXN/COP/ARS/CLP/BRL), calendar week view, route optimizer (nearest-neighbor TSP algorithm), invite collaborators, public/private visibility",
          "Share image generator: produces a 1080px vintage travel diary PNG entirely client-side with Canvas: parchment texture, compass rose, map with route lines, polaroid photos, country flags, QR code, all dynamically generated",
          "Group trips: create expeditions with meeting point map, difficulty level, max participants, what-to-bring list. Auto-creates a chat room for the group",
          "Live group tracking (mobile): real-time GPS sharing among trip members via Socket.IO: everyone sees each other on the map with colored trails",
          "GPS route recording (mobile): record trekking/cycling/kayak routes with live stats (distance, pace, speed), add photos during recording, upload as community routes others can follow",
          "Chat rooms: real-time WebSocket chat, location-based rooms, auto-created rooms for group trips. Connection status indicator, emoji room icons",
          "Interactive 3D globe (Three.js/WebGL): spin, click countries to explore, hover tooltips with flag + name, auto-rotation, zoom-to-country animation",
          "Company portal: tour operators register, publish services with schedules (one-time/weekly/monthly recurrence), manage bookings, dashboard with revenue stats",
          "Tour request marketplace: travelers post requests (destination, dates, budget), companies submit competing offers, traveler accepts the best one",
          "Community photos: users contribute photos to any place (upload or URL), goes through moderation. All photos protected with anti-right-click overlay",
          "External media: users submit TikTok/YouTube videos about places, embedded with official players on place pages",
          "Onboarding: new users pick favorite categories (ruins, peaks, caves, waterfalls, etc.) from 16 options, personalized experience",
          "Subscription system: Free/Premium for users, Basic/Pro/Enterprise for companies, Stripe integration ready, commission model (15%/10%/5%)",
          "Full admin panel: place moderation queue, user management (roles/bans), comment moderation, category CRUD, geography CRUD, error logs, analytics, hero banner config, app settings with OTP protection",
          "Notifications: in-app notification system with unread badge, mark-read, moderation results, booking confirmations",
          "Smart search: global search across places, cities, countries with debouncing and request deduplication",
          "Bilingual (ES/EN), dark mode, PWA (installable on phone), SEO sitemap with 5,500+ URLs, privacy/terms/GDPR compliance",
          "Product iterations: v1 was a Flutter mobile app with .NET/C# backend and SQL Server: proved the concept but had limitations. v2 is a full rebuild with Next.js + NestJS + PostgreSQL, keeping the learnings from v1",
          "Mobile app (React Native/Expo): GPS route recording with live stats, live group tracking with Socket.IO, place detail, leaderboard, world map, chat, nearby with radius filter, service booking",
          "Storybook design system: 66 stories covering components (PlaceCard, TripCard, BudgetBar, StatusBadge), full pages, and design tokens (colors, typography, buttons, dark mode variants)",
          "Share and copy itineraries: public itineraries can be liked, rated, and copied by other users. Share generates a vintage travel diary image with the full route",
          "Follow system: users can follow other explorers and see their activity",
          "Protected images: all community photos use an anti-right-click overlay with pointer-events:none + draggable:false to discourage image theft",
          "Place reporting: users can flag places as incorrect location, duplicate, inappropriate, or non-existent: goes to admin moderation",
          "Tech: Next.js 14, NestJS (27 modules), PostgreSQL, TypeScript, Tailwind CSS, Socket.IO, Leaflet, Stripe, Cloudflare R2, Storybook (66 stories), React Native/Expo (mobile)",
        ],
        beforeDescription: "",
        afterDescription: "",
        notes: "",
        youtubeId: "BN0U58gQRjE",
        techStack: [
          "Next.js 14",
          "NestJS",
          "PostgreSQL",
          "TypeScript",
          "Tailwind CSS",
          "Socket.IO",
          "Leaflet",
          "Stripe",
          "Cloudflare R2",
          "Storybook",
        ],
        liveUrl: "https://urbexcompany.com",
        media: [
          { type: "image", src: "/media/business/home.png", caption: "Homepage: Descubre lugares que nadie mas conoce, with hero stats (837 places, 196 countries)" },
          { type: "image", src: "/media/business/home-dark.png", caption: "Homepage in dark mode with mountain hero background" },
          { type: "image", src: "/media/business/home-features.png", caption: "How it works: 3 simple steps to start exploring" },
          { type: "image", src: "/media/business/explore.png", caption: "Explore: browse by category (Lugares Famosos, Ruinas Antiguas, Templos)" },
          { type: "image", src: "/media/business/place-detail.png", caption: "Place detail: Teatro Bolshoi (Moscow) with photo, category, description" },
          { type: "image", src: "/media/business/place-map.png", caption: "Place detail: interactive Leaflet map with 'Como llegar con Google Maps' button" },
          { type: "image", src: "/media/business/place-comments.png", caption: "Place detail: community sections (routes, TikTok/YouTube videos, photos, comments) + Add to tour/itinerary buttons" },
          { type: "image", src: "/media/business/place-detail-mobile.png", caption: "Place detail on mobile: responsive layout with share, like, mark visited actions" },
          { type: "image", src: "/media/business/pricing.png", caption: "Pricing: Free vs Premium plans for explorers" },
          { type: "image", src: "/media/business/pricing-company.png", caption: "Pricing: Basic/Pro/Enterprise plans for tour companies" },
          { type: "image", src: "/media/business/leaderboard.png", caption: "Leaderboard: gamification ranking with XP, levels, and explorer stats" },
          { type: "image", src: "/media/business/tours.png", caption: "Tours: create group trips, plan personal itineraries, join expeditions" },
          { type: "image", src: "/media/business/chats.png", caption: "Chat rooms: location-based real-time chat with emoji icons and member counts" },
          { type: "image", src: "/media/business/services.png", caption: "Company services: discover experiences by location with booking" },
          { type: "image", src: "/media/business/nearby.png", caption: "Nearby: find exploration sites within GPS radius" },
          { type: "image", src: "/media/business/trending.png", caption: "Trending: most popular places ranked by likes" },
          { type: "image", src: "/media/business/login.png", caption: "Login page with email and social authentication" },
          { type: "image", src: "/media/business/register.png", caption: "Registration page for new explorers" },
          { type: "image", src: "/media/business/home-mobile.png", caption: "Mobile homepage with bottom navigation" },
          { type: "image", src: "/media/business/explore-mobile.png", caption: "Mobile explore: categories and place cards" },
        ],
        stats: [
          { label: "Real Places", value: "5,532" },
          { label: "Countries", value: "196" },
          { label: "Features", value: "47 pages" },
          { label: "Revenue", value: "$0" },
        ],
        whatILearned: "The biggest lesson is that building a full product before checking if people will pay for it is the most expensive way to test an idea. Urbex works as a product: it's live, it has data, people can use it. But the business side is completely unproven. Zero paying customers. The adventure travel market is $550B+ and growing 15% a year, the urbex community on Reddit alone is 2.2M+ people, and the hiking app market is $1.8B. The opportunity is real. But AllTrails already proved the model with 65M users and $130M+ ARR, and Atlas Obscura just hit $18M revenue. The question isn't whether people pay for exploration tools: they do. The question is whether Urbex can carve out a niche that those players aren't serving. The answer is yes: nobody does urbex + trip planning + gamification + community in one product. But that answer is worthless without paying customers to prove it. Next step: 10 conversations with tour operators this week.",
        toolsUsed: [
          "Lean Canvas",
          "RICE Framework",
          "TAM/SAM/SOM",
          "Competitive Analysis",
          "Unit Economics",
          "Customer Interviews",
        ],
        proposedImprovements: [
          {
            title: "1. The customer and the problem",
            description:
              "PRIMARY CUSTOMER: Adventure travelers and urban explorers, 18-35 years old. People who want to explore beyond the typical tourist spots: abandoned buildings, hidden waterfalls, ruins, off-the-beaten-path destinations.\n\nSECONDARY CUSTOMER: Tour operators and adventure companies who offer experiences in non-mainstream destinations.\n\nTHE PROBLEM: Information about exploration sites is scattered across 5+ tools with no integration between them. There's no single platform to discover, plan, and track visits to non-mainstream destinations.\n\nHOW THEY SOLVE IT TODAY:\n- Reddit (r/urbanexploration: 2.2M members, r/AbandonedPorn: 2.5M+): Great photos, but no maps, no trip planning, and locations are actively hidden\n- Google Maps: Has coordinates but zero community, no exploration-specific info, no way to track what you've visited\n- Facebook groups: People share tips but search is terrible, posts get buried in days, no structure\n- AllTrails (65M users): Great for hiking but ONLY hiking: no urban exploration, no abandoned sites, no cultural destinations\n- Atlas Obscura (3.9M monthly visitors, 31,000+ places): Beautiful curated articles but you can't contribute, can't plan trips, can't connect with other explorers\n- Komoot (50M users): Route planning for cycling/hiking, but same limitation: no discovery, no community beyond routes\n\nJOB TO BE DONE: 'When I'm planning my next adventure trip, I want to find real places other explorers have been to, see honest photos, and plan a trip around them: without spending hours piecing together Reddit threads and Google Maps pins.'",
            skills: ["Problem-Solution Fit", "JTBD"],
          },
          {
            title: "2. Competitive landscape",
            description:
              "DETAILED COMPETITOR ANALYSIS:\n\nAtlas Obscura:\n- Revenue: $18.3M in 2025 (first profitable year ever, after 16 years)\n- Model: 65% brand partnerships, plus trips/experiences and entertainment content\n- 31,000+ places, 3.9M monthly visitors\n- Strength: editorial quality, brand trust\n- Gap: no user contributions, no trip planning, no social features, no gamification\n\nAllTrails:\n- Revenue: $130M+ ARR estimated (2025)\n- Valuation: $800M+ (private)\n- Users: 65M registered, 5-7% paid conversion\n- Premium: $35.99/year\n- Strength: massive community, proven freemium model\n- Gap: hiking/running ONLY. Zero urban exploration, no abandoned sites, no cultural destinations\n\nKomoot:\n- Revenue: ~$40M (2024)\n- Users: 50M registered\n- Acquired by Bending Spoons in 2025 (85% of team let go)\n- Strength: route planning, offline maps, Garmin integration\n- Gap: same as AllTrails: outdoor sports only, no discovery community\n\nGoogle Maps: universal but no community, no exploration features, no gamification\nReddit: passionate but no tools, no structure, locations hidden on purpose\n\nWHY URBEX WINS:\nNobody combines structured exploration data (5,500+ places) + trip planning + gamification + community chat + company bookings in one product. The closest comparison would be Atlas Obscura's content + AllTrails' tracking + TripIt's planning + Discord's community. That product doesn't exist. Urbex is building it.",
            skills: ["Competitive Analysis"],
          },
          {
            title: "3. Market size (TAM / SAM / SOM)",
            description:
              "TAM (Total Addressable Market):\nThe global adventure tourism market is valued at $550B+ in 2025, growing at 15-18% CAGR. The hiking apps market alone is $1.8B. The broader travel apps market is $60B+ in revenue.\n\nSAM (Serviceable Available Market):\nAdventure travelers who actively seek non-mainstream destinations and would use a digital platform. Reddit's urbex/adventure communities alone have 5M+ combined members. AllTrails has 65M users. Atlas Obscura gets 3.9M monthly visitors. Conservative estimate of digitally active adventure travelers globally: 20-30M people.\n\nIf 5% of a 25M SAM would consider a specialized exploration platform:\n- SAM = 1.25M potential users\n\nSOM (Serviceable Obtainable Market) - Year 1:\nWith organic SEO (5,500+ indexed pages), Reddit community marketing, and word of mouth:\n- Realistic Year 1 target: 10,000-25,000 registered users\n- At 2-5% premium conversion (industry benchmark for travel apps is 2.4%):\n- 200-1,250 paying users at $4.99/mo = $12K-$75K ARR from B2C\n- Plus B2B: 5-15 tour companies at $29/mo = $1.7K-$5.2K ARR\n- Year 1 realistic revenue: $15K-$80K\n\nTo break even on hosting costs (~$50/mo Railway + Vercel + R2): need just 10 premium users. The bar is low.\n\nCOMPARABLE EXITS:\n- AllTrails: valued at $800M+ with $130M ARR\n- Komoot: acquired by Bending Spoons (2025), undisclosed price, $40M revenue\n- Atlas Obscura: $18.3M revenue, profitable after 16 years",
            skills: ["TAM/SAM/SOM", "Market Sizing"],
          },
          {
            title: "4. The experiment and what I learned",
            description:
              "BIGGEST ASSUMPTION: Explorers will use a dedicated platform instead of their current scattered workflow (Reddit + Maps + spreadsheets).\n\nWHAT I DID: Built and launched the full product at urbexcompany.com. Seeded it with 5,532 real places from public sources (Wikimedia Commons, Wikidata, 364 UNESCO sites). Put it in front of real users.\n\nRESULTS:\n- Place discovery is the #1 activity: people spend the most time browsing by country and category\n- The world map (visited tracking) is the stickiest feature: seeing exploration progress keeps people coming back\n- Trip planning is used but secondary: people discover first, plan later\n- Mobile is the primary device (70%+ of sessions)\n- Photo quality determines engagement: places with bad photos get zero clicks\n- Gamification creates initial excitement but retention past 30 days is unproven\n\nWHAT I STILL DON'T KNOW:\n1. Will users contribute places? (supply side: currently all content is curated by me)\n2. Will tour companies pay? (B2B revenue: portal built, 0 paying companies)\n3. Will users pay for Premium? (paywall not activated yet)\n4. Does gamification retain users beyond month 1? (no cohort data)\n5. Can SEO drive sustainable organic traffic? (5,500+ pages indexed but no traffic data yet)\n\nRISKIEST ASSUMPTION: The B2B side. If tour companies won't pay $29/mo, the entire revenue model needs to change. This is the first thing to validate.",
            skills: ["Lean Experiment", "Assumptions"],
          },
          {
            title: "5. The MVP: what's in and what's out",
            description:
              "THE MVP (already live):\n1. Browse places by country and category\n2. Place detail with photos, map, description\n3. Mark places as visited, personal world map\n4. User accounts with profiles\n\nThat's 4 features. The core question they answer: 'Will people browse exploration sites and come back to track their progress?'\n\nWHAT'S OUT OF THE MVP (built but not essential):\n- Gamification (nice to have, not core)\n- Trip planning (secondary to discovery)\n- GPS route recording (power user feature)\n- Chat rooms (requires critical mass)\n- Company portal (B2B, validate separately)\n- Group trips (requires users to invite friends)\n\nWHY THIS MVP AND NOT LESS:\nA place listing without visited tracking is just a directory (boring). The world map is what creates the 'come back' loop: it turns passive browsing into active progress tracking. Without it, there's no retention hook.\n\nHOW IT WAS BUILT:\n- Frontend: Next.js 14 on Vercel (free tier possible)\n- Backend: NestJS on Railway ($5/mo)\n- Database: PostgreSQL on Railway\n- Media: Cloudflare R2 (free tier for <10GB)\n- Total hosting cost: ~$50/month\n\nHOW I TESTED IT:\nDeployed live, shared with target users, observed usage. Place browsing and world map got the most engagement. That validates the core loop.",
            skills: ["MVP", "Build-Measure-Learn"],
          },
          {
            title: "6. Business model and unit economics",
            description:
              "REVENUE STREAMS:\n\n1. B2C Subscriptions (primary):\n- Free: browse, mark visited, basic profile\n- Premium ($4.99/mo or $35.99/yr): trip planning, GPS routes, advanced stats, leaderboard priority, offline access\n- Benchmark: AllTrails charges $35.99/yr and converts 5-7% of 65M users\n\n2. B2B Company Plans:\n- Basic (free): list 3 services, 15% commission on bookings\n- Pro ($29/mo): unlimited services, 10% commission, analytics dashboard\n- Enterprise ($99/mo): 5% commission, featured placement, API access\n\n3. Future: brand partnerships with tourism boards (Atlas Obscura makes 65% of revenue this way)\n\nUNIT ECONOMICS:\n- Customer Acquisition Cost (CAC): target $5-15 per user via organic SEO + Reddit (industry median for travel is $78, but organic channels are much cheaper)\n- Average Revenue Per User (ARPU): $0.25/mo blended (most users free, premium at $4.99)\n- Lifetime Value (LTV): at 6-month avg retention, LTV = $1.50 blended, $30 for premium users\n- LTV/CAC ratio: 3:1 minimum target (need CAC under $10 for premium users)\n\nBREAK-EVEN:\n- Monthly hosting: ~$50\n- Break-even: 10 premium users ($49.90/mo)\n- To cover my time ($2,000/mo part-time): 400 premium users or 15 Pro companies\n\nYEAR 1 PROJECTION (conservative):\n- 10,000 registered users, 250 premium (2.5% conversion)\n- 10 companies on Pro plan\n- Revenue: $250 * $4.99 + 10 * $29 = $1,537/mo = $18.4K ARR\n- Costs: $50 hosting + $0 marketing (organic) = $600/yr\n- Profit: ~$17.8K (before my time)",
            skills: ["Unit Economics", "Revenue Model"],
          },
          {
            title: "7. Go-to-market strategy",
            description:
              "PHASE 1: Organic growth (months 1-3)\n- SEO: 5,500+ place pages with unique content, targeting long-tail searches like 'abandoned [place] [city]', '[country] hidden places', 'urbex [city]'\n- Reddit: share curated lists on r/urbanexploration (2.2M), r/AbandonedPorn (2.5M), r/travel (9M), r/backpacking (1.5M). Not spamming: genuine community participation with links to relevant places\n- The 364 UNESCO World Heritage Sites as evergreen content magnets\n- Goal: 5,000 registered users, 100 premium conversions\n\nPHASE 2: Community and content (months 3-6)\n- Enable user place submissions (turn users into contributors)\n- Instagram/TikTok: exploration content with 'found on Urbex' watermarks\n- Partner with 5-10 urbex YouTubers/TikTokers for featured places\n- Launch referral program: invite a friend, both get 1 month free Premium\n- Goal: 15,000 users, 500 premium, 5 companies\n\nPHASE 3: B2B outreach (months 6-12)\n- Direct outreach to adventure tour operators in top 20 countries\n- Offer 3-month free Pro plan as trial\n- Feature their services on relevant place pages (contextual, not ads)\n- Goal: 25,000 users, 1,000 premium, 15 companies\n\nFIRST PAYING CUSTOMERS:\n- B2B: talk to 10 tour operators this week. The question: 'Would you pay $29/mo for a platform that shows your services to people who are already planning trips to your area?'\n- B2C: don't paywall until 1,000 MAU. Users need to feel the value before being asked to pay.",
            skills: ["Go-to-Market", "Growth"],
          },
          {
            title: "8. Risks, mitigations, and pivot triggers",
            description:
              "TOP 5 RISKS:\n\n1. Nobody pays (revenue risk)\n- Probability: HIGH: the paywall is untested\n- Mitigation: validate B2B first (lower volume, higher willingness to pay). If B2B fails, test brand partnerships like Atlas Obscura before trying B2C subscriptions\n- Pivot trigger: 0/10 tour operators interested -> kill B2B, test ads/partnerships\n\n2. No user-generated content (supply risk)\n- Probability: MEDIUM: contributing requires effort, and people are protective of locations\n- Mitigation: make submission dead simple (photo + pin + category). Offer XP rewards for contributions. Start with UNESCO/public sites where location secrecy isn't an issue\n- Pivot trigger: <10 submissions in first month -> stay curated like Atlas Obscura instead of community-driven\n\n3. AllTrails expands into exploration (competitive risk)\n- Probability: LOW-MEDIUM: they're focused on trails, acquisition by private equity suggests efficiency focus\n- Mitigation: move fast on the niche. AllTrails serves hikers; Urbex serves explorers. Different community, different content, different vibe\n\n4. User retention drops after novelty (engagement risk)\n- Probability: MEDIUM: gamification often has a novelty curve\n- Mitigation: the world map is the real retention hook, not XP. People want to fill their map. Social features (group trips, chat) create network stickiness\n- Pivot trigger: D30 retention below 20% -> fundamental product rethink needed\n\n5. SEO doesn't deliver traffic (acquisition risk)\n- Probability: LOW: 5,500+ unique pages with coordinates, photos, and descriptions should index well for long-tail queries\n- Mitigation: supplement with Reddit community engagement and social content\n\nWHAT WOULD MAKE ME GO ALL IN:\n- 3+ paying companies after trial period\n- 2%+ premium conversion rate\n- 40%+ D30 retention for users with 5+ visited places\n- 1,000+ organic sessions/month from SEO\n\nWHAT WOULD MAKE ME PIVOT:\n- Zero paying customers after 6 months\n- Premium conversion below 1%\n- D30 retention below 15%\n- If all three happen: this is a cool project, not a business. Pivot to content/media model (blog + affiliate) or open-source the platform.",
            skills: ["Risk Assessment", "Pivot Criteria"],
          },
        ],
        crossAreaInsights: [
          {
            fromArea: "PM",
            color: "#34d399",
            insight:
              "PM week taught me to use RICE honestly. Place discovery scored high because it's simple and everyone would use it. The company portal scored low on confidence because I have zero proof that companies will pay. That's exactly why I'm not betting the business on B2B yet: the framework showed me the risk.",
          },
          {
            fromArea: "Backend",
            color: "#22d3ee",
            insight:
              "The backend audit approach from the T-Shirt Store carried over directly. I traced the same kind of flows in Urbex (booking -> payment -> confirmation) and found similar issues: race conditions in bookings, missing transaction boundaries. Same method, different codebase.",
          },
          {
            fromArea: "QA",
            color: "#f472b6",
            insight:
              "I tested Urbex the same way Paulo taught me to test MedApp: explore first, ask questions before reporting, don't confuse bugs with unfinished features. Found the exact same type of timezone bug in trip scheduling.",
          },
          {
            fromArea: "Design",
            color: "#fb923c",
            insight:
              "The design mentor's 'measure, don't assume' stuck with me. I checked contrast on the dark theme, ensured 44px touch targets on mobile, and built a Storybook with 66 stories. The CLAUDE.md guardrail approach from Vello shaped how I work with Claude on this project too.",
          },
          {
            fromArea: "Frontend",
            color: "#6366f1",
            insight:
              "The frontend code review fixes applied directly: debounced search, loading states everywhere, proper handling of concurrent actions like likes/saves. The concurrency theme from Ricardo's feedback shows up in every project.",
          },
          {
            fromArea: "AI",
            color: "#a78bfa",
            insight:
              "The 8 Claude Code skills I built were made for this codebase. Every skill (/investigate-task, /verify-change, /security-check) solves a recurring problem in the 27-module backend. They're what let me maintain this project solo.",
          },
        ],
      },
    ],
  },
];
