import axios from 'axios';
import * as types from '../constants/actionTypes';

export function getEvents({ data }) {
  data.forEach((event, i) => { event.id = i; });
  return {
    type: types.GET_EVENTS_DATA_RECEIVED,
    payload: data,
  };
}

export function gettingEvents() {
  return {
    type: types.GET_EVENTS_DATA,
  };
}

export function submitUsername(username) {
  console.log('USERNAME ACTION', username);
  return {
    type: types.SUBMIT_USERNAME,
    payload: username,
  };
}

export function showLoadingPlaylist(boolean) {
  console.log('SHOW LOADING PLAYLIST ACTION', boolean);
  return {
    type: types.SHOW_LOADING_PLAYLIST,
    payload: boolean,
  };
}

export function showPlaylist(boolean) {
  console.log('SHOW PLAYLIST ACTION', boolean);
  return {
    type: types.SHOW_PLAYLIST,
    payload: boolean,
  };
}

export function setPlaylistIds(array) {
  return {
    type: types.PLAYLIST_ID,
    payload: array,
  };
}
