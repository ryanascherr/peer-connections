let newVar = $(".test");

console.log(newVar);

for (let i = 0; i < newVar.length; i++) {
    console.log(newVar[i].getAttribute('data-id'))
}
