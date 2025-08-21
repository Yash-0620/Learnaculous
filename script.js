document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.close-button');
    const openModalButtons = document.querySelectorAll(
        '.approach-button.primary, .approach-button.secondary, .custom-subject-link, .button.primary'
    );
    const form = document.querySelector('.modal-content form');
    const heading = document.querySelector('.modal-content h3'); // Select the heading

    const openModal = () => {
        modal.style.display = 'flex';
        // Ensure form and heading are visible when modal opens
        form.style.display = '';
        heading.style.display = '';
    };

    const closeModal = () => {
        modal.style.display = 'none';
        // Reset form fields when closing
        form.reset();
        // Hide the success message
        const successMessage = document.getElementById('formSuccessMessage');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form Submission Handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default page reload
        const status = document.createElement('div');
        status.id = 'formSuccessMessage';
        status.style.color = '#4CAF50';
        status.style.textAlign = 'center';
        status.textContent = 'Thanks for your submission! We will contact you shortly.';

        // Use Fetch API to send form data
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                heading.style.display = 'none'; // Hide the heading
                form.style.display = 'none'; // Hide the form
                modal.querySelector('.modal-content').appendChild(status);
            } else {
                status.textContent = 'Oops! There was a problem submitting your form.';
                status.style.color = '#f44336';
                modal.querySelector('.modal-content').appendChild(status);
            }
        } catch (error) {
            console.error('Error:', error);
            status.textContent = 'An error occurred. Please try again later.';
            status.style.color = '#f44336';
            modal.querySelector('.modal-content').appendChild(status);
        }
    });
});