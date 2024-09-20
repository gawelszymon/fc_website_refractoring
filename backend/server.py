from datetime import datetime
import os
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS  # type: ignore #ignore
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="../frontend/templates", static_folder='../frontend/static')  #init of flask app
CORS(app)

#sql alchemy lets map database into the code
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///entries.db'  #setting up the localization of database
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)

class Entry(db.Model):  #table's name is created based on class name, but converted to lower case
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(20), nullable=False)
    entry_type = db.Column(db.Text, nullable=False)
    
class TeamDatabase(db.Model): #TODO
    id = db.Column(db.Integer, primary_key=True)
    group = db.Column(db.String(100), nullable=False)
    coach = db.Column(db.String(100), nullable=False)
    license = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    league = db.Column(db.String(100), nullable=False)
    table_url = db.Column(db.String(255), nullable=False)
    photo_endpoint = db.Column(db.String(255), nullable=False)
    
with app.app_context():     #application context created, due to it- flask know to which app, current changes are refferd to, it's required because
    db.create_all()           #avability to databse needs this context, "db.create_all" it's like a safeguard for ovetwriting- not to multiplicate some content

TEAMS_PHOTOS_DIR = 'teams_photos'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/skrzat')
def academy():
    return render_template('skrzat.html')

@app.route('/zakmlodszy')
def subacademy1():
    return render_template('zakmlodszy.html')

@app.route('/senior')
def senior():
    return render_template('senior.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/addpost_adminacces_password=lksvistularzaska')
def addpost():
    return render_template('addpost.html')

@app.route('/add_entry', methods=['POST'])
def add_entry():
    try:
        data = request.json
        
        print(data)
        
        if 'username' not in data or 'content' not in data or 'entry_type' not in data:
            return jsonify({"error": "Missing username or content"}), 400
                
        new_entry = Entry(
            username = data['username'],
            content=data['content'],
            timestamp=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            entry_type=data['entry_type']
        )
        db.session.add(new_entry)
        db.session.commit()
        
        return jsonify({"message": "Entry added successfully!"})
        
    except Exception as e:  #to print server logs
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/get_entries', methods=['GET'])
def get_entries():
    entries = Entry.query.all()
    entries_list = [{
        "id": entry.id,
        "username": entry.username,
        "content": entry.content,
        "timestamp": entry.timestamp,
        "entry_type": entry.entry_type
    } for entry in entries]
    
    return jsonify(entries_list)

@app.route('/delete_entry/<int:entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    entry = Entry.query.get(entry_id)
    if entry:
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Entry has been already delated"}), 200
    else:
        return jsonify({"error": "Entry has not been deleted"}), 404
        

@app.route('/teams_photos')
def list_images():
    files = [f for f in os.listdir(TEAMS_PHOTOS_DIR) if f.endswith('.png')]
    return jsonify(files)

@app.route('/teams_photos/<photo>')
def serve_images(photo):
    return send_from_directory(TEAMS_PHOTOS_DIR, photo) #TODO

@app.route('/api/team/<group_name>')
def get_team_data(group_name):
    team = TeamDatabase.query.filter_by(group=group_name).first()
    if team:
        return {
            "group": team.group,
            "coach": team.coach,
            "license": team.license,
            "time": team.time,
            "location": team.location,
            "league": team.league,
            "table_url": team.table_url,
            "photo_endpoint": team.photo_endpoint            
        }
    else:
        return{"error": "There is not accurate team"}, 404

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001, debug=True) #test