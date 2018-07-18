export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "adorable",
    "beautiful",
    "clean",
    "wrestling",
    "elegant",
    "fancy",
    "glamorous",
    "handsome",
    "jumping",
    "magnificent",
    "snarky",
    "jazzy",
    "quaint",
    "sparkling",
    "super-duper",
    "unsightly",
    "angry",
    "bewildered",
    "clumsy",
    "pervasive",
    "tenacious",
    "endless",
    "preppy",
    "fishy",
    "itchy",
    "jealous",
    "lazy",
    "mysterious",
    "nervous",
    "obnoxious",
    "panicky",
    "hardworking",
    "scary",
    "sizzling",
    "crabby",
    "tricky"
  ];

  const nouns = [
    "acajou",
    "aero",
    "alabaster",
    "amber",
    "amethyst",
    "aqua",
    "aquamarine",
    "asparagus",
    "azure",
    "baby-blue",
    "barn-red",
    "beige",
    "bitter-lemon",
    "blood-orange",
    "blue-bell",
    "blue-jeans",
    "blue-yonder",
    "bottle-green",
    "boysenberry",
    "brave-orange",
    "bright-pink",
    "bubble-gum",
    "burlywood",
    "burnt-sienna",
    "calamansi",
    "canary-yellow",
    "carrot-orange",
    "cinnabar",
    "coconut",
    "deep moss-green"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
