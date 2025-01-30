// event.js

$(document).ready(function() {
    // Initialize the calendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'Recycling Collection',
                start: '2025-02-03',
                description: 'Collection of plastics and paper.',
                url: 'https://www.google.com/calendar/render?action=TEMPLATE&text=Recycling+Collection&dates=20250203T090000Z/20250203T100000Z'
            },
            {
                title: 'Recycling Collection',
                start: '2025-02-11',
                description: 'Collection of glass and metals.',
                url: 'https://www.google.com/calendar/render?action=TEMPLATE&text=Recycling+Collection&dates=20250211T090000Z/20250211T100000Z'
            },
            {
                title: 'Recycling Collection',
                start: '2025-02-17',
                description: 'Collection of organics.',
                url: 'https://www.google.com/calendar/render?action=TEMPLATE&text=Recycling+Collection&dates=20250217T090000Z/20250217T100000Z'
            }
        ],
        eventClick: function(info) {
            alert(info.event.title + " - " + info.event.start);
        }
    });
});
