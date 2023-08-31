import { serviceImages } from "./img-api";
import { createMarkup } from "./markup";
import { refs } from "./refs";
import { notifyInfo } from "./notifys";

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
			notifyInfo();
		}
		refs.gallery.innerHTML = createMarkup(hits);
		hits.map((item) => totalImages.push(item));
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
		hits.map((item) => totalImages.push(item));
		if (hits.length === 0) {
			notifyInfo();
		}
		refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
		if (totalImages.length >= totalHits) {
			console.log("We're sorry, but you've reached the end of search results.");
			return;
		}
		refs.btnLoadMore.classList.remove('is-hidden');
	} catch (err) {
    console.log(err);
	}
};