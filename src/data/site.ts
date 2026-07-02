import type { FAQ, IconKey } from "./types";

/** Value-prop triad (honest, unquantified). */
export const benefits: { title: string; text: string; icon: IconKey }[] = [
  { title: "We Come To You", text: "On-site repair at the jobsite — no loading, no hauling a dead machine to a shop.", icon: "truck" },
  { title: "After-Hours Available", text: "Emergency and after-hours calls accepted. Call for current availability.", icon: "clock" },
  { title: "Fixed Where It Sits", text: "Many hose and field repairs can be handled where the machine sits, when parts, access, and conditions allow.", icon: "wrench" },
];

/** Honest capability proof (no fabricated inventory/brands) — trust without tenure. */
export const capabilities: { label: string; icon: IconKey }[] = [
  { label: "On-site hydraulic hose crimping & assembly", icon: "hose" },
  { label: "Common hose sizes, fittings & adapters (JIC, ORFS, NPT, and more)", icon: "check" },
  { label: "Cylinder reseals, repacks & leak repair", icon: "cylinder" },
  { label: "Trailer repair: hydraulics, lights, brakes, bearings & couplers", icon: "trailer" },
  { label: "Skid steers, excavators, tractors, dozers & attachments", icon: "excavator" },
  { label: "After-hours & weekend calls accepted", icon: "clock" },
];

/** Trust bar items shown under the hero. */
export const trustItems: { label: string; icon: IconKey }[] = [
  { label: "Mobile Hose Repair", icon: "hose" },
  { label: "Cylinder Repair", icon: "cylinder" },
  { label: "Trailer Repair", icon: "trailer" },
  { label: "Field Service", icon: "wrench" },
  { label: "Fleet PM", icon: "shield" },
  { label: "After-Hours Calls", icon: "clock" },
];

/** "How it works" — 3 steps. */
export const processSteps: { title: string; text: string }[] = [
  {
    title: "Call or Text Photos",
    text: "Call first if equipment is down. Text photos of the machine, failed hose, fittings, and jobsite location if available.",
  },
  {
    title: "We Confirm and Roll",
    text: "We confirm availability, location, access, and likely parts needs before dispatch.",
  },
  {
    title: "We Fix It Where It Sits",
    text: "When parts and access allow, we repair on-site and get the equipment back to work.",
  },
];

/** GEO answer boxes for home and key pages. */
export const answerBoxes: { title: string; text: string; icon: IconKey }[] = [
  {
    title: "What we do",
    icon: "wrench",
    text: "Mobile hydraulic hose repair, hydraulic cylinder repair, trailer repair, equipment field service, fleet preventative maintenance, and after-hours calls — brought to the jobsite.",
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
