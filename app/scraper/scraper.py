from newsapi import NewsApiClient
from app.models import ScrapedData
import time

# Initialize NewsAPI client
newsapi = NewsApiClient(api_key='')

def scrape_data():
    countries_and_languages = {
        'us': 'en',
        'br': 'pt',
        'cn': 'zh',
        'ru': 'ru',
        'gb': 'en'
    }
    categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
    
    new_items_count = 0

    for country, language in countries_and_languages.items():
        for category in categories:
            try:
                top_headlines = newsapi.get_top_headlines(
                    country=country,
                    category=category,
                    language=language,
                    page_size=100  # Adjust as needed, max is 100
                )
                
                print(f"Fetched {len(top_headlines['articles'])} articles for country: {country}, category: {category}")

                for article in top_headlines['articles']:
                    title = article['title']
                    description = article['description'] or "No description available"
                    url = article['url']
                    source = article['source']['name']
                    location = f"{country.upper()} - {category.capitalize()}"

                    # Check for existing data
                    db = ScrapedData.get_db()
                    cursor = db.execute('SELECT id FROM scraped_data WHERE name = ? AND url = ?', (title, url))
                    existing_data = cursor.fetchone()

                    if not existing_data:
                        ScrapedData.add(title, location, description, url, source)
                        new_items_count += 1

                time.sleep(1)  # Respect API rate limits

            except Exception as e:
                print(f"Error fetching news for country: {country}, category: {category}: {str(e)}")

    return new_items_count

def get_all_data():
    return ScrapedData.get_all()