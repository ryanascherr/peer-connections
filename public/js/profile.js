const editProfileBtn = $(".edit-profile-btn");
const pictureSelection = $(".picture-selection");
const pictureSelectBtn = $(".picture-select-btn");
let newPath;

editProfileBtn.click(function() {
    $(".picture-selection").removeClass("hidden");
})

pictureSelection.click(function(event) {
    let element = event.target;
    if (element.matches("img")) {
        $(".profile-picture").removeClass("highlight");
        $(element).addClass("highlight");
        newPath = element.getAttribute("data-path");
        console.log(newPath);
    }
})

pictureSelectBtn.click(function() {
    console.log(newPath);
    if (!newPath) {
        alert("Please choose a picture");
        return;
    }
    document.getElementById("profile-picture").setAttribute("src", newPath);
    $(".picture-selection").addClass("hidden");
})
