var img_path = "_assets/images/";

document.addEventListener("DOMContentLoaded", function(event) {
    // Get paramaters from URL
    var url = new URL(location.href);
    var searchParams = new URLSearchParams(url.search);
    var id = searchParams.get('id');

    loadEvents(id);    
    
});


function loadEvents(id)
{
    var xhttp = new XMLHttpRequest();
    var i, len, html, event, data;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;

            data = JSON.parse(this.responseText);
            len = data.events.length;
            
            if(len > 0)
            {
                html = '';
                for(i = 0; i < len; i++)
                {
                    event = data.events[i];

                    if(id && id == event.id)
                    {
                        document.getElementsByClassName("card-title")[0].innerText = event.title;
                        var imgObj = document.getElementsByClassName("card-image")[0].getElementsByTagName("img")[0];
                        imgObj.src = img_path + event.image;
                        imgObj.alt = event.title;
                        document.getElementById("date").innerText = YMDtoDate(event.date);
                        document.getElementById("avail_seats").innerText = event.available_seats;

                        break;
                    }
                    else
                    {
                        html += '<div class="card" data-search="' + event.title + '">' +
                          '<div class="card-image">' + 
                             '<img src="' + img_path + event.image + '" alt="' + event.title + '">' + 
                          '</div>' + 
                          '<div class="card-content">' + 
                             '<span class="card-title">' + event.title + '</span>' + 
                             '<p>' + 
                                '<img class="icon" src="' + img_path + 'svg/calendar-alt.svg" alt="calendar icon"> ' + YMDtoDate(event.date) + 
                             '</p>' + 
                             '<p>' + 
                                '<img class="icon" src="' + img_path + 'svg/ticket-alt.svg" alt="ticket icon"> Seats Available: ' + event.available_seats + 
                             '</p>' + 
                          '</div>' + 
                          '<div class="card-action">';

                            if(event.available_seats > 0) {
                                html += '<a href="event-detail.php?id=' + event.id + '" class="btn">Book Now</a>';
                            } else {
                                html += '<span class="btn disable">Sold Out</span>';
                            }
                        html += '</div>' + 
                       '</div>';
                   }
                }

                if(!id) {
                    document.getElementById("filterCard").innerHTML = html;
                }
            }
        }
    };
    xhttp.open("GET", "event.json", true);
    xhttp.send();
}


/* Search Filter */

function searchFunction() {
    // Declare variables
    var input, filter, filterCard, elem, i, txtValue, noResult;
    var totalFound = 0;

    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    filterCard = document.getElementById("filterCard");
    elem = filterCard.getElementsByClassName('card');
    noResult = document.getElementById('noResult');


    // Loop through all list items, and hide those that don't match the search query
    for (i = 0; i < elem.length; i++) {
        // Get title from data attribute
        txtValue = elem[i].getAttribute('data-search');

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            elem[i].style.display = "";
            totalFound++
        } else {
            elem[i].style.display = "none";
        }
    }

    // Show No Result if there are no events matching the search criteria
    if(totalFound > 0) {
        noResult.style.display = "none";
    } else {
        noResult.style.display = "";
    }

}


/* Event Booking Form Validation */

const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const seat_nos = document.getElementById("nos");
const seat_avail = document.getElementById("avail_seats");

['input', 'focus'].forEach(function(e) {
    name.addEventListener(e, function (event) {

        if(name.validity.valueMissing) {
            name.setCustomValidity("Please enter your name");
        } else if (name.validity.patternMismatch) {
            name.setCustomValidity("Only letters and spaces are allowed");
        } else {
            name.setCustomValidity("");
        }
    });

    email.addEventListener(e, function (event) {

        if(email.validity.valueMissing) {
            email.setCustomValidity("Please enter your email");
        } else if (email.validity.typeMismatch) {
            email.setCustomValidity("Invalid email");
        } else {
            email.setCustomValidity("");
        }
    });

    mobile.addEventListener(e, function (event) {

        if(mobile.validity.valueMissing) {
            mobile.setCustomValidity("Please enter your mobile number");
        } else if (mobile.validity.patternMismatch) {
            mobile.setCustomValidity("Only 10 digits are allowed");
        } else {
            mobile.setCustomValidity("");
        }
    });
});

seat_nos.addEventListener("focus", function (event) {
    if(seat_nos.validity.valueMissing) {
            seat_nos.setCustomValidity("Please enter the number of seats");
    }
});

seat_nos.addEventListener("change", function (event) {
        // Delete Attendees
        removeElementsByClass("attendees");

        if(seat_nos.validity.valueMissing) {
            seat_nos.setCustomValidity("Please enter the number of seats");
        } else if (seat_nos.value > parseInt(seat_avail.innerText)) {
            seat_nos.setCustomValidity("Number of seats selected is more than available seats");
        } else {
            seat_nos.setCustomValidity("");

            if(seat_nos.value > 1)
            {
                var attendee_html = '';
                for(var i = 2; i <= seat_nos.value; i++)
                {
                    attendee_html += '<div class="input-field inline attendees">' + 
                        '<label for="name' + i + '">Name of Attendee ' + i + ':</label>' + 
                        '<input id="name' + i + '" name="name' + i + '" type="text" required pattern="[a-zA-Z\s]+">' + 
                     '</div>';
                }

                document.getElementById("selectSeat").insertAdjacentHTML("afterend", attendee_html);
            }
        }
});

function YMDtoDate(inputDate) {
    var date = new Date(inputDate);
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}