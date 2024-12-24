import os
from datetime import datetime
from urllib.parse import quote_plus

from flask import (Flask, Response, jsonify, render_template, request, send_from_directory)
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.utils import secure_filename

app = Flask(__name__, template_folder="./templates", static_folder='./static')  #init of flask app
CORS(app)

UPLOADED_PHOTOS = './uploaded_photos'
app.config['UPLOADED_PHOTOS'] = UPLOADED_PHOTOS

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
    photo = db.Column(db.Text, nullable=True)
    
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
    name = db.Column(db.String(255), nullable=False)
    path = db.Column(db.String(255), nullable=False)
    main_page = db.Column(db.Boolean, nullable=False, default=False)
    gallery = db.Column(db.Boolean, nullable=False, default=False)

    
with app.app_context():     #application context created, due to it- flask know to which app, current changes are refferd to, it's required because
    db.create_all()           #avability to databse needs this context, "db.create_all" it's like a safeguard for ovetwriting- not to multiplicate some content

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
        
        if data.get('is_pined') == 'pin':
            new_entry = Entry(
                username = data['username'],
                content=data['content'],
                timestamp='2100-10-28 15:57:24',
                entry_type=data['entry_type'],
                photo = data['photo'],
            )
        else:
            new_entry = Entry(
                username = data['username'],
                content=data['content'],
                timestamp=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                entry_type=data['entry_type'],
                photo = data['photo']
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
        "entry_type": entry.entry_type,
        "photo": entry.photo
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
    pic = request.files['pic']
    
    if not pic:
        return 'No pic uploaded!', 400
    
    filename = secure_filename(pic.filename)
    filepath = os.path.join(app.config['UPLOADED_PHOTOS'], filename)
    pic.save(filepath)
    
    img = Images(name=filename, path=filepath)
    db.session.add(img)
    db.session.commit()
    
    return 'Img has been uploaded!', 201

@app.route('/image/<int:image_id>')
def get_image(image_id):
    img = Images.query.filter_by(id=image_id).first()
    if img is None:
        return jsonify({'error': 'Image not found'}), 404

    response = send_from_directory(app.config['UPLOADED_PHOTOS'], img.name)
    return response

@app.route('/download_photos', methods=['GET'])
def download_photos():
    images = Images.query.order_by(Images.id.asc()).all()
    return jsonify([{
        'id': image.id,
        'name': image.name,
        'main_page': image.main_page,
        'gallery': image.gallery
    } for image in images])
    
@app.route('/delete_photo/<int:image_id>', methods=['DELETE'])
def delete_photo(image_id):
    img = Images.query.get(image_id)
    if img:
        file_path = os.path.join(app.config['UPLOADED_PHOTOS'], img.name)
        if os.path.exists(file_path):
            os.remove(file_path)
        db.session.delete(img)
        db.session.commit()
        return jsonify({"message": "Img has been already delated"}), 200
    else:
        return jsonify({"error": "Img has not been deleted"}), 404

@app.route('/teams_photos/<photo>')
def serve_images(photo):
    return send_from_directory(UPLOADED_PHOTOS, photo)

@app.route('/publish_main/<int:image_id>', methods=['POST'])
def publish_main(image_id):
    img = Images.query.get(image_id)
    if img:
        img.main_page = not img.main_page
        db.session.commit()
        return jsonify({
            "id": img.id,
            "main_page": img.main_page
            }), 200
    return jsonify({"error": "Img has not been changed"}), 404

@app.route('/publish_gallery/<int:image_id>', methods=['POST'])
def publish_gallery(image_id):
    img = Images.query.get(image_id)
    if img:
        img.gallery = not img.gallery
        db.session.commit()
        return jsonify({
            "id": img.id,
            "gallery": img.gallery
            }), 200
    return jsonify({"error": "Img has not been changed"}), 404

@app.route('/get_main_images', methods=['GET'])
def get_main_images():
    main_images = Images.query.filter_by(main_page=True).all()
    slides_html = ''
    for image in main_images:
        slides_html += f'''
                <div class="swiper-slide">
                    <img src="/teams_photos/{image.name}" alt="Main page image {image.id}">
                </div>
            '''
    return jsonify({"html": slides_html})

@app.route('/get_gallery_images', methods=['GET'])
def get_gallery_images():
    gallery = Images.query.filter_by(gallery=True).all()
    pictures = []
    for image in gallery:
        pictures.append({
            'id': image.id,
            'imgSrc': f'/teams_photos/{image.name}'
        })
    return jsonify({"pictures": pictures})

port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=port, debug=True)