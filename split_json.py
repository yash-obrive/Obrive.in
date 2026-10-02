import json

with open('/home/yash/Obrive/Obrive/chunk_3.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

keys = list(data.keys())
chunk_size = 50
for i in range(0, len(keys), chunk_size):
    chunk_keys = keys[i:i+chunk_size]
    chunk_data = {k: data[k] for k in chunk_keys}
    with open(f'/home/yash/Obrive/Obrive/chunk_3_part_{i//chunk_size}.json', 'w', encoding='utf-8') as f:
        json.dump(chunk_data, f, indent=2)
