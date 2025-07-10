import numpy as np
import plotly.graph_objects as go

# Generate synthetic data for reactor-like thermal distribution
radius = 50  # Radius of the cylinder
grid_points = 100  # Number of points in the grid

# Define grid
x = np.linspace(-radius, radius, grid_points)
y = np.linspace(-radius, radius, grid_points)
x, y = np.meshgrid(x, y)

# Create a circular mask
mask = np.sqrt(x**2 + y**2) <= radius  # Points inside the circle

# Define reactor temperature function
z = np.zeros_like(x)
z[mask] = 50 + 10 * np.sin(0.1 * x[mask]) * np.cos(0.1 * y[mask]) + \
          15 * np.sin(0.2 * np.sqrt(x[mask]**2 + y[mask]**2))

# Set points outside the circle to NaN (to avoid plotting them)
z[~mask] = np.nan
    
# Create the interactive 3D surface plot
fig = go.Figure()

# Add the surface plot
fig.add_trace(go.Surface(
    z=z, x=x, y=y, colorscale='Jet', colorbar=dict(title="Temperature (°C)"),
    cmin=np.nanmin(z), cmax=np.nanmax(z)  # Handle masked values
))

# Define custom tick values and tick texts for x and y axes
x_ticks = np.linspace(16, 40, 25)  # X-axis ticks from 16 to 40
y_ticks = np.linspace(1, 15, 15)  # Y-axis ticks from 1 to 15

# Update layout
fig.update_layout(
    title="Interactive 3D Reactor Core Surface Plot with Circular Top View",
    scene=dict(
        xaxis_title="X Dimension (cm)",
        yaxis_title="Y Dimension (cm)",
        zaxis_title="Temperature (°C)",
        xaxis=dict(
            range=[-radius, radius],  # Keeps the X-axis from -50 to 50
            tickvals=x_ticks,  # Specify the x-axis tick positions
            ticktext=[str(int(tick)) for tick in x_ticks],  # Format the tick labels as integers
            tickangle=0,  # Ensures the tick labels are horizontal
        ),
        yaxis=dict(
            range=[-radius, radius],  # Keeps the Y-axis from -50 to 50
            tickvals=y_ticks,  # Specify the y-axis tick positions
            ticktext=[str(int(tick)) for tick in y_ticks],  # Format the tick labels as integers
            tickangle=0,  # Ensures the tick labels are horizontal
        ),
    )
)

# Add hover template for detailed point information
fig.update_traces(
    hovertemplate="X: %{x}<br>Y: %{y}<br>Temperature: %{z}°C<extra></extra>"
)

# Show the plot
fig.show()
