# python-backend/brain.py
import sys
import json

def process_command(data):
    # This is where your AI / Matrix logic will go!
    # For now, let's do a dummy financial calculation based on incoming footprint area
    bvo = data.get("area_sqm", 0)
    profit = (bvo * 2500) - (bvo * 1800) # (Yield) - (Costs)
    
    return {
        "status": "success",
        "calculated_bvo": bvo,
        "net_profit": profit,
        "recommendation": "Build" if profit > 0 else "Reject"
    }

if __name__ == '__main__':
    # Tauri sends arguments to the sidecar via the command line
    if len(sys.argv) > 1:
        try:
            input_data = json.loads(sys.argv[1])
            result = process_command(input_data)
            # Print to stdout so Tauri can capture the response
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}))