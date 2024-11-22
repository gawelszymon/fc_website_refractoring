import React from 'https://unpkg.com/react/umd/react.development.js';
import ReactDOM from 'https://unpkg.com/react-dom/umd/react-dom.development.js';

function Gallery() {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Gallery</h1>
        </div>
    );
}

ReactDOM.render(<Gallery />, document.getElementById('root'));

export default Gallery;