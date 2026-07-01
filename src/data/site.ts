import type { FAQ, IconKey } from "./types";

/** Trust bar items shown under the hero. */
export const trustItems: { label: string; icon: IconKey }[] = [
  { label: "Mobile Hose Repair", icon: "hose" },
  { label: "Field Equipment Service", icon: "wrench" },
  { label: "After-Hours Calls", icon: "clock" },
  { label: "Trailer Repair", icon: "trailer" },
  { label: "Preventative Maintenance", icon: "shield" },
];

/** "How it works" process steps. */
export const processSteps: { title: string; text: string }[] = [
  {
    title: "Call or request service",
    text: "Reach out by phone or the request form when equipment is down.",
  },
  {
    title: "Describe the machine and problem",
    text: "Tell us the make, model, what failed, and where the jobsite is.",
  },
  {
    title: "We confirm availability and dispatch",
    text: "We give you an honest read on availability and what to have ready.",
  },
  {
    title: "We repair on-site when conditions allow",
    text: "When the correct parts and access are available, we fix it where it sits.",
  },
  {
    title: "You get back to work",
    text: "The goal is uptime — the machine running and the crew moving again.",
  },
];

/** GEO answer boxes for home and key pages. */
export const answerBoxes: { title: string; text: string; icon: IconKey }[] = [
  {
    title: "What we do",
    icon: "wrench",
    text: "Mobile hydraulic hose repair, equipment field service, trailer repair, after-hours repair, and preventative maintenance — brought to the jobsite.",
  },
  {
    title: "Where we work",
    icon: "pin",
    text: "Madison County, Brazos County, and surrounding East Texas — Madisonville, Bryan, College Station, Navasota, North Zulch, Normangee, and the Huntsville edge.",
  },
  {
    title: "Who we serve",
    icon: "tractor",
    text: "Ranchers, hay operations, land clearing and excavation crews, municipalities, trailer owners, industrial and oilfield support, fleets, and rental yards.",
  },
  {
    title: "When to call",
    icon: "clock",
    text: "When a hose blows, a cylinder leaks, a trailer won't dump, or a machine is down — during the day or after hours. Call for current availability.",
  },
  {
    title: "What to have ready",
    icon: "check",
    text: "The machine make and model, what failed and where it is on the machine, whether it's accessible, the jobsite location, and a photo texted to us if you can.",
  },
];

/** Global / home FAQs. */
export const homeFaqs: FAQ[] = [
  {
    question: "Do you offer mobile hydraulic hose repair near Madisonville?",
    answer:
      "Yes. Rogers Hydraulic & Equipment Services provides mobile hydraulic hose repair and field equipment service across Madisonville, Madison County, Brazos County, and surrounding East Texas. Availability depends on active call volume, jobsite access, and parts requirements.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Madison County, Brazos County, and surrounding East Texas — including Madisonville, Bryan, College Station, Navasota, North Zulch, Normangee, and the Huntsville edge of the I-45 corridor.",
  },
  {
    question: "Are you available after hours?",
    answer:
      "Emergency and after-hours calls are accepted. We do not advertise guaranteed 24/7 service — availability varies by call volume, distance, weather, and time. Call for current availability.",
  },
  {
    question: "Can every repair be done on-site?",
    answer:
      "No. When the correct hose, fitting, adapter, and access conditions are available, many hydraulic repairs can be done on-site. Some jobs require sourcing a part or a shop, and we will tell you honestly which.",
  },
  {
    question: "How is pricing handled?",
    answer:
      "Work is quoted around the job — a service call, labor, parts, and any after-hours structure. Distance and after-hours, weekend, or holiday timing affect pricing. Call and we will explain the structure before we roll.",
  },
];
