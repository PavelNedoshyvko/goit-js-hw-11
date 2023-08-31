import { Notify } from "notiflix";
export { notifyInfo };

function notifyInfo() {
	Notify.info(
		"Sorry, there are no images matching your search query. Please try again.",
		{
		width: '700px',
		fontSize: '26px',
		position: 'center-center',
	});
}