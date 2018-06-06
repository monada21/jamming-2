let userAccessToken = "";

const clientID = "b5f75226869b40bcb349c112fb95ff76";

const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
    const url = window.location.href;
    let accessToken = url.match(/access_token=([^&]*)/);
    const expires = url.match(/expires_in=([^&]*)/);

    if (accessToken && expires) {
      userAccessToken = accessToken[1];
      const expirationTime = Number(expires[1]) * 1000;
      window.setTimeout(() => {
        return userAccessToken = " ";
      }, expirationTime);
      window.history.pushState("For Access Token", null, "/");
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }

        return jsonResponse.tracks.items.map(currentTrack => {
          return {
            id: currentTrack.id,
            name: currentTrack.name,
            artist: currentTrack.artists[0].name,
            album: currentTrack.album.name,
            uri: currentTrack.uri
          };
        });
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = this.getAccessToken();

    return fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.id)
      .then(userID => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ name: playlistName }),
          method: "POST"
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            const addSongsURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`;
            fetch(addSongsURL, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify({ name: playlistName }),
              method: "POST"
            });
          });
      });
  }
};

export default Spotify;
