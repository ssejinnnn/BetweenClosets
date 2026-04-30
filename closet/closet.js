const items = [
  // TOP
  { name:"Animal Top", category:"top", hearts:12, date:30, description:"soft printed top", image:"./image/top/Animal Top.jpg" },
  { name:"Blue Top", category:"top", hearts:18, date:28, description:"denim corset top", image:"./image/top/Blue Top.jpg" },
  { name:"Bunny Top", category:"top", hearts:7, date:24, description:"graphic black top", image:"./image/top/Bunny Top.jpg" },
  { name:"Cherry Top", category:"top", hearts:25, date:31, description:"pink cherry tank", image:"./image/top/Cherry Top.jpg" },
  { name:"Flower Top", category:"top", hearts:14, date:22, description:"floral lace camisole", image:"./image/top/Flower top.jpg" },
  { name:"Green Top", category:"top", hearts:32, date:29, description:"green printed top", image:"./image/top/Green Top.webp" },
  { name:"Heart Top", category:"top", hearts:9, date:20, description:"cream heart top", image:"./image/top/Heart Top.webp" },
  { name:"Lace Top", category:"top", hearts:21, date:27, description:"halter lace top", image:"./image/top/Lace Top.avif" },
  { name:"Orange Top", category:"top", hearts:16, date:23, description:"structured orange top", image:"./image/top/Orange Top.jpg" },
  { name:"Ribbon Top", category:"top", hearts:28, date:26, description:"ribbon camisole", image:"./image/top/Ribbon Top.jpg" },

  // BOTTOM
  { name:"Short Skirt Belt", category:"bottom", hearts:11, date:19, description:"black belted skirt", image:"./image/bottom/Short Skirt Belt.webp" },
  { name:"Cherry Skirt", category:"bottom", hearts:19, date:25, description:"white cherry skirt", image:"./image/bottom/Cherry Skirt.jpg" },
  { name:"Cuffed Jeans", category:"bottom", hearts:22, date:18, description:"dark cuffed jeans", image:"./image/bottom/cuffed jeans.webp" },
  { name:"Dot Skirt", category:"bottom", hearts:13, date:17, description:"black dot mini skirt", image:"./image/bottom/Dot Skirt.webp" },
  { name:"Flared Jeans", category:"bottom", hearts:27, date:21, description:"dark flared jeans", image:"./image/bottom/Flared Jeans.jpg" },
  { name:"Flower Skirt", category:"bottom", hearts:8, date:16, description:"pink floral mini skirt", image:"./image/bottom/Flower Skirt.jpg" },
  { name:"Jeans", category:"bottom", hearts:17, date:15, description:"blue low-rise jeans", image:"./image/bottom/Jeans.jpg" },
  { name:"Lace Shorts", category:"bottom", hearts:30, date:14, description:"black lace shorts", image:"./image/bottom/lace shorts.jpg" },
  { name:"Low Waisted Shorts", category:"bottom", hearts:15, date:13, description:"white mini shorts", image:"./image/bottom/Low waisted shorts.webp" },
  { name:"Pink Skirt", category:"bottom", hearts:24, date:12, description:"soft pink skirt", image:"./image/bottom/Pink Skirt.jpg" },
  { name:"Ribbon Skirt", category:"bottom", hearts:10, date:11, description:"pink ribbon skirt", image:"./image/bottom/Ribbon Skirt.jpg" },
  { name:"Silver Pants", category:"bottom", hearts:34, date:10, description:"metallic silver pants", image:"./image/bottom/silverpants.png" },
  { name:"Skirt", category:"bottom", hearts:20, date:9, description:"dark denim skirt", image:"./image/bottom/skirt.jpg" },

  // ACC
  { name:"Crystal Bow", category:"acc", hearts:26, date:8, description:"skinny crystal bow", image:"./image/acc/Avril Crystal Skinny Bow.webp" },
  { name:"Black Belt", category:"acc", hearts:18, date:7, description:"lace belt accessory", image:"./image/acc/belt.jpg" },
  { name:"Brown Bag", category:"acc", hearts:31, date:6, description:"small brown handbag", image:"./image/acc/brown bag.jpg" },
  { name:"Headphones", category:"acc", hearts:23, date:5, description:"cream headphones", image:"./image/acc/Headphones.jpg" },
  { name:"Metal Collar Necklace", category:"acc", hearts:29, date:4, description:"minimal silver collar", image:"./image/acc/Metal Collar Necklace.webp" },
  { name:"Phone Case", category:"acc", hearts:6, date:3, description:"brown phone case", image:"./image/acc/phonecase.jpg" },
  { name:"Purple Sunglasses", category:"acc", hearts:33, date:2, description:"purple lens glasses", image:"./image/acc/purplesunglasses.jpg" },
  { name:"Silver Tie", category:"acc", hearts:14, date:1, description:"metallic silver tie", image:"./image/acc/silver tie.jpg" },
  { 
    name:"Vivienne Westwood Pearl Necklace", 
    category:"acc", 
    hearts:36, 
    date:33, 
    description:"pearl orb necklace",
    detailDescription:"A pearl necklace featuring the iconic orb pendant. Gently used and kept in good condition. This piece can be exchanged through hearts and styled with both casual and formal outfits.",
    image:"./image/acc/viviannewestwoodnecklace.jpg" 
  },
  { name:"Pearl Watch", category:"acc", hearts:22, date:32, description:"white pearl watch", image:"./image/acc/watch.jpg" }
];

const grid = document.getElementById("grid");
const filterButtons = document.querySelectorAll(".filter");
const sortButtons = document.querySelectorAll(".sort");

let currentCategory = "all";
let currentSort = "recent";

function renderItems(){
  grid.innerHTML = "";

  let filteredItems = [...items];

  if(currentCategory !== "all"){
    filteredItems = filteredItems.filter(item => item.category === currentCategory);
  }

  if(currentSort === "recent"){
    filteredItems.sort((a, b) => b.date - a.date);
  }

  if(currentSort === "low"){
    filteredItems.sort((a, b) => a.hearts - b.hearts);
  }

  if(currentSort === "high" || currentSort === "liked"){
    filteredItems.sort((a, b) => b.hearts - a.hearts);
  }

  filteredItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="price">♡ x ${item.hearts}</div>

      <div class="image-wrap">
        <img src="${item.image}" alt="${item.name}">
      </div>

      <div class="info">
        <p class="name">${item.name}</p>
        <p class="desc">${item.description}</p>
      </div>
    `;

    const price = card.querySelector(".price");

    price.addEventListener("click", (event) => {
      event.stopPropagation();
      item.hearts++;
      price.innerHTML = `♡ x ${item.hearts}`;
    });

    card.addEventListener("click", () => {
      localStorage.setItem("selectedItem", JSON.stringify(item));
      window.location.href = "../detail/detail.html";
    });

    grid.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    renderItems();
  });
});

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    sortButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentSort = button.dataset.sort;
    renderItems();
  });
});

renderItems();