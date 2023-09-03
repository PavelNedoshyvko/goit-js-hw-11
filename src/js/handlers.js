import { serviceImages } from "./img-api";
import { createMarkup } from "./markup";
import { refs } from "./refs";
import { notifyEndOfGalleryInfo, notifyNoImagesWarning, notifyTotalHitsImagesSuccess } from "./notifications";
import { scrollToTop } from "./scroll-up";
import { galleryLightbox } from "./simple-lightbox";

export { onFormSubmit, onbtnLoadMoreClick };
	
let searchQuery = '';
let page = 1;
let totalImages = [];

async function onFormSubmit(evt) {
	evt.preventDefault();
	searchQuery = evt.currentTarget.searchQuery.value;
	evt.currentTarget.searchQuery.onchange = () => {
		page = 1;
		totalImages = [];
		scrollToTop();
	}
	try {
		const data = await serviceImages(searchQuery, page);
		const { data: { hits } } = data;
		if (hits.length === 0) {
			notifyNoImagesWarning();
			return;
		}
		refs.gallery.innerHTML = createMarkup(hits);
		galleryLightbox.refresh();
		hits.map((img) => totalImages.push(img));
		refs.btnLoadMore.classList.remove('is-hidden');
	} catch (err) {
    console.log(err);
	};

};

async function onbtnLoadMoreClick() {
	refs.btnLoadMore.classList.add('is-hidden');
	page += 1;
	try {
		const data = await serviceImages(searchQuery, page);
		const { data: { hits, totalHits } } = data;
		hits.map((img) => totalImages.push(img));
		if (hits.length === 0) {
			notifyNoImagesWarning();
			return;
		}
		refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
		galleryLightbox.refresh();
		if (totalImages.length > totalHits) {
			notifyEndOfGalleryInfo();
			return;
		}
		if (totalImages.length !== totalHits) {
			notifyTotalHitsImagesSuccess(totalHits);
		};
		refs.btnLoadMore.classList.remove('is-hidden');
		const cardStyle = getComputedStyle(document.querySelector('.photo-card'));
		const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
		window.scrollBy({
			top: cardHeight * 2,
			behavior: "smooth",
		});
	} catch (err) {
    console.log(err);
	}
};