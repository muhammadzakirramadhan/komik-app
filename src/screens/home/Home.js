import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../helper/const'

const Home = ({navigation}) => {
    const [manga, setmanga] = React.useState([])
    const [loading, setloading] = React.useState(true)
    const params = 'manga/page/1'
    React.useEffect(() => {
        api.get(params).then(result => {
            setloading(false)
            setmanga(result.data.manga_list)
        }).catch(err => console.log(err))
    }, [])

    if(loading){
        return (
            <View style={{justifyContent:'center', alignItems:'center',height:'100%'}}>
                <ActivityIndicator size='large' color='#000'></ActivityIndicator>
            </View>
        )
    } 

    return (
        <>
        <View style={{height:60}}>
            <Text style={{margin:20,color:'#000',fontSize:19}}>Mangacuy</Text>
        </View>
        <ScrollView>
            <View style={{justifyContent:'center',margin:6}}>
                {manga.map((value, index) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailKomik', {id:value.endpoint})} style={{flexDirection:'row',padding:8,borderRadius:10,marginBottom:4, backgroundColor:'#7371fc'}} key={index}>
                        <ImageBackground source={{uri:value.thumb}} style={{height:100,width:100,borderRadius:10,alignItems:'flex-end'}}>
                            <Text style={{backgroundColor:'red',paddingHorizontal:7,color:'#fff',marginVertical:5,opacity:0.7,borderRadius:4}}>{value.type}</Text>
                        </ImageBackground>
                        <View  style={{width: '80%',margin:9, justifyContent:'space-between'}}>
                            <View>
                            <Text style={{color:'#fff',width:'70%'}}>{value.title}</Text>
                            <Text style={{color:'#fff'}}>{value.chapter}</Text>
                            </View>
                            <Text style={{color:'#fff'}}>{value.updated_on} Yang lalu.</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    
})
