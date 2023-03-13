const username = document.getElementById('username');
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmpassword = document.getElementById('confirmpassword')
const btnforsignup= document.getElementById('btnforsignup')

async function sendDataforsignup(event){
    event.preventDefault();
    let UserGivenusername = username.value;
    let UserGivenemail = email.value;
    let UserGivenpassword = password.value;
    let UserGivenconfirmpassword = confirmpassword.value;
    let res = await fetch("http://localhost:5000/signup",{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            username: UserGivenusername,
            email: UserGivenemail,
            passsword: UserGivenpassword,
            confirmpassword:UserGivenconfirmpassword,

            })

    })
    let data = await res.json()
    if(data.isAccountCreated){
        //isAccountCreated:true
        window.location.href = 'http://127.0.0.1:5500/pages/signin.html'
    }else{
        //isAccountCreated:false
        alert("We got an error while creating your useless account")
    }
}
btnforsignup.addEventListener('click',sendDataforsignup)