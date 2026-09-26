import json

with open("/home/yash/Obrive/Obrive/src/dictionaries/chunk_5.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total keys: {len(data)}")
print(f"Total string length: {sum(len(v) for v in data.values())}")
