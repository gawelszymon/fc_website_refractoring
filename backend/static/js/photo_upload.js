document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', uploadPhoto);

    window.deleteImage = deleteImage;
    window.publishMain = publishMain;
    window.publishGallery = publishGallery;

    downloadPhotos();
    downloadPostPhotos();
});

async function uploadPhoto(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);

    try {
        const response = await fetch('/upload_photo', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Image uploaded successfully!');
            window.location.reload();
        } else {
            alert('Failed to upload image.');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
    }
}

async function downloadPhotos() {
    try {
        const response = await fetch('/download_photos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to download photos.');
        }

        const photos = await response.json();
        const imagesGrid = document.getElementById('imagesGrid');
        imagesGrid.innerHTML = '';

        photos.forEach(img => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img-container';

            const mpButtonColor = img.main_page ? 'blue' : 'gray';
            const gaButtonColor = img.gallery ? 'blue' : 'gray';

            imgContainer.innerHTML = `
                <p>ID: ${img.id}</p>
                <p>Name: ${img.name}</p>
                <button onclick="deleteImage(${img.id})">RM</button>
                <button onclick="publishMain(${img.id})" style="background-color: ${mpButtonColor}">MP</button>
                <button onclick="publishGallery(${img.id})" style="background-color: ${gaButtonColor}">GA</button>
            `;
            imagesGrid.appendChild(imgContainer);
        });
    } catch (error) {
        console.error('Error downloading photos:', error);
        alert('An error occurred while downloading photos.');
    }
}


async function deleteImage(imageId) {
    try {
        const response = await fetch(`/delete_photo/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete photo.');
        }

        alert('Image deleted successfully!');
        downloadPhotos();

    } catch (error) {
        console.error('Error deleting image:', error);
        alert('An error occurred while deleting the image.');
    }
}

async function publishMain(imageId) {
    try {
        const response = await fetch(`/publish_main/${imageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to publish main.');
        }

        await downloadPhotos();
        
    } catch (error) {
        console.error('Error publishing main:', error);
        alert('An error occurred while publishing main.');
    }
}

async function publishGallery(imageId) {
    try {
        const response = await fetch(`/publish_gallery/${imageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to publish gallery.');
        }

        await downloadPhotos();
        
    } catch (error) {
        console.error('Error publishing gallery:', error);
        alert('An error occurred while publishing gallery.');
    }
}

async function downloadPostPhotos() {
    try {
        const response = await fetch('/download_photos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to download photos.');
        }

        const photos = await response.json();
        const selectElementphotos = document.getElementById('add_post_photo');

        photos.forEach(photo => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = `/teams_photos/${photo.name}`;
            label.textContent = photo.name;
            label.prepend(checkbox);
            selectElementphotos.appendChild(label)
        });
    } catch (error) {
        console.error('Error downloading photos:', error);
    }
}
