import imagesArr from "./gallery-items.js";
let operateLightbox = null;
class smartGallery {
  constructor(params, imagesArray = imagesArr, currentIndex = 0) {
    this.galleryRef = params.galleryRef;
    this.buttonRef = params.buttonRef;
    this.modalRef = params.modalRef;
    this.modalImageRef = params.modalImageRef;
    this.closeButtonRef = params.closeButtonRef;
    this.imagesArray = imagesArray;
    this.currentIndex = currentIndex;
  }
  addImages() {
    const imagesString = this.imagesArray.reduce(
      (acc, { preview, original, description }) => {
        let oneImageString = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
        return (acc += oneImageString);
      },
      ""
    );
    this.galleryRef.insertAdjacentHTML("beforeend", imagesString);
  }
  openGallery(event) {
    if (this.galleryRef.children.length === 0) {
      this.addImages();
      event.target.textContent = "Close Gallery";
      this.galleryRef.addEventListener("click", this.openLightbox.bind(this));
    } else {
      this.galleryRef.classList.toggle("is-hidden");
      if (event.target.textContent === "Close Gallery") {
        event.target.textContent = "Open Gallery";
      } else {
        event.target.textContent = "Close Gallery";
      }
    }
  }
  addDocListener() {
    operateLightbox = this.operateLightbox.bind(this);
    window.addEventListener("keydown", this.operateLightbox.bind(this), {
      once: true,
    });
  }
  openLightbox(event) {
    event.preventDefault();
    if (event.target.tagName !== "IMG") return;
    if (!this.currentIndex) this.addDocListener();
    this.modalRef.classList.add("is-open");
    document.body.style.overflow = "hidden";
    this.modalImageRef.src = event.target.dataset.source;
    this.modalImageRef.alt = event.target.alt;
    this.currentIndex = Array.from(
      document.querySelectorAll(".gallery__image")
    ).indexOf(event.target);
    this.closeButtonRef.addEventListener(
      "click",
      this.closeLightbox.bind(this),
      { once: true }
    );
  }
  operateLightbox(event) {
    console.log(event.code);
    if (event.code === "Escape") {
      this.closeLightbox();
      this.addDocListener();
    }
    if (event.code === "ArrowRight") {
      this.moveRightLightbox();
      this.addDocListener();
    }
    if (event.code === "ArrowLeft") {
      this.moveLeftLightbox();
      this.addDocListener();
    }
  }
  moveImages() {
    this.modalImageRef.src = this.imagesArray[this.currentIndex].original;
    this.modalImageRef.alt = this.imagesArray[this.currentIndex].description;
  }
  moveRightLightbox() {
    if (this.currentIndex === this.imagesArray.length - 1) {
      this.currentIndex = -1;
    }
    this.currentIndex += 1;
    this.moveImages();
  }
  moveLeftLightbox() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.imagesArray.length;
    }
    this.currentIndex -= 1;
    this.moveImages();
  }
  closeLightbox() {
    this.modalRef.classList.remove("is-open");
    setTimeout(() => (this.modalImageRef.src = ""), 500);
    document.body.style.overflow = "auto";
    this.currentIndex = 1;
  }
}

const initialParams = {
  galleryRef: document.querySelector(".gallery"),
  buttonRef: document.querySelector(".open-btn"),
  modalRef: document.querySelector(".lightbox"),
  modalImageRef: document.querySelector(".lightbox__image"),
  closeButtonRef: document.querySelector(".lightbox__button"),
};
const myGallery = new smartGallery(initialParams);

myGallery.buttonRef.addEventListener(
  "click",
  myGallery.openGallery.bind(myGallery)
);
