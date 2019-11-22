<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script type="text/javascript" src="validation.js"></script>
  </head>
  <body onload="todaysDate()">
    <br>
    <form class="" name="details" onsubmit="return validation_details()" action="validation_insert.php" method="post">
            <input type="text" name="id" placeholder="working_id" required><br>
            <br>
            <input type="text" name="role" placeholder="role" required><br>
            <br>

            Start: <input type="date" id="start" name="start" placeholder="">
            <br>
            <br>
            End: <input type="date" id="end" name="end" placeholder="">
            <br>
            <br>
            <input type="submit" name="submit" value="Submit">
            <br>
    </form>
    <script type="text/javascript" src="validation.js"></script>
  </body>
</html>
