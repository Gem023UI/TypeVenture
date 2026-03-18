import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDatabase from "../config/database.js";
import Article from "../models/articles.js";

dotenv.config();

const PLACEHOLDER_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773666923/THE_ANCIENT_ISLAND_ysi0di.png";

const articles = [
  {
    title: "Typographic Hierarchies",
    subtitle:
      "Master the art of visual organization in typography. Learn six essential variables to establish effective hierarchies that guide readers and enhance communication through deliberate design choices.",
    author: "Alma Hoffmann",
    readTime: "29 min read",
    featuredImage: PLACEHOLDER_IMAGE,
    publishedAt: new Date("2022-10-26"),
    content: {
      intro:
        "Simply defined, the concept of typographic hierarchies refers to the visual organization of content in terms of their relative importance. In other words, the manner in which we organize the text, the headers, the subheaders, the columns, the paragraphs, the callouts, and others on the page or space signify their importance. That sounds easy enough, right? The problem is that visually accomplishing this is more challenging than it sounds, especially for those unfamiliar with the nuances of typography.",
      sections: [
        {
          heading: "Understanding Typography and Hierarchy",
          body: "These two words: typographic and hierarchies are not familiar concepts to those outside our field. The term typographic refers to matters related to typography: type choice, sizes, weights, how far or close we set the letters, and others. The term hierarchy refers to levels of priority or importance: what comes first, second, and third. Thus, when these two terms are put together, we mean to arrange content in levels of importance with the intention of communicating to the reader.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "The Journey to Understanding Typography",
          body: "My biggest challenge was that I could not see the letters as something other than the semantic symbols of language. My 'aha' moment came when another instructor explained that typography was like auditioning for a part in a play. It was then that I realized, in a very experiential way, that typography was the spoken language in visual form. The page was the stage. The letters, words, titles, paragraphs, and so on were performers on that stage.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "Six Essential Variables",
          body: "The typographic hierarchies project is based on isolating six basic variables to establish a typographic hierarchy. When we look at a typographic composition, a poster, a brochure, or a web page, what we see is the application of these variables together.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Proximity or Space — The relative distance between elements",
            "Weight — Changes in typeface boldness (bold, regular, italic, heavy, medium)",
            "Size — How large or small the font is displayed",
            "Size and Weight — Combining two variables for emphasis",
            "Color — Using hue to enhance hierarchy",
            "Visual Punctuation — Lines, shapes, symbols, and geometric elements",
          ],
        },
        {
          heading: "1. Proximity or Space",
          body: "Proximity refers to the relative distance between elements. When we discuss space in a typographic hierarchy, we refer to things like space between letters, words, titles, paragraphs, margins, and how and where we place elements on the page. A predetermined grid is the division of the space into a certain amount of columns. An improvisational grid is created when we lay down one element and use it to extend its lines to organize elements around it.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "2. Weight",
          body: "Weight refers to changes in the typeface as bold, regular, italic, heavy, medium, and so on. In this variable, we keep the sizes all even. A typeface with no weight options will not be helpful in our exploration. By using different weights strategically, you can guide the reader's eye through the content without relying on size changes.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "3. Size",
          body: "Size refers to how large or small the font used is displayed. For hierarchy purposes, we limit ourselves to three sizes: Body Copy (8-12 points), Titles (anything over 14 points for display), and Subheaders or Accents (something in between body copy and titles).",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Body Copy: Depending on the typefaces' x-height, anywhere from 8 points to 12",
            "Titles: Anything over 14 points is considered a display",
            "Subheaders or Accents: Select something in between the body copy size and the titles",
          ],
        },
        {
          heading: "4. Size and Weight Combined",
          body: "Combining two variables while still using proximity creates a powerful hierarchy. We are still limiting ourselves to three size changes. Keep an eye on the balance of the page. Size and weight experimentation also allows you to start playing with an improvisational grid.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "5. Color",
          body: "When studying this variable, we limit the use of color to two or three colors. There are usually three essential aspects to consider when using color: Content (what is the message and tone?), Audience (who will be viewing this design?), and Context (where and how will this be seen?).",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Content: What is the message and tone?",
            "Audience: Who will be viewing this design?",
            "Context: Where and how will this be seen?",
          ],
        },
        {
          heading: "6. Visual Punctuation",
          body: "Visual punctuation refers to the use of lines, shapes, symbols, and other geometric elements to enhance the hierarchy. The key is to use visual punctuation purposefully. Every element should serve to enhance the hierarchy and improve communication, not just to decorate the page.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Lines that separate or connect content sections",
            "Circles or shapes that highlight important information",
            "Arrows or directional elements that guide the eye",
            "Geometric patterns that create visual rhythm",
            "Decorative elements that reinforce the message",
          ],
        },
        {
          heading: "Putting It All Together",
          body: "When working with all these variables combined, magic happens. The key is understanding that these variables work together, creating a symphony of visual communication. Each element supports the others, building a cohesive and effective typographic system.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Establish clear hierarchy through intentional use of the six variables",
            "Consider the content, audience, and context in all design decisions",
            "Use grids (predetermined or improvisational) to organize space effectively",
            "Limit your choices: three sizes maximum, two to three colors",
            "Let the content guide your typographic decisions",
            "Always print and review your work from a distance",
          ],
        },
      ],
    },
  },
  {
    title: "A Beginner's Guide to Kerning",
    subtitle:
      "Master the art of adjusting letter spacing to create visually balanced and professional typography. Learn why kerning matters, common problem letter pairs, and expert tips to kern like a designer.",
    author: "Admin",
    readTime: "12 min read",
    featuredImage: PLACEHOLDER_IMAGE,
    publishedAt: new Date("2021-08-16"),
    content: {
      intro:
        "Kerning involves adjusting your typography to look right rather than creating mathematically equal spacing. Type is a funny thing in that it can be a sort of optical illusion. If you were to typeset a word with exactly equal spacing between each letter, it wouldn't actually look evenly spaced. That's because letters have unique shapes, like puzzle pieces, and need to be fit together in a way that works best for each pair.",
      sections: [
        {
          heading: "What Is Kerning?",
          body: "Kerning is the process of adjusting the space between individual letter pairs to achieve visually pleasing and balanced typography. Unlike tracking, which adjusts spacing uniformly across all letters, kerning focuses on the specific relationship between two adjacent characters. The goal is to create the appearance of equal spacing between letters, even though the actual measured distance may vary.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "Why Kerning Matters in Design",
          body: "Good kerning enhances readability and professionalism, while poor kerning can make your design look amateurish. Kerning mistakes can sometimes make words hard to read, or even spell out something you didn't intend. Where kerning makes the most difference is for large, highly visible text.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Headlines and titles — Large display type where spacing is most noticeable",
            "Logos and branding — Critical for professional brand identity",
            "Hero images with text — Banner text that needs to make an impact",
            "Posters and signage — Any large-format typography",
            "Social media graphics — Text that needs to stand out at a glance",
          ],
        },
        {
          heading: "Kerning vs. Tracking vs. Leading",
          body: "Kerning adjusts the space between two specific letters. Tracking (also called letter-spacing) adjusts the spacing uniformly across a range of letters or an entire word. Leading (pronounced 'ledding') refers to the vertical space between lines of text. Understanding the difference between these three typographic spacing concepts is essential for mastering typography.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "Common Problem Letter Pairs",
          body: "Certain letter combinations are notorious for creating spacing issues. Capital letters with vowels such as AV, AW, and TA are the most frequent offenders due to their diagonal strokes creating natural gaps.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "AV, AW, AY — The diagonal stroke of A creates space that needs tightening",
            "TA, Te, To, Tu — The T's crossbar creates excessive space",
            "VA, Vo, Ve — Similar issues with diagonal strokes",
            "WA, We, Wo — The W's angles create awkward spacing",
            "FA, Fe, Fo — The F's crossbar extends over adjacent letters",
          ],
        },
        {
          heading: "Metrics vs. Optical Kerning",
          body: "Metrics uses the built-in kerning settings that the typeface designer specified in the font file. Optical kerning discards the font's built-in settings and re-spaces the type according to an algorithm. Manual kerning is always best for important, highly visible text — this involves adjusting the space between specific letter pairs by hand, using your eye to judge the perfect spacing.",
          image: PLACEHOLDER_IMAGE,
          listItems: [],
        },
        {
          heading: "How to Kern Like a Designer",
          body: "Start with your software's automatic kerning options. Work at a large zoom level when kerning. Stop seeing letters as letters and start seeing them as abstract shapes. Pay attention to the white space between letters rather than the letters themselves.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Start with Metrics or Optical Kerning as a foundation",
            "Zoom In to at least 200-400% for fine adjustments",
            "Think in Terms of Shapes — stop reading, start seeing",
            "Look at Negative Space — aim for visually equal white space",
            "Kern Upside Down to focus purely on spacing",
            "Work from Larger to Smaller Letters",
            "Take Breaks to maintain fresh perspective",
            "Print It Out to check in final context",
            "Study Good Typography to train your eye",
          ],
        },
        {
          heading: "Common Kerning Mistakes to Avoid",
          body: "Even experienced designers can fall into common kerning traps. Being aware of these pitfalls will help you develop better habits and produce more polished typography.",
          image: PLACEHOLDER_IMAGE,
          listItems: [
            "Over-kerning — Making adjustments where they're not needed",
            "Inconsistent spacing — Kerning some pairs but missing others",
            "Ignoring the overall rhythm — Focusing too much on individual pairs",
            "Using tracking when you need kerning",
            "Kerning body copy — Wasting time on small text",
            "Relying solely on automatic kerning",
            "Kerning before finalizing the font choice",
          ],
        },
      ],
    },
  },
];

const seedArticles = async () => {
  try {
    await connectDatabase();
    console.log("✅ Connected to database");

    await Article.deleteMany({});
    console.log("🗑️  Cleared existing articles");

    const inserted = await Article.insertMany(articles);
    console.log(`✅ Seeded ${inserted.length} articles successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  }
};

seedArticles();