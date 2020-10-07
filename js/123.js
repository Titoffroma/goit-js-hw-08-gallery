import imagesArr from "./gallery-items.js";
const smartGallery = {
  imagesArr: imagesArr,
  galleryRef: document.querySelector(".gallery"),
  addImages: function () {
    const imagesString = this.imagesArr.reduce(
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
    this.galleryRef.appendChild("beforeend", imagesString);
  },
  openModal: () => {},
};
smartGallery.addImages();
