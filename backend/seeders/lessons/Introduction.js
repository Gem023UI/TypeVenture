import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "../../models/lessons.js";

dotenv.config({ path: "./.env" });

const lessonData = {
  title: "TypeVenture - Introduction",
  sourceUrl: "",
  category: "trial",
  difficultyRank: 0,
  content: {
    introduction: `Typography is an important element of visual graphic design because it
allows the readers to understand a complex context with the help of it. It involves
choosing fonts and arranging letters that will match the theme of information
that you want your readers to understand. Typography encompasses the craft
of arranging letters and phrases in a visually appealing and legible format. It
serves as a tool to strengthen the meaning of text, with different fonts, colors,
and layouts emphasizing emotions and messages. It entails creating,
formatting, and arranging language to create clarity, impact, and readability. It
is not merely a textual element but also conveys messages and emotions
aligned with the design's context.

Despite its significance, many design students encounter challenges in
applying typographic principles effectively. These difficulties often stem from
limited exposure to practical applications, insufficient feedback mechanisms,
and a lack of engaging instructional approaches. As the design industry
continues to evolve alongside digital technologies, the need for innovative and
effective typography education becomes increasingly vital. However, the
number of studies that explore the combination of gamification and serious
games with augmented reality and examine its use in animation and visual
graphic design remains small. Therefore, there is a clear need for more studies
to be conducted to better comprehend the impact that the combination of
typography learning and gamification has in the educational domain, particularly
in the field of design. (Lampropoulos, G., 2023)

Traditional teaching methods are employed in most of our country's
educational institutions. In this manner, teachers demonstrate the concept of
the lesson using chalk and a chalkboard or by using assistance materials such
as lessons printed on paper and PowerPoint presentations. (Dr. Meghana N.
2022). Studies have further examined how motivation affects students’
performance in various contexts, including traditional learning as well as
gamified learning. The results of these studies reveal that learning motivation is
a vital element in all learning environments, as it contributes to effective learning
and to achieving better learning outcomes. Hence, adopting approaches and
techniques that increase students’ learning motivation is encouraged.
(Lampropoulos, G., 2023)

In the Philippines, the growing creative industry underscores the need for
design students, particularly those in technical vocational programs, to acquire
strong and industry-relevant typography skills. Yet, the education system faces
difficulties in bridging the gap between theoretical knowledge and practical
application. Traditional classroom instruction sometimes fails to actively engage
students or provide real-world scenarios that foster critical thinking and hands-on
learning experiences. This gap necessitates innovative approaches to
teaching typography that can promote active learning and better prepare
students for their future careers in graphic design and animation. Furthermore,
there are few studies in the Philippine context evaluating how such tools
compare to traditional instruction in terms of learning outcomes and design
quality.

In programs such as the Bachelor in Technical-Vocational Teacher
Education (BTVTEd) major in Visual Graphic Design and Animation at Rizal
Technological University, proficiency in typography is expected by the time
students reach their second year, particularly during the first semester of TLE.
However, many students at this level struggle to apply core typographic
principles such as contrast, spacing, alignment, hierarchy, and font pairing,
often resulting in poor design output. This difficulty can be attributed to the
abstract nature of typography, the evolving design trends, and students’ limited
familiarity with professional software tools (Balakrishnan & Umar, 2023). As
digital natives, students tend to learn better through interaction, feedback, and
engagement, which are often lacking in traditional teaching methods. Thus,
there is a need for an instructional approach that bridges theory and practice
while catering to modern learning preferences.

To address these challenges, the integration of technology-enhanced
pedagogies, such as gamification, presents a promising solution. Gamification
is an educational approach that utilizes game mechanisms and elements and
applies them in non-game-related settings to actively engage and motivate
students. It involves incorporating game design elements like points, badges,
competitive challenges, and leaderboards into learning activities to boost
motivation and engagement among students. When applied to typography
instruction, gamified learning environments can create a more interactive and
enjoyable educational experience. This approach not only makes the learning
process more appealing but also encourages students to practice and refine
their typographic skills in a supportive, feedback-rich environment. (Ruiz,
Sanchez and Figueredo, 2024). When applied to subjects like typography,
gamification transforms abstract design concepts into tangible, trial-and-error-based
learning tasks that reinforce understanding in real time.

Previous studies show that when learning activities are combined with
games in the classroom, students’ motivation increases, improving their
performance and making them more engaged compared with traditional
methodologies (Silva et al., 2020). Recognizing the potential of gamified
learning, this study proposes the development of "TYPEVENTURE," a gamified
mobile application designed specifically to enhance typography skills among
Visual Graphic Design and Animation students at Rizal Technological
University. The project aims to identify the common challenges and learning
gaps faced by students in mastering typography principles and develop features
within the app that address these issues. By doing so, the study seeks to
improve student engagement, reinforce typographic concepts, and ultimately
elevate the quality of their design outputs. In this context, gamified learning
emerges as a promising strategy to enhance student engagement, support skill
development, and better prepare learners for industry demands. (Jayalath, J.,
Esichaikul. V. 2020).

According to Ghai and Tandon (2022), many students lack opportunities
to engage in context-sensitive typographic decision-making, particularly through
simulated, real-world design scenarios. As a result, learners may struggle to
transfer theoretical knowledge into practical, responsive applications.
Gamification adds game components to traditional instruction methods, creating
a gamified environment. It is used to track the progress and performance of
students on a much larger scale. Typeventure is a computer application that can
be accessed by students; it is a game that can motivate them in learning
typography because they will receive points after completing the challenges and
levels that this game has about typography. Aside from this motivation, students
have the freedom to explore the game. This freedom can motivate them
because they can learn and play the game at their own pace. In this way, we
can evaluate if these motivations or the Typeventure itself improve their learning
about typography more than learning it traditionally.

Gamification is the application of game design techniques and aspects
to non-game situations to influence behavior and increase motivation and
involvement in particular tasks. It involves adding game elements to
instructional content, marketing, or corporate procedures (Mohd et.al,2023). In
educational settings, gamification can transform traditional learning into an
interactive and motivating experience, potentially improving engagement,
knowledge retention, and skill development of students. Especially if they are
learning a complex topic like typography. Learning typography often presents
significant challenges for design students. Choi & Hyun (2024) highlight that
traditional subjective and intuitive judgments in graphic design often precede a
data-driven framework for font selection and pairing. Gamification has emerged
as a promising approach to enhance learning and engagement. Khoshnoodifar
et al. (2023) found that gamification significantly improved students’ attitudes
toward the difficulty of statistics learning and positively affected their cognitive
competency. This suggests that gamification can foster a more positive learning
environment and improve engagement, even if direct learning outcomes require
further refinement in design.  Choi & Hyun (2024) acknowledged that their study primarily focused on font pairs and triplets, not exploring more complex combinations of four or more fonts. This limitation suggests a gap in understanding how to effectively teach
and apply typography for intricate design projects that require more
sophisticated font relationships. While gamification has shown promise in
improving attitudes and engagement in other educational domains
(Khoshnoodifar et al., 2023), its specific application and effectiveness in
developing practical typographic proficiency among Visual Graphic Design
(VGD) and Animation students remains unexplored. 

This study aims to bridge
this gap by designing and evaluating a gamified typography application that the
students can utilize.  There is a need for a robust and standardized method to assess 
typographic proficiency. Utilizing an ISO-based evaluation framework will
provide a rigorous and objective measure of the gamified application’s impact
on students’ skills, moving beyond subjective assessments. Additionally, one
underexplored area in typography education is the integration of Gestalt's Rizal
Technological University College of Education 9 Principles into digital learning
tools. These principles—such as proximity, similarity, and figure-ground—could
enhance how students perceive and structure typographic elements, but they
are rarely incorporated into educational applications (Choi & Hyun, 2024).`,
    discussionOne: `The user will be first subjected to a series of quizzes and games to assess their prior knowledge about the concept and techniques in typography.`,
    discussionTwo: `Ace this Trial, Aspiring Designer!`,
  },
  gameNumber: 4,
};

const seedLesson = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB Connected...");

    await Lesson.deleteMany({ title: "TypeVenture - Introduction" });
    console.log("🧹 Cleared old 'TypeVenture - Introduction' lesson");

    await Lesson.create(lessonData);
    console.log("📘 Successfully seeded 'TypeVenture - Introduction' lesson!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding lesson:", error);
    process.exit(1);
  }
};

seedLesson();
