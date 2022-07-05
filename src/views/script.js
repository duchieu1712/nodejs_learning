document.querySelector("#btnClick").onclick = function () {

    axios({
        method: 'GEt',
        url: 'http://localhost:8080/api/getUser/2',
    }).then(result => {
        console.log(result);
        document.querySelector("#ketQua").innerHTML = "abc"
    });

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    axios({
        method: 'POST',
        url: 'http://localhost:8080/api/login',
        data: {
            username: username,
            password: password
        }
    }).then(result => {
        document.querySelector("#ketQua").innerHTML = result.data
    })

}