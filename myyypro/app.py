import json
import numpy as np
import pandas as pd
import plotly.graph_objects as go
from scipy.interpolate import griddata
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    # Return the index page with CSV upload functionality
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('csvfile')

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Read CSV file into a DataFrame
    try:
        df = pd.read_csv(file)
        # Extract the header and data
        header = df.columns.tolist()
        data = df.values.tolist()

        # Return the header and data to be displayed in the table
        return jsonify({"header": header, "data": data})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/surface_plot')
def surface_plot():
    # Extract table data passed via query parameter
    table_data = request.args.get('data')

    if not table_data:
        return "No data found to generate plot", 400

    # Convert the table data (string) back into a Python list
    table_data = json.loads(table_data)

    # Check if the table has exactly 3 columns
    if len(table_data[0]) != 3:
        return "Error: Data must have exactly 3 columns (X, Y, Z)", 400

    # Convert all data to numeric values (X, Y, Z)
    try:
        # Convert the table data to a DataFrame and ensure the columns are numeric
        df = pd.DataFrame(table_data, columns=["X", "Y", "Z"])
        df['X'] = pd.to_numeric(df['X'], errors='raise')  # Ensure X is numeric
        df['Y'] = pd.to_numeric(df['Y'], errors='raise')  # Ensure Y is numeric
        df['Z'] = pd.to_numeric(df['Z'], errors='raise')  # Ensure Z is numeric
    except ValueError as e:
        return f"Error in converting data to numeric values: {str(e)}", 400

    # Extract X, Y, Z data
    x_data = df['X'].values
    y_data = df['Y'].values
    temperature_data = df['Z'].values

    # Create grid for the surface plot
    grid_points = 100
    x_min, x_max = np.min(x_data), np.max(x_data)
    y_min, y_max = np.min(y_data), np.max(y_data)

    # Create a meshgrid for X and Y
    x_grid = np.linspace(x_min, x_max, grid_points)
    y_grid = np.linspace(y_min, y_max, grid_points)
    x_grid, y_grid = np.meshgrid(x_grid, y_grid)

    # Interpolate the temperature data onto the grid
    z_grid = griddata((x_data, y_data), temperature_data, (x_grid, y_grid), method='cubic')

    # Create the interactive 3D surface plot
    fig = go.Figure()

    # Add surface plot
    fig.add_trace(go.Surface(
        z=z_grid, x=x_grid, y=y_grid, colorscale='Jet', colorbar=dict(title="Temperature (°C)")
    ))

    # Update layout
    fig.update_layout(
        title="Interactive 3D Surface Plot",
        scene=dict(
            xaxis_title="X Dimension (cm)",
            yaxis_title="Y Dimension (cm)",
            zaxis_title="Temperature (°C)"
        )
    )

    # Generate the plot HTML
    plot_html = fig.to_html(full_html=False)

    # Prepare stats for passing to the template
    stats = {
        'points': len(df),
        'x_range': f'{x_min} to {x_max}',
        'y_range': f'{y_min} to {y_max}',
        'z_range': f'{np.min(temperature_data)} to {np.max(temperature_data)}',
        'z_min': np.min(temperature_data),
        'z_max': np.max(temperature_data)
    }

    return render_template("surface_plot.html", plot_html=plot_html, stats=stats)

if __name__ == '__main__':
    app.run(debug=True)
