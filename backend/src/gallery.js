var Img1 = 'static/photo2.png';
var Img2 = 'static/photo3.png';
var Img3 = 'static/szkolka_img.png';
var Img4 = 'teams_photos/1_młodzik_młodszy_img.png';
var Img5 = 'teams_photos/1_orlik_img.png';
var Img6 = 'teams_photos/1_skrzat_img.png';
var Img7 = 'teams_photos/1_żak_img.png';

var style_link = document.createElement('link');
style_link.rel = 'stylesheet';
style_link.href = 'static/gallery_react.css';
document.head.appendChild(style_link);


const Content = () => {

    let data = [
        {
            id: 1,
            imgSrc: Img1
        },
        {
            id: 2,
            imgSrc: Img2
        },
        {
            id: 3,
            imgSrc: Img3
        },
        {
            id: 4,
            imgSrc: Img4
        },
        {
            id: 5,
            imgSrc: Img5
        },
        {
            id: 6,
            imgSrc: Img6
        },
        {
            id: 7,
            imgSrc: Img7
        }
    ]

    var _React$useState = React.useState(false),
        model = _React$useState[0],
        setModel = _React$useState[1];

    var _React$useState2 = React.useState(''),
        tempimgSrc = _React$useState2[0],
        setTempImgSrc = _React$useState2[1];

    var getImg = function getImg(img) {
        setTempImgSrc(img);
        setModel(true);
    };

    return (
        <div>
        <div className={model ? "model open" : "model"}>
            <img src={tempimgSrc} />
            <span className="close-icon" onClick={() => setModel(false)}>&times;</span>
            </div>

        <div className="gallery">
            {data.map((item, index) => {
                return (
                    <div className="pics" key={index} onClick={()=> getImg(item.imgSrc)}>
                        <img src={item.imgSrc} alt="gallery" style={{width: '100%'}} />
                    </div>
                )
            })}
        </div>
        </div>
    )
}

function Gallery() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Gallery Wisla</h1>
            <Content />
        </div>
    );
}

ReactDOM.render(<Gallery />, document.getElementById('root'));

export default Gallery;