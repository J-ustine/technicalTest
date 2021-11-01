/*  SLIDESHOW  */
let slideNumber = 0;
let timer = setInterval(nextSlide, 4000);

const slideshow = document.querySelector(".slideshow");
const slides = document.querySelector(".slides");
const item = slides.children;
const previous = document.querySelector(".previousSlide");
const next = document.querySelector(".nextSlide");
const below = document.querySelector(".clickBelow");

const firstItem = item[0].cloneNode(true);
slides.appendChild(firstItem);

let slideWidth = slideshow.getBoundingClientRect().width;

previous.addEventListener("click", previousSlide);
next.addEventListener("click", nextSlide);
below.addEventListener("click", () =>
  document
    .querySelector(".githubPart")
    .scrollIntoView({ block: "start", behavior: "smooth" })
);

slideshow.addEventListener("mouseout", startTimer);
slideshow.addEventListener("mouseover", stopTimer);

function previousSlide() {
  slideNumber--;
  slides.style.transition = "0.7s linear";

  if (slideNumber < 0) slideNumber = item.length - 1;

  let gapPx = -slideWidth * slideNumber;
  slides.style.transform = `translateX(${gapPx}px)`;
}

function nextSlide() {
  slideNumber++;
  slides.style.transition = "0.7s linear";

  if (slideNumber === item.length) slideNumber = 0;

  let gapPx = -slideWidth * slideNumber;
  slides.style.transform = `translateX(${gapPx}px)`;

  if (slideNumber >= item.length - 1) {
    setTimeout(() => {
      slideNumber = 0;
      slides.style.transition = "unset";
      slides.style.transform = `translateX(0)`;
    }, 700);
  }
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(nextSlide, 4000);
}

window.addEventListener("resize", () => {
  slideWidth = slideshow.getBoundingClientRect().width;
  let gapPx = -slideWidth * slideNumber;
  slides.style.transition = "unset";
  slides.style.transform = `translateX(${gapPx}px)`;
});

/*  FORM  */
const userInformation = document.querySelector(".userInformation");
const numberPublicRepo = document.querySelector(".numberPublicRepo");
const nameProfil = document.querySelector(".nameProfil");
const followers = document.querySelector(".followers");
const city = document.querySelector(".location");
const publicRepos = document.querySelector(".publicRepos");
const form = document.querySelector(".form");
form.addEventListener("submit", checkUserRepos);

function checkUserRepos(event) {
  event.preventDefault();
  publicRepos.innerHTML = null;
  userInformation.style.border = null;
  userInformation.style.borderRadius = null;
  nameProfil.innerHTML = null;
  numberPublicRepo.innerHTML = null;
  followers.innerHTML = null;
  city.innerHTML = null;

  let nameOfUser = document.getElementById("user").value;
  const fetchPromise = fetch(`https://api.github.com/users/${nameOfUser}`);

  fetchPromise
    .then((response) => {
      if (response.ok) return response.json();
      else
        publicRepos.innerHTML =
          "Something's wrong here. Please try again with another username";
    })
    .then((result) => {
      if (result.public_repos > 0) {
        displayPublicRepos(nameOfUser);
        userInformation.style.border = "1px solid #6e7681";
        userInformation.style.borderRadius = "10px";
        if (result.name) {
          nameProfil.innerHTML = `<h4><strong>${result.name}</strong></4>`;
        } else {
          nameProfil.innerHTML = `<h4><strong>${result.login}</strong></4>`;
        }
        numberPublicRepo.innerHTML = `Public Repositories : ${result.public_repos}`;
        followers.innerHTML = `Followers : ${result.followers}`;
        if (result.location) city.innerHTML = `Location : ${result.location}`;
      } else if (result.public_repos === 0)
        publicRepos.innerHTML = "This user doesn't have any public repository";
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayPublicRepos(nameOfUser) {
  const fetchPromise = fetch(
    `https://api.github.com/users/${nameOfUser}/repos`
  );

  fetchPromise
    .then((response) => response.json())
    .then((result) => {
      result.map((project, index) => {
        publicRepos.innerHTML += `<li key=${index}><i class="far fa-bookmark"></i><a href="${project.html_url}" target="_blank"> ${project.name}</a></li>`;
      });
      document.querySelector(".githubPart").style.minHeight = "97vh";
      document
        .querySelector(".githubPart")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    })
    .catch((error) => {
      console.log(error);
    });
}
