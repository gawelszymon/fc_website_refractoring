document.addEventListener('DOMContentLoaded', () => {
    getMainImages();
});

async function getMainImages() {
    console.log('Getting main images...');
    try{
        const response = await fetch('/get_main_images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Main images:', data);
        if (data.html) {
            document.querySelector('.swiper-wrapper').innerHTML = data.html;
        }
    } catch (error) {
        console.error('Error getting main images:', error);
    }
}