import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

const leadingGames = [
  {
    title: "Leading Master: Easy",
    description: "Learn proper line spacing with simple paragraphs!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771500493/d55ef3d6-653f-4a1f-863b-cf0ce4f25961.png",
    difficulty: "easy",
    gameType: "leading",
    paragraphs: [
      {
        text: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing.",
        idealLeading: 1.5,
        fontSize: 18,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Good design is making something intelligible and memorable. Great design is making something memorable and meaningful.",
        idealLeading: 1.6,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "The details are not the details. They make the design. Clear communication depends on proper spacing.",
        idealLeading: 1.5,
        fontSize: 20,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Simplicity is the ultimate sophistication. Every element should serve a purpose in visual hierarchy.",
        idealLeading: 1.4,
        fontSize: 18,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Design creates culture. Culture shapes values. Values determine the future of our visual landscape.",
        idealLeading: 1.6,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Content precedes design. Design in the absence of content is not design, it's decoration and art.",
        idealLeading: 1.5,
        fontSize: 18,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.",
        idealLeading: 1.5,
        fontSize: 17,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Design is thinking made visual. Every choice in typography affects readability and user experience.",
        idealLeading: 1.6,
        fontSize: 19,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "White space is to be regarded as an active element, not a passive background. Proper leading creates rhythm.",
        idealLeading: 1.5,
        fontSize: 18,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design.",
        idealLeading: 1.4,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      }
    ],
    isActive: true
  },
  {
    title: "Leading Master: Medium",
    description: "Master line spacing with more complex text blocks!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771500493/d55ef3d6-653f-4a1f-863b-cf0ce4f25961.png",
    difficulty: "medium",
    gameType: "leading",
    paragraphs: [
      {
        text: "In typography, leading refers to the vertical distance between lines of text. The term originated from the strips of lead that were placed between lines of type in traditional printing. Proper leading ensures readability and visual comfort for the reader.",
        idealLeading: 1.65,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Responsive design requires careful consideration of typography across different screen sizes. What works on desktop may not translate well to mobile devices. Leading adjustments must account for viewport width, device pixel density, and reading distance to ensure optimal legibility.",
        idealLeading: 1.7,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "The relationship between font size and line height creates visual rhythm in text. Too tight, and the text becomes difficult to read. Too loose, and the connection between lines breaks down. Finding the balance requires understanding both the typeface characteristics and the context of use.",
        idealLeading: 1.6,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Different typefaces require different leading values. Fonts with larger x-heights need more leading to prevent lines from appearing cramped. Serif fonts often work well with tighter leading than sans-serif fonts. The weight and width of a typeface also influence the optimal line spacing.",
        idealLeading: 1.65,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Line length significantly impacts the ideal leading value. Longer lines require more generous leading to help the eye find the beginning of the next line. Shorter lines can work with tighter leading. This relationship between measure and leading is fundamental to readability.",
        idealLeading: 1.7,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Professional typographers consider multiple factors when setting leading: typeface design, x-height, character width, line length, and reading context. Body text typically uses leading between 120% and 145% of the font size, though this can vary based on specific circumstances and design requirements.",
        idealLeading: 1.6,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Digital typography has introduced new challenges for leading. Screen resolution, rendering engines, and variable fonts all affect how leading appears. Designers must test their work across devices and browsers to ensure consistent readability. What looks perfect on one screen may fail on another.",
        idealLeading: 1.65,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "The psychology of reading reveals that proper leading reduces eye strain and improves comprehension. When lines are too close together, readers expend more cognitive effort tracking from line to line. Adequate leading creates clear visual separation, making reading more efficient and enjoyable.",
        idealLeading: 1.7,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Historical typography standards provide valuable guidance for contemporary designers. Traditional book typography established conventions that remain relevant today. However, digital media introduces new considerations: backlit screens require different treatment than printed pages, affecting optimal leading choices.",
        idealLeading: 1.6,
        fontSize: 16,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Accessibility considerations demand careful attention to leading. Users with dyslexia benefit from generous line spacing, typically 150% or more of the font size. WCAG guidelines recommend providing options for users to adjust leading to their preferences, ensuring content remains accessible to all readers.",
        idealLeading: 1.65,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      }
    ],
    isActive: true
  },
  {
    title: "Leading Master: Hard",
    description: "Perfect your line spacing with professional-level typography!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771500493/d55ef3d6-653f-4a1f-863b-cf0ce4f25961.png",
    difficulty: "hard",
    gameType: "leading",
    paragraphs: [
      {
        text: "The interrelationship between type size, line length, and leading creates what typographers call the 'typographic color' of a text block. This perceived density affects readability and aesthetic appeal. Experienced designers manipulate these variables to achieve optimal texture, ensuring that the page neither appears too heavy nor too light. The goal is to create an even, comfortable reading experience that draws the eye naturally from line to line without conscious effort.",
        idealLeading: 1.72,
        fontSize: 14,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Contemporary responsive web design necessitates fluid typography systems where leading adjusts dynamically based on viewport dimensions and user preferences. This approach requires careful calculation of leading ratios that maintain optimal readability across breakpoints. Designers must consider how leading scales in relation to font size changes, ensuring that the relationship between these elements remains harmonious regardless of screen size or device orientation.",
        idealLeading: 1.68,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Advanced typographic systems employ mathematical ratios to determine leading values. The golden ratio, musical intervals, and modular scales provide frameworks for establishing harmonious vertical rhythm. However, these mathematical approaches must be tempered with optical adjustment and practical testing. What appears correct mathematically may not feel right visually, requiring designers to trust their eye and make subtle refinements.",
        idealLeading: 1.7,
        fontSize: 14,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Variable fonts introduce unprecedented control over typographic parameters, including optical size adjustments that affect ideal leading values. As font weight increases, leading typically needs adjustment to prevent the text block from appearing too dense. Similarly, changes in width or grade can necessitate leading modifications. This dynamic relationship between variable font axes and leading creates new opportunities for responsive typography.",
        idealLeading: 1.65,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Multilingual typography presents unique leading challenges, as different writing systems have distinct requirements. Latin alphabets, CJK characters, Arabic script, and Indic scripts each demand specific leading considerations. A leading value appropriate for English text may prove inadequate for Japanese, where character complexity and vertical alignment differ significantly. Global designers must understand these cultural and linguistic nuances.",
        idealLeading: 1.7,
        fontSize: 14,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "The neuroscience of reading demonstrates that proper leading facilitates efficient saccadic eye movements and reduces regression. When leading is too tight, the parafoveal preview area overlaps with preceding lines, creating visual interference. Optimal leading allows the peripheral vision to guide the eye to the next line beginning while minimizing the cognitive load required for line tracking. This biological imperative should inform all typographic decisions.",
        idealLeading: 1.72,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Professional editorial design employs sophisticated grid systems where leading plays a crucial role in establishing vertical rhythm. Baseline grids ensure that text aligns across columns and pages, creating visual harmony throughout a publication. However, strict adherence to baseline grids can compromise optimal leading for individual text blocks. The art lies in balancing systematic consistency with contextual appropriateness.",
        idealLeading: 1.68,
        fontSize: 14,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Performance optimization in web typography requires consideration of how leading affects layout shift and rendering performance. Excessive leading can increase page height, impacting scroll performance and requiring more rendering passes. Conversely, insufficient leading degrades readability, increasing bounce rates. Balancing these competing concerns demands both technical understanding and typographic expertise to achieve fast-loading, highly readable interfaces.",
        idealLeading: 1.7,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Historical manuscripts and incunabula reveal that concerns about leading predate modern typography. Medieval scribes adjusted line spacing based on script style, page layout, and material constraints. Illuminated manuscripts often featured varying leading within a single page, accommodating decorative elements while maintaining readability. These historical precedents demonstrate that leading has always been recognized as fundamental to effective typographic communication.",
        idealLeading: 1.65,
        fontSize: 14,
        minLeading: 1.0,
        maxLeading: 3.0
      },
      {
        text: "Emerging technologies such as AR and VR interfaces present unprecedented challenges for typography and leading. Three-dimensional text rendering, variable viewing distances, and curved display surfaces require rethinking traditional leading conventions. As text becomes increasingly spatially integrated with environments, designers must develop new frameworks for determining appropriate line spacing that accounts for depth perception, motion parallax, and user interaction paradigms.",
        idealLeading: 1.72,
        fontSize: 15,
        minLeading: 1.0,
        maxLeading: 3.0
      }
    ],
    isActive: true
  }
];

const seedLeadingGames = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing leading games (optional)
    await Game.deleteMany({ gameType: "leading" });
    console.log("🗑️  Cleared existing leading games");

    // Insert new games
    const insertedGames = await Game.insertMany(leadingGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} leading games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty}) - ${game.paragraphs.length} paragraphs`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding leading games:", error);
    process.exit(1);
  }
};

// Run the seeder
seedLeadingGames();