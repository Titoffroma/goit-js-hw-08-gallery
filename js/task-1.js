import imagesArr from "./gallery-items.js";
const smartGallery = {
  imagesArray: imagesArr,
  galleryRef: document.querySelector(".gallery"),
  buttonRef: document.querySelector(".open-btn"),
  modalRef: document.querySelector(".lightbox"),
  modalImageRef: document.querySelector(".lightbox__image"),
  closeButtonRef: document.querySelector(".lightbox__button"),
  currentIdex: 0,
  addImages: function () {
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
  openGallery: function (event) {
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
  },
  openLightbox: function (event) {
    event.preventDefault();
    if (event.target.tagName !== "IMG") return;
    this.modalRef.classList.add("is-open");
    document.body.style.overflow = "hidden";
    this.modalImageRef.src = event.target.dataset.source;
    this.modalImageRef.alt = event.target.alt;
    this.currentImage = event.target;
    this.initialImage = this.galleryRef.querySelector("img");
    this.closeButtonRef.addEventListener("click", this.closeLightbox.bind(this),{once: true});
    this.modalImageRef.addEventListener("click", this.clickLightbox.bind(this));
  },
  closeLightbox: function () {
    this.modalRef.classList.remove("is-open");
    setTimeout(() => this.modalImageRef.src = "", 500);
    document.body.style.overflow = "auto";
    this.modalImageRef.removeEventListener("click", this.clickLightbox.bind(this));
  },
  clickLightbox: function () {
    this.nextImage = !!this.currentImage.parentElement.parentElement.nextElementSibling ? this.currentImage.parentElement.parentElement.nextElementSibling.querySelector("img") : this.initialImage;
    this.modalImageRef.src = this.nextImage.dataset.source;
    this.currentImage = this.nextImage;
  },
};
smartGallery.buttonRef.addEventListener(
  "click",
  smartGallery.openGallery.bind(smartGallery)
);
smartGallery.galleryRef.addEventListener("click", smartGallery.openLightbox.bind(smartGallery));
