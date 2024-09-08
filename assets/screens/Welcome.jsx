import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { requestPermissionsAsync } from 'expo-media-library';

const {height,width} = Dimensions.get("window")

const Welcome = () => {
 
  const navigate=useNavigation();  
  const goto=()=>{
      navigate.navigate("main")
  }
  const doenButton=({...props})=>{
    return(
      <TouchableOpacity style={styles.button} {...props} >
        <Text style={{fontSize:20,fontWeight:"bold",color:"white"}} >Done</Text>
      </TouchableOpacity>
    )
  }
  const SkipButton=({...props})=>{
    return(
      <TouchableOpacity style={styles.button} {...props} >
        <Text style={{fontSize:20,fontWeight:"semibold",color:"white"}} >Skip</Text>
      </TouchableOpacity>
    )
  }
  const NextButton=({...props})=>{
    return(
      <TouchableOpacity style={styles.button} {...props} >
        <Text style={{fontSize:20,fontWeight:"semibold",color:"white"}} >Next</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={goto}
      onSkip={goto}
      bottomBarHighlight={false}
      DoneButtonComponent={doenButton}
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
          pages={[
            {
              backgroundColor: 'white',
              image: 
              <View style={styles.lottie}>
                 <LottieView style={{flex:1}} source={require('../assets/animations/welcome.json')} autoPlay loop /> 
              </View>,
              title: 'Welcome to SkinCare',
              subtitle: 'Done with React Native Onboarding Swiper',
              titleStyles:{ fontWeight:"bold" }
            },
            {
              backgroundColor: 'white',
              image: 
              <View style={styles.lottie}>
                 <LottieView style={{flex:1}} source={require('../assets/animations/takePhoto.json')} autoPlay loop /> 
              </View>,
              title: 'Click Picture',
              subtitle: 'Take photo of infected area.',
              titleStyles:{ fontWeight:"bold" }
            },
            {
              backgroundColor: 'white',
              image: 
              <View style={styles.lottie}>
                 <LottieView style={{flex:1}} source={require('../assets/animations/upload2.json')} autoPlay loop /> 
              </View>,
              title: 'Upload Picture',
              subtitle: 'Take photo of infected area.',
              titleStyles:{ fontWeight:"bold" }
            },
          ]}
      />
    </View>
  )
}

export default Welcome


const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:"white"
   },
   lottie:{
     width:width,
     height:width,
     marginBottom:-50

   },
   
   button:{
     backgroundColor:"#5356FF",
     paddingHorizontal:30,
     paddingVertical:10,
     color:"#fff",
     borderRadius:30,
     marginHorizontal:10
    }
   

}) 