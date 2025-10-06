import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config({ path: "./.env" });

const lessonData = {
  title: "TypeVenture - Introduction",
  sourceUrl:
    "Embark on a Journey Through Typography",
  category: "trial",
  content: {
    description: "TypeVenture gamifies typography education, transforming learning into an interactive and engaging adventure for aspiring designers.",
    introduction: "TypeVenture introduces a new, gamified way to learn typography—turning design theory into play-based discovery. It redefines how learners interact with fonts, letterforms, and layout principles by embedding them within interactive lessons and challenges. Rather than simply memorizing type rules, users engage with hands-on tasks that simulate real-world design decisions. Each module feels like a creative quest, where players earn rewards and progress through typographic mastery. The platform merges design fundamentals with the motivational aspects of gaming, such as leveling, scoring, and achievements. This encourages learners to consistently explore and improve while enjoying the process. Its interface is simple, clean, and user-centered, ensuring that learning remains visually pleasant and accessible. TypeVenture’s color-coded navigation, responsive design, and animated drawer enhance usability and immersion. Beyond aesthetics, it emphasizes why typography matters—how type conveys mood, tone, and personality. It builds a bridge between creative intuition and design theory. Learners not only understand typography’s visual rules but also its power as communication. The platform invites exploration, risk-taking, and self-paced learning. It positions typography as a living art form, one that evolves with the user’s choices and imagination. Through gamification, TypeVenture transforms what could be a technical subject into an engaging, story-driven experience that nurtures design appreciation and skill growth simultaneously.",
    discussionOne: "TypeVenture transforms typography into an adventure where users learn by playing. Each challenge feels like a mission to uncover design secrets. This gamified approach motivates consistent learning and curiosity. By earning achievements, users progress through lessons that mix theory and creativity, making typography exciting, interactive, and deeply rewarding.",
    discussionTwo: "The platform’s core concept revolves around interactive exploration. Users experiment with fonts, hierarchy, and spacing within playful environments. Gamification elements like levels and badges enhance motivation. This encourages learners to practice continuously, reinforcing knowledge through fun, visually driven activities that merge education with creative problem-solving.",
    discussionThree: "TypeVenture applies game logic to learning structure. Progression systems guide users from basic principles to advanced design techniques. Each success unlocks new challenges, sustaining engagement. The approach reframes typography not as rules but as discovery, encouraging experimentation and emotional connection to type as creative expression.",
    discussionFour: "Gamified lessons make typography feel like storytelling. Users “play” with type to express ideas, not just design layouts. The reward system fuels motivation, while interactive modules turn feedback into progress. This playful learning model builds confidence, blending technical understanding with enjoyment and visual exploration.",
    discussionFive: "Ultimately, TypeVenture gamifies education to inspire lasting learning. It proves typography can be both educational and entertaining. By merging creativity with achievement-based systems, it keeps users engaged while deepening understanding. TypeVenture stands as a model of how gamification transforms design education into meaningful, joyful exploration.",
  },
};

const seedLesson = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected...");

    // Remove any existing lesson with the same title
    await Lesson.deleteMany({ title: "TypeVenture - Introduction" });
    console.log("🧹 Cleared old 'TypeVenture - Introduction' lesson");

    // Insert new lesson
    await Lesson.create(lessonData);
    console.log("📘 Successfully seeded 'TypeVenture - Introduction' lesson!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding lesson:", error);
    process.exit(1);
  }
};

seedLesson();
