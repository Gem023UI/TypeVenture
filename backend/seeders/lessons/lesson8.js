import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config();

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

      /* ─── Challenge 1: The Tropical Resort ─── */
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
        backgroundImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1773930168/a6d4338b-334e-43df-8d48-593023c56075.png",
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
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");
    await Lesson.deleteMany({ title: /Lesson VIII/ });
    console.log("🗑️  Cleared existing Lesson VIII");
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