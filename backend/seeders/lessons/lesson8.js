import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

const SCENARIO1 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773930168/a6d4338b-334e-43df-8d48-593023c56075.png";
const SCENARIO2 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059513/a93a653f-dddb-44e3-8076-1b1510c55e90.png";
const SCENARIO3 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059861/afbaab44-d85e-4389-99b4-99379ba08bad.png";
const SCENARIO4 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059880/49122bb2-fa4b-4543-8d78-872a3f1d699e.png";
const SCENARIO5 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059893/1575afda-2907-46d8-9262-2ca93c8d3d94.png";
const SCENARIO6 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059920/c8f71f84-9d90-4a37-a791-1377b280678f.png";
const SCENARIO7 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059972/214cfca7-3157-4c9c-a862-fd7b78bfd794.png";
const SCENARIO8 = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1774059984/e2e5d4a0-0233-4448-930c-7c068962a084.png";

const lessons = [
  {
    title: "Lesson 8: The Font Selector",
    difficulty: "Intermediate",
    completionTime: "~20 min",
    lessonImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773797250/THE_TROPICAL_TYPE_RESORT_ISALND_xkb8re.png",
    youtubeUrl: "",
    description: "Step into the role of a brand designer. You will be given a client brief and a live canvas — your job is to choose the typeface that emotionally matches the brand's personality and visual context. Watch out: each canvas starts with the wrong font already applied.",
    instruction: "Each challenge presents a branding scenario with a live canvas preview. The canvas starts with a mismatched font — your job is to replace it with the one that fits. As you select different typefaces, the canvas updates in real time and the Emotional Matching Meter shows how well your choice aligns with the brand's visual context. There may be more than one acceptable answer.",
    sections: [],
    quiz: [

      /* ═══════════════════════════════════════════
         PROBLEM 1: Tropical Resort — Tourism Marketing
         Canvas BG: tropical beach poster
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "The tourism board's poster shows a beautiful tropical beach, but the headline 'PARADISE' is set in an Old English Blackletter font. Fix the semiotic conflict — choose the typeface that emotionally matches the image.",
        theme: "Emotional Semiotics & Tourism Marketing",
        mechanic: "Contextual Font Fitting",
        learningObjectives: [
          { objective: "Identify semiotic conflict between image tone and typeface personality" },
          { objective: "Match typography to the emotional context of a visual" },
          { objective: "Maintain readability while expressing personality" },
        ],
        narrative: "Welcome to Island 8 Resort. The tourism board is in a panic — the high season is about to begin but their promotional poster is still unfinished.",
        narrativeContext: "The background image shows crystal-clear turquoise water, white sand, and a swaying palm tree. The word 'PARADISE' is written in Old English Blackletter — a font that communicates seriousness and historical formality.",
        problem: "The image suggests relaxation and tropical escape, but the typeface communicates seriousness. This mismatch creates a semiotic conflict.",
        problemContext: "Your role as the visiting 'Design Empath' is to choose the typography that best communicates the feeling of a perfect summer vacation — relaxed, vibrant, and welcoming.",
        backgroundImage: SCENARIO1,
        displayText: "PARADISE",
        subtext: "Your Summer Awaits",
        wrongFont: "'UnifrakturMaguntia', cursive",
        correctAnswers: ["Pacifico", "Montserrat"],
        correctAnswer: "Pacifico",
        explanation: "Pacifico (brush script) communicates a relaxed, tropical feeling — ideal for general vacation marketing. Montserrat (Humanist Sans) also works if the resort wants a modern luxury feel. Both resolve the semiotic conflict with the beach imagery.",
        typefaceOptions: [
          { typefaceTitle: "Pacifico",     font: "'Pacifico', cursive",           vibe: "Relaxed, Tropical, Handcrafted" },
          { typefaceTitle: "Montserrat",   font: "'Montserrat', sans-serif",      vibe: "Modern, Welcoming, Contemporary" },
          { typefaceTitle: "Bodoni Moda",  font: "'Bodoni Moda', serif",          vibe: "Luxurious, Fashion, Rigid" },
          { typefaceTitle: "Helvetica",    font: "'Helvetica Neue', sans-serif",  vibe: "Corporate, Neutral, Airport Signage" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 2: Emergency Alert — Urgency & Public Safety
         Canvas BG: storm / typhoon poster (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A coastal town is bracing for a severe typhoon. The evacuation poster shows dark storm clouds and crashing waves — but 'EVACUATE NOW' is written in a playful bubble font. Fix the emotional mismatch.",
        theme: "Urgency & Public Safety",
        mechanic: "Tone Alignment",
        learningObjectives: [
          { objective: "Match typography with message severity" },
          { objective: "Avoid misleading emotional cues in public communication" },
          { objective: "Use typographic hierarchy for urgent messaging" },
        ],
        narrative: "A coastal town is about to experience a strong typhoon. The local government has prepared an evacuation poster, but the typography feels completely wrong.",
        narrativeContext: "The poster shows dark storm clouds and crashing waves. The word 'EVACUATE NOW' is written in a playful bubble font — the image signals danger but the typography suggests fun and harmlessness.",
        problem: "The emotional mismatch between the dramatic imagery and the playful font creates dangerous confusion for readers.",
        problemContext: "As the 'Design Empath,' your task is to ensure the message communicates urgency and seriousness — lives may depend on it.",
        backgroundImage: SCENARIO2,
        displayText: "EVACUATE NOW!",
        subtext: "Severe Typhoon Approaching — Leave Immediately",
        wrongFont: "'Bubblegum Sans', cursive",
        correctAnswers: ["Bebas Neue", "Impact"],
        correctAnswer: "Bebas Neue",
        explanation: "Bold, condensed fonts like Bebas Neue or Impact communicate urgency and authority. Their weight and density mirror the gravity of the situation — exactly what an emergency poster demands.",
        typefaceOptions: [
          { typefaceTitle: "Bebas Neue",       font: "'Bebas Neue', sans-serif",       vibe: "Bold, Urgent, Authoritative" },
          { typefaceTitle: "Impact",           font: "'Impact', sans-serif",           vibe: "Strong, Heavy, Immediate" },
          { typefaceTitle: "Playfair Display", font: "'Playfair Display', serif",      vibe: "Formal but too calm for emergencies" },
          { typefaceTitle: "Arial",            font: "'Arial', sans-serif",            vibe: "Readable but lacks urgency" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 3: Research Conference — Academic Credibility
         Canvas BG: conference poster (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A university's global research conference poster uses a bright neon display font for 'International Research Summit.' The serious academic content is undermined by the flashy typography. Choose a font that restores credibility.",
        theme: "Academic Credibility",
        mechanic: "Contextual Authority Matching",
        learningObjectives: [
          { objective: "Understand how typography builds or destroys credibility" },
          { objective: "Recognize that serif fonts often signal tradition and expertise" },
          { objective: "Match type personality to institutional context" },
        ],
        narrative: "A university is hosting a global research conference, but the headline typography looks unprofessional.",
        narrativeContext: "The poster uses a bright neon font for 'International Research Summit.' This creates a mismatch between serious academic content and playful design.",
        problem: "The neon display font undermines the academic and professional nature of the conference, reducing credibility.",
        problemContext: "Choose typography that reflects trust, intelligence, and professionalism appropriate for a global academic event.",
        backgroundImage: SCENARIO3,
        displayText: "International Research Summit",
        subtext: "Global Academic Conference · April 15–17 · University Campus",
        wrongFont: "'Boogaloo', cursive",
        correctAnswers: ["EB Garamond", "Libre Baskerville"],
        correctAnswer: "EB Garamond",
        explanation: "Serif fonts like EB Garamond and Libre Baskerville communicate authority, tradition, and scholarly knowledge — perfectly aligned with an academic conference's need to appear credible and professional.",
        typefaceOptions: [
          { typefaceTitle: "EB Garamond",        font: "'EB Garamond', serif",           vibe: "Academic, Credible, Timeless" },
          { typefaceTitle: "Libre Baskerville",  font: "'Libre Baskerville', serif",     vibe: "Scholarly, Trustworthy, Classic" },
          { typefaceTitle: "Sacramento",         font: "'Sacramento', cursive",          vibe: "Personal but informal" },
          { typefaceTitle: "Orbitron",           font: "'Orbitron', sans-serif",         vibe: "Futuristic but not scholarly" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 4: Street Food Festival — Appetite & Sensory
         Canvas BG: food festival banner (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A street food festival banner has the word 'DELICIOUS' in a thin, sterile sans-serif font. The food looks juicy and flavorful, but the typography feels lifeless. Choose a font that makes the food look as good as it tastes.",
        theme: "Appetite & Food Marketing",
        mechanic: "Sensory Typography Matching",
        learningObjectives: [
          { objective: "Understand how typography can simulate sensory experience" },
          { objective: "Recognize that rounded fonts feel softer and more approachable" },
          { objective: "Match type weight and form to product personality" },
        ],
        narrative: "A food festival banner is failing to attract customers despite showing mouthwatering food.",
        narrativeContext: "The word 'DELICIOUS' is written in a thin, sterile font. The food looks juicy and flavorful, but the typography feels cold and lifeless — creating a sensory disconnect.",
        problem: "The sterile thin font contradicts the bold, vibrant, and appetizing visuals on the banner.",
        problemContext: "Pick a font that visually 'feels' tasty — one whose shapes and weight align with the energy and warmth of street food.",
        backgroundImage: SCENARIO4,
        displayText: "DELICIOUS",
        subtext: "Street Food Festival",
        wrongFont: "'Raleway', sans-serif",
        correctAnswers: ["Fredoka One", "Nunito"],
        correctAnswer: "Fredoka One",
        explanation: "Rounded, bold fonts like Fredoka One feel soft, juicy, and inviting — their curved letterforms mirror the roundness of food and create a warm, approachable feeling. Thin geometric fonts feel sterile by comparison.",
        typefaceOptions: [
          { typefaceTitle: "Fredoka One",  font: "'Fredoka One', cursive",         vibe: "Rounded, Soft, Juicy, Inviting" },
          { typefaceTitle: "Nunito",       font: "'Nunito', sans-serif",           vibe: "Friendly, Rounded, Approachable" },
          { typefaceTitle: "UnifrakturMaguntia", font: "'UnifrakturMaguntia', cursive", vibe: "Heavy, Historical, Not Appetizing" },
          { typefaceTitle: "Courier Prime", font: "'Courier Prime', monospace",   vibe: "Technical, Rigid, Clinical" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 5: Arcade Game Poster — Gaming & Energy
         Canvas BG: arcade launch poster (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A new arcade game launch poster is covered in explosions and neon lights — but the game title 'NEW ARCADE GAME' is set in plain Arial. The poster needs energy and excitement. Choose the right typeface.",
        theme: "Gaming & Energy",
        mechanic: "Genre-Based Font Matching",
        learningObjectives: [
          { objective: "Match typography style to target genre and audience expectations" },
          { objective: "Understand how pixel and retro fonts signal gaming culture" },
          { objective: "Recognize that font choice reflects the energy of a product" },
        ],
        narrative: "A new arcade game is launching but the poster typography makes it look boring despite the explosive visuals.",
        narrativeContext: "The poster shows neon lights and explosions. However, the game title is written in plain Arial — a completely neutral font that drains all the energy from the design.",
        problem: "The plain, neutral font creates a massive energy gap between the explosive imagery and the text — making the game feel unappealing.",
        problemContext: "Choose a typeface that matches the excitement, speed, and retro gaming culture of an arcade launch.",
        backgroundImage: SCENARIO5,
        displayText: "NEW ARCADE GAME",
        subtext: "Available Now",
        wrongFont: "'Arial', sans-serif",
        correctAnswers: ["Press Start 2P", "VT323"],
        correctAnswer: "Press Start 2P",
        explanation: "Pixel fonts like Press Start 2P and VT323 are deeply embedded in gaming culture — they instantly communicate retro arcade energy and genre. They match the audience's expectations and align with the explosive visual style of the poster.",
        typefaceOptions: [
          { typefaceTitle: "Press Start 2P", font: "'Press Start 2P', cursive",    vibe: "Retro Gaming, Pixel, Energetic" },
          { typefaceTitle: "VT323",          font: "'VT323', monospace",           vibe: "Retro Terminal, Gaming, Nostalgic" },
          { typefaceTitle: "Dancing Script", font: "'Dancing Script', cursive",    vibe: "Casual and relaxed, wrong genre" },
          { typefaceTitle: "Libre Baskerville", font: "'Libre Baskerville', serif", vibe: "Traditional, too formal for gaming" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 6: Perfume Ad — Luxury Branding
         Canvas BG: perfume advertisement (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A luxury perfume ad shows an elegant bottle surrounded by flowers — but the brand name is set in a loud, flashy graffiti font. The product is refined, but the typography feels chaotic. Choose a font that matches the brand's elegance.",
        theme: "Luxury Branding",
        mechanic: "Brand Personality Matching",
        learningObjectives: [
          { objective: "Understand how typography defines brand identity and perceived value" },
          { objective: "Recognize that luxury brands rely on contrast, refinement, and restraint" },
          { objective: "Match font to product category and consumer expectation" },
        ],
        narrative: "A luxury perfume brand needs a refined headline but the current font is destroying the brand image.",
        narrativeContext: "The product looks elegant and sophisticated, but the font is loud and flashy — completely mismatched with the luxury positioning of the fragrance.",
        problem: "The graffiti-style font contradicts the refined, exclusive personality of the luxury perfume brand.",
        problemContext: "Choose a font that communicates elegance, exclusivity, and sophistication — something that makes the perfume feel premium.",
        backgroundImage: SCENARIO6,
        displayText: "L'IMPÉRATRICE",
        subtext: "Eau de Toilette",
        wrongFont: "'Permanent Marker', cursive",
        correctAnswers: ["Cormorant Garamond", "Playfair Display"],
        correctAnswer: "Cormorant Garamond",
        explanation: "High-contrast serif fonts like Cormorant Garamond and Playfair Display communicate luxury, sophistication, and exclusivity through their elegant letterforms and refined proportions — perfectly matching premium fragrance branding.",
        typefaceOptions: [
          { typefaceTitle: "Cormorant Garamond", font: "'Cormorant Garamond', serif",   vibe: "Luxury, Refined, Elegant, Exclusive" },
          { typefaceTitle: "Playfair Display",   font: "'Playfair Display', serif",     vibe: "High Contrast, Sophisticated, Premium" },
          { typefaceTitle: "Boogaloo",           font: "'Boogaloo', cursive",           vibe: "Playful and casual" },
          { typefaceTitle: "Quicksand",          font: "'Quicksand', sans-serif",       vibe: "Friendly but too casual for luxury" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 7: Hospital Website — Trust & Healthcare
         Canvas BG: hospital/medical website header (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A hospital's website header uses a decorative, complex script font for 'Healing Hearts Medical Center.' Patients find it hard to trust the site because it looks unserious. Choose a font that communicates clarity and care.",
        theme: "Trust & Healthcare",
        mechanic: "Emotional Safety Matching",
        learningObjectives: [
          { objective: "Understand that clarity and simplicity build trust in healthcare design" },
          { objective: "Recognize that clean sans-serif fonts feel transparent and reliable" },
          { objective: "Avoid decorative complexity in contexts requiring immediate trust" },
        ],
        narrative: "A hospital homepage feels untrustworthy because of its typography — patients need to feel safe and confident.",
        narrativeContext: "The font looks decorative and complex — stylish but confusing. In a medical context, this creates anxiety rather than reassurance.",
        problem: "A decorative script font undermines patient trust and makes the medical center appear unserious.",
        problemContext: "Choose a font that communicates clarity, professionalism, and calm authority — qualities patients need from a healthcare provider.",
        backgroundImage: SCENARIO7,
        displayText: "Healing Hearts Medical Center",
        subtext: "Caring for You with Compassion & Excellence",
        wrongFont: "'Satisfy', cursive",
        correctAnswers: ["Lato", "Source Sans 3"],
        correctAnswer: "Lato",
        explanation: "Clean, humanist sans-serif fonts like Lato and Source Sans 3 communicate transparency, reliability, and approachability — exactly what patients need to feel from a healthcare provider. Clarity literally builds trust.",
        typefaceOptions: [
          { typefaceTitle: "Lato",          font: "'Lato', sans-serif",           vibe: "Clear, Trustworthy, Professional" },
          { typefaceTitle: "Source Sans 3", font: "'Source Sans 3', sans-serif",  vibe: "Open, Readable, Reliable" },
          { typefaceTitle: "UnifrakturMaguntia", font: "'UnifrakturMaguntia', cursive", vibe: "Heavy and outdated" },
          { typefaceTitle: "Bebas Neue",    font: "'Bebas Neue', sans-serif",     vibe: "Loud and aggressive, too bold" },
        ],
      },

      /* ═══════════════════════════════════════════
         PROBLEM 8: Kids Learning App — Playfulness & Children
         Canvas BG: children's app screen (replace PLACEHOLDER_BG)
      ═══════════════════════════════════════════ */
      {
        type: "font-select",
        question: "A children's learning app is using a formal serif font for its title 'KIDS LEARNING APP.' The app looks too serious and fails to engage young users. Choose a font that speaks to kids.",
        theme: "Playfulness & Children's Design",
        mechanic: "Audience-Based Typography",
        learningObjectives: [
          { objective: "Understand that typography must match the target audience's expectations" },
          { objective: "Recognize how rounded shapes create an emotional response of safety and fun" },
          { objective: "Select type that engages rather than intimidates young learners" },
        ],
        narrative: "A children's app looks too serious and fails to engage its young users because of mismatched typography.",
        narrativeContext: "The font is too formal for kids — its rigid serifs communicate authority and seriousness, making the app feel like homework rather than play.",
        problem: "The formal serif font creates an audience mismatch — children expect fun, friendly, and approachable visuals.",
        problemContext: "Choose typography suitable for young learners — something that feels safe, playful, and inviting.",
        backgroundImage: SCENARIO8,
        displayText: "KIDS LEARNING APP",
        subtext: "Learn, Play, Grow!",
        wrongFont: "'Libre Baskerville', serif",
        correctAnswers: ["Fredoka One", "Nunito"],
        correctAnswer: "Fredoka One",
        explanation: "Rounded, playful fonts like Fredoka One and Nunito feel friendly and fun — their soft curves communicate safety and approachability, which is exactly what children need to feel engaged with learning content.",
        typefaceOptions: [
          { typefaceTitle: "Fredoka One",  font: "'Fredoka One', cursive",     vibe: "Friendly, Rounded, Playful, Fun" },
          { typefaceTitle: "Nunito",       font: "'Nunito', sans-serif",       vibe: "Warm, Rounded, Approachable" },
          { typefaceTitle: "Oswald",       font: "'Oswald', sans-serif",       vibe: "Condensed and serious" },
          { typefaceTitle: "Courier Prime", font: "'Courier Prime', monospace", vibe: "Technical and rigid" },
        ],
      },

    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");
    await Lesson.deleteMany({ title: "Lesson 8: The Font Selector" });
    console.log("🗑️  Cleared existing Lesson 8: The Font Selector");
    const inserted = await Lesson.insertMany(lessons);
    console.log(`📚 Seeded ${inserted.length} lessons successfully`);
    for (const l of inserted) console.log(`   • ${l.title} (${l.quiz.length} quiz items)`);
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();