const track = document.querySelector(".carousel_tracker");
const slides = Array.from(track.children);

const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");

const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);
console.log(dotsNav);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, id) => {
  slide.style.left = slideWidth * id + "px";
};

slides.forEach(setSlidePosition);
// console.log(nextButton, prevButton);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideshowArrows = (slides, nextButton, prevButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  const prevIndex = slides.findIndex((id) => id === prevSlide);
  hideshowArrows(slides, nextButton, prevButton, prevIndex);
});

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  const nextIndex = slides.findIndex((id) => id === nextSlide);
  hideshowArrows(slides, nextButton, prevButton, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot == targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideshowArrows(slides, nextButton, prevButton, targetIndex);
  //   console.log(targetSlide);
});
