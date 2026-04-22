import { useState, useRef, useEffect } from "react";

// ─── TASS Brand Colours ───────────────────────────────────────────────────────
const NAVY = "#0D1B3E";
const TEAL = "#1A9E8F";
const AMBER = "#F4A623";

// ─── Shared TASS Brand Logo ───────────────────────────────────────────────────
function TASSLogo({ size = "md", theme = "light" }) {
  const scales = {
    sm: { the: 9,  main: 18, sub: 16, tag: 9,  ruleW: 16, ruleH: 1.5, gap: 2 },
    md: { the: 11, main: 24, sub: 22, tag: 11, ruleW: 22, ruleH: 2,   gap: 3 },
    lg: { the: 14, main: 32, sub: 29, tag: 13, ruleW: 28, ruleH: 2,   gap: 4 },
  };
  const s = scales[size] || scales.md;
  const navy   = theme === "dark" ? "#fff"  : NAVY;
  const teal   = TEAL;
  const tagCol = theme === "dark" ? "rgba(255,255,255,0.5)" : "#6B7FA3";
  const tagBold = theme === "dark" ? "rgba(255,255,255,0.75)" : "#3D4F6B";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: s.gap, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: s.ruleW, height: s.ruleH, background: teal, borderRadius: 99 }} />
        <span style={{ color: teal, fontSize: s.the, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", lineHeight: 1 }}>THE</span>
        <div style={{ width: s.ruleW, height: s.ruleH, background: teal, borderRadius: 99 }} />
      </div>
      <div style={{ color: navy, fontSize: s.main, fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1, marginTop: -1 }}>APPRENTICESHIP</div>
      <div style={{ color: teal, fontSize: s.sub, fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1, marginTop: -3 }}>SUCCESS SYSTEM™</div>
      <div style={{ width: "70%", height: s.ruleH, background: teal, borderRadius: 99 }} />
      <div style={{ color: tagCol, fontSize: s.tag, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400, marginTop: 1 }}>
        Stop Guessing.{" "}<strong style={{ fontWeight: 800, color: tagBold }}>Start Securing.</strong>
      </div>
    </div>
  );
}

// ─── Module nav ───────────────────────────────────────────────────────────────
const MODULES = [
  { id: "welcome",    label: "🏠 Home",           icon: "🏠" },
  { id: "research",   label: "🔍 Research",        icon: "🔍" },
  { id: "mjs",        label: "🌐 MyJobScotland",   icon: "🌐" },
  { id: "cv",         label: "📄 CV Builder",      icon: "📄" },
  { id: "wordtest",   label: "✏️ Language",        icon: "✏️" },
  { id: "interview",  label: "🎤 Interview",       icon: "🎤" },
  { id: "casestudies",label: "📚 Case Studies",    icon: "📚" },
  { id: "coach",      label: "🤖 AI Coach",        icon: "🤖" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

// Category colour map
const CAT_STYLES = {
  spelling:     { label: "Spelling",              bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", dot: "#3B82F6" },
  punctuation:  { label: "Punctuation",           bg: "#F5F3FF", border: "#DDD6FE", text: "#5B21B6", dot: "#7C3AED" },
  grammar:      { label: "Grammar",               bg: "#FFF7ED", border: "#FED7AA", text: "#92400E", dot: "#F59E0B" },
  formal:       { label: "Formal vs Informal",    bg: "#F0FDF4", border: "#BBF7D0", text: "#14532D", dot: "#10B981" },
};

// Mixed language test — 20 questions across 4 categories
const LANG_QUESTIONS = [
  // ── SPELLING ──────────────────────────────────────────────────────────────
  {
    category: "spelling",
    question: "Which spelling is correct for a word meaning 'to confirm or check'?",
    options: ["Verfiy", "Verify", "Verifiy", "Verrify"],
    correct: 1,
    explain: "'Verify' is correct. A common error is transposing the 'i' and 'y'. Used in council work: 'Please verify your address before we update the record.'"
  },
  {
    category: "spelling",
    question: "Which sentence contains a spelling error?",
    options: [
      "The customer recieved a confirmation letter.",
      "The customer received a confirmation letter.",
      "Please acknowledge the customer's enquiry.",
      "The council provides accessible services."
    ],
    correct: 0,
    explain: "'Recieved' is incorrect — the rule is 'i before e except after c'. The correct spelling is 'received'. This is one of the most common errors in customer correspondence."
  },
  {
    category: "spelling",
    question: "Choose the correctly spelled word meaning 'happening at regular intervals'.",
    options: ["Occassionally", "Occasionally", "Ocasionally", "Occasionaly"],
    correct: 1,
    explain: "'Occasionally' — double 'c', double 'l'. A word often misspelled in formal emails and reports."
  },
  {
    category: "spelling",
    question: "A colleague writes: 'The resident was greatful for our help.' What is wrong?",
    options: [
      "Nothing — it is correct.",
      "'Greatful' is misspelled — it should be 'grateful'.",
      "'Resident' is misspelled.",
      "'Help' should be 'assistance'."
    ],
    correct: 1,
    explain: "'Grateful' — not 'greatful'. There is no 'great' in grateful. This misspelling appears frequently in written communications."
  },
  {
    category: "spelling",
    question: "Which word correctly completes this sentence? 'The council will ___ the complaint within 10 working days.'",
    options: ["Adress", "Addres", "Address", "Adres"],
    correct: 2,
    explain: "'Address' — double 'd', double 's'. A word that appears constantly in council correspondence and is frequently misspelled."
  },

  // ── PUNCTUATION ───────────────────────────────────────────────────────────
  {
    category: "punctuation",
    question: "Which sentence uses an apostrophe correctly?",
    options: [
      "The council's services are available online.",
      "The councils services are available online.",
      "The council's service's are available online.",
      "The councils' service's are available online."
    ],
    correct: 0,
    explain: "'Council's' shows possession — the services belonging to the council. Apostrophes are not used to make words plural. This is one of the most common punctuation errors in written communications."
  },
  {
    category: "punctuation",
    question: "Which sentence is punctuated correctly?",
    options: [
      "Thank you for you're enquiry we will respond shortly.",
      "Thank you for your enquiry, we will respond shortly.",
      "Thank you for your enquiry. We will respond shortly.",
      "Thank you for your enquiry we will respond shortly."
    ],
    correct: 2,
    explain: "Two separate sentences need a full stop between them, not a comma (comma splice). 'You're' means 'you are' — 'your' is the possessive form needed here."
  },
  {
    category: "punctuation",
    question: "A colleague sends: 'Its important that residents complete their forms.' What punctuation error is present?",
    options: [
      "No error — the sentence is correct.",
      "'Its' should be 'It's' — the apostrophe is missing.",
      "A comma is needed after 'important'.",
      "'Residents' needs an apostrophe."
    ],
    correct: 1,
    explain: "'It's' = 'it is' (apostrophe for contraction). 'Its' = belonging to it (possessive, no apostrophe). This is one of the most common errors in professional writing. 'It's important that...' is correct here."
  },
  {
    category: "punctuation",
    question: "Which option uses commas correctly in a list?",
    options: [
      "Please bring your passport driving licence, and proof of address.",
      "Please bring your passport, driving licence, and proof of address.",
      "Please bring your passport, driving licence and, proof of address.",
      "Please bring your, passport, driving licence, and proof of address."
    ],
    correct: 1,
    explain: "Items in a list are separated by commas. The comma before 'and' in the final item (Oxford comma) is optional in UK English but helps clarity. Commas must not appear between a verb and its object."
  },
  {
    category: "punctuation",
    question: "Choose the correctly punctuated professional email sign-off.",
    options: [
      "Kind regards Sarah Jones Customer Service Team",
      "Kind regards, Sarah Jones, Customer Service Team.",
      "Kind regards\nSarah Jones\nCustomer Service Team",
      "Kind regards: Sarah Jones — Customer Service Team"
    ],
    correct: 2,
    explain: "Email sign-offs use line breaks, not commas, to separate name and job title/team. Each element sits on its own line. Colons and dashes are not used in standard professional sign-offs."
  },

  // ── GRAMMAR ───────────────────────────────────────────────────────────────
  {
    category: "grammar",
    question: "Which sentence is grammatically correct?",
    options: [
      "Me and my colleague dealt with the complaint.",
      "My colleague and I dealt with the complaint.",
      "My colleague and me dealt with the complaint.",
      "I and my colleague dealt with the complaint."
    ],
    correct: 1,
    explain: "'My colleague and I' is correct as the subject of the sentence. A quick test: remove 'my colleague and' — 'I dealt with the complaint' sounds right, 'me dealt with the complaint' does not. This error is very common in spoken and written communication."
  },
  {
    category: "grammar",
    question: "Which sentence uses the correct verb agreement?",
    options: [
      "The team are working on several complaints.",
      "The team is working on several complaints.",
      "The team were working on several complaint.",
      "The team works on several complaints today."
    ],
    correct: 1,
    explain: "In formal written English, collective nouns like 'team', 'council' and 'committee' take a singular verb: 'the team is'. Informal British English often uses plural ('the team are') but singular is the standard for professional written communications."
  },
  {
    category: "grammar",
    question: "Which sentence is written in the correct tense for a formal update email?",
    options: [
      "We have looked into your complaint and resolved the issue.",
      "We was looking into your complaint.",
      "We has resolved your complaint.",
      "We looked into your complaint and we have been resolving it."
    ],
    correct: 0,
    explain: "'We have looked into your complaint and resolved the issue' uses the present perfect tense correctly — describing a completed action with ongoing relevance. 'Was looking' and 'has resolved' with 'we' are incorrect verb agreements."
  },
  {
    category: "grammar",
    question: "Choose the sentence that avoids a dangling modifier.",
    options: [
      "Having reviewed your case, a decision has been made.",
      "Having reviewed your case, we have made a decision.",
      "A decision has been made, having reviewed your case.",
      "Your case, having been reviewed, a decision was made."
    ],
    correct: 1,
    explain: "'Having reviewed your case, we have made a decision' — the subject 'we' immediately follows the opening clause, making clear who did the reviewing. In Option A, 'a decision' appears to have reviewed the case, which is a dangling modifier — a common error in formal writing."
  },
  {
    category: "grammar",
    question: "Which sentence correctly uses 'who' and 'whom'?",
    options: [
      "Who should I address this letter to?",
      "To who should I address this letter?",
      "Whom should I address this letter to?",
      "To whom should I address this letter?"
    ],
    correct: 3,
    explain: "'To whom should I address this letter?' is correct. 'Whom' is used as the object of a preposition (to). A simple test: if you could answer with 'him/her', use 'whom'; if you could answer with 'he/she', use 'who'. 'To him' — so 'to whom' is correct."
  },

  // ── FORMAL VS INFORMAL ────────────────────────────────────────────────────
  {
    category: "formal",
    question: "A resident calls about a missed bin collection. Which response is most appropriate?",
    options: [
      "Yeah, sorry about that — I'll get someone to sort it.",
      "That's well annoying, I'll log it now.",
      "I apologise for the inconvenience. I will raise a missed collection report and ensure this is resolved within 24 hours.",
      "Not sure why that happened but I'll try and find out."
    ],
    correct: 2,
    explain: "Option C is professional: it acknowledges the issue, apologises, explains the action, and gives a timeframe. Options A, B and D use casual language ('yeah', 'sort it', 'well annoying') that is inappropriate in a council customer service context."
  },
  {
    category: "formal",
    question: "Which email opening is most appropriate for a formal council response?",
    options: [
      "Hey, thanks for getting in touch!",
      "Hi there, just seen your message.",
      "Dear Mr Okafor, thank you for contacting Southfield Council.",
      "Hello! Hope you're well, saw your query."
    ],
    correct: 2,
    explain: "Formal council communications use 'Dear [Title] [Surname]' and acknowledge the contact professionally. 'Hey', 'Hi there' and 'Hope you're well' are casual and inappropriate for official correspondence."
  },
  {
    category: "formal",
    question: "Rewrite this informal sentence in formal language: 'We can't help with that, you need to ring someone else.'",
    options: [
      "That ain't something we deal with — try another number.",
      "I'm afraid this falls outside our remit. I can direct you to the relevant service.",
      "Not our department — call someone else.",
      "Sorry, not something we can sort for you."
    ],
    correct: 1,
    explain: "'I'm afraid this falls outside our remit. I can direct you to the relevant service.' — this is professional, empathetic, and constructive. Even when you cannot help directly, the tone and offer to redirect matters in public-facing roles."
  },
  {
    category: "formal",
    question: "Which phrase is most appropriate when ending a professional phone call with a resident?",
    options: [
      "Alright, cheers, bye then.",
      "See ya.",
      "Thank you for calling. Is there anything else I can help you with today?",
      "That's us done — have a good one."
    ],
    correct: 2,
    explain: "Ending a call by checking whether the resident needs further assistance is professional best practice. It ensures the contact is fully resolved and leaves a positive impression. Casual closings ('cheers', 'see ya') undermine professionalism."
  },
  {
    category: "formal",
    question: "A colleague sends this internal message: 'FYI the customer was proper annoyed and kept going on about it.' How should this be written formally?",
    options: [
      "The customer was very annoyed and kept going on.",
      "For your information, the resident expressed significant dissatisfaction and repeated their concern on multiple occasions.",
      "The customer seemed a bit upset and said stuff a few times.",
      "The resident was annoyed and that."
    ],
    correct: 1,
    explain: "Even internal communications in a council setting should be professional and precise. 'Expressed significant dissatisfaction' and 'repeated their concern on multiple occasions' are accurate, professional descriptions that would be appropriate in a case log or handover note."
  },
];

const INTERVIEW_QUESTIONS = [
  {
    q: "Tell me about yourself.",
    tip: "Keep it brief and relevant. Mention your education, any customer-facing experience, and why you want to work in local government.",
    good: "I'm 17, just finishing my GCSEs at Manor Academy. I volunteer at my local library on weekends where I help visitors find resources and use the computers. I'm keen to start a career in public service because I enjoy helping people and I like the idea of working for the local community.",
    bad: "Um, I'm just a normal person. I like going out with friends and I like TikTok. I don't really have much experience but I thought this sounded alright.",
  },
  {
    q: "Why do you want to work for the council?",
    tip: "Show you've done research. Mention specific things the council does — housing, libraries, waste, planning. Show genuine motivation.",
    good: "I researched what Southfield Council does and I was impressed by the range of services you provide — everything from housing support to environmental health. I want to work somewhere where my work directly helps the people in my community. The council's commitment to inclusive services really appealed to me.",
    bad: "I just need a job and the apprenticeship pays well. I don't really mind where I work as long as it's local.",
  },
  {
    q: "Tell me about a time you dealt with a difficult situation or customer.",
    tip: "Use the STAR method: Situation, Task, Action, Result. Even if from volunteering or school.",
    good: "At the library, an elderly gentleman got very frustrated because the printer wouldn't work and he had an urgent form to submit. (Situation) I needed to sort it calmly without making him feel worse. (Task) I apologised, walked him through the printer settings step by step, and when it still failed, I printed it from my desk for him. (Action) He left thanking me and came back the next week to say the form had been accepted. (Result)",
    bad: "I once had a really annoying customer at a shop who kept shouting. I just told my manager because I didn't want to deal with it.",
  },
  {
    q: "How do you handle making a mistake?",
    tip: "Employers want honesty, accountability and learning. Don't say you never make mistakes.",
    good: "I believe mistakes are part of learning. If I make one, my first step is to be honest about it, especially if it affects someone else. At school I once submitted the wrong version of an assignment. I told my teacher straight away, explained what happened, and asked if I could resubmit. I now double-check everything before I send it.",
    bad: "I try not to make mistakes. I'm quite a perfectionist so I don't really have any examples.",
  },
  {
    q: "What does good customer service look like to you?",
    tip: "Think about: being listened to, feeling respected, getting a clear answer, being treated fairly.",
    good: "Good customer service means the person leaves feeling heard and helped. It's about listening carefully, communicating clearly, staying calm under pressure, and following through on what you've promised. In a council setting, it also means treating everyone fairly and with respect, especially people who might be vulnerable or going through a difficult time.",
    bad: "Being nice and smiling. Like just being friendly and helpful really.",
  },
];

const CASE_STUDIES = [
  {
    name: "Kezia", age: 17, outcome: "✅ Got the apprenticeship",
    story: "Kezia had no formal work experience but had been helping her mum run a local community food bank for two years. She initially didn't think that counted as 'real' experience. Her coach helped her reframe it: she'd handled enquiries from 50+ families each week, managed sensitive information, and dealt with distressed people. In her interview, she used the STAR method to describe these experiences and talked confidently about confidentiality, empathy and teamwork. She was offered the role within a week.",
    lesson: "Voluntary and informal experience is valid. Reframe it in professional language.",
    tag: "volunteer experience",
  },
  {
    name: "Jordan", age: 18, outcome: "❌ Rejected — then ✅ succeeded second time",
    story: "Jordan applied to three councils and was rejected after interviews each time. Feedback said he seemed 'unengaged' and gave vague answers. He reviewed his prep — he'd been answering from memory without structure. He learned the STAR method, practised with a mock interview partner, and researched each council's values properly. On his fourth attempt, he prepared three detailed STAR examples and linked every answer to the council's published customer service commitments. He got the role.",
    lesson: "Rejection is data, not failure. Structured preparation makes the difference.",
    tag: "resilience",
  },
  {
    name: "Amara", age: 16, outcome: "✅ Got the apprenticeship",
    story: "Amara had strong grades but struggled with confidence. She froze in mock interviews and went blank on questions. Her coach suggested writing out full answers and practising them aloud daily for two weeks — even to her bedroom mirror. She also did a practice call to a real council enquiry line just to hear how staff spoke. By the interview day, she'd internalised her examples and felt calmer. The panel commented on how composed she was.",
    lesson: "Confidence comes from preparation and repetition, not natural ability.",
    tag: "confidence",
  },
  {
    name: "Marcus", age: 17, outcome: "⚠️ Strong candidate — but CV let him down",
    story: "Marcus had brilliant experience — a part-time retail job and peer mentoring at school. But his CV was two lines long, had spelling errors, and used casual language ('I helped people buy stuff'). A recruiter nearly discarded it before a colleague suggested a second look. He was interviewed and was excellent — but the experience taught him how close he came to not being seen at all. He redesigned his CV with specific, quantified statements and used professional vocabulary.",
    lesson: "Your CV is your first impression. It must match the quality you'll bring to the role.",
    tag: "CV",
  },
];

const CV_SECTIONS = {
  personal: {
    label: "Personal Statement",
    prompt: "Write 3–4 sentences. Who are you? What skills do you have? What do you want from this apprenticeship?",
    good: "I am a motivated and reliable 17-year-old with strong communication skills developed through volunteering at my local community library and participating in my school's peer mentor programme. I am passionate about public service and committed to supporting my local community. I am looking for an apprenticeship where I can develop my customer service skills, build a professional qualification, and contribute to a team that makes a real difference to residents' lives.",
    bad: "I am a good person who works hard. I like talking to people and want a job. I am applying for this apprenticeship because it sounds good.",
  },
  experience: {
    label: "Work / Volunteer Experience",
    prompt: "List roles, dates, and bullet points using action verbs. Quantify where you can.",
    good: "Community Library Volunteer | Southfield Library | Sept 2022 – Present\n• Assisted an average of 30+ visitors per week with enquiries, computer access and resource searches\n• Handled sensitive membership data in line with GDPR requirements\n• Resolved customer issues calmly, escalating where necessary to the duty librarian\n• Received commendation from library manager for consistent, professional service",
    bad: "Library — helped people use computers. September to now.\nDid various tasks around the library.",
  },
  skills: {
    label: "Key Skills",
    prompt: "List 4–6 skills, each with a short evidence statement. Don't just list words.",
    good: "Communication: Confidently communicated with library visitors of all ages, adapting my style to suit each individual.\nOrganisation: Managed weekly stock-checking tasks independently, completing returns and filing accurately.\nDigital Skills: Proficient in Microsoft Word, Excel and Outlook; trained other volunteers to use the library catalogue system.\nTeamwork: Collaborated with a team of 8 volunteers to run community events attended by 100+ residents.",
    bad: "Good communication. Team player. Organised. IT skills. Hard working. Fast learner.",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ProgressBar({ value, max = 10 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: "#E2E8F0", borderRadius: 8, height: 8, overflow: "hidden", margin: "6px 0" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${TEAL}, #0D8B7D)`, borderRadius: 8, transition: "width 0.5s" }} />
    </div>
  );
}

function btnStyle(color) {
  return {
    background: color, color: "#fff", border: "none", borderRadius: 8,
    padding: "11px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14,
    fontFamily: "inherit",
  };
}

// ─── Language Test ────────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const s = CAT_STYLES[category];
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.3, display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: s.dot, display: "inline-block" }} />
      {s.label}
    </span>
  );
}

function WordTestModule() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const TOTAL = LANG_QUESTIONS.length;
  const q = LANG_QUESTIONS[current];

  function handleAnswer(idx) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(w => [...w, current]);
    }
  }

  function next() {
    if (current + 1 >= TOTAL) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  }

  function restart() { setCurrent(0); setScore(0); setDone(false); setSelected(null); setWrongAnswers([]); }

  // ── Results screen ──
  if (done) {
    const pct = Math.round((score / TOTAL) * 100);
    const catScores = Object.keys(CAT_STYLES).map(cat => {
      const qs = LANG_QUESTIONS.filter(q => q.category === cat);
      const correct = qs.filter((q, i) => {
        const globalIdx = LANG_QUESTIONS.indexOf(q);
        return !wrongAnswers.includes(globalIdx);
      }).length;
      return { cat, correct, total: qs.length };
    });

    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ textAlign: "center", padding: "28px 16px 20px" }}>
          <div style={{ fontSize: 52 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "📖"}</div>
          <h2 style={{ color: NAVY, fontSize: 24, margin: "12px 0 6px", fontWeight: 900 }}>
            {score}/{TOTAL} — {pct}%
          </h2>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
            {pct >= 80 ? "Excellent. Your written and spoken communication is strong." : pct >= 60 ? "Good effort — review the sections below where you dropped marks." : "Keep practising — these skills are tested directly in council apprenticeship applications."}
          </p>
          <button onClick={restart} style={btnStyle(TEAL)}>Try Again</button>
        </div>

        {/* Category breakdown */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Your results by category</p>
          {catScores.map(({ cat, correct, total }) => {
            const s = CAT_STYLES[cat];
            const p = Math.round((correct / total) * 100);
            return (
              <div key={cat} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <CategoryBadge category={cat} />
                  <span style={{ color: p >= 80 ? "#065F46" : p >= 60 ? "#92400E" : "#991B1B", fontWeight: 700, fontSize: 13 }}>{correct}/{total}</span>
                </div>
                <div style={{ background: "#E2E8F0", borderRadius: 99, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${p}%`, height: "100%", background: p >= 80 ? "#10B981" : p >= 60 ? AMBER : "#EF4444", borderRadius: 99, transition: "width 0.6s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Review wrong answers */}
        {wrongAnswers.length > 0 && (
          <div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Review — questions you missed</p>
            {wrongAnswers.map(idx => {
              const wq = LANG_QUESTIONS[idx];
              return (
                <div key={idx} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <CategoryBadge category={wq.category} />
                  <p style={{ color: NAVY, fontWeight: 600, fontSize: 14, lineHeight: 1.5, margin: "10px 0 8px" }}>{wq.question}</p>
                  <div style={{ background: "#F0FDF4", border: "1px solid #10B981", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                    <span style={{ color: "#065F46", fontWeight: 700, fontSize: 13 }}>✓ Correct: </span>
                    <span style={{ color: "#065F46", fontSize: 13 }}>{wq.options[wq.correct]}</span>
                  </div>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>💡 {wq.explain}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ color: "#888", fontSize: 13 }}>Question {current + 1} of {TOTAL}</span>
        <span style={{ color: TEAL, fontSize: 13, fontWeight: 700 }}>Score: {score}</span>
      </div>
      <ProgressBar value={current} max={TOTAL} />

      {/* Question card */}
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "20px", margin: "16px 0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ marginBottom: 12 }}>
          <CategoryBadge category={q.category} />
        </div>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{q.question}</p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = "#F8FAFC", border = "1px solid #E2E8F0", color = "#2D3748";
          if (selected !== null) {
            if (i === q.correct) { bg = "#F0FDF4"; border = "1px solid #10B981"; color = "#065F46"; }
            else if (i === selected) { bg = "#FEF2F2"; border = "1px solid #EF4444"; color = "#991B1B"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)}
              style={{ background: bg, border, borderRadius: 10, padding: "13px 16px", color, textAlign: "left", cursor: selected !== null ? "default" : "pointer", fontSize: 14, lineHeight: 1.5, fontFamily: "inherit", transition: "all 0.15s" }}>
              <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + next */}
      {selected !== null && (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: selected === q.correct ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${selected === q.correct ? "#10B981" : "#EF4444"}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <p style={{ color: selected === q.correct ? "#065F46" : "#991B1B", fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>
              {selected === q.correct ? "✅ Correct" : "❌ Incorrect"}
            </p>
            <p style={{ color: "#374151", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{q.explain}</p>
          </div>
          <button onClick={next} style={{ ...btnStyle(NAVY), width: "100%", padding: 14, borderRadius: 12, fontSize: 15 }}>
            {current + 1 >= TOTAL ? "See results" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── CV Module ────────────────────────────────────────────────────────────────
function CVModule() {
  const [section, setSection] = useState("personal");
  const [reveal, setReveal] = useState(null);
  const s = CV_SECTIONS[section];

  return (
    <div>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 14 }}>Learn how to write each section of your CV with good and bad examples. Then try writing your own.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {Object.entries(CV_SECTIONS).map(([key, val]) => (
          <button key={key} onClick={() => { setSection(key); setReveal(null); }}
            style={{ background: section === key ? TEAL : "#F0F4FF", color: section === key ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: section === key ? 700 : 400 }}>
            {val.label}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", border: `1px solid ${TEAL}30`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <h3 style={{ color: TEAL, marginTop: 0, marginBottom: 8, fontSize: 15 }}>{s.label}</h3>
        <p style={{ color: "#555", fontSize: 14, margin: 0 }}>📝 <strong style={{ color: NAVY }}>What to include:</strong> {s.prompt}</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={() => setReveal(reveal === "good" ? null : "good")} style={{ ...btnStyle("#1A6B3A"), flex: 1, fontSize: 13 }}>
          {reveal === "good" ? "Hide" : "✅ Strong Example"}
        </button>
        <button onClick={() => setReveal(reveal === "bad" ? null : "bad")} style={{ ...btnStyle("#C0392B"), flex: 1, fontSize: 13 }}>
          {reveal === "bad" ? "Hide" : "❌ Weak Example"}
        </button>
      </div>
      {reveal === "good" && (
        <div style={{ background: "#F0FDF4", border: "1px solid #10B981", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <p style={{ color: "#065F46", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>✅ Strong Example</p>
          <pre style={{ color: "#1A3A2A", fontSize: 13, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, lineHeight: 1.65 }}>{s.good}</pre>
        </div>
      )}
      {reveal === "bad" && (
        <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <p style={{ color: "#991B1B", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>❌ Weak Example</p>
          <pre style={{ color: "#7F1D1D", fontSize: 13, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, lineHeight: 1.65 }}>{s.bad}</pre>
          <p style={{ color: "#C0392B", fontSize: 13, marginTop: 12, marginBottom: 0 }}>⚠️ Too vague and informal. No evidence of skills. No professional vocabulary.</p>
        </div>
      )}
      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, marginBottom: 8, fontSize: 14 }}>✍️ Now write yours</p>
        <textarea placeholder={`Draft your ${s.label.toLowerCase()} here...`}
          style={{ width: "100%", minHeight: 120, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: "#333", fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        <p style={{ color: "#999", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Use the AI Coach tab for personalised feedback on what you write.</p>
      </div>
    </div>
  );
}

// ─── Interview Module ─────────────────────────────────────────────────────────
function InterviewModule() {
  const [current, setCurrent] = useState(0);
  const [reveal, setReveal] = useState(null);
  const q = INTERVIEW_QUESTIONS[current];

  return (
    <div>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 14 }}>Practise common interview questions for local authority customer service apprenticeships.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {INTERVIEW_QUESTIONS.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setReveal(null); }}
            style={{ background: current === i ? TEAL : "#F0F4FF", color: current === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: current === i ? 700 : 400 }}>
            Q{i + 1}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <p style={{ color: "#999", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Interview Question</p>
        <h3 style={{ color: NAVY, margin: "0 0 14px", fontSize: 17, lineHeight: 1.4 }}>"{q.q}"</h3>
        <div style={{ background: "#F0F8FF", borderRadius: 8, padding: 12, borderLeft: `3px solid ${TEAL}` }}>
          <p style={{ color: "#2D5A8A", fontSize: 13, margin: 0 }}>💡 <strong>Coach tip:</strong> {q.tip}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={() => setReveal(reveal === "good" ? null : "good")} style={{ ...btnStyle("#1A6B3A"), flex: 1, fontSize: 13 }}>
          {reveal === "good" ? "Hide" : "✅ Strong Answer"}
        </button>
        <button onClick={() => setReveal(reveal === "bad" ? null : "bad")} style={{ ...btnStyle("#C0392B"), flex: 1, fontSize: 13 }}>
          {reveal === "bad" ? "Hide" : "❌ Weak Answer"}
        </button>
      </div>
      {reveal === "good" && (
        <div style={{ background: "#F0FDF4", border: "1px solid #10B981", borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <p style={{ color: "#065F46", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>✅ Strong Answer</p>
          <p style={{ color: "#1A3A2A", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{q.good}</p>
        </div>
      )}
      {reveal === "bad" && (
        <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <p style={{ color: "#991B1B", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>❌ Weak Answer</p>
          <p style={{ color: "#7F1D1D", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{q.bad}</p>
        </div>
      )}
      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🎤 Practise your answer</p>
        <textarea placeholder="Type your answer here. Try to use the STAR method: Situation, Task, Action, Result."
          style={{ width: "100%", minHeight: 100, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: "#333", fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        <p style={{ color: "#999", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Paste your answer into the AI Coach for detailed feedback.</p>
      </div>
    </div>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudiesModule() {
  const [selected, setSelected] = useState(0);
  const c = CASE_STUDIES[selected];
  return (
    <div>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 14 }}>Real stories from young people who applied for customer service apprenticeships in local authorities.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {CASE_STUDIES.map((cs, i) => (
          <button key={i} onClick={() => setSelected(i)}
            style={{ background: selected === i ? TEAL + "12" : "#fff", border: selected === i ? `1px solid ${TEAL}` : "1px solid #E2E8F0", borderRadius: 12, padding: "13px 16px", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: NAVY, fontWeight: 700, fontSize: 14 }}>{cs.name}, {cs.age}</span>
              <span style={{ color: "#999", fontSize: 12, marginLeft: 10 }}>#{cs.tag}</span>
            </div>
            <span style={{ fontSize: 13 }}>{cs.outcome.split(" ")[0]}</span>
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <h3 style={{ color: NAVY, margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>{c.name}, {c.age}</h3>
            <span style={{ fontSize: 13 }}>{c.outcome}</span>
          </div>
          <span style={{ background: "#F0F4FF", color: NAVY, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>#{c.tag}</span>
        </div>
        <p style={{ color: "#444", lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>{c.story}</p>
        <div style={{ background: "#F0F8FF", borderRadius: 10, padding: 14, borderLeft: `3px solid ${TEAL}` }}>
          <p style={{ color: TEAL, fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>📌 Key Lesson</p>
          <p style={{ color: "#2D5A8A", fontSize: 14, margin: 0 }}>{c.lesson}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Research Module ──────────────────────────────────────────────────────────
function ResearchModule() {
  const [expanded, setExpanded] = useState(null);
  const items = [
    { title: "What does a local authority do?", icon: "🏛️", content: "Local authorities (councils) provide essential services to communities. These include housing support, refuse collection, planning permission, social care, libraries, leisure centres, environmental health, council tax, benefits, and more. When you apply, research your specific council's services — visit their website and look at the 'About Us' and 'Services' sections." },
    { title: "What is a customer service apprenticeship?", icon: "📋", content: "An apprenticeship is a real job with training. You earn a wage, work alongside experienced staff, and study for a qualification (usually a Level 2 or Level 3 Customer Service Practitioner). You'll handle calls, emails and in-person enquiries. Most apprenticeships last 12–18 months and can lead to permanent employment." },
    { title: "What do councils look for in candidates?", icon: "🔎", content: "Councils look for: communication skills (written and verbal), empathy and patience, reliability and professionalism, ability to follow procedures, digital skills (email, databases), teamwork, and commitment to public service values like equality and accessibility. You don't need loads of experience — attitude and potential matter most." },
    { title: "How to research YOUR local council", icon: "🗺️", content: "Before applying or interviewing:\n1. Visit the council website — read the 'About Us' and 'Vision/Values' pages\n2. Look at their customer service commitments or charter\n3. Check recent council news to understand priorities\n4. Find out if they have a contact centre — what channels do they use?\n5. Note specific projects or initiatives that interest you\n\nExample: 'I noticed the council launched a digital inclusion programme — I'm interested in helping residents access services online.'" },
    { title: "Understanding council values", icon: "⭐", content: "Most councils share core values: Integrity, Respect, Inclusivity, Accountability, Community. Some add: Innovation, Sustainability, Collaboration. Research the specific values of your target council. In your application and interview, demonstrate how your own behaviour reflects those values with real examples." },
    { title: "Equality, Diversity and Inclusion", icon: "🤝", content: "Councils serve everyone in the community — people of all ages, backgrounds, languages and abilities. You'll be expected to treat all residents fairly and with equal respect. Know basic equalities law (Equality Act 2010 covers 9 protected characteristics). In interviews, be ready to explain how you would serve someone who is elderly, has a disability, or doesn't speak English as a first language." },
  ];
  return (
    <div>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 14 }}>Knowledge is the foundation. Before you apply or interview, understand the sector, the role, and the organisation.</p>
      {items.map((item, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <button onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "15px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: NAVY }}>
            <span>{item.icon} {item.title}</span>
            <span style={{ color: TEAL, fontSize: 20, fontWeight: 400 }}>{expanded === i ? "−" : "+"}</span>
          </button>
          {expanded === i && (
            <div style={{ padding: "0 18px 18px", color: "#555", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", borderTop: `1px solid ${TEAL}20` }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── AI Coach ─────────────────────────────────────────────────────────────────
function AICoachModule() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I'm your apprenticeship coach. I'm here to help you prepare for customer service apprenticeships in local authorities.\n\nYou can ask me to:\n• Review your CV or personal statement\n• Give feedback on your interview answers\n• Explain any terms or concepts\n• Help you practise mock interview questions\n• Advise on how to research a specific council\n\nWhat would you like to work on today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const history = [...messages, { role: "user", content: userMsg }].map(m => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a warm, encouraging careers coach specialising in helping young people (aged 16-19) secure customer service apprenticeships in UK local authorities (councils).

Your coaching style is:
- Supportive and non-judgmental — many users have low confidence
- Practical and specific — give concrete, actionable advice
- Uses plain English but introduces professional vocabulary with explanations
- Encourages STAR method (Situation, Task, Action, Result) for interview answers
- Aware of UK local government context: councils provide housing, waste, libraries, social care, planning, benefits, parks, etc.
- Familiar with the Customer Service Practitioner Level 2/3 apprenticeship standard
- Knowledgeable about EDI (Equality, Diversity, Inclusion) requirements in public sector

When reviewing CVs or interview answers:
- Be specific about what's good and what needs improving
- Give examples of stronger language or phrasing
- Highlight professional vocabulary the user should use
- Flag if answers are too vague, casual, or lack evidence
- Praise effort genuinely but honestly

Keep responses focused — users are on mobile. Use short paragraphs and occasional bullet points.`,
          messages: history,
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't get a response. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 220px)", minHeight: 400 }}>
      <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{ maxWidth: "85%", background: m.role === "user" ? NAVY : "#fff", color: m.role === "user" ? "#fff" : "#333", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "12px 16px", fontSize: 14, lineHeight: 1.65, whiteSpace: "pre-wrap", border: m.role === "assistant" ? "1px solid #E2E8F0" : "none", boxShadow: m.role === "assistant" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px 16px 16px 4px", padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, background: TEAL, borderRadius: 99, animation: `b 1.2s ${i*0.2}s infinite` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask your coach anything, or paste your CV / interview answer for feedback…"
          style={{ flex: 1, background: "#fff", border: "2px solid #E2E8F0", borderRadius: 12, padding: "11px 14px", color: "#333", fontSize: 14, fontFamily: "inherit", resize: "none", minHeight: 52, maxHeight: 120, boxSizing: "border-box" }}
          rows={2} />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#E2E8F0" : TEAL, color: loading || !input.trim() ? "#999" : "#fff", border: "none", borderRadius: 12, padding: "0 18px", cursor: loading || !input.trim() ? "default" : "pointer", fontSize: 20 }}>
          ↑
        </button>
      </div>
    </div>
  );
}

// ─── Welcome ──────────────────────────────────────────────────────────────────
function WelcomeModule({ setTab }) {
  const steps = [
    { icon: "🔍", label: "Research",     desc: "Understand local authorities and what they look for",            tab: "research" },
    { icon: "🌐", label: "MyJobScotland", desc: "Navigate the portal, write your supporting statement and more", tab: "mjs" },
    { icon: "📄", label: "CV Builder",   desc: "Write a strong CV with good/bad examples",                      tab: "cv" },
    { icon: "✏️", label: "Language",    desc: "Spelling, punctuation, pronunciation & formal language",  tab: "wordtest" },
    { icon: "🎤", label: "Interview",    desc: "Practise questions with model answers",               tab: "interview" },
    { icon: "📚", label: "Case Studies", desc: "Learn from real young people's journeys",             tab: "casestudies" },
    { icon: "🤖", label: "AI Coach",     desc: "Get personal feedback on your applications",          tab: "coach" },
  ];
  return (
    <div>
      {/* Logo on home screen — large, light theme, centred */}
      <div style={{ display: "flex", justifyContent: "center", padding: "28px 0 24px" }}>
        <TASSLogo size="lg" theme="light" />
      </div>

      <div style={{ background: "#F0F8FF", borderRadius: 14, padding: "14px 16px", marginBottom: 20, borderLeft: `3px solid ${TEAL}` }}>
        <p style={{ color: "#2D5A8A", fontSize: 13, margin: 0 }}>
          💡 <strong style={{ color: NAVY }}>Local Authority · Customer Service</strong><br />
          <span style={{ color: "#555" }}>Work through each module in order, or jump to what you need. Use the AI Coach for personalised feedback at any stage.</span>
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setTab(s.tab)}
            style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "16px 14px", textAlign: "left", cursor: "pointer", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.boxShadow = `0 4px 16px ${TEAL}20`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: "#888", fontSize: 12, lineHeight: 1.4 }}>{s.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "24px 0 8px", color: "#bbb", fontSize: 11 }}>
        <strong style={{ color: TEAL }}>The Apprenticeship Success System™</strong> · tass.scot
      </div>
    </div>
  );
}

// ─── MyJobScotland Module ─────────────────────────────────────────────────────
function MJSModule() {
  const [activeSection, setActiveSection] = useState(0);
  const [revealed, setRevealed] = useState({});

  const sections = [
    { id: "profile", icon: "👤", label: "Your Profile" },
    { id: "search",  icon: "🔎", label: "Finding Jobs" },
    { id: "statement", icon: "✍️", label: "Supporting Statement" },
    { id: "personal", icon: "📝", label: "Personal Statement" },
    { id: "edi",     icon: "🤝", label: "EDI Questions" },
  ];

  const content = [
    // ── PROFILE ──
    {
      title: "Setting up your MyJobScotland profile",
      intro: "MyJobScotland (myjobscotland.gov.uk) is the main portal for Scottish public sector jobs including almost all council apprenticeships. Your profile is your foundation — get it right once and it saves time on every application.",
      steps: [
        { heading: "Create your account", body: "Go to myjobscotland.gov.uk and click 'Register'. Use a professional email address — ideally your name, not a nickname. You'll use this for all council job correspondence so it needs to look professional.", tip: "firstname.lastname@gmail.com is fine. xXgamer99Xx@hotmail.com is not." },
        { heading: "Complete your personal details", body: "Fill in your full legal name, address, phone number and email. Make sure your address is current — some councils use this to prioritise local candidates. Your phone number should be one you answer during working hours.", tip: "Add a brief professional voicemail message in case you miss a call from a recruiter." },
        { heading: "Upload your CV", body: "Upload a clean, up-to-date CV in PDF format. This is separate from your application form answers — some councils use it for initial screening before shortlisting. Name the file professionally: FirstName_LastName_CV.pdf", tip: "Use the CV Builder tab to ensure your CV is in strong shape before uploading." },
        { heading: "Set up job alerts", body: "Click 'Job Alerts' and set up alerts for: 'apprenticeship', 'modern apprenticeship', and 'customer service'. Choose your region. You'll get an email when matching roles are posted — this is how you stay ahead of the cycle.", tip: "Set alerts for the entire Scotland region, not just your home council. Many councils accept applications from anywhere." },
        { heading: "Save your equal opportunities information", body: "You'll be asked about protected characteristics (disability, ethnicity, gender etc). This is for monitoring only — it is not seen by the hiring panel and does not affect your application. You can choose 'prefer not to say' for any question.", tip: "Completing this section honestly helps councils meet their equality duties. It is entirely separate from your application." },
      ],
    },
    // ── SEARCH ──
    {
      title: "Finding apprenticeships on MyJobScotland",
      intro: "The search function on MyJobScotland is powerful but easy to misuse. Most candidates miss relevant roles because they search too narrowly or don't check frequently enough.",
      steps: [
        { heading: "Use the right search terms", body: "Search for: 'Modern Apprenticeship', 'MA Customer Service', 'Apprentice', 'Trainee'. Don't search just for 'customer service' — that returns permanent roles too. Try different terms — not all councils use the same job titles.", tip: "Save each successful search as a job alert so you're notified automatically." },
        { heading: "Filter by job type", body: "Under 'Job Type' or 'Contract Type', filter for 'Apprenticeship' or 'Fixed Term'. This removes the bulk of permanent and temporary roles from your results.", tip: "Some apprenticeships are listed as 'Fixed Term' rather than 'Apprenticeship' — check the job description if unsure." },
        { heading: "Check closing dates carefully", body: "Most council apprenticeship roles close within 2–3 weeks of posting. Some close within days when they receive enough applications. Check the site at least twice a week during September–February when most roles are advertised.", tip: "Set your job alerts to 'immediate' notification rather than weekly digest so you see new roles the day they're posted." },
        { heading: "Read the full job advert before applying", body: "The job advert contains the person specification — the list of essential and desirable criteria you'll be scored against. Read this carefully before you write a word of your application. Your supporting statement must address these criteria directly.", tip: "Print or save the job advert before applying. It sometimes disappears from the site after the closing date." },
        { heading: "Check which council is advertising", body: "MyJobScotland hosts jobs from all 32 Scottish councils plus other public bodies. Some councils are listed under their full name (e.g. 'City of Edinburgh Council'), others under shortened names. Make sure you know which council you're applying to and research them specifically.", tip: "Go to that council's own website after finding the job — look at their values, priorities and recent news before writing your application." },
      ],
    },
    // ── SUPPORTING STATEMENT ──
    {
      title: "Writing your supporting statement",
      intro: "The supporting statement is the most important part of your MyJobScotland application. It is where you demonstrate that you meet the criteria in the person specification. Most candidates treat it as a summary of their CV — that's the wrong approach.",
      steps: [
        { heading: "What a supporting statement is NOT", body: "It is not a CV summary. It is not a cover letter. It is not a place to say you're enthusiastic and hardworking. It is a structured, evidenced response to the person specification — criterion by criterion.", tip: "If the person specification has 6 essential criteria, your supporting statement should address all 6." },
        { heading: "Structure it around the person specification", body: "Copy the essential criteria from the job advert. Work through each one and provide a specific example that proves you meet it. Use the STAR method for each: Situation, Task, Action, Result.", tip: "Use a subheading or clearly signal each criterion: 'With regard to communication skills...' or 'Demonstrating my ability to work as part of a team...'" },
        { heading: "Use professional language throughout", body: "Avoid casual phrases. Write in complete sentences. Use vocabulary that matches the job advert — if they say 'customer focused', use that phrase when describing your approach. Mirror their language.", tip: "Read the statement aloud before submitting. If it sounds like how you'd speak to a friend, it needs to be rewritten." },
        { heading: "Quantify where you can", body: "Numbers make statements concrete and credible. Not 'I helped many customers' but 'I assisted an average of 30+ visitors per week'. Not 'I worked with a team' but 'I worked alongside a team of 8 volunteers'.", tip: "If you don't have exact numbers, use approximations: 'around 20', 'over 50', 'typically 3–4 per day'." },
      ],
      examples: [
        {
          criterion: "Ability to communicate effectively with a wide range of people",
          weak: "I am a good communicator and I get on well with people of all ages. I enjoy talking to people and always try to be friendly and helpful.",
          strong: "During my volunteer role at Westfield Community Library, I regularly communicated with a wide range of visitors — from primary school children using the computers for homework, to elderly residents needing help with council tax forms, to professionals printing business documents. I adapted my language and approach for each person: using simple steps with less confident users, more technical language with experienced ones, and patience with those who were frustrated or confused. On one occasion, a resident whose first language was not English needed help understanding a council letter. I used plain language, pointed to key words, and drew a simple diagram to illustrate the process. She left confident she understood what was required.",
          why: "The strong answer gives a specific role, describes a range of real situations, explains how communication was adapted for different people, and ends with a concrete example. The weak answer makes claims with no evidence.",
        },
        {
          criterion: "Ability to work as part of a team",
          weak: "I am a good team player and always do my share of the work. I get on well with colleagues and support others when needed.",
          strong: "As part of the volunteer team at Westfield Library, I worked alongside seven other volunteers to run the Saturday reading programme for 25 children. My specific responsibilities were registering attendees and managing the resource trolley. When one volunteer was absent, I reorganised my tasks to cover the registration desk and the first activity session simultaneously, briefing the team leader so she could plan cover for the second hour. The session ran on schedule and no children missed their activity. I learned that effective teamwork requires both knowing your own role and being willing to step outside it when the team needs it.",
          why: "The strong answer names the team, gives the candidate's specific role, describes a challenge and how they responded, and ends with a lesson drawn. It uses 'I' throughout and shows the candidate's individual contribution to the team outcome.",
        },
      ],
    },
    // ── PERSONAL STATEMENT ──
    {
      title: "The personal statement / cover letter section",
      intro: "Some MyJobScotland applications include a separate personal statement or covering letter section alongside the supporting statement. This is shorter — typically 150–300 words — and serves a different purpose.",
      steps: [
        { heading: "What the personal statement is for", body: "The personal statement is your introduction. It answers: who are you, why do you want this specific role, and why this specific council. It should feel personal and motivated — not generic.", tip: "Never use the same personal statement for two different councils. Each one should reference that specific council's values or services." },
        { heading: "Structure in three parts", body: "Part 1 (2–3 sentences): Who you are and your relevant background. Part 2 (2–3 sentences): Why this role — what specifically attracts you to a council apprenticeship. Part 3 (2–3 sentences): Why this council — reference something specific you've found in your research.", tip: "Part 3 is what most candidates skip. It's also what most panels remember." },
        { heading: "Reference your research", body: "Mention something specific about the council: a recent initiative, a service they're known for, a value from their published strategy. This shows you've done more than fill in a form.", tip: "Check the council's website for recent news, their Corporate Plan, or their customer service charter before writing this section." },
      ],
      examples: [
        {
          criterion: "Personal statement for a council customer service apprenticeship",
          weak: "I am applying for this apprenticeship because I am interested in customer service and I want to start my career. I am hardworking, reliable and good with people. I think this would be a great opportunity for me to develop my skills and contribute to the council.",
          strong: "I am a motivated 17-year-old with experience of public-facing customer service through my volunteer role at Westfield Community Library, where I support 30+ residents each Saturday with enquiries, computer access and form completion. I am drawn to a council apprenticeship specifically because I want to work in a setting where my efforts have a direct impact on real people in my community — not sales targets or profit margins.\n\nI am applying to South Lanarkshire Council in particular because of your published commitment to digital inclusion. I read about the Digital Champions programme launched last year and I am genuinely interested in supporting residents who are less confident online — a need I see every week at the library. I want to develop professionally in an organisation that takes that responsibility seriously.",
          why: "The strong personal statement is specific about experience, explains the motivation for public service (not just any job), and references a real, named council initiative. It would be almost impossible to send this statement to a different council — which is exactly what a good personal statement should feel like.",
        },
      ],
    },
    // ── EDI ──
    {
      title: "Equality, Diversity and Inclusion monitoring questions",
      intro: "Every MyJobScotland application includes an EDI (Equality, Diversity and Inclusion) monitoring section. Many candidates worry about this unnecessarily. Here is everything you need to know.",
      steps: [
        { heading: "What EDI monitoring questions are", body: "These are questions about your personal characteristics — disability, ethnicity, gender, age, religion, sexual orientation etc. They are collected by the council to monitor whether their recruitment is reaching a diverse range of candidates.", tip: "The Equality Act 2010 covers nine protected characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation." },
        { heading: "Who sees your answers", body: "Your EDI answers are NOT seen by the hiring panel. They are separated from your application before it reaches anyone involved in shortlisting or interviewing. They go to the council's HR or equality team for statistical monitoring only.", tip: "This is a legal requirement for Scottish public bodies under the Public Sector Equality Duty. Your answers cannot affect your application outcome." },
        { heading: "'Prefer not to say' is always an option", body: "For every EDI question, you can choose 'prefer not to say'. This is a legitimate answer and will not disadvantage you in any way. Completing the questions honestly helps councils understand whether they are reaching all parts of their community — but it is entirely your choice.", tip: "Councils use this data to identify barriers — for example, if no applications are coming from a particular ethnic group, they investigate why and adjust their outreach." },
        { heading: "Disability and reasonable adjustments", body: "If you have a disability or condition, you may be asked separately whether you require any adjustments for the interview or assessment process. This is different from the monitoring section. Requesting adjustments will not disadvantage you — Scottish councils are legally required to make reasonable adjustments and many participate in the Disability Confident scheme.", tip: "Examples of reasonable adjustments: extra time for written tasks, questions provided in advance, an accessible venue, a rest break, use of assistive technology. Request these as early as possible — ideally when you submit your application." },
        { heading: "Guaranteed interview schemes", body: "Many Scottish councils operate a guaranteed interview scheme for disabled candidates who meet the minimum essential criteria for a role. This means if you declare a disability and meet the minimum requirements, you are guaranteed to be interviewed. Check the job advert or contact HR to find out if the scheme applies.", tip: "The guaranteed interview scheme is separate from your application score — you still need to perform well at interview. But it ensures you get the chance to do so." },
      ],
    },
  ];

  const s = content[activeSection];

  return (
    <div>
      <div style={{ background: "#F0F8FF", border: `1px solid ${TEAL}30`, borderLeft: `3px solid ${TEAL}`, borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>MyJobScotland — myjobscotland.gov.uk</p>
        <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>The main portal for Scottish public sector apprenticeships. Almost every council apprenticeship in Scotland is advertised here. This section shows you how to use it properly — from setting up your profile to writing a supporting statement that gets you shortlisted.</p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {sections.map((sec, i) => (
          <button key={i} onClick={() => { setActiveSection(i); setRevealed({}); }}
            style={{ background: activeSection === i ? TEAL : "#F0F4FF", color: activeSection === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 13px", fontSize: 12, fontWeight: activeSection === i ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            {sec.icon} {sec.label}
          </button>
        ))}
      </div>

      <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 800, margin: "0 0 8px" }}>{s.title}</h3>
      <p style={{ color: "#555", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{s.intro}</p>

      {/* Steps */}
      {s.steps.map((step, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 99, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: 0, paddingTop: 3 }}>{step.heading}</p>
          </div>
          <p style={{ color: "#444", fontSize: 13, lineHeight: 1.65, margin: "0 0 10px", paddingLeft: 36 }}>{step.body}</p>
          <div style={{ background: "#FFF8E7", borderLeft: `3px solid ${AMBER}`, borderRadius: 8, padding: "8px 12px", marginLeft: 36 }}>
            <p style={{ color: "#6B4A00", fontSize: 12, lineHeight: 1.6, margin: 0 }}>💡 {step.tip}</p>
          </div>
        </div>
      ))}

      {/* Examples — supporting statement and personal statement sections */}
      {s.examples && s.examples.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 12 }}>Weak vs strong examples</p>
          {s.examples.map((ex, i) => (
            <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ background: NAVY, padding: "10px 16px" }}>
                <p style={{ color: TEAL, fontWeight: 700, fontSize: 13, margin: 0 }}>📋 Criterion: {ex.criterion}</p>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <button onClick={() => setRevealed(p => ({ ...p, [`${i}-weak`]: !p[`${i}-weak`] }))}
                    style={{ flex: 1, padding: "9px", background: revealed[`${i}-weak`] ? "#C0392B" : "#fff", border: `2px solid #C0392B`, color: revealed[`${i}-weak`] ? "#fff" : "#C0392B", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    {revealed[`${i}-weak`] ? "Hide" : "✗ Weak answer"}
                  </button>
                  <button onClick={() => setRevealed(p => ({ ...p, [`${i}-strong`]: !p[`${i}-strong`] }))}
                    style={{ flex: 1, padding: "9px", background: revealed[`${i}-strong`] ? "#1A6B3A" : "#fff", border: `2px solid #1A6B3A`, color: revealed[`${i}-strong`] ? "#fff" : "#1A6B3A", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    {revealed[`${i}-strong`] ? "Hide" : "✓ Strong answer"}
                  </button>
                </div>
                {revealed[`${i}-weak`] && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                    <p style={{ color: "#C0392B", fontWeight: 700, fontSize: 12, margin: "0 0 6px" }}>✗ Weak</p>
                    <p style={{ color: "#7F1D1D", fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line", fontStyle: "italic" }}>{ex.weak}</p>
                  </div>
                )}
                {revealed[`${i}-strong`] && (
                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                    <p style={{ color: "#1A6B3A", fontWeight: 700, fontSize: 12, margin: "0 0 6px" }}>✓ Strong</p>
                    <p style={{ color: "#14532D", fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{ex.strong}</p>
                  </div>
                )}
                {(revealed[`${i}-weak`] || revealed[`${i}-strong`]) && (
                  <div style={{ background: "#F0F8FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: 12 }}>
                    <p style={{ color: TEAL, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Why this matters</p>
                    <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{ex.why}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Draft area for statement sections */}
      {(activeSection === 2 || activeSection === 3) && (
        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginTop: 8 }}>
          <p style={{ color: TEAL, fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>
            ✍️ Draft your {activeSection === 2 ? "supporting statement" : "personal statement"} here
          </p>
          <p style={{ color: "#666", fontSize: 13, margin: "0 0 10px" }}>
            {activeSection === 2
              ? "Work through each criterion from the person specification. Write a STAR example for each one."
              : "Three parts: who you are, why this role, why this council. Keep it under 300 words."}
          </p>
          <textarea rows={8} placeholder={activeSection === 2
            ? "Criterion 1: [copy criterion from job advert]\n\nYour STAR example here...\n\nCriterion 2: ..."
            : "Part 1 — Who you are and your background...\n\nPart 2 — Why a council apprenticeship...\n\nPart 3 — Why this specific council..."}
            style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: "#333", fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.65 }} />
          <p style={{ color: "#999", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Paste it into the AI Coach tab for feedback before you submit.</p>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("welcome");
  const mod = MODULES.find(m => m.id === tab);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F5F7FA", minHeight: "100vh", color: "#1A1A2E" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F5F7FA; } ::-webkit-scrollbar-thumb { background: #D1D9E6; border-radius: 4px; } @keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}} textarea:focus, button:focus { outline: 2px solid ${TEAL}; outline-offset: 2px; }`}</style>

      {/* Header — only shown on inner screens */}
      {tab !== "welcome" && (
        <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
          <TASSLogo size="sm" theme="dark" />
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Local Authority · Customer Service</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{mod?.label.replace(/^.\s/, "")}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 100px" }}>
        {tab !== "welcome" && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ color: NAVY, fontSize: 20, margin: "0 0 4px", fontWeight: 800 }}>{mod?.icon} {mod?.label.replace(/^.\s/, "")}</h2>
            <div style={{ height: 3, width: 40, background: `linear-gradient(90deg, ${TEAL}, #0D8B7D)`, borderRadius: 2 }} />
          </div>
        )}
        {tab === "welcome"     && <WelcomeModule setTab={setTab} />}
        {tab === "research"    && <ResearchModule />}
        {tab === "mjs"         && <MJSModule />}
        {tab === "cv"          && <CVModule />}
        {tab === "wordtest"    && <WordTestModule />}
        {tab === "interview"   && <InterviewModule />}
        {tab === "casestudies" && <CaseStudiesModule />}
        {tab === "coach"       && <AICoachModule />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "center", padding: "8px 4px 12px", gap: 2, zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.06)" }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setTab(m.id)}
            style={{ flex: 1, maxWidth: 72, background: "none", border: "none", cursor: "pointer", padding: "6px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 18, filter: tab === m.id ? "none" : "grayscale(1) opacity(0.45)" }}>{m.icon}</div>
            <div style={{ fontSize: 9, color: tab === m.id ? TEAL : "#999", fontWeight: tab === m.id ? 700 : 400, letterSpacing: "0.02em" }}>
              {m.label.replace(/^.\s/, "").split(" ")[0]}
            </div>
            {tab === m.id && <div style={{ width: 16, height: 2.5, background: TEAL, borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
