async function loginUser() {
    try {
        console.log("1")
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await login(name, password);
        if (result.logged) {
            window.location = "index.html"
        } else {
            document.getElementById("result").innerHTML = "Wrong username or password";
        }
    } catch (err) {
        console.log(err)
    }
}


async function login(name, password) {
    try {
        const response = await fetch(`/api/users/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ player_name: name, player_password: password}) 
        });
        var  result= await response.json();
        return {logged: response.status=200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}