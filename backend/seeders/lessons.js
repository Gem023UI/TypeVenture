import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../models/lessons.js";

dotenv.config({ path: "./.env" });

const lessons = [
  {
    title: "I. Beginning Graphic Design: Typography",
    sourceUrl: "https://edu.gcfglobal.org/en/beginning-graphic-design/typography/1/",
    content: {
      description: "An introductory guide to typography basics and principles.",
      introduction: "This tutorial defines typography as the style or appearance of text and the art of working with text in design. It presents common font categories—serif, sans serif, and display—and discusses their use and visual character. It then advises on how to choose fonts that fit the message. The material warns against overused fonts and encourages thoughtful font pairing. Key typographic terms like hierarchy, leading, tracking, and kerning are explained with their roles in readability and visual structure. Finally, the guide emphasizes that combining these basics well can elevate designs from ordinary to extraordinary.",
      discussionOne: "This guide demystifies typography by framing it as both style and tool. It highlights how typography is everywhere—in signage, packaging, digital screens—and thus plays a silent but powerful role in communication. It encourages users to look beyond letters as words and see them as visual expression.",
      discussionTwo: "By introducing serif, sans serif, and display fonts, the material helps users understand the emotional and functional differences among font types. It shows when each style is best used (body text, headings, decorative pieces) and cautions against overused, cliché fonts that may weaken visual impact.",
      discussionThree: "The guide emphasizes the importance of font selection in matching message and tone. It introduces combining fonts wisely—limiting to one or two per design for clarity—and encourages experimentation with contrasts (like serif + sans serif) to maintain visual interest and harmony.",
      discussionFour: "Key typographic terms are explained: hierarchy guides reading order; leading is line spacing; tracking is general character spacing; kerning is spacing between particular letter pairs. These concepts help designers control readability, flow, and visual structure in text-heavy layouts.",
      discussionFive: "In closing, the tutorial argues that even basic typographic knowledge makes a meaningful difference in design. It encourages learners to pay attention to type, combine elements thoughtfully, and see typography as a subtle but potent creative force.",
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "II. Uxcel – Typographic Principles",
    sourceUrl: "https://app.uxcel.com/courses/typography-basics/typographic-principles-438",
    content: {
      description: "A concise course teaching the essential principles for mastering digital typography.",
      introduction: "This Uxcel course introduces learners to the foundational concepts behind effective typography. It explains how typography is not just about choosing fonts but about organizing and presenting text for optimal communication. The lesson defines readability and legibility, differentiating how type is perceived versus how comfortably it's read. It emphasizes scannability, explaining that digital users skim content and thus need clear hierarchy and emphasis. The course explores typographic mood, revealing how font choices communicate emotion and identity. It teaches restraint in using multiple typefaces, promotes typographic scaling for visual order, and explains alignment, proximity, and white space as crucial layout tools for balance and focus.",
      discussionOne: "Typography begins with understanding readability and legibility, two pillars of effective communication. Legibility relates to how easily individual letterforms can be recognized, while readability describes how comfortably blocks of text can be processed. The Uxcel course stresses the designer's responsibility to balance both. Clear font selection, proper spacing, and line length all influence how users consume written content. Poor readability leads to frustration, while optimal typography enhances engagement and comprehension. By studying these principles, designers learn to make aesthetic and functional choices that create smooth reading experiences, blending beauty and usability in digital interfaces.",
      discussionTwo: "Scannability is central to how users interact with modern digital content. People rarely read online text word for word; instead, they scan to locate key information. Uxcel teaches designers to structure text hierarchically through headings, subheadings, bullet points, and strategic emphasis. Well-defined hierarchy directs attention, making complex information digestible. The course emphasizes that effective typography supports this natural scanning behavior by using contrast, weight, and spacing to guide the eye. This approach enhances usability and accessibility, ensuring that vital messages stand out quickly. Ultimately, scannable typography turns reading into an intuitive, frictionless experience for every user.",
      discussionThree: "Typographic mood determines how audiences emotionally perceive written content. Uxcel highlights that font choices express tone and character just as much as words do. A sleek sans serif might convey modernity and minimalism, while a serif typeface suggests tradition and reliability. Designers must align mood with message to maintain coherence. The course teaches that every design choice—from weight to curvature—affects emotional resonance. Consistent mood strengthens brand identity and user trust. By mastering typographic mood, designers move beyond legibility, crafting communication that speaks visually and emotionally, ensuring that form amplifies meaning and strengthens the message's overall impact.",
      discussionFour: "Limiting typefaces is a key discipline in professional typography. Uxcel advises designers to use no more than two to three complementary fonts per design. This maintains consistency, readability, and aesthetic harmony. Too many fonts can confuse users and weaken hierarchy. The course also introduces typographic scale, which establishes proportional relationships between text elements such as headings, subheadings, and body copy. A consistent scale ensures visual rhythm and unity across layouts. Combined with restrained font choices, typographic scaling helps guide the reader naturally through content while reinforcing clarity, coherence, and visual sophistication in digital and print interfaces alike.",
      discussionFive: "The final section of Uxcel's typographic principles explores alignment, proximity, and white space. Alignment creates structure and order, ensuring elements feel connected and intentional. Proximity groups related information, helping users interpret relationships among text blocks. White space, meanwhile, offers breathing room, reducing clutter and enhancing focus. Together, these elements transform a layout from crowded to elegant. Uxcel emphasizes that thoughtful spacing and organization improve both aesthetics and usability. These principles enable designers to achieve balance and rhythm in composition, ensuring text feels intuitive and engaging. Effective typography, therefore, blends precision with artistry, crafting design that communicates effortlessly."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "III. Material Design 3 – Applying Type",
    sourceUrl: "https://m3.material.io/styles/typography/applying-type",
    content: {
      description: "Guidelines on how to apply typography effectively in Material Design systems.",
      introduction: "This resource describes how Material Design 3 applies typography as a structured system. It outlines typographic roles (e.g. display, headline, body) and their semantic functions. It offers guidance on font weight, size, line height, and letter spacing. It emphasizes consistency across platforms and responsive scaling. The material shows usage in UI components, cards, dialogs, and navigation. It addresses balancing expressiveness and readability. The page provides visual examples and code snippets illustrating typographic rules. Overall, it aims to help designers implement typography that is both aesthetic and functional within the Material Design framework.",
      discussionOne: "Material 3 organizes typography into roles: display, headline, title, label, and body. Each role has semantic importance and is used consistently across UI patterns. Designers assign type roles according to content hierarchy rather than arbitrary styling choices. This system ensures coherence and predictable relationships across complex interfaces.",
      discussionTwo: "The resource prescribes typographic metrics: font size, weight, letter spacing, and line height tailored to each role. These parameters are not arbitrary; they support legibility and harmony. Material's typographic scale adapts responsively across screen sizes, preserving proportion and readability.",
      discussionThree: "Material emphasizes consistency across platforms. Text styles defined for mobile should translate meaningfully into web or tablet contexts. This uniformity ensures recognizable brand voice and user expectation alignment. Designers maintain harmony by reusing typographic roles and applying them across components.",
      discussionFour: "The guidance includes usage in UI components: app bars, cards, dialogs, navigation bars. For each component, there is a typographic role recommendation (e.g. headline in dialog, label in button). This helps designers choose correct text styles without guesswork.",
      discussionFive: "Material balances expressiveness and utility: typography should feel alive and characteristic, yet not impede readability. The system allows expressive typography (for example in display text) but restrains it elsewhere. The guideline supports creative freedom within a consistent typographic framework."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "IV. Typography Tips: A Lesson on Contrast",
    sourceUrl: "https://www.process-masterclass.com/typography-tips-a-lesson-on-contrast",
    content: {
      description: "A guide on how contrast elevates typographic design.",
      introduction: "This article explores contrast as a foundational principle in typography. It argues that mastering contrast is essential to creating hierarchy, emphasis, and visual interest. Various contrast tools are explained: size, weight, transforms, color, and style. Real-world examples show how contrast clarifies information and evokes emotion. The author encourages experimentation across these dimensions. The guide balances theory with practice tips. It also underscores restraint—knowing when less contrast is more. Ultimately, it teaches that good typography is built on nuanced contrast decisions.",
      discussionOne: "Contrast enables emphasis and de-emphasis in typographic design. Through size variations, dominant text stands out immediately, while subtler text recedes. This distinction guides reader attention and clarifies information hierarchy. Even with a single font, contrast in scale can create visual drama and prioritize content meaningfully. Thoughtful use of contrast builds structured and readable layouts that feel intentional, not chaotic.",
      discussionTwo: "Font weight contrast lets designers highlight or soften textual elements. A bold weight signals importance; a lighter weight suggests secondary content. Mixing weights within the same font family preserves consistency while adding dimension. This technique helps differentiate headings, subheadings, and body text without introducing new typefaces. Weight contrast contributes to clarity, visual rhythm, and expressive typographic voice.",
      discussionThree: "Text transforms (uppercase, small caps, italics) serve as contrast levers. Applying them strategically infuses variation and meaning: uppercase signals assertiveness, italics add nuance, small caps balance formality and emphasis. Combined with size and weight, transforms enrich typographic language. Used sparingly, they reinforce hierarchy and visual interest. Overuse risks confusion—restraint is key.",
      discussionFour: "Color contrast is one of the most immediate and powerful tools. Dark text on a light background—or vice versa—ensures legibility and visual priority. Subtle tonal shifts can de-emphasize secondary information without sacrificing clarity. Designers should also consider contrast for accessibility, ensuring text meets contrast ratio guidelines. Color and tone contrast works especially well alongside size and weight change to create layered visual depth.",
      discussionFive: "Style contrast (roman vs. italics, serif vs. sans serif, display vs. text) further diversifies typographic expression. Mixing styles carefully allows designers to emphasize certain elements while maintaining coherence. The author urges experimentation—try combining styles, but always evaluate readability and balance. Good contrast isn't about variety for its own sake, but about clear, meaningful visual communication, anchored in intention.",
    },
    youtubeUrl: "https://youtu.be/aQ-Te9IAvyo?si=WIuu_iRvvmQtK7qy",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "V. Typography Guidelines and References",
    sourceUrl: "https://www.smashingmagazine.com/2012/07/typography-guidelines-and-references/",
    content: {
      description: "A curated compilation of typography principles, techniques, and reference resources.",
      introduction: "This Smashing Magazine article collects and summarizes key typography guidelines, best practices, and reference links for designers. It emphasizes typographic respect, avoiding superficial ornamentation in favor of meaningful design. It discusses paragraph formatting, font embedding, combining typefaces, web font services, CSS techniques, macro- and micro-typography, and international writing systems. The author also explores font rendering issues and typographic design patterns. The article is rich with examples and external resources. It aims to guide both novices and experienced designers toward better typographic decisions.",
      discussionOne: "The article begins by urging designers to 'respect thy typography,' avoiding cheap visual tricks and instead grounding design in intention. It highlights how pervasive typography is in everyday media, often overlooked. The author criticizes typographic laziness—such as heavy decoration without substance—and argues that good typography should stand strong without relying on gimmicks.",
      discussionTwo: "Next, the article revisits the 'perfect paragraph,' emphasizing readable line length, appropriate leading (line spacing), and margins. It reminds designers that paragraphs are core to content and deserve typographic attention. The piece suggests applying print conventions adapted for screens. Good paragraph design supports comprehension and visual rhythm.",
      discussionThree: "The guide addresses best practices for combining typefaces. It presents the 'serif + sans serif' pairing as a safe, effective approach. It also warns against using too many contrasting styles, which dilutes cohesion. Practical pairings maintain harmony and help establish hierarchy. Designers are encouraged to balance contrast and consistency.",
      discussionFour: "A significant portion is dedicated to web typography techniques: embedding fonts via @font-face, CSS font stacks, and using webfont services. The author compares font services and suggests careful use of dynamic text replacement, such as only in headings. It also explores how browsers and operating systems render fonts differently, affecting the final display. Understanding these nuances ensures consistent typographic quality.",
      discussionFive: "Finally, the article delves into macro- and micro-typography. Macro refers to page-level layout decisions like grouping and flow, while micro refers to fine details such as kerning and spacing. It covers design patterns derived from analyzing many websites and introduces international writing systems to broaden typographic awareness. The article concludes with a wealth of references for further study."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "VI. Graphic Design Basics: Typography Lesson Plan",
    sourceUrl: "https://www.icevonline.com/hubfs/CEV80528_Lesson_Plan_TX.pdf",
    content: {
      description: "A detailed lesson plan for teaching typography essentials in the classroom.",
      introduction: "This PDF lesson plan outlines a multi-class module on typography fundamentals, tools, and expressive techniques. It begins by introducing typographic vocabulary and the anatomy of letters. It then explores typeface categories, spacing, alignment, and design software tools. Activities gradually move from simpler tasks (vocabulary, samples) to creative applications such as decorative typography, typographic logos, and magazine spreads. The plan integrates assessments, projects, and review sessions across 11 classes. It also includes career connection components to link typographic skills to real design professions.",
      discussionOne: "The lesson plan emphasizes building a strong vocabulary and visual literacy around typography. Students begin by learning terms like serif, x-height, spacing, alignment, and more. This foundation helps them analyze and make decisions about type. Early assessments ensure comprehension before moving into hands-on activities. Without a shared language, typographic choices become arbitrary; this plan anchors design in consistent terminology.",
      discussionTwo: "After vocabulary, the plan introduces classification and anatomy of typefaces. Students compare serif, sans serif, and decorative styles to understand their expressive potential. The anatomy handout lets them identify baselines, ascenders, descenders, and counters. By dissecting letterforms, learners see how subtle details influence legibility and tone. This anatomical awareness supports more informed typographic decisions later.",
      discussionThree: "The plan transitions into applied design with a 'Decorative Typography' project. Students receive a word and design a decorative typeface that conveys meaning. This encourages exploration of how shape, style, and ornamentation communicate ideas. Next, in the 'Typographic Logo' activity, learners combine type with brand thinking, selecting typefaces that reflect identity and values. These tasks move learners from theory to expressive design practice.",
      discussionFour: "A later module is 'Magazine Spread,' where students design layouts integrating multiple typographic rules. They must use two typefaces, contrasting alignment, and images within the spread. This challenges them to balance hierarchy, readability, and visual flow. Alongside projects, assessments and review sessions reinforce learning. Students also present their work and discuss their design choices through reflection.",
      discussionFive: "The lesson plan embeds career connections, asking students to explore typographic roles in design professions. It encourages reflection on how typographic skills translate to real-world work. Final assessments and project submissions serve as both evaluation and portfolio pieces. Throughout, the pacing increases in complexity, scaffolding from vocabulary to expressive design. This ensures learners build confidence before tackling ambitious creative tasks."
    },
    youtubeUrl: "https://youtu.be/aQ-Te9IAvyo?si=WIuu_iRvvmQtK7qy",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "VII. Lessons in Typography: Must-Know Typographic Principles",
    sourceUrl: "https://www.peachpit.com/store/lessons-in-typography-must-know-typographic-principles-9780133993752",
    content: {
      description: "A lesson-based book covering the fundamentals of using and designing with type.",
      introduction: "Lessons in Typography by Jim Krause offers a practical, example-driven approach to mastering typographic fundamentals. It begins with terminology and the anatomy of letterforms. Then it guides readers into font selection, pairing, spacing, and layout. The book encourages hands-on exercises—creating logos, modifying letters, designing text layouts. It emphasizes the balance of clarity, expression, and structure. With many visuals and exercises, it makes typography accessible and applicable. The book is suitable for beginners and intermediate designers alike. Its goal is to teach both the 'rules' and the creative flexibility of type. Krause blends theory with practice to foster design confidence.",
      discussionOne: "Krause begins by establishing a vocabulary of type—terms like serif, x-height, ascender, baseline, tracking, leading, kerning. By grounding readers in this language, the book empowers thoughtful typographic decision-making. Without a shared language, design becomes guesswork. Early exercises reinforce identification of letter parts and type families, preparing readers to move from observation to active typographic composition.",
      discussionTwo: "Next, the book explores typeface categories and the art of the letter. Readers compare serif, sans serif, script, decorative, and display types. Krause explains how small details—serifs, terminals, contrast—affect tone and legibility. He includes letter modifications such as cutting, adding strokes, or embellishments to personalize type. This teaches respect for tradition while encouraging creative exploration.",
      discussionThree: "Moving into working with words, Krause addresses how to assemble words and phrases typographically. He discusses spacing, case, ligatures, and choosing treatments that match meaning. The same word can feel different depending on font, weight, and layout. Exercises let readers experiment with word mark design, adjusting spacing and style to express identity, bridging letter-level understanding to full layouts.",
      discussionFour: "In the multi-word presentations and layouts section, multiple typographic elements are combined. Krause covers combining fonts harmoniously or contrastively, establishing hierarchy, line breaks, and rhythm. He shows positioning type over images, using enclosures, and aligning multiple text blocks. Exercises prompt learners to design headlines, word graphics, and page compositions, reinforcing balance, contrast, and consistent structure.",
      discussionFive: "The final section, text and layout, focuses on longer text blocks and document-scale design. Topics include paragraph formatting, readable line lengths, and spacing. Krause presents techniques for integrating body text with display elements, maintaining readability and harmony. The book concludes by threading typographic appreciation through all levels, encouraging continual study and creative refinement, positioning typography as expressive visual storytelling."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "VIII. The Importance and Use of Typography in Print and Digital Design",
    sourceUrl: "https://www.researchgate.net/publication/387291068_THE_IMPORTANCE_AND_USE_OF_TYPOGRAPHY_IN_PRINT_AND_DIGITAL_DESIGN/",
    content: {
      description: "A comparative study exploring how typography functions differently in print versus digital media, especially regarding font choice and readability.",
      introduction: "This study examines typography's role and use in both printed and digital environments, emphasizing font selection, spacing, color, and size. It surveys various print media (newspapers, magazines, books, packaging) and digital media (websites, mobile apps, e-books, social media). Serif fonts like Times New Roman, Garamond, Cambria, and Georgia are preferred in print for readability. Sans-serif fonts such as Arial, Helvetica, Open Sans, and Montserrat are more common in digital media for clarity on screens. Typographic choices affect user experience, perception, and comprehension. Designers must adapt typography to each medium's strengths and limitations.",
      discussionOne: "Typography is foundational across printed and digital platforms. In print, historical roots like Gutenberg's letterpress shaped serif-focused, detailed type design. Print media allows high-resolution rendering and long-form readability. Serif fonts provide visual cues that guide the eye along lines of text, reducing fatigue. Decorative and traditional forms work well in print with minimal screen constraints.",
      discussionTwo: "Digital design priorities differ due to screen resolution, viewing distance, and dynamic contexts. Sans-serif fonts dominate digital platforms for clarity, especially at small sizes or low resolutions. Typography must balance aesthetic and legibility across devices. Constraints like aliasing, pixel density, and responsive layouts influence font choice. Designers often compromise stylistic nuance to ensure usability, comprehension, and readability.",
      discussionThree: "The research compares serif and sans-serif preferences across media. Print favors serif for body text, enhancing long-form readability. Digital platforms show faster reading speeds and preference for sans-serif fonts (e.g., Arial, Open Sans). Samples including newspapers, books, websites, and apps reinforce this trend. Exceptions exist depending on context, font size, device, user demographics, and purpose, but core patterns remain consistent.",
      discussionFour: "Other typographic elements—line spacing, color contrast, point size, and letter/word spacing—significantly affect readability. In print, generous leading and careful layout reduce strain. Digital typography requires tighter control due to glare and lighting. Usability principles like hierarchy, alignment, and proportion guide users visually and reduce cognitive load. Typography effectiveness depends on combined attention to typeface, spacing, and layout context.",
      discussionFive: "The study emphasizes conscious typography: adapting fonts and settings to medium, audience, and purpose. Use serif for printed long texts, sans-serif for screens, and consider user testing. Evolving digital environments reduce old trade-offs, but constraints like resolution and fatigue remain. Designers should consider font personality, user age, and reading context. Typography is functional, expressive, and central to clarity in any design."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "IX. The Elements of Typographic Style",
    sourceUrl: "https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style",
    category: "typography",
    content: {
      description: "A comprehensive guide blending typographic theory, history, and practical application.",
      introduction: "*The Elements of Typographic Style* by Robert Bringhurst is a seminal work in typography. First published in 1992 and revised through 2012, it blends theory, history, and practical guidance. Bringhurst emphasizes harmony, clarity, and readability, detailing type anatomy, spacing, and combining typefaces. Its enduring relevance makes it essential for designers and typographers.",
      discussionOne: "Bringhurst begins by exploring the anatomy of typefaces, detailing the components of each letterform. Understanding these elements is crucial for legibility and aesthetic appeal. Dissecting typefaces helps designers make informed font choices and adjustments. Recognizing each component's function aids in achieving balance and harmony in typographic compositions.",
      discussionTwo: "The book traces the history of typography, from early manuscripts to modern digital typefaces. Bringhurst highlights cultural and technological influences on type design. This historical perspective contextualizes contemporary practices and provides inspiration. Learning from past successes and mistakes enriches designers' understanding of the craft.",
      discussionThree: "A major focus is practical application. Bringhurst offers guidelines on type selection, spacing, alignment, and hierarchy. He stresses consistency and coherence across designs. Advice spans from setting body text to complex layouts, helping both novices and experienced designers refine their skills and implement effective typographic solutions.",
      discussionFour: "Bringhurst addresses the philosophy of typography, prioritizing the reader's experience. Typography should serve content, enhancing clarity and accessibility. Function takes precedence over ornamentation, ensuring the message communicates effectively. This approach results in work that is both beautiful and purposeful.",
      discussionFive: "The book concludes with the future of typography, considering digital technologies and evolving reading habits. Bringhurst reflects on technological changes and their impact on type creation and consumption. He encourages designers to remain adaptable, innovative, and mindful of new challenges and opportunities in the digital era."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  },
  {
    title: "X. An Essay on Typography",
    sourceUrl: "https://en.wikipedia.org/wiki/An_Essay_on_Typography",
    content: {
      description: "A 1931 work by Eric Gill discussing the history and philosophy of typography.",
      introduction: "*An Essay on Typography* by Eric Gill, published in 1931, explores the history and philosophy of typography. It emphasizes craftsmanship, advocating a return to traditional methods amid industrialization. Gill critiques mass production's effect on design quality, urging designers to prioritize artistry and human touch. The book remains influential in typography education and practice.",
      discussionOne: "Gill examines the evolution of letterforms, from ancient inscriptions to modern typefaces. He highlights historical scripts' influence on contemporary typography and stresses the relationship between form and function. Readability and aesthetic appeal are central, and the typographer's role in adapting historical styles to modern needs is emphasized, reinforcing classical principles.",
      discussionTwo: "A key theme is Gill's critique of industrialization's impact. He contrasts hand-lettering's meticulous craft with the uniformity of machine-made fonts, advocating for balance between efficiency and artistry. Human judgment and creativity are prioritized, urging designers to consider cultural and aesthetic consequences of their work in an industrialized context.",
      discussionThree: "Gill discusses technical typography aspects, including typesetting, spacing, alignment, and white space. He offers practical advice for achieving harmonious compositions and shares insights into printing processes. These observations guide designers in enhancing visual impact and readability, reflecting his hands-on experience and deep understanding of typographic mechanics.",
      discussionFour: "The essay explores typography's moral and philosophical dimensions. Gill positions design as a reflection of cultural values and human expression, carrying ethical responsibilities. Designers are encouraged to produce work that promotes clarity, integrity, and beauty. Typography is presented as a meaningful discipline with both functional and cultural significance.",
      discussionFive: "In conclusion, *An Essay on Typography* blends technical instruction with philosophical reflection. Gill challenges designers to approach typography purposefully, respecting tradition while considering contemporary contexts. The book's enduring influence attests to its relevance, offering a framework for understanding, practicing, and appreciating typography as both craft and art."
    },
    youtubeUrl: "https://www.youtube.com/embed/aQ-Te9IAvyo",
    imageUrls: [
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg1_i3rk51.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg3_azjmyz.jpg",
      "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg2_wktjwq.jpg"
    ],
    usersDone: []
  }
];

const seedAllLessons = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected...");

    let insertedCount = 0;
    let skippedCount = 0;

    for (const lessonData of lessons) {
      const existingLesson = await Lesson.findOne({ title: lessonData.title });
      
      if (existingLesson) {
        console.log(`⚠️  Lesson already exists, skipping: "${lessonData.title}"`);
        skippedCount++;
      } else {
        await Lesson.create(lessonData);
        console.log(`✅ Successfully seeded: "${lessonData.title}"`);
        insertedCount++;
      }
    }

    console.log("\n📊 Seeding Summary:");
    console.log(`   ✅ Inserted: ${insertedCount} lessons`);
    console.log(`   ⚠️  Skipped: ${skippedCount} lessons`);
    console.log(`   📚 Total: ${lessons.length} lessons processed`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding lessons:", error);
    process.exit(1);
  }
};

seedAllLessons();