<!DOCTYPE html>
<html>
    <head>
        <meta charset = "UTF-8">
        <title>Holiday Booking Form</title>
    </head>
    <body>
        <form action = "bookingconfirmation.html" method = "GET">
            <fieldset>
                <legend>Personal Details: </legend>
                <label for = "name" >Username: </label><input type = "text" name = "username" id = "name" required autofocus placeholder = "Your username" pattern = "[a-zA-Z]{3,}" title = "Please enter in more than 3 letters">
                <label for = "email">Email: </label><input type = "text" name = "email" id = "email" required placeholder = "Your Email" pattern = "[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}" title = "Please enter in a valid email address">

            </fieldset>
            <br>
            <fieldset>
                    <legend>Booking Details: </legend>
                    <label for = "date">Booking date: </label><input id="date" type = "date" name = "date" min = "2019-11-22">
                    <br>
                    <input type = "image" src ="images/submit-button-red.png" alt="Submit">
            </fieldset>
        </form>
    </body>
</html>   