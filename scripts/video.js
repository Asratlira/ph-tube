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
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
};
const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
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
          : `<span class='absolute right-2 bottom-2 bg-black text-white rounded p-1'>${getTimeString(
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
  </div>
  <div class='flex items-center gap-3'>
  <p class='text-gray-400'>${video.authors[0].profile_name}</p>
  ${
    video.authors[0].verified == true
      ? `<img class='w-5' src='https://img.icons8.com/?size=48&id=63760&format=png'`
      : ""
  }
  
  </div>
    
  </div>`;
    videoContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const categorieContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categorieContainer.append(button);
  });
};
loadCatagories();
loadVideos();
