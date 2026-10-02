import translators as ts

texts = ["Hello world", "Spatial Computing is great", "I love AI"]
delim = " ||| "
combined = delim.join(texts)
print(combined)
res = ts.translate_text(combined, translator='google', from_language='en', to_language='de')
print(res)
print(res.split(delim))
