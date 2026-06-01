<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Elevator GUI</title>
        <link rel="stylesheet" href="../../css/gui_style.css">
    </head>
    <body>
        <?php $last=$_POST["called_from"]; ?>
        <?php $call=$_POST["called_to"]; ?>
        <?php if($call  > $last) {$direction = "UP";}
        else if ($call < $last ) {$direction = "DOWN";}
        else {$direction = "HOLD";} ?>
        <form method="post" id="buttons" target="_self" onclick="buttons.submit()">
            <label><input type="radio" name="called_to" value=11 required />Floor 3</label><br/>
            <label><input type="radio" name="called_to" value=10 required />Floor 2</label><br/>
            <label><input type="radio" name="called_to" value=01 required />Floor 1</label><br/>
            <input type="hidden" name="called_from" value="<?php echo $call; ?>" required /></form><br/>
        <b>Called to: </b> <?php echo $call; ?><br/>
        <b>Called from: </b> <?php echo $last; ?><br/>
        <b>Direction: </b> <?php echo $direction; ?>
    </body>
</html>