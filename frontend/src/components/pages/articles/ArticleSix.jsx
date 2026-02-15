import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./ArticleSix.css";

export default function ArticleSix() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <article className="article-six-wrapper">
        <div className="article-six-container">
          {/* Back Button */}
          <button 
            className="back-button"
            onClick={() => navigate('/articles')}
          >
            ← Back to Articles
          </button>

          {/* Article Header */}
          <header className="article-header">
            <h1 className="article-main-title">The UX Designer's Guide to Typography</h1>
            <p className="article-subtitle">
              Typography can make or break the success of a site or app. Discover essential typography principles, terminology, and best practices that will help you create user-friendly designs with optimal readability and accessibility.
            </p>
            <div className="article-meta">
              <span className="article-author">By Molly Fitz-Patrick</span>
              <span className="article-date">January 24, 2026</span>
              <span className="article-read-time">14 min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="article-featured-image">
            <img 
              src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
              alt="UX Designer's Guide to Typography"
            />
          </div>

          {/* Article Content */}
          <div className="article-content">
            <section className="content-section">
              <p className="intro-text">
                Typography is a cornerstone of UX design; more than 90% of online information is in text form. But the design discipline of typography is so much more than choosing an attractive font for your website or app. There are a number of elements to consider when practicing typography.
              </p>
              <p>
                Effective typography enhances UX, optimizes usability, catches users' attention and has the potential to increase conversion rates. This guide will help you become more proficient in this discipline so that you can create user-friendly designs that truly resonate with your audience.
              </p>
            </section>

            <section className="content-section">
              <h2>What Exactly is Typography?</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Typography Definition"
                />
              </div>
              <p>
                Typography is a design discipline that involves the use of typefaces and the organization of those typefaces to create readable, usable and ideally, user-friendly interfaces or experiences. It encompasses everything from font selection to spacing, alignment, and hierarchy.
              </p>
              <p>
                There is some confusion around typographic terminology, so understanding the core concepts is essential. This specific collection of terms is particularly relevant to you as a UX designer, helping you communicate effectively with developers, stakeholders, and other designers.
              </p>
            </section>

            <section className="content-section">
              <h2>Essential Typography Terms</h2>
              <p>
                Before diving into principles and best practices, it's crucial to understand the language of typography. These terms form the foundation of typographic design and will help you make informed decisions throughout your design process.
              </p>
              
              <h3>Typeface vs. Font</h3>
              <p>
                A <strong>typeface</strong> (also known as a font family) comes from physical print and refers to the faces of physical letter blocks. A typeface is composed of fonts—much like an album is composed of tracks or a book is composed of chapters. A typeface includes multiple font weights, and its style is shared across all characters, numbers and symbols. Arial, Times New Roman and, yes, even Comic Sans are all typefaces.
              </p>
              <p>
                <strong>Font</strong> refers to specific weights within a typeface. You choose a typeface; you use a font. If you were to select Georgia as your typeface, then Georgia bold, italic and regular would be your fonts. In other words, a font is the distinct, stylized characteristics found within a typeface.
              </p>
              
              <h3>Basic Typography Anatomy</h3>
              <ul className="typography-terms-list">
                <li><strong>Character:</strong> An individual element, most commonly a single letter, number or punctuation mark.</li>
                <li><strong>Baseline:</strong> The invisible line on which all letters rest. You can create a grid using the baseline of your chosen type to create a harmonious layout.</li>
                <li><strong>X-height:</strong> The distance between the baseline and the height of the lowercase letter "x". If you are working with a font that has an unusually large (or small) x-height, it could impact the entire interface.</li>
                <li><strong>Stroke:</strong> A straight or curved line that creates the principal part of a letter.</li>
                <li><strong>Ascender and Descender:</strong> The vertical stroke that extends upward beyond the x-height and downward beyond the baseline, respectively.</li>
              </ul>
              
              <h3>Serif and Sans Serif</h3>
              <p>
                <strong>Serif</strong> refers to the stroke, or foot-like element, connected to the end of some typefaces' main strokes. Serif fonts are often more readable, as the tiny "feet" guide the readers' eyes to the next character. However, due to their tiny size, they may not always render well on screens.
              </p>
              <p>
                <strong>Sans serif</strong> is a typeface without strokes or any extra elements at the bottom of a letter. Owing to the lower resolution of screens, sans serifs are often preferred for digital interfaces. As technology improves and screens come equipped with better resolutions, this may no longer be a deciding factor in choosing a font.
              </p>
              
              <h3>Spacing and Alignment</h3>
              <ul className="typography-terms-list">
                <li><strong>Letter spacing (or tracking):</strong> The distance between the widest point of each character. Tracking specifically refers to the uniform increase or decrease in the horizontal space between characters.</li>
                <li><strong>White space:</strong> Also known as negative space, is the area between elements in a design composition. If the white space is not balanced, copy will be hard to read.</li>
                <li><strong>Alignment:</strong> Refers to how text is positioned. There are 4 main alignments: left, right, centered and justified. Alignment helps designers to create a coherent composition.</li>
              </ul>
              
              <h3>Visual Hierarchy</h3>
              <p>
                <strong>Hierarchy</strong> is the principle of arranging elements according to importance. Creating a strong hierarchy is paramount to helping users identify where to look first. No matter the screen size, if an interface has multiple elements, it is important to guide the user towards the most important elements of the screen.
              </p>
              <p>
                Your choice of font, its weight, size, letter spacing, alignment and surrounding white space, along with other visual design elements, work together to create this hierarchy.
              </p>
            </section>

            <section className="content-section">
              <h2>Core Typography Principles for UX Design</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Typography Principles"
                />
              </div>
              <p>
                Here are some typography guidelines to keep in mind when designing your website or app for optimal user-friendliness. It's by no means an exhaustive list, but it provides a good starting point in your burgeoning typography practice.
              </p>
              
              <h3>1. Too Many Typefaces Hinder Good User Experience</h3>
              <p>
                Keep it simple! Too many typefaces can look sloppy and lead to confusion. It's best to stick to between two and three typefaces in design. Using multiple typefaces also adds to the size and loading time of applications.
              </p>
              <p>
                For optimizing the experience, use fonts that are likely to be available or installed at the users' end. This reduces loading times and ensures consistency across different devices and operating systems.
              </p>
              
              <h3>2. Choose Typefaces That Complement and Contrast</h3>
              <p>
                Your typefaces shouldn't be too similar; otherwise, their nuances will be lost. Create contrast by choosing one serif and one sans serif font. This contrast creates visual interest while maintaining clarity and readability.
              </p>
              <p>
                Good pairing involves fonts that share certain characteristics (like similar x-heights or proportions) but differ in key aspects (like serif vs. sans serif, or thick vs. thin strokes). This creates harmony without monotony.
              </p>
              
              <h3>3. Keep Readability, Legibility, and Accessibility Top of Mind</h3>
              <p>
                The text your typography creates needs to be understandable; otherwise, it defeats the purpose of communicating information through text. Consider your user, their environment and the medium with which they're engaging with your product.
              </p>
              <p>
                Color and contrast can make or break accessibility; pale yellow text placed on an orange background is going to be more difficult to read than the same yellow text on a navy-blue background. The prevalence of "dark mode" is a good example—it reduces the discomfort of looking at a bright screen and improves overall legibility and readability.
              </p>
              <p>
                Some studies suggest that serifs are not as accessible as sans-serifs, particularly for dyslexic users. The research, however, is inconclusive. To make sure your designs are accessible, always test them with real users.
              </p>
              
              <h3>4. Great Visual Hierarchy Improves UX</h3>
              <p>
                Type hierarchy for your app or site is crucial as it allows your users to quickly scan through information. Organize your content according to priority; the most important must be the most prominent and the least important should be smaller and unobtrusive.
              </p>
              <p>
                Size, weight and color are effective ways of creating visual hierarchy. When you're designing a page, you should begin with an H1, and each type style that follows should be beneath, from and beyond. As an added bonus, an effective hierarchy also improves SEO.
              </p>
              
              <h3>5. Make Your Typography Scalable</h3>
              <p>
                In your design work, you will be asked to create a website or app that works on both desktop and mobile. So, it's important to design your typography in a way that considers the user's experience on both platforms.
              </p>
              <p>
                You want your typography to scale well, no matter the screen size. Define a scale for your font and typefaces at the beginning of the design process. Remember, your scale guidelines should include different operating systems, as well as different platforms.
              </p>
              
              <h3>6. Enrich UX with Typography</h3>
              <p>
                Typography is part of the overall visual language you use to communicate with your users. Just like the visual elements of color, form and pattern, typography can set a mood, set a tone and present a product the way you want it perceived.
              </p>
              <p>
                For example, The New York Times uses calligraphy for its logo and a serif font for its headlines, evoking a classic, hard copy newspaper. Successful typography can make a statement and set a mood that resonates with your brand identity and target audience.
              </p>
              
              <h3>7. Test and Learn</h3>
              <p>
                As with any stage of the design process, it's vital to test and learn. Try out different typefaces and fonts, see how they work with one another and scale from one platform to the next.
              </p>
              <p>
                A nifty trick to test out a typeface is with the phrase <strong>"the quick brown fox jumps over the lazy dog"</strong> as it contains all the letters from the English alphabet. It's possible that your app or website may be translated into another language, so it's important to test for that outcome.
              </p>
              <p>
                You want to ensure that your typography design still works with diacritics (the accents or marks above, below or next to letters that indicate a particular pronunciation or emphasis) or different scripts. Through testing and learning, you can make the experience seamless for everyone!
              </p>
            </section>

            <section className="content-section">
              <h2>Common Typography Mistakes to Avoid</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Typography Mistakes"
                />
              </div>
              <p>
                Even experienced UX designers can fall into common typography traps. Being aware of these pitfalls will help you avoid them and create better user experiences.
              </p>
              <ul>
                <li><strong>Ignoring mobile readability:</strong> Typography that looks great on desktop may be illegible on mobile devices.</li>
                <li><strong>Poor color contrast:</strong> Insufficient contrast between text and background causes accessibility issues and strains users' eyes.</li>
                <li><strong>Inconsistent line length:</strong> Lines that are too long or too short make reading difficult and tiring.</li>
                <li><strong>Inadequate line height:</strong> Text that's too cramped or too spaced out disrupts reading flow.</li>
                <li><strong>Using too many font weights:</strong> Excessive variation in weights creates visual chaos rather than clear hierarchy.</li>
                <li><strong>Decorative fonts for body text:</strong> Save fancy fonts for headlines; body text needs maximum readability.</li>
                <li><strong>Justified text on screens:</strong> Justified alignment can create awkward spacing on digital displays.</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Typography in Different Contexts</h2>
              <p>
                Typography requirements vary significantly depending on where and how your design will be experienced. Understanding these contextual differences is crucial for creating effective user experiences.
              </p>
              
              <h3>Web Typography</h3>
              <p>
                Web typography must account for various screen sizes, resolutions, and user preferences. Web fonts have revolutionized online typography, allowing designers to use custom typefaces while ensuring consistent rendering across browsers.
              </p>
              <p>
                Consider loading times when selecting web fonts. Optimize font files and limit the number of font weights you load to maintain performance. Use font-display properties to control how fonts are loaded and displayed.
              </p>
              
              <h3>Mobile Typography</h3>
              <p>
                Mobile devices present unique challenges: smaller screens, varied viewing distances, and touch-based interaction. Fonts need to be legible at smaller sizes, and tap targets around text must be appropriately sized.
              </p>
              <p>
                Consider thumb zones and one-handed use when positioning text. Important information should be easily accessible without requiring awkward hand positions or excessive scrolling.
              </p>
              
              <h3>Print Typography</h3>
              <p>
                While digital design dominates today, understanding print typography provides valuable insights. Print offers higher resolution and more precise control over spacing and positioning than screens.
              </p>
              <p>
                Fonts that work beautifully in print may not translate well to screens, and vice versa. Always test your typography in its intended medium to ensure optimal results.
              </p>
            </section>

            <section className="content-section">
              <h2>The Future of Typography in UX</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Future of Typography"
                />
              </div>
              <p>
                Typography continues to evolve alongside technology. Variable fonts, which allow continuous adjustment of font properties like weight and width, offer new possibilities for responsive design and personalization.
              </p>
              <p>
                AI-driven typography tools are emerging that can analyze content and suggest optimal typeface combinations, sizes, and spacing. While these tools can be helpful, understanding fundamental typography principles remains essential for making informed decisions.
              </p>
              <p>
                Accessibility considerations are becoming increasingly important and regulated. Designers must ensure their typography choices support users with diverse abilities, including those with visual impairments, dyslexia, and other reading challenges.
              </p>
            </section>

            <section className="content-section">
              <h2>Conclusion</h2>
              <p>
                Typography can seem an obscure part of design, but it's fundamental to creating a positive user experience. By familiarizing yourself with basic terms and principles of typography, you can transform the success of your designs.
              </p>
              <p>
                Simplicity is your friend; don't overcomplicate your life (or design) by trying to do too much with type. Ultimately, you want your typography to be readable, accessible and understandable. Words are important, and so is how they look.
              </p>
              <p>
                The better your typography, the better your user experience. Whether you're designing a website, mobile app, or any digital product, thoughtful typography decisions will elevate your work and create more meaningful connections with your users.
              </p>
              <p>
                Remember that typography is not just about aesthetics—it's about communication, accessibility, and user experience. Every typographic choice you make should serve the ultimate goal of helping users accomplish their tasks efficiently and enjoyably.
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