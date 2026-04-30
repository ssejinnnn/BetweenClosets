const topGrid = document.getElementById("topGrid");
const midGrid = document.getElementById("midGrid");
const smallGrid = document.getElementById("smallGrid");

const postBtn = document.getElementById("postBtn");
const postTitle = document.getElementById("postTitle");
const postText = document.getElementById("postText");

const categoryButtons = document.querySelectorAll(".category-group button");
const sortButtons = document.querySelectorAll(".sort-group button");

let currentCategory = "ALL";
let currentSort = "RECENT";

let posts = [
  {
    meta:"@CLOSET_LOOP",
    title:"Should I repair it before listing?",
    short:"Small flaws are okay if they are clearly shown.",
    content:"The item has a few small flaws, but nothing major. I’m not sure if I should repair it first or list it as it is. I want it to feel honest but still appealing.",
    category:"REPAIR",
    helpful:32,
    date:12
  },
  {
    meta:"@MINA_ROOM",
    title:"What shoes go with a white skirt?",
    short:"Black Mary Janes or boots make it less sweet.",
    content:"I want to style a white skirt without making the outfit feel too sweet. I’m thinking about black Mary Janes, boots, or something heavier to balance it out.",
    category:"STYLING",
    helpful:28,
    date:11
  },
  {
    meta:"@PEARL_INDEX",
    title:"Are pearls too formal for school?",
    short:"Not if the rest of the outfit feels casual.",
    content:"I want to wear pearls to school, but I don’t want the outfit to feel too formal. Would pairing them with denim or a worn jacket make them feel more casual?",
    category:"STYLING",
    helpful:25,
    date:10
  },
  {
    meta:"@TRADE_NOTE",
    title:"How do I price a worn jacket?",
    short:"Condition matters, but styling value also counts.",
    content:"This jacket has some visible wear, but the shape is still strong. I’m not sure how many hearts feel fair when the condition is not perfect but the styling potential is good.",
    category:"EXCHANGE",
    helpful:20,
    date:9
  },
  {
    meta:"@STYLE_BIN",
    title:"How many hearts for a lace top?",
    short:"Price lower if it is delicate or hard to style.",
    content:"I have a lace top that feels delicate and a little hard to style. Should I price it lower in hearts, or does the detail make it more valuable?",
    category:"EXCHANGE",
    helpful:18,
    date:8
  },
  {
    meta:"@YUNA_CLOSET",
    title:"Can stains still be listed?",
    short:"Yes, but write the condition honestly.",
    content:"The piece has a small stain, but it is still wearable. I’m wondering if it is okay to list it as long as I clearly show the condition.",
    category:"REPAIR",
    helpful:16,
    date:7
  },
  {
    meta:"@REPAIR_ROOM",
    title:"Should I lower the heart price?",
    short:"Lower it when the item needs repair.",
    content:"This item needs a small repair before someone can wear it comfortably. Should I lower the heart price or fix it before listing?",
    category:"REPAIR",
    helpful:14,
    date:6
  },
  {
    meta:"@CLOSET_DIARY",
    title:"What makes an item worth saving?",
    short:"A piece is valuable when someone can re-style it.",
    content:"I’m trying to decide which pieces to keep in circulation. What makes an item worth saving instead of leaving it unused in a closet?",
    category:"STYLING",
    helpful:12,
    date:5
  },
  {
    meta:"@SILK_SONG",
    title:"How do I make pearls feel casual?",
    short:"Pair pearls with denim, a tank, or a worn jacket.",
    content:"I like pearls, but I don’t want them to feel too polished. I want to style them with something relaxed, like denim or a simple tank.",
    category:"STYLING",
    helpful:34,
    date:4
  },
  {
    meta:"@SOHO_ARCHIVE",
    title:"Is ♡ x 25 fair for this top?",
    short:"If the print is strong and condition is good, it feels fair.",
    content:"The top has a strong print and the condition is still good. I’m thinking of listing it for ♡ x 25, but I want the price to feel fair.",
    category:"EXCHANGE",
    helpful:30,
    date:3
  },
  {
    meta:"@STYLE_ASK",
    title:"What shoes go with a white skirt?",
    short:"Black Mary Janes or boots make it less sweet.",
    content:"I want the outfit to feel balanced, not too soft. Would darker shoes make the white skirt feel more grounded?",
    category:"STYLING",
    helpful:9,
    date:2
  },
  {
    meta:"@CLOSET_DAY",
    title:"Can stains still be listed?",
    short:"Yes, but write the condition honestly.",
    content:"I’m worried that listing stained clothes feels wrong. But if the stain is small and visible in the photo, is it still okay to share?",
    category:"REPAIR",
    helpful:7,
    date:1
  }
];

/* 이미지 2.jpg ~ 26.jpg 자동 사용 */
const availableImages = Array.from({ length: 25 }, (_, i) => i + 2);

posts = posts.map((post, index) => ({
  ...post,
  image: availableImages[index % availableImages.length]
}));

function cardTemplate(post){
  return `
    <article class="post-card" data-post='${JSON.stringify(post)}'>
      <div class="meta">
        ${post.meta}<br>
        <span>${post.category}</span>
      </div>

      <img 
        src="./image/${post.image}.jpg" 
        alt="post image"
        onerror="this.src='./image/2.jpg'"
      >

      <div>
        <h3>${post.title}</h3>
        <p class="short">${post.short}</p>
      </div>
    </article>
  `;
}

function getFilteredAndSortedPosts(){
  let result = [...posts];

  if(currentCategory !== "ALL"){
    result = result.filter(post => post.category === currentCategory);
  }

  if(currentSort === "RECENT"){
    result.sort((a, b) => b.date - a.date);
  }

  if(currentSort === "MOST HELPFUL"){
    result.sort((a, b) => b.helpful - a.helpful);
  }

  return result;
}

function render(){
  const filteredPosts = getFilteredAndSortedPosts();

  if(filteredPosts.length === 0){
    topGrid.innerHTML = "";
    midGrid.innerHTML = "";
    smallGrid.innerHTML = "";
    return;
  }

  let displayPosts = [...filteredPosts];

  while(displayPosts.length < 23){
    displayPosts = displayPosts.concat(filteredPosts);
  }

  topGrid.innerHTML = displayPosts
    .slice(0, 1)
    .map(cardTemplate)
    .join("");

  midGrid.innerHTML = displayPosts
    .slice(1, 5)
    .map(cardTemplate)
    .join("");

  smallGrid.innerHTML = displayPosts
    .slice(5, 23)
    .map(cardTemplate)
    .join("");
}

/* category filter */
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.textContent.trim();
    render();
  });
});

/* sort */
sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    sortButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentSort = button.textContent.trim();
    render();
  });
});

/* new post */
postBtn.addEventListener("click", () => {
  const title = postTitle.value.trim();
  const text = postText.value.trim();

  if(title === "" && text === ""){
    alert("Write a thread first.");
    return;
  }

  posts.unshift({
    meta:"@SSEJINNNN",
    title:title || "New advice question",
    short:text || "Waiting for closet advice.",
    content:text || "I just added a new question and I’m waiting for advice from the community.",
    category:"STYLING",
    helpful:0,
    date:posts.length + 20,
    image:availableImages[Math.floor(Math.random() * availableImages.length)]
  });

  postTitle.value = "";
  postText.value = "";

  currentCategory = "ALL";
  currentSort = "RECENT";

  categoryButtons.forEach(btn => btn.classList.remove("active"));
  sortButtons.forEach(btn => btn.classList.remove("active"));

  categoryButtons[0].classList.add("active");
  sortButtons[0].classList.add("active");

  render();
});

render();

/* click card -> thread page */
document.addEventListener("click", (e) => {
  const card = e.target.closest(".post-card");

  if(card){
    const post = JSON.parse(card.dataset.post);
    localStorage.setItem("selectedPost", JSON.stringify(post));
    window.location.href = "../thread/thread.html";
  }
});