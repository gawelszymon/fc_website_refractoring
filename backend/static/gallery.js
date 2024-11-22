function Gallery() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            { style: { textAlign: 'center' } },
            'Gallery'
        )
    );
}

ReactDOM.render(React.createElement(Gallery, null), document.getElementById('root'));

export default Gallery;