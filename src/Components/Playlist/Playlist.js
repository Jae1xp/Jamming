import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistName: 'New Playlist',
			playlistTracks: []
		};
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		const name = event.target.value;
		this.props.onNameChange(name);
	}

	render () {
		return (
			<div className="Playlist">
			  <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
			  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
			  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;
