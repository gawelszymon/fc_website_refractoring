import os
from datetime import datetime
from urllib.parse import quote_plus
from flask import Flask, jsonify, render_template, request, send_from_directory, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from sqlalchemy.sql import func

app = Flask(__name__, template_folder="./templates", static_folder='./static')  #init of flask app
CORS(app)

password = quote_plus(os.getenv('DB_PASSWORD', 'STxsPDbCOqDqALnSkqJbwzVrhTcIvqEa'))
db_host = os.getenv('DB_HOST', 'autorack.proxy.rlwy.net')
db_port = os.getenv('DB_PORT', '35721')
db_name = os.getenv('DB_NAME', 'railway')
db_user = os.getenv('DB_USER', 'postgres')

#sql alchemy lets map database into the code
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:STxsPDbCOqDqALnSkqJbwzVrhTcIvqEa@autorack.proxy.rlwy.net:35721/railway'  #setting up the localization of database
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)

class Entry(db.Model):  #table's name is created based on class name, but converted to lower case
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(20), nullable=False)
    entry_type = db.Column(db.Text, nullable=False)
    
class TeamDatabase(db.Model):
    __tablename__ = 'team_database'
    id = db.Column(db.Integer, primary_key=True)
    subpage = db.Column(db.String(100), nullable=False, unique=True)
    group = db.Column(db.String(100), nullable=False)
    coach = db.Column(db.String(100), nullable=False)
    license = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    league = db.Column(db.String(100), nullable=False)
    table_url = db.Column(db.String(255), nullable=False)
    photo_endpoint = db.Column(db.String(255), nullable=False)

class Page(db.Model):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    page_name = db.Column(db.String(100), nullable=False, unique=True)
    display_name = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    
class Img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, unique=True, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)
    
class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.Text, nullable=False)
    data = db.Column(db.LargeBinary, nullable=False)
    upload_date = db.Column(db.DateTime, default=func.now())

    
with app.app_context():     #application context created, due to it- flask know to which app, current changes are refferd to, it's required because
    db.create_all()           #avability to databse needs this context, "db.create_all" it's like a safeguard for ovetwriting- not to multiplicate some content

TEAMS_PHOTOS_DIR = 'teams_photos'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/subacademy1')
def subacademy1():
    return render_template('team1.html')

@app.route('/subacademy2')
def subacademy2():
    return render_template('team2.html')

@app.route('/subacademy3')
def subacademy3():
    return render_template('team3.html')

@app.route('/subacademy4')
def subacademy4():
    return render_template('team4.html')

@app.route('/subacademy5')
def subacademy5():
    return render_template('team5.html')

@app.route('/subacademy6')
def subacademy6():
    return render_template('team6.html')

@app.route('/subacademy7')
def subacademy7():
    return render_template('team7.html')

@app.route('/subacademy8')
def subacademy8():
    return render_template('team8.html')

@app.route('/subacademy9')
def subacademy9():
    return render_template('team9.html')

@app.route('/senior')
def senior():
    return render_template('senior.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/admin_panel/password/vistula_rzaska_1925_admin_access')
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
    entries = Entry.query.order_by(Entry.timestamp.desc()).all()
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
    team = TeamDatabase.query.filter_by(subpage=group_name).first()
    if team:
        return {
            "subpage": team.subpage,
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
    
@app.route('/api/team/update', methods=['PUT'])
def update_team_data():
    data = request.get_json()
    team = TeamDatabase.query.filter_by(subpage=data['subpage']).first()

    if not team:
        return {"error": "Team not found"}, 404

    team.group = data['group']
    team.coach = data['coach']
    team.license = data['license']
    team.time = data['time']
    team.location = data['location']
    team.league = data['league']
    team.table_url = data['table_url']
    team.photo_endpoint = data['photo_endpoint']

    db.session.commit()

    return {"message": "Team data updated successfully"}

@app.route('/api/pages', methods=['GET'])
def get_pages():
    pages = Page.query.order_by(Page.page_name.asc()).all()
    return jsonify([{
        'id': page.id,
        "page_name": page.page_name,
        "display_name": page.display_name,
        "is_active": page.is_active
    } for page in pages])

@app.route('/api/pages/<int:id>', methods=['PUT'])
def update_page(id):
    page = Page.query.get(id)
    if page is None:
        return jsonify({'error': 'Page not found'}), 404

    data = request.json
    page.display_name = data.get('display_name', page.display_name)
    page.is_active = data.get('is_active', page.is_active)
    
    db.session.commit()

    return jsonify({'success': True})


@app.context_processor
def inject_pages():
    pages = Page.query.filter_by(is_active=True).all()
    return dict(pages=pages)

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not file.mimetype.startswith('image/'):
        return jsonify({'error': 'File is not an image'}), 400
    
    filename = secure_filename(file.filename)
    image_data = file.read()
    
    try:
        new_image = Images(
            image=filename,
            data=image_data,
            upload_date=datetime.now()
        )
        
        db.session.add(new_image)
        db.session.commit()
        
        return jsonify({'message': 'Image uploaded successfully', 'image_url': f'/teams_photos/{filename}'}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/download_photos')
def download_photos():
    images = Images.query.all()
    return jsonify([{
        'id': img.id,
        'name': img.image,
        'upload_date': img.upload_date.strftime('%Y-%m-%d %H:%M:%S')
    }for img in images])

port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=port, debug=True)