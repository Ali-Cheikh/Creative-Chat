// Listen for form submission
document.getElementById('submitForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Display success alert
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'wait 5 sec..',
        timer: 5000, // Set timer for 5 seconds
        timerProgressBar: true,
        onClose: () => {
            // Submit the form data after the alert is closed
            this.submit();
        }
    });
});

// Fetch data from Google Sheets
fetch('https://script.google.com/your google sheets url')
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('postsContainer');

        // Reverse the array of data
        data.reverse();

        // Iterate through the reversed data array to create HTML elements
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('message');
            postElement.innerHTML = `
            <h2>${post.name}</h2>
            <strong>
                <h3>${post.message}</h3>
            </strong>
            <p class="timestamp">${post.timestamp}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
    // Handle form submission
    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Fetch data from the form
        const formData = new FormData(this);

        try {
          // Submit form data to the server
          const response = await fetch(this.action, {
            method: 'POST',
            body: formData
          });

          // Check if the form submission was successful
          if (response.ok) {
            // Clear the form input after successful submission (optional)
            this.reset();
            // Reload the page after a successful submission
            window.location.reload();
          } else {
            console.error('Form submission failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      });
       // Function to fetch data from Google Sheets
       function fetchData() {
        fetch('https://script.google.com/your google sheets url')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const postsContainer = document.getElementById('postsContainer');

                // Reverse the array of data
                data.reverse();

                // Check if there's a difference in the data
                const currentData = JSON.stringify(data);
                const previousData = localStorage.getItem('previousData');
                if (currentData !== previousData) {
                    // Data has changed, reload the page
                    localStorage.setItem('previousData', currentData);
                    window.location.reload();
                }

                // Schedule the next data fetch in 4 seconds
                setTimeout(fetchData, 4000);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Call fetchData function initially
    fetchData();
    function checkForNewMessages() {
        fetch('https://script.google.com/your google sheets url')
            .then(response => response.json())
            .then(data => {
                // Check if there are new messages
                if (data.length > 0) {
                    // Notify the user about the new messages
                    alert('New anonymous message posted!');
                    }
                })
                .catch(error => console.error('Error checking for new messages:', error));
        }

        // Check for new messages every 30 seconds
        setInterval(checkForNewMessages, 25000);
