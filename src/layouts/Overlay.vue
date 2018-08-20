<template>
  <q-layout>
    <q-dialog v-model="login">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t('pages.login.title')}}</div>
          <p>{{$t('pages.login.subheading')}}</p>
        </q-card-section>
        <q-card-section>
          <q-splitter v-model="splitterModel" style="height: 336px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary">
                <q-tab
                  v-for="(auth, index) in authorizationMethods"
                  :key="'authTab' + index"
                  :name="auth"
                  :icon="$t(`pages.login.auth.${auth}.icon`)"
                  @click="activeAuthMethod(auth)"
                />
              </q-tabs>
            </template>
            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
                class="overflow"
              >
                <q-tab-panel name="username">
                  <div class="text-h4 q-mb-md">{{$t('pages.login.login')}}</div>
                  <p class="error">{{loginErr}}</p>
                  <q-input
                    ref="identifier"
                    type="email"
                    bottom-slots
                    v-model="loginForm.identifier"
                    :label="$t('pages.login.identifier')"
                    :rules="[val => required || $t('pages.login.username_note')]"
                    required
                    lazy-rules
                  >
                    <template v-slot:before>
                      <q-icon name="user" />
                    </template>
                    <template v-slot:hint>{{$t('pages.login.username_note')}}</template>
                  </q-input>
                  <q-input
                    ref="password"
                    type="password"
                    bottom-slots
                    v-model="loginForm.password"
                    :label="$t('pages.login.password')"
                    :rules="[
                      val => (val && val.length >= 6) || $t('pages.login.min_password_length')
                    ]"
                    lazy-rules
                  >
                    <template v-slot:before>
                      <q-icon name="security" />
                    </template>
                    <template v-slot:hint>{{$t('pages.login.password_note')}}</template>
                    <template v-slot:append>
                      <q-btn round dense flat icon="visibility" />
                    </template>
                  </q-input>
                </q-tab-panel>
                <q-tab-panel
                  v-for="(auth, index) in authorizationMethods"
                  :key="'authTab' + index"
                  :name="auth"
                >
                  <div class="text-h4 q-mb-md">{{$t(`pages.login.auth.${auth}.heading`)}}</div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('pages.register.title')"
            v-if="this.activeLoginMethod === 'username'"
            color="primary"
            v-close-popup
            @click="userRegister"
          />
          <q-btn
            flat
            :label="$t('pages.login.ok')"
            color="primary"
            v-if="isLogin"
            v-close-popup="successValidationIdentifier"
            @click="processLogin"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="register">
      <q-card class="min_width">
        <q-card-section>
          <div class="text-h6">{{$t('pages.register.title')}}</div>
          <p></p>
        </q-card-section>
        <q-card-section>
          <q-input
          ref="regUsername"
          type="text"
          bottom-slots
          v-model="registerForm.username"
          :label="$t('pages.register.username')"
          :rules="[val => !!val || $t('pages.login.email_note')]"
          required
          lazy-rules>
          <template v-slot:before>
            <q-icon name="user" />
          </template>
          <template v-slot:hint>{{$t('pages.register.username_note')}}</template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
          ref="regEmail"
          type="email"
          bottom-slots
          v-model="registerForm.email"
          :label="$t('pages.register.email')"
          :rules="[val => required || $t('pages.register.email_note')]"
          required
          lazy-rules>
          <template v-slot:before>
            <q-icon name="user" />
          </template>
          <template v-slot:hint>{{$t('pages.register.email_note')}}</template>
        </q-input>
       </q-card-section>
       <q-card-section>
        <q-input
          ref="regPassword"
          type="password"
          bottom-slots
          v-model="registerForm.password"
          :label="$t('pages.register.password')"
          :rules="[
            val => (val && val.length >= 6) || $t('pages.login.min_password_length')
          ]"
          lazy-rules>
          <template v-slot:before>
            <q-icon name="user" />
          </template>
          <template v-slot:hint>{{$t('pages.register.password_note')}}</template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('pages.login.login')"
            color="primary"
            v-close-popup
            @click="userLogin"
          />
          <q-btn
          flat
          :label="$t('pages.register.title')"
          color="primary"
          v-close-popup="successRegister"
          @click="processRegister"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view
        :loginId="loginId"
        :hasToken="hasToken"
        :userLogin="userLogin"
        :userLogout="userLogout"
        :login="login"
        :userRegister="userRegister"
      />
    </q-page-container>
  </q-layout>
</template>
<script>

import state from '../store/config/state'
import { hasLocalStorage } from 'boot/storage'
export default {
  name: 'FullLayout',
  components: {},
  data () {
    return {
      loginForm: {
        identifier: '',
        password: ''
      },
      phoneLogin: {
        phone: '',
        appVerifier: '',
        otp: ''
      },
      activeLoginMethod: 'username',
      isOtp: false,
      isLogin: true,
      sendOtp: false,
      tab: 'username',
      tab1: 'phone',
      splitterModel: 20,
      debug: this.$debug.extend('page:index'),
      login: false,
      register: false,
      authorizationMethods: [
        'username',
        'google',
        'facebook'
      ],
      loginId: '',
      successValidationIdentifier: false,
      /*eslint-disable */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      results: null,
      hasToken:
        hasLocalStorage() &&
        localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== ""
          ? 1
          : 0,
      loginErr: '',
      successRegister: false,
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      registerErr: ''
    };
  },
  mounted () {
    if (hasLocalStorage()) {
      var token = localStorage.getItem('token')
      this.loginId = localStorage.getItem('loginId')
    }
  },
  methods: {
    userLogin() {
      this.login = true;
    },
    userRegister() {
      this.register = true;
    },
    forget() {},
    activeAuthMethod(auth) {
      this.activeLoginMethod = auth;
    },
    processRegister(){
      this.$refs.regUsername.validate();
      this.$refs.regEmail.validate();
      this.$refs.regPassword.validate();
      if (this.$refs.regUsername.hasError || this.$refs.regEmail.hasError || this.$refs.regPassword.hasError) {
        this.successRegister = false;
        return false;
      } else {
        this.successRegister = true;
      }
      var dataObj = {
        'username': this.registerForm.username,
        'email': this.registerForm.email,
        'password': this.registerForm.password
        }
      var self = this
      this.$common.timeline.callUserRegister(dataObj)
      .then(user => {
        if (!hasLocalStorage()) return false
        self.registerErr = ''
        localStorage.setItem("loginId", user.user.id);
        localStorage.setItem("email", user.user.email);
        localStorage.setItem("token", user.jwt);
        self.hasToken = 1;
        self.successRegister = true;
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
        self.successRegister = false
        self.registerErr = 'Invalid data'
      });
    },
    processLogin() {
      if (this.activeLoginMethod === "username") {
        this.$refs.identifier.validate();
        this.$refs.password.validate();
        if (this.$refs.identifier.hasError || this.$refs.password.hasError) {
          this.successValidationIdentifier = false;
        } else {
          this.successValidationIdentifier = true;
        }
         var dataObj = {
            'identifier': this.loginForm.identifier,
            'password': this.loginForm.password
          }
        var self = this
        this.$common.timeline.callUserLogin(dataObj)
        .then(user => {
          if (!hasLocalStorage()) return false
          self.loginErr = ''
          localStorage.setItem("loginId", user.user.id);
          localStorage.setItem("email", user.user.email);
          var dataObj = {
            'email': self.loginForm.identifier,
            'password': self.loginForm.password
          }
          localStorage.setItem("token", user.jwt);
          self.hasToken = 1;
          self.successValidationIdentifier = true;
          window.location.reload();
        })
        .catch(error => {
          self.successValidationIdentifier = false
          self.loginErr = $t('pages.login.incorrect_detail')
        });
      } else if (this.activeLoginMethod === "google") {
        this.signinWithGoogle();
      } else if (this.activeLoginMethod === "facebook") {
        this.signInWithFb();
      }
    },
    signinWithGoogle() {
      let url = state.server + 'connect/google'
      window.location = url;
    },
    userLogout() {
      if (!hasLocalStorage()) return false
      localStorage.removeItem("token");
      window.location.href = state.url;
    },
    signInWithFb() {
      let url = state.server + 'connect/facebook'
      window.location = url;
    },
    onUpdate(payload) {
      this.results = payload;
    },
    saveAndGetUserData(dataObj, reloadFlag) {
      if (typeof reloadFlag === "undefined") {
        reloadFlag = 1;
      }
      var self = this;
      // call user auth service and pass googleObj
      this.$common.timeline
        .callUserAuth(dataObj)
        .then(function(response) {
          hasLocalStorage() && localStorage.setItem("token", response.token);
          self.hasToken = 1;
          if (reloadFlag == 1) {
            window.location.reload();
          }
        })
        .catch(function(error) {
          console.error(error)
        });
    }
  },
  computed: {
    required() {
      if(this.loginForm.email !== '' && typeof this.loginForm.email != 'undefined'){
        if (this.reg.test(this.loginForm.email)) {
          return true;
        } else {
          return false;
        }
      }

      if(this.registerForm.email !== '' && typeof this.registerForm.email != 'undefined'){
        if (this.reg.test(this.registerForm.email)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.phoneHeight {
  // height: 200px;
}
/deep/ .overflow {
  /deep/.scroll {
  }
}
/deep/ .country-selector__list {
  height: 150px;
}
.error{
  color: #c10015
}
.min_width{min-width:560px;}
</style>
