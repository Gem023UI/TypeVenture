import Typography from "../models/typography.js";

// Get typography challenges by lesson ID
export const getTypographyByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const challenges = await Typography.find({ lessonId }).sort({ difficulty: 1 });

    if (!challenges || challenges.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No typography challenges found for this lesson"
      });
    }

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    console.error("Error fetching typography challenges:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching typography challenges",
      error: error.message
    });
  }
};

// Get all typography challenges
export const getAllTypography = async (req, res) => {
  try {
    const challenges = await Typography.find().sort({ lessonId: 1, difficulty: 1 });

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    console.error("Error fetching all typography challenges:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching typography challenges",
      error: error.message
    });
  }
};