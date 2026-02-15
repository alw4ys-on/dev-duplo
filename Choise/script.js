function escolhe(sw) {
    var pic;

    if (sw == 0) {
        pic = "imgs/Captura de tela 2026-02-10 132542.jfif";
    } 
    else if (sw == 1) {
        pic = "imgs/download.jfif";
    } 
    else if (sw == 2) {
        pic = "imgs/download (1).jfif";
    }

    document.getElementById("myImage").src = pic;
}