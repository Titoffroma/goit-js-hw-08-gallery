import imagesArr from "./gallery-items.js";
const smartGallery = {
  imagesArray: imagesArr,
  galleryRef: document.querySelector(".gallery"),
  buttonRef: document.querySelector(".open-btn"),
  modalRef: document.querySelector(".lightbox"),
  modalImageRef: document.querySelector(".lightbox__image"),
  closeButtonRef: document.querySelector(".lightbox__button"),
  currentIndex: 0,
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
  },
  openGallery(event) {
    if (this.galleryRef.children.length === 0) {
      this.addImages();
      event.target.textContent = "Close Gallery";
    } else {
      this.galleryRef.classList.toggle("is-hidden");
      if (event.target.textContent === "Close Gallery") {
        event.target.textContent = "Open Gallery";
      } else {
        event.target.textContent = "Close Gallery";
      }
    }
    this.galleryRef.addEventListener(
      "click",
      smartGallery.openLightbox.bind(this)
    );
  },
  openLightbox(event) {
    event.preventDefault();
    if (event.target.tagName !== "IMG") return;
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
    addDocListener();
  },
  moveRightLightbox() {
    if (this.currentIndex === this.imagesArray.length - 1) {
      this.currentIndex = -1;
    }
    this.modalImageRef.src = this.imagesArray[this.currentIndex + 1].original;
    this.modalImageRef.alt = this.imagesArray[
      this.currentIndex + 1
    ].description;
    this.currentIndex += 1;
  },
  moveLeftLightbox() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.imagesArray.length;
    }
    this.modalImageRef.src = this.imagesArray[this.currentIndex - 1].original;
    this.modalImageRef.alt = this.imagesArray[
      this.currentIndex - 1
    ].description;
    this.currentIndex -= 1;
  },
  closeLightbox() {
    removeDocListener();
    this.modalRef.classList.remove("is-open");
    setTimeout(() => (this.modalImageRef.src = ""), 500);
    document.body.style.overflow = "auto";
  },
};
smartGallery.buttonRef.addEventListener(
  "click",
  smartGallery.openGallery.bind(smartGallery)
);

function addDocListener() {
  smartGallery.galleryRef.addEventListener("keydown", operateLightbox);
}
function removeDocListener() {
  smartGallery.galleryRef.removeEventListener("keydown", operateLightbox);
}
function operateLightbox(event) {
  if (event.code === "Escape") {
    removeDocListener();
    smartGallery.modalRef.classList.remove("is-open");
    setTimeout(() => (smartGallery.modalImageRef.src = ""), 500);
    document.body.style.overflow = "auto";
  }
  if (event.code === "ArrowRight") {
    smartGallery.moveRightLightbox();
  }
  if (event.code === "ArrowLeft") {
    smartGallery.moveLeftLightbox();
  }
}
