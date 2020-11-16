<template>
  <div class="dashboard pa-5">
    <v-layout row wrap justify-center>
      <v-flex xs3 class="d-none d-md-block pr-10">
        <v-card elevation="8" height="100vh">
          <v-navigation-drawer floating permanent>
            <v-card py-5 flat>
              <h4 class="pa-4">BLU-GAME</h4>
            </v-card>
            <div class="px-4 mt-5">
              <v-btn outlined color="primary" @click="logOut()">
                Logout
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </div>
            <div class="px-4 mt-5">
              <h4>Users Online</h4>
            </div>
            <v-list dense rounded>
              <v-list-item v-for="item in users" :key="item" link>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-account-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-flex>
      <v-flex xs10 sm8 md6 px-5>
        <v-container pr-7>
          <v-row>
            <v-layout row justify-space-between>
              <v-flex>
                <v-col class="px-1">
                  <v-badge color="error" overlap class="mt-5">
                    <template slot="badge">2</template>
                    <v-icon color="tertiary">mdi-bell</v-icon>
                  </v-badge>
                </v-col>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
                <v-card>
                  <v-card-title>19 points</v-card-title>
                  <v-card-subtitle>Top score</v-card-subtitle>
                </v-card>
              </v-flex>
            </v-layout>

            <v-col cols="12" md12>
              <h1 class="heading mb-2 grey--text">Good afternoon {{username}}</h1>
            </v-col>

            <v-layout row wrap>
              <v-card>
                <v-col>
                  <p>Blugame is a guess game between two players, a user starts the game, selects his/her opponent and sets a word to be guessed by the opponent, the opponent guesses and the users replys a YES or a NO. The opponent has 20 guesses for the game, the game ends when the opponent gueses the right word before a 20th guess or when the user runs of guess and loses</p>
                </v-col>

                <v-layout row wrap justify-center>
                  <v-btn x-large color="success" dark class="my-8" @click="dialog = true">Start Game</v-btn>
                </v-layout>
                <v-col>
                  <v-btn color="tertiary" outlined dark class="my-8">Log Out</v-btn>
                </v-col>
              </v-card>
            </v-layout>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs3 class="d-none d-md-block">
        <v-container>
          <v-row>
            <v-col cols="12" md12>
              <v-card flat color="tertiary">
                <div class="pa-4">
                  <h3>LEADERBOARD</h3>
                </div>
              </v-card>
            </v-col>
            <v-timeline dense>
              <v-timeline-item v-for="item in leaderBoard" :key="item">
                <v-card class="elevation-2 px-4 py-2">
                  <h4>{{ item }}</h4>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="500">
      <div v-show="step === 1">
        <v-card>
          <v-layout justify-center>
            <v-flex xs12 sm10 justify-center>
              <v-layout justify-center class="mt-6 mb-4">
                <v-spacer></v-spacer>
                <v-icon>mdi-account-circle-outline mdi-48px</v-icon>
                <v-spacer></v-spacer>
              </v-layout>
              <h4 class="text-center my-4">Choose a User to play with</h4>
              <v-text-field
                label="Enter Username"
                v-model="opponent"
                dense
                outlined
                single-line
                :error-messages="opponentErrors"
                @input="$v.opponent.$touch()"
                @blur="$v.opponent.$touch()"
              />
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="next()">Next</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-show="step === 2">
        <v-card>
          <v-layout justify-center>
            <v-flex xs12 sm10 justify-center>
              <v-layout justify-center class="mt-6 mb-4">
                <v-spacer></v-spacer>
                <v-icon>mdi-account-circle-outline mdi-48px</v-icon>
                <v-spacer></v-spacer>
              </v-layout>
              <h4 class="text-center my-4">Enter your word</h4>
              <v-text-field
                label="Enter word"
                v-model="question"
                dense
                outlined
                single-line
                :error-messages="questionErrors"
                @input="$v.question.$touch()"
                @blur="$v.question.$touch()"
              />
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="switchModals()">Start Game</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="dialog1" max-width="500" persistent>
      <v-card>
        <v-layout justify-center>
          <v-flex xs12 sm10 justify-center>
            <v-layout justify-center class="mt-6 mb-4">
              <v-spacer></v-spacer>
              <v-icon>mdi-gamepad-variant-outline mdi-48px</v-icon>
              <v-spacer></v-spacer>
            </v-layout>
            <v-card class="overflow-y-auto" height="400" flat>
              <v-card-text>
                <div id="chatDiv">
                  <div v-for="item in messages" :key="item.id" class="mb-4" v-chat-scroll>
                    <div v-if="item.isMe">
                      <v-layout row wrap justify-end>
                        <v-card width="200" color="secondary" class="pa-3">
                          <p>{{ item.message }}</p>
                          <h4>{{ item.sender }} - {{ item.time }}</h4>
                        </v-card>
                      </v-layout>
                    </div>
                    <div v-else>
                      <v-layout row wrap justify-start>
                        <v-card width="200" color="secondary" class="pa-3">
                          <p>{{ item.message }}</p>
                          <h4>{{ item.sender }} - {{ item.time }}</h4>
                        </v-card>
                      </v-layout>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-card-actions class="px-5">
          <v-text-field
            label="Reply"
            class="mx-3 my-2"
            outlined
            single-line
            dense
            hide-details
            v-model="reply"
            :error-messages="replyErrors"
            @input="$v.reply.$touch()"
            @blur="$v.reply.$touch()"
          ></v-text-field>
          <v-btn color="green darken-1" text @click="gamePlay()">
            Send
            <v-icon>mdi-send-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog10" persistent max-width="500">
      <v-card>
        <v-layout justify-center>
          <v-flex xs12 sm10 justify-center>
            <v-layout justify-center class="mt-6 mb-4">
              <v-spacer></v-spacer>
              <v-icon>{{dialogIcon}} mdi-48px</v-icon>
              <v-spacer></v-spacer>
            </v-layout>
            <h4 class="text-center">{{ dialogMessage }}</h4>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="reset()">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5" persistent max-width="300">
      <LoadingModal />
    </v-dialog>
  </div>
</template>
<script>
import LoadingModal from "../components/modals/LoadingModal";
import io from "socket.io-client";
const moment = require("moment");
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  name: "Game",
  validations: {
    question: { required },
    opponent: { required },
    reply: { required },
  },
  components: {
    LoadingModal,
  },
  created() {
    this.checkStatus();
    this.connectSocket();
    this.getOnlineUsers();
  },
  data() {
    return {
      socketConnection: null,
      username: "",
      opponent: "",
      question: "",
      myGameID: "",
      token: "",
      step: 1,
      dialog: false,
      dialog1: false,
      dialog5: false,
      dialog10: false,
      dialogMessage: "",
      dialogIcon: "mdi-close-circle-outline",
      users: [],
      leaderBoard: [
        "Bose Gbajana",
        "King Adesina",
        "Cletus Bartholomew",
        "Cletus Chijioke",
        "Bose Gbaja",
        "King Adebayo",
      ],
      messages: [],
      reply: "",
      right: null,
    };
  },
  methods: {
    checkStatus() {
      const userStatus = this.$store.getters.getUserStatus;
      this.username = this.$store.getters.getUserName;
      this.token = this.$store.getters.getToken;
      if (!userStatus) {
        this.$router.push("/");
      }
    },
    connectSocket() {
      this.socketConnection = io("http://localhost:3250/");

      this.socketConnection.on("allUsersOnline", (data) => {
        this.users = data;
      });

      this.socketConnection.on(this.username, (data) => {
        if (data.gameOptions) {
          if (data.gameOptions.message == 1) {
            this.dialogIcon = "mdi-check-circle-outline";
          }
          this.dialogMessage = data.gameOptions.message;
          this.dialog10 = true;
        }
        if (!this.opponent) {
          this.opponent = data.opponent;
        }
        this.showMessage(data.message);
        this.dialog1 = true;
      });

      this.socketConnection.on("disconnect", () => {
        this.disconnectUser(this.username);
        this.logOut();
      });
    },
    showMessage(message) {
      let isMe = false;
      let sender = message.sender;
      if (message.sender == this.username) {
        isMe = true;
        sender = "Me";
      }
      this.messages.push({
        id: Math.floor(Math.random() * 9999) + 1,
        message: message.message,
        isMe,
        sender,
        time: message.time,
      });
    },
    async disconnectUser(username) {
      await this.$store.dispatch("disconnectUser", {
        username,
      });
    },
    async gamePlay() {
      this.$v.reply.$touch();
      if (this.$v.reply.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let gameID = this.myGameID;
        if (!gameID) {
          gameID = this.username;
        }
        const message = {
          sender: this.username,
          message: this.reply,
          time: moment().format("h:mm a"),
        };
        this.showMessage(message);
        const data = {
          gameId: gameID,
          username: this.username,
          opponent: this.opponent.trim(),
          reply: this.reply,
        };
        this.reply = "";
        this.$vuetify.goTo(this.divHeight());
        try {
          const gamePlay = await this.$store.dispatch("inGamePlay", data);
          if (!gamePlay.status) {
            this.logOut();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    async playUser() {
      this.dialog5 = true;
      const data = {
        username: this.username,
        opponent: this.opponent.trim(),
        question: this.question.trim(),
      };
      try {
        const userStatus = await this.$store.dispatch("playGame", data);
        if (userStatus.status) {
          this.myGameID = userStatus.data;
          this.dialog = false;
          this.dialog1 = true;
        } else {
          this.dialog5 = false;
          this.dialogIcon = "mdi-close-circle-outline";
          this.dialogMessage = userStatus.message;
          this.dialog10 = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getOnlineUsers() {
      const user = {
        username: this.username,
      };
      try {
        const onlineUsers = await this.$store.dispatch("getUsersOnline", user);
        this.users = onlineUsers.data;
      } catch (error) {
        console.log(error);
      }
    },
    logOut() {
      this.disconnectUser(this.username);
      this.$store.dispatch("logOut");
      this.$router.push("/");
    },
    reset() {
      this.opponent = "";
      this.question = "";
      this.myGameID = "";
      this.reply = "";
      this.dialog10 = false;
      this.dialog1 = false;
    },
    next() {
      this.$v.opponent.$touch();
      if (this.$v.opponent.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.step++;
      }
    },
    switchModals() {
      this.$v.question.$touch();
      if (this.$v.question.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.playUser();
      }
    },
  },
  computed: {
    divHeight() {
      return document.getElementById("chatDiv").scrollHeight;
    },
    questionErrors() {
      const errors = [];
      if (!this.$v.question.$dirty) return errors;
      !this.$v.question.required && errors.push("Question is required.");
      return errors;
    },
    opponentErrors() {
      const errors = [];
      if (!this.$v.opponent.$dirty) return errors;
      !this.$v.opponent.required && errors.push("Opponent is required.");
      return errors;
    },
    replyErrors() {
      const errors = [];
      if (!this.$v.reply.$dirty) return errors;
      !this.$v.reply.required && errors.push("Enter a reply.");
      return errors;
    },
  },
};
</script>
<style scoped>
.scroll {
  height: 400;
  overflow: scroll;
}
</style>