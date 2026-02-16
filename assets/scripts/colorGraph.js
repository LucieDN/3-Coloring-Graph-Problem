// Python execution - color current graph
async function colorGraph() {
  // Start by updating plotted graph
  updateGraph.call()

  // Run python code that get colors for current graph
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
  else if (document.getElementById('show_details').checked) {
    nodeOrder = result[2].toJs()
    pyodide.globals.set("color_assignement", result[1]);

    await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
import networkx as nx
import io, base64

current_color_assignement = dict(zip(G.nodes(), ['white' for _ in G.nodes()]))

def draw_step(node):
  current_color_assignement[node] = color_assignement[node]

  plt.figure(figsize=(8,4), dpi=120)
  nx.draw(G, pos=pos, with_labels=True,
          node_color=current_color_assignement.values(),
          node_size=800)

  buf = io.BytesIO()
  plt.savefig(buf, format="png")
  plt.close()
  buf.seek(0)

  return base64.b64encode(buf.read()).decode("utf-8")
`);

    // Plot successive coloration steps
    for (let node of nodeOrder) {
      let img_base64 = await pyodide.runPythonAsync(`
draw_step(${JSON.stringify(node)})
      `);

      let img = document.createElement("img");
      img.src = "data:image/png;base64," + img_base64;

      document.getElementById("output").innerHTML = "";
      document.getElementById("output").appendChild(img);

      await new Promise(resolve => setTimeout(resolve, 500));}
    }
  else {
    img_base64 = result[0]
    img = document.createElement("img")
    img.src = "data:image/png;base64," + img_base64

    // Clear previous output
    document.getElementById("output").innerHTML = ""
    // Show new plot
    document.getElementById("output").appendChild(img)
  }
}