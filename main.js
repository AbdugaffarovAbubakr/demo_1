// === 1) Minkovskiy masofa funksiyasi ===
function minkovskiyMasofa(v1, v2, p = 2) {
  if (v1.length !== v2.length) {
    throw new Error("Vektor uzunliklari teng bo‘lishi kerak!");
  }

  let sum = 0;
  for (let i = 0; i < v1.length; i++) {
    sum += Math.abs(v1[i] - v2[i]) ** p;
  }

  return sum ** (1 / p);
}

// === 2) Sinflash funksiyasi ===
function sinflashYangiTelefon(yangiX, maLummotlar, p = 2, aniqlikEpsilon = 1e-6) {
  let minMasofa = Infinity;
  let yaqinTelefon = null;

  for (const tel of maLummotlar) {
    const masofa = minkovskiyMasofa(yangiX, tel.x, p);

    if (masofa < aniqlikEpsilon) {
      return { ...tel, masofa: 0.0, aniq: true };
    }

    if (masofa < minMasofa) {
      minMasofa = masofa;
      yaqinTelefon = { ...tel, masofa };
    }
  }

  return { ...yaqinTelefon, aniq: false };
}

// === 3) Dataset (telefonlar: brend va model bilan) ===
const dataset = [
  // === iPhone ===
  { id: 1, brand: "iPhone", model: "iPhone 14", x: [128, 799, 3] },
  { id: 2, brand: "iPhone", model: "iPhone 14 Plus", x: [256, 899, 4] },
  { id: 3, brand: "iPhone", model: "iPhone 14 Pro", x: [512, 999, 5] },
  { id: 4, brand: "iPhone", model: "iPhone 14 Pro Max", x: [512, 1299, 7] },
    { id: 5, brand: "iPhone", model: "iPhone 15 Pro Max", x: [1024, 1000, 8] },


  // === Samsung ===
  { id: 5, brand: "Samsung", model: "Galaxy S24", x: [128, 599, 8] },
  { id: 6, brand: "Samsung", model: "Galaxy S24+", x: [256, 1199, 9] },
  { id: 7, brand: "Samsung", model: "Galaxy S24 Ultra", x: [512, 1199, 10] },
  { id: 8, brand: "Samsung", model: "Galaxy S24 Ultra+", x: [512, 1399, 11] },

  // === Redmi ===
  { id: 9, brand: "Redmi", model: "Redmi Note 14 128GB", x: [128, 199, 12] },
  { id: 10, brand: "Redmi", model: "Redmi Note 14 256GB", x: [256, 299, 13] },
  { id: 11, brand: "Redmi", model: "Redmi Note 14 Pro", x: [512, 399, 14 ]},
  { id: 12, brand: "Redmi", model: "Redmi Note 14 Pro Max", x: [512, 499, 15] },
];

// === 4) Asosiy ishchi qism ===
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== Telefon modelini aniqlovchi dastur (Minkovskiy masofa, p=2) ===");
console.log("Parametrlar: [Xotira (GB), Narx ($), Ekran (inch)]\n");

rl.question("Xotira (GB): ", (memory) => {
  rl.question("Narxi ($): ", (price) => {
    rl.question("Ekran (inch): ", (screen) => {
      const yangiTelefon = [parseFloat(memory), parseFloat(price), parseFloat(screen)];

      if (yangiTelefon.some(isNaN)) {
        console.log("Xatolik: faqat raqamli qiymatlar kiriting!");
        rl.close();
        return;
      }

      const { brand, model, x, masofa, aniq } = sinflashYangiTelefon(yangiTelefon, dataset, 2);

      console.log("\n--- Natija ---");
      console.log(`Kiritilgan telefon: Xotira=${memory}GB, Narxi=$${price}, Ekran=${screen}inch`);

      if (aniq) {
        console.log(`Aniq model: ${model}`);
        console.log(`Brend: ${brand}`);
        console.log(`Xususiyatlar: Xotira=${x[0]}GB, Narxi=$${x[1]}, Ekran=${x[2]}"`);
      } else {
        console.log(`Eng yaqin model: ${model}`);
        console.log(`Brend: ${brand}`);
        console.log(`Xususiyatlar: Xotira=${x[0]}GB, Narxi=$${x[1]}, Ekran=${x[2]}"`);
        console.log(`Masofa: ${masofa.toFixed(3)} (Minkowski p=2)`);
      }

      rl.close();
    });
  });
});
