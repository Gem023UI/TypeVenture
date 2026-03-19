import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const CONTENT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771160466/e8da1e5c-c8c3-4127-8b0a-73d3c2c174b5.png";

const lessons = [
  /* ══════════════════════════════════════════════════════
     LESSON 6 – Best Practices in Typography
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson VI: Best Practices in Typography",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797240/THE_PYSCHOLODICAL_ISALND_jzaeuz.png",
    youtubeUrl: "https://www.youtube.com/embed/estMrKHqByE",
    description:
      "To conclude this typography masterclass, we shift our focus from theory and structural understanding to professional execution. While earlier lessons explored the anatomy of typefaces and their strategic role in branding, this final lesson examines the best practices used by professional designers to transform typographic knowledge into effective visual communication. Typography in professional design environments is not based on guesswork or personal preference. Instead, it relies on established guidelines developed through decades of usability studies, cognitive psychology research, and design experimentation. These practices help designers create layouts that are not only aesthetically appealing but also highly functional, readable, and accessible. The principles discussed in this lesson represent the refined techniques that distinguish amateur typographic layouts from professional interface design. By applying these practices consistently, designers ensure that typography contributes to clarity, hierarchy, and user comfort across both print and digital environments.",
    instruction:
      "Typography in professional design environments is not based on guesswork or personal preference. Instead, it relies on established guidelines developed through decades of usability studies, cognitive psychology research, and design experimentation. These practices help designers create layouts that are not only aesthetically appealing but also highly functional, readable, and accessible. The principles discussed in this lesson represent the refined techniques that distinguish amateur typographic layouts from professional interface design. By applying these practices consistently, designers ensure that typography contributes to clarity, hierarchy, and user comfort across both print and digital environments.",
    sections: [
      {
        header: "1. Achieving Visual Balance and Harmony",
        discussion:
          "Visual balance is one of the most fundamental goals of typographic design. In a well-designed layout, typography must work harmoniously with images, color schemes, icons, and other visual components. The goal is to create a composition where no element overwhelms the others, allowing the viewer to process information effortlessly. Typography contributes to balance through several adjustable properties: Weight – the thickness or boldness of letterforms; Width – the horizontal proportion of characters; Color – the tonal contrast between text and background; and Scale – the size relationship between typographic elements. These properties determine how much visual 'weight' text carries within a design. For example, large bold headlines create strong visual anchors, while lighter body text provides supporting information. In luxury branding, designers often use thin font weights combined with generous white space. This approach creates a sense of sophistication, elegance, and exclusivity. Conversely, in information-dense environments such as financial dashboards, medical interfaces, or data visualization systems, typography must be more structured and robust.",
        images: [CONTENT_IMAGE, CONTENT_IMAGE, CONTENT_IMAGE],
        authorLink: "https://help.webflow.com/hc/en-us/articles/33961334261779-Advanced-web-typography",
      },
      {
        header: "2. The Discipline of Limiting Font Variety",
        discussion:
          "One of the most frequent mistakes among beginner designers is the tendency to use too many different fonts in a single design. This phenomenon is often referred to as the 'font soup' effect, where multiple unrelated typefaces compete for attention. Professional designers follow a strict guideline that limits typographic systems to two or three fonts per project. This restriction is not meant to limit creativity but rather to ensure consistency and clarity. Instead of introducing new typefaces to create variation, experienced designers explore the internal flexibility of a single type family. Most professional typefaces include a wide range of variations, such as Light, Regular, Medium, Bold, Extra Bold, Italic, and Condensed or Extended versions. By manipulating these variations, designers can build a sophisticated typographic hierarchy while maintaining a unified visual identity.",
        images: [],
        authorLink: "",
      },
      {
        header: "3. Mastering Typographic Contrast",
        discussion:
          "Contrast is the primary mechanism used to organize information within a layout. Without contrast, all text appears visually similar, making it difficult for readers to determine what information is most important. Typographic contrast can be created in several ways: Size Contrast — large headlines immediately capture attention, while smaller body text delivers supporting details. Weight Contrast — bold text stands out against regular or light text, helping to highlight key information. Style Contrast — combining serif and sans-serif fonts can create visual interest and personality within a layout. Color Contrast — differences in color between text and background can emphasize important elements and improve readability. Effective contrast establishes a clear information hierarchy, guiding readers through content in a logical order. In addition to aesthetic contrast, designers must also ensure functional contrast, particularly in terms of color accessibility. International accessibility standards recommend maintaining specific contrast ratios between text and background colors to ensure readability for users with visual impairments or color blindness.",
        images: [],
        authorLink: "",
      },
      {
        header: "4. The Science of Optimal Line Length (Measure) & Professional Tools",
        discussion:
          "The measure refers to the horizontal width of a block of text, typically measured by the number of characters contained in a single line. Research in readability has shown that line length has a significant impact on reading speed, comprehension, and eye movement patterns. If lines are too long, readers may struggle to locate the beginning of the next line after finishing the previous one. This problem is known as doubling, and it disrupts the natural rhythm of reading. Studies in typographic ergonomics have identified an optimal range of 50 to 75 characters per line for body text. Modern digital design workflows also rely heavily on specialized tools that help maintain typographic consistency across complex projects. These tools act as a 'Single Source of Truth', ensuring that typographic styles remain standardized throughout the project.",
        images: [],
        authorLink: "",
      },
      {
        header: "5. Line Height, Font Scaling, and Mobile Typography",
        discussion:
          "Line height, traditionally known as leading, refers to the vertical spacing between lines of text measured from baseline to baseline. This spacing plays a crucial role in determining how easily readers can scan and interpret paragraphs. If lines are placed too close together, the descenders of one line may collide visually with the ascenders of the line below, creating a crowded appearance that slows down reading and increases visual fatigue. Professional typographic practice generally recommends a line height between 120% and 180% of the font size. Digital environments often benefit from slightly larger line heights than print to compensate for the pixel glow effect, where illuminated screens can make tightly spaced text appear blurry or congested. For font sizes, 16 pixels is widely recognized as the minimum comfortable size for body text in web interfaces. Professional designers use type scales — such as Major Third, Perfect Fourth, or the Golden Ratio — to create proportional relationships between different text elements.",
        images: [],
        authorLink: "",
      },
    ],
    quiz: [
      /* ─── PART 1 EASY: The Layout Fixer (5 scenario items) ─── */
      {
        type: "scenario",
        question: "A blog post stretches across the entire width of a 27-inch monitor with lines over 200 characters long. Which adjustment correctly fixes the Measure?",
        scenario: "A junior designer submitted a draft where text spans the full screen width, causing extreme eye fatigue when trying to find the start of the next line.",
        choices: [
          "Increase the font size so fewer words fit per line",
          "Shrink the text container width until lines reach 50–75 characters per line",
          "Increase letter-spacing (tracking) to fill out the long lines",
          "Switch to a condensed typeface to fit more content",
        ],
        correctAnswer: "Shrink the text container width until lines reach 50–75 characters per line",
        explanation: "50–75 characters per line is the 'Sweet Spot' for comfortable reading speed and comprehension. When a line is too long, the eye gets lost trying to find the start of the next one — this is known as doubling.",
      },
      {
        type: "scenario",
        question: "A mobile news app has text where descenders are crashing into the ascenders on the line below, creating a 'visual traffic jam.' Which adjustment fixes this?",
        scenario: "Letters from one line are visually colliding with the letters in the line below, slowing reading and causing visual fatigue.",
        choices: [
          "Decrease the font size so letters take up less space",
          "Switch to a sans-serif font with no descenders",
          "Increase the Line Height (Leading) to approximately 140% of the font size",
          "Tighten the tracking so words are more compact",
        ],
        correctAnswer: "Increase the Line Height (Leading) to approximately 140% of the font size",
        explanation: "Increasing Line Height to 140% adds 'lungs' to the page and significantly reduces the reader's Cognitive Load.",
      },
      {
        type: "scenario",
        question: "A Dark Mode interface uses dark grey text on a black background. Users cannot read it clearly. Which fix correctly addresses this 'low-contrast disaster'?",
        scenario: "The text color and background are too similar in brightness, failing the WCAG accessibility check and making text disappear for users in direct sunlight.",
        choices: [
          "Switch to a bold font weight to add visual mass",
          "Increase the font size to 24px minimum",
          "Slide the text color brightness up until it passes the WCAG contrast ratio check",
          "Add a text-shadow to create the illusion of contrast",
        ],
        correctAnswer: "Slide the text color brightness up until it passes the WCAG contrast ratio check",
        explanation: "Inclusive Design ensures everyone can read your message regardless of their lighting or vision. Sufficient WCAG contrast is not only a design best practice but also an ethical responsibility.",
      },
      {
        type: "scenario",
        question: "A landing page uses 6 different fonts (Script, Slab, Sans, Serif, and more). It looks chaotic. Which action correctly applies the Rule of Two?",
        scenario: "Multiple unrelated typefaces are competing for attention across the page, creating a 'font soup' that confuses users and weakens the brand identity.",
        choices: [
          "Keep all 6 fonts but assign each a specific color",
          "Delete 4 fonts, keeping only one Display font for headers and one Workhorse font for body text",
          "Replace all fonts with a single monospaced typeface",
          "Reduce all fonts to the same size so they feel more unified",
        ],
        correctAnswer: "Delete 4 fonts, keeping only one Display font for headers and one Workhorse font for body text",
        explanation: "The Rule of Two limits the typographic palette to 2–3 complementary fonts. Too many styles create 'Visual Noise' that confuses the user.",
      },
      {
        type: "scenario",
        question: "On a smartphone, a desktop-sized headline is so large that only one or two letters fit on each line, breaking the layout completely. Which fix is correct?",
        scenario: "A 96px desktop headline is being displayed on a mobile screen, causing severe line breaks that destroy visual balance and readability.",
        choices: [
          "Keep the size but reduce the letter spacing to compress the word",
          "Scale the headline down to approximately 32px to fit the mobile breakpoint",
          "Switch the headline to all-lowercase to reduce its visual footprint",
          "Add a line break after every three characters manually",
        ],
        correctAnswer: "Scale the headline down to approximately 32px to fit the mobile breakpoint",
        explanation: "This is the core principle of Responsive Typography — font sizes must adapt to the viewing environment.",
      },
      /* ─── PART 1 MEDIUM: Senior UI Architect (5 scenario items) ─── */
      {
        type: "scenario",
        question: "A financial dashboard uses 10px Light weight font for stock prices. The numbers are 'washing out.' You cannot change the layout width. What is the correct adjustment?",
        scenario: "Tiny numbers in a light font weight are disappearing into the background on a laptop screen. The column width is fixed and cannot be changed.",
        choices: [
          "Switch to Bold weight to increase mass",
          "Increase Font Weight to Medium and add +2% Tracking",
          "Increase font size to 14px and reduce column padding",
          "Switch to a high-contrast Serif font",
        ],
        correctAnswer: "Increase Font Weight to Medium and add +2% Tracking",
        explanation: "When fonts get small, they lose 'Visual Mass.' Making them Medium weight with a little extra Tracking maintains Data Density without sacrificing legibility.",
      },
      {
        type: "scenario",
        question: "A news article has a Headline at 32px and a Subheading at 30px. They appear to be the same size and are fighting for visual attention, making the page feel flat. What is the correct fix?",
        scenario: "The hierarchy between Headline and Subheading is unclear because the size difference is too small — only 2px apart.",
        choices: [
          "Make both the same size but use different colors",
          "Set the Subheading to 24px following a Major Third scale to create a clear Visual Jump",
          "Make the Headline italic to differentiate it from the Subheading",
          "Increase the Subheading weight to Bold to make it stand out",
        ],
        correctAnswer: "Set the Subheading to 24px following a Major Third scale to create a clear Visual Jump",
        explanation: "Typographic Contrast through scale creates a 'Visual Map' telling the reader exactly where to start and what to read next.",
      },
      {
        type: "scenario",
        question: "A narrow sidebar has only 20 characters per line, making text feel 'jumpy' and frantic as the eye must return to a new line every two words. What is the correct fix?",
        scenario: "The extremely short measure is causing rapid eye movement and interrupting cognitive flow. The sidebar width cannot be increased.",
        choices: [
          "Increase font size so fewer characters fit per line",
          "Slightly decrease Leading and decrease Font Size to fit 40–50 characters per line",
          "Switch to a wider, extended typeface to stretch each word",
          "Increase word spacing so each line appears longer",
        ],
        correctAnswer: "Slightly decrease Leading and decrease Font Size to fit 40–50 characters per line",
        explanation: "By shrinking the text size slightly, more words fit on one line, slowing down the rhythm and allowing the eye to flow naturally.",
      },
      {
        type: "scenario",
        question: "On a mobile checkout page, a 12px 'Terms and Conditions' link is buried inside a tight paragraph. Users keep accidentally tapping the 'Buy Now' button instead. What is the correct fix?",
        scenario: "The touch target for the link is physically too small, and tight line spacing means users' fingers frequently hit the wrong element.",
        choices: [
          "Bold the link text so it stands out visually",
          "Move the link to the bottom of the page away from the button",
          "Increase Line Height to 160% and add 8px of Touch-Target padding around the link",
          "Increase font size to 16px only for the link text",
        ],
        correctAnswer: "Increase Line Height to 160% and add 8px of Touch-Target padding around the link",
        explanation: "Accessibility isn't just about eyes — it's about the physical interaction between a human thumb and the screen interface. The Touch Target needs Physical Air so it can be tapped safely.",
      },
      {
        type: "scenario",
        question: "A Power User interface uses bright neon green text on a dark grey background. Users report the text 'vibrates' and causes eye strain after 5 minutes. What is the correct fix?",
        scenario: "High-saturation neon text on dark backgrounds is causing visual vibration (halation), where glowing pixels appear to shimmer and merge together.",
        choices: [
          "Switch to white text to eliminate the color entirely",
          "Reduce the text saturation to a muted green and increase Leading to 150%",
          "Add a drop shadow to separate the text from the background",
          "Reduce font weight to thin so the text occupies fewer pixels",
        ],
        correctAnswer: "Reduce the text saturation to a muted green and increase Leading to 150%",
        explanation: "High-saturation colors on dark backgrounds cause 'Visual Vibration' in the eye. Dulling the color slightly and giving lines more 'Breath' stops glowing pixels from merging together.",
      },
      /* ─── PART 2: Final Mastery (5 multiple-choice items) ─── */
      {
        type: "multiple-choice",
        question: "What is the 'Rule of Two' in professional typography?",
        choices: [
          "Use only two colors on the page.",
          "Limit the typographic palette to 2–3 complementary fonts.",
          "Headlines must be exactly twice the size of body text.",
          "Every paragraph must have only two lines.",
        ],
        correctAnswer: "Limit the typographic palette to 2–3 complementary fonts.",
        explanation: "The Rule of Two keeps Visual Hierarchy clear and the brand identity strong. Using too many fonts creates 'Font Soup' — a cluttered, amateurish appearance.",
      },
      {
        type: "multiple-choice",
        question: "What is the risk of a 'Measure' (line length) that is too long?",
        choices: [
          "The font file size becomes too large for mobile.",
          "The eye struggles to find the start of the next line — a problem known as 'Doubling'.",
          "The ink or pixels will bleed into the counters.",
          "It forces the font to become Monospaced.",
        ],
        correctAnswer: "The eye struggles to find the start of the next line — a problem known as 'Doubling'.",
        explanation: "50–75 characters is the sweet spot for human biology. When a line is too long, the eye loses its place after reaching the end.",
      },
      {
        type: "multiple-choice",
        question: "Why is a 'Type Scale' (such as the Golden Ratio or Major Third) used for font sizes in professional design?",
        choices: [
          "To make the code run faster.",
          "To ensure the jump between a subhead and a title feels intentional and proportional.",
          "To save space on small smartphone screens.",
          "To match the baseline overshoot of round letters.",
        ],
        correctAnswer: "To ensure the jump between a subhead and a title feels intentional and proportional.",
        explanation: "Mathematical Proportions create a sense of harmony that the eye subconsciously appreciates. Without a scale, you are just guessing sizes.",
      },
      {
        type: "multiple-choice",
        question: "In Dark Mode, why is a slightly higher Line Height (Leading) recommended compared to light mode?",
        choices: [
          "To make the black background look darker.",
          "To counteract the 'glow' of white pixels, which can make tight text appear blurry.",
          "To allow for more Touch-Target space for thumbs.",
          "To increase Word Shape recognition speed.",
        ],
        correctAnswer: "To counteract the 'glow' of white pixels, which can make tight text appear blurry.",
        explanation: "Light text on dark backgrounds creates a 'halation' effect — it glows. If lines are too close together, that light bleeds between them and merges the text into an unreadable blur.",
      },
      {
        type: "multiple-choice",
        question: "What is the primary purpose of professional typographic plugins such as text audit tools and global style systems?",
        choices: [
          "To automatically pick a 'pretty' font for you.",
          "To audit the project and ensure no 'stray' fonts or unauthorized sizes have entered the design.",
          "To turn Sans-Serif fonts into Serif fonts instantly.",
          "To increase the x-height of a font automatically.",
        ],
        correctAnswer: "To audit the project and ensure no 'stray' fonts or unauthorized sizes have entered the design.",
        explanation: "Plugins help maintain Systemic Consistency — the hallmark of a Senior Designer. They act as a 'Single Source of Truth,' ensuring that typographic styles remain standardized across every screen.",
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    await Lesson.deleteMany({ title: /Lesson VI:/ });
    console.log("🗑️  Cleared existing Lesson VI");

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