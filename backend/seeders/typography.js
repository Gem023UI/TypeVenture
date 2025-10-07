// seeders/typographySeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Typography from "../models/typography.js";

dotenv.config();

const lessonId = "68e3fa7fe6981fcb7ccf5ef7";

const typographyChallenges = [
  // ========== BEGINNER CHALLENGES ==========
  {
    lessonId: lessonId,
    prompt: "Create a mobile app toolbar title that is clear and readable",
    scenario: "app-bar-title",
    displayText: "My Messages",
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "navigational",
      materialRole: "title-large"
    },
    adjustableProperties: [
      {
        property: 'fontSize',
        label: 'Font Size',
        unit: 'px',
        optimal: 22,
        acceptable: { min: 20, max: 24 },
        sliderRange: { min: 14, max: 32, step: 1 }
      },
      {
        property: 'letterSpacing',
        label: 'Letter Spacing',
        unit: 'px',
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -2, max: 3, step: 0.1 }
      },
      {
        property: 'lineHeight',
        label: 'Line Height',
        unit: '',
        optimal: 1.27,
        acceptable: { min: 1.2, max: 1.35 },
        sliderRange: { min: 1, max: 2, step: 0.05 }
      }
    ],
    difficulty: 'beginner',
    hint: "Material 3 title-large role: Used for prominent titles in app bars. Should be immediately readable with moderate size.",
    learningObjective: "Understanding Material Design's title role for navigation hierarchy"
  },

  // ========== INTERMEDIATE CHALLENGES ==========
  {
    lessonId: lessonId,
    prompt: "Style a list item with supporting text maintaining visual hierarchy",
    scenario: "list-item-multi",
    displayText: "Jane Cooper\nYou: Thanks for the update! See you tomorrow.",
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "informational",
      materialRole: "body-large-and-body-medium"
    },
    adjustableProperties: [
      {
        property: 'fontSize',
        label: 'Primary Text Size',
        unit: 'px',
        optimal: 16,
        acceptable: { min: 15, max: 17 },
        sliderRange: { min: 12, max: 22, step: 0.5 }
      },
      {
        property: 'letterSpacing',
        label: 'Letter Spacing',
        unit: 'px',
        optimal: 0.15,
        acceptable: { min: 0, max: 0.4 },
        sliderRange: { min: -1, max: 2, step: 0.1 }
      },
      {
        property: 'lineHeight',
        label: 'Line Height',
        unit: '',
        optimal: 1.5,
        acceptable: { min: 1.4, max: 1.65 },
        sliderRange: { min: 1.1, max: 2.2, step: 0.05 }
      }
    ],
    difficulty: 'intermediate',
    hint: "Material 3 combines body-large for primary text and body-medium for secondary. Proper line height creates visual separation between lines.",
    learningObjective: "Managing multi-line content hierarchy using combined type roles"
  },

  // ========== ADVANCED CHALLENGES ==========
  {
    lessonId: lessonId,
    prompt: "Design a complex card layout balancing multiple type roles cohesively",
    scenario: "complex-card",
    displayText: "Featured Article\nUnderstanding Material Design 3\nLearn how the latest Material Design system brings harmony between expressiveness and utility in modern interfaces.",
    designContext: {
      readingDistance: "medium",
      targetAudience: "general",
      purpose: "composite",
      materialRole: "label-title-body-combination"
    },
    adjustableProperties: [
      {
        property: 'fontSize',
        label: 'Base Font Size',
        unit: 'px',
        optimal: 16,
        acceptable: { min: 14, max: 18 },
        sliderRange: { min: 12, max: 24, step: 0.5 }
      },
      {
        property: 'letterSpacing',
        label: 'Letter Spacing',
        unit: 'px',
        optimal: 0.15,
        acceptable: { min: 0, max: 0.4 },
        sliderRange: { min: -1, max: 2, step: 0.1 }
      },
      {
        property: 'lineHeight',
        label: 'Line Height',
        unit: '',
        optimal: 1.5,
        acceptable: { min: 1.4, max: 1.7 },
        sliderRange: { min: 1.1, max: 2.3, step: 0.05 }
      },
      {
        property: 'wordSpacing',
        label: 'Word Spacing',
        unit: 'px',
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -3, max: 4, step: 0.25 }
      }
    ],
    difficulty: 'advanced',
    hint: "Material 3 combines multiple roles: label-medium (overline), title-large (headline), body-medium (description). Each must be distinct yet harmonious, creating clear content hierarchy.",
    learningObjective: "Orchestrating multiple Material Design type roles in a single component for optimal information architecture"
  }
];

// Seeder function
async function seedTypography() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/your-database-name');
    
    console.log('Connected to MongoDB');
    
    // Clear existing typography challenges for this lesson
    await Typography.deleteMany({ lessonId: lessonId });
    console.log('Cleared existing typography challenges');
    
    // Insert new challenges
    const result = await Typography.insertMany(typographyChallenges);
    console.log(`Successfully seeded ${result.length} typography challenges`);
    console.log('Breakdown:');
    console.log(`  - Beginner: ${typographyChallenges.filter(c => c.difficulty === 'beginner').length}`);
    console.log(`  - Intermediate: ${typographyChallenges.filter(c => c.difficulty === 'intermediate').length}`);
    console.log(`  - Advanced: ${typographyChallenges.filter(c => c.difficulty === 'advanced').length}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding typography challenges:', error);
    process.exit(1);
  }
}

// Run seeder
seedTypography();

export { typographyChallenges };