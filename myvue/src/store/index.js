import  Vue from "vue";
import  Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
     userInfo:{
       nickname:"",
       username:"",
       avatar:"",
       desc:"",
       email:"",
     },
     userInfoDetail:
       {
         nickname:"",
         username:"",
         avatar:"",
         desc:"",
         email:"",
         HandleUpdateTime:"",
         HandleDate:"",
       }
    },
   mutations:{
      SETSTATE_USERINFO(state,userInfo)
      {
        this.state.userInfo=userInfo;
      },
      SETSTATE_USERINFODETAIL(state,HandleUserInfo)
      {
        this.state.userInfoDetail=HandleUserInfo;
      }
   },
   plugins:[createPersistedState({
     storage: {
       getItem: key => sessionStorage.getItem(key),
       setItem: (key, value) =>
         sessionStorage.setItem(key, value),
       removeItem: key =>sessionStorage.removeItem(key),
     },
   }
   )]
});

export default store;
