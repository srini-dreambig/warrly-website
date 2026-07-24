import { ART } from "../brand";

export type FeatureLayout = "hub" | "steps" | "timeline" | "story" | "record" | "ops" | "trust";

export type FeatureBlock = { title: string; body: string };
export type FeatureFaq = { q: string; a: string };

export type FeaturePageContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  problem: string;
  solution: string;
  problemTitle?: string;
  solutionTitle?: string;
  layout?: FeatureLayout;
  bullets: string[];
  scenarios: FeatureBlock[];
  capabilities: FeatureBlock[];
  stages?: FeatureBlock[];
  faqs: FeatureFaq[];
  honestNote?: string;
  afterThought?: string;
  image: string;
  imageAlt: string;
  related?: { to: string; label: string }[];
};

export const featurePages: FeaturePageContent[] = [
  {
    path: "/personal",
    eyebrow: "Personal",
    title: "Every warranty in one place — before something breaks",
    lead: "Warrly is built for Indian households that buy things that matter: appliances, phones, laptops, vehicles, furniture. Capture proof once. Stay covered for years.",
    problemTitle: "Why households lose coverage",
    solutionTitle: "What your personal vault changes",
    layout: "hub",
    problem:
      "GST bills, Flipkart and Amazon invoices, and serial photos scatter across email, WhatsApp, and drawers. When an authorised centre asks for proof, families pay cash for repairs that should have been covered.",
    solution:
      "Your personal vault keeps each item, its documents, warranty window, and claim-ready evidence together. Reminders arrive before expiry. Sharing stays inside your household.",
    bullets: [
      "Snap or forward a receipt — extract brand, purchase date, and warranty fields, then confirm before save",
      "See protected value and coverage status across everything you own",
      "Reminders at 30, 7, and 1 day before a warranty ends",
      "Share a household vault with partners or family without forwarding messy files",
      "Start free with five items; upgrade to Plus or Pro in-app when you need more",
      "Draft claims with brand channels and an evidence PDF pack when something fails",
    ],
    scenarios: [
      {
        title: "The fridge that stops cooling in May",
        body: "You bought it last Diwali with a GST invoice buried in Gmail. Open the item, pull the bill and serial photo, and walk into the authorised centre with proof — not a memory of the order ID.",
      },
      {
        title: "Two phones, one household",
        body: "One partner ordered on Amazon; the other keeps the box. A shared vault means either of you can find the invoice when the screen cracks — without hunting through two WhatsApp chats.",
      },
      {
        title: "Laptop warranty about to lapse",
        body: "Thirty days out, a reminder lands. You check coverage status, decide whether to claim a sticky keyboard now, or renew extended cover before the window closes.",
      },
    ],
    capabilities: [
      {
        title: "Capture that sticks",
        body: "Camera, gallery, PDF, email forward, or manual entry. Extract fills the hard fields; you confirm before anything is saved to the vault.",
      },
      {
        title: "Coverage you can read",
        body: "Active, expiring (within 30 days), expired, or unknown — plus protected value from purchase prices on items still covered.",
      },
      {
        title: "Claims without the scavenger hunt",
        body: "Draft a claim, open brand call/email/URL channels when known, assemble an evidence PDF pack, and mark filed, in service, resolved, or denied.",
      },
      {
        title: "Household, not chaos",
        body: "Invite members into a shared vault with tier caps. Personal and business vaults stay separate when you need them to.",
      },
    ],
    faqs: [
      {
        q: "Is Warrly free to start?",
        a: "Yes. Free includes up to five items with document limits. Plus and Pro unlock higher caps in-app — we do not list rupee prices on this site because plans ship inside the app.",
      },
      {
        q: "Do you file claims with the brand for me?",
        a: "No. There is no universal OEM claim API. Warrly helps you draft the case, open brand channels when we know them, and export an evidence pack you submit yourself.",
      },
      {
        q: "What counts as protected value?",
        a: "It is the sum of purchase prices on items with active or expiring coverage — not an appraisal or resale estimate. You control the purchase amounts you save.",
      },
    ],
    honestNote:
      "Warrly is a vault and workflow product for India-first households. Free starts at five items; documents are capped by plan. We help you prepare claims — we do not auto-submit them to manufacturers.",
    afterThought:
      "The quiet win is not a prettier folder — it is walking into an authorised centre with the GST bill already in your pocket.",
    image: ART.welcomePersonal,
    imageAlt: "Capturing a purchase into your Warrly vault",
    related: [
      { to: "/personal/receipts", label: "Add a receipt" },
      { to: "/personal/reminders", label: "Reminders" },
      { to: "/personal/claims", label: "File a claim" },
      { to: "/plans", label: "Plans" },
    ],
  },
  {
    path: "/personal/items",
    eyebrow: "Vault",
    title: "My items — a living inventory of what you own",
    lead: "Each item is a first-class record: brand, model, purchase date, warranty end, documents, and notes. Not a folder dump. A coverage map.",
    layout: "record",
    problem:
      "Spreadsheets go stale. Photo albums of receipts are unsearchable. You cannot tell what is still under warranty without opening ten apps — and Flipkart order history is not a claim pack.",
    solution:
      "Warrly turns every purchase into an item card with status you can trust — active, expiring soon, expired, or unknown — so you always know what is protected.",
    bullets: [
      "Search and filter by brand, category, or expiry",
      "Attach multiple documents per item — invoices, manuals, serial photos",
      "Track protected value so you see what coverage is actually worth",
      "Start free with five items; grow with Plus or Pro in-app",
      "Open an item and jump straight into reminders, documents, or a claim draft",
    ],
    scenarios: [
      {
        title: "Sorting after a move",
        body: "Three cartons of manuals and a phone full of receipt photos. Create items as you unpack; attach what you find so coverage survives the new address.",
      },
      {
        title: "Gifted AC with a paper card",
        body: "No email invoice — just a warranty card and a shop stamp. Manual entry plus a photo still beats hoping the dealer remembers you.",
      },
      {
        title: "Checking before a repair quote",
        body: "A technician quotes cash for a washing-machine drum. Open the item, confirm the warranty end date, and decide whether to push for authorised service instead.",
      },
    ],
    capabilities: [
      {
        title: "Item cards that carry context",
        body: "Brand, model, purchase date, warranty window, notes, and documents live on one record — ready for reminders and claims.",
      },
      {
        title: "Status without guesswork",
        body: "Coverage shows as active, expiring (≤30 days), expired, or unknown so urgent items do not hide in a long list.",
      },
      {
        title: "Protected value rollup",
        body: "See the sum of purchase prices on active and expiring items — a paper sense of what coverage is still worth.",
      },
      {
        title: "Room to grow by plan",
        body: "Free holds five items with document limits. Plus and Pro raise caps in-app when the household inventory outgrows the free tier.",
      },
    ],
    faqs: [
      {
        q: "How many items can I keep on free?",
        a: "Free includes five items with limited documents. Upgrade to Plus or Pro in the app when you need more capacity.",
      },
      {
        q: "Can one item hold several documents?",
        a: "Yes. Invoices, warranty cards, manuals, and serial photos attach to the same item so proof stays together.",
      },
      {
        q: "What if I do not know the warranty end date?",
        a: "Save what you know. Status can show as unknown until you confirm dates — better than having no record at all.",
      },
    ],
    honestNote:
      "Free is capped at five items with document limits. Protected value is purchase-price based on active and expiring items — not market value.",
    afterThought:
      "An inventory only helps if you can open the right item in the minute before you dial the service line.",
    image: ART.emptyWarrly,
    imageAlt: "Items protected in the Warrly vault",
    related: [
      { to: "/personal/receipts", label: "Add a receipt" },
      { to: "/personal/coverage", label: "Protected value" },
      { to: "/plans", label: "Plus & Pro" },
    ],
  },
  {
    path: "/personal/receipts",
    eyebrow: "Capture",
    title: "Add a receipt in seconds — keep the proof forever",
    lead: "The moment of purchase is the easiest time to capture warranty proof. Warrly is designed for that moment: camera up, confirm fields, done.",
    layout: "steps",
    problem:
      "People intend to “file it later.” Later never comes. Retailers email PDFs that vanish into inbox noise. Paper GST bills fade in a kitchen drawer.",
    solution:
      "Photograph the receipt, pick from gallery, or upload a PDF. Extract fills the hard fields. You confirm. The item joins your vault with evidence attached.",
    bullets: [
      "Camera — optimized for store receipts, packing slips, and GST bills",
      "Gallery or PDF — pull Amazon, Flipkart, or retailer invoices you already saved",
      "Extract — brand, purchase date, amounts, and warranty hints fill in for review",
      "Confirm — you edit anything wrong before the record is saved",
      "Attached proof — the image or PDF stays on the item for future claims",
    ],
    scenarios: [
      {
        title: "Leaving the electronics store",
        body: "Bag still in hand, you snap the GST invoice before it folds into a bag. Confirm brand and date in the lobby; reminders start from a clean record.",
      },
      {
        title: "Unboxing an Amazon delivery",
        body: "Download the tax invoice PDF, upload it, and confirm the fields. The packing slip photo can sit beside it if serial stickers matter later.",
      },
      {
        title: "Rebuilding after a phone wipe",
        body: "Old receipt photos still live in gallery. Re-import them, confirm extract, and restore coverage without retyping every line.",
      },
    ],
    capabilities: [
      {
        title: "Multiple capture paths",
        body: "Camera, gallery, PDF upload, email forward, and manual entry all land in the same vault shape.",
      },
      {
        title: "Human confirm before save",
        body: "Extract is a draft. Nothing becomes the official item until you review and confirm the fields.",
      },
      {
        title: "Evidence that travels",
        body: "The receipt image or PDF stays linked to the item so claim packs and service calls start with proof.",
      },
    ],
    stages: [
      {
        title: "Capture",
        body: "Photograph the bill, choose a gallery image, or upload the PDF from your order email.",
      },
      {
        title: "Extract",
        body: "Warrly reads likely brand, dates, and amounts so you are not typing under fluorescent lights.",
      },
      {
        title: "Confirm",
        body: "Fix typos, set warranty end if needed, and save — reminders and coverage status follow from what you confirmed.",
      },
    ],
    faqs: [
      {
        q: "Do I have to retype the whole receipt?",
        a: "Usually not. Extract suggests fields from the image or PDF; you confirm or correct them before save.",
      },
      {
        q: "Can I add a receipt later if I forgot at the store?",
        a: "Yes. Gallery and PDF uploads work anytime. Manual entry covers purchases where the paper is gone.",
      },
      {
        q: "Is the receipt enough for a claim?",
        a: "Often it is the core proof — especially a GST bill. Serial photos and identity docs can join the evidence pack when a centre asks for more.",
      },
    ],
    honestNote:
      "Extract assists; you confirm before save. Quality depends on how clear the receipt photo or PDF is — blurry GST stamps still need your eyes.",
    afterThought:
      "The cheapest warranty insurance is thirty seconds with the camera while the invoice is still flat.",
    image: ART.welcomePersonal,
    imageAlt: "Snapping a receipt into Warrly",
    related: [
      { to: "/personal/camera-extract", label: "Camera extract" },
      { to: "/personal/email-inbox", label: "Email invoice inbox" },
      { to: "/personal/manual-entry", label: "Manual entry" },
    ],
  },
  {
    path: "/personal/documents",
    eyebrow: "Vault",
    title: "Documents & PDFs that stay with the product",
    lead: "Warranties are paperwork. Warrly treats invoices, warranty cards, manuals, and service reports as first-class evidence — not attachments you will lose.",
    layout: "record",
    problem:
      "Cloud drives fill with unnamed PDFs. Finding the right Flipkart tax invoice during a claim call is a scavenger hunt under pressure — especially when the centre insists on a GST bill.",
    solution:
      "Every document hangs on the item it belongs to. Open the item, and the proof is there — ready to include in an evidence PDF pack when you escalate a claim.",
    bullets: [
      "Store invoices, warranty certificates, manuals, and photos on the item",
      "Keep serial numbers and label photos next to the product record",
      "Feed evidence packs with letter, identity, and invoice images when claiming",
      "Delete documents when you no longer need them",
      "Respect plan document limits on free; Plus and Pro raise capacity in-app",
    ],
    scenarios: [
      {
        title: "Authorised centre asks for the tax invoice",
        body: "Open the microwave item, pull the GST PDF, and show or email it without scrolling three years of Gmail.",
      },
      {
        title: "Service report after a visit",
        body: "Technician leaves a job sheet. Photograph it onto the same item so the next failure has history, not a blank slate.",
      },
      {
        title: "Extended warranty booklet",
        body: "The paper booklet lives in a drawer; a scan lives on the item. When renewal ads arrive, you check what you already bought.",
      },
    ],
    capabilities: [
      {
        title: "Item-scoped files",
        body: "Documents attach to the product they prove — not a global dump of “scan001.pdf.”",
      },
      {
        title: "Claim-ready exports",
        body: "When you build an evidence pack, invoice images and related files are already sitting on the item.",
      },
      {
        title: "Cleanup without drama",
        body: "Remove files you no longer need; export JSON if you want a portable copy of vault data.",
      },
    ],
    faqs: [
      {
        q: "What kinds of files can I keep?",
        a: "Invoices, warranty cards, manuals, serial photos, and similar proof that belongs with the item.",
      },
      {
        q: "Are documents unlimited on free?",
        a: "No. Free has document limits. Plus and Pro increase capacity in the app.",
      },
      {
        q: "Can I remove a document later?",
        a: "Yes. Delete files or whole items when coverage ends or you simply prefer them gone.",
      },
    ],
    honestNote:
      "Document storage is limited on free. Plans raise caps in-app — we do not invent price lists on this page.",
    afterThought:
      "A warranty without the invoice is a story; a warranty with the GST bill is a case.",
    image: ART.welcomeAccount,
    imageAlt: "Documents kept with each Warrly item",
    related: [
      { to: "/personal/evidence", label: "Evidence packs" },
      { to: "/security/export", label: "Export & delete" },
    ],
  },
  {
    path: "/personal/household",
    eyebrow: "Vault",
    title: "Household sharing without the chaos",
    lead: "Homes share purchases. Coverage should not live in one person’s email. Invite household members to the same vault with clear ownership.",
    layout: "record",
    problem:
      "One partner bought the fridge on Flipkart; the other handles service calls. Evidence is split across devices, UPI screenshots, and WhatsApp forwards that nobody can search.",
    solution:
      "Share a household vault so everyone can add receipts, see reminders, and pull documents — without forwarding threads forever.",
    bullets: [
      "Invite partners or family into a shared vault",
      "Everyone sees coverage status and upcoming expiries",
      "Add receipts from any shared device",
      "Member caps by plan — free 1, Plus 2, Pro 6",
      "Keep personal and business vaults separate when needed",
    ],
    scenarios: [
      {
        title: "Parents and adult kids",
        body: "You manage the AC and water purifier warranties for parents who do not want another app. They call; you open the shared item and read the invoice aloud.",
      },
      {
        title: "Roommates with shared appliances",
        body: "The washing machine sits in a common balcony. Either roommate can capture the receipt and either can see when coverage expires.",
      },
      {
        title: "Travel day, appliance fails",
        body: "You are out of town. A household member opens the vault, finds the brand channel, and starts a claim draft with the right documents.",
      },
    ],
    capabilities: [
      {
        title: "Invite-based sharing",
        body: "Members join the household vault by invite — access stays scoped to people you choose.",
      },
      {
        title: "Shared capture and reminders",
        body: "Anyone in the vault can add proof and see 30/7/1-day reminders tied to the same items.",
      },
      {
        title: "Tier-aware member caps",
        body: "Free supports one household member, Plus two, Pro six — soft limits that grow with the plan you choose in-app.",
      },
    ],
    faqs: [
      {
        q: "How many people can join a household?",
        a: "Caps follow your plan: free includes 1 member, Plus 2, Pro 6. Upgrade in-app when the household grows.",
      },
      {
        q: "Do members see my business vault too?",
        a: "No. Household sharing is for the personal vault you invite them into. Business workspaces stay separate.",
      },
      {
        q: "Can members delete items?",
        a: "Shared vault members work from the same records. Use invites carefully and remove access when someone should no longer see household coverage.",
      },
    ],
    honestNote:
      "Household member caps are plan-based (free 1, Plus 2, Pro 6). This is shared vault access — not a full family OS or chat product.",
    afterThought:
      "Coverage is a household asset; it should not depend on whose Gmail still has the order mail.",
    image: ART.allClear,
    imageAlt: "Household coverage shared in Warrly",
    related: [
      { to: "/personal/items", label: "My items" },
      { to: "/personal/reminders", label: "Reminders" },
    ],
  },
  {
    path: "/personal/reminders",
    eyebrow: "Coverage",
    title: "Reminders that arrive while you can still act",
    lead: "A warranty that expires quietly is a warranty that never existed. Warrly nudges you early enough to renew, claim, or replace on your terms.",
    layout: "timeline",
    problem:
      "Calendar apps do not know your purchases. Manufacturer emails get filtered. People discover expiry only when an authorised centre denies a repair.",
    solution:
      "Automatic reminders at 30, 7, and 1 day before each warranty ends — tied to the item and its documents, not a generic calendar note. Snooze when you need breathing room; jump straight to the item when you are ready.",
    bullets: [
      "30 / 7 / 1-day reminder cadence by default",
      "Snooze when the timing is wrong for your week",
      "Jump from a reminder straight to the item and documents",
      "Pair with the expiring view so deadlines stay visible",
      "Fewer surprises when something fails next month",
    ],
    scenarios: [
      {
        title: "Thirty days before a TV warranty ends",
        body: "You finally schedule the pixel check you postponed. If it fails, you still have time to claim — not a shrug after expiry.",
      },
      {
        title: "Seven-day nudge during a busy week",
        body: "Snooze once, then open the item on Sunday and decide: claim, buy extended cover, or accept the risk knowingly.",
      },
      {
        title: "One-day last call",
        body: "The final reminder surfaces the invoice and serial photo so you are not scrambling at midnight for a PDF.",
      },
    ],
    capabilities: [
      {
        title: "Fixed early cadence",
        body: "Reminders fire at 30, 7, and 1 day before warranty end so action is still possible.",
      },
      {
        title: "Snooze without losing the thread",
        body: "Push a reminder aside when life is loud; it stays tied to the same item when you come back.",
      },
      {
        title: "Deep link to the record",
        body: "Open the item, documents, and coverage context from the reminder — no hunting.",
      },
    ],
    stages: [
      {
        title: "30 days out",
        body: "Review what is nearing the end. Claim nagging issues or price extended cover while you still have leverage.",
      },
      {
        title: "7 days out",
        body: "Decide with documents open. Snooze if you need a quieter evening — the item stays one tap away.",
      },
      {
        title: "1 day out",
        body: "Last chance to act before status flips. Archive knowingly if you are letting coverage go.",
      },
    ],
    faqs: [
      {
        q: "When do reminders send?",
        a: "By default at 30, 7, and 1 day before each warranty end date on items you have saved.",
      },
      {
        q: "Can I snooze a reminder?",
        a: "Yes. Snooze when timing is bad, then jump back to the item when you are ready to decide.",
      },
      {
        q: "What if the warranty date is wrong?",
        a: "Edit the item’s dates after confirm. Reminders follow the dates you trust in the vault.",
      },
    ],
    honestNote:
      "Reminders only fire for warranties with dates you have saved. Extract helps suggest fields — you still confirm accuracy.",
    afterThought:
      "Expiry should feel like a decision, not a discovery made at the service counter.",
    image: ART.allClear,
    imageAlt: "Clear coverage with timely reminders",
    related: [
      { to: "/personal/expiring", label: "Expiring soon" },
      { to: "/personal/coverage", label: "Coverage status" },
    ],
  },
  {
    path: "/personal/expiring",
    eyebrow: "Coverage",
    title: "Expiring soon — act before the window closes",
    lead: "A focused view of warranties nearing the end. Prioritize what to renew, claim, or archive — instead of scrolling every item.",
    layout: "timeline",
    problem:
      "When everything looks the same in a long list, urgent coverage gets buried under items that still have years left — and the mixer that fails next week had fourteen days of cover you never noticed.",
    solution:
      "Expiring soon surfaces items within the expiring window (≤30 days), with dates and documents one tap away so you can claim, renew, or let go on purpose.",
    bullets: [
      "Sorted by urgency so the next deadline is obvious",
      "Expiring status means ≤30 days of cover left",
      "Open documents without leaving the item context",
      "Decide: claim, renew extended cover, or archive",
      "Pair with 30/7/1 reminders so nothing slips quietly",
    ],
    scenarios: [
      {
        title: "Weekend triage",
        body: "Sunday coffee, three items in expiring. One gets a claim draft, one gets an extended-warranty check, one you consciously retire.",
      },
      {
        title: "Before buying a replacement",
        body: "The old laptop is in expiring. You check remaining days and documents before paying full price for a new one.",
      },
      {
        title: "Family WhatsApp ping",
        body: "Someone asks if the RO filter warranty still runs. Expiring soon answers in seconds without a vault-wide scroll.",
      },
    ],
    capabilities: [
      {
        title: "Urgency-first list",
        body: "See what is inside the 30-day expiring band without noise from long-lived coverage.",
      },
      {
        title: "Action from the row",
        body: "Jump to documents, start a claim, or update status once you decide.",
      },
      {
        title: "Aligned with reminders",
        body: "The same window that drives expiring status also feeds the 30/7/1 reminder cadence.",
      },
    ],
    stages: [
      {
        title: "Notice",
        body: "An item enters expiring (≤30 days). It rises into this view and reminder cadence tightens.",
      },
      {
        title: "Decide",
        body: "Open proof, check brand channels if needed, and choose claim, renew, or accept expiry.",
      },
      {
        title: "Close the loop",
        body: "Mark outcomes on claims or let status move to expired — the vault stays honest either way.",
      },
    ],
    faqs: [
      {
        q: "What does “expiring” mean?",
        a: "Coverage with 30 days or fewer remaining. Active means more runway; expired means the window has closed; unknown means dates are not confirmed yet.",
      },
      {
        q: "Does expiring change protected value?",
        a: "Protected value still includes purchase prices on active and expiring items. Once expired, that item drops out of the sum.",
      },
      {
        q: "Can I hide an item I plan to ignore?",
        a: "You can archive or leave it to expire knowingly. The point of this view is conscious choice — not forced renewals.",
      },
    ],
    honestNote:
      "Expiring is a ≤30-day status band based on dates you confirmed. We do not invent renewal offers or auto-buy extended warranties.",
    afterThought:
      "A short list of almost-gone warranties is more useful than a long list of everything you ever bought.",
    image: ART.allClear,
    imageAlt: "Items nearing warranty expiry",
    related: [
      { to: "/personal/reminders", label: "Reminders" },
      { to: "/personal/claims", label: "File a claim" },
    ],
  },
  {
    path: "/personal/coverage",
    eyebrow: "Coverage",
    title: "Status & protected value you can actually read",
    lead: "Coverage is not a vibe. It is a status and a number. See what is protected, what is at risk, and what your vault is worth on paper.",
    layout: "timeline",
    problem:
      "People underestimate how much sits under warranty until something expensive fails without proof — a ₹40,000 phone treated like a forgotten accessory.",
    solution:
      "Warrly rolls up item statuses and protected value so you understand exposure. Statuses are active, expiring (≤30 days), expired, or unknown. Protected value sums purchase prices on active and expiring items.",
    bullets: [
      "Active, expiring, expired, and unknown statuses at a glance",
      "Protected value based on purchase prices you control — not appraisals",
      "Spot gaps where high-value items lack documents",
      "Use coverage clarity to decide what to capture next",
      "Same language whether you are reviewing a phone or a fridge",
    ],
    scenarios: [
      {
        title: "After a shopping season",
        body: "Festive orders piled up. Coverage shows how much purchase value is still active versus already expired — a reality check before the next sale.",
      },
      {
        title: "Unknown status on an old mixer",
        body: "You have a photo but no date. Status stays unknown until you confirm — honest emptiness beats a fake green tick.",
      },
      {
        title: "Talking through insurance vs warranty",
        body: "Protected value is not an insurance quote. It is your own purchase-backed sum so family conversations start from shared numbers.",
      },
    ],
    capabilities: [
      {
        title: "Four clear statuses",
        body: "Active, expiring (≤30d), expired, unknown — readable without decoding a spreadsheet.",
      },
      {
        title: "Purchase-backed protected value",
        body: "Sum of purchase prices on items that are still active or expiring. Edit prices when your records improve.",
      },
      {
        title: "Gap spotting",
        body: "High-value items with thin documents stand out so you know what to photograph next.",
      },
    ],
    stages: [
      {
        title: "Capture purchase truth",
        body: "Save items with prices and dates you trust — extract helps, confirm decides.",
      },
      {
        title: "Read the rollup",
        body: "Scan statuses and protected value to see what is still covered and what is drifting.",
      },
      {
        title: "Act on risk",
        body: "Fill document gaps, claim while active/expiring, or accept expired items consciously.",
      },
    ],
    faqs: [
      {
        q: "How is protected value calculated?",
        a: "It is the sum of purchase prices on items with active or expiring coverage. It is not an appraisal, resale value, or insurer estimate.",
      },
      {
        q: "What does unknown status mean?",
        a: "Dates or coverage details are not confirmed yet. The item still lives in the vault — status stays honest until you fix the fields.",
      },
      {
        q: "Does expired value stay in the total?",
        a: "No. Once an item is expired, its purchase price no longer counts toward protected value.",
      },
    ],
    honestNote:
      "Protected value = sum of purchase prices on active and expiring items only. It is not market value, replacement cost, or an insurance figure.",
    afterThought:
      "Knowing what is covered is how households stop paying twice for the same failure.",
    image: ART.welcomeAccount,
    imageAlt: "Protected value overview in Warrly",
    related: [
      { to: "/personal/items", label: "My items" },
      { to: "/business/book-value", label: "Business book value" },
    ],
  },
  {
    path: "/personal/claims",
    eyebrow: "Claims",
    title: "File a claim with evidence already assembled",
    lead: "Claims fail on missing paperwork as often as on product faults. Warrly is built so you start a claim with proof in hand — not a panic search.",
    problemTitle: "Why claims stall at the service centre",
    solutionTitle: "How claim packs change the call",
    layout: "story",
    problem:
      "Support chats ask for invoice, serial, purchase date, photos. Gathering that under stress burns evenings — especially when centres require a GST bill and you only have an Amazon order screen.",
    solution:
      "Open the item, start a draft claim, open brand channels (call, email, or URL when known), build an evidence PDF pack, and track status through filed, in service, resolved, or denied.",
    bullets: [
      "Start from the item that failed — context stays attached",
      "Reuse invoices, serials, and photos already in the vault",
      "Open brand call / email / URL channels when Warrly knows them",
      "Export an evidence PDF pack — letter, identity, and up to invoice images",
      "Mark filed, in_service, resolved, or denied as the case moves",
    ],
    scenarios: [
      {
        title: "Dead pixel week three",
        body: "Draft the claim on the TV item, attach the Flipkart tax invoice, open the brand support URL, and mark filed after you submit.",
      },
      {
        title: "Compressor noise under warranty",
        body: "Authorised centre wants the GST bill and ID. Evidence pack carries letter, identity, and invoice images so you are not emailing from a parking lot.",
      },
      {
        title: "Denied, but documented",
        body: "If the brand denies, mark denied with history intact. You still have the trail if you escalate or pay cash knowingly.",
      },
    ],
    capabilities: [
      {
        title: "Draft → channels → pack",
        body: "Work the claim from the failed item: draft, open known brand channels, assemble the PDF pack, then update status.",
      },
      {
        title: "Evidence from the vault",
        body: "Invoices and photos you already captured feed the pack — letter and identity join when needed.",
      },
      {
        title: "Status you control",
        body: "Filed, in service, resolved, or denied — your inbox reflects what actually happened, not a black box.",
      },
    ],
    stages: [
      {
        title: "Draft",
        body: "Start on the failed item so brand, dates, and documents are already in context.",
      },
      {
        title: "Contact & pack",
        body: "Use call, email, or URL when known. Export the evidence PDF pack with letter, identity, and invoice images.",
      },
      {
        title: "Track outcome",
        body: "Mark filed, in_service, resolved, or denied so the claims inbox stays truthful.",
      },
    ],
    faqs: [
      {
        q: "Does Warrly submit claims to manufacturers automatically?",
        a: "No. There is no universal OEM claim API. We help you prepare and track; you submit through the brand’s channels.",
      },
      {
        q: "What is in an evidence pack?",
        a: "A PDF bundle that can include a letter, identity, and up to invoice images drawn from the item’s documents.",
      },
      {
        q: "Where do I see open claims?",
        a: "In the claims inbox — each case stays linked to the item and evidence you used.",
      },
    ],
    honestNote:
      "Warrly does not offer a universal OEM claim API. Brand call/email/URL appear when known; you still file with the manufacturer or authorised centre yourself.",
    afterThought:
      "A calm claim is mostly logistics — and logistics are easier when the GST bill was captured on day one.",
    image: ART.emptyWarrly,
    imageAlt: "Claim-ready vault in Warrly",
    related: [
      { to: "/personal/evidence", label: "Evidence packs" },
      { to: "/personal/claims-inbox", label: "Claims inbox" },
    ],
  },
  {
    path: "/personal/evidence",
    eyebrow: "Claims",
    title: "Evidence packs — everything a claim needs, together",
    lead: "An evidence pack is the difference between “we will look into it” and a clean submission. Bundle documents intentionally for each claim.",
    layout: "story",
    problem:
      "Scattered screenshots and renamed PDFs do not travel well. Reviewers bounce incomplete cases — especially when the GST invoice is missing from a long WhatsApp thread.",
    solution:
      "Assemble a PDF pack with a letter, identity, and up to invoice images from the vault. Keep originals safe on the item after you send copies through brand channels.",
    bullets: [
      "Build a pack from the item’s existing invoices and photos",
      "Include letter and identity when the process asks for them",
      "Export a PDF you can email or upload to a brand portal",
      "Keep originals in the vault after you send copies",
      "Reduce back-and-forth with incomplete submissions",
    ],
    scenarios: [
      {
        title: "Emailing brand support",
        body: "Attach one evidence PDF instead of five renamed files. The case reads cleaner; you look prepared.",
      },
      {
        title: "Walk-in authorised centre",
        body: "Show invoice images and serial photo from the pack on your phone while the engineer fills the job sheet.",
      },
      {
        title: "Follow-up after “documents missing”",
        body: "You already know what was in the first pack. Add the missing page once, re-export, and resend without rebuilding from scratch.",
      },
    ],
    capabilities: [
      {
        title: "Pack from vault truth",
        body: "Invoice images and related files come from the item you already maintain — not a last-minute camera roll dive.",
      },
      {
        title: "Letter + identity + invoices",
        body: "Structure matches what many Indian service flows ask for when proof must travel as one attachment.",
      },
      {
        title: "Originals stay home",
        body: "Export copies for the claim; the vault keeps the source documents for the next escalation.",
      },
    ],
    stages: [
      {
        title: "Select the item",
        body: "Start from the failed product so the right invoices and photos are in reach.",
      },
      {
        title: "Compose the pack",
        body: "Add letter and identity as needed, plus invoice images from the vault.",
      },
      {
        title: "Export and send",
        body: "Download the PDF, submit via brand channel, and keep the originals on the item.",
      },
    ],
    faqs: [
      {
        q: "Is an evidence pack an automatic brand filing?",
        a: "No. It is a PDF you export and submit yourself. Warrly does not push packs into a universal OEM API.",
      },
      {
        q: "What can go in the pack?",
        a: "Typically a letter, identity, and up to invoice images sourced from the item’s documents.",
      },
      {
        q: "Do I lose files after exporting?",
        a: "No. Export creates a pack for sending; originals remain on the item unless you delete them.",
      },
    ],
    honestNote:
      "Evidence packs help you submit cleanly. They are not a guaranteed approval, and they are not an automatic OEM filing.",
    afterThought:
      "Reviewers trust complete packets; households sleep better when the packet was built before the argument started.",
    image: ART.welcomeAccount,
    imageAlt: "Evidence organized for claims",
    related: [
      { to: "/personal/claims", label: "File a claim" },
      { to: "/personal/documents", label: "Documents & PDFs" },
    ],
  },
  {
    path: "/personal/claims-inbox",
    eyebrow: "Claims",
    title: "Claims inbox — status without the spreadsheet",
    lead: "Open claims deserve a home. See what is pending, what needs your reply, and what is closed — next to the item that started it.",
    layout: "story",
    problem:
      "Claim updates arrive as emails with no link back to the product or the files you already sent. Families lose the thread between “engineer assigned” and “bring the invoice again.”",
    solution:
      "Your claims inbox keeps each case visible with the related item and evidence. Mark filed, in_service, resolved, or denied so follow-ups take minutes, not archaeology.",
    bullets: [
      "Track draft through filed, in service, resolved, and denied",
      "Jump to the item and its documents instantly",
      "Know what still needs your attention",
      "Keep history after a claim resolves",
      "Pair with evidence packs when a centre asks again",
    ],
    scenarios: [
      {
        title: "Two open repairs",
        body: "A phone in service and a washing machine still in draft. The inbox shows both without mixing them into a generic todo list.",
      },
      {
        title: "Brand asks for another photo",
        body: "Open the claim, jump to the item, add the photo, refresh the pack, and mark that you responded.",
      },
      {
        title: "Closed but memorable",
        body: "Resolved last monsoon; this year the same unit fails. History on the claim helps you explain repeat issues calmly.",
      },
    ],
    capabilities: [
      {
        title: "Case list with context",
        body: "Each row stays tied to the item and the proof you used — not a floating ticket number.",
      },
      {
        title: "Statuses you set",
        body: "Filed, in_service, resolved, denied — honest labels for how the real-world process moved.",
      },
      {
        title: "Fast return paths",
        body: "From inbox to item documents to evidence pack without rebuilding mental context.",
      },
    ],
    stages: [
      {
        title: "Open the case",
        body: "Draft appears in the inbox when you start from a failed item.",
      },
      {
        title: "Work the middle",
        body: "Update to filed or in_service as engineers and brand channels respond.",
      },
      {
        title: "Land the outcome",
        body: "Mark resolved or denied and keep the trail for next time.",
      },
    ],
    faqs: [
      {
        q: "Does the inbox sync manufacturer portals?",
        a: "No. Statuses are yours to maintain. Warrly is not a universal OEM claims console.",
      },
      {
        q: "Can I reopen a resolved claim?",
        a: "You keep history on the item. Start a new draft if the same product fails again with fresh context.",
      },
      {
        q: "Where do evidence packs live relative to the inbox?",
        a: "Packs are built from the item; the inbox is where you track the case that used them.",
      },
    ],
    honestNote:
      "The claims inbox tracks your workflow. It does not pull live status from manufacturer systems or auto-update when a brand emails you.",
    afterThought:
      "Follow-ups shrink when every open repair has a home next to its invoice.",
    image: ART.emptyWarrly,
    imageAlt: "Claims tracked in Warrly",
    related: [
      { to: "/personal/claims", label: "File a claim" },
      { to: "/personal/evidence", label: "Evidence packs" },
    ],
  },
  {
    path: "/personal/camera-extract",
    eyebrow: "Capture",
    title: "Camera extract — turn paper into structured coverage",
    lead: "Point your camera at a receipt or warranty card. Warrly reads the fields that matter and asks you to confirm — not retype everything.",
    layout: "steps",
    problem:
      "Manual data entry is where good intentions die. Typos on dates and brands break reminders and claims later — especially on dense GST invoices.",
    solution:
      "On-device capture plus extract fills brand, dates, and amounts. You review once. The vault stays accurate because confirm is mandatory before save.",
    bullets: [
      "Frame — hold steady on store receipts, packing slips, or warranty cards",
      "Capture — snap with lighting that keeps GST stamps and totals readable",
      "Extract — suggested brand, purchase date, and amount fields appear for review",
      "Confirm — edit anything wrong; nothing saves until you approve",
      "Vault — item and proof land together so reminders can fire on real dates",
    ],
    scenarios: [
      {
        title: "Counter at a local electronics shop",
        body: "Paper GST bill, no email. Camera extract turns the stamp and totals into fields you confirm before you leave the store.",
      },
      {
        title: "Warranty card in the box",
        body: "No retailer PDF — just a card. Photograph it, confirm what you can read, and attach the image as proof.",
      },
      {
        title: "Faded kitchen-drawer receipt",
        body: "Extract may miss a field on a washed-out bill. You fill the gap manually on confirm — still faster than starting from a blank form.",
      },
    ],
    capabilities: [
      {
        title: "Receipt-aware capture",
        body: "Built for the paper India still hands you at retail counters and authorised dealers.",
      },
      {
        title: "Confirm gate",
        body: "Extract never silently overwrites truth. You own the final record.",
      },
      {
        title: "Works with other paths",
        body: "Camera sits beside gallery, PDF, email forward, and manual entry — same vault shape.",
      },
    ],
    stages: [
      {
        title: "Shoot",
        body: "Capture a clear image of the receipt or card while you still have good light.",
      },
      {
        title: "Review extract",
        body: "Check brand, dates, and amounts. Fix OCR mistakes before they become reminder mistakes.",
      },
      {
        title: "Save to vault",
        body: "Confirm to create the item with proof attached — coverage status and reminders can follow.",
      },
    ],
    faqs: [
      {
        q: "Does extract save automatically?",
        a: "No. You must confirm before save. That keeps wrong dates out of your reminder schedule.",
      },
      {
        q: "What if extract misreads a field?",
        a: "Edit on the confirm step. The image still attaches even if you type some fields by hand.",
      },
      {
        q: "Can I use gallery instead of live camera?",
        a: "Yes. Gallery and PDF uploads use the same extract-then-confirm idea.",
      },
    ],
    honestNote:
      "Extract quality depends on image clarity. Confirm is required — we do not silently trust OCR on GST bills.",
    afterThought:
      "The best OCR is the one you are allowed to correct before it becomes your warranty truth.",
    image: ART.welcomePersonal,
    imageAlt: "Camera extract reading a receipt",
    related: [
      { to: "/personal/receipts", label: "Add a receipt" },
      { to: "/personal/email-inbox", label: "Email invoice inbox" },
    ],
  },
  {
    path: "/personal/email-inbox",
    eyebrow: "Capture",
    title: "Email invoice inbox — catch online orders automatically",
    lead: "Most modern purchases arrive as email PDFs. Forward them into Warrly and keep coverage without hunting through years of mail.",
    layout: "steps",
    problem:
      "Order confirmations bury warranty terms. When a laptop fails two years later, the original Flipkart or Amazon tax invoice is a forgotten subject line.",
    solution:
      "Use Warrly’s invoice inbox workflow to bring email purchases into the same vault as store receipts — structured, searchable, claim-ready after you confirm fields.",
    bullets: [
      "Forward — send order invoices to your Warrly inbox address when configured",
      "Ingest — messages land for processing when email ingest is set up",
      "Extract — likely fields appear from the PDF or mail content",
      "Confirm — you approve before the item is saved to the vault",
      "File — proof sits on the item beside any camera captures you add later",
    ],
    scenarios: [
      {
        title: "Late-night marketplace order",
        body: "Forward the tax invoice while the unboxing excitement is fresh. Confirm fields in the morning; coverage starts clean.",
      },
      {
        title: "Cleaning a crowded Gmail",
        body: "Search old appliance orders, forward a batch, and rebuild vault entries without retyping every GST line.",
      },
      {
        title: "Shared household purchases",
        body: "Whoever receives the retailer mail can forward it; the item still lands in the shared vault after confirm.",
      },
    ],
    capabilities: [
      {
        title: "Online orders beside retail snaps",
        body: "Email invoices join the same item model as camera and PDF uploads.",
      },
      {
        title: "Confirm before vault write",
        body: "Ingest is not a silent dump. You still review extracted fields.",
      },
      {
        title: "Less Gmail archaeology",
        body: "When a claim starts, the invoice is on the item — not buried under promotional mail.",
      },
    ],
    stages: [
      {
        title: "Forward the invoice",
        body: "Send the retailer or marketplace mail/PDF to your configured Warrly inbox.",
      },
      {
        title: "Process & extract",
        body: "When ingest is configured, Warrly prepares fields for your review.",
      },
      {
        title: "Confirm into the vault",
        body: "Approve the record so reminders and claims can rely on it.",
      },
    ],
    faqs: [
      {
        q: "Is email ingest always on?",
        a: "It depends on inbox ingest configuration for your account or environment. Do not assume magic forever if ingest is not set up.",
      },
      {
        q: "Do forwarded mails save without my OK?",
        a: "No. Extract still expects confirm before the item becomes vault truth.",
      },
      {
        q: "What about WhatsApp invoice images?",
        a: "Save them to gallery or files, then use gallery/PDF capture — or photograph paper copies with camera extract.",
      },
    ],
    honestNote:
      "Email forward inbox exists, but it depends on ingest configuration. We do not promise every forward will land forever without setup.",
    afterThought:
      "Online shopping already emails you the proof — forwarding it is cheaper than finding it under stress.",
    image: ART.welcomeAccount,
    imageAlt: "Email invoices landing in Warrly",
    related: [
      { to: "/personal/camera-extract", label: "Camera extract" },
      { to: "/personal/documents", label: "Documents & PDFs" },
    ],
  },
  {
    path: "/personal/manual-entry",
    eyebrow: "Capture",
    title: "Manual entry when the receipt is gone — still better than nothing",
    lead: "Not every warranty starts with a perfect scan. Enter what you know. Attach what you have. Improve the record over time.",
    layout: "steps",
    problem:
      "Missing paperwork makes people give up entirely. Partial records still beat zero records when an authorised centre asks when you bought the unit.",
    solution:
      "Create an item manually with brand, dates, and notes. Add documents later as you find them. Coverage tracking and reminders still work on the dates you confirm.",
    bullets: [
      "Create — start an item without a perfect photo or PDF",
      "Fill — brand, model, purchase date, warranty end, and price as you remember",
      "Attach — add gallery images or PDFs whenever they turn up",
      "Confirm — treat manual fields as deliberate truth for reminders",
      "Improve — upgrade the record if a clearer invoice appears later",
    ],
    scenarios: [
      {
        title: "Cash purchase, lost slip",
        body: "You remember the shop and month. Enter the item, set a conservative warranty end, and attach a serial photo from the appliance badge.",
      },
      {
        title: "Inherited furniture warranty card",
        body: "Half-legible card from a relative. Manual entry preserves what you can read; status may stay unknown until dates firm up.",
      },
      {
        title: "Invoice found months later",
        body: "You started manual; then the GST PDF appears in downloads. Attach it, correct dates, and let reminders realign.",
      },
    ],
    capabilities: [
      {
        title: "Zero-barrier create",
        body: "No camera required to start tracking coverage you already own.",
      },
      {
        title: "Documents optional at first",
        body: "Add proof when life allows — the item does not wait for perfection.",
      },
      {
        title: "Same downstream features",
        body: "Reminders, coverage status, and claim drafts work from manual items just like extracted ones.",
      },
    ],
    stages: [
      {
        title: "Sketch the item",
        body: "Enter brand and the dates you trust enough to schedule against.",
      },
      {
        title: "Add what exists",
        body: "Serial photos, partial cards, or later PDFs attach as you find them.",
      },
      {
        title: "Tighten over time",
        body: "Correct fields when better proof arrives so status and protected value stay honest.",
      },
    ],
    faqs: [
      {
        q: "Should I skip Warrly if I lost the receipt?",
        a: "No. Manual entry plus a serial photo is still stronger than relying on memory during a claim call.",
      },
      {
        q: "Will status show unknown?",
        a: "It can, until dates are solid. Unknown is preferable to a fake active badge.",
      },
      {
        q: "Can I switch to extract later?",
        a: "Attach a clearer invoice when you find one and update fields — the item evolves.",
      },
    ],
    honestNote:
      "Manual entry is honest partial data. Reminders only help if the dates you type are roughly right.",
    afterThought:
      "A rough record you can open beats a perfect receipt you will “scan someday.”",
    image: ART.emptyWarrly,
    imageAlt: "Manually adding an item to Warrly",
    related: [
      { to: "/personal/receipts", label: "Add a receipt" },
      { to: "/personal/items", label: "My items" },
    ],
  },
  {
    path: "/security",
    eyebrow: "Security",
    title: "How we protect your warranty data",
    lead: "Your vault holds invoices, serials, and household details. That deserves careful defaults — scoped access, export when you want it, and delete when you do not.",
    problemTitle: "Why people hesitate to digitize bills",
    solutionTitle: "How Warrly scopes access",
    layout: "trust",
    problem:
      "People hesitate to digitize GST bills and serials when products hide behind vague badges. Theatre does not help; clear scope does.",
    solution:
      "Warrly scopes data to your account, household, or workspace. You decide what to share, export as JSON, or delete. No SOC 2 / ISO marketing wallpaper — just controls you can use.",
    bullets: [
      "Vaults scoped to personal, household, or business workspaces",
      "Access limited to members you invite",
      "Export JSON when you need a portable copy",
      "Delete account or items when you want something gone",
      "Plain-language privacy — not certification theatre",
    ],
    scenarios: [
      {
        title: "Uploading the first GST invoice",
        body: "You want to know who can see it. Personal vault stays yours until you invite household members.",
      },
      {
        title: "Roommate moves out",
        body: "Remove household access so shared coverage does not outlive the living arrangement.",
      },
      {
        title: "Leaving the product",
        body: "Export JSON for your records, delete items you do not want online, or delete the account when you are done.",
      },
    ],
    capabilities: [
      {
        title: "Scoped vaults",
        body: "Personal, household, and business contexts stay separated so invites do not leak across worlds.",
      },
      {
        title: "Invite-only access",
        body: "Members see what you share by invitation — not a public gallery of invoices.",
      },
      {
        title: "Export and delete",
        body: "Take a JSON export; remove items or the account when you want a clean exit.",
      },
    ],
    stages: [
      {
        title: "Capture into a scoped vault",
        body: "Invoices land where you put them — personal or business — not in a shared soup.",
      },
      {
        title: "Share deliberately",
        body: "Household or workspace invites expand access only as far as you allow.",
      },
      {
        title: "Exit cleanly",
        body: "Export JSON, delete items, or delete the account when coverage no longer belongs online.",
      },
    ],
    faqs: [
      {
        q: "Are you SOC 2 or ISO certified?",
        a: "We do not market certification theatre here. We focus on scoped vaults, export, and delete controls you can actually use.",
      },
      {
        q: "Who can see my household vault?",
        a: "You and the members you invite, within plan member caps.",
      },
      {
        q: "Can I get my data out?",
        a: "Yes. Export JSON for a portable copy, and delete items or your account when you want them gone.",
      },
    ],
    honestNote:
      "We describe scoped vaults, JSON export, and delete — not SOC 2, ISO, or encryption theatre. Read the privacy policy for legal detail.",
    afterThought:
      "Trust is an exit button you can find — and a vault that only opens for people you invited.",
    image: ART.allClear,
    imageAlt: "Peace of mind with protected warranty data",
    related: [
      { to: "/security/export", label: "Export & delete" },
      { to: "/privacy", label: "Privacy" },
    ],
  },
  {
    path: "/security/export",
    eyebrow: "Security",
    title: "Export & delete — your data, your exit",
    lead: "A trustworthy vault lets you leave with your files. Export JSON when you want a portable copy. Delete items or your account when you do not.",
    layout: "trust",
    problem:
      "Some apps make offboarding painful. That erodes trust the day you upload your first invoice — especially a GST bill with address lines you care about.",
    solution:
      "Take a JSON export for your own records. Remove items and attachments when coverage ends. Delete the account when you want a full exit — no hostage archives.",
    bullets: [
      "Export vault data as JSON for your own archives",
      "Delete items and attachments you no longer need",
      "Delete the account when you are ready to leave",
      "Keep claim history only as long as it helps you",
      "Pair with privacy terms written in plain language",
    ],
    scenarios: [
      {
        title: "Switching phones",
        body: "Export JSON before you wipe the old handset so purchase records are not trapped on one device story.",
      },
      {
        title: "Sold the car, dropped the warranty folder",
        body: "Delete the vehicle item and its documents once the sale paperwork is done elsewhere.",
      },
      {
        title: "Full offboarding",
        body: "Export what you want to keep, then delete the account so invoices are not sitting idle.",
      },
    ],
    capabilities: [
      {
        title: "JSON export",
        body: "A portable snapshot of vault data you can store on your own terms.",
      },
      {
        title: "Item-level delete",
        body: "Remove products and files without waiting for an annual purge email.",
      },
      {
        title: "Account delete",
        body: "Leave completely when Warrly is no longer where your coverage lives.",
      },
    ],
    stages: [
      {
        title: "Decide what to keep",
        body: "Export JSON if you want a personal archive outside the app.",
      },
      {
        title: "Remove what should go",
        body: "Delete items, documents, or lingering claim trails you no longer need.",
      },
      {
        title: "Exit if you are done",
        body: "Delete the account when offboarding is the honest next step.",
      },
    ],
    faqs: [
      {
        q: "What format is export?",
        a: "JSON — a portable copy of vault data for your own records.",
      },
      {
        q: "Can I delete just one item?",
        a: "Yes. Remove individual items and attachments, or delete the whole account.",
      },
      {
        q: "Do you hold data hostage after cancel?",
        a: "No. Export and delete exist so leaving is part of the product, not a support ticket maze.",
      },
    ],
    honestNote:
      "Export is JSON, not a branded PDF binder of every invoice. Delete removes what you choose — keep your own backups if you need long-term archives offline.",
    afterThought:
      "The right to leave is how digitised GST bills stay a choice, not a trap.",
    image: ART.welcomeAccount,
    imageAlt: "Exporting and managing vault data",
    related: [
      { to: "/security", label: "How we protect data" },
      { to: "/privacy", label: "Privacy policy" },
    ],
  },
  {
    path: "/business",
    eyebrow: "Business",
    title: "Asset warranties for teams that own real kit",
    lead: "Offices, clinics, cafés, fleets, and multi-site operators in India buy equipment constantly. Warrly Business turns warranties into an operations system — not a filing cabinet.",
    problemTitle: "Why teams lose coverage across sites",
    solutionTitle: "What a Pro workspace unlocks",
    layout: "hub",
    problem:
      "Finance has invoices. Facilities has serial stickers. IT has tickets. Nobody has a single answer to “is this still under warranty?” when something fails on a Tuesday.",
    solution:
      "A business vault with sites, QR asset tags, vendors, a scoped vendor portal, service logs, audits, and book-value reporting — so coverage is visible to the people who maintain and replace assets.",
    bullets: [
      "Organize assets by site and department",
      "Print and scan QR asset tags that open the record on the floor",
      "Track vendors, service logs, and claim-ready documents",
      "Invite vendors via token for service-log collaboration — not a full suite",
      "Book value with straight_line or WDV; export depreciation PDFs",
      "Audits as condition logging with overdue stats — not a guided walkthrough product",
    ],
    scenarios: [
      {
        title: "HVAC down in Bengaluru",
        body: "Facilities scans the QR on the outdoor unit, sees coverage and vendor contacts, and checks the last service log before approving a cash repair.",
      },
      {
        title: "Finance asks for exposure",
        body: "Book value and depreciation views roll up from purchase records already in the vault — not a weekend of invoice archaeology.",
      },
      {
        title: "Vendor on site for AMC",
        body: "Invite token opens a portal path to log service against the asset. Your team keeps the paper trail without turning WhatsApp into the CMMS.",
      },
    ],
    capabilities: [
      {
        title: "Sites & departments",
        body: "Map assets to where work happens so filters and audits match the floor plan.",
      },
      {
        title: "QR tags + service history",
        body: "Print tags, scan on mobile, open warranty, documents, and service logs in one motion.",
      },
      {
        title: "Vendors & portal",
        body: "Store counterparties; invite vendors with a token to contribute service logs in a scoped portal.",
      },
      {
        title: "Finance views",
        body: "Book value with straight_line or WDV methods, plus depreciation PDF export for leadership packs.",
      },
    ],
    faqs: [
      {
        q: "Is this a full CMMS or collaboration suite?",
        a: "No. Warrly Business focuses on warranty-aware asset records, QR tags, vendors, service logs, audits, and book value — not a universal work-order platform.",
      },
      {
        q: "What does the vendor portal include?",
        a: "Invite-token access tied to assets and service logs. It is not a full vendor collaboration suite.",
      },
      {
        q: "How do audits work?",
        a: "Condition logging plus overdue stats. It is not a guided walkthrough product with scripted room tours.",
      },
    ],
    honestNote:
      "Business features are ops-and-finance oriented: QR tags, vendors, service logs, book value, depreciation PDFs, and condition audits. Vendor portal and audits are intentionally scoped — not enterprise CMMS theatre.",
    afterThought:
      "The best warranty answer on a failed Tuesday is the one a technician can open from a QR on the machine.",
    image: ART.welcomeCorporate,
    imageAlt: "Business assets tracked with QR tags in Warrly",
    related: [
      { to: "/business/vault", label: "Business vault" },
      { to: "/business/asset-tags", label: "Asset tags" },
      { to: "/business/vendor-portal", label: "Vendor portal" },
      { to: "/plans", label: "Pro for teams" },
    ],
  },
  {
    path: "/business/vault",
    eyebrow: "Workspace",
    title: "Business vault — one register for covered assets",
    lead: "Stop splitting asset truth across spreadsheets and email. The business vault is the system of record for what you own and what covers it.",
    layout: "ops",
    problem:
      "When assets multiply across rooms and cities, warranty knowledge evaporates with staff turnover — and the GST invoice lives in a finance share nobody on the floor can open.",
    solution:
      "A shared workspace vault keeps purchase proof, warranty windows, sites, vendors, and service context available to the roles that need them.",
    bullets: [
      "Shared access for operations and finance roles",
      "Items linked to sites, vendors, and documents",
      "Coverage status visible before you approve a repair",
      "Scales from a single location to multi-site estates",
      "Feeds book value, audits, and QR tag workflows",
    ],
    scenarios: [
      {
        title: "New site go-live",
        body: "Procurement drops invoices into the vault as kit arrives. Ops assigns sites and prints QR tags before opening day.",
      },
      {
        title: "Night shift failure",
        body: "Someone who never met the buyer still opens the asset, sees coverage, and calls the right vendor.",
      },
      {
        title: "Quarterly leadership review",
        body: "Finance pulls book value from the same register ops uses on the floor — one source, fewer reconciliations.",
      },
    ],
    capabilities: [
      {
        title: "Workspace system of record",
        body: "Assets, documents, and coverage live together instead of across three tools.",
      },
      {
        title: "Ops + finance visibility",
        body: "Repair decisions and value rollups read from the same purchase-backed items.",
      },
      {
        title: "Hook for downstream ops",
        body: "Sites, tags, vendors, service logs, audits, and depreciation all hang off the vault.",
      },
    ],
    stages: [
      {
        title: "Capture assets",
        body: "Add equipment with invoices and warranty windows as purchases land.",
      },
      {
        title: "Structure the estate",
        body: "Assign sites, departments, vendors, and QR tags so the floor matches the register.",
      },
      {
        title: "Operate from one truth",
        body: "Service logs, audits, and book value report from the same vault.",
      },
    ],
    faqs: [
      {
        q: "Is the business vault separate from personal?",
        a: "Yes. Workspaces keep team assets scoped away from household vaults.",
      },
      {
        q: "Can finance and facilities both use it?",
        a: "That is the point — shared records with roles that need coverage and value in the same place.",
      },
      {
        q: "Does the vault replace accounting software?",
        a: "No. Book value and depreciation views support conversations; your ledger of record stays elsewhere.",
      },
    ],
    honestNote:
      "The business vault is a warranty-aware asset register, not a full ERP or CMMS replacement.",
    afterThought:
      "Turnover hurts less when the machine’s history is on the machine’s record — not in someone’s inbox.",
    image: ART.welcomeCorporate,
    imageAlt: "Business vault for team assets",
    related: [
      { to: "/business/sites", label: "Sites & departments" },
      { to: "/business/book-value", label: "Book value" },
    ],
  },
  {
    path: "/business/sites",
    eyebrow: "Workspace",
    title: "Sites & departments — coverage mapped to where work happens",
    lead: "Assets live in places. Structure your vault by site and department so the right team finds the right record in seconds.",
    layout: "ops",
    problem:
      "A flat inventory of 800 assets is noise. People need “floor 2 HVAC” or “Bengaluru warehouse scanners,” not a global dump.",
    solution:
      "Sites and departments organize ownership and accountability without forcing a separate spreadsheet per location.",
    bullets: [
      "Group assets by physical site or logical department",
      "Filter coverage and expiries by location",
      "Assign operational ownership clearly",
      "Support condition audits that report by site",
      "Keep multi-city estates readable for ops leads",
    ],
    scenarios: [
      {
        title: "Clinic network",
        body: "Each clinic is a site; radiology is a department. Expiring warranties filter to the location that needs action this week.",
      },
      {
        title: "Warehouse vs HQ",
        body: "Scanners and dock equipment stay under the warehouse site so HQ office kit does not clutter floor audits.",
      },
      {
        title: "Facilities handoff",
        body: "A new site manager inherits a structured list — not a spreadsheet named final_v7.",
      },
    ],
    capabilities: [
      {
        title: "Site structure",
        body: "Physical locations keep filters and audits aligned with how teams actually walk the floor.",
      },
      {
        title: "Department slices",
        body: "Logical groups (IT, kitchen, clinical) help owners see their slice of coverage.",
      },
      {
        title: "Audit-friendly lists",
        body: "Condition logging and overdue stats can be read in site context.",
      },
    ],
    stages: [
      {
        title: "Define sites",
        body: "Create locations that match how you staff and budget.",
      },
      {
        title: "Assign assets",
        body: "Place items into sites and departments as they are commissioned.",
      },
      {
        title: "Operate locally",
        body: "Filter expiries, tags, and audits to the place that needs attention.",
      },
    ],
    faqs: [
      {
        q: "Do I need sites for a single shop?",
        a: "One site still helps if you grow — but a small team can start simple and add structure later.",
      },
      {
        q: "Are departments mandatory?",
        a: "Use them when ownership splits across functions; skip them when a flat site list is enough.",
      },
      {
        q: "Do audits require sites?",
        a: "Sites make condition logging and overdue stats easier to read; audits themselves are logging + stats, not guided tours.",
      },
    ],
    honestNote:
      "Sites and departments are organizational filters — not an automatic floor-plan or IoT map of your building.",
    afterThought:
      "Coverage questions get shorter when the list already knows which city and which floor you mean.",
    image: ART.emptySitesPng,
    imageAlt: "Sites organized in Warrly Business",
    related: [
      { to: "/business/asset-tags", label: "Asset tags" },
      { to: "/business/audits", label: "Audits" },
    ],
  },
  {
    path: "/business/asset-tags",
    eyebrow: "Workspace",
    title: "Asset tags (QR) — the physical world opens the digital record",
    lead: "Print a QR, stick it on the asset, scan it on the floor. Open the warranty, documents, and service history instantly.",
    layout: "ops",
    problem:
      "Technicians waste time identifying equipment and hunting paperwork while a line is down — serial stickers alone do not open the GST invoice.",
    solution:
      "QR asset tags bridge the machine in front of you and the vault record behind it — serials, coverage, vendors, and files included. Print and scan are first-class.",
    bullets: [
      "Generate and print QR tags for assets",
      "Scan on mobile to open the item record",
      "Reduce misidentification during repairs",
      "Keep tags aligned with sites and departments",
      "Jump into service logs without a desktop scavenger hunt",
    ],
    scenarios: [
      {
        title: "Café espresso machine fault",
        body: "Manager scans the tag, confirms warranty status, and pulls the vendor contact before calling a cash technician.",
      },
      {
        title: "IT closet refresh",
        body: "Print a sheet of QR labels, tag switches and APs as they go live, and stop relying on marker-pen inventory.",
      },
      {
        title: "Wrong unit almost serviced",
        body: "Two similar chillers; the scan opens the correct serial and service history before work begins.",
      },
    ],
    capabilities: [
      {
        title: "Print workflow",
        body: "Generate QR tags meant to live on the physical asset — not only in a PDF folder.",
      },
      {
        title: "Scan-to-record",
        body: "Mobile scan opens coverage, documents, and related ops context on site.",
      },
      {
        title: "Floor accuracy",
        body: "Fewer mistaken identities when similar assets sit side by side.",
      },
    ],
    stages: [
      {
        title: "Create the asset",
        body: "Ensure the vault record exists with the right site and documents.",
      },
      {
        title: "Print & apply",
        body: "Generate the QR, print, and stick it where technicians will actually look.",
      },
      {
        title: "Scan in anger",
        body: "On failure day, scan first — then decide repair, claim, or replace.",
      },
    ],
    faqs: [
      {
        q: "Do tags require special hardware?",
        a: "Print QR labels and scan with a normal phone camera workflow in the app — no exotic scanners required for the core loop.",
      },
      {
        q: "What if a tag is damaged?",
        a: "Reprint from the asset record and replace the label; the vault item remains the source of truth.",
      },
      {
        q: "Are tags tied to sites?",
        a: "Assets (and therefore tags) can sit in sites and departments so floor walks stay organized.",
      },
    ],
    honestNote:
      "QR tags open Warrly records. They are not an IoT sensor network or automatic condition monitor.",
    afterThought:
      "If the machine can wear a sticker, the warranty should be one scan away.",
    image: ART.welcomeCorporate,
    imageAlt: "QR asset tags on office equipment",
    related: [
      { to: "/business/service-logs", label: "Service logs" },
      { to: "/business/vendors", label: "Vendors" },
    ],
  },
  {
    path: "/business/vendors",
    eyebrow: "Operations",
    title: "Vendors — who sold it, who services it, who answers claims",
    lead: "Warranty outcomes depend on the right counterparty. Keep vendor contacts and history next to the assets they cover.",
    layout: "ops",
    problem:
      "When a unit fails, teams dig through procurement email to find who to call — then discover the warranty contact is different from the AMC vendor.",
    solution:
      "Vendor records sit beside assets and service logs, so escalation paths are part of the vault — not tribal knowledge. Pair with the vendor portal when you want tokenized service-log collaboration.",
    bullets: [
      "Store vendor contacts with each relevant asset",
      "See which assets belong to which supplier",
      "Support claim and service escalation faster",
      "Keep procurement context available to operations",
      "Invite vendors into a scoped portal when needed",
    ],
    scenarios: [
      {
        title: "AMC vs warranty confusion",
        body: "Ops sees both the OEM contact and the AMC vendor on the asset before promising a timeline to leadership.",
      },
      {
        title: "Multi-site lift maintenance",
        body: "Filter assets by vendor to see where one contractor is overdue on service logs.",
      },
      {
        title: "Procurement exit interview",
        body: "Vendor records survive the employee who negotiated the deal — contacts stay on the asset.",
      },
    ],
    capabilities: [
      {
        title: "Counterparty directory",
        body: "Names, contacts, and linked assets in one ops-readable place.",
      },
      {
        title: "Escalation without archaeology",
        body: "Open the asset, see who to call, and check the last service log.",
      },
      {
        title: "Portal-ready",
        body: "When collaboration is needed, invite via the vendor portal token flow for service logs.",
      },
    ],
    stages: [
      {
        title: "Register vendors",
        body: "Capture who sells and who services — they are not always the same.",
      },
      {
        title: "Link to assets",
        body: "Attach vendors to the equipment they cover across sites.",
      },
      {
        title: "Escalate with context",
        body: "On failure, contact the right party with documents and history already open.",
      },
    ],
    faqs: [
      {
        q: "Is this a full vendor management suite?",
        a: "No. It is warranty-aware vendor records plus optional portal invites for service logs — not end-to-end procurement software.",
      },
      {
        q: "Can one vendor cover many assets?",
        a: "Yes. Link the same vendor across the estate and filter when you need their footprint.",
      },
      {
        q: "How do vendors enter the portal?",
        a: "Through an invite token tied to the scoped vendor portal experience.",
      },
    ],
    honestNote:
      "Vendors in Warrly are operational counterparties for coverage and service — not a complete SRM, P2P, or chat suite.",
    afterThought:
      "The right phone number next to the broken asset is an underrated SLA.",
    image: ART.welcomeCorporate,
    imageAlt: "Vendor relationships in Warrly Business",
    related: [
      { to: "/business/vendor-portal", label: "Vendor portal" },
      { to: "/business/service-logs", label: "Service logs" },
    ],
  },
  {
    path: "/business/vendor-portal",
    eyebrow: "Operations",
    title: "Vendor portal — scoped collaboration around service logs",
    lead: "Some repairs need the vendor in the loop. Invite them with a token so service updates land on the asset — without pretending this is a full collaboration suite.",
    layout: "ops",
    problem:
      "Ad-hoc WhatsApp and email threads create conflicting stories about what was promised and what was done on multi-week repairs.",
    solution:
      "Bring vendors into a controlled portal experience via invite token, tied to assets and service logs — so updates land where your team already works.",
    bullets: [
      "Invite vendors with a token — access stays scoped",
      "Share the right asset context for the job",
      "Collect service-log updates in one place",
      "Reduce lost threads during multi-week repairs",
      "Preserve history finance and ops can both trust",
    ],
    scenarios: [
      {
        title: "Compressor replacement week",
        body: "OEM partner logs visits against the asset through the portal instead of scattering photos across a group chat.",
      },
      {
        title: "AMC seasonal visit",
        body: "Vendor marks the service log; your site lead sees completion without chasing a PDF on email.",
      },
      {
        title: "Dispute over “we already came”",
        body: "Service-log history on the asset settles the argument with timestamps your team owns.",
      },
    ],
    capabilities: [
      {
        title: "Token invites",
        body: "Vendors join through an invite token — not an open public board of your estate.",
      },
      {
        title: "Asset-tied context",
        body: "Collaboration stays around the machine and its documents.",
      },
      {
        title: "Service-log focus",
        body: "Built for logging work done — not endless project chat or file-dump chaos.",
      },
    ],
    stages: [
      {
        title: "Invite",
        body: "Send a portal invite token to the vendor who should log work.",
      },
      {
        title: "Work the asset",
        body: "Vendor sees scoped context and records service against the item.",
      },
      {
        title: "Retain the trail",
        body: "Your team keeps the history for audits, claims, and handovers.",
      },
    ],
    faqs: [
      {
        q: "Is this a full vendor collaboration suite?",
        a: "No. It is invite-token access oriented around assets and service logs — intentionally scoped.",
      },
      {
        q: "Can vendors see my whole estate?",
        a: "Access is scoped via the invite. Do not treat it like broadcasting every site to every contractor.",
      },
      {
        q: "Do vendors replace my internal service logs?",
        a: "They contribute to the same asset history your team uses — you still own the vault.",
      },
    ],
    honestNote:
      "Vendor portal = invite token + asset context + service logs. Not a full collaboration, ticketing, or document-management suite.",
    afterThought:
      "A repair story should live on the asset — not in a WhatsApp thread that leaves with someone’s phone.",
    image: ART.welcomeCorporate,
    imageAlt: "Vendor collaboration around assets",
    related: [
      { to: "/business/vendors", label: "Vendors" },
      { to: "/business/service-logs", label: "Service logs" },
    ],
  },
  {
    path: "/business/service-logs",
    eyebrow: "Operations",
    title: "Service logs — maintenance history that survives staff changes",
    lead: "Warranties and service history belong together. Log work done, parts replaced, and outcomes against the asset — not in a private notebook.",
    layout: "ops",
    problem:
      "When the person who “knew that machine” leaves, the next technician starts from zero — and warranty decisions ignore what already failed twice.",
    solution:
      "Service logs attach to the asset record, so coverage decisions and repair choices are informed by what already happened. Vendors can contribute through the scoped portal when invited.",
    bullets: [
      "Record service events against each asset",
      "Keep notes and outcomes with the warranty context",
      "Support handovers between shifts and sites",
      "Spot repeat failures before you renew or replace",
      "Accept portal contributions without losing ownership",
    ],
    scenarios: [
      {
        title: "Repeat board failure",
        body: "Two prior logs show the same PCB swap. Ops pushes harder on warranty instead of paying cash again.",
      },
      {
        title: "Shift handover",
        body: "Night tech reads the afternoon log on a scanned QR before touching the line equipment.",
      },
      {
        title: "AMC audit trail",
        body: "Leadership asks if visits happened. Service logs on the asset answer without assembling email screenshots.",
      },
    ],
    capabilities: [
      {
        title: "Asset-native history",
        body: "Every log hangs on the machine that received the work.",
      },
      {
        title: "Warranty-aware decisions",
        body: "Coverage status sits beside what already failed or was fixed.",
      },
      {
        title: "Handover resilience",
        body: "Staffing changes do not erase the maintenance story.",
      },
    ],
    stages: [
      {
        title: "Open the asset",
        body: "Scan the QR or find the item in the site list.",
      },
      {
        title: "Log the work",
        body: "Capture what was done, parts, and outcome — internally or via vendor portal.",
      },
      {
        title: "Decide next",
        body: "Use history plus coverage to renew, claim, or replace.",
      },
    ],
    faqs: [
      {
        q: "Is this a full CMMS with work orders?",
        a: "Service logs record history on assets. It is not a complete work-order or scheduling CMMS.",
      },
      {
        q: "Can vendors write logs?",
        a: "Yes, when invited through the scoped vendor portal token flow.",
      },
      {
        q: "Do logs affect book value?",
        a: "Logs inform ops decisions; book value and depreciation come from purchase and method settings, not from each service note.",
      },
    ],
    honestNote:
      "Service logs are maintenance history on the asset — useful and durable, not a full CMMS with scheduling, SLAs, and parts inventory.",
    afterThought:
      "Machines remember nothing; the vault has to remember for them.",
    image: ART.emptySitesPng,
    imageAlt: "Service history on business assets",
    related: [
      { to: "/business/asset-tags", label: "Asset tags" },
      { to: "/business/audits", label: "Audits" },
    ],
  },
  {
    path: "/business/book-value",
    eyebrow: "Reports",
    title: "Book value — what your covered estate is worth on paper",
    lead: "Finance needs numbers. Operations needs coverage. Book value reporting connects purchase records to the assets still on the floor.",
    layout: "ops",
    problem:
      "Asset registers and warranty folders rarely reconcile. Leadership asks for exposure; teams answer with estimates pulled from three spreadsheets.",
    solution:
      "Roll up purchase-backed value from the vault with straight_line or WDV methods so replace-vs-repair conversations start from shared facts. Pair with depreciation PDF export when stakeholders need a portable view.",
    bullets: [
      "See value tied to items in the business vault",
      "Choose straight_line or WDV for depreciation-aware views",
      "Filter by site when leadership asks about a location",
      "Support replace-or-repair decisions with coverage context",
      "Export depreciation PDFs when finance needs something portable",
    ],
    scenarios: [
      {
        title: "Capex committee",
        body: "Show book value for a site’s ageing kit beside warranty status before approving replacements.",
      },
      {
        title: "Insurance questionnaire",
        body: "Purchase-backed totals from the vault beat a guess typed into a broker form at midnight.",
      },
      {
        title: "Franchise rollout",
        body: "Compare book value across new sites as equipment lands and invoices are captured.",
      },
    ],
    capabilities: [
      {
        title: "Purchase-backed rollups",
        body: "Numbers come from asset records you already maintain — not a parallel finance shadow file.",
      },
      {
        title: "straight_line and WDV",
        body: "Pick the method that matches how your team discusses depreciation.",
      },
      {
        title: "Site filters",
        body: "Answer location-specific questions without exporting the whole estate every time.",
      },
    ],
    stages: [
      {
        title: "Keep purchase truth current",
        body: "Invoices and prices on assets make book value meaningful.",
      },
      {
        title: "Select method",
        body: "Use straight_line or WDV according to how finance wants to read the estate.",
      },
      {
        title: "Report & decide",
        body: "Share views or depreciation PDFs; decide repair vs replace with coverage in frame.",
      },
    ],
    faqs: [
      {
        q: "Is book value an appraisal?",
        a: "No. It is derived from purchase records and depreciation methods in the vault — not a market valuation service.",
      },
      {
        q: "Which depreciation methods are supported?",
        a: "straight_line and WDV (written-down value).",
      },
      {
        q: "Can I give finance a PDF?",
        a: "Yes — use depreciation PDF export alongside book-value views.",
      },
    ],
    honestNote:
      "Book value here is vault math from purchase data and straight_line/WDV — not a certified valuation or accounting-system replacement.",
    afterThought:
      "Replace-vs-repair gets kinder when ops and finance are staring at the same purchase-backed number.",
    image: ART.welcomeCorporate,
    imageAlt: "Book value reporting for assets",
    related: [
      { to: "/business/depreciation", label: "Depreciation PDF" },
      { to: "/business/vault", label: "Business vault" },
    ],
  },
  {
    path: "/business/audits",
    eyebrow: "Reports",
    title: "Audits — condition logging and overdue clarity",
    lead: "Know what is on the floor and what is slipping. Audits in Warrly are condition logging plus overdue stats — practical, not a theatrical guided walkthrough product.",
    layout: "ops",
    problem:
      "Clipboard audits drift from the digital record within a week. Missing tags and ghost assets stay invisible until a failure or a finance surprise.",
    solution:
      "Use sites, QR tags, and condition logging together. Track overdue stats so neglected assets surface — without promising a scripted room-by-room tour product.",
    bullets: [
      "Log condition against assets in the live register",
      "Read overdue stats to see what is slipping",
      "Scan tags to confirm identity while you walk",
      "Flag missing documents during checks",
      "Leave with a cleaner register, not a pile of notes",
    ],
    scenarios: [
      {
        title: "Month-end facilities sweep",
        body: "Walk a site, scan tags, log condition, and review overdue stats for anything skipped last cycle.",
      },
      {
        title: "Ghost asset hunt",
        body: "Register says twelve printers; floor shows ten. Condition logging and site lists make the gap visible.",
      },
      {
        title: "Prep for insurer visit",
        body: "Overdue stats highlight units that have not been checked — fix the record before someone else asks.",
      },
    ],
    capabilities: [
      {
        title: "Condition logging",
        body: "Record what you observe on the asset — tied to the vault item, not a disposable clipboard.",
      },
      {
        title: "Overdue stats",
        body: "See what has slipped past expected attention without inventing a separate BI project.",
      },
      {
        title: "QR-assisted identity",
        body: "Scan to confirm you are logging the right machine in a crowded room.",
      },
    ],
    stages: [
      {
        title: "Pick a site",
        body: "Filter the register to the location you are actually walking.",
      },
      {
        title: "Log condition",
        body: "Scan, confirm identity, note condition, and spot missing documents.",
      },
      {
        title: "Review overdue",
        body: "Use overdue stats to schedule the next pass on what slipped.",
      },
    ],
    faqs: [
      {
        q: "Is this a guided audit walkthrough product?",
        a: "No. Audits mean condition logging and overdue stats — not a scripted guided-tour experience.",
      },
      {
        q: "Do I need QR tags to audit?",
        a: "Tags help identity on the floor; you can still work from site lists when labels are missing.",
      },
      {
        q: "Are audits compliance certifications?",
        a: "No. They help your team keep the register honest. They are not ISO/SOC evidence packs.",
      },
    ],
    honestNote:
      "Audits = condition logging + overdue stats. Not a guided walkthrough product, not a compliance certification engine.",
    afterThought:
      "The register only stays true if someone on the floor can log what they see — and see what they skipped.",
    image: ART.emptySitesPng,
    imageAlt: "Auditing assets with Warrly",
    related: [
      { to: "/business/asset-tags", label: "Asset tags" },
      { to: "/business/sites", label: "Sites & departments" },
    ],
  },
  {
    path: "/business/depreciation",
    eyebrow: "Reports",
    title: "Depreciation PDF — finance-ready views from the same vault",
    lead: "When you need a portable depreciation or book-value snapshot, export from the system that already holds purchase proof — with straight_line or WDV behind the numbers.",
    layout: "ops",
    problem:
      "Building depreciation sheets by hand from GST invoices is slow and error-prone — especially across sites with different commission dates.",
    solution:
      "Generate PDF views rooted in vault data so finance and operations argue from the same source of truth. Methods stay explicit: straight_line or WDV.",
    bullets: [
      "Export PDF summaries for stakeholders",
      "Ground numbers in purchase records already captured",
      "Use straight_line or WDV consistently with book value",
      "Reduce spreadsheet duplication across teams",
      "Pair with site filters when leadership asks about one location",
    ],
    scenarios: [
      {
        title: "Board pack Friday",
        body: "Export a depreciation PDF from the vault instead of copy-pasting invoice lines into slides.",
      },
      {
        title: "Auditor requests support",
        body: "Show purchase-backed schedules tied to assets finance already recognizes — then point to source invoices in the vault.",
      },
      {
        title: "Site closure math",
        body: "Filter to the closing location, export, and discuss remaining book value with eyes open.",
      },
    ],
    capabilities: [
      {
        title: "PDF export",
        body: "Portable depreciation views for people who will not live in the app.",
      },
      {
        title: "Method clarity",
        body: "straight_line and WDV stay aligned with book-value discussions.",
      },
      {
        title: "Single source",
        body: "Same purchase records ops uses for warranties feed the finance PDF.",
      },
    ],
    stages: [
      {
        title: "Maintain asset costs",
        body: "Keep purchase prices and dates accurate in the business vault.",
      },
      {
        title: "Choose method",
        body: "Apply straight_line or WDV as your finance conversation requires.",
      },
      {
        title: "Export PDF",
        body: "Share a portable snapshot without forking another spreadsheet.",
      },
    ],
    faqs: [
      {
        q: "Which methods are supported?",
        a: "straight_line and WDV (written-down value).",
      },
      {
        q: "Is the PDF a statutory filing?",
        a: "No. It is a report from vault data to support internal and stakeholder conversations.",
      },
      {
        q: "Does export change the vault?",
        a: "No. PDF export is a snapshot; source assets and invoices stay where they are.",
      },
    ],
    honestNote:
      "Depreciation PDFs are operational reports from vault purchase data using straight_line or WDV — not a replacement for your accounting system or CA’s schedules.",
    afterThought:
      "Finance trusts numbers more when they come from the same invoices ops already filed for warranty.",
    image: ART.welcomeCorporate,
    imageAlt: "Depreciation reporting from Warrly",
    related: [
      { to: "/business/book-value", label: "Book value" },
      { to: "/plans", label: "Pro for teams" },
    ],
  },
];

export function getFeaturePage(path: string) {
  return featurePages.find((p) => p.path === path);
}
