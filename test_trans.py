from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='en', target='de')
text = "Obrive is a company that uses AI, AR, VR, MR, and Spatial Computing to build experiences."
print(translator.translate(text))
