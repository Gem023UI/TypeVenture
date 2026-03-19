import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const CONTENT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771160466/e8da1e5c-c8c3-4127-8b0a-73d3c2c174b5.png";

const lessons = [
  /* ══════════════════════════════════════════════════════
     LESSON 5 – Typography in Branding
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson V: Typography in Branding",
    difficulty: "Intermediate",
    completionTime: "~20 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797237/THE_RESPONSIVE_ISALND_alq1su.png",
    youtubeUrl: "https://www.youtube.com/embed/p6C7qFhy7ow",
    description:
      "In this lesson, the discussion moves beyond the structural mechanics of typography toward its strategic role in communication and branding. While previous lessons focused on the anatomy and manipulation of typefaces, typography in branding explores how these technical elements function as powerful tools for shaping public perception. Typography is one of the most influential visual components of a brand identity system. Before consumers consciously read the words on a page or screen, they subconsciously interpret the style of the letters used to present those words. The typeface becomes a visual voice, expressing personality, credibility, and emotional tone. For this reason, typography is not simply a design choice—it is a strategic decision that influences how a brand is perceived in the marketplace. Effective branding requires a consistent typographic system that reflects the company's values, resonates with its target audience, and adapts across multiple media platforms.",
    instruction:
      "Typography is one of the most influential visual components of a brand identity system. Before consumers consciously read the words on a page or screen, they subconsciously interpret the style of the letters used to present those words. The typeface becomes a visual voice, expressing personality, credibility, and emotional tone. For this reason, typography is not simply a design choice—it is a strategic decision that influences how a brand is perceived in the marketplace. The following sections examine how typography functions as a psychological signal, a contextual tool, a system of hierarchy, and an instrument of inclusive communication within modern branding practices.",
    sections: [
      {
        header: "I. Brand Personality: The Psychology of Typeface Choice",
        discussion:
          "Every typeface carries its own visual character and emotional associations, often referred to as the personality of the font. These associations are not arbitrary; they have developed through centuries of cultural use, historical context, and design conventions. As a result, different typefaces evoke different psychological responses in viewers. When designers select a typeface for a brand, they are effectively choosing the tone of voice that the brand will use in visual communication. Just as a spoken voice can sound formal, playful, authoritative, or friendly, the visual form of letters can convey similar qualities. Serif typefaces are historically rooted in classical Roman inscriptions and traditional printing practices. The small decorative strokes at the ends of the letters—known as serifs—create a sense of stability and continuity. Because of this historical association, serif fonts are often perceived as trustworthy, authoritative, and sophisticated. Institutions such as financial organizations, academic institutions, law firms, and traditional newspapers frequently rely on serif typography to reinforce their credibility and long-standing reputation. In contrast, sans-serif typefaces emerged during the modernist design movements of the twentieth century, where simplicity, clarity, and functionality became central design principles. Sans-serif fonts remove the decorative strokes of serif fonts, resulting in clean, minimalist letterforms that feel contemporary and efficient. Because of their clarity and modern appearance, sans-serif fonts are widely used by technology companies, digital platforms, and innovative startups seeking to communicate progressiveness and accessibility. Another category of typefaces includes script and handwritten fonts, which mimic the appearance of cursive handwriting. These fonts often convey elegance, creativity, warmth, or a handcrafted aesthetic. They are commonly used by brands in industries such as luxury fashion, boutique retail, beauty products, and artisanal food businesses where a sense of personal craftsmanship is desirable. Decorative or display typefaces are designed primarily for visual impact rather than readability. These fonts often feature elaborate shapes or unconventional structures and are typically used in headlines, logos, or short phrases rather than extended text. Design researchers and branding specialists frequently refer to this relationship between typography and perception as font psychology. According to this principle, the emotional tone of a typeface can either reinforce or contradict a brand's intended message. For example, if a cybersecurity company used a playful or whimsical script font, the result would be cognitive dissonance—a psychological mismatch between the seriousness of the service and the tone of the typography. Therefore, successful branding requires designers to carefully evaluate the symbolic meaning and emotional associations of typefaces.",
        images: [CONTENT_IMAGE, CONTENT_IMAGE, CONTENT_IMAGE],
        authorLink: "https://youtu.be/p6C7qFhy7ow?si=mek9bI3bYsjPbi8J",
      },
      {
        header: "II. Audience and Medium: Contextual Adaptability",
        discussion:
          "While typeface personality is important, typography must also adapt to the context in which it will be experienced. A brand rarely communicates through a single medium; instead, it interacts with audiences through websites, social media, advertisements, packaging, mobile applications, and physical environments. Each of these platforms imposes unique technical constraints and viewing conditions. Typography must therefore function as a flexible system, capable of maintaining brand consistency while adapting to different environments. One major factor in this adaptability is audience demographics. Designers must consider the characteristics of the intended audience when selecting and configuring typography. For instance, brands targeting older audiences may use larger font sizes, increased spacing, and higher color contrast to accommodate reduced visual acuity. Conversely, brands targeting younger audiences may experiment with bolder display fonts and more dynamic typographic arrangements. Cultural context also plays a role in typographic interpretation. Letterforms that appear neutral or professional in one cultural setting may carry different associations in another. Global brands must therefore conduct research to ensure that their typographic choices do not unintentionally convey inappropriate or misleading meanings in different regions. Another important consideration is the technical environment in which typography is displayed. A font that looks elegant in print may not perform well on digital screens. Thin strokes and intricate details can become difficult to read when rendered on low-resolution displays or compressed images. This challenge becomes particularly important in the era of responsive design, where websites and applications must function across a wide range of devices—from large desktop monitors to small smartphone screens and wearable devices. Typography must scale fluidly while preserving readability and hierarchy.",
        images: [],
        authorLink: "",
      },
      {
        header: "III. Strategic Constraints: Limiting Font Variety",
        discussion:
          "In professional branding systems, consistency is essential. One of the most effective ways to maintain visual consistency is by limiting the number of typefaces used within a brand identity. Designers often follow what is commonly known as the 'Rule of Two' or 'Rule of Three,' which suggests using two to three complementary typefaces within a brand's typographic system. This limitation helps create a clear and recognizable visual language that audiences can easily associate with the brand. A typical typographic system may include: a display typeface used for headlines, titles, or promotional content; a body typeface used for paragraphs and longer blocks of text; and an optional accent typeface used for small highlights, captions, or supporting elements. This structured approach allows designers to establish visual hierarchy, guiding the reader's attention through information in a logical order. Headlines capture attention first, subheadings organize content, and body text delivers the detailed message. Using too many fonts within a single brand identity can create visual confusion. When multiple unrelated typefaces compete for attention, the design becomes cluttered and difficult to read. This phenomenon is often referred to as visual noise, where excessive variation disrupts the clarity of communication. Strategic font pairing, however, can produce a balanced and harmonious design system.",
        images: [],
        authorLink: "",
      },
      {
        header: "IV. Inclusive Design: Accessibility as a Brand Value",
        discussion:
          "In contemporary design practice, typography must also meet the standards of inclusive and accessible communication. Accessibility ensures that information can be understood and navigated by people with diverse abilities, including individuals with visual impairments, dyslexia, or situational reading challenges. Typography plays a central role in accessibility because text is the primary medium through which information is conveyed in digital and print environments. Accessible typography requires attention to several key factors. Color Contrast: Text must have sufficient contrast with its background to remain readable under different lighting conditions. International accessibility standards recommend minimum contrast ratios to ensure that users with low vision can distinguish the text clearly. Letterform Clarity: Certain typefaces make it difficult to distinguish between similar characters, such as the uppercase 'I,' lowercase 'l,' and the numeral '1.' Accessible fonts are designed with distinct shapes that reduce confusion between these characters. Adequate Spacing: Proper letter spacing, word spacing, and line spacing help readers process information more comfortably. Tight spacing can make words appear crowded, while excessive spacing can disrupt reading flow. Readable Font Sizes: Small text sizes can create barriers for many readers. Accessible design encourages the use of scalable typography so that users can enlarge text without losing functionality or layout structure.",
        images: [],
        authorLink: "",
      },
      {
        header: "Conclusion: Typography as a Strategic Branding Tool",
        discussion:
          "Typography in branding is far more than aesthetic decoration. It is a strategic communication tool that shapes how audiences perceive and interact with a brand. Through careful selection and systematic application of typefaces, designers create a consistent visual voice that reflects a company's identity and values. Typeface personality communicates emotional tone, contextual adaptability ensures readability across platforms, strategic limitations create visual hierarchy, and accessibility guarantees inclusivity. Together, these principles transform typography into a powerful instrument of brand storytelling. In the modern design landscape, brands that understand and apply these typographic principles gain a significant advantage. Their visual identities become clearer, more recognizable, and more meaningful to their audiences—demonstrating that the careful design of letters can influence not only how messages are read, but also how they are remembered.",
        images: [],
        authorLink: "",
      },
    ],
    quiz: [
      /* ─── EASY: Branding Face-Offs (10 items) ─── */
      {
        type: "scenario",
        question: "A bank needs to look 'Safe, Strong, and Trustworthy.' Which font should they choose?",
        scenario: "Font A: A thin, curly Script font with hearts. Font B: A bold, thick Slab Serif (like a 19th-century safe).",
        choices: ["Font A — thin, curly Script font with hearts", "Font B — bold, thick Slab Serif"],
        correctAnswer: "Font B — bold, thick Slab Serif",
        explanation: "Slab Serifs project authority and physical strength. A thin, curly script would create cognitive dissonance — you would not trust a bank that looks like a wedding invitation.",
      },
      {
        type: "scenario",
        question: "A courier company wants to look 'Lightning Fast and Efficient.' Which font should they choose?",
        scenario: "Font A: An Italic (Slanted) Sans-Serif (leaning forward). Font B: A tall, vertical Old Style Serif with curly feet.",
        choices: ["Font A — Italic (Slanted) Sans-Serif leaning forward", "Font B — tall, vertical Old Style Serif with curly feet"],
        correctAnswer: "Font A — Italic (Slanted) Sans-Serif leaning forward",
        explanation: "Italic Sans-Serifs create a 'Visual Forward Motion' that signals speed. A straight, old-fashioned newspaper font does not look like it is in a hurry.",
      },
      {
        type: "scenario",
        question: "An organic farm wants to look 'Hand-Grown and Personal.' Which font should they choose?",
        scenario: "Font A: A cold, sharp Geometric Sans-Serif (built with a ruler). Font B: A soft, Rounded Sans-Serif or Hand-Drawn Script.",
        choices: ["Font A — cold, sharp Geometric Sans-Serif", "Font B — soft, Rounded Sans-Serif or Hand-Drawn Script"],
        correctAnswer: "Font B — soft, Rounded Sans-Serif or Hand-Drawn Script",
        explanation: "Hand-Drawn styles create a 'Handcrafted' emotional DNA. Perfect circles and squares feel like a factory. To feel 'Organic,' you need shapes that look like they were made by a human hand.",
      },
      {
        type: "scenario",
        question: "A high-end perfume brand wants to look 'Elegant and Expensive.' Which font should they choose?",
        scenario: "Font A: A High-Contrast Serif with very thin and very thick lines (like Vogue). Font B: A heavy, blocky Monospaced font (like a computer terminal).",
        choices: ["Font A — High-Contrast Serif with thin and thick lines", "Font B — heavy, blocky Monospaced font"],
        correctAnswer: "Font A — High-Contrast Serif with thin and thick lines",
        explanation: "High-Contrast Serifs are the international visual language of 'High Fashion.' Luxury is about grace and detail — a chunky computer font does not feel like a $200 bottle of perfume.",
      },
      {
        type: "scenario",
        question: "A children's toy brand wants to look 'Playful and Energetic.' Which font should they choose?",
        scenario: "Font A: A stiff, all-caps Traditional Serif (like a law book). Font B: A Bouncy, Irregular Decorative font with different heights.",
        choices: ["Font A — stiff, all-caps Traditional Serif", "Font B — Bouncy, Irregular Decorative font"],
        correctAnswer: "Font B — Bouncy, Irregular Decorative font",
        explanation: "Irregular shapes break the 'Grid' and create a sense of energy and play. A serious, straight law-office font does not make you want to play with toys.",
      },
      {
        type: "scenario",
        question: "A 100-year-old news outlet wants to look 'Authoritative and Historical.' Which font should they choose?",
        scenario: "Font A: A modern Sans-Serif (like Arial). Font B: A classic Blackletter or Old Style Serif.",
        choices: ["Font A — modern Sans-Serif like Arial", "Font B — classic Blackletter or Old Style Serif"],
        correctAnswer: "Font B — classic Blackletter or Old Style Serif",
        explanation: "Serifs and Blackletter styles communicate legacy and 'The Truth.' History lives in the 'feet' of the letters.",
      },
      {
        type: "scenario",
        question: "A robotics company wants to look 'Innovative and Minimalist.' Which font should they choose?",
        scenario: "Font A: A clean, wide Geometric Sans-Serif. Font B: A vintage Script font (like a 1950s diner).",
        choices: ["Font A — clean, wide Geometric Sans-Serif", "Font B — vintage Script font like a 1950s diner"],
        correctAnswer: "Font A — clean, wide Geometric Sans-Serif",
        explanation: "Sans-Serif is the 'Voice' of the future and tech efficiency. Innovation is about removing clutter.",
      },
      {
        type: "scenario",
        question: "A neighborhood cafe wants to look 'Cozy and Friendly.' Which font should they choose?",
        scenario: "Font A: A sharp, aggressive All-Caps Slab Serif. Font B: A soft, Lower-case Rounded font.",
        choices: ["Font A — sharp, aggressive All-Caps Slab Serif", "Font B — soft, Lower-case Rounded font"],
        correctAnswer: "Font B — soft, Lower-case Rounded font",
        explanation: "Rounded letters remove 'visual friction' and feel more inviting. Sharp corners feel 'cold' while soft, rounded corners feel like a warm hug.",
      },
      {
        type: "scenario",
        question: "A watch brand wants to look 'Precise and Timeless.' Which font should they choose?",
        scenario: "Font A: A Thin Sans-Serif with lots of letter-spacing (Tracking). Font B: A bubbly, thick Cartoon font.",
        choices: ["Font A — Thin Sans-Serif with generous letter-spacing", "Font B — bubbly, thick Cartoon font"],
        correctAnswer: "Font A — Thin Sans-Serif with generous letter-spacing",
        explanation: "Generous Tracking and thin lines signal 'Luxury Precision.' A thick, bubbly font does not look like it can measure time to the millisecond.",
      },
      {
        type: "scenario",
        question: "A bodybuilding gym wants to look 'Powerful and Heavy.' Which font should they choose?",
        scenario: "Font A: A light, airy Italic Serif. Font B: An Extra-Bold, Compressed Sans-Serif.",
        choices: ["Font A — light, airy Italic Serif", "Font B — Extra-Bold, Compressed Sans-Serif"],
        correctAnswer: "Font B — Extra-Bold, Compressed Sans-Serif",
        explanation: "Extra-Bold weights communicate physical power and impact. If you are lifting heavy weights, you need a font that looks like it weighs 500 lbs.",
      },
      /* ─── MEDIUM: Strategic Consultant (7 items) ─── */
      {
        type: "scenario",
        question: "A 100-year-old bank is launching a modern mobile app. They want to look 'Innovative but still Trustworthy.' Which font best bridges this gap?",
        scenario: "Font A: A very thin, ultra-modern Geometric Sans-Serif. Font B: A Humanist Sans-Serif (clean like tech, but with calligraphic strokes that feel traditional).",
        choices: ["Font A — very thin, ultra-modern Geometric Sans-Serif", "Font B — Humanist Sans-Serif with calligraphic strokes"],
        correctAnswer: "Font B — Humanist Sans-Serif with calligraphic strokes",
        explanation: "Humanist Sans-Serifs bridge the gap between 'Digital' and 'Human Trust.' A purely geometric font can feel 'cold' and 'robotic,' lacking the human touch needed to maintain 100 years of trust.",
      },
      {
        type: "scenario",
        question: "A credit card company for everyone wants to look 'Accessible and Error-Free.' Which font best supports this mission?",
        scenario: "Font A: A 'Grotesque' Sans-Serif where 'I', 'l', and '1' are identical vertical lines. Font B: A Highly Legible Sans-Serif with distinct 'hooks' on the 'l' and a base on the '1'.",
        choices: ["Font A — Grotesque Sans-Serif with identical vertical lines", "Font B — Highly Legible Sans-Serif with distinct character shapes"],
        correctAnswer: "Font B — Highly Legible Sans-Serif with distinct character shapes",
        explanation: "Distinct Character Shapes are an ethical design choice that proves the brand cares about all users. If a user cannot distinguish a number from a letter in their account balance, the brand fails.",
      },
      {
        type: "scenario",
        question: "A digital news site wants to look 'Hard-Hitting, Urgent, and Loud.' Which font best creates this effect?",
        scenario: "Font A: A Wide, Airy Extended Sans-Serif. Font B: A Tall, Compressed, Heavy Sans-Serif (like Impact or Headline styles).",
        choices: ["Font A — Wide, Airy Extended Sans-Serif", "Font B — Tall, Compressed, Heavy Sans-Serif"],
        correctAnswer: "Font B — Tall, Compressed, Heavy Sans-Serif",
        explanation: "Compressed Bold fonts create a 'Visual Shout' perfect for high-impact headlines. 'Wide' fonts feel expensive and slow — to look 'Urgent' you need a font that feels crowded and shouting.",
      },
      {
        type: "scenario",
        question: "A Michelin-star restaurant wants to look 'Handcrafted but Luxury.' Which font best serves this dual identity?",
        scenario: "Font A: A casual, messy Brush Script. Font B: A Refined, High-Contrast Serif with subtle 'hand-carved' terminals.",
        choices: ["Font A — casual, messy Brush Script", "Font B — Refined, High-Contrast Serif with hand-carved terminals"],
        correctAnswer: "Font B — Refined, High-Contrast Serif with hand-carved terminals",
        explanation: "A Refined Serif suggests the precision of a chef while keeping a 'human' historical touch. Too much 'hand-drawn' energy can look 'cheap' — luxury needs 'High Contrast' to feel expensive.",
      },
      {
        type: "scenario",
        question: "An architecture firm wants to look 'Structural, Mathematical, and Unshakable.' Which font best embodies this identity?",
        scenario: "Font A: A Geometric Sans-Serif based on perfect circles and squares. Font B: A Humanist Sans-Serif based on the flow of the human hand.",
        choices: ["Font A — Geometric Sans-Serif based on perfect circles and squares", "Font B — Humanist Sans-Serif based on human hand flow"],
        correctAnswer: "Font A — Geometric Sans-Serif based on perfect circles and squares",
        explanation: "Geometric fonts represent the 'Logic of the System' and structural perfection. Architecture is built on blueprints and math — this font looks like it was drawn with a compass and a ruler.",
      },
      {
        type: "scenario",
        question: "A clothing brand for Gen-Z wants to look 'Trendy, Rebellious, and Rule-Breaking.' Which font choice best achieves this?",
        scenario: "Font A: A perfectly balanced Helvetica (Neutral and Safe). Font B: An Extra-Wide, High-Contrast Display font with 'Reverse Contrast' (thick tops, thin sides).",
        choices: ["Font A — perfectly balanced Helvetica", "Font B — Extra-Wide, High-Contrast Display with Reverse Contrast"],
        correctAnswer: "Font B — Extra-Wide, High-Contrast Display with Reverse Contrast",
        explanation: "Experimental Display fonts signal that a brand is ahead of the curve and not afraid to be different. Helvetica is the ultimate 'safe' choice — to be a 'Trendsetter,' you need a font that breaks the rules.",
      },
      {
        type: "scenario",
        question: "A company that builds back-end servers wants to look 'Technical, Precise, and Developer-Friendly.' Which font best communicates this?",
        scenario: "Font A: A beautiful Serif font with elegant curves. Font B: A high-quality Monospaced font (where every letter is the same width).",
        choices: ["Font A — beautiful Serif with elegant curves", "Font B — high-quality Monospaced font"],
        correctAnswer: "Font B — high-quality Monospaced font",
        explanation: "Using a Monospaced font for a tech brand signals 'We speak the language of the machine.' Developers live in the world of 'Code' — Monospaced is the universal language of software engineering.",
      },
      /* ─── HARD: Senior Director Audit (5 items) ─── */
      {
        type: "multiple-choice",
        question: "A heritage French fashion house is expanding into Digital-First Accessories (smartwatches and apps). They must maintain 'Ultra-High-End' status while surviving low-resolution screens. Which typeface is the correct strategic choice?",
        choices: [
          "A Didone Serif (extremely thin hairlines and thick stems)",
          "A Geometric Sans-Serif with tight tracking",
          "A Transitional Serif with increased x-height and sturdy hairlines",
          "A Humanist Script based on 18th-century handwriting",
        ],
        correctAnswer: "A Transitional Serif with increased x-height and sturdy hairlines",
        explanation: "Transitional Serifs (like Baskerville or its modern cousins) offer the perfect balance of 'Classical Authority' and 'Digital Durability.' Didone hairlines will disappear on a small screen.",
      },
      {
        type: "multiple-choice",
        question: "A national healthcare provider needs a typeface for an app used by people with Dyslexia and Visual Impairments. The brand must feel 'Professional' but 'Utterly Readable.' Which is the correct choice?",
        choices: [
          "A Grotesque Sans-Serif with mirrored shapes (where 'b' and 'd' are identical flips)",
          "A Sans-Serif with Asymmetric characters and distinct openings (Apertures)",
          "A Slab Serif with very heavy weights and tight leading",
          "A Monospaced font to ensure character alignment",
        ],
        correctAnswer: "A Sans-Serif with Asymmetric characters and distinct openings (Apertures)",
        explanation: "Asymmetric character design is a hallmark of 'Inclusive Branding.' For users with Dyslexia, 'Mirrored' letters cause confusion — every letter needs a unique weight or shape.",
      },
      {
        type: "multiple-choice",
        question: "A 'Sustainable Wealth' firm wants to attract Gen-Z investors. They want to look 'Organic and Ethical' but also 'Financially Powerful.' Which typeface best serves this dual mission?",
        choices: [
          "A Rounded Sans-Serif (very soft and bubbly)",
          "A Blackletter font (Gothic/Historical)",
          "A High-Contrast Modern Serif with sharp edges",
          "A Semi-Serif with Soft Terminals (rounded tips) and a sturdy structure",
        ],
        correctAnswer: "A Semi-Serif with Soft Terminals (rounded tips) and a sturdy structure",
        explanation: "Semi-Serifs with Soft Terminals communicate 'Natural Growth' without sacrificing the feeling of 'Financial Stability.' You need a hybrid with the bone structure of a bank and the softness of nature.",
      },
      {
        type: "multiple-choice",
        question: "A massive Social Media platform is accused of being 'Cold and Robotic.' They want a rebrand that feels 'Conversational, Friendly, and Human.' Which typeface is the correct strategic choice?",
        choices: [
          "A Geometric Sans-Serif (like Futura or Product Sans)",
          "A Humanist Sans-Serif with a True Italic (cursive-style slanted letters)",
          "A Monospaced font to look like code",
          "A Square-Slab Serif to look structural",
        ],
        correctAnswer: "A Humanist Sans-Serif with a True Italic (cursive-style slanted letters)",
        explanation: "Humanist Sans-Serifs use biological proportions to feel 'Conversational.' Geometric fonts are built by machines — to feel 'Human,' you need a font whose DNA comes from Calligraphy.",
      },
      {
        type: "multiple-choice",
        question: "A high-fashion streetwear brand wants to look 'Aggressive, Brutalist, and Intentional,' ignoring traditional beauty entirely. Which typeface is the correct strategic choice?",
        choices: [
          "A Classic Serif (like Garamond)",
          "A Script font with elegant loops",
          "A Grotesque Sans-Serif with Ink Traps and Reverse Contrast",
          "A Light Sans-Serif with extra-wide tracking",
        ],
        correctAnswer: "A Grotesque Sans-Serif with Ink Traps and Reverse Contrast",
        explanation: "Ink Traps and Reverse Contrast are the visual language of 'Brutalist Design,' projecting raw, unpolished power. To be 'Brutalist,' the font should look like it was built for a factory, not a palace.",
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    await Lesson.deleteMany({ title: /Lesson V:/ });
    console.log("🗑️  Cleared existing Lesson V");

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