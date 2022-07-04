import axios from 'axios'
import router from '../router/index'


export default{
    namespaced: true,
    state: {
        user: null
    },
    getter : {
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_USER (state, data){
            state.user = data 
          }
    },
    actions: {
        async signIn({ commit }, credrentials){
            let username = credrentials.email
            let password = credrentials.password
            const REQENDPOINT = "https://qag4ih5s2h.execute-api.us-east-1.amazonaws.com/dev/login"
            try{
                const res = await axios({
                  method: 'post',
                  url: `${REQENDPOINT}`,
                  headers: {
                    'Content-Type': 'text/plain'
                  },
                  data: {
                    username : username,
                    password: password
                  }
                }) 
                if(res.status == 200){
                  console.log(res.data.user)
                  commit('SET_USER', res.data.user)
                } else {
                  return null 
                }
            } catch (err){
              return err
            }
          }
    }
}