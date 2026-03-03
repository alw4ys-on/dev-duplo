<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="boot-screen">
        <div id="start">
        </div>
        <div id="logo">
            <img src="files/logo.png" alt="logo">
        </div>
    </div>
    


    <!-- validação -->
    <?php 
    $test = $_POST["test"];
    if ($test == "test") {
        echo '<h1>fsociety</h1>'; 
    } else {
        header("Location: ../index.html");
        exit();
    }
    ?>
    <script src="script.js"></script>
</body>
</html> 