export { createMarkup };

function createMarkup(arr) {
	return arr.map(
		({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
			`<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">Likes
      <b>${likes}</b>
    </p>
    <p class="info-item">Views
      <b>${views}</b>
    </p>
    <p class="info-item">Comments
      <b>${comments}</b>
    </p>
    <p class="info-item">Downloads
      <b>${downloads}</b>
    </p>
  </div>
</div>`
		).join('');
}