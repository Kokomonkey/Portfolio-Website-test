import requests
import json
import re

def fetch_famous_buildings():
    print("Querying Wikidata for the top 1000 most famous buildings...")
    
    url = 'https://query.wikidata.org/sparql'
    
    # SPARQL Query: Finds instances of buildings (or subclasses), 
    # ensures they have coordinates and an architect, 
    # and ranks them by the number of Wikipedia sitelinks (fame).
    query = """
    SELECT ?itemLabel ?coord ?architectLabel ?year ?articleCount WHERE {
      ?item wdt:P31/wdt:P279* wd:Q41176. 
      ?item wdt:P625 ?coord. 
      ?item wdt:P84 ?architect. 
      OPTIONAL { ?item wdt:P571 ?year. } 
      ?item wikibase:sitelinks ?articleCount.
      FILTER(?articleCount > 15) 
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY DESC(?articleCount)
    LIMIT 1000
    """
    
    headers = {
        'User-Agent': 'ArchExplorer_Prototype/1.0',
        'Accept': 'application/sparql-results+json'
    }
    
    response = requests.get(url, params={'query': query}, headers=headers)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        return

    results = response.json()['results']['bindings']
    print(f"Found {len(results)} iconic buildings. Formatting to GeoJSON...")

    geojson = {"type": "FeatureCollection", "features": []}

    for res in results:
        # Wikidata returns coords as "Point(lon lat)" - we need to extract the numbers
        coord_string = res['coord']['value']
        match = re.search(r'Point\(([^ ]+) ([^ ]+)\)', coord_string)
        
        if match:
            lon, lat = float(match.group(1)), float(match.group(2))
            
            # Extract year safely (Wikidata dates look like "+1889-01-01T00:00:00Z")
            year_raw = res.get('year', {}).get('value', 'Unknown')
            year = year_raw.split('-')[0].replace('+', '') if year_raw != 'Unknown' else 'Unknown'

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": {
                    "name": res['itemLabel']['value'],
                    "architect": res['architectLabel']['value'],
                    "year": year,
                    "fame_score": int(res['articleCount']['value'])
                }
            }
            geojson["features"].append(feature)

    with open('buildings.geojson', 'w', encoding='utf-8') as f:
        json.dump(geojson, f, indent=2, ensure_ascii=False)
        
    print("Success! Data saved to buildings.geojson")

if __name__ == "__main__":
    fetch_famous_buildings()