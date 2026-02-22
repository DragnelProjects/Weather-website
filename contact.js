const userFeed = document.getElementById("userFeed");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userSubj = document.getElementById("userSubj");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

    userFeed.addEventListener("submit" , (e) =>{
        e.preventDefault();

        userFeed.style.display="none";
        setTimeout(()=>{
            result.style.display="flex";
        }, 500);
    })