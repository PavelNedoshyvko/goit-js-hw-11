import axios from "axios";
// import { params } from "./params-url";
export { serviceImages };
axios.defaults.baseURL = "https://pixabay.com/api/";



async function serviceImages(searchQuery) {
	const params = new URLSearchParams({
		key: "39153918-79b1c310c5699b06879eeb38b",
		q: searchQuery,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: true,
	});
	return await axios(`?${params}`);
}