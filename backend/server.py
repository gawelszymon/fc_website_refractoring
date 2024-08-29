from flask import Flask, jsonify, render_template, request
from flask_cors import CORS # type: ignore #ignore
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__, template_folder="../frontend/templates", static_folder='../frontend/static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db' #path to database that my app is connected with
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # follow some track modification is off
db.init_app(app) #sql alchemy is like connected with my database, they collaborate

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/academy')
def academy():
    return render_template('academy.html')

@app.route('/subacademy1')
def subacademy1():
    return render_template('subacademy1.html')

@app.route('/senior')
def senior():
    return render_template('senior.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001, debug=True) #test