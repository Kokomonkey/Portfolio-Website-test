import requests
import json
import re
import time

def fetch_chunk(limit, offset):
    url = 'https://query.wikidata.org/sparql'
    # Simplified query to reduce server load
    query = f"""
    SELECT ?itemLabel ?coord ?architectLabel ?year ?articleCount WHERE {{
      ?item wdt:P31/wdt:P279* wd:Q41176. 
      ?item wdt:P625 ?coord. 
      ?item wdt:P84 ?architect. 
      OPTIONAL {{ ?item wdt:P571 ?year. }} 
      ?item wikibase:sitelinks ?articleCount.
      FILTER(?articleCount > 10) 
      SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    ORDER BY DESC(?articleCount)
    LIMIT {limit} OFFSET {offset}
    """
    headers = {
        'User-Agent': 'ArchExplorerBot/1.0 (https://github.com/yourusername; mailto:your@email.com)',
        'Accept': 'application/sparql-results+json'
    }
    
    # Try up to 3 times for each chunk
    for attempt in range(3):
        try:
            response = requests.get(url, params={'query': query}, headers=headers, timeout=45)
            if response.status_code == 200:
                return response.json()['results']['bindings']
            elif response.status_code == 429: # Rate limited
                print("Rate limited. Sleeping for 10s...")
                time.sleep(10)
            else:
                print(f"Server said {response.status_code}. Retrying...")
        except Exception as e:
            print(f"Connection error: {e}. Retrying...")
        time.sleep(5)
    return []

def main():
    all_features = []
    chunk_size = 100
    total_wanted = 1000

    print(f"🚀 Starting robust harvest of {total_wanted} buildings...")

    for offset in range(0, total_wanted, chunk_size):
        print(f"Fetching buildings {offset} to {offset + chunk_size}...")
        results = fetch_chunk(chunk_size, offset)
        
        if not results:
            print("❌ Failed to get chunk. Moving on...")
            continue

        for res in results:
            coord_string = res['coord']['value']
            match = re.search(r'Point\(([^ ]+) ([^ ]+)\)', coord_string)
            if match:
                lon, lat = float(match.group(1)), float(match.group(2))
                year_raw = res.get('year', {}).get('value', 'Unknown')
                year = year_raw.split('-')[0].replace('+', '') if year_raw != 'Unknown' else 'Unknown'

                feature = {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [lon, lat]},
                    "properties": {
                        "name": res['itemLabel']['value'],
                        "architect": res['architectLabel']['value'],
                        "year": year,
                        "fame_score": int(res['articleCount']['value'])
                    }
                }
                all_features.append(feature)
        
        # Be nice to the server
        time.sleep(2)

    geojson = {"type": "FeatureCollection", "features": all_features}
    with open('buildings.geojson', 'w', encoding='utf-8') as f:
        json.dump(geojson, f, indent=2, ensure_ascii=False)
        
    print(f"✅ Finished! Saved {len(all_features)} buildings to buildings.geojson")

if __name__ == "__main__":
    main()