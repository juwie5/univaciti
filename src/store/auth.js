import axios from 'axios'
import router from '../router/index'


export default{
    namespaced: true,
    state: {
        user: null
    },
    getters: {
      authenticated(state){
        return state.user
    },
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_USER (state, data){
            state.user = data 
          },
          
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
                  router.push('/home')
                  commit('SET_USER', res.data.user)
                  
                } else {
                  return null 
                }
            } catch (err){
              return err
            }
      },
      async signUp({dispatch},credrentials){
            let email = credrentials.email
            let firstname = credrentials.firstname
            let lastname = credrentials.lastname
            let mobilenumber = credrentials.mobilenumber
            let password = credrentials.password
            let address = credrentials.address

            const SIGNENDPOINT  = "https://qag4ih5s2h.execute-api.us-east-1.amazonaws.com/dev/user/create-user"
            try{
              const res = await axios({
                method: 'post',
                url: `${SIGNENDPOINT}`,
                headers:{
                  'Content-Type': 'text/plain'
                },
                data: {
                  email: email,
                  firstname: firstname,
                  lastname: lastname,
                  mobilenumber: mobilenumber,
                  password: password,
                  address: address,
                  usertype: 2
                }
              })
              if(res.status == 200){
                dispatch('signIn', credrentials);
              } else {
                return null
              }
            }catch(err){
              return err
            }
      },
      logout({commit}){
        commit('SET_USER', 'null')
        router.push('/')
      },
    
    }
}