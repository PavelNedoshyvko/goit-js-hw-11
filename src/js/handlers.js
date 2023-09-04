import { serviceImages } from "./img-api";
import { createMarkup } from "./markup";
import { refs } from "./refs";
import {
	notifyEndOfGalleryInfo, notifyFillInFieldWarning,
	notifyNoImagesWarning, notifyTotalHitsImagesSuccess
} from "./notifications";
import { scrollToTop } from "./scroll-up";
import { galleryLightbox } from "./simple-lightbox";

export { onFormSubmit, onbtnLoadMoreClick };

let searchQuery = '';
let page = 1;


async function onFormSubmit(evt) {
	evt.preventDefault();
	searchQuery = evt.currentTarget.searchQuery.value.trim();
	if (!searchQuery) {
		notifyFillInFieldWarning();
		return;
	};
	page = 1;
	try {
		const{ hits, totalHits } = await serviceImages(searchQuery, page);
		if (hits.length === 0) {
			refs.btnLoadMore.classList.add('is-hidden');
			refs.gallery.innerHTML = '';
			notifyNoImagesWarning();
			return;
		}
		scrollToTop();
		refs.gallery.innerHTML = createMarkup(hits);
		galleryLightbox.refresh();
		notifyTotalHitsImagesSuccess(totalHits);
		if (Math.ceil(totalHits / 40) === page) {
			refs.btnLoadMore.classList.add('is-hidden');
			notifyEndOfGalleryInfo();
			return;
		};
		refs.btnLoadMore.classList.remove('is-hidden');
	} catch (err) {
    console.log(err);
	};
};

async function onbtnLoadMoreClick() {
	refs.btnLoadMore.classList.add('is-hidden');
	page += 1;
	try {
		const { hits, totalHits } = await serviceImages(searchQuery, page);
		if (hits.length === 0) {
			notifyNoImagesWarning();
			return;
		}
		refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
		galleryLightbox.refresh();
		 if(Math.ceil(totalHits / 40) === page){
			notifyEndOfGalleryInfo();
			return;
		};
		refs.btnLoadMore.classList.remove('is-hidden');
		const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
		window.scrollBy({
			top: cardHeight * 2,
			behavior: "smooth",
		});
	} catch (err) {
    console.log(err);
	}
};