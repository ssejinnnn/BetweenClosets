const messageBtn = document.getElementById("messageBtn");
const tradeBtn = document.getElementById("tradeBtn");
const modal = document.getElementById("messageModal");
const closeMessage = document.getElementById("closeMessage");
const sendMessage = document.getElementById("sendMessage");
const sentText = document.getElementById("sentText");

messageBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

tradeBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeMessage.addEventListener("click", () => {
  modal.classList.remove("show");
});

sendMessage.addEventListener("click", () => {
  sentText.style.display = "block";
  sendMessage.textContent = "Sent";
});

modal.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.classList.remove("show");
  }
});