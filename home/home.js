const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  document.body.classList.add("open");

  setTimeout(() => {
    window.location.href = "../closet/closet.html";
  }, 900);
});