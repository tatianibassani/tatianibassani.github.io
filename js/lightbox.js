// Photography Lightbox Modal JavaScript

function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Initialize modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking the X
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.onclick = closeModal;
    }

    // Close modal when clicking outside the image
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.onclick = function(event) {
            if (event.target === this) {
                closeModal();
            }
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
