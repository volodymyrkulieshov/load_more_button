const elements = {
  loadMoreBtn: document.querySelector(".js-load-more"),
  list: document.querySelector(".js-movie-list"),
};
let page = 1;
elements.loadMoreBtn.addEventListener("click", handlerLoadMore);

servisMovie(page)
  .then((data) => {
    console.log(data);
    elements.list.insertAdjacentHTML("beforeend", createMarup(data.results));
    if (data.total_pages > data.page) {
      elements.loadMoreBtn.classList.remove("load-more-hidden");
    }
  })
  .catch((error) => console.log(error));

function handlerLoadMore() {
  page += 1;

  servisMovie(page)
    .then((data) => {
      elements.list.insertAdjacentHTML("beforeend", createMarup(data.results));
      if (data.page >= 500) {
        elements.loadMoreBtn.classList.add("load-more-hidden");
      }
    })
    .catch((error) => console.log(error));
}

function servisMovie(page = 1) {
  const BASE_URL = "https://api.themoviedb.org/3";
  const END_POINT = "/trending/person/week";
  const API_KYE = "55a48febb45b5475689763bd95744d57";
  const params = new URLSearchParams({
    api_key: API_KYE,
    page,
  });
  //   console.log(params.toString());
  return fetch(`${BASE_URL}${END_POINT}?${params}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
// --------------FILMS---------------------------

// function createMarup(arr) {
//   return arr
//     .map(
//       ({ poster_path, original_title, release_date, vote_average }) => `
// <li class= "movie-card">
// <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
// <div class="movie-info">
// <h2>${original_title}</h2>
// <p>Release Date: ${release_date}</p>
// <p>Vote Average: ${vote_average}</p>
// </div>
// </li>`
//     )
//     .join("");
// }
// ------------ACTORS---------------------------
function createMarup(arr) {
  return arr
    .map(
      ({
        profile_path,
        original_name,
        known_for: {
          0: { title, vote_average },
        },
        popularity,
      }) => `
<li class= "movie-card">
<img src="https://image.tmdb.org/t/p/w300${profile_path}" alt="${original_name}">
<div class="movie-info">
<h2>${original_name}</h2>
<p>Film: ${title}</p>
<p>Vote_Average: ${vote_average}</p>
</div>
</li>`
    )
    .join("");
}
