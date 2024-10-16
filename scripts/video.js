function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remaingsecond = time % 3600;
  const minitue = parseInt(remaingsecond / 60);
  remaingsecond = remaingsecond % 60;

  return `${hour} hour  ${minitue} minitue  ${remaingsecond}  second ago`;
}

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = (textVideo = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${textVideo}`
  )
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
};

const removeActiveRemove = () => {
  const buttons = document.getElementsByClassName(" category-btn");
  console.log(buttons);
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};

const categoriesVideoId = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveRemove();
      const btnActive = document.getElementById(`btn-${id}`);
      btnActive.classList.add("active");
      displayVideo(data.category);
    });
};
const videoDetails = async (videoID) => {
  console.log(videoID);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
  );
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (video) => {
  console.log(video);
  const modalDetailsContainer = document.getElementById("modal-container");
  modalDetailsContainer.innerHTML = `
  <img src='${video.thumbnail}'/>
  <p> ${video.description}</p>
  
  `;
  document.getElementById("modal_btn").click();
};

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  videoContainer.classList.remove("grid");
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class='flex flex-col justify-center items-center gap-5'><img src='./Icon.png'
    <h2 class='text-xl font-bold text-center'>No content Here </h2> </div>
    
    `;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `<figure class='h-[200px] relative'
    >
    <img
      src=${video.thumbnail}
      class='h-full w-full object-cover'
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class='absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1'>${getTimeString(
              video.others.posted_date
            )} </span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
  <div>
  <img class='w-10 h-10 rounded-full object-cover' src=${
    video.authors[0].profile_picture
  }
  </div>
  <div>
  <h2 class='font-bold'> ${video.title} </h2> 
  
  <div class='flex items-center gap-3'>
  <p class='text-gray-400'>${video.authors[0].profile_name}</p>
  ${
    video.authors[0].verified == true
      ? `<img class='w-5' src='https://img.icons8.com/?size=48&id=63760&format=png'`
      : ""
  }
  </div>
  <p><button onclick="videoDetails('${video.video_id}'
    
  )"class='btn btn-sm btn-error'> Details </button></p>
  </div>
    
  </div>`;
    videoContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const categorieContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
     <button class='btn category-btn' id='btn-${item.category_id}' onclick='categoriesVideoId(${item.category_id})'>${item.category}
     </button>
    `;

    categorieContainer.append(buttonContainer);
  });
  document.getElementById("input-search").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
  });
};
loadCatagories();
loadVideos();
