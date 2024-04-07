let count = 1;

// Function to check if the string is accepted by LL(1) parser
function checkLL1Parser(string, productionRules) {
  // Construct the parsing table
  const parsingTable = constructParsingTable(productionRules, productionRules);

  // Initialize stack with start symbol
  const stack = ["S"]; // Assuming 'S' is the start symbol

  // Start parsing
  let inputIndex = 0;
  while (stack.length > 0) {
    const top = stack.pop();
    const nextInputChar = string[inputIndex];

    // If top of stack is a terminal symbol
    if (isTerminal(top)) {
      if (top === nextInputChar) {
        inputIndex++;
      } else {
        return false; // Mismatch between stack top and input
      }
    } else if (parsingTable[top] && parsingTable[top][nextInputChar]) {
      // If top of stack is a non-terminal symbol and parsing table has an entry
      // for the current non-terminal and next input character
      const production = parsingTable[top][nextInputChar];
      // Push the production rule onto the stack in reverse order
      for (let i = production.length - 1; i >= 0; i--) {
        stack.push(production[i]);
      }
    } else {
      return false; // No entry in parsing table for current stack top and input
    }
  }

  // If input is fully parsed and stack is empty, the string is accepted
  return inputIndex === string.length;
}

// Function to construct the LL(1) parsing table
function constructParsingTable(productionRules, originalProductionRules) {
  const parsingTable = {};
  for (const rule of productionRules) {
    const [nonTerminal, production] = rule.split("=");
    const firstSet = calculateFirstSet(production, originalProductionRules);
    for (const terminal of firstSet) {
      if (!parsingTable[nonTerminal]) {
        parsingTable[nonTerminal] = {};
      }
      parsingTable[nonTerminal][terminal] = production.split("");
    }
  }
  return parsingTable;
}
// Function to calculate the FIRST set for a given string
function calculateFirstSet(str, productionRules, visited = new Set()) {
  const firstSet = new Set();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (isTerminal(char)) {
      firstSet.add(char);
      break; // Break loop if terminal is found
    } else {
      // If non-terminal, get the production rules for that non-terminal
      const productionRulesForNonTerminal = productionRules.filter((rule) =>
        rule.startsWith(`${char}=`)
      );

      // Calculate FIRST set for each production rule
      for (const rule of productionRulesForNonTerminal) {
        const production = rule.split("=")[1];
        const firstSetOfProduction = calculateFirstSet(
          production,
          productionRules,
          visited
        );

        firstSetOfProduction.forEach((symbol) => {
          if (symbol !== "ε") {
            // Add to first set unless it's epsilon
            firstSet.add(symbol);
          }
        });

        if (!firstSetOfProduction.has("ε")) {
          // If epsilon is not in the FIRST set, break loop
          break;
        }
      }

      if (!visited.has(char)) {
        visited.add(char);
      } else {
        // If non-terminal is visited and all productions derive epsilon, add epsilon
        const allProductionsHaveEpsilon = productionRulesForNonTerminal.every(
          (rule) => {
            const production = rule.split("=")[1];
            const firstSetOfProduction = calculateFirstSet(
              production,
              productionRules,
              visited
            );
            return firstSetOfProduction.has("ε");
          }
        );

        if (allProductionsHaveEpsilon) {
          firstSet.add("ε");
        }
      }
    }
  }

  return firstSet;
}

// Function to check if a symbol is a terminal
function isTerminal(symbol) {
  // Assuming terminals are characters that are not uppercase letters
  return /^[^A-Z]*$/.test(symbol);
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
    const productionRulesInputs = document.querySelectorAll(
      'input[id^="production-rule"]'
    );
    const productionRules = Array.from(productionRulesInputs).map(
      (input) => input.value
    );
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
