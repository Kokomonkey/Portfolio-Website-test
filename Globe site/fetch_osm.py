import requests
import json

def fetch_architectural_buildings():
    print("Querying OpenStreetMap Overpass API...")
    
    # The Overpass Query Language (Overpass QL)
    # This asks for any "node" (a single point) tagged as a building that ALSO has an architect tag.
    # We limit it to 500 results for this preview to avoid crashing your browser.
    overpass_query = """
    [out:json];
    node["building"]["architect"];
    out 500;
    """
    
    url = "http://overpass-api.de/api/interpreter"
    response = requests.post(url, data={'data': overpass_query})
    
    if response.status_code != 200:
        print(f"Error fetching data: {response.status_code}")
        return

    data = response.json()
    elements = data.get("elements", [])
    
    print(f"Found {len(elements)} buildings. Converting to GeoJSON...")

    # Build the GeoJSON structure
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }

    for el in elements:
        tags = el.get("tags", {})
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [el["lon"], el["lat"]] # GeoJSON requires [Longitude, Latitude]
            },
            "properties": {
                "name": tags.get("name", "Unnamed Building"),
                "architect": tags.get("architect", "Unknown"),
                "year": tags.get("start_date", "Unknown"), # OSM usually uses start_date for build year
                "style": tags.get("architecture", "Unknown")
            }
        }
        geojson["features"].append(feature)

    # Save to the local file
    with open('buildings.geojson', 'w', encoding='utf-8') as f:
        json.dump(geojson, f, indent=2, ensure_ascii=False)
        
    print("Success! Data saved to buildings.geojson")

if __name__ == "__main__":
    fetch_architectural_buildings()