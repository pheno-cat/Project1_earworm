//Setting the API
const apiURL = "https://api.lyrics.ovh";
// setting variables
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

// event listeners
form.addEventListener("submit", e => {
	e.preventDefault();

  const searchTerm = search.value.trim();
	if(!searchTerm) {
		alert("please type in a search term");
	} else {
			searchSongs(searchTerm);
		}
});
  async function searchSongs(term){
//calling api
  const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
     showData(data);

}
  //show song and artist in DOM
  function showData(data) {
  result.innerHTML = `
  <ul class="songs">
  ${data.data.map(
    song => `	<li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}"
    data-songtitle="${song.title}">Get Lyrics</button>
    </li>`)
  .join('')
}
  
  </ul>
  `;
  
   };
   // Get lyrics for song
    async function getLyrics(artist, songTitle) {
      const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await res.json();

          if (data.error) {
            result.innerHTML = data.error;
         } else {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
        }

        more.innerHTML = '';
    };
//get lyrics
result.addEventListener("click", e => {
  if(clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
      const songTitle = clickedEl.getAttribute('data-songtitle')
  }
});