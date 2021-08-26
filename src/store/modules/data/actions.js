import axios from "axios";
export default {
  SET_UPPY({ commit }, uppy) {
    commit("SET_UPPY", uppy);
  },
  SET_THEME({ commit }, theme) {
    theme = theme == "dark" ? "dark" : "light";
    const themeText = theme == "light" ? "black" : "white";
    localStorage.setItem("theme", theme);
    commit("SET_THEME", theme);
    commit("SET_THEME_TEXT", themeText);
  },
  SET_LANG({ commit }, lang) {
    lang = lang == "ru" ? "ru" : "en";
    localStorage.setItem("lang", lang);
    commit("SET_LANG", lang);
  },

  // Collections
  async GET_COLLECTION({}, id) {
    const resp = await axios.get(`http://localhost:3000/collection/${id}`);
    return resp.data.msg;
  },
  async GET_COLLECTIONS({}) {
    const resp = await axios.get(`http://localhost:3000/collections`);
    return resp.data.msg;
  },
  async GET_USER_COLLECTIONS({}, id) {
    const resp = await axios.get(`http://localhost:3000/collections/${id}`);
    return resp.data.msg;
  },
  async COUNT_COLLECTION_ITEMS({}, id) {
    const resp = await axios.get(
      `http://localhost:3000/collection/items/${id}`
    );
    return resp.data.msg;
  },
  async CREATE_MY_COLLECTION({}, body) {
    const resp = await axios.post(`http://localhost:3000/user/collections`, {
      name: body.name,
      description: body.description,
      id_topic: body.id_topic,
      image: body.image
    });
    return resp.data.msg;
  },
  async EDIT_MY_COLLECTION({}, body) {
    const id = body.id;
    delete body.id;
    const resp = await axios.put(
      `http://localhost:3000/user/collection/${id}`,
      body
    );
    return resp.data.msg;
  },
  async DELETE_MY_COLLECTION({}, { id }) {
    const resp = await axios.delete(
      `http://localhost:3000/user/collection/${id}`
    );
    return resp.data.msg;
  },

  // Items
  async GET_COLLECTION_ITEMS({}, id) {
    const resp = await axios.get(`http://localhost:3000/items/${id}`);
    return resp.data.msg;
  },
  async GET_ITEMS({}) {
    const resp = await axios.get(`http://localhost:3000/items`);
    return resp.data.msg;
  },

  // Topics
  async UPDATE_TOPICS({ commit }) {
    let resp = await axios.get(`http://localhost:3000/topics`);
    resp.data.msg.map(el => Object.assign(el, { value: el.name }));
    commit("UPDATE_TOPICS", resp.data.msg);
  },

  //Tags
  async UPDATE_TAGS({ commit }) {
    let resp = await axios.get(`http://localhost:3000/tags`);
    resp.data.msg.map(el => Object.assign(el, { value: el.tag }));
    commit("UPDATE_TAGS", resp.data.msg);
  },

  // Users
  async GET_USERS({}) {
    const resp = await axios.get(`http://localhost:3000/users`);
    return resp.data.msg;
  },
  async GET_USER({}, id) {
    const resp = await axios.get(`http://localhost:3000/user/${id}`);
    return resp.data.msg;
  },

  // Likes
  async COUNT_LIKES({}, id) {
    const resp = await axios.get(`http://localhost:3000/item/likes/${id}`);
    return resp.data.msg;
  },
  async IS_ITEM_LIKED({}, id) {
    const resp = await axios.get(`http://localhost:3000/user/liked/${id}`);
    return resp.data.msg;
  },
  async LIKE_ITEM({}, id) {
    const resp = await axios.put(`http://localhost:3000/user/like/${id}`);
    return resp.data.msg;
  },
  async UNLIKE_ITEM({}, id) {
    const resp = await axios.put(`http://localhost:3000/user/unlike/${id}`);
    return resp.data.msg;
  },

  // Images
  async GET_IMAGE({}, id) {
    const resp = await axios.get(`http://localhost:3000/image/${id}`);
    return resp.data.msg;
  },
  async DELETE_IMAGE({}, id) {
    const resp = await axios.delete(`http://localhost:3000/user/image/${id}`);
    return resp.data.msg;
  }
};
