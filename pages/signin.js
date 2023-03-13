const username = document.getElementById('username');
const password = document.getElementById('password')
const btnforsignin= document.getElementById('btnforsignin')
async function sendDataforsignin(event){
    event.preventDefault();
    let UserGivenusername = username.value;
    let UserGivenpassword = password.value;
    let res = await fetch("http://localhost:5000/signin",{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            username: UserGivenusername,
            passsword: UserGivenpassword,    
        })
    })
    let data = await res.json();
    console.log(data)
    if(data.isLogenSuccessfull){
        // login successfull
        window.location.href = 'http://127.0.0.1:5500/pages/dashboard.html';
    }else{
        // login failure
        alert("Please enter your username and password corectly")
    }

  
}
btnforsignin.addEventListener('click',sendDataforsignin)