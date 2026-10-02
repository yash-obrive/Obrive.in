import translators as ts

text = "Obrive is a company that uses AI, AR, VR, MR, and Spatial Computing to build experiences."
try:
    res = ts.translate_text(text, translator='bing', from_language='en', to_language='de')
    print("Bing:", res)
except Exception as e:
    print("Bing Error:", e)

try:
    res = ts.translate_text(text, translator='google', from_language='en', to_language='de')
    print("Google:", res)
except Exception as e:
    print("Google Error:", e)
