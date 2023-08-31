import { serviceImages } from "./img-api";
import { createMarkup } from "./markup";
import { refs } from "./refs";
import { notifyEndOfGalleryInfo, notifyNoImagesInfo } from "./notifications";

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
	}
	try {
		const data = await serviceImages(searchQuery, page);
		const { data: { hits } } = data;
		if (hits.length === 0) {
			notifyNoImagesInfo();
			return;
		}
		refs.gallery.innerHTML = createMarkup(hits);
		hits.map((img) => totalImages.push(img));
		console.log(totalImages.length);
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
		console.log(totalImages.length);
		if (hits.length === 0) {
			notifyNoImagesInfo();
			return;
		}
		refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
		if (totalImages.length >= totalHits) {
			notifyEndOfGalleryInfo();
			return;
		}
		refs.btnLoadMore.classList.remove('is-hidden');
	} catch (err) {
    console.log(err);
	}
};