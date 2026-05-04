const cards = document.querySelectorAll(".style-card");
const mainLook = document.getElementById("mainLook");
const mainDay = document.getElementById("mainDay");
const mainUser = document.getElementById("mainUser");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.dataset.img;
    const day = card.dataset.day;
    const user = card.dataset.user;

    mainLook.style.opacity = "0";
    mainLook.style.transform = "scale(.92)";

    setTimeout(() => {
      mainLook.src = `./image/${img}.png`;
      mainDay.textContent = day;
      mainUser.textContent = user;

      mainLook.style.opacity = "1";
      mainLook.style.transform = "scale(1)";
    }, 180);

    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});