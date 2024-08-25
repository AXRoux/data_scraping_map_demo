# DataScraperMap

## Project Overview

DataScraperMap is an educational web application that demonstrates the power of data scraping, API integration, and interactive data visualization. This project fetches real-time news data from various countries using the NewsAPI and displays it on an interactive world map.

## Hackable Playground

You have full permission to make any changes you want, don't be afraid to push the boundaries of your imagination.

## Key Features

- Fetches top headlines from multiple countries (US, Brazil, China, Russia, UK)
- Categorizes news articles (business, entertainment, general, health, science, sports, technology)
- Displays news data on an interactive map using Leaflet.js
- Implements clustering for better data visualization
- Provides a user-friendly interface for exploring global news trends

## Technologies Used

- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript
- Map Visualization: Leaflet.js
- Data Source: NewsAPI
- Database: SQLite (for storing scraped data)

## Educational Aspects

This project serves as a practical example of:

1. **API Integration**: Learn how to work with RESTful APIs and handle JSON responses.
2. **Data Scraping Ethics**: Understand the importance of respecting rate limits and terms of service when scraping data.
3. **Data Processing**: See how raw API data is transformed and categorized for meaningful visualization.
4. **Web Development**: Gain insights into building a full-stack web application using Flask.
5. **Interactive Data Visualization**: Learn how to use Leaflet.js to create engaging map-based visualizations.
6. **Database Management**: Understand basic database operations for storing and retrieving scraped data.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/AXRoux/data_scraping_map_demo.git
   cd data_scraping_map_demo
   ```

2. Set up a virtual environment:
   ```
   For Windows
   
   python -m venv venv
   venv\Scripts\activate.bat or .\venv\Scripts\Activate.ps1
   ```
   ```
   For Linux
   
   python -m venv venv
   source venv/bin/activate or . venv/bin/activate
   ```
   

3. Install required packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up your NewsAPI key:
   - Sign up for a free API key at [NewsAPI](https://newsapi.org/)
   - Create a `.env` file in the project root and add your API key:
     ```
     Setup api key in scraper.py
     ```

5. Initialize the database:
   ```
   python init_db.py
   ```

6. Run the application:
   ```
   flask run or python run.py
   ```

7. Open a web browser and navigate to `http://localhost:5000`

## Project Structure

- `app/`: Main application directory
  - `models.py`: Database models
  - `routes.py`: Flask routes
  - `scraper/`: Contains scraping logic
    - `scraper.py`: NewsAPI integration and data fetching
  - `static/`: Static files (CSS, JS)
  - `templates/`: HTML templates
- `config.py`: Configuration settings
- `run.py`: Application entry point

## How It Works

1. **Data Scraping**: The application uses NewsAPI to fetch top headlines from specified countries and categories.
2. **Data Processing**: Fetched news articles are processed and stored in the database.
3. **Data Visualization**: The frontend retrieves the stored data and displays it on an interactive map.
4. **User Interaction**: Users can click on map markers to view news headlines and details for each location.

## Customization

- To add more countries, update the `countries_and_languages` dictionary in `app/scraper/scraper.py`.
- Modify the categories list in `app/scraper/scraper.py` to change news categories.
- Adjust map settings in `app/static/js/map.js` to customize the map view.

## Ethical Considerations

- Always respect the API's rate limits and terms of service.
- Be mindful of the data you're scraping and how you're using it.
- Consider the impact of your scraping on the source website's servers.

## Future Enhancements

- Implement user authentication for personalized news feeds.
- Add sentiment analysis to categorize news articles by tone.
- Integrate multiple news sources for a more comprehensive view.
- Implement real-time updates using WebSockets.

## Contributing

Contributions to improve DataScraperMap are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is open-source and available under the MIT License.
