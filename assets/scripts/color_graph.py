def color_graph(G, colors, pos):
    ### Coloring algorithm variables
    color_assignement = dict(zip(G.nodes(), ['white' for node in G.nodes()])) # Current color solution dictionnary

    ### Get first node according to number of neighbours
    n_edges = {}
    for node in list(G): # For each node in the graph
        n_edges[node] = len(G.edges(node)) # Keep number of edges for each node
    n_edges_sorted = dict(sorted(n_edges.items(), key=lambda kv_tuple: kv_tuple[1], reverse = True)) # Sort according to number of edges

    remaining_nodes = list(n_edges_sorted.keys())
    first_node = remaining_nodes[0]

    ### Assign a color to first node
    color_assignement[first_node] = colors[0] # Always priorize the order of color list

    ### Mark first node as treated and remove it from remaining nodes
    remaining_nodes.remove(first_node)

    loop_breaker = False
    while 'white' in color_assignement.values(): # while there is white remaining in graph

        # Get current node according to its colored neighbours and get possible colors from it
        n_colored_neighbours = dict(zip(remaining_nodes, np.zeros(len(remaining_nodes), dtype=int))) # Counts number of color in neighbourhood for each node
        possible_colors = dict(zip(remaining_nodes, [])) # Lists possible color for each node

        for node in remaining_nodes: # for each node in remaining nodes
            edges = G.edges(node) # Get its edges, ie its neighbourhood relations
            neighbours_colors = [] # List color in neighbourhood allowing duplicates

            # Get colors different from 'white' in neighbourhood of node
            for node1,node2 in edges:
                
                # Define neighbour regardless of edges definition direction (A,B) or (B,A)
                if node1 == node:
                    neighbour = node2
                else:
                    neighbour = node1
                
                if color_assignement[neighbour] != 'white':
                    neighbours_colors.append(color_assignement[neighbour]) # Keep neighbour color in list

            neighbours_colors = list(set(neighbours_colors)) # Keep unique listed colors
            possible_colors[node] = list(set(colors) - set(neighbours_colors)) # List possible color for each node
            n_colored_neighbours[node] = len(neighbours_colors) # Count number of unique color in neighbouhood

            # Check for an impossible case
            if [] in possible_colors.values():
                return "IMPOSSIBLE COLORING"
        
        # Sort remaining nodes according to number of colored neighbours and select first one
        n_colored_neighbours_sorted = dict(sorted(n_colored_neighbours.items(), key=lambda kv_tuple: kv_tuple[1], reverse = True))
        remaining_nodes = list(n_colored_neighbours_sorted.keys())
        current_node = remaining_nodes[0]

        # Assign a color to current node
        color_assignement[current_node] = possible_colors[current_node][0]

        # Remove current node from remaining nodes
        remaining_nodes.remove(current_node)
        node_order.append(current_node)

    # Draw corresponding graph
    plt.figure(figsize=(8,4), dpi=120)
    nx.draw(G, pos=pos, with_labels = True, node_color=color_assignement.values(), node_size=800)

    # Render to browser
    import io, base64
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)

    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    return img_base64

color_graph(G, colors, pos)    