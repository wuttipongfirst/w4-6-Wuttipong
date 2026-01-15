import { View , Text , TextInput , TouchableOpacity , StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";

export default function Home(){
    const [text , setText] = useState("")
    const[fruit , setFruit] = useState("")

    useEffect(() => {
        loadFruit()
    }, [])

    async function saveFruit(){
        await AsyncStorage.setItem("fruit",text)
        setFruit(text)
        setText("")
    }

    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if(data != ""){
            setFruit(data!.toString())
        }
    }

    async function removeFruit() {
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }   
    
    return(
        <View style={myStyles.container}>
            <Text>Fruit : {fruit} </Text>
            <TextInput style={myStyles.input} value={text} onChangeText={setText} />
            <TouchableOpacity onPress={saveFruit}>
                <Text> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeFruit}>
                <Text> Delete </Text>
            </TouchableOpacity>
        </View>
    )
}

const myStyles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  input:{
    borderWidth:1,
    width:"80%"
  }
})