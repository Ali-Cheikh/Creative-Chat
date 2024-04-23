
let previousDataLength = 0; // Variable to store the previous number of messages

// Function to fetch data from Google Sheets and update the page
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzpNLrTvH79ylnLa_pzCE07iIyHEN5nK_YBvBFG1lO5KmRnynOozlfQz_5gwO7Q7GlHbw/exec');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if new messages have been added
        if (data.length > previousDataLength) {
            const postsContainer = document.getElementById('postsContainer');
            // Clear previous posts
            postsContainer.innerHTML = '';
            // Reverse the array of data
            data.reverse();
            // Iterate through the reversed data array to create HTML elements
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('message');
                postElement.innerHTML = `
                    <strong>
                        <h3>${post.message}</h3>
                    </strong>
                    <p class="timestamp">${post.timestamp}</p>
                `;
                postsContainer.appendChild(postElement);
            });
            // Update previousDataLength
            previousDataLength = data.length;

            // Trigger custom push notification for new messages
            triggerCustomNotification("New Message", "A new message has been received.");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Schedule the next data fetch in 5 seconds
        setTimeout(fetchData, 5000);
    }
}

// Function to trigger a customized push notification
function triggerCustomNotification(title, body) {
    // Check if the Notification API is supported
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
    }

    // Request permission to show notifications
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            // Permission granted, show customized notification
            const notification = new Notification(title, { body: body });
            
            // Add event listener for notification click
            notification.addEventListener('click', function(event) {
                // Handle notification click action here
                // For example, open the webpage ourchatt.netlify.app
                window.open('https://ourchatt.netlify.app', '_blank');
            });
        }
    });
}

// Listen for form submission
document.getElementById('submitForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Submit the form data
    const formData = new FormData(this);
    // Display loading animation

    Swal.fire({
        html: '<img src="peanut.gif" style="width: 100%">',
        showConfirmButton: false,
        background: 'transparent',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 6000, // 6 seconds timer
        allowEnterKey: false
    });

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Clear the form input after successful submission (optional)
        this.reset();
    } catch (error) {
        console.error('Form submission failed:', error);
        // Display error alert if form submission fails
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Form submission failed. Please try again later.'
        });
    }
});

// Initial call to fetchData
fetchData();
