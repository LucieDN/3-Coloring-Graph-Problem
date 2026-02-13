// Python execution - color current graph
async function colorGraph() {
  // Run python code that color current graph
  pyodide.runPython(await (await fetch("assets/scripts/color_graph.py")).text());
  
}