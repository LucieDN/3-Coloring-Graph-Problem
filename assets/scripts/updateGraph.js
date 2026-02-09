// Python execution - Plot uncolored graph with user inputs
async function updateGraph() {
  
  // Get user inputs as raw strings
  const edgesStr = document.getElementById("edgesInput").value;

  // Inject inputs into Python
  pyodide.globals.set("edges_str", edgesStr);
  
  // Run python code that plots current graph
  pyodide.runPython(await (await fetch("assets/scripts/plot_graph.py")).text());
}