console.log("Login.js Script is connected");

document.getElementById("signin-btn").addEventListener("click",()=>{
    const usernameInput = document.getElementById("input-username");
    const userName = usernameInput.value;
    // console.log(userName);

    const passwordInput = document.getElementById("input-password");
    const passWord = passwordInput.value;
    // console.log(passWord);

    if(userName==='admin' && passWord === 'admin123'){
        alert(`Login Successfull as ${userName}`);
        window.location.assign("./home.html");
    }else{
        alert(`Login Failed.`);
        return;
    }
});