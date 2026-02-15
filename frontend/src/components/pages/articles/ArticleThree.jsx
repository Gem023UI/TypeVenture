import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./ArticleThree.css";

export default function ArticleThree() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <article className="article-three-wrapper">
        <div className="article-three-container">
          {/* Back Button */}
          <button 
            className="back-button"
            onClick={() => navigate('/articles')}
          >
            ← Back to Articles
          </button>

          {/* Article Header */}
          <header className="article-header">
            <h1 className="article-main-title">A Beginner's Guide to Kerning</h1>
            <p className="article-subtitle">
              Master the art of adjusting letter spacing to create visually balanced and professional typography. Learn why kerning matters, common problem letter pairs, and expert tips to kern like a designer.
            </p>
            <div className="article-meta">
              <span className="article-date">August 16, 2021</span>
              <span className="article-read-time">12 min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="article-featured-image">
            <img 
              src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
              alt="A Beginner's Guide to Kerning"
            />
          </div>

          {/* Article Content */}
          <div className="article-content">
            <section className="content-section">
              <p className="intro-text">
                Kerning involves adjusting your typography to look right rather than creating mathematically equal spacing. Type is a funny thing in that it can be a sort of optical illusion. If you were to typeset a word with exactly equal spacing between each letter, it wouldn't actually look evenly spaced.
              </p>
              <p>
                That's because letters have unique shapes, like puzzle pieces, and need to be fit together in a way that works best for each pair. It's important to note here that kerning is a visual exercise; it's about the perceived amount of space between letters rather than the actual distance between them.
              </p>
            </section>

            <section className="content-section">
              <h2>What Is Kerning?</h2>
              <p>
                Kerning is the process of adjusting the space between individual letter pairs to achieve visually pleasing and balanced typography. Unlike tracking, which adjusts spacing uniformly across all letters in a word or block of text, kerning focuses on the specific relationship between two adjacent characters.
              </p>
              <p>
                The goal of kerning is to create the appearance of equal spacing between letters, even though the actual measured distance may vary. This is necessary because different letter shapes interact differently with each other. For example, the space between "AV" naturally looks wider than "HI" due to their shapes, so kerning helps balance this visual disparity.
              </p>
            </section>

            <section className="content-section">
              <h2>Why Kerning Matters in Design</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Why Kerning Matters"
                />
              </div>
              <p>
                Kerning may seem like an unnecessary or unimportant detail, but adding it as a quick extra step at the end of your design workflow can make a big difference in helping your typography look polished. Good kerning enhances readability and professionalism, while poor kerning can make your design look amateurish.
              </p>
              <p>
                Plus, kerning mistakes can sometimes make words hard to read, or even spell out something you didn't intend. When two letters get squished together, like "r" and "n" becoming an "m", it can completely change the meaning of your text. This is why attention to kerning detail is crucial for clear communication.
              </p>
              
              <h3>Where Kerning Makes the Most Impact</h3>
              <p>
                It's not necessary to spend your time kerning body text. Any spacing issues between letters won't be visible at sizes like 10 or 12 points. Where kerning makes the most difference is for large, highly visible text like:
              </p>
              <ul>
                <li><strong>Headlines and titles</strong> — Large display type where spacing is most noticeable</li>
                <li><strong>Logos and branding</strong> — Critical for professional brand identity</li>
                <li><strong>Hero images with text</strong> — Banner text that needs to make an impact</li>
                <li><strong>Posters and signage</strong> — Any large-format typography</li>
                <li><strong>Social media graphics</strong> — Text that needs to stand out at a glance</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Kerning vs. Tracking vs. Leading</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Kerning vs Tracking vs Leading"
                />
              </div>
              <p>
                Understanding the difference between these three typographic spacing concepts is essential for mastering typography:
              </p>
              
              <h3>Kerning</h3>
              <p>
                Kerning adjusts the space between two specific letters. It's a micro-level adjustment that addresses individual letter pair relationships. For example, you might reduce the space between "T" and "o" because the shape of the "T" creates natural empty space above the "o".
              </p>
              
              <h3>Tracking</h3>
              <p>
                Tracking (also called letter-spacing) adjusts the spacing uniformly across a range of letters or an entire word. It's a macro-level adjustment that affects all characters equally. Tracking is useful for creating different moods or fitting text into a specific space.
              </p>
              <p>
                However, tracking adjusts space equally through a whole word, while kerning only adjusts the distance between two letters. Both are important, but they serve different purposes in typography.
              </p>
              
              <h3>Leading</h3>
              <p>
                Leading (pronounced "ledding") refers to the vertical space between lines of text. It's measured from the baseline of one line to the baseline of the next. Proper leading improves readability by giving the reader's eye enough space to move comfortably from one line to the next.
              </p>
            </section>

            <section className="content-section">
              <h2>Common Problem Letter Pairs</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Problem Letter Pairs"
                />
              </div>
              <p>
                Certain letter combinations are notorious for creating spacing issues. Here are the most common problematic pairs to watch out for:
              </p>
              
              <h3>Capital Letters with Vowels</h3>
              <ul className="problem-pairs-list">
                <li><strong>AV, AW, AY</strong> — The diagonal stroke of A creates space that needs tightening</li>
                <li><strong>TA, Te, To, Tu</strong> — The T's crossbar creates excessive space</li>
                <li><strong>VA, Vo, Ve</strong> — Similar issues with diagonal strokes</li>
                <li><strong>WA, We, Wo</strong> — The W's angles create awkward spacing</li>
                <li><strong>YA, Yo</strong> — The Y's diagonal creates natural gaps</li>
              </ul>
              
              <h3>Letter Combinations with F</h3>
              <ul className="problem-pairs-list">
                <li><strong>FA, Fe, Fo</strong> — The F's crossbar extends over adjacent letters</li>
                <li><strong>FF</strong> — Double F combinations need careful spacing</li>
              </ul>
              
              <h3>Punctuation Pairs</h3>
              <ul className="problem-pairs-list">
                <li><strong>Quotes and apostrophes</strong> — Often need tightening around letters</li>
                <li><strong>Period and comma combinations</strong> — Spacing with capital letters</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Metrics vs. Optical Kerning</h2>
              <p>
                Many design programs offer different kerning settings to choose from. Understanding these options helps you make informed decisions about your typography:
              </p>
              
              <h3>Metrics Kerning</h3>
              <p>
                Metrics uses the built-in kerning settings that the typeface designer specified in the font file. These are carefully crafted kerning pairs that the font creator deemed optimal for their typeface. This is usually the best starting point for most projects.
              </p>
              <p>
                Fonts are created with information already built into them—it's how they know how to present themselves and what the spacing between the letters should look like. Professional typefaces often include hundreds of kerning pairs designed specifically for common letter combinations.
              </p>
              
              <h3>Optical Kerning</h3>
              <p>
                Optical kerning discards the font's built-in settings and re-spaces the type according to an algorithm. Your design program analyzes the shapes of adjacent characters and adjusts spacing based on what it perceives would be more pleasing to the eye.
              </p>
              <p>
                When you're using a serif or sans-serif font, just switching to optical kerning can often make a big difference. It's your design program's way of trying to make sense of what's there and changing the spacing to something it thinks will be more visually appealing.
              </p>
              <p>
                However, optical kerning doesn't always get it quite right, and you'll still likely find yourself making manual adjustments—especially if there's an "AV" combination involved.
              </p>
              
              <h3>Manual Kerning</h3>
              <p>
                Manual kerning is always best for important, highly visible text. This involves adjusting the space between specific letter pairs by hand, using your eye to judge the perfect spacing. While time-consuming, manual kerning gives you complete control over your typography.
              </p>
            </section>

            <section className="content-section">
              <h2>How to Kern Like a Designer</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="How to Kern"
                />
              </div>
              <p>
                Here are nine expert tips to help you kern like a professional designer:
              </p>
              
              <h3>1. Start with Metrics or Optical Kerning</h3>
              <p>
                Always begin with your software's automatic kerning options. This gives you a solid foundation to build upon. For most well-designed professional fonts, metrics kerning is your best bet. For decorative or display fonts, optical kerning might work better.
              </p>
              
              <h3>2. Zoom In</h3>
              <p>
                Work at a large zoom level when kerning. This allows you to see the subtle spacing differences more clearly. Aim for at least 200-400% zoom when making fine adjustments.
              </p>
              
              <h3>3. Think in Terms of Shapes</h3>
              <p>
                Stop seeing letters as letters and start seeing them as abstract shapes. This helps you focus on the visual weight and balance rather than getting distracted by reading the text. Squint your eyes or blur your vision slightly to help see the overall spacing pattern.
              </p>
              
              <h3>4. Look at Negative Space</h3>
              <p>
                Pay attention to the white space between letters rather than the letters themselves. The goal is to create visually equal amounts of negative space, not mathematically equal measurements. Imagine filling the spaces between letters with water—each space should hold roughly the same amount.
              </p>
              
              <h3>5. Kern Upside Down</h3>
              <p>
                Turn your text upside down to remove the distraction of readability. This forces you to focus purely on the visual spacing and shapes, making it easier to spot inconsistencies.
              </p>
              
              <h3>6. Work from Larger to Smaller Letters</h3>
              <p>
                Start by kerning the largest, most problematic letter pairs first, then work your way down to smaller adjustments. This creates a hierarchy of spacing that flows naturally.
              </p>
              
              <h3>7. Take Breaks</h3>
              <p>
                Your eyes can get tired and lose perspective when staring at letter spacing for too long. Take regular breaks and come back with fresh eyes. You'll often spot issues you missed before.
              </p>
              
              <h3>8. Print It Out</h3>
              <p>
                Nothing beats seeing your typography in its final form. Print your design (or view it on the device where it will be seen) to check how the kerning looks in context. Screen kerning can look different than print kerning.
              </p>
              
              <h3>9. Study Good Typography</h3>
              <p>
                The more you study well-kerned typography, the better you'll become at recognizing good spacing. Look at professional design work, magazines, posters, and branding to train your eye.
              </p>
            </section>

            <section className="content-section">
              <h2>Kerning Tools and Resources</h2>
              <p>
                Different design tools handle kerning in different ways. Here's what you need to know:
              </p>
              
              <h3>Adobe Creative Suite</h3>
              <p>
                Programs like Photoshop, Illustrator, and InDesign offer robust kerning controls. Access the Character panel to adjust kerning manually using the metrics field between letters. Hold Alt/Option and use arrow keys for quick adjustments.
              </p>
              
              <h3>Web Typography</h3>
              <p>
                Kerning has generally been considered something that graphic and print designers do for projects where the typography is static. But since the Internet came along, type-savvy web designers wanted to kern, too. And now there are tools to help them do that.
              </p>
              <p>
                CSS offers letter-spacing properties, and tools like Kerning.js allow you to manipulate your web typography's kerning more precisely. Modern web fonts also come with built-in kerning data that browsers can utilize.
              </p>
              
              <h3>Canva and Other Tools</h3>
              <p>
                While Canva and similar platforms have introduced kerning features, they typically offer automatic kerning rather than manual control. This is fine for most projects, but for professional work requiring perfect spacing, dedicated design software is recommended.
              </p>
            </section>

            <section className="content-section">
              <h2>Common Kerning Mistakes to Avoid</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Common Kerning Mistakes"
                />
              </div>
              <p>
                Even experienced designers can fall into these common kerning traps:
              </p>
              <ul>
                <li><strong>Over-kerning</strong> — Making adjustments where they're not needed, creating an unnatural look</li>
                <li><strong>Inconsistent spacing</strong> — Kerning some pairs but missing others in the same word</li>
                <li><strong>Ignoring the overall rhythm</strong> — Focusing too much on individual pairs without considering the whole word</li>
                <li><strong>Using tracking when you need kerning</strong> — Applying uniform spacing when specific pairs need attention</li>
                <li><strong>Kerning body copy</strong> — Wasting time on small text where it won't be visible</li>
                <li><strong>Relying solely on automatic kerning</strong> — Not checking important display text manually</li>
                <li><strong>Kerning before finalizing the font</strong> — Making adjustments before you've locked in your typeface choice</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Practice Makes Perfect</h2>
              <p>
                Like any design skill, kerning improves with practice. Here are some exercises to help you develop your kerning eye:
              </p>
              <ul>
                <li><strong>Kern the Alphabet</strong> — Set the alphabet in a large display font and practice kerning each letter pair</li>
                <li><strong>Recreate Logos</strong> — Find well-designed logos and try to recreate their kerning</li>
                <li><strong>Before and After</strong> — Compare unkerned and kerned versions of the same text</li>
                <li><strong>Play Kerning Games</strong> — Try online games like Kerntype that test your kerning skills</li>
                <li><strong>Critique Your Work</strong> — Go back to old projects and see what you'd kern differently now</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Conclusion</h2>
              <p>
                Kerning is one of those typographic details that separates amateur work from professional design. While it might seem tedious at first, developing a good eye for kerning will dramatically improve the quality of your typography.
              </p>
              <p>
                Remember that kerning is a visual exercise, not a mathematical one. Trust your eye, take your time with important display text, and don't be afraid to make bold adjustments when needed. The goal is always to create visually balanced, readable, and beautiful typography.
              </p>
              <p>
                Start by using your software's automatic kerning options, but always check important text manually. Pay special attention to common problem pairs like AV, TA, and WA. With practice and patience, you'll develop an instinct for spotting and fixing kerning issues.
              </p>
              <p>
                Typography is about communication, and kerning is one of the tools that helps your message come through clearly and beautifully. Master this skill, and your designs will immediately look more polished and professional.
              </p>
            </section>
          </div>

          {/* Article Footer */}
          <footer className="article-footer">
            <button 
              className="back-to-articles-btn"
              onClick={() => navigate('/articles')}
            >
              ← Back to All Articles
            </button>
          </footer>
        </div>
      </article>
    </MainLayout>
  );
}