const submitBtn = $(".issue-submit-btn");

submitBtn.click(function(e) {
    e.preventDefault();

    if ($(".issue-title-create").val() == "" || $(".issue-content-create").val() == "") {
        alert("Please enter a title and text.")
        return;
    }

    const title = $(".issue-title-create").val().trim();
    const content = $(".issue-content-create").val().trim();

    console.log(title);
    console.log(content);

    const response = fetch('/api/issues', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
    //This works, but not like it should. Need to look into this later.
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert("oops");
    //   }
})