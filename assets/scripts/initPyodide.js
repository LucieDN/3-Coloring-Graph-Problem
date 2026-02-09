// Import python environmnent - Used when window is loading
async function initPyodide() {
    pyodide = await loadPyodide({
        stdout: (text) => console.log(text),
        stderr: (text) => console.error(text)
    });

    // Preload Python packages ONCE
    await pyodide.loadPackage(["matplotlib", "networkx"]);
    
    // Fetch and inject config in Python
    const response = await fetch("./config.json");
    const config = await response.json();
    
    pyodide.globals.set("global_vars", pyodide.toPy(config));

    // Plot the first graph
    updateGraph.call()
    // Activate button once it is done
    .then(() => document.getElementById("plotBtn").disabled = false)   
}