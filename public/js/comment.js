const submitBtn = $(".field-submit-btn");
const btnID = submitBtn.data('id');

submitBtn.click(function(e) {
    e.preventDefault();

    if ($(".comment-field").val() == "") {
        alert("Please enter some text.");
        return;
    }

    const content = $(".comment-field").val().trim();

    console.log(content);
    console.log(btnID);

    const response = fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, btnID }),
        headers: { 'Content-Type': 'application/json' }
    });
    //maybe refresh
    document.location.reload();
    console.log("Success");
    //This works, but not like it should. Need to look into this later.
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert("oops");
    //   }
})