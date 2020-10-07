import imagesArr from "./gallery-items.js";
const smartGallery = {
  imagesArray: imagesArr,
  galleryRef: document.querySelector(".gallery"),
  buttonRef: document.querySelector(".open-btn"),
  modalRef: document.querySelector(".lightbox"),
  modalImageRef: document.querySelector(".lightbox__image"),
  closeButtonRef: document.querySelector(".lightbox__button"),
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
  openModal: () => {},
};
smartGallery.buttonRef.addEventListener(
  "click",
  smartGallery.openGallery.bind(smartGallery)
);
smartGallery.galleryRef.addEventListener("click", (event) => {
  event.preventDefault();
  smartGallery.modalRef.classList.add("is-open");
  document.body.style.overflow = "hidden";
  smartGallery.modalImageRef.src = event.target.dataset.source;
  smartGallery.modalImageRef.alt = event.target.alt;
  smartGallery.closeButtonRef.addEventListener("click", () => {
    smartGallery.modalRef.classList.remove("is-open");
    setTimeout(() => smartGallery.modalImageRef.src = "",500);

    document.body.style.overflow = "auto";
  }, {once: true});
});
