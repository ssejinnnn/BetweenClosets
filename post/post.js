const categoryButtons = document.querySelectorAll(".category");
const form = document.querySelector(".post-box");

const closetFields = document.getElementById("closetFields");

const postTitle = document.getElementById("postTitle");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const imagePreview = document.getElementById("imagePreview");

const postType = document.getElementById("postType");
const postHearts = document.getElementById("postHearts");
const postCondition = document.getElementById("postCondition");
const postExchange = document.getElementById("postExchange");
const postLocation = document.getElementById("postLocation");

let selectedPage = "closet";
let uploadedImage = "";

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    selectedPage = button.dataset.page;

    if(selectedPage === "closet"){
      closetFields.classList.remove("hidden");
    }else{
      closetFields.classList.add("hidden");
    }
  });
});

postImage.addEventListener("change", () => {
  const file = postImage.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    uploadedImage = reader.result;
    imagePreview.innerHTML = `<img src="${uploadedImage}" alt="uploaded image">`;
  };

  reader.readAsDataURL(file);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = postTitle.value.trim();
  const text = postText.value.trim();

  if(title === "" && text === ""){
    alert("Write something first.");
    return;
  }

  const newPost = {
    meta:"@SSEJINNNN",
    title:title || "New post",
    short:text || "A new post was added.",
    content:text || "A new post was added to Between Closets.",
    category:selectedPage.toUpperCase(),
    helpful:0,
    date:Date.now(),
    imageData:uploadedImage,

    type: postType.value.trim(),
    hearts: postHearts.value.trim(),
    condition: postCondition.value.trim(),
    exchange: postExchange.value.trim(),
    location: postLocation.value.trim(),
    seller:"ssejinnnn"
  };

  localStorage.setItem("newBetweenClosetsPost", JSON.stringify(newPost));

  if(selectedPage === "closet"){
    window.location.href = "../closet/closet.html";
  }

  if(selectedPage === "share"){
    window.location.href = "../advice/advice.html";
  }

  if(selectedPage === "style"){
    window.location.href = "../style/style.html";
  }
});