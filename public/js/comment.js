const submitBtn = $(".field.submit-btn");

submitBtn.click(function(e) {
    e.preventDefualt();

    if ($(".comment-field").val() == "") {
        alert("Please enter some text.");
        return;
    }

    const content = $(".comment-field").val().trim();

    console.log(content);

    const response = fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.replace('/');
    //This works, but not like it should. Need to look into this later.
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert("oops");
    //   }
})