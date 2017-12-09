const clientId = 'e3b26d48cdc042f6a0050adce1b65bbf';
const redirectUri = "http://jaesonjamming.surge.sh/";


let accessToken = '';

const Spotify {
	//spotify user access token
	getAccessToken() {
		if(accessToken) {
			return accessToken;
		}
		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

		if(urlAccessToken && urlExpiresIn) {
			accessToken = urlAccessToken[1];
			expiresIn = urlExpiresIn[1];
			window.setTime(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else { 
			const spotifyUrl = 'https://accounts.spotify.com/authorize?client_id={clientId}&response_type=token&scope=playlist-modify-public&redirect_uri={redirect_uri}';
			window.location = listUrl;
		}
	},
	//spotify search request 
	search(term) {
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q={term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		.then(response => response.json())
		.then(jsonResponse => {
			if(!jsonResponse.tracks) return [];
			return jsonResponse.tracks.items.map(track => {
				return {
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri
				}
			})
		});
	}, //ends search

	//Saves user playlist
	savePlaylist(playlistName, trackUris) {
		if(!playlistName || !trackUris) {
			return;
		}
		const accessToken = Spotify.getAccessToken();
		const headers = {Authorization: `Bearer ${accessToken}`};
		let userId = '';
		let playlistId = '';

		return fetch('https://api.spotify.com/v1/me', {
			headers: headers
		}).then(response => response.json()).then(jsonResponse => {
			userId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/{userId}/playlists`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({name: playlistName})
			}).then(response => response.json()).then(jsonResponse => {
				const playlistID = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/{userId}/playlists/${playlistID}/tracks`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({uris: trackUris})
				});
			});
		});
	} //end save playlist
} //end spotify 



















export default Spotify;