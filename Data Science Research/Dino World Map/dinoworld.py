
# lets plot the dinosaurs found in different countries on a map using plotly
import plotly.express as px
import pandas as pd
!pip install geopy
from geopy.geocoders import Nominatim
import plotly.io as pio
# import json, requests, pandas, numpy, matplotlib
import json, requests
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
%matplotlib inline

# setup the json url
dino_url = 'https://raw.githubusercontent.com/chingu-voyages/voyage-project-tier1-dinosaurs/main/assets/dinosaurs.json'
response = requests.get(dino_url)

# open the file
dino_data = json.loads(response.text)

# create a dataframe
dino_data = pd.DataFrame(dino_data)

# create a function to get the latitude and longitude of the country
def get_lat_lon(country):
  geolocator = Nominatim(user_agent = 'dino_map')
  location = geolocator.geocode(country)

  if location:
    return location.latitude, location.longitude

  else:
    return None, None

# get latitude and longitude for each country and add it into the dino data
dino_data['Latitude'], dino_data['Longitude'] = zip(*dino_data['foundIn'].apply(get_lat_lon))

# remove the rows with missing coordinates
dino_data = dino_data.dropna()

# create the scatter map. we will choose the foundin column from the dino data
fig = px.scatter_geo(dino_data['foundIn'], lat = dino_data['Latitude'], lon = dino_data['Longitude'], color = 'foundIn', hover_name = 'foundIn', title = 'Dinosaurs found around the world', size_max = 5)

# change the background color and make the title bold
fig.update_layout({'plot_bgcolor': 'rgba(0, 0, 0, 0)', 'paper_bgcolor': 'rgba(0, 0, 0, 0)'})
fig.update_layout(title = {'text' :'Dinosaurs found around the world',
                           'font' : {'size' : 20, 'family' : 'Arial', 'color' : 'black'},
                           'x': 0.5, 'y': 0.95, 'xanchor': 'center', 'yanchor': 'top'})

fig.show()

# export it as a html file
pio.write_html(fig, file = 'dinosaurs around the world.html', auto_open = True)
