import mongoose, { version } from "mongoose";
import dotenv from "dotenv";
import Game from "../models/games.js";

dotenv.config();

// Temporary Cloudinary image for all font pairs
const TEMP_IMAGE = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1770956908/dcc646ee-58b0-4068-bdf4-7919f0e86a6d.png";

const Poppins = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771408928/7a798de1-0570-4954-8cb2-7a8db9058bd5.png";
const Helvetica = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771408964/84d33db6-2947-4b5f-9125-655f0458b5ff.png";
const TimesNewRoman = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771462841/cea18fd3-8191-4be2-95bc-525afc4fc6bb.png";
const Arial = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771462978/9352dd9f-419b-4c33-8824-2d1fac6ee0ed.png";
const Georgia = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771463279/425a4993-c768-40f3-969d-c8c9dfb63288.png";
const Roboto = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771463387/3c1837b3-0914-49cc-83aa-e08e6c529a33.png";
const ComicSansMS = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464449/2a9be064-6139-4a75-802d-2fb54b31df61.png";
const CourierNew = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464708/5f37b33e-e55a-4dbc-821a-7121e6b62a85.png";
const Verdana = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464778/d9d588db-d621-4016-8842-8595b6ae3809.png";
const Montserrat = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464862/d07de65f-3889-4c28-bd4b-602a86c581cd.png";
const Futura = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464887/178f3b3a-f1c2-43a1-a85c-00b1f53e76ab.png";
const Gotham = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771464991/7e744be3-3aab-4945-ae0a-4db9c89d4571.png";
const Bodoni = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465011/c4bd755a-1411-44b9-afda-d08955984081.png";
const Caslon = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465392/1cf18297-e143-46df-9725-df66ab297ebc.png";
const Frutiger = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771465436/d390ff29-0fc3-4b7a-a169-b9c596c824c1.png";
const Rockwell = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496572/c068a21f-c9e1-4d0d-ab43-52e3b172f491.png";
const GillSans = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496617/70fa2b53-68d6-41fe-a6eb-cdb51d6c5916.png";
const ProximaNova = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496697/0dc5cf53-29cc-4f44-87c8-8797f90acbc3.png";
const MrsEaves = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496806/f9c420b3-6cd4-4c5b-8a6a-b9d607b76cfe.png";
const DIN = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496851/0ba89d29-6f2b-45f9-b2a0-c22de138ae95.png";
const Sabon = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496877/acf146b1-8f6c-4059-9e43-f12170bb99cf.png";
const Interstate = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496945/46e6b886-18d0-4deb-9a59-c8cb9dc5071d.png";
const AkzidenzGrotesk = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771496975/b9ee42ec-ecd3-46d0-8e72-916d47930e7c.png";
const HoeflerText = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497072/1119dda8-ae80-4ea2-87dc-7b3cb4927821.png";
const FFMeta = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497118/57673fc4-6f1b-4db0-89cd-30b0a43e0932.png";
const Optima = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497146/96c76285-c3d2-4d8a-9341-f2c379d4fcbb.png";
const Thesis = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497246/37200cb7-64c9-402d-a334-517c40147ed7.png";
const Neutraface = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497265/8f624093-165f-4926-a7b2-9a700d5b2552.png";
const Archer = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497314/0f718815-fec3-44f4-bc82-267d69f77dcb.png";
const Filosofia = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771497344/2f94c930-da69-44f4-8ef0-4b190d75287a.png";
const BrushScript = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501175/040f7d28-efb5-4e76-a20d-be7c5806d362.png";
const Garamond = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501443/b55ec5ca-4e67-49b4-be79-d23614fc7d03.png";
const Impact = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501447/63a3abbf-accc-4ad9-b6b1-08879937e210.png";
const Papyrus = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501528/a81a66cf-84ed-4246-b358-4679aabe69fb.png";
const Chalkboard = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501533/4589a6bd-a554-42a7-8929-5dd0d796a4c5.png";
const Palatino = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501585/dcf5560b-41ee-4da6-b1b5-b485e2edd2e3.png";
const Stencil = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771501623/de75bc10-453a-47f2-b505-4a1a47ca4aa5.png";
const GTSectra = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502234/9e049e5c-dcd4-4bb3-a8a0-a14150f63b63.png";
const Minion = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502241/b7520016-1cac-443b-a4d3-18007aa8890d.png";
const MarkerFelt = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502449/a03a22da-e642-416e-9648-a486b0ae298f.png";
const Curlz = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502462/369442f5-e4b2-4432-836e-25a575c08bc7.png";
const GTAmerica = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502714/32652cd8-b18c-4e55-a230-ba03cdf1b207.png";
const OldEnglish = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502767/415caf8c-faf4-4c27-b49b-146e2e1b85db.png";
const CopperplateGothic = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771502800/47d0a100-257f-485f-8045-ca79d4123232.png";

const PlayFairDisplay = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510181/f2c3b7a6-9af5-4f11-a417-daff1c20298f.png";
const OpenSans = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510210/eddea0a2-17ab-4f23-aa58-e1b74fd457f7.png";
const Merriweather = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510271/8cb2ac80-dd03-45a9-9a56-85e5cead5fd0.png";
const Tahoma = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510297/8dbd9f3b-e3bf-47dc-9198-0098f37857d4.png";
const Calibri = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510350/7c1a0967-4552-46c9-ad08-417071e4ce7e.png";
const CenturyGothic = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510355/94ab0863-f0c0-4648-ad65-024d0b869e47.png";
const Oswald = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510361/320549ea-5953-4575-a8aa-e17764c1ecc4.png";
const Lato = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510367/163eddd0-f762-4116-ae3d-6e927cc79543.png";

const Didot = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510912/8a36cc61-6b0a-4dcf-ac61-4ad582db1b67.png";
const Avenir = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510934/1532231a-f074-4587-baf8-0473419b27e0.png";
const Baskerville = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771510954/baba933e-a25b-42de-bf3d-b3b1041f54de.png";
const BrandonGrotesque = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511020/90e83924-6167-4fd9-8b33-e29a83b69333.png";

const ChronicleText = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511761/838f9ec4-5827-465a-92b0-d09a81da8812.png";
const MaisonNeue = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511771/25c36d22-9dea-4a51-aac1-18aaf78dfa4b.png";
const AdobeCaslon = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511835/d0d2108d-5963-4b48-9836-fedde9f3b425.png";
const FreightSans = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511879/63f2a915-b457-4fa0-85df-b88bbde4cd4a.png";
const Canela = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771511994/ae5a031e-7928-465c-99cb-e177fcdf9941.png";
const BasisGrotesque = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771512003/3a4b1275-ef53-4b36-a66d-a350a58589b2.png";
const Graphik = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771512108/31a562ce-1764-44ee-83d5-46681f73f159.png";
const LyonText = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771512115/251629c3-d72a-41b8-98e1-50d6dee16333.png";
const Cambria = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771512365/570ec7c4-f0fa-4d71-aaaa-09626300c119.png";
const FreightText = "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771512604/734f3e1c-6e43-47f6-aac3-2fa9c2090509.png";

const fontPairingGames = [
  {
    title: "Font Pairing Master: Easy",
    description: "Learn classic font combinations that always work together!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499698/7a89911c-511e-4d3f-af2a-bc9899fd3825.png",
    difficulty: "easy",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: Helvetica,
        givenFontName: "Helvetica",
        correctPairImage: Georgia,
        correctPairName: "Georgia",
        options: [
          { pairImage: Georgia, pairName: "Georgia" },
          { pairImage: ComicSansMS, pairName: "Comic Sans" },
          { pairImage: Papyrus, pairName: "Papyrus" },
          { pairImage: Impact, pairName: "Impact" }
        ]
      },
      {
        givenFontImage: PlayFairDisplay,
        givenFontName: "Playfair Display",
        correctPairImage: OpenSans,
        correctPairName: "Open Sans",
        options: [
          { pairImage: OpenSans, pairName: "Open Sans" },
          { pairImage: TimesNewRoman, pairName: "Times New Roman" },
          { pairImage: CourierNew, pairName: "Courier" },
          { pairImage: Verdana, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: Montserrat,
        givenFontName: "Montserrat",
        correctPairImage: Merriweather,
        correctPairName: "Merriweather",
        options: [
          { pairImage: Merriweather, pairName: "Merriweather" },
          { pairImage: Arial, pairName: "Arial" },
          { pairImage: Tahoma, pairName: "Tahoma" },
          { pairImage: Calibri, pairName: "Calibri" }
        ]
      },
      {
        givenFontImage: Roboto,
        givenFontName: "Roboto",
        correctPairImage: Roboto,
        correctPairName: "Roboto Slab",
        options: [
          { pairImage: Roboto, pairName: "Roboto Slab" },
          { pairImage: Helvetica, pairName: "Helvetica" },
          { pairImage: CenturyGothic, pairName: "Century Gothic" },
          { pairImage: Futura, pairName: "Futura" }
        ]
      },
      {
        givenFontImage: Oswald,
        givenFontName: "Oswald",
        correctPairImage: Lato,
        correctPairName: "Lato",
        options: [
          { pairImage: Lato, pairName: "Lato" },
          { pairImage: Georgia, pairName: "Georgia" },
          { pairImage: Rockwell, pairName: "Rockwell" },
          { pairImage: Garamond, pairName: "Garamond" }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Pairing Master: Medium",
    description: "Discover sophisticated font combinations for modern design!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499698/7a89911c-511e-4d3f-af2a-bc9899fd3825.png",
    difficulty: "medium",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: Didot,
        givenFontName: "Didot",
        correctPairImage: Avenir,
        correctPairName: "Avenir",
        options: [
          { pairImage: Avenir, pairName: "Avenir" },
          { pairImage: Arial, pairName: "Arial" },
          { pairImage: Helvetica, pairName: "Helvetica" },
          { pairImage: Verdana, pairName: "Verdana" }
        ]
      },
      {
        givenFontImage: ProximaNova,
        givenFontName: "Proxima Nova",
        correctPairImage: Minion,
        correctPairName: "Minion Pro",
        options: [
          { pairImage: Minion, pairName: "Minion Pro" },
          { pairImage: TimesNewRoman, pairName: "Times New Roman" },
          { pairImage: Georgia, pairName: "Georgia" },
          { pairImage: Cambria, pairName: "Cambria" }
        ]
      },
      {
        givenFontImage: Gotham,
        givenFontName: "Gotham",
        correctPairImage: HoeflerText,
        correctPairName: "Hoefler Text",
        options: [
          { pairImage: HoeflerText, pairName: "Hoefler Text" },
          { pairImage: Garamond, pairName: "Garamond" },
          { pairImage: Baskerville, pairName: "Baskerville" },
          { pairImage: Palatino, pairName: "Palatino" }
        ]
      },
      {
        givenFontImage: BrandonGrotesque,
        givenFontName: "Brandon Grotesque",
        correctPairImage: FreightText,
        correctPairName: "Freight Text",
        options: [
          { pairImage: Lato, pairName: "Lato" },
          { pairImage: TimesNewRoman, pairName: "Times New Roman" },
          { pairImage: CourierNew, pairName: "Courier" },
          { pairImage: Georgia, pairName: "Georgia" }
        ]
      },
      {
        givenFontImage: Neutraface,
        givenFontName: "Neutraface",
        correctPairImage: Caslon,
        correctPairName: "Caslon",
        options: [
          { pairImage: Caslon, pairName: "Caslon" },
          { pairImage: Arial, pairName: "Arial" },
          { pairImage: Helvetica, pairName: "Helvetica" },
          { pairImage: Tahoma, pairName: "Tahoma" }
        ]
      }
    ],
    isActive: true
  },
  {
    title: "Font Pairing Master: Hard",
    description: "Master expert-level font pairing for editorial and brand design!",
    gameImage: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1771499698/7a89911c-511e-4d3f-af2a-bc9899fd3825.png",
    difficulty: "hard",
    gameType: "fontpairing",
    questions: [
      {
        givenFontImage: MaisonNeue,
        givenFontName: "Maison Neue",
        correctPairImage: ChronicleText,
        correctPairName: "Chronicle Text",
        options: [
          { pairImage: ChronicleText, pairName: "Chronicle Text" },
          { pairImage: Minion, pairName: "Minion Pro" },
          { pairImage: Garamond, pairName: "Garamond" },
          { pairImage: AdobeCaslon, pairName: "Adobe Caslon" }
        ]
      },
      {
        givenFontImage: FreightSans,
        givenFontName: "Freight Sans",
        correctPairImage: FreightText,
        correctPairName: "Freight Text",
        options: [
          { pairImage: FreightText, pairName: "Freight Text" },
          { pairImage: Verdana, pairName: "Verdana" },
          { pairImage: Futura, pairName: "Futura" },
          { pairImage: ComicSansMS, pairName: "Comic Sans" }
        ]
      },
      {
        givenFontImage: Canela,
        givenFontName: "Canela",
        correctPairImage: BasisGrotesque,
        correctPairName: "Basis Grotesque",
        options: [
          { pairImage: BasisGrotesque, pairName: "Basis Grotesque" },
          { pairImage: AkzidenzGrotesk, pairName: "Akzidenz Grotesk" },
          { pairImage: Papyrus, pairName: "Papyrus" },
          { pairImage: Minion, pairName: "Minion" }
        ]
      },
      {
        givenFontImage: Graphik,
        givenFontName: "Graphik",
        correctPairImage: LyonText,
        correctPairName: "Lyon Text",
        options: [
          { pairImage: LyonText, pairName: "Lyon Text" },
          { pairImage: Chalkboard, pairName: "Chalkboard" },
          { pairImage: Interstate, pairName: "Interstate" },
          { pairImage: MarkerFelt, pairName: "Marker Felt" }
        ]
      },
      {
        givenFontImage: GTAmerica,
        givenFontName: "GT America",
        correctPairImage: GTSectra,
        correctPairName: "GT Sectra",
        options: [
          { pairImage: GTSectra, pairName: "GT Sectra" },
          { pairImage: Filosofia, pairName: "Filosofia" },
          { pairImage: BrushScript, pairName: "Brush Script" },
          { pairImage: CopperplateGothic, pairName: "Copperplate Gothic" }
        ]
      }
    ],
    isActive: true
  }
];

const seedFontPairingGames = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing font pairing games (optional)
    await Game.deleteMany({ gameType: "fontpairing" });
    console.log("🗑️  Cleared existing font pairing games");

    // Insert new games
    const insertedGames = await Game.insertMany(fontPairingGames);
    console.log(`✅ Successfully seeded ${insertedGames.length} font pairing games:`);
    insertedGames.forEach(game => {
      console.log(`   - ${game.title} (${game.difficulty}) - ${game.questions.length} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding font pairing games:", error);
    process.exit(1);
  }
};

// Run the seeder
seedFontPairingGames();