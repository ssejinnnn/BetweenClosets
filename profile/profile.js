const editBtn = document.getElementById("editProfileBtn");
const saveBtn = document.getElementById("saveProfileBtn");
const cancelBtn = document.getElementById("cancelEditBtn");

const nameText = document.getElementById("profileName");
const usernameText = document.getElementById("profileUsername");
const bioText = document.getElementById("profileBio");
const heartsText = document.getElementById("profileHearts");
const profilePhoto = document.getElementById("profilePhoto");

const nameInput = document.getElementById("editName");
const usernameInput = document.getElementById("editUsername");
const bioInput = document.getElementById("editBio");
const heartsInput = document.getElementById("editHearts");
const photoInput = document.getElementById("editPhoto");

const editActions = document.getElementById("editActions");

let newPhotoData = "";

const savedProfile = JSON.parse(localStorage.getItem("betweenClosetsProfile"));

if(savedProfile){
  nameText.textContent = savedProfile.name || "Sejin Song";
  usernameText.textContent = savedProfile.username || "@ssejinnnn";
  bioText.innerHTML = (savedProfile.bio || "Loves mixing minimal pieces with vintage accents.\nMostly trading items in good condition.").replace(/\n/g, "<br>");
  heartsText.textContent = `x ${savedProfile.hearts || "52"}`;

  // QR로 저장된 사진이면 무시하고 기본 모델 사진 유지
  if(savedProfile.photo && !savedProfile.photo.includes("qr.jpg")){
    profilePhoto.src = savedProfile.photo;
  }
}

function enterEditMode(){
  nameInput.value = nameText.textContent;
  usernameInput.value = usernameText.textContent;
  bioInput.value = bioText.innerText;
  heartsInput.value = heartsText.textContent.replace("x", "").trim();

  nameText.classList.add("hidden");
  usernameText.classList.add("hidden");
  bioText.classList.add("hidden");
  heartsText.classList.add("hidden");

  nameInput.classList.remove("hidden");
  usernameInput.classList.remove("hidden");
  bioInput.classList.remove("hidden");
  heartsInput.classList.remove("hidden");

  editActions.classList.remove("hidden");
  editBtn.classList.add("hidden");
}

function exitEditMode(){
  nameText.classList.remove("hidden");
  usernameText.classList.remove("hidden");
  bioText.classList.remove("hidden");
  heartsText.classList.remove("hidden");

  nameInput.classList.add("hidden");
  usernameInput.classList.add("hidden");
  bioInput.classList.add("hidden");
  heartsInput.classList.add("hidden");

  editActions.classList.add("hidden");
  editBtn.classList.remove("hidden");
}

editBtn.addEventListener("click", enterEditMode);
cancelBtn.addEventListener("click", exitEditMode);

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    newPhotoData = reader.result;
    profilePhoto.src = newPhotoData;
  };

  reader.readAsDataURL(file);
});

saveBtn.addEventListener("click", () => {
  const updatedProfile = {
    name: nameInput.value.trim() || "Sejin Song",
    username: usernameInput.value.trim() || "@ssejinnnn",
    bio: bioInput.value.trim() || "Loves mixing minimal pieces with vintage accents.\nMostly trading items in good condition.",
    hearts: heartsInput.value.trim() || "52",
    photo: newPhotoData || profilePhoto.src
  };

  localStorage.setItem("betweenClosetsProfile", JSON.stringify(updatedProfile));

  nameText.textContent = updatedProfile.name;
  usernameText.textContent = updatedProfile.username;
  bioText.innerHTML = updatedProfile.bio.replace(/\n/g, "<br>");
  heartsText.textContent = `x ${updatedProfile.hearts}`;
  profilePhoto.src = updatedProfile.photo;

  exitEditMode();
});