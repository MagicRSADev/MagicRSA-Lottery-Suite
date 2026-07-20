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

unique.sort((a,b)=>a-b);

results += "<b>Winning Numbers</b><br>";
results += unique.join(", ");
results += "<hr>";

let analysis = [];

// Compare each group
MASTER_WHEEL.forEach((group, index) => {

    let matches = group.filter(number => unique.includes(number));

    analysis.push({
        group: index + 1,
        matches: matches.length,
        numbers: matches
    });

});

// Sort from highest matches
analysis.sort((a,b)=>b.matches-a.matches);

results += "<h3>🏆 Top 10 Matching Groups</h3>";

results += `
<table class="results-table">
<tr>
<th>Rank</th>
<th>Group</th>
<th>Matches</th>
<th>Numbers</th>
</tr>
`;

analysis.slice(0,10).forEach((item,index)=>{

let medal = "";

if(index===0) medal="🥇";
else if(index===1) medal="🥈";
else if(index===2) medal="🥉";
else medal=index+1;

results += `
<tr>
<td>${medal}</td>
<td>${item.group}</td>
<td>${item.matches}/7</td>
<td>${item.numbers.join(", ")}</td>
</tr>
`;

});

results += "</table>";

document.getElementById("results").innerHTML = results;

    }

    
