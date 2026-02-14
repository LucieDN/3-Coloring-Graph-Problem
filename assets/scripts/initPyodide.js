// Import python environmnent - Used when window is loading
async function initPyodide() {
    pyodide = await loadPyodide({
        stdout: (text) => console.log(text),
        stderr: (text) => console.error(text)
    });
    console.log("Pyodide is initialized");

    // Preload Python packages ONCE
    await pyodide.loadPackage(["matplotlib", "networkx"]);
    console.log("Packages are imported");

    // Fetch and inject config in Python
    const response = await fetch("./config.json");
    const config = await response.json();
    
    pyodide.globals.set("global_vars", pyodide.toPy(config));
    console.log("Config.json file is loaded and injected in Python environment");

    // Setup python config and plot the first graph
    pyodide.runPython(await (await fetch("assets/scripts/setup_config.py")).text());
    updateGraph.call()
    // Activate button once it is done
    .then(() => {
        document.getElementById("colorBtn").disabled = false;
    })
    .then(() => console.log("Python environment is all set up"));
}