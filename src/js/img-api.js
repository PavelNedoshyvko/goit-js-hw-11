import axios from "axios";
export { serviceImages };
axios.defaults.baseURL = "https://pixabay.com/api/";


async function serviceImages(searchQuery, page = 1) {
	const params = new URLSearchParams({
		key: "39153918-79b1c310c5699b06879eeb38b",
		q: searchQuery,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: true,
		page,
		per_page: 40,
	});
	const { data } = await axios(`?${params}`);
	return data;
}