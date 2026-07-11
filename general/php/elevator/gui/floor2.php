<?php session_start(); ?>

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
        <form method="post" id="floor2" target="_self" action="<?php echo $_SERVER['PHP_SELF']; ?>" onclick="buttons.submit()">  <!-- Post a self-targeting form to take new input and generate last call -->
            <div class="UI">
                <label><input type="radio" name="called_to" value="F2U" hidden required/><img src=<?php echo $_SESSION["F2up_ind"]?> width="100" alt="Up Button" title="Going Up"></label><br/>  <!-- up indicator -->
                <label><input type="radio" name="called_to" value="F2D" hidden required/><img src=<?php echo $_SESSION["F2down_ind"]?> width="100" alt="Down Button" title="Going Down"></label> <!-- down indicator -->
            </div>
        </form>
    </body>
</html>