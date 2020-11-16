import Vue from 'vue'
import Vuex from 'vuex'

const UserController = require('../services/auth.service');
const GameController = require('../services/game.service');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    gameId: '',
    authStatus: false
  },
  mutations: {
    userLogin: (state, payload) => {
      console.log('Login successful')
      return [
        state.username = payload.username,
        state.token = payload.token,
        state.gameId = payload.gameId,
        state.authStatus = true
      ]
    },
    userLogout: (state) => {
      console.log('Login status updated')
      return [
        state.username = '',
        state.token = '',
        state.gameId = '',
        state.authStatus = false
      ]
    },
  },
  actions: {
    userRegister: async (context, payload) => {
      let user = {
        username: payload.username.trim(),
        password: payload.password.trim(),
      }
      try {
        const response = await UserController.userRegister(user);
        return response.data;
      } catch (error) {
        console.log('User registration error ' + error);
      }
    },
    userLogin: async (context, payload) => {
      let user = {
        username: payload.username.trim(),
        password: payload.password.trim()
      }
      try {
        const response = await UserController.userLogin(user);
        if (response.data.status) {
          let loggedInUser = {
            username: response.data.data.user.username,
            token: response.data.data.token,
            gameId: response.data.data.user.gameID,
          }
          context.commit('userLogin', loggedInUser);
        }
        return response.data;
      } catch (error) {
        console.log('User login error ' + error);
      }
    },
    getUsersOnline: async (context, payload) => {
      try {
        const response = await GameController.getUsersOnline(payload, context.state.token);
        return response.data;
      } catch (error) {
        console.log('Fetch Users error ' + error);
      }
    },
    playGame: async (context, payload) => {
      try {
        const response = await GameController.playUser(payload, context.state.token);
        return response.data;
      } catch (error) {
        console.log('Start Game error ' + error);
      }
    },
    inGamePlay: async (context, payload) => {
      try {
        const response = await GameController.gamePlay(payload, context.state.token);
        return response.data;
      } catch (error) {
        console.log('Game play error ' + error);
      }
    },
    disconnectUser: async (context, payload) => {
      try {
        const response = await GameController.disconnectUser(payload, context.state.token);
        return response.data;
      } catch (error) {
        console.log('Disconnect user error ' + error);
      }
    },
    logOut: (context) => {
      context.commit('userLogout');
    },
  },
  getters: {
    getUserStatus: state => {
      return state.authStatus;
    },
    getUserName: state => {
      return state.username;
    },
    getGameId: state => {
      return state.gameId;
    },
    getToken: state => {
      return state.token;
    },
  },
})
