from flask import Flask, jsonify, render_template, request
from flask_cors import CORS # type: ignore #ignore

app = Flask(__name__, template_folder="../frontend/templates", static_folder='../frontend/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/academy')
def academy():
    return render_template('academy.html')

@app.route('/senior')
def senior():
    return render_template('senior.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)