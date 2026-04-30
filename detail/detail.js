const item = JSON.parse(localStorage.getItem("selectedItem"));

const seller = {
  name: "Mina Lee",
  username: "soho_archive",
  bio: "Curating soft vintage pieces, silver accessories, and closet stories.",
  hearts: 248,
  reviews: 18
};

if(item){
  document.getElementById("itemImage").src = "." + item.image;
  document.getElementById("itemName").textContent = item.name;
  document.getElementById("itemCategory").textContent = item.category;
  document.getElementById("itemHearts").textContent = `x ${item.hearts}`;

  document.getElementById("itemDescription").textContent =
    item.detailDescription || `${item.description}. This piece can be exchanged through hearts and styled with other shared closet items.`;
}

/* auto date */
const today = new Date();
const options = { month: "short", day: "numeric", year: "numeric" };
document.getElementById("listedDate").textContent = today.toLocaleDateString("en-US", options);

/* seller profile link */
function goSeller(){
  localStorage.setItem("selectedSeller", JSON.stringify(seller));
  window.location.href = "../seller/seller.html";
}

document.getElementById("sellerLink").addEventListener("click", goSeller);
document.getElementById("viewSellerBtn").addEventListener("click", goSeller);

/* modal */
const requestBtn = document.getElementById("requestBtn");
const modal = document.getElementById("exchangeModal");
const closeModal = document.getElementById("closeModal");
const confirmBtn = document.querySelector(".modal-confirm");

requestBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

confirmBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.classList.remove("show");
  }
});