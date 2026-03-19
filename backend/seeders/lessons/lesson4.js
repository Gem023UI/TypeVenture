import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../models/lessons.js";

dotenv.config();

const LESSON_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773572640/936659a2-a9dd-4656-b65a-63d66d18a6a3.png";
const CONTENT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771160466/e8da1e5c-c8c3-4127-8b0a-73d3c2c174b5.png";

const lessons = [
  /* ══════════════════════════════════════════════════════
     LESSON 4 – Typeface Properties & Technical Manipulation
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson IV: Typeface Properties & Technical Manipulation",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797236/THE_MODULARITY_ISALND_yyeljt.png",
    youtubeUrl: "https://www.youtube.com/embed/5HxB4TZYI-c",
    description: "Typography is a deliberate process of shaping visual language through technical precision and aesthetic judgment. Understand baselines, x-height, kerning, tracking, and leading — the controlled relationships that make type breathe.",
    instruction: "Typography is not simply the arrangement of letters on a page. It is a deliberate process of shaping visual language through technical precision and aesthetic judgment. Every typeface contains a system of measurable properties — baselines, proportions, spacing, and alignment — that together determine how text is perceived and understood. These properties are elements of visual engineering, where designers manipulate the physical characteristics of letterforms to produce clarity, hierarchy, and emotional tone.",
    sections: [
      {
        header: "The Foundation: Baselines and the Optical Illusion of Leveling",
        discussion: "At the core of every typographic layout lies the baseline — the horizontal axis upon which most characters rest. Letters with flat bases (H, L, E) sit precisely on the baseline. Curved characters (O, C, Q) extend slightly below it — a phenomenon known as overshoot. Without this slight extension, round letters would appear smaller or misaligned due to how the human eye perceives curved forms. In grid-based design systems, the baseline becomes part of a larger baseline grid, where all textual elements align consistently along evenly spaced horizontal lines, establishing what is known as vertical rhythm.",
        images: [CONTENT_IMAGE, CONTENT_IMAGE, CONTENT_IMAGE],
        authorLink: "https://help.webflow.com/hc/en-us/articles/33961334261779-Advanced-web-typography",
      },
      {
        header: "The Core Mechanics: X-Height and Vertical Proportions",
        discussion: "The x-height refers to the height of lowercase letters, specifically 'x.' Lowercase letters have three main components: the x-height (central body), ascenders (parts extending above the x-height: b, d, h), and descenders (parts extending below the baseline: g, j, p, q, y). Typefaces with a large x-height appear larger and more compact, making characters easier to recognize at small sizes — ideal for digital interfaces. Traditional serif typefaces often feature smaller x-heights and longer ascenders and descenders, creating distinctive word shapes that enhance reading fluency through Bouma recognition — readers perceiving the overall silhouette of words rather than reading each letter.",
        images: [],
        authorLink: "",
      },
      {
        header: "The Geometry of Space: Font Size and Scaling",
        discussion: "Font size originates from early printing practices where metal type was cast on small lead blocks. In modern web design, relative units (em and rem) rather than fixed measurements (pt) allow typography to adapt to user device settings. If a visually impaired user increases default text size, a design built with relative units scales proportionally, preserving typographic hierarchy. This concept — fluid typography — ensures readability is maintained regardless of display conditions. Frameworks such as Material Design emphasize fluid typography for accessibility and responsive design.",
        images: [],
        authorLink: "",
      },
      {
        header: "The Horizontal Axis: Kerning and Tracking",
        discussion: "Kerning refers to the adjustment of spacing between specific pairs of letters. Certain combinations create awkward gaps because of their shapes — for example, A and V form a triangular gap when placed side by side. Professional typefaces include thousands of predefined kerning pairs. Tracking refers to the uniform adjustment of spacing across an entire word, sentence, or paragraph. Increasing tracking in all-caps text creates a more open and refined appearance, improving readability. Conversely, tightening tracking for large display headlines can transform a word into a cohesive visual shape.",
        images: [],
        authorLink: "",
      },
      {
        header: "The Breath of the Page: Line Spacing (Leading)",
        discussion: "Leading — from the lead strips inserted between metal type — determines how comfortably the reader's eye moves from one line to the next. If spacing is too tight, the eye may accidentally reread the same line (doubling). If too wide, the connection between lines weakens, causing paragraphs to feel fragmented. Erik Spiekermann suggests optimal leading typically ranges between 120% to 150% of the font size. Proper leading improves reading comfort, reduces cognitive load, creates visual balance, and is especially important in high-contrast designs such as light text on dark backgrounds.",
        images: [],
        authorLink: "",
      },
    ],
    quiz: [
      /* ─── Category 1: Kerning Slide ─── */
      {
        type: "kerning-slide",
        question: "The word AVERY has a huge hole between A and V. Slide the letter spacing until it looks balanced.",
        letterA: "A",
        letterB: "V",
        targetOffset: -12,
        tolerance: 6,
        min: -40,
        max: 10,
        correctAnswer: "correct",
        explanation: "Perfect! You closed the 'Visual Gap.' That is professional Kerning.",
      },
      {
        type: "kerning-slide",
        question: "The word WATCH has the W and A drifting apart. Slide them closer together.",
        letterA: "W",
        letterB: "A",
        targetOffset: -8,
        tolerance: 6,
        min: -40,
        max: 10,
        correctAnswer: "correct",
        explanation: "Nice! You fixed the 'texture' of the word.",
      },
      {
        type: "kerning-slide",
        question: "The word FLY looks like 'FL Y'. Bring the Y back to the rest of the word.",
        letterA: "L",
        letterB: "Y",
        targetOffset: -10,
        tolerance: 6,
        min: -40,
        max: 10,
        correctAnswer: "correct",
        explanation: "Excellent. Now it reads as one single word.",
      },
      {
        type: "kerning-slide",
        question: "The letters T and o in 'Top' are overlapping. Slide o slightly right to give them breathing room.",
        letterA: "T",
        letterB: "o",
        targetOffset: 3,
        tolerance: 4,
        min: -10,
        max: 20,
        correctAnswer: "correct",
        explanation: "Great! Letters should be close, but they shouldn't touch.",
      },
      {
        type: "kerning-slide",
        question: "A price tag shows '$ 9 . 00'. The 9 is too far from the dot. Slide them together for a clean price.",
        letterA: "9",
        letterB: ".",
        targetOffset: -6,
        tolerance: 4,
        min: -20,
        max: 10,
        correctAnswer: "correct",
        explanation: "Clean! You made the price easier to read at a glance.",
      },

      /* ─── Category 2: Leading Lines (interactive line-spacing slider) ─── */
      {
        type: "leading-lines",
        question: "Two lines of a story are crashing into each other — ascenders and descenders are colliding. Adjust the line spacing until the lines can breathe.",
        sentence1: "The quick brown fox jumps high",
        sentence2: "over the sleeping lazy dog.",
        minLeading: 10,
        maxLeading: 60,
        targetLeading: 28,
        toleranceLeading: 5,
        correctAnswer: "correct",
        explanation: "You added Leading so the eye can find the next line. Much better!",
      },
      {
        type: "leading-lines",
        question: "This paragraph looks like a solid black box — a 'wall of ink.' Increase line spacing so the text can breathe.",
        sentence1: "Typography is the visual form of language.",
        sentence2: "Great spacing reduces cognitive load.",
        minLeading: 10,
        maxLeading: 60,
        targetLeading: 32,
        toleranceLeading: 5,
        correctAnswer: "correct",
        explanation: "The paragraph can breathe now! This reduces Cognitive Load.",
      },
      {
        type: "leading-lines",
        question: "The lines are so close together that the reader keeps re-reading the same line. Fix the 'Doubling' problem by increasing line spacing.",
        sentence1: "Readers lose their place when lines",
        sentence2: "are spaced too tightly together.",
        minLeading: 10,
        maxLeading: 60,
        targetLeading: 30,
        toleranceLeading: 5,
        correctAnswer: "correct",
        explanation: "You fixed the 'Doubling' problem. Reading is smooth now.",
      },
      {
        type: "leading-lines",
        question: "A small mobile screen has text that blurs together vertically. Pull the lines apart slightly so it reads comfortably on a phone.",
        sentence1: "Mobile text needs extra vertical space",
        sentence2: "for comfortable on-screen reading.",
        minLeading: 10,
        maxLeading: 60,
        targetLeading: 26,
        toleranceLeading: 5,
        correctAnswer: "correct",
        explanation: "Great. Now a user can read this comfortably on a phone.",
      },
      {
        type: "leading-lines",
        question: "In Dark Mode, white text on black is 'bleeding' together because bright pixels glow into the gaps. Increase line spacing to stop the halation effect.",
        sentence1: "White text on dark backgrounds glows",
        sentence2: "and needs more space between lines.",
        minLeading: 10,
        maxLeading: 60,
        targetLeading: 34,
        toleranceLeading: 5,
        correctAnswer: "correct",
        explanation: "Perfect. Extra Leading is the secret to great Dark Mode design.",
      },

      /* ─── Category 3: X-Height Detective ─── */
      {
        type: "x-height-detective",
        question: "You need a font that stays clear and readable at a tiny size on a mobile screen. Which characteristic matters most?",
        choices: [
          "Small x-height with long, elegant ascenders",
          "Large x-height with open counters",
          "Thin strokes with high contrast",
          "Heavy weight with tight tracking",
        ],
        correctAnswer: "Large x-height with open counters",
        explanation: "A Large X-height is the 'Digital Survivor' — the bigger the body, the clearer the character at small sizes.",
      },
      {
        type: "x-height-detective",
        question: "You need a font for a fast highway sign readable at 70mph. Which characteristic is essential?",
        choices: [
          "Uniform height for all characters",
          "Very tight tracking",
          "Distinct ascenders and descenders creating a unique word silhouette",
          "A very large cap height",
        ],
        correctAnswer: "Distinct ascenders and descenders creating a unique word silhouette",
        explanation: "Ascenders and Descenders create a unique 'Word Shape.' Our brains instantly recognize the silhouette.",
      },
      {
        type: "x-height-detective",
        question: "You are designing for a digital dashboard. Which font characteristic aligns best with square-pixel screens?",
        choices: [
          "Lots of thin curves and delicate serifs",
          "Clean, straight lines (Sans-Serif)",
          "Heavy slab serifs with uniform stroke width",
          "Script letterforms with continuous strokes",
        ],
        correctAnswer: "Clean, straight lines (Sans-Serif)",
        explanation: "Sans-Serif fonts align with the pixel grid perfectly, making them clearer on digital screens.",
      },

      /* ─── Additional MCQ ─── */
      {
        type: "multiple-choice",
        question: "Which typographic phenomenon explains why curved letters like 'O' extend slightly below the baseline?",
        choices: ["Tracking", "Leading", "Overshoot", "Kerning"],
        correctAnswer: "Overshoot",
        explanation: "Overshoot ensures curved letters appear visually aligned even though they extend below the baseline — an optical correction based on human perception.",
      },
      {
        type: "multiple-choice",
        question: "Erik Spiekermann suggests optimal leading typically ranges between what percentage of the font size?",
        choices: ["80% to 100%", "100% to 110%", "120% to 150%", "160% to 200%"],
        correctAnswer: "120% to 150%",
        explanation: "Leading in the range of 120–150% of font size provides comfortable reading rhythm without fragmenting the text.",
      },
      {
        type: "multiple-choice",
        question: "What is the key advantage of using relative units (em/rem) over fixed units (pt) in web typography?",
        choices: [
          "They make fonts larger by default.",
          "They adapt to user device settings, preserving typographic hierarchy.",
          "They eliminate the need for leading adjustments.",
          "They only work with monospaced typefaces.",
        ],
        correctAnswer: "They adapt to user device settings, preserving typographic hierarchy.",
        explanation: "Relative units scale proportionally when a user changes their browser font size, ensuring the hierarchy remains balanced — crucial for accessibility.",
      },
      {
        type: "identification",
        question: "What is the term for the white space enclosed within or partially enclosed by a letterform, such as inside the letter 'O' or 'e'?",
        correctAnswer: "counter",
        explanation: "The counter is the enclosed or partially enclosed white space within a letter. Open counters improve legibility, especially at small sizes.",
      },
      {
        type: "identification",
        question: "What typographic term describes the phenomenon where readers recognize words by their overall shape or silhouette rather than reading each letter individually?",
        correctAnswer: "bouma",
        explanation: "Bouma recognition explains why typefaces with distinct ascenders and descenders aid reading fluency — the overall word shape is processed faster than individual letters.",
      },
      {
        type: "identification",
        question: "What is the term for the horizontal axis upon which most characters in a typeface rest?",
        correctAnswer: "baseline",
        explanation: "The baseline is the structural foundation of all typographic layout. It ensures visual stability and consistency across lines of text.",
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    await Lesson.deleteMany({ title: /Lesson IV/ });
    console.log("🗑️  Cleared existing Lesson IV");

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