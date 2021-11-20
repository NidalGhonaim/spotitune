import { TrackType } from "../types";

const clientId = '049a7def521b40f9aa97e09b98880258';
const redirectUrl = 'http://spotitune.surge.sh/';
const scope = 'playlist-modify-public playlist-modify-private';
let accessToken = '';

const Spotify = {
  getAccessToken: () => {
    if(accessToken) {
      console.log('AT 1');
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenMatch && expirationTimeMatch) {
      console.log('AT 2');
      accessToken = tokenMatch[1];
      const expirationTime = expirationTimeMatch[1];
      window.setTimeout(() => accessToken = '', parseInt(expirationTime) * 1000);
      window.history.pushState('Access Token', '', '/');
      return accessToken;
    }

    console.log('AT 3');
    // let state = generateRandomString(16);
    // localStorage.setItem(stateKey, state);
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUrl);
    // url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
  },
  search: (searchTerm: string): Promise<TrackType[]> => {
    return new Promise((resolve, reject) => {
      const accessToken = Spotify.getAccessToken();
  
      fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${accessToken}`
        }
      }).then(response => response.json()).then(json => {
        let responseTracks = json.tracks.items;
        let tracks = responseTracks.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      
        console.log(tracks);
        resolve(tracks);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    })
  },
  getUser: async () => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      },
    });
    return response.json();
  },
  createPlaylist: async (userId: string, name: string) => {
    if (!userId || !name) {
      return;
    }
    let data = {
      name: name,
      public: false,
    };
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  savePlaylist: async (name: string, tracks: TrackType[]) => {
    if (!name || !tracks.length) {
      return;
    }
    let user = await Spotify.getUser();
    let playlist = await Spotify.createPlaylist(user.id, name);
    let data = {
      uris: tracks.map(track => track.uri),
    };
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

export default Spotify;