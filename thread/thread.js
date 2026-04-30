const post = JSON.parse(localStorage.getItem("selectedPost"));

const postImage = document.getElementById("postImage");
const postMeta = document.getElementById("postMeta");
const postCategory = document.getElementById("postCategory");
const postTitle = document.getElementById("postTitle");
const postText = document.getElementById("postText");
const helpfulBtn = document.getElementById("helpfulBtn");
const helpfulCount = document.getElementById("helpfulCount");

const commentInput = document.getElementById("commentInput");
const commentBtn = document.getElementById("commentBtn");
const commentList = document.getElementById("commentList");

if(post){
  postImage.src = `../advice/image/${post.image}.jpg`;
  postMeta.innerHTML = post.meta;
  postCategory.textContent = post.category;
  postTitle.textContent = post.title;
  postText.textContent = post.short;
  helpfulCount.textContent = `helpful ${post.helpful}`;
}

helpfulBtn.addEventListener("click", () => {
  post.helpful++;
  helpfulCount.textContent = `helpful ${post.helpful}`;
});

commentBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();

  if(text === ""){
    alert("Write a comment first.");
    return;
  }

  const comment = document.createElement("div");
  comment.className = "comment";

  comment.innerHTML = `
    <p class="comment-user">@ssejinnnn</p>
    <p>${text}</p>
  `;

  commentList.prepend(comment);
  commentInput.value = "";
});