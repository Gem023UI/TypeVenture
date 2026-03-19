import React, { useState, useEffect } from "react";
import "./FontLibrary.css";

/* ─────────────────────────────────────────
   LOAD GOOGLE FONT HELPER
───────────────────────────────────────── */
const loadedFonts = new Set();
const loadFont = (fontName) => {
  if (!fontName || loadedFonts.has(fontName)) return;
  loadedFonts.add(fontName);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  const encoded = fontName.replace(/ /g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;700&display=swap`;
  document.head.appendChild(link);
};

/* ─────────────────────────────────────────
   THEME DATA
   Source: provided font pair library images
───────────────────────────────────────── */
const THEMES = [
  {
    id: "minimal",
    name: "Minimal Theme",
    emoji: "🤍",
    emotions: ["Calm 😌", "Neutral 😐", "Focused 🎯"],
    purpose: "Clean, structured, and distraction-free typography.",
    pairs: [
      { typeface: "Helvetica",       pair: "Helvetica + Garamond"            },
      { typeface: "Arial",           pair: "Arial + Georgia"                  },
      { typeface: "Roboto",          pair: "Roboto + Roboto Slab"             },
      { typeface: "Open Sans",       pair: "Open Sans + Merriweather"         },
      { typeface: "Montserrat",      pair: "Montserrat + Lora"                },
      { typeface: "Lato",            pair: "Lato + Playfair Display"          },
      { typeface: "Source Sans Pro", pair: "Source Sans Pro + Source Serif"   },
      { typeface: "Futura",          pair: "Futura + Baskerville"             },
      { typeface: "Avenir",          pair: "Avenir + Garamond"                },
      { typeface: "Poppins",         pair: "Poppins + Libre Baskerville"      },
    ],
  },
  {
    id: "playful",
    name: "Playful Theme",
    emoji: "🎉",
    emotions: ["Happy 😊", "Excited 🎈", "Fun 🎠"],
    purpose: "Friendly, energetic typography.",
    pairs: [
      { typeface: "Comic Sans",      pair: "Comic Sans + Arial"               },
      { typeface: "Baloo",           pair: "Baloo + Open Sans"                },
      { typeface: "Fredoka",         pair: "Fredoka + Montserrat"             },
      { typeface: "Luckiest Guy",    pair: "Luckiest Guy + Poppins"           },
      { typeface: "Chewy",           pair: "Chewy + Lato"                     },
      { typeface: "Bubblegum Sans",  pair: "Bubblegum Sans + Roboto"          },
      { typeface: "Pacifico",        pair: "Pacifico + Open Sans"             },
      { typeface: "Sniglet",         pair: "Sniglet + Nunito"                 },
      { typeface: "Patrick Hand",    pair: "Patrick Hand + Montserrat"        },
      { typeface: "Grandstander",    pair: "Grandstander + Lato"              },
    ],
  },
  {
    id: "elegant",
    name: "Elegant Theme",
    emoji: "💎",
    emotions: ["Romantic 💕", "Sophisticated 😌", "Love ❤️"],
    purpose: "Luxury and classy typography.",
    pairs: [
      { typeface: "Playfair Display",  pair: "Playfair Display + Montserrat"  },
      { typeface: "Didot",             pair: "Didot + Helvetica"              },
      { typeface: "Bodoni",            pair: "Bodoni + Futura"                },
      { typeface: "Garamond",          pair: "Garamond + Helvetica"           },
      { typeface: "Baskerville",       pair: "Baskerville + Open Sans"        },
      { typeface: "Georgia",           pair: "Georgia + Arial"                },
      { typeface: "Times New Roman",   pair: "Times New Roman + Helvetica"    },
      { typeface: "Cormorant",         pair: "Cormorant + Montserrat"         },
      { typeface: "Libre Baskerville", pair: "Libre Baskerville + Lato"       },
      { typeface: "Abril Fatface",     pair: "Abril Fatface + Montserrat"     },
    ],
  },
  {
    id: "bold",
    name: "Bold Theme",
    emoji: "💪",
    emotions: ["Powerful 💪", "Angry 😤", "Confident 😎"],
    purpose: "Strong and attention-grabbing typography.",
    pairs: [
      { typeface: "Impact",        pair: "Impact + Arial"                 },
      { typeface: "Bebas Neue",    pair: "Bebas Neue + Open Sans"         },
      { typeface: "Anton",         pair: "Anton + Roboto"                 },
      { typeface: "Oswald",        pair: "Oswald + Lato"                  },
      { typeface: "League Gothic", pair: "League Gothic + Georgia"        },
      { typeface: "Archivo Black", pair: "Archivo Black + Open Sans"      },
      { typeface: "Black Ops One", pair: "Black Ops One + Roboto"         },
      { typeface: "Russo One",     pair: "Russo One + Montserrat"         },
      { typeface: "Teko",          pair: "Teko + Lato"                    },
      { typeface: "Bungee",        pair: "Bungee + Open Sans"             },
    ],
  },
  {
    id: "modern",
    name: "Modern Theme",
    emoji: "✨",
    emotions: ["Creative 🎨", "Inspired 💡", "Optimistic 😄"],
    purpose: "Clean and contemporary typography.",
    pairs: [
      { typeface: "Proxima Nova", pair: "Proxima Nova + Merriweather"      },
      { typeface: "Gotham",       pair: "Gotham + Garamond"                },
      { typeface: "Montserrat",   pair: "Montserrat + Playfair Display"    },
      { typeface: "Avenir Next",  pair: "Avenir Next + Georgia"            },
      { typeface: "Raleway",      pair: "Raleway + Roboto"                 },
      { typeface: "Nunito",       pair: "Nunito + Lora"                    },
      { typeface: "Quicksand",    pair: "Quicksand + Open Sans"            },
      { typeface: "Josefin Sans", pair: "Josefin Sans + Playfair Display"  },
      { typeface: "Work Sans",    pair: "Work Sans + Merriweather"         },
      { typeface: "Inter",        pair: "Inter + Source Serif"             },
    ],
  },
];

/* ─────────────────────────────────────────
   FONTS TO PRELOAD
───────────────────────────────────────── */
const FONTS_TO_LOAD = [
  "Baloo 2","Fredoka","Luckiest Guy","Chewy","Bubblegum Sans","Pacifico","Sniglet",
  "Patrick Hand","Grandstander","Playfair Display","Garamond","Baskerville",
  "Georgia","Cormorant","Libre Baskerville","Abril Fatface","Bebas Neue",
  "Anton","Oswald","Archivo Black","Black Ops One","Russo One","Teko","Bungee",
  "Raleway","Nunito","Quicksand","Josefin Sans","Work Sans","Inter",
  "Montserrat","Open Sans","Lato","Poppins","Merriweather","Roboto",
  "Roboto Slab","Source Sans Pro","Lora","Futura","Avenir","League Gothic",
  "Impact","Bodoni Moda","Didact Gothic","Times New Roman","League Spartan",
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const FontLibrary = ({ isOpen, onClose }) => {
  const [activeTheme, setActiveTheme] = useState("minimal");

  useEffect(() => {
    FONTS_TO_LOAD.forEach(loadFont);
  }, []);

  if (!isOpen) return null;

  const theme = THEMES.find(t => t.id === activeTheme);

  return (
    <div className="fl-backdrop" onClick={onClose}>
      <div className="fl-modal" onClick={e => e.stopPropagation()}>

        {/* ── HEADER ── */}
        <div className="fl-header">
          <div className="fl-header-left">
            <span className="fl-header-icon">📚</span>
            <div>
              <h2 className="fl-title">Font Pairing Library</h2>
              <p className="fl-subtitle">Curated typeface combinations organized by emotional theme</p>
            </div>
          </div>
          <button className="fl-close" onClick={onClose}>✕</button>
        </div>

        {/* ── THEME TABS ── */}
        <div className="fl-theme-tabs">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`fl-theme-tab ${activeTheme === t.id ? "active" : ""}`}
              onClick={() => setActiveTheme(t.id)}
            >
              <span className="fl-tab-emoji">{t.emoji}</span>
              <span className="fl-tab-name">{t.name}</span>
            </button>
          ))}
        </div>

        {/* ── THEME BODY ── */}
        {theme && (
          <div className="fl-body">

            {/* Theme meta */}
            <div className="fl-theme-meta">
              <div className="fl-emotions">
                <span className="fl-meta-label">Emotions:</span>
                {theme.emotions.map((e, i) => (
                  <span key={i} className="fl-emotion-tag">{e}</span>
                ))}
              </div>
              <p className="fl-purpose">
                <strong>Purpose:</strong> {theme.purpose}
              </p>
            </div>

            {/* Table */}
            <div className="fl-table-wrap">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>Typeface</th>
                    <th>Font Pair</th>
                  </tr>
                </thead>
                <tbody>
                  {theme.pairs.map((pair, i) => (
                    <tr key={i}>
                      {/* Typeface displayed in its own font */}
                      <td>
                        <span
                          className="fl-font-name"
                          style={{
                            fontFamily: `'${pair.typeface}', sans-serif`,
                          }}
                        >
                          {pair.typeface}
                        </span>
                      </td>
                      {/* Font pair — headline font for first part, second font for second part */}
                      <td>
                        <span className="fl-pair-display">
                          {pair.pair.split(" + ").map((f, fi) => (
                            <span key={fi}>
                              <span
                                style={{ fontFamily: `'${f.trim()}', sans-serif` }}
                                className="fl-pair-font"
                              >
                                {f.trim()}
                              </span>
                              {fi < pair.pair.split(" + ").length - 1 && (
                                <span className="fl-pair-plus"> + </span>
                              )}
                            </span>
                          ))}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FontLibrary;