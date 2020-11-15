<template>
  <v-container id="signinup-form" class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class>
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form" @submit.prevent="signIn">
                      <h1 class="text-center mb-10">Sign In</h1>
                      <v-text-field
                        label="Username"
                        v-model="loginUsername"
                        type="text"
                        outlined
                        dense
                        single-line
                        :error-messages="loginUsernameErrors"
                        @input="$v.loginUsername.$touch()"
                        @blur="$v.loginUsername.$touch()"
                      />
                      <v-text-field
                        label="Password"
                        v-model="loginPassword"
                        type="password"
                        outlined
                        dense
                        single-line
                        :error-messages="loginPasswordErrors"
                        @input="$v.loginPassword.$touch()"
                        @blur="$v.loginPassword.$touch()"
                      />
                      <div class="text-center mt-6">
                        <v-btn
                          type="submit"
                          large
                          block
                          color="primary"
                          dark
                          @click="signIn"
                        >Sign In</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="darken-2 vcenter primary">
                  <div>
                    <v-card-text class="white--text">
                      <h1 class="text-center mb-3">New User?</h1>
                      <h5 class="text-center mb-3">Please sign up to play</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 2">Sign Up</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!--SignUp-->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="darken-2 vcenter primary">
                  <div>
                    <v-card-text class="white--text">
                      <h1 class="text-center mb-3">Already a user?</h1>
                      <h5 class="text-center mb-3">Please sign in</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <h1 class="text-center mb-10">Sign Up</h1>
                    <v-form class="signup-form-form" @submit.prevent="signUp">
                      <v-text-field
                        label="Username"
                        type="text"
                        dense
                        outlined
                        single-line
                        v-model="registerUsername"
                        :error-messages="registerUsernameErrors"
                        @input="$v.registerUsername.$touch()"
                        @blur="$v.registerUsername.$touch()"
                      />
                      <v-text-field
                        label="Password"
                        type="password"
                        dense
                        outlined
                        single-line
                        v-model="registerPassword"
                        :error-messages="registerUsernameErrors"
                        @input="$v.registerPassword.$touch()"
                        @blur="$v.registerPassword.$touch()"
                      />
                      <div class="text-center mt-6">
                        <v-btn
                          type="submit"
                          large
                          block
                          color="primary"
                          dark
                          @click="signUp"
                        >Sign Up</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
            <!--PW Rest-->
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog5" persistent max-width="300">
      <LoadingModal />
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
          <v-btn color="green darken-1" text @click="dialog10 = false">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import LoadingModal from "../components/modals/LoadingModal";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Home",
  validations: {
    loginUsername: { required },
    loginPassword: { required },
    registerUsername: { required },
    registerPassword: { required },
  },

  data: () => ({
    step: 1,
    loginUsername: "",
    loginPassword: "",
    registerUsername: "",
    registerPassword: "",
    login: "",
    dialog5: false,
    dialog10: false,
    dialogMessage: "",
    dialogIcon: "mdi-close-circle-outline",
  }),
  components: {
    LoadingModal,
  },
  methods: {
    async signUp() {
      event.preventDefault();
      this.$v.registerUsername.$touch();
      this.$v.registerPassword.$touch();
      if (
        this.$v.registerUsername.$invalid ||
        this.$v.registerPassword.$invalid
      ) {
        this.submitStatus = "ERROR";
      } else {
        this.dialog5 = true;
        const userObj = {
          username: this.registerUsername.trim(),
          password: this.registerPassword.trim(),
        };
        try {
          const registerResponse = await this.$store.dispatch(
            "userRegister",
            userObj
          );
          if (registerResponse.status) {
            this.dialog5 = false;
            this.dialogMessage = registerResponse.message;
            this.dialogIcon = "mdi-check-circle-outline";
            this.dialog10 = true;
            this.step = 1;
          } else {
            this.dialog5 = false;
            this.dialogIcon = "mdi-close-circle-outline";
            this.dialogMessage = registerResponse.message;
            this.dialog10 = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async signIn() {
      this.$v.loginUsername.$touch();
      this.$v.loginPassword.$touch();
      if (this.$v.loginUsername.$invalid || this.$v.loginPassword.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.dialog5 = true;
        const userObj = {
          username: this.loginUsername.trim(),
          password: this.loginPassword.trim(),
        };
        try {
          const loginResponse = await this.$store.dispatch(
            "userLogin",
            userObj
          );
          if (loginResponse.status) {
            this.dialog5 = false;
            this.$router.push("game");
          } else {
            this.dialog5 = false;
            this.dialogIcon = "mdi-close-circle-outline";
            this.dialogMessage = loginResponse.message;
            this.dialog10 = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  computed: {
    loginUsernameErrors() {
      const errors = [];
      if (!this.$v.loginUsername.$dirty) return errors;
      !this.$v.loginUsername.required && errors.push("Username is required.");
      return errors;
    },
    loginPasswordErrors() {
      const errors = [];
      if (!this.$v.loginPassword.$dirty) return errors;
      !this.$v.loginPassword.required && errors.push("Password is required.");
      return errors;
    },
    registerUsernameErrors() {
      const errors = [];
      if (!this.$v.registerUsername.$dirty) return errors;
      !this.$v.registerUsername.required &&
        errors.push("Username is required.");
      return errors;
    },
    registerPasswordErrors() {
      const errors = [];
      if (!this.$v.registerPassword.$dirty) return errors;
      !this.$v.registerPassword.required &&
        errors.push("Password is required.");
      return errors;
    },
  },
};
</script>

<style scoped lang="scss">
.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
}
a.no-text-decoration {
  text-decoration: none;
}
#signinup-form {
  max-width: 75rem;
}
.signup-form-form {
  max-width: 23rem;
  margin: 0 auto;
}
.card {
  overflow: hidden;
}
.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>