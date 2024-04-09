# [**DinoWorld**](https://dino-worlds.netlify.app/)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Web App Development](#web-app-development)
4. [Our Team](#our-team)

## 1. Project Overview 

Dinoworld is an adventure based discovery about the different types of dinosaurs that have existed around the globe highlighting the characteristics of each individual dinosaurs along with the types of diet and what percentage of them eat based on their species. This webapp provides a great **all-in-one** learning tool for people of all ages and develops the knowledge and history you need to know about the dinosaurs.

## 2. Key Features

* List of 75 dinosaurs with key characteristics and description.
* A search bar for filtering out dinosaurs by name among the list.
* A pie chart depicting the percentage of dinosaurs diet (herbivorous, carnivorous, omnivorous).
* A bar chart highlighting how tall the dinosaurs are against each other.
* An interactive map page showcasing all the dinosaurs found in different countries, continents, and cities around the world.
* Responsiveness and user-friendly across all devices.

## 3. Web App Development

### [HTML](#html)

- **HTML File (index.html)**
  
  - Defines the structure of the webpage.
  - Includes links to external CSS and JavaScript files.
  - Contains elements such as header, main content, footer, and sections for hero, cards, and charts.
  - Includes placeholders for dynamic content such as card data.

### [CSS](#css)

- **CSS File (style.css)**
  
  - Defines the visual appearance of the webpage.
  - Includes styles for various sections such as header, hero section, card section, chart section, and footer.
  - Sets colors, fonts, layouts, and other visual properties.
  - Implements responsive design using media queries (@media rules).
  - Defines animations or transitions for interactive elements.

### [JavaScript](#javascript)

- **JavaScript File (app.js)**
  
  - Fetches data from a JSON file asynchronously (fetchData() function).
  - Dynamically renders cards based on the fetched data (displayCards() function).
  - Implements a "show more" functionality for the cards (loadMoreCards() function).
  - Toggles the visibility of the "Show More" button based on the number of cards displayed (toggleShowMoreButton() function).
  - Creates HTML elements for each card based on the provided data (createCardElement(card) function).
  - Implements event listeners for toggling card details visibility and loading more cards.

### [Figma](#figma)

- **UI Design:**
  
  - Designing the user interface elements such as headers, navigation bars, cards, buttons, etc., as well as defining the overall layout and visual style of the webpage.
- **Prototyping:**
  
  - Creating interactive prototypes to demonstrate the functionality and flow of the webpage, including transitions between different states and screens.
- **Collaboration:**
  
  - Allowing team members, including designers, developers, and data scientists, to collaborate on the design project, provide feedback, and iterate on the design until it meets the project requirements.

Each file contributes to different aspects of the webpage, collectively creating the user interface, functionality, and visual design. Overall, Figma serves as a comprehensive tool for designing, prototyping, and collaborating on digital projects, making it a valuable asset in the development process of websites and applications.

### [Python](#python)

- **Python File [Dino World](https://colab.research.google.com/drive/1WcM7p9ZDD7eE8Wi-FAVxHrIKSYvq9bgN#scrollTo=UDvBXkK2LbE4)**
  
  - Retrieved dinosaur data from a `dino.json` file hosted on GitHub using the requests library to fetch the data and then parsed it using the json module.
  - Utilized matplotlib to create a pie chart visualizing the distribution of dinosaur diets among different categories.
  - The team used `plotly.express` to generate a scatter map showing the geographical distribution of dinosaur findings around the world. `geopy` was employed to obtain latitude and longitude coordinates for countries listed in the dataset.
  - Employed `matplotlib` to create a horizontal bar chart illustrating the lengths of dinosaurs categorized by species.
    
Overall, the team used a combination of Python libraries such as json, requests, pandas, numpy, matplotlib, seaborn, plotly.express, and geopy to load data, create visualizations (pie chart, map, and bar chart), and handle geographical data in the dino dataset.

## 4. Our Team

- Ahmed Sohail `Data Scientist`: [GitHub](https://github.com/Ahmed-Sohail2000) / [LinkedIn](https://www.linkedin.com/in/ahmed-sohail/)
  
- Sharaf Anees `Developer`: [GitHub](https://github.com/sharafcs50) / [LinkedIn](https://www.linkedin.com/in/sharafrica/)
- Nadiia Lashtun `Developer`: [GitHub](https://github.com/Nadiia-Lashtun) / [LinkedIn](https://www.linkedin.com/in/lashtun/)
- Umer Khokhar `Developer`: [GitHub](https://github.com/Umer-Khokhar) / [LinkedIn](https://www.linkedin.com/in/umer-khokhar-642301284/)
- Florin Roșoga `Developer`: [GitHub](https://github.com/florinrosoga/) / [LinkedIn](https://www.linkedin.com/in/florinrosoga/)
  
- Kseniia Riabova `Voyage Guide`: [GitHub](https://github.com/KseniiaRiabova) / [LinkedIn](https://www.linkedin.com/in/kseniia--riabova/)
