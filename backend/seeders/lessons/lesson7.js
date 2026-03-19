import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const CONTENT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771160466/e8da1e5c-c8c3-4127-8b0a-73d3c2c174b5.png";

const lessons = [
  /* ══════════════════════════════════════════════════════
     LESSON 7 – Typography Mistakes to Avoid
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson VII: Typography Mistakes to Avoid",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797234/THE_ENGINEERING_ISLAND_j75cvx.png",
    youtubeUrl: "https://www.youtube.com/embed/apO-K-S4QuU",
    description: "Even experienced designers can unintentionally introduce small errors that significantly impact readability, professionalism, and user experience. Learn to identify and eliminate the 'invisible saboteurs' of typography.",
    instruction: "Typography functions as a communication system, and like any system, its effectiveness depends on careful execution. Poor typographic decisions may not always be consciously noticed by readers, but they often create a sense that something feels 'off.' This phenomenon occurs because the human brain is extremely sensitive to patterns, rhythm, and visual balance. When typography disrupts these patterns, readers experience visual friction, which slows comprehension and reduces engagement.",
    sections: [
      {
        header: "1. The Chaos of Uneven Rags",
        discussion: "In typography, the rag refers to the irregular edge of text in paragraphs that are aligned flush-left or flush-right. A well-formed rag should appear natural and balanced, with subtle variation between line lengths. However, when line lengths vary dramatically, the paragraph develops a bad rag, characterized by awkward shapes in the margin — deep vertical gaps often called 'rivers,' 'canyons,' 'wedges,' or 'bellies.' Such irregular patterns distract readers by drawing their attention toward the empty spaces rather than the text itself. Professional designers refine rags by adjusting line breaks, applying subtle hyphenation, slightly modifying tracking or word spacing, or editing the text itself when possible.",
        images: [CONTENT_IMAGE],
        authorLink: "",
      },
      {
        header: "2. Improper Font Selection and Character Mismatch",
        discussion: "Every typeface carries a specific visual personality shaped by its historical origins, stylistic features, and cultural associations. When the tone of the typeface conflicts with the tone of the content, the result is a disconnect between form and meaning — often referred to as typographic mismatch. A financial institution, for example, might use a stable and authoritative serif font to convey reliability and trust. A technology company might choose a modern sans-serif typeface that communicates efficiency and innovation. When typography aligns with the meaning of the text, the design achieves a state of visual harmony, where form and content support each other.",
        images: [],
        authorLink: "",
      },
      {
        header: "3. The Visual Friction of Mixing Too Many Typefaces",
        discussion: "Font pairing is an essential skill in typography, but excessive mixing of typefaces can quickly disrupt visual harmony. When too many fonts appear within a single design, the result often looks disorganized and amateurish. Professional designers typically follow the 'Rule of Two,' which recommends using one typeface for headings and another for body text. Instead of adding more fonts to create variation, designers rely on internal variations within a type family, such as different weights, styles, or sizes.",
        images: [],
        authorLink: "",
      },
      {
        header: "4. Excessive Line Width and Reader Fatigue",
        discussion: "When paragraphs stretch across the entire width of a large screen or page, lines of text become too long for comfortable reading. The eyes must quickly locate the beginning of the next line after completing each one — when lines are excessively long, this return movement becomes difficult, causing readers to lose their place or skip lines. Research has identified an optimal line length of approximately 50 to 75 characters per line for body text. Designers can control line length by adjusting the width of text containers, the number of columns in a layout, and font size and spacing.",
        images: [],
        authorLink: "https://webflow.com/blog/importance-of-typography",
      },
      {
        header: "5. The 'Font Overload' Trap",
        discussion: "A common misconception among beginner designers is that using many different fonts will make a design appear more creative. In reality, excessive font usage produces the opposite effect — the viewer's eye becomes overwhelmed by conflicting styles. Professional designers approach typography with a philosophy of intentional simplicity. Rather than introducing additional fonts, they create variation through internal adjustments: changing font weight, applying italic styles, adjusting font size to establish hierarchy, or using capitalization and small caps for specific elements.",
        images: [],
        authorLink: "",
      },
    ],
    quiz: [
      /* ─── Part 1: The Layout Fixer — Expert Audit (15 items) ─── */
      {
        type: "scenario",
        question: "What is the technical name for this 'bad rag' shape that disrupts reading flow?",
        scenario: "A high-end interview layout has a paragraph where the right edge (the Rag) has a massive 'bulge' in the middle — lines in the middle are much longer than those at the top and bottom.",
        choices: ["A Canyon", "A Belly", "A Wedge", "A River"],
        correctAnswer: "A Belly",
        explanation: "A Belly creates an uneven visual weight that distracts the reader by creating a 'curve' that pulls the eye away from the text.",
      },
      {
        type: "scenario",
        question: "Why is this a failure of 'Typographic Appropriateness'?",
        scenario: "A bank is sending a digital 'Security Breach' alert to its users, but the font used is Bubble-Gum Rounded.",
        choices: [
          "The x-height is too high",
          "The font's personality contradicts the gravity of the message",
          "It's a Sans-Serif",
          "The tracking is too wide",
        ],
        correctAnswer: "The font's personality contradicts the gravity of the message",
        explanation: "The typeface must act as a Visual Synonym for the content. A playful font signals the wrong emotional tone for a serious security alert.",
      },
      {
        type: "scenario",
        question: "What is the primary cause of this 'Reader Fatigue'?",
        scenario: "On a wide desktop screen, a blog post spans 1200px. Readers say they keep losing their place.",
        choices: [
          "Bad Color Contrast",
          "The Measure is too long (over 100 characters)",
          "The Leading is too loose",
          "The Font-Size is 16px",
        ],
        correctAnswer: "The Measure is too long (over 100 characters)",
        explanation: "Restricting the Measure to 75–80 characters is a fundamental rule of UX. When a line is too wide, the eye has to travel a long distance and gets lost returning to the next line.",
      },
      {
        type: "scenario",
        question: "Instead of adding a 2nd font, how should you create this distinction professionally?",
        scenario: "You need to distinguish between a 'Category' label and a 'Title,' but you only have one font family.",
        choices: [
          "Change the background color",
          "Manipulate the Weight and Case (e.g., Bold + All-Caps)",
          "Use a different font for every label",
          "Underline everything",
        ],
        correctAnswer: "Manipulate the Weight and Case (e.g., Bold + All-Caps)",
        explanation: "Using Internal Hierarchy (weight + case) maintains a unified 'Central Nervous System' for the design.",
      },
      {
        type: "scenario",
        question: "Why does a long measure require even more leading (line spacing)?",
        scenario: "A paragraph has 140% leading, but because the lines are 120 characters long, people still skip lines.",
        choices: [
          "To make the page look longer",
          "To help the eye navigate the long 'return trip' to the next line",
          "To increase the x-height",
          "To fix a bad rag",
        ],
        correctAnswer: "To help the eye navigate the long 'return trip' to the next line",
        explanation: "Long lines require Generous Leading to prevent 'Optical Doubling.' The further the eye travels, the harder it is to find the correct next line.",
      },
      {
        type: "scenario",
        question: "What is the main risk of this 'Font Overload'?",
        scenario: "A website uses a different font for the Logo, Header, Nav-bar, Body, and Buttons — five different typefaces.",
        choices: [
          "It makes the site load too fast",
          "It makes the design look like a collection of unrelated parts",
          "It increases the contrast ratio",
          "It fixes the x-height",
        ],
        correctAnswer: "It makes the design look like a collection of unrelated parts",
        explanation: "The Rule of Two ensures the brand identity remains concentrated and authoritative. Consistency is professional.",
      },
      {
        type: "scenario",
        question: "This error, common in Justified text, is called a 'River.' How do you fix it?",
        scenario: "In a column of text, you see a vertical 'white snake' or 'river' running through the paragraph where word spaces accidentally line up vertically.",
        choices: [
          "Increase the font size",
          "Adjust the Tracking or switch to Flush-Left alignment",
          "Change the typeface",
          "Bold the text",
        ],
        correctAnswer: "Adjust the Tracking or switch to Flush-Left alignment",
        explanation: "Rivers distract the eye. Switching to Flush-Left or adjusting horizontal word spacing breaks the river.",
      },
      {
        type: "scenario",
        question: "Why is this a technical mistake for a 'Data-Heavy' legal page?",
        scenario: "You are designing a 'Terms of Service' page. The text is set in a High-Contrast Fashion Serif with extremely thin hairlines.",
        choices: [
          "It looks too expensive",
          "Thin hairlines can break and become unreadable at small sizes",
          "It has too many ascenders",
          "Serifs are illegal in law",
        ],
        correctAnswer: "Thin hairlines can break and become unreadable at small sizes",
        explanation: "For legal or data text, you need Sturdy, Low-Contrast fonts for high legibility — especially on small screens.",
      },
      {
        type: "scenario",
        question: "Which term describes this mismatch between 'Weight' and 'Meaning'?",
        scenario: "A fitness app uses a very thin, light-weight font for its 'Power Lifting' workout headlines.",
        choices: ["Visual Harmony", "Cognitive Dissonance", "Type Scale", "Kerning"],
        correctAnswer: "Cognitive Dissonance",
        explanation: "If the word is 'HEAVY' but the font looks like a thin 'whisper,' the brain feels a disconnect that makes users subconsciously doubt the brand's message.",
      },
      {
        type: "scenario",
        question: "Why is this a UX 'Saboteur'?",
        scenario: "A mobile design has two links placed directly next to each other with no 'Air' (Negative Space) between them.",
        choices: [
          "It looks crowded",
          "It causes 'Fat-Finger' errors where users tap the wrong link",
          "It ruins the word shape",
          "It increases the Leading",
        ],
        correctAnswer: "It causes 'Fat-Finger' errors where users tap the wrong link",
        explanation: "Accessibility requires space for physical interaction. A mouse is precise; a thumb is not.",
      },
      {
        type: "scenario",
        question: "What fundamental typographic principle is missing?",
        scenario: "A page has 5 different sections, but every heading is the same size, weight, and color.",
        choices: ["Color Contrast", "Information Hierarchy", "Monospacing", "Anatomy"],
        correctAnswer: "Information Hierarchy",
        explanation: "Without a 'Visual Map,' the reader doesn't know where one section ends and the next begins.",
      },
      {
        type: "scenario",
        question: "Beyond the 'shouting' feel, why is All-Caps bad for long paragraphs?",
        scenario: "A paragraph of 'Instructions' is set entirely in All-Caps Bold. Users say it feels like the app is 'shouting' at them.",
        choices: [
          "It uses more battery",
          "It removes the unique 'Word Shapes' (Bouma), making reading slower",
          "It makes the text look too modern",
          "It decreases the tracking",
        ],
        correctAnswer: "It removes the unique 'Word Shapes' (Bouma), making reading slower",
        explanation: "Humans recognize words by their 'skyline.' If everything is a rectangle (All-Caps), those distinctive shapes disappear.",
      },
      {
        type: "scenario",
        question: "What 'Micro-Typography' tool do you use to nudge that single character down?",
        scenario: "You are using a font where the 'Copyright' symbol (©) looks too high compared to the text around it.",
        choices: ["Kerning", "Baseline Shift", "Leading", "Tracking"],
        correctAnswer: "Baseline Shift",
        explanation: "Baseline Shift is the professional's tool for fine-tuning the vertical position of a single character.",
      },
      {
        type: "scenario",
        question: "How should you adjust the Tracking to fix this?",
        scenario: "In Dark Mode, white text on black looks 'blurry' because the white light is bleeding into the black space (halation effect).",
        choices: [
          "Decrease Tracking (Tighten)",
          "Increase Tracking (Loosen)",
          "Make it Bold",
          "Change to Italic",
        ],
        correctAnswer: "Increase Tracking (Loosen)",
        explanation: "Loose Tracking in Dark Mode prevents the 'glow' from overlapping the letters. If the light is bleeding together, the letters need more space apart to stay clear.",
      },
      {
        type: "scenario",
        question: "Which tool helps you choose a headline size based on a consistent multiplier (like 1.618)?",
        scenario: "You have a body text size of 16px. You want your Headline to look 'mathematically perfect' in comparison.",
        choices: ["A Grid System", "A Type Scale", "A Kerning Table", "A Contrast Checker"],
        correctAnswer: "A Type Scale",
        explanation: "Professional designers don't just 'guess' sizes. A Type Scale creates harmony and professional polish using consistent mathematical ratios.",
      },

      /* ─── Part 2: Precision Pairing Masterclass (10 items) ─── */
      {
        type: "scenario",
        question: "Which heading font correctly pairs with a Humanist Serif body for a warm, professional healthcare brand?",
        scenario: "A high-end healthcare brand needs a 'Warm but Professional' look. You've chosen a Humanist Serif for the body text.",
        choices: [
          "A Geometric Sans (Perfect circles)",
          "A Neo-Grotesque (Neutral, like Helvetica)",
          "A Humanist Sans with matching calligraphic stroke modulation",
          "A Slab Serif with square terminals",
        ],
        correctAnswer: "A Humanist Sans with matching calligraphic stroke modulation",
        explanation: "Pairing Humanist with Humanist ensures the 'Handwritten DNA' carries through the whole layout. A purely geometric Sans-Serif would feel disconnected.",
      },
      {
        type: "scenario",
        question: "Which heading font prevents the baseline from feeling like it's 'vibrating'?",
        scenario: "You are pairing two different font families for a dense news app. If the 'Torsos' of the letters don't line up, lines of text feel unstable.",
        choices: [
          "A font with tiny x-height and tall ascenders",
          "A font with a Large X-Height that matches the body font's torso height",
          "A font with heavy stroke contrast",
          "An Ultra-Condensed font",
        ],
        correctAnswer: "A font with a Large X-Height that matches the body font's torso height",
        explanation: "Matching X-Heights is the secret to making two different fonts feel like a unified system.",
      },
      {
        type: "scenario",
        question: "Which heading font maintains functional legibility for a GPS wayfinding app?",
        scenario: "You are designing a wayfinding app. The body font has 'Open Apertures' for legibility at a glance. The header must match this functional logic.",
        choices: [
          "A font where the 'c' and 'e' are nearly closed circles",
          "A font where the 'c' and 'e' have wide, open gaps",
          "A font with very thin hairlines",
          "A Blackletter font",
        ],
        correctAnswer: "A font where the 'c' and 'e' have wide, open gaps",
        explanation: "Consistency in Aperture is vital. Open Apertures across both fonts ensure high-speed legibility for the entire interface.",
      },
      {
        type: "scenario",
        question: "Which subhead font won't overpower an elegant fashion logo?",
        scenario: "You are using a High-Contrast Serif (very thin and thick lines) for a fashion logo. You need a Sans-Serif subhead that preserves the elegance.",
        choices: [
          "A heavy, blocky Sans-Serif",
          "A Monolinear Sans-Serif matching the Serif's hairline thickness",
          "A Rounded Sans-Serif",
          "A Brush Script",
        ],
        correctAnswer: "A Monolinear Sans-Serif matching the Serif's hairline thickness",
        explanation: "Matching the Stroke Weight of the Sans-Serif to the Hairline of the Serif creates a sophisticated, 'airy' balance.",
      },
      {
        type: "scenario",
        question: "Which Serif body font shares the 'Geometric Soul' of a Futura heading?",
        scenario: "You are using Geometric Sans (like Futura) for your headings — built with a ruler and compass. You need a Serif for the body that shares the same geometric logic.",
        choices: [
          "A Humanist Serif (Organic)",
          "A Transitional Serif (Traditional)",
          "A Didone Serif (constructed with vertical lines and perfect circles)",
          "An Old-Style Serif (Renaissance)",
        ],
        correctAnswer: "A Didone Serif (constructed with vertical lines and perfect circles)",
        explanation: "Didone Serifs share the mathematical rigidity of Geometric Sans-Serifs, making them a 'Power Couple.'",
      },
      {
        type: "scenario",
        question: "Which button font creates 'Invisible Harmony' with a primary font that has perfectly round 'O's?",
        scenario: "Your primary font has 'O's that are perfectly round. You need a secondary font for the 'Call to Action' buttons.",
        choices: [
          "A font with Oval or Square bowls",
          "A font with matching Circular bowls",
          "A font with Compressed vertical letters",
          "A Monospaced font",
        ],
        correctAnswer: "A font with matching Circular bowls",
        explanation: "Matching the Geometric 'Bowl' Shape is a subtle detail that creates an 'Invisible Harmony.'",
      },
      {
        type: "scenario",
        question: "Which secondary font is the correct historical pairing for an 18th-century winery brand?",
        scenario: "You are designing a brand for a Modernized 18th-Century Winery. You've chosen a classic Old-Style Serif for the labels.",
        choices: [
          "A 1990s 'Grunge' font",
          "A High-Tech 'Cyber' Sans",
          "A Humanist Sans derived from the same 18th-century pen movements",
          "A Geometric Sans (1920s Bauhaus style)",
        ],
        correctAnswer: "A Humanist Sans derived from the same 18th-century pen movements",
        explanation: "Humanist Sans and Old-Style Serifs both share the 'DNA of the Pen,' creating a timeless, historically consistent pairing.",
      },
      {
        type: "scenario",
        question: "Which secondary font matches the tall ascenders of your primary font without looking 'stunted'?",
        scenario: "You are using a font with very tall Ascenders (the 'sticks' on the 'h', 'l', and 'd'). You need a secondary font that doesn't look like it's limping next to it.",
        choices: [
          "A font with very short, stumpy ascenders",
          "A font with matching Tall Ascenders",
          "A font with no lowercase letters",
          "A font with thick Slab serifs",
        ],
        correctAnswer: "A font with matching Tall Ascenders",
        explanation: "Matching Ascender Proportions ensures a consistent 'Vertical Rhythm' throughout the layout.",
      },
      {
        type: "scenario",
        question: "Which body font pairs correctly with a monolinear Sans-Serif (equal stroke thickness)?",
        scenario: "You are using a Sans-Serif with 'Low Modulation' — the strokes are the same thickness all the way around. You need a body font that doesn't clash.",
        choices: [
          "A high-contrast Serif (thick and thin)",
          "A Slab Serif (also monolinear, with equal thickness)",
          "A script with varying pressure",
          "An Italic-only font",
        ],
        correctAnswer: "A Slab Serif (also monolinear, with equal thickness)",
        explanation: "Low Modulation Sans pairs perfectly with Slab Serifs for a sturdy, industrial look. Keeping the 'Weight Logic' the same prevents a noisy pairing.",
      },
      {
        type: "scenario",
        question: "How do you balance a 'Light' Serif that looks crushed next to a 'Bold' Sans-Serif?",
        scenario: "You are pairing a 'Light' Serif with a 'Bold' Sans-Serif for a mobile app. The Sans-Serif looks 'too heavy' and is crushing the Serif visually.",
        choices: [
          "Make the Serif even thinner",
          "Increase the Tracking and Leading of the Serif to give it more Visual Presence",
          "Change the Sans-Serif to a Script",
          "Make both fonts the exact same pixel size",
        ],
        correctAnswer: "Increase the Tracking and Leading of the Serif to give it more Visual Presence",
        explanation: "Negative Space is a tool for balancing 'Optical Weight.' Adding 'Air' around a delicate font makes it appear Stronger next to a heavy neighbor.",
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    await Lesson.deleteMany({ title: /Lesson VII/ });
    console.log("🗑️  Cleared existing Lesson VII");

    const inserted = await Lesson.insertMany(lessons);
    console.log(`📚 Seeded ${inserted.length} lessons successfully`);
    for (const l of inserted) {
      console.log(`   • ${l.title} (${l.quiz.length} quiz items)`);
    }
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();