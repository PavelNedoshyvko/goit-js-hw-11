import { Notify } from "notiflix";
export { notifyNoImagesInfo, notifyEndOfGalleryInfo };

function notifyNoImagesInfo() {
	Notify.info(
		"Sorry, there are no images matching your search query. Please try again.",
		{
		width: '700px',
		fontSize: '26px',
		position: 'center-center',
	});
};

function notifyEndOfGalleryInfo() {
	Notify.info(
		"We're sorry, but you've reached the end of search results.",
		{
		width: '700px',
		fontSize: '26px',
		position: 'center-center',
	});
}