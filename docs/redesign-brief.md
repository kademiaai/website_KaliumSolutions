# Kalium Solutions landing page redesign brief

Built with the `landing-page-design` skill (`.claude/skills/landing-page-design`).

## Assumptions

- **Primary action:** book a technical demo. Every CTA on the page leads to the same contact form.
- **Audience:** plant managers, reliability engineers, and OT/IT leads at discrete and process manufacturers.
- **Traffic:** search, referrals, and LinkedIn. No paid ad campaign to mirror, so the page is indexed.
- **Facts:** only claims already published on kaliumsolutions.tech are used (protocols, platforms, NDA, audit offer).
  No new statistics, client logos, or testimonials were invented. See "Open items" for what to supply.
- **Theme:** dark only, matching the request for a Vercel / Grafana style infrastructure look.

## Layout choice

**A. Classic hero plus sections.** The product is easiest to understand from a picture of it working
(an asset health view and the data pipeline), so a hero with a product panel followed by argument
sections fits better than a long story or a comparison page.

## Page outline

| # | Section | Job | Wireframe |
|---|---|---|---|
| 0 | Floating nav | Orientation, one CTA | Centered pill: logo · Architecture · Capabilities · Use cases · FAQ · `Book a demo` |
| 1 | Hero | Value prop and primary action | Left aligned copy (max 680px), CTA, risk line, protocol strip; full width asset health panel below |
| 2 | Architecture | Show how data flows | 4 stage cards in a row joined by an animated track; 2 code panels below (collector config in Git, Sparkplug B payload) |
| 3 | Capabilities | Benefits, outcome first | 2 × 2 grid with hairline dividers; icon, title, description, 3 technical specifics each |
| 4 | Tagline reveal | Restate the core benefit | Large centered text, words light up one by one on scroll |
| 4b | Deployment options | Edge, on premise or cloud; start small | Option switcher over an animated data flow (plant boundary, Kit database, plant server, cloud tenant), comparison cards, pilot to scale path |
| 5 | Use cases | Concrete operational value | 3 cards: assets, what we measure, what you get |
| 6 | How it works | Lower the perceived effort | 3 numbered steps in a row; risk reversal line under them |
| 7 | FAQ | Handle technical objections | Two column: heading left, accordion right |
| 8 | Contact | Final CTA, identical to hero | Two column: what happens next list left, validated form right |
| 9 | Footer | Navigation and contact | Logo and one line, link columns, email and regions |

Mobile (390px): every multi column layout stacks to one column; the asset table hides its signal column;
the pipeline track becomes vertical cards.

## Hero copy

- **Eyebrow:** Industrial IoT for manufacturing plants
- **Headline:** Output, energy / and machine health / for every line
- **Subheadline:** Kalium reads the PLCs, meters and sensors already on your floor to produce automatic shift and batch
  reports, energy and utility use per unit produced, and early warning of failing equipment. Data is processed at the
  edge and stays in your plant.
- **CTA:** Book a technical demo
- **Risk line:** Starts with a scoped audit of one line. NDA signed before any plant data is shared.
- **Proof line:** Reads from Siemens S7 · Rockwell EtherNet/IP · Beckhoff ADS · Modbus TCP · OPC UA · MQTT Sparkplug B
- **Hero panel:** sample dashboard with three tabs: Production (OEE, output per shift, top stop reasons),
  Consumption (utilities per 1,000 cases against baseline, night time air leak), Machine health (assets by RUL).

Positioning: three outcomes from one Kit and one data pipeline: production reporting, energy and utility
monitoring, and predictive maintenance. None is presented as the main product.

## Section headers

| Section | Eyebrow | Heading | Intro |
|---|---|---|---|
| Architecture | Architecture | One pipeline from PLC tag to maintenance alert | Every stage runs as a versioned container, configured from a Git repository your team can review. |
| Capabilities | Capabilities | Four building blocks, deployed together or one at a time | Start with the module that solves today's problem and add the rest on the same pipeline. |
| Tagline | | Every motor, pump and gearbox on your line, measured continuously and ranked by how soon it needs attention. | |
| Use cases | Use cases | Where plants start | Three problems we are most often asked to solve first. |
| How it works | How it works | From audit to fleet rollout in three steps | |
| FAQ | FAQ | Technical questions | Not covered here? Ask in the demo request and an engineer will answer. |
| Contact | Book a technical demo | Show us one line. We will show you its data. | Tell us which line and controllers you want to start with. We reply by email to arrange a session with an engineer. |

## Pipeline stages

1. **Edge collectors.** Poll PLCs and sensors on site and keep data in a local buffer when the network drops.
2. **Telemetry pipeline.** Map tags into a unified namespace and stream them over MQTT Sparkplug B.
3. **ML engine.** Learn a baseline per asset, score anomalies, and estimate remaining useful life.
4. **Dashboards and alerts.** Rank assets by risk and push alerts and work orders to the systems that act on them.

## Capabilities (benefits)

- **Predictive maintenance.** See the likely fault and the days of service left, so repairs land in a planned stop.
- **Protocol bridge.** Read Siemens, Rockwell, Beckhoff and Modbus controllers without rewriting PLC programs.
- **GitOps infrastructure.** Every collector setting, model and dashboard change is reviewed, versioned and reversible.
- **Edge orchestration.** Containers keep collecting through cloud outages and update per site, line or gateway.

## How it works

1. **Plant audit.** Review network layout, controllers and critical assets; agree the first line to instrument.
2. **Pilot on one line.** Install gateways and sensors, map tags, and learn baselines from your own equipment.
3. **Scale across sites.** Copy the proven configuration to new lines from Git instead of rebuilding it by hand.

## FAQ

1. Which controllers and protocols do you support?
2. Do you need to change our PLC programs?
3. What happens when the network or cloud link goes down?
4. Where do analytics and dashboards run?
5. How is OT network security handled?
6. How does remaining useful life estimation work?
7. Can the data feed our existing tools?
8. How does a project start?

Full answers live in `src/content.ts`. Please check every answer against how you actually deliver.

## SEO / AEO

- **Index:** yes, evergreen offer.
- **Title:** Kalium Solutions · Predictive maintenance and IIoT for manufacturing plants
- **Meta description:** Condition monitoring, anomaly detection and remaining useful life estimation for rotating
  equipment. Connects to Siemens, Rockwell, Beckhoff, Modbus and OPC UA without PLC changes.
- **FAQ schema:** emitted as JSON-LD from the FAQ section.

## Open items for the owner

- **Proof:** supply real client logos (with permission), a named testimonial, or one verified result figure.
  The page has no social proof section until then.
- **Contact address:** resolved. Requests go to `hello@kademia.edu.vn` (Kademia is the parent company);
  the footer says "A Kademia company" so the different domain is not a surprise.
- **Form backend:** the form currently opens the visitor's email app with the request filled in.
  Connect a form service (Formspree, Netlify Forms, a small API) to receive requests directly.
- **Legal pages:** privacy policy and terms are not written yet; the footer links are omitted until they exist.
- **FAQ and demo agenda:** review for accuracy.
