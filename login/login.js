const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
  e.preventDefault();

  alert("Logged in successfully");

  window.location.href = "../home/home.html";
});