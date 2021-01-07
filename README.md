## Requirements: Event booking application

# Application details
- Create an application that lists events and the ability to book tickets for that event.
- The application has 2 pages - event listing and event booking.
- The application should be mobile responsive.
- There is a search input on the top of the listing with placeholder - “SEARCH EVENTS”.
- The events are listed in a grid of 4 columns (single column in mobile view).
- Each event block has a name, image, date of the event, the number of seats available for the event and "Book Now" button.
- The events data is fetched from a JSON file through an HTTP request. This could be a local JSON file.
- Events start filtering as soon as the user starts entering letters in the Search input.
- The search is done only on the name of the event, on all the events(independent of the availability of the seats)
- If the search doesn't produce results, "No results found!" is displayed in the listing area.
- In the event block, if seats are available, "Book Now" button is shown. On clicking the "Book Now" button of an event, the user is redirected to the Event booking page.
- If the seats are not available for the event, there should be no "Book Now" button on the event block. In place of "Book Now" button, "Sold Out" text is shown.
