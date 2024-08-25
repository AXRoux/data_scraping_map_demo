from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting run.py")
    print("Imported create_app")
    print("Created app")
    app.run(debug=True)