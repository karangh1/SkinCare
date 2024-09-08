import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {Camera,CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Button from '../components/Button.jsx';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const navigate=useNavigation();
  const [hasCameraPermissiom,setHasCameraPermission]=useState(null);
  const [image,setImage]=useState(null);
  const [type,setType]=useState(Camera.Constants.Type.back);
  const [flash,setFlash]=useState(Camera.Constants.FlashMode.off);
  const cameraRef=useRef(null);
  
  useEffect(()=>{
    (async()=>{
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  },[])

  const saveImage=async()=>{
    if(image){
      console.log("image here")
      console.log(image)
      try{
        const formdata=new FormData();
        const type="image/jpeg";
        formdata.append('img', {
          uri: image,
          name: 'image.jpg', // Change the filename if needed
          type: type, // Change the type according to the image format
        });  
        console.log("formdata here")
        console.log(formdata._parts[0])
        let res= await fetch("http://192.168.0.104:4000/upload",{
            method:"POST",
            body: formdata,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }
        })
        console.log("after fetch...")
        const data=await res.json();
        console.log(data)
        navigate.navigate("display",{"disease":data.disease})
      }catch(err){
          console.log(err)
      }

    }
  }

  const takePicture= async ()=>{
    if(cameraRef){
      try {
        const data= await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if(hasCameraPermissiom == false){
    return(
      <Text>No acces to camera.</Text>
    )
  } 
  return (
    <View style={styles.container}>
      {!image?
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
      </Camera>:
      <Image source={{uri:image}} style={styles.camera} />
      }
      <View>
        {image?
        <View style={{
          flexDirection:"row",
          justifyContent:"space-around", 
        }}>
          <Button title={'Retake Picture'} icon="retweet" onPress={()=>setImage(null)} />
          <Button title={'Upload'} icon="check" onPress={saveImage} />
        </View>:
         <TouchableOpacity onPress={takePicture} style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:10}}>
           <View style={{display:"flex",flexDirection:"row",gap:10,alignItems:"center",backgroundColor:"white",borderRadius:30,fontSize:16,paddingHorizontal:20,paddingVertical:10}}>
             <Feather name="camera" size={24} color="black" />
             <Text style={{fontWeight:'bold'}}>Take Picture</Text>
           </View>
         </TouchableOpacity>
        }
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9966cc',
    justifyContent: 'center',
    paddingBottom:15
  },
  camera:{
    flex:1,
  }
});
