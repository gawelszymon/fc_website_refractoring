document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.getElementById('imageInput').files[0];
    formData.append('image', imageFile);

    try {   //i can utilize await only in async function, it lets me wait for the promise to resolve and it is more readable than using .then()
        const response = await fetch('/upload_photo', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log('Upload successful:', result);
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
});