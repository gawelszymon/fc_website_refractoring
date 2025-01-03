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

var data = [];

async function fetchGalleryImages() {
    try {
        const response = await fetch('/get_gallery_images');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery images');
        }
        const result = await response.json();
        data = result.pictures;
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching gallery images:', error);
    }
}

await fetchGalleryImages();

var Content = function Content() {



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

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: model ? "model open" : "model" },
            React.createElement('img', { src: tempimgSrc }),
            React.createElement(
                'span',
                { className: 'close-icon', onClick: function onClick() {
                        return setModel(false);
                    } },
                '\xD7'
            )
        ),
        React.createElement(
            'div',
            { className: 'gallery' },
            data.map(function (item, index) {
                return React.createElement(
                    'div',
                    { className: 'pics', key: index, onClick: function onClick() {
                            return getImg(item.imgSrc);
                        } },
                    React.createElement('img', { src: item.imgSrc, alt: 'gallery', style: { width: '100%' } })
                );
            })
        )
    );
};

function Gallery() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            { style: { textAlign: 'center' } },
            '' //header
        ),
        React.createElement(Content, null)
    );
}

ReactDOM.render(React.createElement(Gallery, null), document.getElementById('root'));

export default Gallery;