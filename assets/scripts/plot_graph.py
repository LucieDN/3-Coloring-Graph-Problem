# Safely parse Python literals
edges = ast.literal_eval(edges_str)

# Use Networkx to build corresponding graph
G = nx.Graph()
G.add_edges_from(edges)
pos = nx.spring_layout(G, seed=seed)

# Draw corresponding graph
plt.figure(figsize=(8,4), dpi=120)
nx.draw(G, pos=pos, with_labels = True, node_color='white', node_size=800) # Uncolored initial graph

# Render to browser
import io, base64
buf = io.BytesIO()
plt.savefig(buf, format="png")
plt.close()
buf.seek(0)

img_base64 = base64.b64encode(buf.read()).decode("utf-8")
img = document.createElement("img")
img.src = "data:image/png;base64," + img_base64

# Clear previous output
document.getElementById("output").innerHTML = ""
# Show new plot
document.getElementById("output").appendChild(img)