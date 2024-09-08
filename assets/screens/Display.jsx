import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import data from '../constant/data.js'
import { useNavigation, useRoute } from '@react-navigation/native';
import  Actinic from '../server/upload/img_1713453615714.jpg'
import  Sorasis from '../server/upload/img_1714578894958.jpg'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
export default function Display() {
    const route = useRoute();
    const { disease } = route.params;
    var [dis,setDis]=useState({})
    const navigate=useNavigation()
    // const goto1=()=>{
    //    navigate.navigate("home")
    // }
    // const goto2=()=>{
    //     navigate.navigate("upload")
    // }
    useEffect(() => {
        console.log("inside display");
        console.log(disease); // Check if disease is defined and has the expected value
    
        // Find the disease in the data array
        const foundDisease = data.find(item => item.name.trim() === disease.trim());
        
        if (foundDisease) {
            console.log("found disease");
            console.log(foundDisease.name);
            setDis(foundDisease);
        } else {
            console.log("not found disease");
        }
    }, [disease, data]); 
    
  return (
   <ScrollView>
        <View style={{paddingTop:40}} >
            <Text style={{textAlign:"center",fontSize:30,fontWeight:"bold"}}>{disease}</Text>
        </View>
        <View style={{display:"flex", alignItems:"center" }} >
            <Image source={Actinic} style={{height:200,width:200}}/>
        </View>
        <View>
            <View style={{display:"flex",justifyContent:"center",alignItems:"center",paddingHorizontal:20,paddingVertical:10}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Symptoms</Text>
                <Text style={{textAlign:"justify"}}>{dis.symptoms}</Text>
            </View>
            <View style={{display:"flex",justifyContent:"center",alignItems:"center",paddingHorizontal:20,paddingVertical:10}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Remedies</Text>
                <Text  style={{textAlign:"justify"}}>{dis.remedies}</Text>
            </View>
        </View>
        <View style={{paddingHorizontal:20, marginTop:30,marginBottom:30,display:"flex", justifyContent:"space-between",gap:20}} >
           <TouchableOpacity style={styles.button} onPress={()=>navigate.navigate("home")} >
                <Text style={{color:"white",textAlign:"center",fontWeight:"bold"}} >Go to Home page</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={()=>navigate.navigate("upload")} >
                <Text style={{color:"white",textAlign:"center",fontWeight:"bold"}}>Go to Test page</Text>
           </TouchableOpacity>
        </View>
   </ScrollView>
  )
}


const styles = StyleSheet.create({
    
    button:{
      backgroundColor:"#5356FF",
      paddingHorizontal:30,
      paddingVertical:10,
      borderRadius:30,
      marginHorizontal:10
     }
    
 }) 