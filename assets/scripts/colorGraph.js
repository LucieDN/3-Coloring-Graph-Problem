// Python execution - color current graph
async function colorGraph() {
  // Run python code that color current graph
  let result = pyodide.runPython(await (await fetch("assets/scripts/color_graph.py")).text());
  
  if (result === "IMPOSSIBLE COLORING") {
    const dialog = document.createElement("dialog");

    dialog.innerHTML = `
      <h2>Sorry, can't do it :/</h2>
      <p>There is no way we can color it with only 3 colors!</p>
      <button id="closeDialog">I understand and will never ask for it again.</button>
    `;

    document.body.appendChild(dialog);

    // Show as modal
    dialog.showModal();

    // Close button logic
    dialog.querySelector("#closeDialog").addEventListener("click", () => {
        dialog.close();
        dialog.remove();
});
  }
  else{
    img = document.createElement("img")
    img.src = "data:image/png;base64," + result

    // Clear previous output
    document.getElementById("output").innerHTML = ""
    // Show new plot
    document.getElementById("output").appendChild(img)
  }
}