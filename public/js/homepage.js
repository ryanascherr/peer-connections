let idOfIssue = $(".test");

console.log(idOfIssue);

for (let i = 0; i < idOfIssue.length; i++) {
    console.log(idOfIssue[i].getAttribute('data-id'))
}
