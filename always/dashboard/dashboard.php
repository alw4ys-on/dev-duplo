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
        echo '<h1>FSOCIETY 1.2 LTS</h1>'; 
    } else {
        header("Location: ../index.html");
        exit();
    }?>

    <main>
        <div id="main-sec">
            <div id="menu-bar">
                <h1 id="title">Hello, friend.</h1>
                <div id="bar-deco">
                    <button>_</button>
                    <button>X</button>
                </div>
            </div>
            <small>SELECIONE O PROJETO</small>
            <div id="tools">
                <a href="../node-aprendizado"><div class="icon">&#9881;</div>node</a> 
                <a href="../login/signin-front/index.html"><div class="icon">&#9881;</div>login</a> 
                <a href=""><div class="icon">X</div>xxxxx</a>
            </div>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html> 