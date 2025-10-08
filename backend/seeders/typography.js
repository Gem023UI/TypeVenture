// seeders/typographySeedComplete.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Typography from "../models/typography.js";

dotenv.config();

const lessonId = "68e3fa7fe6981fcb7ccf5ef7";

const typographyChallenges = [
  // ========== BEGINNER CHALLENGE ==========
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
        property: 'fontFamily',
        label: 'Font Family',
        unit: '',
        options: ['Roboto, sans-serif', 'Arial, sans-serif', 'Georgia, serif'],
        correctAnswer: 'Roboto, sans-serif',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
      },
      {
        property: 'fontSize',
        label: 'Font Size',
        unit: 'px',
        optimal: 22,
        acceptable: { min: 20, max: 24 },
        sliderRange: { min: 14, max: 32, step: 1 }
      },
      {
        property: 'color',
        label: 'Font Color',
        unit: '',
        options: ['#000000', '#1E40AF', '#065F46'],
        correctAnswer: '#000000',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
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
      },
      {
        property: 'wordSpacing',
        label: 'Word Spacing',
        unit: 'px',
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -3, max: 4, step: 0.25 }
      },
      {
        property: 'textAlign',
        label: 'Text Alignment',
        unit: '',
        optimal: 1.2,
        acceptable: { min: 1, max: 1.5 },
        sliderRange: { min: 1, max: 2, step: 0.1 }
      }
    ],
    difficulty: 'beginner',
    hint: "Material 3 title-large role uses Roboto font with black color for maximum readability.",
    learningObjective: "Understanding Material Design's title role for navigation hierarchy"
  },

  // ========== INTERMEDIATE CHALLENGE ==========
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
        property: 'fontFamily',
        label: 'Font Family',
        unit: '',
        options: ['Roboto, sans-serif', 'Times New Roman, serif', 'Courier New, monospace'],
        correctAnswer: 'Roboto, sans-serif',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
      },
      {
        property: 'fontSize',
        label: 'Primary Text Size',
        unit: 'px',
        optimal: 16,
        acceptable: { min: 15, max: 17 },
        sliderRange: { min: 12, max: 22, step: 0.5 }
      },
      {
        property: 'color',
        label: 'Font Color',
        unit: '',
        options: ['#000000', '#6B7280', '#1E40AF'],
        correctAnswer: '#000000',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
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
      },
      {
        property: 'wordSpacing',
        label: 'Word Spacing',
        unit: 'px',
        optimal: 0,
        acceptable: { min: -0.5, max: 0.5 },
        sliderRange: { min: -3, max: 4, step: 0.25 }
      },
      {
        property: 'textAlign',
        label: 'Text Alignment',
        unit: '',
        optimal: 1.2,
        acceptable: { min: 1, max: 1.5 },
        sliderRange: { min: 1, max: 2, step: 0.1 }
      }
    ],
    difficulty: 'intermediate',
    hint: "Material 3 body text uses Roboto with standard black for primary content in lists.",
    learningObjective: "Managing multi-line content hierarchy using combined type roles"
  },

  // ========== ADVANCED CHALLENGE ==========
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
        property: 'fontFamily',
        label: 'Font Family',
        unit: '',
        options: ['Roboto, sans-serif', 'Open Sans, sans-serif', 'Lato, sans-serif'],
        correctAnswer: 'Roboto, sans-serif',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
      },
      {
        property: 'fontSize',
        label: 'Base Font Size',
        unit: 'px',
        optimal: 16,
        acceptable: { min: 14, max: 18 },
        sliderRange: { min: 12, max: 24, step: 0.5 }
      },
      {
        property: 'color',
        label: 'Font Color',
        unit: '',
        options: ['#000000', '#374151', '#4B5563'],
        correctAnswer: '#000000',
        optimal: null,
        acceptable: { min: 0, max: 0 },
        sliderRange: { min: 0, max: 0, step: 0 }
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
      },
      {
        property: 'textAlign',
        label: 'Text Alignment',
        unit: '',
        optimal: 1.2,
        acceptable: { min: 1, max: 1.5 },
        sliderRange: { min: 1, max: 2, step: 0.1 }
      }
    ],
    difficulty: 'advanced',
    hint: "Material 3 uses consistent Roboto font family with pure black for optimal contrast in complex layouts.",
    learningObjective: "Orchestrating multiple Material Design type roles in a single component for optimal information architecture"
  }
];

// Seeder function
async function seedTypography() {
  try {
    await mongoose.connect(process.env.DB_URI);
    
    console.log('Connected to MongoDB');
    
    await Typography.deleteMany({ lessonId: lessonId });
    console.log('Cleared existing typography challenges');
    
    const result = await Typography.insertMany(typographyChallenges);
    console.log(`Successfully seeded ${result.length} typography challenges`);
    console.log('Breakdown:');
    console.log(`  - Beginner: ${typographyChallenges.filter(c => c.difficulty === 'beginner').length}`);
    console.log(`  - Intermediate: ${typographyChallenges.filter(c => c.difficulty === 'intermediate').length}`);
    console.log(`  - Advanced: ${typographyChallenges.filter(c => c.difficulty === 'advanced').length}`);
    console.log('Database connection closed');
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding typography challenges:', error);
    process.exit(1);
  }
}

seedTypography();

export { typographyChallenges };