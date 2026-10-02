from googletrans import Translator
import time

translator = Translator()
text = "Obrive is a company that uses AI, AR, VR, MR, and Spatial Computing to build experiences."
res = translator.translate(text, src='en', dest='de')
print(res.text)
