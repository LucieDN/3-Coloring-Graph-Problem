import json
from pyprojroot import here

def load_config():
    with open(here("config.json")) as json_config:
        return json.load(json_config)