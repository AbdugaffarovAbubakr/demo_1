function assert(condition, message) {
    if (!condition) {
        throw new Error("Assert xatosi: " + message);
    }
}

function hoareTriple(pre, command, post) {
    
    console.log("\n=== XOARE TRIADA TEKSHIRILMOQDA ===");
    assert(pre(), "Old shart (P) bajarilmadi!");
    const result = command();

    assert(post(result), "Yakuniy shart (Q) bajarilmadi!");
    console.log("✔ Triada tasdiqlandi!");
    return result;
}

function hoareTetrad(pre, command, post, exceptionRule) {
    console.log("\n=== XOARE TETRADA TEKSHIRILMOQDA ===");

    try {
        assert(pre(), "Old shart (P) bajarilmadi!");
        const result = command();
        assert(post(result), "Yakuniy shart (Q) bajarilmadi!");
        console.log("✔ Tetrada tasdiqlandi!");
        return result;

    } catch (err) {
        console.log("⚠ Xato yuz berdi:", err.message);

        if (exceptionRule(err)) {
            console.log("✔ Exception sharti (E) tasdiqlandi!");
        } else {
            console.log("❌ Nomaʼlum xato:", err.message);
        }
    }
}

console.log("\n========== MISOLLAR BOSHLANDI ==========");

let x = 2;

hoareTriple(
    () => x > 0,    //(P => Precondition)  
    () => {        
        x = x + 5; //(C=>Commond)
        return x;
    },
    (res) => res > 5 // Q(Postcondition)
);
console.log("Triada natijasi: x =", x);

let a = 0;

hoareTetrad(
    () => a !== 0, 
    () => {       
        if (a === 0) throw new Error("ZeroDivisionError"); // Exeption
        return 10 / a;
    },
    (r) => r < 10, 
    (err) => err.message === "ZeroDivisionError" 
);

let value = 10;

hoareTriple(
    () => value === 10, 
    () => {             
        for (let i = 0; i < 5; i++) value++;
        return value;
    },
    (v) => v === 15       
);
console.log("Kompleks triada natijasi:", value);

let arr = [1, 2, 3];

hoareTetrad(
    () => Array.isArray(arr), 
    () => {                   
        if (!arr[5]) throw new Error("IndexOutOfRange");
        return arr[5];
    },
    (val) => val === 3,       
    (err) => err.message === "IndexOutOfRange" 
);

console.log("\n========== MISOLLAR TUGADI ==========\n");