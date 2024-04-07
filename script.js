let count = 1;

// Function to check if the string is accepted by LL(1) parser
function checkLL1Parser(string, productionRules) {
    // Implement your LL(1) parser logic here
    // For demonstration purposes, let's assume LL(1) parser always accepts the string
    console.log("String:", string);
    console.log("Production Rules:", productionRules);
    return true;
}

document.body.querySelector("button").addEventListener("click", () => {
    let html = `<label for="production-rule${count}">Enter Your Production-rule:
        <input type="text" id="production-rule${count}" placeholder="Format: S=AB" required/>
    </label>`;
    document
        .getElementById("non-flex")
        .insertAdjacentHTML("beforeend", `${html}`);
    console.log("Added production rule input:", count);
    count++;
});

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    
    const parserSelect = document.getElementById("parser-select");
    const selectedParser = parserSelect.options[parserSelect.selectedIndex].value;
    
    if (selectedParser === "LL(1)") {
        const stringInput = document.getElementById("string").value;
        console.log("String input:", stringInput);
        const productionRulesInputs = document.querySelectorAll('input[id^="production-rule"]');
        const productionRules = Array.from(productionRulesInputs).map(input => input.value);
        console.log("Production Rules:", productionRules);
        
        const isAccepted = checkLL1Parser(stringInput, productionRules);
        
        if (isAccepted) {
            alert("String accepted by LL(1) parser");
        } else {
            alert("String rejected by LL(1) parser");
        }
    } else {
        alert("Please select LL(1) parser to perform the check.");
    }
});
