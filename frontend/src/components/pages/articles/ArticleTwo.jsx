import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./ArticleTwo.css";

export default function ArticleTwo() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <article className="article-two-wrapper">
        <div className="article-two-container">
          {/* Back Button */}
          <button 
            className="back-button"
            onClick={() => navigate('/articles')}
          >
            ← Back to Articles
          </button>

          {/* Article Header */}
          <header className="article-header">
            <h1 className="article-main-title">Typographic Hierarchies</h1>
            <p className="article-subtitle">
              Master the art of visual organization in typography. Learn six essential variables to establish effective hierarchies that guide readers and enhance communication through deliberate design choices.
            </p>
            <div className="article-meta">
              <span className="article-author">By Alma Hoffmann</span>
              <span className="article-date">October 26, 2022</span>
              <span className="article-read-time">29 min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="article-featured-image">
            <img 
              src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
              alt="Typographic Hierarchies"
            />
          </div>

          {/* Article Content */}
          <div className="article-content">
            <section className="content-section">
              <p className="intro-text">
                Simply defined, the concept of typographic hierarchies refers to the visual organization of content in terms of their relative importance. In other words, the manner in which we organize the text, the headers, the subheaders, the columns, the paragraphs, the callouts, and others on the page or space signify their importance.
              </p>
              <p>
                That sounds easy enough, right? Yes, it does. The problem is that visually accomplishing this is more challenging than it sounds, especially for those unfamiliar with the nuances of typography. Everything in typography behaves like a domino effect causing a chain reaction of changes by the designer. That is why when a client asks for a "small change," it is never small and never linear. Typography is symbiotic. Each element contributes to the other, even in a very small way.
              </p>
            </section>

            <section className="content-section">
              <h2>Understanding Typography and Hierarchy</h2>
              <p>
                These two words: typographic and hierarchies are not familiar concepts to those outside our field. In fact, even in the art and design field, fellow artists do not necessarily understand typographic hierarchy. The term <em>typographic</em> refers to matters related to typography: type choice, sizes, weights, how far or close we set the letters, and others. The term <em>hierarchy</em> refers to levels of priority or importance: what comes first, second, and third.
              </p>
              <p>
                Thus, when these two terms are put together, we mean to arrange content in levels of importance with the intention of communicating to the reader. Choosing typefaces, arranging content in terms of visual importance, and organizing elements (title, subtitles, body copy, images, space, and so on) on the page evoke responses from the reader.
              </p>
            </section>

            <section className="content-section">
              <h2>The Journey to Understanding Typography</h2>
              <p>
                Before becoming a designer, I graduated with a BA in Art Education. I understood color, research, composition, contrast, drawing, images, sketching, painting, and so on. When I went back to school to study design and specifically graphic design, I was lost.
              </p>
              <p>
                My biggest challenge was that I could not see the letters as something other than the semantic symbols of language. Questions constantly flooded my mind. For instance, <em>"What do you mean that the letters have a grid? What do you mean I am doing too much? And what is too much? How is this too big?"</em> The questions were endless and excruciating.
              </p>
              <p>
                My "aha" moment came when another instructor explained to me that typography was like auditioning for a part in a play that I wanted really badly. She suggested that I enunciate the words as if I was playing in the theater. It was then that I realized, in a very experiential way, that <strong>typography was the spoken language in visual form</strong>.
              </p>
              <p>
                That, somehow, the letters, words, titles, typeface choices, size, weight, color, spacing — all conspired together to emanate a visual language. The page was the stage. The letters, words, titles, paragraphs, and so on were performers on that stage.
              </p>
            </section>

            <section className="content-section">
              <h2>Six Essential Variables</h2>
              <p>
                The typographic hierarchies project is based on isolating six basic variables to establish a typographic hierarchy. These variables are:
              </p>
              <ul className="variables-list">
                <li><span className="variable-name">Proximity or Space</span> — The relative distance between elements</li>
                <li><span className="variable-name">Weight</span> — Changes in typeface boldness (bold, regular, italic, heavy, medium)</li>
                <li><span className="variable-name">Size</span> — How large or small the font is displayed</li>
                <li><span className="variable-name">Size and Weight</span> — Combining two variables for emphasis</li>
                <li><span className="variable-name">Color</span> — Using hue to enhance hierarchy</li>
                <li><span className="variable-name">Visual Punctuation</span> — Lines, shapes, symbols, and geometric elements</li>
              </ul>
              <p>
                When we look at a typographic composition, a poster, a brochure, or a web page, what we see is the application of these variables together. We don't often think of dissecting the composition in front of us. Yet, when we start as designers, we need to retrain our brains to look at content as a relationship of shapes in a context, format, or space.
              </p>
            </section>

            <section className="content-section">
              <h2>1. Proximity or Space</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Proximity and Space Example"
                />
              </div>
              <p>
                Proximity refers to the relative distance between elements. An easy metaphor is to think of friends, close friends, and strangers. The closer the friend, the closer the distance. The stranger the person, the farthest we stand from them. Our proximity or space shrinks or grows depending on our familiarity with things or people.
              </p>
              <p>
                When we discuss or think of space in a typographic hierarchy, we refer to things like space between letters, words, titles, paragraphs, margins, and how and where we place elements on the page. The grid is an underlying tool that helps us organize elements on a page.
              </p>
              
              <h3>The Grid: Foundation of Organization</h3>
              <p>
                A grid is simply an underlying structure used to organize elements in a context. There are usually two ways to approach the application of a grid: predetermined or improvisational (also known as a visual or linear association).
              </p>
              <p>
                A <strong>predetermined grid</strong> is the division of the space into a certain amount of columns. There is even a one-column grid, also commonly called a manuscript grid. We can have two, three, four, five, and sometimes more columns.
              </p>
              <p>
                An <strong>improvisational grid</strong> is created when we lay down one element, perhaps in a very large size, and use it to extend its lines to organize elements around it. Thus, visual alignments or associations are emphasized by placing elements following invisible lines emanating from them.
              </p>
            </section>

            <section className="content-section">
              <h2>2. Weight</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Weight Example"
                />
              </div>
              <p>
                Weight refers to changes in the typeface as bold, regular, italic, heavy, medium, and so on. In this variable, we keep the sizes all even. In other words, we do not change the size at all.
              </p>
              <p>
                It is worth mentioning that a typeface with no weight options will not be helpful in our exploration, as well as funky or heavily ornamental typefaces. Those are great for one instance or for display purposes such as a poster. However, in creating a hierarchy, it is best to stick to typefaces with well-proportioned shapes and multiple font options in their family.
              </p>
              <p>
                By using different weights strategically, you can guide the reader's eye through the content without relying on size changes. Bold weights naturally draw attention and can be used to establish reading order or emphasize key concepts.
              </p>
            </section>

            <section className="content-section">
              <h2>3. Size</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Size Example"
                />
              </div>
              <p>
                Size refers to how large or small the font used is displayed. For hierarchy purposes, we limit ourselves to three sizes, referred to in categories:
              </p>
              <ul>
                <li><strong>Body Copy:</strong> Depending on the typefaces' x-height, anywhere from 8 points to 12. Never over 12.</li>
                <li><strong>Titles:</strong> Anything over 14 points is considered a display, but you'll find that it's still too small to make an impact. Go big if you want emphasis.</li>
                <li><strong>Subheaders or Accents:</strong> Depending on what sizes you are using for the titles, select something in between the body copy size and the titles.</li>
              </ul>
              <p>
                The best way to think of titles is to see them as a group of little cousins or a group of best friends who are really tight. The spaces you create between each word on the title affect how the title is seen. Do the words go together? If so, should there be a gap?
              </p>
            </section>

            <section className="content-section">
              <h2>4. Size and Weight Combined</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Size and Weight Example"
                />
              </div>
              <p>
                Combining two variables while still using proximity creates a powerful hierarchy. We are still limiting ourselves to three size changes. In terms of weight, we can change the weight of words we think need to be seen but are not as important as the title.
              </p>
              <p>
                We can certainly make a word very large and bold. But, as you are experimenting, keep an eye on the balance of the page. Are things too heavy on one side? Is the page too busy on one side versus the other? Size and weight experimentation also allows you to start playing with an improvisational grid.
              </p>
              <p>
                When making a letter or word really large, you may use it to establish visual alignments from it. This creates a natural organizational structure that feels organic rather than forced.
              </p>
            </section>

            <section className="content-section">
              <h2>5. Color</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Color Example"
                />
              </div>
              <p>
                When studying this variable, we limit the use of color to two or three colors. By limiting the use of color, we can focus on how it helps to establish a hierarchy in typography. We do not use color arbitrarily.
              </p>
              
              <h3>Factors Affecting Color Use</h3>
              <p>
                There are usually three essential aspects to consider when using color and designing in general:
              </p>
              <ul>
                <li><strong>Content:</strong> What is the message and tone?</li>
                <li><strong>Audience:</strong> Who will be viewing this design?</li>
                <li><strong>Context:</strong> Where and how will this be seen?</li>
              </ul>
              <p>
                The audience determines not only how the content is written but also the typefaces, sizes, weights, and overall design of the content. The context of the content also determines how we design: is the content meant to be read at a distance, as in a poster, or is the content meant to be read closer to us, as in a mobile device or a book?
              </p>
              <p>
                Because color affects how we perceive the content, we must become familiar with that content. Reading the content given to us by our clients helps us make smart design decisions.
              </p>
            </section>

            <section className="content-section">
              <h2>6. Visual Punctuation</h2>
              <div className="pairing-showcase">
                <img 
                  src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770224239/tg4_oxsdlq.jpg" 
                  alt="Visual Punctuation Example"
                />
              </div>
              <p>
                Visual punctuation refers to the use of lines, shapes, symbols, and other geometric elements to enhance the hierarchy. Remember, the goal is always to enhance the hierarchy and help the reader's eye move around the space.
              </p>
              <p>
                We see visual punctuation all the time but don't think about it. It includes elements like:
              </p>
              <ul>
                <li>Lines that separate or connect content sections</li>
                <li>Circles or shapes that highlight important information</li>
                <li>Arrows or directional elements that guide the eye</li>
                <li>Geometric patterns that create visual rhythm</li>
                <li>Decorative elements that reinforce the message</li>
              </ul>
              <p>
                The key is to use visual punctuation purposefully. Every element should serve to enhance the hierarchy and improve communication, not just to decorate the page.
              </p>
            </section>

            <section className="content-section">
              <h2>Putting It All Together</h2>
              <p>
                When working with all these variables combined, magic happens. The key is understanding that these variables work together, creating a symphony of visual communication. Each element supports the others, building a cohesive and effective typographic system.
              </p>
              <p>
                Here are some essential principles to remember:
              </p>
              <ul>
                <li>Establish clear hierarchy through intentional use of the six variables</li>
                <li>Consider the content, audience, and context in all design decisions</li>
                <li>Use grids (predetermined or improvisational) to organize space effectively</li>
                <li>Limit your choices: three sizes maximum, two to three colors</li>
                <li>Let the content guide your typographic decisions</li>
                <li>Always print and review your work from a distance</li>
                <li>Tape designs upside down to assess balance and proportions objectively</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Practice Makes Perfect</h2>
              <p>
                The more you practice working with these variables, the better you'll become at creating effective typographic hierarchies. Start with simple exercises:
              </p>
              <ul>
                <li>Pick short content (10-step instructions or a brief excerpt)</li>
                <li>Use a small format (8 inches by 8 inches works well)</li>
                <li>Sketch multiple options for each variable before going digital</li>
                <li>Print your work and evaluate it from different distances</li>
                <li>Tape printed pieces upside down to check proportions</li>
                <li>Revise, print again, and repeat the evaluation process</li>
              </ul>
              <p>
                Remember, design is about creative solutions within a set of parameters. The constraints of working with these six variables will actually fuel your creativity, not limit it.
              </p>
            </section>

            <section className="content-section">
              <h2>Conclusion</h2>
              <p>
                Typography is both an art and a science. Understanding and mastering typographic hierarchies requires practice, patience, and a willingness to experiment. The six variables discussed in this article — proximity, weight, size, size and weight, color, and visual punctuation — provide a framework for creating clear, effective, and beautiful typographic compositions.
              </p>
              <p>
                By isolating each variable and understanding how it works independently, you build a foundation for combining them effectively. This approach transforms typography from a confusing jumble of choices into a systematic, intentional process.
              </p>
              <p>
                Typography is the spoken language in visual form. The page is your stage, and every letter, word, and element is a performer. Direct them wisely, and they will deliver a performance that resonates with your audience and communicates your message with clarity and impact.
              </p>
              <p>
                Fine-tuning your typographic senses comes with exposure and repetition. Take every opportunity to design and establish hierarchy. Even small projects like business cards can look incredible when you thoughtfully apply contrast of space, weight, size, color, and visual punctuation. Once you know how to use these variables, you can push boundaries and create pieces with more impact and intention.
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