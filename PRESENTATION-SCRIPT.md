# Presentation Script - Nerdery Showcase

Use this as a guide for your calls with mentors. Each section is ~5-10 minutes.
Open the showcase (https://resumen-one.vercel.app) and walk through it as you talk.

---

## FRONTEND (for Ricardo and frontend mentor)

### Opening (30 sec)
"I want to walk you through what I built in the capstone and what I'd improve now that I've had time to reflect."

### What I built (2 min)
*Open Frontend > Task Management App*

"This is the Week 4 capstone - a Kanban board with React, TypeScript, and GraphQL. It has 5 columns, drag-and-drop, a responsive mobile layout, create/edit/delete modals with chip selectors, advanced filters, and a list view as an alternative layout. All 9 checkpoints from weeks 1-3 passed with 45/45 tests."

*Click Live demo to show it running*

### What I'd improve (3 min)
*Scroll to "How we'd improve it"*

"After your feedback Ricardo, I looked into GraphQL Codegen. Right now types are maintained manually and can drift from the schema. With Codegen, types and hooks are generated directly from the API schema - zero drift."

*Open the code snippet*

"I also noticed that Dashboard.tsx and MyTasks.tsx use 'const result' for every mutation. That's 'result' for create, update, and delete - you can't tell what it holds without reading the assignment. I'd rename them to 'createdTask', 'updatedTask', 'deleteConfirmation'."

"Other improvements: Playwright E2E tests against the live Vercel deploy, Zod for form validation instead of inline checks, and a Lighthouse accessibility audit."

### Cross-area learnings (1 min)
*Scroll to "Applying learnings from other areas"*

"The design module taught me to measure contrast instead of assuming it's fine. The QA module gave me the approach of testing against a live deploy. And the PM module's 'no orphan features' principle made me question every feature - does it help users manage tasks faster?"

### Week 1 Showcase (1 min)
*Go back, click Week 1 Showcase*

"This was the styling checkpoint. We got a Figma design and had to implement it with semantic HTML, BEM classes, CSS custom properties, and responsive breakpoints."

*Show the Figma vs Live comparison*

---

## BACKEND (for backend mentor)

### Opening (30 sec)
"I did a full audit of the T-Shirt Store API. I traced every data flow end to end - cart to order, order to payment, payment to webhook, cancellation. I checked transaction boundaries, race conditions, and what happens when things fail."

### The audit results (2 min)
*Open Backend > T-Shirt Store API*

"I found 24 issues total. All 24 are fixed. 100 tests passing, build clean, lint clean."

*Point to stats: 27+ endpoints, 24/24 fixes, 100 tests*

"The issues range from P0 Critical to P3 Low. Let me walk you through the most important ones."

### Key fixes with code (5 min)
*Scroll to "How we'd improve it" and expand each*

**FIX-02 - Race condition:**
"I traced the create() method and noticed the cart lookup happened outside the $transaction while the status change happened inside. That's a classic check-then-act race condition. Two concurrent requests could both find the cart as 'active' and create duplicate orders."

*Show the before/after code*

"I moved everything inside the transaction. The address validation stays outside because it's a read-only check - putting it inside would hold the lock longer for no benefit."

**FIX-07 - One-line fix:**
"This one was simple but dangerous. The cart only checked sku.isActive and product.deletedAt, but not product.status. A manager could disable a product and clients could still buy it. One line: sku.product.status !== 'active'."

*Show the code*

**FIX-08 - Per-user promo:**
"The promo validation only counted global redemptions. A user could use the same code on unlimited orders. I added a findFirst by promoCodeId + userId before applying."

**FIX-12 - Webhook idempotency:**
"The duplicate check used findUnique + create as separate operations. Two webhooks at the same millisecond could both pass the check. I replaced it with try/catch on create - if P2002 (unique constraint), it's a duplicate, return gracefully."

*Show before/after code*

**FIX-18 - Found by reviewing my own changes:**
"This is the one I'm most proud of catching. After FIX-10 moved stock decrements to order creation, I reviewed all code paths and found that createPaymentLink() creates orders directly without going through orders.service.create(). So direct purchases had NO stock decrement anywhere. My own fix introduced the bug."

### Naming conventions (1 min)
"Your feedback about variable names stuck with me. Instead of 'data' I now use 'orderData', instead of 'result' I use 'createdOrder'. The variable name should tell you what's inside without reading the assignment."

### Cross-area learnings (1 min)
"I structured the 24 issues the same way I learned to write bug reports in QA week - severity, reproduction steps, expected vs actual. I used the RICE framework from PM to prioritize which fixes to do first. And the design module's 'measure, don't assume' principle made me put measurable thresholds on everything."

---

## QA (for Paulo)

### Opening (30 sec)
"I want to show you the full QA week and what I learned from your feedback."

### What I delivered (2 min)
*Open QA > QA Medical Appointments App*

"20+ PRs in 5 days. Day 1 I asked 7 questions before reporting anything - distinguishing bugs from unimplemented features. Day 2 was documentation. Day 3 I tested against the reference AC and documented every gap. Day 4 was formal bug reports and API testing. Day 5 was the capstone."

*Show the Playwright videos*

"These are the actual Playwright tests running against MedApp. SC-01 books a free slot, SC-02 cancels an appointment. Both pass."

### Key learnings from your feedback (2 min)
"The most important thing you taught me: a test that fails against the AC is not a bad test - it's exactly how you document a gap. When SCEN-MED101-01 failed because the app said 'Appointment booked successfully' but the AC expected a message with date and doctor, that's a finding."

"You also taught me that who decides what's wrong is the PO/PM, not QA. When the AC says 'Save Profile' but the app says 'Save changes', I don't decide if it's a bug - I document the difference and ask Product."

### Evidence
*Scroll to Visual evidence, show bug screenshots*

"Bug: timezone shows Lima time instead of local. Bug: stale name in navbar after profile update. These are from the real app, captured with Playwright."

### Cross-area learnings (1 min)
"The backend race conditions I found are the same class of bug I'd test with Playwright - two browser contexts booking the same slot. The design module taught me to measure contrast ratios, which I'd add to QA with axe-core."

---

## DESIGN (for design mentor)

### Opening (30 sec)
"I want to show the NeighborCard journey - from the reference image with design issues, through Claude's first generation, to the corrected version."

### The reference and what was wrong (1 min)
*Open Design > Vello NeighborCard*
*Show the comparison: original reference vs corrected*

"The reference we received had the Available badge in coral/red - that fails WCAG at 4.10:1 for 12px text. It also said 'from $24' for a fixed price. The design needed an audit before we could build it."

### Live comparison (2 min)
*Show the Live comparison iframes*

"Left is the original Vello app with its design issues. Right is our corrected NeighborCard integrated into the app. You can interact with both - scroll, hover, click."

### How I guided Claude (3 min)
*Scroll to "How we'd improve it"*

"The first prompt was generic: 'Generate a NeighborCard using the design system tokens.' Claude generated a card with hardcoded hex colors, a div instead of a button, initials instead of photos, and MapPin instead of footprints."

*Show the prompt evolution*

"The second prompt was specific: 'Compare property by property. Don't accept looks similar - it has to be the exact token.' That found 7 of 11 properties with drift."

"For accessibility, 'check accessibility' was too vague. Claude 'verified' without measuring. The specific prompt listed every check: button vs div, 44px targets, aria-hidden on chevron, aria-label on stars. That found 5 real issues."

### The guardrail (2 min)
*Show the CLAUDE.md v1 vs v3 code comparison*

"I built a CLAUDE.md that evolved through 3 versions. v1 had rules but Claude used raw hex anyway. v2 added context - semantic token names. v3 added method - 5 mandatory steps, Definition of Done, measured contrast table. Each version was born from a concrete error."

"I loaded the full Vello design system, the prototype HTML, and the product brief into Claude's context before generating anything. That's what made the difference."

### Key principle (30 sec)
"Design is not just how it looks, but how it's measured. Every audit finding has a number - the focus ring is 1.52:1, the Available badge is 4.10:1, the CTA button is 4.77:1. Numbers turn opinions into facts."

---

## PRODUCT MANAGEMENT (for PM mentor)

### Opening (30 sec)
"I want to show the ReNest problem frame and how I prioritized the MVP."

### What I built (2 min)
*Open PM > ReNest*

"I took the problem 'buyers can't tell whether a used item is worth contacting the seller about' and went from framing to a go/no-go recommendation in 5 days."

"The persona is Laura, 28, who's been burned twice driving 25 minutes to see furniture that didn't match the listing. She now cross-checks Facebook Marketplace and sometimes just buys new at IKEA."

"The North Star is weekly qualified connections - buyer contacts seller AND gets a reply within 48 hours. It only moves when both sides of the marketplace get value."

### RICE and the MVP (2 min)
"I evaluated 7 features with RICE. The key: honest confidence scores. Price comparison has massive potential impact but only 35% confidence because we don't have sales data. That correctly sinks its score."

"The MVP is the 'trust trio': condition label, multi-angle photos, and flaw disclosure. Each attacks a different aspect of the same trust problem. Together they let Laura judge an item's real condition before reaching out."

### What I improved after feedback (2 min)
*Scroll to the After section*

"You caught that my requirements section had the response-time indicator instead of flaw disclosure - I swapped them so docs match the MVP."

"I added sensitivity analysis: what happens if multi-angle photos confidence drops to 60%? MVP still holds. What if flaw disclosure reach drops? Then we might swap it for response-time indicator."

"I defined guardrail metrics: listing completion can't drop more than 10%. That protects against adding too much friction for sellers."

### Key lesson (30 sec)
"A framework makes trade-offs visible - it doesn't make the decision. A RICE score with made-up numbers is a made-up decision wearing a spreadsheet."

---

## AI MODULE (for AI mentor)

### Opening (30 sec)
"I built 8 reusable Claude Code skills that automate recurring development tasks."

### The skills (2 min)
*Open IA > AI Module*

"Each skill covers a phase of development: /investigate-task and /env-check before coding, /db-check, /security-check, and /api-contract-check during coding, /verify-change, /test-coverage, and /docs-sync after coding."

### How they work (2 min)
*Show the code examples*

"Each skill has YAML frontmatter that pre-approves tools so Claude doesn't ask for permission. Dynamic context loads fresh data when the skill is invoked - git diff, prisma validate, test results."

"All 8 skills share reference.md so they know the project structure without duplicating information."

### Fresh-session evidence (1 min)
"/investigate-task ran 25 tool calls in 67 seconds with zero prior context. /verify-change ran 21 tool calls in 138 seconds. Both produced structured output without needing the conversation history."

### The real fix (1 min)
"The cart stock fix is the proof the skills work. /investigate-task found the root cause: formatCart() wasn't exposing the stock field. /verify-change confirmed 13/13 cart tests pass. Playwright verified the browser behavior - quantity buttons disabled at the stock limit."

### Mentor feedback applied (1 min)
"You caught that docs-sync used an arbitrary HEAD~3 baseline that fails silently. I replaced it with the task's actual merge-base SHA and made it report when the baseline is missing instead of returning empty results. Silent failures are worse than loud ones."

---

## CLOSING (for any mentor)

"Everything is on the showcase page - the live demos, screenshots, Playwright videos, code snippets, and the reasoning behind each decision. The videos for each area are coming next."

"The biggest thing I learned across all 6 areas: understand what you build. AI generates, you decide. The skill is not in getting Claude to produce output - it's in judging whether that output is right, and fixing it when it's not."
