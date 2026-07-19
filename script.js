function analyzeDraw() {

    // Get the text entered
    let input = document.getElementById("numbers").value.trim();

    // Split by spaces or commas
    let numbers = input.split(/[\s,]+/)
        .map(Number)
        .filter(n => !isNaN(n));

    let results = "";

    // Check total numbers
    if (numbers.length !== 20) {
        results += "❌ You entered " + numbers.length +
                   " numbers.<br>";
        results += "Please enter exactly 20 numbers.<br><br>";
    }

    // Check duplicates
    let unique = [...new Set(numbers)];

    if (unique.length !== numbers.length) {
        results += "❌ Duplicate numbers found.<br><br>";
    }

    // Check range
    let invalid = numbers.filter(n => n < 1 || n > 80);

    if (invalid.length > 0) {
        results += "❌ Invalid numbers: " +
                   invalid.join(", ") +
                   "<br><br>";
    }

    // Success
    if (
        numbers.length === 20 &&
        unique.length === 20 &&
        invalid.length === 0
    ) {

        results += "✅ VALID DRAW<br><br>";

        results += "Winning Numbers:<br>";

        results += unique.sort((a,b)=>a-b).join(", ");

    }

    document.getElementById("results").innerHTML = results;

}