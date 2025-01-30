// Function to get the next event from the list
function getNextEvent(events) {
    const today = new Date();
    
    // Sort events by date
    events.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    // Find the next event that is after today's date
    return events.find(event => new Date(event.start) > today);
}

// Function to show the reminder popup
function showReminder(event) {
    if (event) {
        // Create the popup HTML
        const reminderPopup = document.createElement('div');
        reminderPopup.classList.add('reminder-popup');
        reminderPopup.innerHTML = `
            <div class="popup-content">
                <h3>Reminder: ${event.title}</h3>
                <p><strong>Date:</strong> ${new Date(event.start).toLocaleString()}</p>
                <p>${event.description}</p>
                <button id="close-popup">Close</button>
            </div>
        `;
        
        // Append popup to the body
        document.body.appendChild(reminderPopup);
        
        // Add click event to close the popup
        document.getElementById('close-popup').addEventListener('click', function() {
            reminderPopup.remove();
        });
    }
}

// This function checks if the reminder has already been shown
function checkAndShowReminder() {
    if (!localStorage.getItem('reminderShown')) {
        // The events are already defined in the event.js file, so we access them here
        const events = [
            {
                title: 'Recycling Collection',
                start: '2025-02-03',
                description: 'Collection of plastics and paper.',
            },
            {
                title: 'Recycling Collection',
                start: '2025-02-11',
                description: 'Collection of glass and metals.',
            },
            {
                title: 'Recycling Collection',
                start: '2025-02-17',
                description: 'Collection of organics.',
            }
        ];
        
        // Get the next event
        const nextEvent = getNextEvent(events);
        
        // Show reminder if there's a valid event
        if (nextEvent) {
            showReminder(nextEvent);
        }
        
        // Set localStorage so the reminder isn't shown again
        localStorage.setItem('reminderShown', true);
    }
}

// Run the reminder check when the page loads
checkAndShowReminder();