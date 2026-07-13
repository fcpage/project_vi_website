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
        <form method="post" id="car" target="_self" action="<?php echo $_SERVER['PHP_SELF']; ?>" onclick="buttons.submit()">
            <div class="UI">
                <label><input type="radio" name="called_to" value="C3" hidden required/><img src=<?php echo $_SESSION["CF3"]?> width="100" alt="Floor 3" title="Call to Floor 3"></label><br/> <!-- 3, please -->
                <label><input type="radio" name="called_to" value="C2" hidden required/><img src=<?php echo $_SESSION["CF2"]?> width="100" alt="Floor 2" title="Call to Floor 2"></label><br/> <!-- 2, please -->
                <label><input type="radio" name="called_to" value="C1" hidden required/><img src=<?php echo $_SESSION["CF1"]?> width="100" alt="Floor 1" title="Call to Floor 1"></label><br/> <!-- 1, please -->
            </div>
        </form>
    </body>
</html>