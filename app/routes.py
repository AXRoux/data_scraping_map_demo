from flask import Blueprint, render_template, jsonify
from app import get_db
from app.models import ScrapedData
from app.scraper.scraper import scrape_data, get_all_data

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/map')
def map():
    return render_template('map.html')

@main.route('/about')
def about():
    return render_template('about.html')

@main.route('/scrape')
def scrape():
    try:
        count, data = scrape_data()
        return jsonify({"success": True, "count": count, "data": [item.to_dict() for item in data]})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/stats')
def stats():
    data = get_all_data()
    return render_template('stats.html', data=data)

@main.route('/data')
def data():
    data = get_all_data()
    return render_template('data.html', data=data)

@main.route('/scrape-data', methods=['POST'])
def scrape_and_update():
    new_items_count, new_data = scrape_data()
    all_data = get_all_data()
    return jsonify({
        'new_items': new_items_count,
        'data': [item.to_dict() for item in all_data]
    })

@main.route('/get-data')
def get_data():
    all_data = get_all_data()
    return jsonify([item.to_dict() for item in all_data])