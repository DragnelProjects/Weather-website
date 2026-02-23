const userFeed = document.getElementById("userFeed");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userSubj = document.getElementById("userSubj");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");
const mainSec = document.getElementById("mainSec");
const loaderBox = document.getElementById("loaderBox");
const returnBtn = document.getElementById("returnBtn");

userFeed.addEventListener("submit", (e) => {
  e.preventDefault();

  mainSec.style.display = "none";

  setTimeout(() => {
    loaderBox.style.display = "flex";
  }, 200);

  setTimeout(() => {
    loaderBox.style.display = "none";
    result.style.display = "flex";
  }, 1500);
});

returnBtn.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, 400);
});
