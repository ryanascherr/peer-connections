let isLightMode = true;

$(".material-icons").click(function() {
    if (isLightMode) {
        $(".material-icons").html("brightness_2");
        isLightMode = false;
        $("body").removeClass("light-mode");
        $("body").addClass("dark-mode");
        return;
    } 
    if (isLightMode == false) {
        $(".material-icons").html("wb_sunny");
        isLightMode = true;
        $("body").removeClass("dark-mode");
        $("body").addClass("light-mode");
    }
})