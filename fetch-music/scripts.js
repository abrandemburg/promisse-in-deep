const url = ''


//function that returns a promise
const findLyrics = (artist, song) => {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
  
}

//get the form and cancel its default behavior, call doSubmit instead of the default
const form = document.querySelector('#lyrics_form')
form.addEventListener('submit', el => {
  el.preventDefault()
  doSubmit()
})

  const doSubmit = async() => {
  const lyrics_el = document.querySelector("#lyrics")
  const artist = document.querySelector("#artist")
  const song = document.querySelector("#song")

  //with .then
  /*findLyrics(artist.value, song.value)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      if(data.lyrics) {
        lyrics_el.innerHTML = data.lyrics
      } else {
        lyrics_el.innerHTML = data.error
      }
    })
    .catch (err => {
      lyrics_el.innerHTML = `Opps! ${err}`
    }) */

  //with async await
   try {
     const lyricsResp = await findLyrics(artist.value, song.value)
     const data = await lyricsResp.json()
     if(data.lyrics) {
       lyrics_el.innerHTML = data.lyrics
     } else {
       lyrics_el.innerHTML = data.error
     }
   } catch (err) {
     console.log(err)
   }
}