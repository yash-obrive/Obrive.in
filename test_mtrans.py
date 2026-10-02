from mtranslate import translate

text = "Obrive is a company that uses AI, AR, VR, MR, and Spatial Computing to build experiences."
res = translate(text, "de", "en")
print(res)
