import AsyncStorage from '@react-native-async-storage/async-storage';

export const Datos = {
    username :"",
    first_name:"",
    email:"",
    token:"",
    loggedIn:false,
    peliculas:[]
}


const storeToken = async (email,value) => {

    try {
      await AsyncStorage.setItem('token', JSON.stringify({email:email, token:value}))
    } catch (e) {
      // saving error
    }

  }

 
 
  // Action tiene
  // type: 
  // payload:
export const reducer=(state, action) => {

    switch(action.type) {
        case 'LOGIN_AND_STORE':
            storeToken(action.payload.email, action.payload.token)
            return {...state, loggedIn:true, token:action.payload.token, email:action.payload.email}
        case 'LOGIN':
              return {...state, loggedIn:true, token:action.payload.token, email:action.payload.email}
        case 'TRAER_PELICULAS':
             return({...state, peliculas:action.payload})

        case 'LOGOUT':
            storeToken(null)
            return {...state, loggedIn:false, token:null}

    }

}