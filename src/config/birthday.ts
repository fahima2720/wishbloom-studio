/**
 * ============================================================
 *  WISHBLOOM STUDIO — PERSONALIZATION FILE
 *  Everything a customer sees lives in this one file.
 *  Edit the text below, swap the images, and you're done.
 * ============================================================
 *
 *  ⚠ DEMO CONTENT: "Aria" and "Noah" are fictional. Replace all
 *  text and photos before delivering to a real customer, and set
 *  `isDemo` to false to hide the demo ribbon.
 */

// 1) PHOTOS — replace files in src/assets/ (keep names) or change these imports.
import photo1 from "@/assets/gallery-1.jpg";
import photo2 from "@/assets/gallery-2.jpg";
import photo3 from "@/assets/gallery-3.jpg";
import photo4 from "@/assets/gallery-4.jpg";
import photo5 from "@/assets/gallery-5.jpg";
import photo6 from "@/assets/gallery-6.jpg";

export const birthday = {
  isDemo: true,

  // 2) NAMES
  recipientName: "Aria",
  senderName: "Noah",
  ageOrMilestone: "Twenty-nine", // optional, use "" to hide

  // Shown in the intro section after opening
  intro: {
    headline: "Another year of you.",
    text: "A few photographs, a letter, and some small truths  gathered slowly, with love.",
  },

  // 3) OPENING SCREEN
  opening: {
    eyebrow: "A little surprise, made just for you",
    headline: "Happy Birthday, Aria",
    subline: "Take a breath. Turn the sound of the world down. This is yours.",
    button: "Open Your Surprise",
  },

  // 4) GALLERY — six photos, each with a caption and a small date/place line
  gallery: [
    { src: photo1, alt: "A café table for two with coffee, a croissant and blush roses", caption: "The morning you laughed so hard the waiter laughed too.", meta: "Paris · Spring" },
    { src: photo2, alt: "Two pairs of hands in modest long sleeves exchanging a bundle of handwritten letters tied with a blush ribbon, beside a dried rose and eucalyptus", caption: "Every note you ever left me is still in the blue box.", meta: "Kept · Always" },
    { src: photo3, alt: "A sunlit path winding through a wildflower meadow at golden hour", caption: "You, always a few steps ahead, turning back to wait for me.", meta: "Somewhere north" },
    { src: photo4, alt: "Coffee cups and a peony on linen sheets", caption: "Slow Sundays are my favourite version of us.", meta: "Home" },
    { src: photo5, alt: "Two cups of tea and blush roses on a candlelit kitchen table", caption: "Our kitchen, our Friday ritual. No music needed — just you.", meta: "Every Friday" },
    { src: photo6, alt: "A small birthday cake with lit candles", caption: "Last year's cake. This year, I promise a better one.", meta: "Your birthday" },
  ],

  // 5) LETTER — each string is one paragraph
  letter: {
    greeting: "My dearest Aria,",
    paragraphs: [
      "I've started this letter more times than I'd like to admit, because every version felt too small for what I wanted to say.",
      "So here is the simple truth: my life is gentler, warmer and far more interesting because you are in it. You notice the light on buildings. You remember the names of everyone's dogs. You make ordinary Tuesdays feel like something worth keeping.",
      "This year, I hope you are as kind to yourself as you are to everyone else. I hope you get the quiet mornings, the long dinners, the courage for the things you keep almost saying out loud.",
      "And I hope you know that wherever you're heading, I'll be right beside you probably carrying the snacks.",
    ],
    signOff: "All my love, always,",
    signature: "Noah",
  },

  // 6) LITTLE THINGS — six short notes
  littleThings: [
    { title: "Your laugh", text: "The real one, that arrives before you can stop it." },
    { title: "Your notes", text: "Tiny reminders on the fridge that turn into whole days of good." },
    { title: "Your curiosity", text: "Every museum takes three hours, and I love every minute." },
    { title: "Your kindness", text: "You leave every person a little lighter than you found them." },
    { title: "Your playlists", text: "Chaotic, specific, and somehow always exactly right." },
    { title: "Your courage", text: "You do the brave thing quietly, and then make tea." },
  ],

  // 7) WISH MOMENT
  wish: {
    title: "Make a wish",
    instruction: "Close your eyes, make a wish, then blow out the candles ,tap each one, or use the button.",
    button: "Make a Wish",
    afterWish: "Your wish is on its way. I'll do everything I can to help it come true.",
    candles: 3,
  },

  // 8) CLOSING
  closing: {
    headline: "Here's to you, and to every year still ahead.",
    message: "Thank you for being exactly who you are. Happy birthday, my love.",
    signature: "— Noah",
    replayButton: "Replay the Surprise",
  },

  // 9) THEME COLORS — any valid CSS color (hex, rgb, oklch)
  theme: {
    ivory: "#FBF6EF",
    blush: "#F3DCD6",
    rose: "#B9787A",
    burgundy: "#5E1F2B",
    gold: "#B8975A",
    ink: "#2B1A1E",
    sage: "#6E7F5E", // botanical green accent
  },
};

export type BirthdayConfig = typeof birthday;
