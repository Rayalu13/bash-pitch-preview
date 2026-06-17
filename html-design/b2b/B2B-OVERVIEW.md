# Bash Manager — Positioning, Use Cases, and Features

## What Bash Manager is

Bash Manager is the venue operator's command surface. It replaces the **human ops person** who currently sits in a back office translating WhatsApp messages, paper posters, phone reservations, POS receipts, and guest-list spreadsheets into clicks across half a dozen disconnected tools.

It is not another SaaS dashboard. It is an **AI agent that runs the venue's operational layer**, with a single "brief" surface that tells the manager what's happening and what needs them.

---

## Positioning

### "The AI ops person, not the AI dashboard"

Every other product in this space is a dashboard with an AI sidebar bolted on. Bash inverts the shape:

- **The page is the brief.** A morning paper for your venue — what happened, who came, what's at risk, what needs you.
- **The agent is the tool.** Anything you'd click in a normal product, you tell Bash. Make this poster live. Add these 47 guests. Pull the expired carousel. Mark Riya VIP. Comp the first round on table 3.
- **The agent has zero chrome.** No buttons, no toolbars, no settings panels, no nav. Structured input shows up *inside* the conversation when the task needs it — confirm cards, editable rows, preview tables.

### iPhone vs BlackBerry

Most B2B SaaS = BlackBerry: a keypad of buttons *and* a chat box bolted together. Bash = iPhone: one interaction surface, no legacy chrome. The ops person was the keypad. Bash removes the ops person — the keypad never mattered.

### Pricing frame

Compete with an **ops salary ($800–2.5K/month)**, not with a SaaS subscription. Different unit economics, different sales pitch, different feature priorities.

### Persona — the manager, not the operator

The real ICP is the **manager who wants to be on the floor**, not at a desk. Push-to-talk voice + the brief + the agent means "I can run my venue while walking through it."

---

## Core use cases

A venue manager has dozens of tiny, fragmented tasks per night, across systems that don't talk to each other. Bash collapses all of them into a single conversation.

### 1. "What's happening tonight?"
Open the app, read the brief: who's in the room right now, regulars vs first-timers, reservation / guest list / aggregator splits, team count on duty, what needs your attention. No dashboard hunting.

### 2. "Make this happen."
Drop a poster image into chat → Bash extracts title, date, time, lineup, cover charge → previews the event → on your nod, creates the event, publishes the listing, posts to Instagram, fires a WhatsApp broadcast to 312 regulars staggered over 15 minutes. **One drop, one nod, eight tools touched.**

### 3. "Add this guest list."
Drop an xlsx of 47 names → Bash parses both sheets, deduplicates against existing guests, flags VIPs already on file, previews the first 7 rows → on confirm, adds 42 new entries to the right event and (optionally) sends the SMS confirmation.

### 4. "Who's slipping away?"
Bash continuously segments your customer base. The brief surfaces at-risk regulars (30+ days dark) with name, mobile, visit history. Tap one and ask Bash to write the win-back note, or tell it to send a template to all of them.

### 5. "Pull the expired thing."
"Brunch poster #2 expired Thursday and is still on the homepage." Bash surfaces it in *Needs you*. Tap → "take it down and replace with the next active poster" pre-fills the chat → Bash does it.

### 6. "Comp the first round on table 3."
Live feed shows a VIP just sat down. Two taps — `Comp first round` → captain on duty gets the notification, action is logged.

### 7. "What's the difference between Friday and Saturday?"
Ask Bash anything analytical. "Friday hits earlier, Saturday holds longer." No chart-building, no filter UI — just an answer.

### 8. "Run a pricing experiment."
"Draft three cover-charge variants for May." Bash drafts them, you pick one, Bash schedules it across the channels.

The pattern: **anything the ops person would have done by clicking around five tools, the manager says once.**

---

## Features

### The Brief — the always-on operational picture

- **Right now** — live count of people in the venue, returning vs new, headline summary.
- **Needs you** — the short list of things only the manager can decide today (expired content, broken data, negative feedback patterns, unusual gaps).
- **Visitors overview** — total visits, verified visitors, VIPs, at-risk count, new vs returning, weekly trend, daily new-vs-returning, how people came in.
- **Guest register** — walk-in / reservation / guest-list / aggregator entries, gender mix, group sizes, entry sources, recent entries log.
- **Customer data** — sortable, exportable lists of at-risk regulars, top customers, and new customers this week. Names, phones, last visit, visit count, segment tag.
- **Loyalty & growth** — average customer lifetime, gap between visits, month-over-month QR + register growth, retention funnel (one-time → familiar → regular → VIP), 12-month cumulative growth.
- **Editorial captions** — each chart carries a one-line AI summary ("Returning is your gap. Most visitors come once and never come back.") instead of generic axis labels.

### The Agent — the universal command surface

The agent is the entry point for **any task the manager would otherwise click**. Core capabilities:

- **Image intake** — drop a poster, screenshot, menu photo, or flyer; the agent extracts structured data (event details, prices, dates, lineup).
- **File intake** — drop xlsx, csv, pdf; the agent parses, deduplicates, previews.
- **Voice intake** — push-to-talk while walking the floor; the agent transcribes and acts.
- **Multi-tool execution** — a single instruction triggers a sequence of tool calls (create event → post to Instagram → WhatsApp broadcast → schedule reminder).
- **Human-in-the-loop confirmation** — before anything destructive or public, the agent shows a confirm card with editable fields; nothing publishes without a nod.
- **Reasoning transparency** — collapsible thinking blocks let the manager see *why* the agent did what it did.
- **Conversation history** — every action is a named, searchable thread (Brunch poster · May 17, At-risk regulars, Pricing experiment).
- **Follow-up suggestions** — after each action, the agent proposes the natural next thing to do.

Critically: **the agent is not limited to a fixed feature list.** If the manager can describe the task in plain English (or Hindi, or a mix), the agent can do it — because the connector layer below gives it real access to the venue's data and the tools needed to act on it.

### Live Hospitality — the floor-side signal stream

A real-time feed of tonight's actionable moments:

- **Repeat-visit detection** — "Aman is back for his second visit, table 7" → suggested: welcome drink.
- **VIP arrival** — "Zoya, 12 visits this year, ₹38,400 lifetime, loves old-fashioned and corner tables" → suggested: comp first round, notify captain.
- **Birthday detection** — pulled from the guest register; suggested: send dessert + candle after mains.
- **Service-quality signals** — negative feedback clusters, long wait times, valet bottlenecks.
- **One-tap actions** — every card has primary + secondary actions that fire the relevant tool (notify a specific staff member, send an offer, write a custom note). Every action is logged.

This is the surface a manager glances at while walking the floor — not a dashboard to study, a feed to act on.

### The Connector Layer — why the agent can actually do anything

Bash competes on coverage, not on UI polish. A small **local Bash daemon** sits in the venue's existing folder structure and watches the files that POS, reservation, and event tools already write to disk. The LLM parses them in place — no API integrations to negotiate, no internet dependency, no waiting for legacy vendors to open up.

- Per-POS file shape is a **one-time cost**; the second venue running the same POS works in a day.
- Outbound channels (Instagram, WhatsApp, SMS, the venue's own webapp, valet app, guest-register app) are wired as tools the agent can call.
- This is the moat — the agent is only as useful as the systems it can touch, and Bash touches all of them.

---

## What the manager actually feels

- **One surface instead of seven tabs.** Bash is the homepage, not yet another tool to log into.
- **Speak the task, watch it happen.** Drop a poster, get a published event with a guest broadcast in eight seconds.
- **Confidence without micromanagement.** The brief tells you what's working and what isn't, in one read, in editorial English — not as a wall of charts.
- **A floor-walking workflow.** Push-to-talk + Live feed means the manager is in the room with guests, not in the back office.
- **A team that scales.** What used to require a dedicated ops person — or three managers covering each other — fits inside one manager + Bash.

---

## The pitch sentence

**Bash is the AI ops person for venues.** It runs the operational layer — content, customer data, guest lists, ticketing, reservations, communications, analytics — through a single conversation, so the manager can run the venue from the floor.
