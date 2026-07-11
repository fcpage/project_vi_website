<?php session_start();

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Elevator GUI</title>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="This is the gui mechanism for our project" />
        <meta http-equiv="author" content="Fergus Page" />
        <meta name="robots" content="noindex nofollow" />
        <meta http-equiv="pragma" content="no-cache" />

        <link rel="stylesheet" href="../../../css/elevator/gui_style.css">
    </head>
    <body>
        <form method="post" id="floor1" target="_self" action="./gui.php" onclick="buttons.submit()">  <!-- Post a self-targeting form to take new input and generate last call -->
            <div class="UI">
                <label><input type="radio" name="called_to" value="F1U" hidden required/><img src=<?php echo $_SESSION["F1"]?> width="100" alt="Up Button" title="Going Up"></label><br/>  <!-- up indicator -->
            </div>
        </form>
    </body>
</html>