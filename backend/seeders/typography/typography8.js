import mongoose from "mongoose";
import dotenv from "dotenv";
import Typography from "../../models/typography.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const lessonId = "68e3fa7fe6981fcb7ccf5ef7";

const exercises = [
  // ========== BEGINNER CHALLENGE ==========
  {
    _id: new mongoose.Types.ObjectId("68e3fa7fe6981fcb7ccf5f06"),
    lessonId: lessonId,
    prompt: "Create a distinguishable logo name",
    scenario: "blog-title",
    displayText: "Facebook",
    adjustableProperties: [
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc2"),
        property: "fontFamily",
        label: "Typeface",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif", "Open Sans, sans-serif"],
          correctAnswer: "Open Sans, sans-serif",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc3"),
        property: "fontSize",
        label: "Font Size",
        optimal: 22,
        acceptable: { min: 20, max: 24 },
        sliderRange: { min: 12, max: 32, step: 1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc4"),
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["#000000", "#FFFFFF", "#1E40AF", "#065F46"],
          correctAnswer: "#000000",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc5"),
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -2, max: 4, step: 0.1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc6"),
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.27,
        acceptable: { min: 1.2, max: 1.35 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc7"),
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 0,
        acceptable: { min: -2, max: 2 },
        sliderRange: { min: -5, max: 10, step: 0.5, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc8"),
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["left", "center", "right"],
          correctAnswer: "center",
          unit: ""
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "navigational"
    },
    difficulty: "beginner",
    createdAt: new Date("2025-10-08T15:24:15.172Z")
  },

  // ========== INTERMEDIATE CHALLENGE ==========
  {
    _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bc9"),
    lessonId: lessonId,
    prompt: "Style a list item with supporting text maintaining visual hierarchy",
    scenario: "list-item-multi",
    displayText: "Things to Buy:\nVegetables\nCanned Goods\nMeat",
    adjustableProperties: [
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bca"),
        property: "fontFamily",
        label: "Typeface",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif", "Open Sans, sans-serif"],
          correctAnswer: "Arial, sans-serif",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bcb"),
        property: "fontSize",
        label: "Font Size",
        optimal: 16,
        acceptable: { min: 14, max: 18 },
        sliderRange: { min: 10, max: 24, step: 1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bcc"),
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["#000000", "#4B5563", "#6B7280", "#9CA3AF"],
          correctAnswer: "#000000",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bcd"),
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -2, max: 4, step: 0.1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bce"),
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.5,
        acceptable: { min: 1.4, max: 1.6 },
        sliderRange: { min: 1.0, max: 2.0, step: 0.05, unit: "" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bcf"),
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 0,
        acceptable: { min: -2, max: 2 },
        sliderRange: { min: -5, max: 10, step: 0.5, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd0"),
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["left", "center", "right"],
          correctAnswer: "left",
          unit: ""
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "intermediate",
    createdAt: new Date("2025-10-08T15:24:15.176Z")
  },

  // ========== ADVANCED CHALLENGE ==========
  {
    _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd1"),
    lessonId: lessonId,
    prompt: "Arrange a simple tabloid headline",
    scenario: "research-front-page",
    displayText: "NAGBABAGA!\nImpeachment Complain\nKontra Marcos,\nInihain na!",
    adjustableProperties: [
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd2"),
        property: "fontFamily",
        label: "Typeface",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["Roboto, sans-serif", "Arial, sans-serif", "Helvetica, sans-serif", "Open Sans, sans-serif"],
          correctAnswer: "Arial, sans-serif",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd3"),
        property: "fontSize",
        label: "Font Size",
        optimal: 18,
        acceptable: { min: 16, max: 20 },
        sliderRange: { min: 12, max: 28, step: 1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd4"),
        property: "color",
        label: "Text Color",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["#000000", "#1F2937", "#374151", "#4B5563"],
          correctAnswer: "#000000",
          unit: ""
        }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd5"),
        property: "letterSpacing",
        label: "Letter Spacing",
        optimal: 0.15,
        acceptable: { min: 0, max: 0.5 },
        sliderRange: { min: -2, max: 4, step: 0.1, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd6"),
        property: "lineHeight",
        label: "Line Height",
        optimal: 1.6,
        acceptable: { min: 1.5, max: 1.75 },
        sliderRange: { min: 1.0, max: 2.5, step: 0.05, unit: "" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd7"),
        property: "wordSpacing",
        label: "Word Spacing",
        optimal: 0,
        acceptable: { min: -2, max: 2 },
        sliderRange: { min: -5, max: 10, step: 0.5, unit: "px" }
      },
      {
        _id: new mongoose.Types.ObjectId("68e6821f8930c5c2c6832bd8"),
        property: "textAlign",
        label: "Text Alignment",
        optimal: null,
        acceptable: { min: null, max: null },
        sliderRange: {
          min: 0,
          max: 0,
          step: 1,
          options: ["left", "center", "right"],
          correctAnswer: "left",
          unit: ""
        }
      }
    ],
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational"
    },
    difficulty: "advanced",
    createdAt: new Date("2025-10-08T15:24:15.182Z")
  }
];

// Seeder function
async function seedExercises() {
  try {
    await mongoose.connect(process.env.DB_URI);
    
    console.log('Connected to MongoDB');
    
    await Typography.deleteMany({ lessonId: lessonId });
    console.log('Cleared existing exercises');
    
    const result = await Typography.insertMany(exercises);
    console.log(`Successfully seeded ${result.length} exercises`);
    console.log('Breakdown:');
    console.log(`  - Beginner: ${exercises.filter(e => e.difficulty === 'beginner').length}`);
    console.log(`  - Intermediate: ${exercises.filter(e => e.difficulty === 'intermediate').length}`);
    console.log(`  - Advanced: ${exercises.filter(e => e.difficulty === 'advanced').length}`);
    
    await mongoose.disconnect();
    console.log('Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding exercises:', error);
    process.exit(1);
  }
}

seedExercises();

export { exercises };