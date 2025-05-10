type Options =
  | "GF"
  | "DF"
  | "GF/DF"
  | "GF available"
  | "DF available"
  | "GF/DF available";

type Allergens =
  | "Ce"
  | "Cr"
  | "E"
  | "F"
  | "G"
  | "Lu"
  | "Mi"
  | "Mo"
  | "Mu"
  | "N"
  | "Pnut"
  | "Se"
  | "So"
  | "Sd"
  | "V"
  | "Vg";

class MenuItem {
  name: string;
  price: number;
  allergens?: Allergens[] | null;
  description?: string | null;
  options?: Options | null;

  constructor(
    name: string,
    price: number,
    allergens?: Allergens[] | null,
    description?: string | null,
    options?: Options | null
  ) {
    this.name = name;
    this.price = price;
    this.allergens = allergens;
    this.description = description;
    this.options = options;
  }
}

export const whileYouWaitArr = [
  new MenuItem("Kalamata & Sicilian olives", 4.95),
  new MenuItem("Homemade bread, herb butter, olive oil & vinegar", 6.95, [
    "G",
    "Mi",
  ]),
];

export const startersArr = [
  new MenuItem(
    "Soup of the day",
    5.95,
    ["Ce", "G", "Mi", "V", "Vg"],
    "Bloomer bread",
    "GF/DF available"
  ),
  new MenuItem(
    "Haggis Bon Bons",
    7.95,
    ["E", "G", "Mi"],
    "Creamed potatoes, peppercorn sauce"
  ),
  new MenuItem(
    "Scottish Smoked Salmon",
    7.95,
    ["F", "Mi", "Mu"],
    "Lemon crème fraîche, mixed salad, pickled beetroot"
  ),
  new MenuItem(
    "Chicken Liver Paté",
    7.95,
    ["Ce", "Mu", "Sd", "G"],
    "Caramelised onion chutney & toasted crostini"
  ),
  new MenuItem(
    "Baked Camembert",
    9.95,
    ["G", "Mi", "Mu", "V"],
    "Onion chutney, garlic ciabatta",
    "GF available"
  ),
  new MenuItem(
    "Chicken Tempura",
    7.95,
    ["Mu", "Se", "So", "V"],
    "Asian slaw, sweet chilli",
    "GF"
  ),
  new MenuItem(
    "Cauliflower Wings",
    7.95,
    ["So", "V", "Vg", "Se"],
    "Asian BBQ sauce, super-beet kimchi"
  ),
  new MenuItem("Mozzarella Sticks & Salsa Dip", 3.95, [
    "G",
    "Mi",
    "V",
    "So",
    "E",
    "Mu",
  ]),
  new MenuItem(
    "North Atlantic Prawn Cocktail",
    6.95,
    ["Cr", "E", "Mi", "Mu"],
    "Marie rose, lemon"
  ),
];

export const mainsArr = [
  new MenuItem(
    "Pan Seared Fish of the Day",
    18.95,
    ["F", "Mi", "E"],
    "Sautéed potatoes, savoy cabbage, lemon butter sauce & crispy kale",
    "GF"
  ),
  new MenuItem(
    "Roast Chicken Breast",
    18.95,
    ["E", "G", "Mi"],
    "Bacon wrapped chicken, potato purée & peppercorn sauce, seasonal vegetables",
    "GF available"
  ),
  new MenuItem(
    "Sirloin Steak",
    26.95,
    ["Ce", "Mi"],
    "Mushroom, roasted tomato, chunky chips & peppercorn sauce",
    "GF"
  ),
  new MenuItem(
    "Pork Loin",
    21.95,
    ["Mi", "Sd", "Ce"],
    "Tender stem broccoli, diced new potatoes, mixed vegetables & red wine jus",
    "GF"
  ),
  new MenuItem(
    "Steak & Ale Pie",
    18.95,
    ["Ce", "E", "G", "Mi", "Sd"],
    "Creamed potatoes, seasonal vegetables, puff pastry & rich gravy"
  ),
  new MenuItem(
    "Arrabbiata Pasta",
    16.95,
    ["G", "Sd", "Mi"],
    "Roasted tomato, arrabbiata sauce with a hint of chilli"
  ),
  new MenuItem(
    "Mushroom Risotto & Spinach",
    17.95,
    ["Mi", "Ce", "V"],
    "Garlic sautéed mushroom, wilted spinach, basil dressing (vegan option available)",
    "GF"
  ),
  new MenuItem(
    "Cajun Chicken or Beef Burger",
    16.95,
    ["E", "G", "Mi"],
    "Cheddar cheese, bacon, salad, coleslaw & chips"
  ),
];

export const sidesArr = [
  new MenuItem("Mixed Salad", 3.95, ["Mu"], null, "GF"),
  new MenuItem("Chunky Chips", 3.95, null, null, "GF"),
  new MenuItem("Tempura Onion Rings", 3.95, null, null, "GF"),
  new MenuItem("Calamari, lemon aioli", 4.95, [
    "E",
    "Mo",
    "G",
    "Mi",
    "So",
    "Sd",
  ]),
];

export const dessertsArr = [
  new MenuItem("Moness Brownie", 6.95, ["E", "G", "Mi"], "Vanilla ice cream"),
  new MenuItem(
    "Salted Caramel Profiteroles",
    7.95,
    ["E", "G", "Mi"],
    "Chantilly cream & butterscotch sauce"
  ),
  new MenuItem(
    "Sticky Toffee Pudding",
    7.95,
    ["E", "G", "Mi"],
    "Vanilla ice cream"
  ),
  new MenuItem(
    "Cheesecake of the Day",
    7.95,
    ["G", "Mi"],
    "Ice cream or whipped cream & berry compote"
  ),
  new MenuItem(
    "Mango & Raspberry Sorbet",
    5.95,
    null,
    "May contain dairy",
    "GF"
  ),
  new MenuItem(
    "Affogato",
    7.95,
    ["Mi", "E"],
    "Fresh steaming espresso, vanilla ice cream",
    "GF"
  ),
];
