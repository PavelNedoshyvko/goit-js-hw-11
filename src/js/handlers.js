import { serviceImages } from "./img-api";
import { createMarkup } from "./markup";
import { refs } from "./refs";
import { notifyInfo } from "./notifys";

export { onFormSubmit };

async function onFormSubmit(evt) {
	evt.preventDefault();
	const searchQuery = evt.currentTarget.searchQuery.value;
	try {
		const data = await serviceImages(searchQuery);
		const { data: { hits } } = data;
		if (hits.length === 0) {
			notifyInfo();
		}
		refs.gallery.innerHTML = createMarkup(hits);
	} catch (err) {
    console.log(err);
	};
}