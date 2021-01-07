<!DOCTYPE html>
<html lang="en">
<head>
   <?php include 'head.php' ;?>

   <script type="text/javascript">
      var post_data = <?php echo json_encode($_POST); ?>;
      console.log("POST DATA");
      console.log(post_data);
   </script>
   <title>Event Booking Detail</title>
</head>
   <body id="event-detail">
      <div id="wrapper">
         <div id="head" class="bar">
            <?php //include 'header.php'; ?>
         </div>
         <div id="content">
            <?php 
            if($_POST) { ?>
               <p class="message__primary bookSuccess">Tickets booked</p>
            <?php } ?>
            <div class="card">
               <div class="card-image">
                  <img src="" alt="">
               </div>
               <div class="card-content">
                  <span class="card-title"></span>
                  <p>
                     <img class="icon" src="_assets/images/svg/calendar-alt.svg" alt="calendar icon"><span id="date"></span>
                  </p>
                  <p>
                     <img class="icon" src="_assets/images/svg/ticket-alt.svg" alt="ticket icon"> Available Seats: <span id="avail_seats"></span>
                  </p>

                  <div class="user--details">
                  	<form name="event-form" onsubmit="return validate()" method="post" action="">
      			         <div class="input-field inline">
      			            <label for="name">Name:</label>
      			            <input id="name" name="name" type="text" required pattern="[a-zA-Z\s]+">
      			         </div>

                        <div class="input-field inline">
                           <label for="email">Email:</label>
                           <input id="email" name="email" type="email" required>
                        </div>

                        <div class="input-field inline">
                           <label for="mobile">Phone Number</label>
                           <input id="mobile" name="mobile" type="text" required pattern="[1-9]{1}[0-9]{9}">
                        </div>

                        <div class="input-field inline" id="selectSeat">
                           <label for="nos">Number of Seats:</label>
                           <select id="nos" name="nos" required>
                           	<option selected="" value="">Select Seats</option>
                              <option value="1">1</option>
                           	<option value="2">2</option>
                           	<option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                           </select>
                        </div>

                        <div class="input-field">
                           <button type="submit" class="btn submit" <?php echo !empty($_POST) ? "disabled" : ""; ?>>Submit</button>
                           <button type="submit" class="btn" onclick="window.history.go(-1); return false;" <?php echo !empty($_POST) ? "disabled" : ""; ?>>Cancel</button>
                        </div>
			            </form>
                  </div>
               </div>
            </div>
         </div>
         <div id="footer" class="bar">
            <?php include 'footer.php'; ?>
         </div>
      </div>
      <?php include 'foot.php'; ?>
   </body>
</html>