from newsdataapi import NewsDataApiClient
from app.models import ScrapedData
import time
from datetime import datetime, timedelta

# Initialize NewsDataAPI client
api = NewsDataApiClient(apikey="your_api_key_here")

MAX_REQUESTS_PER_DAY = 200
MAX_SITES_PER_COUNTRY = 10  # This matches the default page size of the API

class RateLimiter:
    def __init__(self):
        self.daily_request_count = 0
        self.country_request_counts = {}
        self.reset_time = datetime.now() + timedelta(days=1)

    def can_make_request(self, country):
        self._check_reset()
        if self.daily_request_count >= MAX_REQUESTS_PER_DAY:
            return False
        if country not in self.country_request_counts:
            self.country_request_counts[country] = 0
        return self.country_request_counts[country] < MAX_SITES_PER_COUNTRY

    def increment_request(self, country):
        self.daily_request_count += 1
        self.country_request_counts[country] = self.country_request_counts.get(country, 0) + 1

    def _check_reset(self):
        if datetime.now() >= self.reset_time:
            self.daily_request_count = 0
            self.country_request_counts.clear()
            self.reset_time = datetime.now() + timedelta(days=1)

rate_limiter = RateLimiter()

def scrape_data():
    countries = ['cn', 'kp', 'ru', 'br', 'ir']
    
    new_items_count = 0
    all_data = []

    for country in countries:
        print(f"Attempting to fetch data for country: {country}")
        if not rate_limiter.can_make_request(country):
            print(f"Rate limit reached for {country} or daily limit exceeded")
            continue

        try:
            # Explicitly set size to None to use the API's default
            response = api.news_api(country=country)
            
            articles = response.get('results', [])
            articles_count = len(articles)
            print(f"Fetched {articles_count} articles for country: {country}")

            if articles_count == 0:
                print(f"No articles found for {country}")
                continue

            for article in articles[:MAX_SITES_PER_COUNTRY]:
                title = article.get('title', '')
                description = article.get('description', 'No description available')
                url = article.get('link', '')
                source = article.get('source_id', '')
                category = article.get('category', ['General'])[0]
                location = f"{country.upper()} - {category}"

                new_item = ScrapedData.add(title, location, description, url, source)
                new_items_count += 1
                all_data.append(new_item)

            rate_limiter.increment_request(country)
            time.sleep(1)  # Respect API rate limits

        except Exception as e:
            print(f"Error fetching news for country: {country}: {str(e)}")
            print(f"Full error details: {repr(e)}")

    return new_items_count, all_data

def get_all_data():
    return ScrapedData.get_all()

# Call this function before scrape_data() in your route
