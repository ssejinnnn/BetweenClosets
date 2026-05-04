const topGrid = document.getElementById("topGrid");
const midGrid = document.getElementById("midGrid");
const smallGrid = document.getElementById("smallGrid");

const categoryButtons = document.querySelectorAll(".category-group button");
const sortButtons = document.querySelectorAll(".sort-group button");

let currentCategory = "ALL";
let currentSort = "RECENT";

let posts = [
  {
    meta:"@CLOSET_LOOP",
    title:"Should I repair it before listing?",
    short:"Small flaws are okay if they are clearly shown.",
    content:"The item has a few small flaws, but nothing major.",
    category:"REPAIR",
    helpful:32,
    date:12
  },
  {
    meta:"@MINA_ROOM",
    title:"What shoes go with a white skirt?",
    short:"Black Mary Janes or boots make it less sweet.",
    content:"I want to style a white skirt.",
    category:"STYLING",
    helpful:28,
    date:11
  },
  {
    meta:"@PEARL_INDEX",
    title:"Are pearls too formal for school?",
    short:"Not if the rest of the outfit feels casual.",
    content:"I want pearls to feel casual.",
    category:"STYLING",
    helpful:25,
    date:10
  },
  {
    meta:"@TRADE_NOTE",
    title:"How do I price a worn jacket?",
    short:"Condition matters, but styling value also counts.",
    content:"This jacket has some visible wear.",
    category:"EXCHANGE",
    helpful:20,
    date:9
  },
  {
    meta:"@STYLE_BIN",
    title:"How many hearts for a lace top?",
    short:"Price lower if it is delicate or hard to style.",
    content:"I have a lace top.",
    category:"EXCHANGE",
    helpful:18,
    date:8
  },
  {
    meta:"@YUNA_CLOSET",
    title:"Can stains still be listed?",
    short:"Yes, but write the condition honestly.",
    content:"The piece has a small stain.",
    category:"REPAIR",
    helpful:16,
    date:7
  },
  {
    meta:"@REPAIR_ROOM",
    title:"Should I lower the heart price?",
    short:"Lower it when the item needs repair.",
    content:"This item needs repair.",
    category:"REPAIR",
    helpful:14,
    date:6
  },
  {
    meta:"@CLOSET_DIARY",
    title:"What makes an item worth saving?",
    short:"A piece is valuable when someone can re-style it.",
    content:"I’m deciding what to keep.",
    category:"STYLING",
    helpful:12,
    date:5
  },
  {
    meta:"@SILK_SONG",
    title:"How do I make pearls feel casual?",
    short:"Pair pearls with denim, a tank, or a worn jacket.",
    content:"I like pearls.",
    category:"STYLING",
    helpful:34,
    date:4
  },
  {
    meta:"@SOHO_ARCHIVE",
    title:"Is ♡ x 25 fair for this top?",
    short:"If the print is strong and condition is good, it feels fair.",
    content:"The top has a strong print.",
    category:"EXCHANGE",
    helpful:30,
    date:3
  },
  {
    meta:"@STYLE_ASK",
    title:"What shoes go with a white skirt?",
    short:"Black Mary Janes or boots make it less sweet.",
    content:"I want the outfit balanced.",
    category:"STYLING",
    helpful:9,
    date:2
  },
  {
    meta:"@CLOSET_DAY",
    title:"Can stains still be listed?",
    short:"Yes, but write the condition honestly.",
    content:"I’m worried about stained clothes.",
    category:"REPAIR",
    helpful:7,
    date:1
  }
];

const availableImages = Array.from({ length: 25 }, (_, i) => i + 2);

posts = posts.map((post, index) => ({
  ...post,
  image: post.image || availableImages[index % availableImages.length]
}));

const savedPost = JSON.parse(localStorage.getItem("newBetweenClosetsPost"));

if(savedPost && savedPost.category === "SHARE"){
  posts.unshift(savedPost);
}

function cardTemplate(post){
  const isUserPost = post.meta === "@SSEJINNNN";

  return `
    <article class="post-card" data-post='${JSON.stringify(post)}'>
      ${isUserPost ? `<button class="delete-btn">×</button>` : ""}

      <div class="meta">
        ${post.meta}<br>
        <span>${post.category}</span>
      </div>

      <img 
        src="${post.imageData ? post.imageData : `./image/${post.image}.jpg`}" 
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

  while(displayPosts.length < 24){
    displayPosts = displayPosts.concat(filteredPosts);
  }

  if(displayPosts.length > 1){
    const img1 = displayPosts[0].imageData || displayPosts[0].image;
    const img2 = displayPosts[1].imageData || displayPosts[1].image;

    if(img1 === img2){
      for(let i = 2; i < displayPosts.length; i++){
        const nextImg = displayPosts[i].imageData || displayPosts[i].image;

        if(nextImg !== img1){
          [displayPosts[1], displayPosts[i]] = [displayPosts[i], displayPosts[1]];
          break;
        }
      }
    }
  }

  topGrid.innerHTML = displayPosts.slice(0, 2).map(cardTemplate).join("");
  midGrid.innerHTML = displayPosts.slice(2, 6).map(cardTemplate).join("");
  smallGrid.innerHTML = displayPosts.slice(6, 24).map(cardTemplate).join("");
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.textContent.trim();
    render();
  });
});

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    sortButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentSort = button.textContent.trim();
    render();
  });
});

render();

document.addEventListener("click", (e) => {
  if(e.target.classList.contains("delete-btn")){
    e.stopPropagation();
    localStorage.removeItem("newBetweenClosetsPost");
    location.reload();
    return;
  }

  const card = e.target.closest(".post-card");

  if(card){
    const post = JSON.parse(card.dataset.post);
    localStorage.setItem("selectedPost", JSON.stringify(post));
    window.location.href = "../thread/thread.html";
  }
});