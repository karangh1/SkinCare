import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Camera,CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button.jsx';

export default function CameraScreen() {

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
      try{
        await MediaLibrary.createAssetAsync(image);
        alert("Picture is saved");
        setImage(null);
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
          <Button title={'Save'} icon="check" onPress={saveImage} />
        </View>:
        <Button title={'Take picture'} icon="camera" onPress={takePicture}/>
        }
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE099',
    justifyContent: 'center',
    paddingBottom:15
  },
  camera:{
    flex:1,
    marginTop:60,
  }
});
