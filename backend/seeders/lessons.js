import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../models/lessons.js";

dotenv.config();

const LESSON_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773572640/936659a2-a9dd-4656-b65a-63d66d18a6a3.png";
const CONTENT_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771160466/e8da1e5c-c8c3-4127-8b0a-73d3c2c174b5.png";

const lessons = [
  /* ══════════════════════════════════════════════════════
     LESSON 1 – The Calligraphic Foundation
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson I: The Calligraphic Foundation",
    difficulty: "Beginner",
    completionTime: "~20 min",
    lessonImage: LESSON_IMAGE,
    sourceUrl: "https://lithub.com/how-medieval-monks-and-scribes-helped-preserve-classical-culture/",
    youtubeUrl: "https://www.youtube.com/embed/xGbaXZs9-xA",
    imageUrls: [CONTENT_IMAGE, CONTENT_IMAGE, CONTENT_IMAGE],
    content: {
      description: "Explore the origins of typography — from medieval scribes to the digital era. Discover how tools, culture, and technology shaped the visual form of language across centuries.",
      introduction: "The history of typography is not simply a chronological account of technological inventions. Rather, it is a complex narrative of how human societies have continuously refined the process of transforming language into visual form. Typography represents the intersection of communication, technology, art, and culture. Every shift in typographic practice — from handwritten manuscripts to programmable digital fonts — has reshaped how information is organized, interpreted, and disseminated.",
      headerOne: "I. The Calligraphic Foundation: The Architecture of the Page (Prior to 1440)",
      discussionOne: "Before the invention of mechanical printing, all written texts were produced manually by scribes who worked primarily in monasteries, scriptoria, and scholarly institutions across medieval Europe. These scribes were not merely copyists; they were early visual designers who developed sophisticated systems for organizing written information on a page. In the medieval manuscript tradition, the design of a page was carefully planned according to strict geometric and proportional rules. Scribes employed mathematical frameworks such as the Villard de Honnecourt diagram to determine the placement of text blocks, margins, and decorative elements. This era introduced the earliest concepts of visual hierarchy through enlarged initials, decorative drop caps, rubrication, and variations in letter size and spacing. Typography scholar Robert Bringhurst describes typography as 'the visual form of language,' noting that many modern typographic features — especially the serif — originate from the physical gestures of calligraphy.",
      headerTwo: "II. The Asian Invention: Modularity and the Concept of the Glyph (1041–1377)",
      discussionTwo: "The earliest known movable type system was developed in China by Bi Sheng around 1041 during the Song Dynasty. Later, Korean inventors significantly improved the technology with metal movable type, culminating in the Jikji (1377) — the oldest surviving book printed with movable metal type. This invention introduced the fundamental concept of modularity: each character became an independent unit (a glyph) that could be rearranged and reused. It also led to early spacing concepts like kerning (adjusting space between specific letter pairs) and tracking (overall letter spacing), as well as the typecase — a precursor to modern digital font structures.",
      headerThree: "III. The Gutenberg Press: The First 'User Interface' (1450s)",
      discussionThree: "Johannes Gutenberg's genius was the integration of three existing technologies: a hand-mold system for casting metal type, oil-based ink, and a modified screw press. Together, these created the first scalable mass-production system for books. His 42-Line Bible demonstrated typographic precision through justified text achieved via over 200 ligatures and abbreviations. Historian Elizabeth Eisenstein describes how printing introduced 'typographic fixity' — multiple copies of a text could now be identical — enabling scientific collaboration and the rapid spread of knowledge throughout Europe.",
      headerFour: "IV. Modernism and the Bauhaus: The 'Crystal Goblet' Theory (1919–1933)",
      discussionFour: "The Bauhaus movement, founded in Germany in 1919, sought to redefine typography through simplicity, clarity, and functional design. Designers like Jan Tschichold advocated for the grid system, while the movement popularized sans-serif typefaces as symbols of clarity and universality. Typographer Beatrice Warde articulated the 'Crystal Goblet' theory: typography should function like a transparent glass goblet — the design should not distract from the content, but allow the reader to experience the 'wine' of the words fully.",
      headerFive: "V. The Digital Era: Responsive Logic and Variable Fonts (1984–Present)",
      discussionFive: "The digital era transformed typography into a programmable system. Fonts became mathematical instructions rather than physical shapes. Variable fonts, introduced through OpenType Font Variations, allow a single font file to contain all style variations — weight, width, slant, and optical size — adjustable through CSS or design software sliders. Typography educator Ellen Lupton describes modern typography as 'Typography for the Screen,' emphasizing accessibility, responsive design, and legibility across devices. Today, typography functions not only as visual design but as an essential component of user interface and user experience design.",
    },
    quiz: [
      {
        type: "multiple-choice",
        question: "Based on Robert Bringhurst's definition of serifs as 'biological fossils,' how does the transition to Sans-Serif in the Bauhaus era represent a biological 'extinction' in typographic design?",
        choices: [
          "It marks the shift from organic, tool-based origins to purely geometric, mathematical constructs.",
          "It suggests that modern readers have evolved past the need for legibility aids.",
          "It proves that the 'natural flick' of the quill was an evolutionary mistake in character design.",
          "It indicates that the 'Architecture of the Page' no longer requires a Golden Ratio.",
        ],
        correctAnswer: "It marks the shift from organic, tool-based origins to purely geometric, mathematical constructs.",
        explanation: "Modernists saw serifs as 'relics' (fossils) of a manual past to be discarded for geometric purity.",
      },
      {
        type: "multiple-choice",
        question: "How does the Villard de Honnecourt diagram's use of 'Golden Ratio' proportions fundamentally differ from the Modernist 'Grid System' in its approach to white space?",
        choices: [
          "The Golden Ratio is arbitrary, while the Grid System is based on the specific width of the metal type.",
          "The former seeks a 'natural' harmony rooted in geometry, while the latter seeks a 'functional' logic rooted in information hierarchy.",
          "There is no difference; both systems prioritize the 'Crystal Goblet' theory of invisibility.",
          "The Golden Ratio prioritizes the scribe's ego, whereas the Grid System prioritizes the reader's accessibility.",
        ],
        correctAnswer: "The former seeks a 'natural' harmony rooted in geometry, while the latter seeks a 'functional' logic rooted in information hierarchy.",
        explanation: "Medieval geometry was about aesthetic 'harmony'; Modernist grids are about 'functional' organization of information.",
      },
      {
        type: "multiple-choice",
        question: "If Elizabeth Eisenstein's concept of 'Typographic Fixity' was the primary achievement of the Gutenberg Press, which modern technology most directly threatens or 'unfixes' that stability?",
        choices: [
          "Kerning and Tracking",
          "Metal Movable Type",
          "Variable Fonts and Responsive Logic",
          "High-resolution smartphones",
        ],
        correctAnswer: "Variable Fonts and Responsive Logic",
        explanation: "Variable fonts make type fluid and adaptive, the opposite of 'fixity' (fixed, unchangeable versions).",
      },
      {
        type: "multiple-choice",
        question: "Compare the 'Side-bearings' of the Asian Movable Type era with the 'Ligatures' used in Gutenberg's 42-Line Bible. What shared problem were these two distinct mechanical solutions trying to solve?",
        choices: [
          "The limitation of oil-based inks on parchment.",
          "The need to create a uniform, cohesive visual texture within the constraints of physical blocks.",
          "The transition from theological manuscripts to secular advertising.",
          "The organization of a 'Typecase' physical database.",
        ],
        correctAnswer: "The need to create a uniform, cohesive visual texture within the constraints of physical blocks.",
        explanation: "Both dealt with the physical spacing needed to make individual blocks look like a continuous flow of text.",
      },
      {
        type: "multiple-choice",
        question: "Beatrice Warde's 'Crystal Goblet' theory argues for 'invisible' typography. Which era described in the text would Warde likely find most 'opaque' or problematic?",
        choices: [
          "The Digital Era, because of its focus on Accessibility.",
          "The Calligraphic Foundation, because the 'intimate physical performance' adds 'flavor' to the message.",
          "The Bauhaus Era, because of its return to purity and functionalism.",
          "The Gutenberg Era, because it introduced the world's first global Information Network.",
        ],
        correctAnswer: "The Calligraphic Foundation, because the 'intimate physical performance' adds 'flavor' to the message.",
        explanation: "Warde wanted 'invisible' type; the 'physical performance' of a scribe is highly visible and 'flavored.'",
      },
      {
        type: "multiple-choice",
        question: "The transition from 'Artistic Rendering' to 'Logical Management' (as noted by Dr. Tsien Tsuen-hsuin) is best exemplified by which modern digital component?",
        choices: ["The Serif", "The X-height", "Font Tables", "The Aperture"],
        correctAnswer: "Font Tables",
        explanation: "The text explicitly links the 'Typecase' (logical management) to modern 'Font Tables.'",
      },
      {
        type: "multiple-choice",
        question: "How does the use of '200 ligatures' in the Gutenberg Bible demonstrate a precursor to what we now call 'User Experience' (UX) design?",
        choices: [
          "It allowed for faster mass production of religious texts.",
          "It simulated the familiar look of high-quality manuscripts to ease the transition for the reader.",
          "It reduced the cost of lead type by combining characters.",
          "It allowed for the first use of 'International' sans-serif styles.",
        ],
        correctAnswer: "It simulated the familiar look of high-quality manuscripts to ease the transition for the reader.",
        explanation: "By mimicking handwriting with ligatures, Gutenberg made his 'UI' familiar to those used to manuscripts.",
      },
      {
        type: "multiple-choice",
        question: "In the context of 'Responsive Logic,' how does an 'Aperture' function differently on a digital screen than it did on a carved woodblock?",
        choices: [
          "On a screen, the aperture must remain open to prevent 'filling in' at low resolutions; on woodblocks, it was a matter of carving depth.",
          "There is no difference; the aperture is purely decorative in both eras.",
          "On a screen, the aperture is controlled by the Golden Ratio; on woodblocks, it was controlled by the grain of the wood.",
          "Woodblocks required larger apertures to accommodate oil-based inks.",
        ],
        correctAnswer: "On a screen, the aperture must remain open to prevent 'filling in' at low resolutions; on woodblocks, it was a matter of carving depth.",
        explanation: "Digital legibility focuses on pixels and 'filling in,' while physical blocks dealt with ink and material.",
      },
      {
        type: "multiple-choice",
        question: "Why is the 'Jikji' (1377) considered a 'revolutionary leap toward modularity' compared to the earlier woodblock printing?",
        choices: [
          "It was the first time the Golden Ratio was used in Asia.",
          "It decoupled the content from the carrier, allowing individual 'glyphs' to be rearranged and reused.",
          "It introduced the concept of the 'Crystal Goblet' to Korean scholars.",
          "It was the first book to utilize the Villard de Honnecourt diagram.",
        ],
        correctAnswer: "It decoupled the content from the carrier, allowing individual 'glyphs' to be rearranged and reused.",
        explanation: "Modularity is defined by the ability to reuse and rearrange individual components (glyphs).",
      },
      {
        type: "multiple-choice",
        question: "Evaluate the statement: 'The Variable Font is the ultimate realization of the Bauhaus International dream.' Which evidence from the text supports this?",
        choices: [
          "Variable fonts allow for 'ego-driven' ornamentation.",
          "Variable fonts use 'Design Space' to adapt to any user's device, fulfilling the goal of a universal, functional communication tool.",
          "Variable fonts rely on the 'flick of a flat-head brush' for their curves.",
          "Variable fonts eliminate the need for a 'Grid System.'",
        ],
        correctAnswer: "Variable fonts use 'Design Space' to adapt to any user's device, fulfilling the goal of a universal, functional communication tool.",
        explanation: "The Bauhaus wanted a 'modern future' and 'international' reach; adaptive code achieves this globally.",
      },
      {
        type: "multiple-choice",
        question: "Which concept links the 'Typecase' of the 14th century to the 'CSS code' of the 21st century?",
        choices: [
          "The preservation of 'Scribal Culture.'",
          "The systematic organization and retrieval of character data for efficient output.",
          "The rejection of 'Typographic Fixity.'",
          "The use of 'Golden Ratio' proportions in coding.",
        ],
        correctAnswer: "The systematic organization and retrieval of character data for efficient output.",
        explanation: "Both are systems of data management — one physical (cases), one digital (code).",
      },
      {
        type: "multiple-choice",
        question: "If a designer today uses a font that mimics the 'natural flick' of a quill, they are technically prioritizing which element over Beatrice Warde's 'Crystal Goblet'?",
        choices: ["Legibility", "Functionalism", "Historical Ego/Ornamentation", "Responsive Logic"],
        correctAnswer: "Historical Ego/Ornamentation",
        explanation: "If the font draws attention to its 'manual' origins, it is no longer a 'transparent' goblet.",
      },
      {
        type: "multiple-choice",
        question: "The shift from 'Scribes as visual engineers' to 'Typography as a programmable system' suggests that the most important skill for a modern typographer is:",
        choices: [
          "The ability to carve lead type.",
          "Mastery of the flat-head brush.",
          "Understanding the interaction between data constraints and visual adaptability.",
          "Memorizing the 42-Line Bible's ligatures.",
        ],
        correctAnswer: "Understanding the interaction between data constraints and visual adaptability.",
        explanation: "Modern typography is defined as a 'fluid, responsive interface' and 'programmable system.'",
      },
      {
        type: "multiple-choice",
        question: "Jan Tschichold's 'The New Typography' argued for mathematical logic over 'decorative whim.' How does this philosophy conflict with the origins of the Serif?",
        choices: [
          "Both are based on the Golden Ratio.",
          "The Serif is a byproduct of a physical tool's movement, which Modernists view as an unnecessary 'relic.'",
          "The New Typography actually encouraged more decorative serifs for better tracking.",
          "It doesn't conflict; Tschichold believed the serif was the peak of mathematical logic.",
        ],
        correctAnswer: "The Serif is a byproduct of a physical tool's movement, which Modernists view as an unnecessary 'relic.'",
        explanation: "Serifs were 'natural flicks' (physical accidents); Modernism wanted 'unadorned' shapes.",
      },
      {
        type: "multiple-choice",
        question: "Considering the entire timeline, which era most successfully balanced 'Visual Hierarchy' with 'Mass Dissemination'?",
        choices: [
          "The Calligraphic Foundation (Prior to 1440)",
          "The Asian Invention (1041–1377)",
          "The Gutenberg Press (1450s)",
          "The Digital Era (1984–Present)",
        ],
        correctAnswer: "The Digital Era (1984–Present)",
        explanation: "The Digital Era combines the hierarchy of the past with the 'global network' of the present on a massive scale.",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     LESSON 2 – Typography Theory and Philosophy
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson II: Typography Theory and Philosophy",
    difficulty: "Intermediate",
    completionTime: "~18 min",
    lessonImage: LESSON_IMAGE,
    sourceUrl: "https://readings.design/PDF/the_crystal_goblet.pdf",
    youtubeUrl: "https://www.youtube.com/embed/0-LHO1Uzoos",
    imageUrls: [CONTENT_IMAGE, CONTENT_IMAGE],
    content: {
      description: "Move beyond the 'how' of making letters and into the 'why' of perceiving them. Explore typography as a psychological and philosophical discipline where every curve and space acts as a silent messenger to the human brain.",
      introduction: "To truly master design, one must move beyond the 'how' of making letters and into the 'why' of perceiving them. This lesson explores typography as a psychological and philosophical discipline, where every curve and space acts as a silent messenger to the human brain.",
      headerOne: "I. Form Follows Function: The 'Crystal Goblet' Philosophy",
      discussionOne: "In the world of typographic philosophy, the primary objective is the seamless transmission of thought from the page to the mind. This principle dictates that typography should be a transparent vessel for its message, prioritizing utility and function over mere aesthetic decoration. The 'Invisibility' of type theory suggests that if a reader becomes consciously aware of the font choice rather than the meaning of the words, the design has essentially failed. Beatrice Warde justified this in her seminal essay, The Crystal Goblet: typography should be like a clear glass that reveals the 'wine' of the content without adding its own 'flavor.' Legibility — the ease of character recognition — and Readability — the ease of processing whole blocks of text — are the core measures of typographic success.",
      headerTwo: "II. Gestalt Principles: The Psychology of Grouping",
      discussionTwo: "Typography heavily leverages Gestalt psychology, which posits that the human brain naturally seeks to perceive a 'whole' rather than just a collection of disconnected parts. Principles such as Proximity (placing related elements close together), Similarity (using the same font for all subheaders), and Continuity (aligning text along a consistent vertical axis) help the reader's brain categorize and prioritize information without conscious effort. Design theorist Alex White famously noted that 'Space is the most important element on the page,' arguing that it is the strategic use of empty space — not just the ink — that creates the patterns our brains recognize as meaningful structures.",
      headerThree: "III. Semiotics and Emotional Communication",
      discussionThree: "Beyond the literal meaning of words lies Semiotics — the study of signs and symbols. A typeface acts as a 'sign' that carries profound secondary meanings. Serif fonts carry 'historical weight,' signaling stability, tradition, and institutional authority. Sans-Serif fonts signal modernity, clarity, and neutral efficiency. Theo van Leeuwen, in Typography and Meaning, argues that letterforms possess a physical 'materiality' that functions as a visual 'voice' — the weight, expansion, and curvature of a font tell the reader how to feel before they even process the first sentence.",
      headerFour: "IV. Cognitive Load and the Science of Readability",
      discussionFour: "Cognitive Load Theory suggests that our brains have a finite amount of processing power at any given moment. Factors like Line Length (Measure) and Leading (Line Spacing) are critical technical levers. If a line is too long (over 75 characters), the eye struggles to find the start of the next line; if too short, reading rhythm breaks. John Sweller explains that 'split-attention effects' occur when a design is cluttered or poorly structured, forcing the brain to work harder than necessary. Erik Spiekermann argues that if a brand's voice 'mumbles' through poor readability, it will inevitably lose the reader's trust.",
      headerFive: "V. Emotional Response and Decision-Making",
      discussionFive: "Typography is a powerful tool for influencing a user's 'gut reaction,' directly impacting trust and decision-making. Geometric fonts, built from perfect circles and squares, evoke feelings of 'objectivity' and 'professionalism.' Humanist fonts, with variable stroke widths reminiscent of calligraphy, feel 'warm,' 'approachable,' and 'organic.' Sarah Hyndman, author of Why Fonts Matter, has demonstrated that typography is a multi-sensory experience — people can essentially 'taste' or 'smell' differences in fonts because certain shapes trigger specific memories and sensory associations.",
    },
    quiz: [
      {
        type: "scenario",
        question: "Which change would best follow John Sweller's Cognitive Load Theory to ensure the nurse doesn't make a mistake?",
        scenario: "A nurse needs to read critical dosage instructions on a tablet under harsh, flickering lights. The current design uses a light-weight, condensed font to fit more text on the screen, but it's hard to read.",
        choices: [
          "Keep the condensed font but change the color to bright red to grab attention.",
          "Increase the Leading and use a typeface with larger Apertures and a higher X-height.",
          "Decrease the Tracking so the nurse can see the entire sentence in one eye-blink.",
          "Switch to a 'Humanist' font because it feels more 'caring' in a hospital.",
        ],
        correctAnswer: "Increase the Leading and use a typeface with larger Apertures and a higher X-height.",
        explanation: "High cognitive load is caused by 'visual clutter.' Increasing Leading prevents lines from blurring. Large Apertures and high X-heights are proven more legible in high-stress environments.",
      },
      {
        type: "scenario",
        question: "Based on Theo van Leeuwen's Semiotics, what is the 'Semiotic Mismatch' occurring here?",
        scenario: "A brand selling 'Raw, Earth-Friendly Honey' uses a cold, sharp, perfectly symmetrical Geometric Sans-Serif. Sales are low because customers feel the product looks 'synthetic' or 'factory-made.'",
        choices: [
          "The font is too small, violating the 'Crystal Goblet' theory.",
          "The font's 'Industrial Weight' signals cold, machine efficiency, which contradicts the 'Organic' promise.",
          "The font lacks enough Ligatures, making the brand name look unorganized.",
          "The font uses too much White Space, making the product look expensive.",
        ],
        correctAnswer: "The font's 'Industrial Weight' signals cold, machine efficiency, which contradicts the 'Organic' promise.",
        explanation: "A Geometric font signals modern industry. To align with the product, a Humanist font — with stroke widths that mimic the human hand — triggers a 'warm' and 'organic' response.",
      },
      {
        type: "scenario",
        question: "Using Gestalt Psychology, what is the most effective way to 'organize' this chaos?",
        scenario: "A tax form is a 'wall of text.' Users can't tell which instructions belong to which input box. The form is a single block of uniform text with no clear visual breaks.",
        choices: [
          "Use a different bright color for every single line of text.",
          "Bold every second word to keep the reader's eye moving quickly.",
          "Use Proximity to group instructions with their boxes and increase Active White Space to separate sections.",
          "Use a Serif font for everything to carry more 'Institutional Authority.'",
        ],
        correctAnswer: "Use Proximity to group instructions with their boxes and increase Active White Space to separate sections.",
        explanation: "Proximity states the brain perceives things close together as a single unit. White Space (which Alex White calls the 'most important element') creates 'gutters' that reduce mental effort.",
      },
      {
        type: "scenario",
        question: "How would Beatrice Warde most likely critique this design?",
        scenario: "A magazine uses a font so distorted and artistic that you can barely read the words. The designer claims it's 'Art'; the editor says it's 'Unreadable.'",
        choices: [
          "She would praise it for being a 'beautifully stained glass goblet.'",
          "She would argue the design is a failure because the 'vessel' (font) has become 'opaque,' hiding the 'wine' (content).",
          "She would suggest adding more Serifs to make it look more historical.",
          "She would agree that art and utility are the same thing.",
        ],
        correctAnswer: "She would argue the design is a failure because the 'vessel' (font) has become 'opaque,' hiding the 'wine' (content).",
        explanation: "Warde's theory dictates that typography should be 'transparent.' If the reader is looking at the beauty of the letters instead of through them to the meaning, the design has failed.",
      },
      {
        type: "scenario",
        question: "Which strategy best utilizes Sarah Hyndman's 'Sensory Association' to meet both goals?",
        scenario: "A 100-year-old watchmaker is launching a 'Smartwatch.' They need to look 'High-Tech' but also 'Expensive and Traditional.'",
        choices: [
          "Use an ultra-thin Geometric Sans-Serif to look as modern as possible.",
          "Use a High-Contrast Serif (thin horizontals, thick verticals) set in a Modern Grid System.",
          "Use a 'Handwritten' font to make the watch feel 'approachable.'",
          "Use a Variable Font that randomly changes its weight.",
        ],
        correctAnswer: "Use a High-Contrast Serif (thin horizontals, thick verticals) set in a Modern Grid System.",
        explanation: "High-Contrast Serifs trigger associations with luxury and history. By placing them in a Modern Grid (Bauhaus philosophy), the designer balances 'Historical Weight' with 'Neutral Efficiency.'",
      },
      {
        type: "scenario",
        question: "Based on Cognitive Load Theory, how should you adjust the 'Measure'?",
        scenario: "You are designing a long-read digital article. Readers are complaining of 'eye fatigue' after the first three paragraphs. The text spans the entire width of a wide-screen monitor (approx. 140 characters per line).",
        choices: [
          "Change the font to all caps to make the letters larger.",
          "Reduce the line length to 45–75 characters and increase the Leading.",
          "Keep the length but make the font a bright neon green for better contrast.",
          "Remove all margins to use 100% of the screen space.",
        ],
        correctAnswer: "Reduce the line length to 45–75 characters and increase the Leading.",
        explanation: "If a 'Measure' (line length) is too long, the eye struggles to find the start of the next line, 'stealing' processing power. 45–75 characters is the scientific 'sweet spot' for readability.",
      },
      {
        type: "scenario",
        question: "Using the Semiotics of Typography, which change would fix this?",
        scenario: "A law firm wants to issue a formal 'Letter of Intent.' They used a friendly, rounded Sans-Serif, but clients aren't taking the documents seriously.",
        choices: [
          "Use a Geometric font like Futura to look 'Space-Age.'",
          "Switch to a traditional Serif font with a 'Historical Weight.'",
          "Increase the font size to 24pt so it looks 'louder.'",
          "Add decorative emojis to make the law firm seem 'approachable.'",
        ],
        correctAnswer: "Switch to a traditional Serif font with a 'Historical Weight.'",
        explanation: "Serifs carry connotations of stability and institutional authority. The 'Materiality' of a serif font tells the reader to feel the 'weight' of the law before they read the first word.",
      },
      {
        type: "scenario",
        question: "Which Gestalt Principle should be used to fix this 'UI' failure?",
        scenario: "A mobile banking app shows your 'Balance,' 'Recent Transactions,' and 'Logout' all in the same font size, weight, and color. Users keep accidentally clicking 'Logout' when they mean to check their balance.",
        choices: [
          "Similarity (to make the Balance look distinct) and Proximity (to move Logout away from navigation).",
          "Continuity (to align every button in a single vertical line).",
          "Closure (to make the user 'fill in the gaps' of the missing buttons).",
          "Use a Variable Font that changes every time the user logs in.",
        ],
        correctAnswer: "Similarity (to make the Balance look distinct) and Proximity (to move Logout away from navigation).",
        explanation: "By using Similarity, you make related items (transactions) look alike. By using Proximity, you move unrelated/dangerous items (Logout) away from the data the user is trying to access.",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     LESSON 3 – Advanced Typography Fundamentals & Systems
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson III: Advanced Typography Fundamentals & Systems",
    difficulty: "Intermediate",
    completionTime: "~22 min",
    lessonImage: LESSON_IMAGE,
    sourceUrl: "https://ellenlupton.com/Thinking-with-Type",
    youtubeUrl: "https://www.youtube.com/embed/Xg-KhUVhtLQ",
    imageUrls: [CONTENT_IMAGE, CONTENT_IMAGE],
    content: {
      description: "View typography not as a decorative choice but as the visual architecture of language. Explore the structural mechanics of type and how the physical form of a letter influences human cognition and technical performance.",
      introduction: "To truly master typography, one must view it not as a decorative choice, but as the visual architecture of language. This lesson expands on the structural mechanics of type, exploring how the physical form of a letter influences human cognition and technical performance.",
      headerOne: "I. Typography as Architecture: The Interface of Language",
      discussionOne: "Typography serves as the essential management system for written communication, acting as the 'how' to the writer's 'what.' It dictates the tone of voice, the pacing of the reading experience, and the overall hierarchy of importance on a page. This management operates on two distinct scales: Micro-typography, which focuses on the intricate spacing and shapes of individual characters, and Macro-typography, which governs the broader relationship between columns, margins, and the physical or digital canvas. Ellen Lupton defines typography as an interface — the designer's primary role is to 'bridge the gap between the eye and the brain.'",
      headerTwo: "II. The Logic of the System: Typeface vs. Font",
      discussionTwo: "A Typeface represents the 'system' — the consistent design characteristics shared by a family of characters. When you select Roboto, you are choosing a specific brand identity or visual DNA. A Font is the 'tool' or the specific delivery mechanism. Roboto Bold 14pt is a font because it is the specific instance or file used to execute the design. Stephen Coles justifies this by noting that a designer defines the font-family (the typeface) but manipulates the font-weight and font-size (the font attributes). Understanding this hierarchy allows designers to build scalable design systems.",
      headerThree: "III. Functional Anatomy: The Biology of the Letterform",
      discussionThree: "The 'body parts' of a letter are functional traits that determine how the human eye tracks text. The x-height — the height of lowercase letters like 'x' — is a primary driver of legibility. A large x-height makes a font more readable at small sizes because the internal spaces of the letters remain open. Ascenders (strokes in 'd' or 'h') and Descenders (strokes in 'p' or 'g') provide the unique silhouette of a word. Humans do not read letter-by-letter but recognize word shapes. The Counter — the white space inside letters like 'o' or 'e' — is vital for clarity. If a counter is too small, the letter 'fills in' at low resolutions, becoming an illegible black blob.",
      headerFour: "IV. Taxonomic Classification: The Logic of Alignment and Grid",
      discussionFour: "Typefaces are classified into taxonomies based on historical and technical intent. Serifs create an invisible horizontal line that leads the eye across a page, making serif fonts like Garamond ideal for long-form print. Sans-Serif fonts align more naturally with the square-pixel grid of digital screens. Monospaced fonts ensure every character occupies the exact same horizontal space — a functional requirement for source code, as proportional fonts would cause brackets and indentations to misalign, making it impossible for a programmer to debug complex logic at a glance.",
      headerFive: "V. The Final Distinction: Legibility vs. Readability",
      discussionFive: "Legibility is a design metric concerning the typeface itself: 'Can the eye distinguish between an I, an l, and a 1?' If characters are too similar, the font has poor legibility. Readability is a styling metric concerning the arrangement. You can use a highly legible font like Helvetica, but if the size is too small or the contrast is too low, the text becomes unreadable. Erik Spiekermann states that 'Typography is a brand's voice.' A font might be perfectly designed (legible), but if the layout is poor (unreadable), the brand is essentially 'shouting in a language no one understands.'",
    },
    quiz: [
      {
        type: "multiple-choice",
        question: "Which anatomical feature should you prioritize to keep text clear on a low-res banking app screen?",
        choices: ["Long Ascenders", "Large x-height and Open Counters", "High-Contrast strokes", "Tight Tracking"],
        correctAnswer: "Large x-height and Open Counters",
        explanation: "A large x-height keeps the letter body big, and Open Counters prevent the pixels from 'bleeding' together.",
      },
      {
        type: "multiple-choice",
        question: "A developer can't align brackets because an 'i' is thinner than a 'w'. Which font classification solves this vertical alignment issue?",
        choices: ["Geometric Sans-Serif", "Old Style Serif", "Monospaced Font", "Slab Serif"],
        correctAnswer: "Monospaced Font",
        explanation: "Monospaced fonts create a predictable grid, which is essential for code logic and symbols.",
      },
      {
        type: "multiple-choice",
        question: "You are changing the company's 'Visual DNA' (the overall design). What is the technical term for the overall design system (like 'Roboto')?",
        choices: ["The Font-Weight", "The Font-Size", "The Typeface", "The Glyph"],
        correctAnswer: "The Typeface",
        explanation: "The Typeface is the design/identity. The Font is the specific version or file you use.",
      },
      {
        type: "multiple-choice",
        question: "Highway signs need to be read at 70mph in a split second. Why is a font with very short Ascenders/Descenders dangerous?",
        choices: [
          "It looks too modern",
          "It neutralizes the 'Word Shape' or silhouette",
          "It makes the font Monospaced",
          "It increases Cognitive Load",
        ],
        correctAnswer: "It neutralizes the 'Word Shape' or silhouette",
        explanation: "Ascenders and Descenders create the unique silhouette that our brains instantly recognize, without reading every letter.",
      },
      {
        type: "multiple-choice",
        question: "The page layout (columns/margins) is great, but the space between 'A' and 'V' is too wide. Which scale of typography needs fixing?",
        choices: ["Macro-typography", "Micro-typography", "Taxonomic Hierarchy", "The Interface of Language"],
        correctAnswer: "Micro-typography",
        explanation: "Micro-typography is the 'fine-tuning' of individual characters and their spacing (kerning).",
      },
      {
        type: "multiple-choice",
        question: "Users can't tell if a password is 'Illinois' or '1llinois.' This is a failure of which metric?",
        choices: ["Readability", "Legibility", "Taxonomy", "Leading"],
        correctAnswer: "Legibility",
        explanation: "Legibility is the ease of distinguishing one character shape from another.",
      },
      {
        type: "multiple-choice",
        question: "You are choosing a font for a digital dashboard. Why is Sans-Serif better for square-pixel screens?",
        choices: [
          "It has no x-height",
          "Its straight lines align with the square pixel grid",
          "It is always Monospaced",
          "It has more 'History'",
        ],
        correctAnswer: "Its straight lines align with the square pixel grid",
        explanation: "Digital screens use square pixels. Clean Sans-Serif lines fit that grid much better than curved serifs.",
      },
      {
        type: "multiple-choice",
        question: "A font is high-quality, but the size is 6pt and the color is faint grey on white. What is the technical status of this design?",
        choices: ["It is Illegible", "It is Legible but Unreadable", "It is Macro-typographic", "It is Monospaced"],
        correctAnswer: "It is Legible but Unreadable",
        explanation: "You can have a Legible font, but if the layout/styling is bad, the text becomes Unreadable.",
      },
      {
        type: "multiple-choice",
        question: "In 'Dark Mode,' the letters 'e' and 'a' look like solid white circles. What anatomical feature do you need to fix this 'filling in' effect?",
        choices: ["Smaller x-height", "Thicker strokes", "Open Apertures", "Monospaced alignment"],
        correctAnswer: "Open Apertures",
        explanation: "Open Apertures (like a wide opening in the letter 'c' or 'e') keep letters clear even when colors bleed.",
      },
      {
        type: "multiple-choice",
        question: "You are designing a 400-page printed book. Why is a Serif font (like Garamond) traditionally used for long-form print?",
        choices: [
          "It is more modern",
          "The serifs create a horizontal line that leads the eye",
          "It saves ink",
          "It has no counters",
        ],
        correctAnswer: "The serifs create a horizontal line that leads the eye",
        explanation: "Serifs act as horizontal guides, helping the eye travel smoothly across a printed page.",
      },
      {
        type: "multiple-choice",
        question: "You are coding a website. You define the font-family, then change the font-weight to 'Bold'. Technically, what have you just done?",
        choices: [
          "Changed the Typeface",
          "Selected a specific Font within a Typeface system",
          "Changed the Taxonomy",
          "Adjusted the Macro-typography",
        ],
        correctAnswer: "Selected a specific Font within a Typeface system",
        explanation: "The Typeface is the design; the Font is the specific weight or size you chose to execute that design.",
      },
      {
        type: "multiple-choice",
        question: "A reader says, 'I can see the letters, but I have to read every sentence twice to understand it.' According to Ellen Lupton, what part of the architecture has failed?",
        choices: [
          "The writer's vocabulary",
          "The typographic interface between eye and brain",
          "The historical taxonomy",
          "The physical screen",
        ],
        correctAnswer: "The typographic interface between eye and brain",
        explanation: "Lupton defines typography as the Interface that manages how we perceive and understand language.",
      },
      {
        type: "multiple-choice",
        question: "A company wants to look 'Logical and Mathematical.' Why would you choose a Geometric Sans-Serif over a Humanist one?",
        choices: [
          "Because it has serifs",
          "It is based on perfect circles/squares rather than handwriting",
          "It is easier to read in books",
          "It is older",
        ],
        correctAnswer: "It is based on perfect circles/squares rather than handwriting",
        explanation: "Geometric fonts use mathematical shapes (circles, squares) to feel neutral and efficient.",
      },
      {
        type: "multiple-choice",
        question: "You are printing a logo on a very small pen. The letters are 'clogging up' with ink. What technical feature is too small?",
        choices: ["The x-height", "The Counters", "The Ascenders", "The Typeface"],
        correctAnswer: "The Counters",
        explanation: "Counters are the 'lungs' of the letter. If they are too small, they 'suffocate' or fill with ink at small sizes.",
      },
      {
        type: "multiple-choice",
        question: "A client says, 'Just pick a pretty font; it doesn't matter.' Based on Lesson 3, why is this wrong?",
        choices: [
          "Because fonts are expensive",
          "Because typography is a structural management system for thought",
          "Because only Monospaced fonts work",
          "Because Micro-typography is for art",
        ],
        correctAnswer: "Because typography is a structural management system for thought",
        explanation: "Typography is the Architecture of Language — it is the structural system that makes communication possible.",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════
     LESSON 4 – Typeface Properties & Technical Manipulation
  ══════════════════════════════════════════════════════ */
  {
    title: "Lesson IV: Typeface Properties & Technical Manipulation",
    difficulty: "Advanced",
    completionTime: "~25 min",
    lessonImage: LESSON_IMAGE,
    sourceUrl: "https://help.webflow.com/hc/en-us/articles/33961334261779-Advanced-web-typography",
    youtubeUrl: "https://www.youtube.com/embed/5HxB4TZYI-c",
    imageUrls: [CONTENT_IMAGE, CONTENT_IMAGE, CONTENT_IMAGE],
    content: {
      description: "Typography is a deliberate process of shaping visual language through technical precision and aesthetic judgment. Understand baselines, x-height, kerning, tracking, and leading — the controlled relationships that make type breathe.",
      introduction: "Typography is not simply the arrangement of letters on a page. It is a deliberate process of shaping visual language through technical precision and aesthetic judgment. Every typeface contains a system of measurable properties — baselines, proportions, spacing, and alignment — that together determine how text is perceived and understood. These properties are elements of visual engineering, where designers manipulate the physical characteristics of letterforms to produce clarity, hierarchy, and emotional tone.",
      headerOne: "The Foundation: Baselines and the Optical Illusion of Leveling",
      discussionOne: "At the core of every typographic layout lies the baseline — the horizontal axis upon which most characters rest. Letters with flat bases (H, L, E) sit precisely on the baseline. Curved characters (O, C, Q) extend slightly below it — a phenomenon known as overshoot. Without this slight extension, round letters would appear smaller or misaligned due to how the human eye perceives curved forms. In grid-based design systems, the baseline becomes part of a larger baseline grid, where all textual elements align consistently along evenly spaced horizontal lines, establishing what is known as vertical rhythm.",
      headerTwo: "The Core Mechanics: X-Height and Vertical Proportions",
      discussionTwo: "The x-height refers to the height of lowercase letters, specifically 'x.' Lowercase letters have three main components: the x-height (central body), ascenders (parts extending above the x-height: b, d, h), and descenders (parts extending below the baseline: g, j, p, q, y). Typefaces with a large x-height appear larger and more compact, making characters easier to recognize at small sizes — ideal for digital interfaces. Traditional serif typefaces often feature smaller x-heights and longer ascenders and descenders, creating distinctive word shapes that enhance reading fluency through Bouma recognition — readers perceiving the overall silhouette of words rather than reading each letter.",
      headerThree: "The Geometry of Space: Font Size and Scaling",
      discussionThree: "Font size originates from early printing practices where metal type was cast on small lead blocks. In modern web design, relative units (em and rem) rather than fixed measurements (pt) allow typography to adapt to user device settings. If a visually impaired user increases default text size, a design built with relative units scales proportionally, preserving typographic hierarchy. This concept — fluid typography — ensures readability is maintained regardless of display conditions. Frameworks such as Material Design emphasize fluid typography for accessibility and responsive design.",
      headerFour: "The Horizontal Axis: Kerning and Tracking",
      discussionFour: "Kerning refers to the adjustment of spacing between specific pairs of letters. Certain combinations create awkward gaps because of their shapes — for example, A and V form a triangular gap when placed side by side. Professional typefaces include thousands of predefined kerning pairs. Tracking refers to the uniform adjustment of spacing across an entire word, sentence, or paragraph. Increasing tracking in all-caps text creates a more open and refined appearance, improving readability. Conversely, tightening tracking for large display headlines can transform a word into a cohesive visual shape.",
      headerFive: "The Breath of the Page: Line Spacing (Leading)",
      discussionFive: "Leading — from the lead strips inserted between metal type — determines how comfortably the reader's eye moves from one line to the next. If spacing is too tight, the eye may accidentally reread the same line (doubling). If too wide, the connection between lines weakens, causing paragraphs to feel fragmented. Erik Spiekermann suggests optimal leading typically ranges between 120% to 150% of the font size. Proper leading improves reading comfort, reduces cognitive load, creates visual balance, and is especially important in high-contrast designs such as light text on dark backgrounds.",
    },
    quiz: [
      /* Category 1: Kerning Slide (interactive) — rendered as kerning-slide type */
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
      /* Category 2: Leading Lines (scenario/MCQ) */
      {
        type: "scenario",
        question: "Two lines of a story are touching each other. What is the correct action?",
        scenario: "Ascenders and descenders are hitting each other. The text looks cramped and is hard to read.",
        choices: [
          "Pull the bottom line down to add Leading.",
          "Make the font smaller to fit more on the page.",
          "Decrease the font weight.",
          "Switch to a monospaced font.",
        ],
        correctAnswer: "Pull the bottom line down to add Leading.",
        explanation: "You added Leading so the eye can find the next line. Much better!",
      },
      {
        type: "scenario",
        question: "A paragraph looks like a solid black box — a 'wall of ink.' What should you do?",
        scenario: "The paragraph is dense and the lines are impossible to separate visually.",
        choices: [
          "Increase the space between all lines.",
          "Make the font bold.",
          "Reduce the font size.",
          "Remove the paragraph indentation.",
        ],
        correctAnswer: "Increase the space between all lines.",
        explanation: "The paragraph can breathe now! This reduces Cognitive Load.",
      },
      {
        type: "scenario",
        question: "White text on a black background is 'bleeding' together visually. How do you fix this?",
        scenario: "In Dark Mode, the bright letters appear to glow, causing the text to look merged.",
        choices: [
          "Increase the space between lines (Leading) to stop the 'glow' from overlapping.",
          "Switch to black text on white.",
          "Reduce the font weight to thin.",
          "Use a condensed typeface.",
        ],
        correctAnswer: "Increase the space between lines (Leading) to stop the 'glow' from overlapping.",
        explanation: "Extra Leading is the secret to great Dark Mode design.",
      },
      /* Category 3: X-Height Detective (MCQ) */
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
      /* Additional MCQ on core concepts */
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

    await Lesson.deleteMany({});
    console.log("🗑️  Cleared existing lessons");

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