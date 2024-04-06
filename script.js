let count = 1;

document.body.querySelector("button").addEventListener("click", () => {
  let html = `  <label for="production-rule">Rule ${count}:
  <input type="text" id="production-rule" placeholder="Format: S=AB" required/>
  </label>`;
  document
    .getElementsByTagName("label")
    [count++].insertAdjacentHTML("afterend", `${html}`);
  console.log(count);
});
