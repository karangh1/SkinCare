import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import login from '../assets/images/Login.gif'

import { useNavigation } from '@react-navigation/native'


const Signup = () => {
  const navigation=useNavigation();
  const goto=()=>{
    navigation.navigate('login')  
  }
 
  return (
    <View style={{backgroundColor:"white",flex:1}}>
        <View style={{display:"flex",flexDirection:"row",paddingTop:50,justifyContent:"center"}}>
             <Text style={{fontSize:30,fontWeight:"bold",color:"#5356FF"}}>Signup</Text>
        </View>
        <View style={{height:'50%'}}>
          <Image style={{width:'100%',height:'100%',objectFit:"cover"}} source={login} />
        </View>
        <View style={{paddingHorizontal:30,paddingVertical:20,display:"flex",gap:10}}>
            <TextInput placeholder='Karan@gmail,com...'
            style={{
               backgroundColor:"#F0F8FF",
               paddingVertical:5,
               paddingHorizontal:10,
               borderWidth:2,
               borderColor:"blue",
               borderRadius:10,
               borderColor:"#F0F8FF"
            }} />
            <TextInput placeholder='Password'
            style={{
               backgroundColor:"#F0F8FF",
               paddingVertical:5,
               paddingHorizontal:10,
               borderWidth:2,
               borderColor:"blue",
               borderRadius:10,
               borderColor:"#F0F8FF"
            }} />
           <TouchableOpacity onPress={goto}  style={{display:"flex",paddingVertical:10, borderRadius:10,paddingHorizontal:10,justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#5356FF"}}>
              <View style={{display:"flex",flexDirection:"row",gap:10,alignItems:"center",borderRadius:30}}>
                 <Text style={{fontWeight:'bold',color:"white",fontSize:20}}>Signup</Text>
              </View>
           </TouchableOpacity>
        </View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
             <Text>Already have Account?</Text>
             <TouchableOpacity onPress={goto} >
                  <Text style={{color:"#5356FF"}}> Login</Text>
             </TouchableOpacity>
           </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})