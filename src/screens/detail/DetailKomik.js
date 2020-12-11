import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../helper/const'

const DetailKomik = ({navigation, route}) => {
    const [loading, setloading] = React.useState(true)
    const [info, setinfo] = React.useState({})
    const params = `manga/detail/${route.params.id}`
    React.useEffect(() => {
        api.get(params).then(result =>{
            setloading(false)
            setinfo(result.data)
            console.log(result.data)
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
        <View style={{height:60, position: 'absolute', backgroundColor: 'transparent', zIndex: 2}}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text style={{margin:20,color:'#fff',fontSize:20}}>Mangacuy</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={{backgroundColor:'#f0f0f0'}}>
            <View style={{width:'100%',height:250, backgroundColor:'#7371fc', borderBottomLeftRadius:30, padding:20}}>
                <View style={{alignSelf:'flex-start',marginTop:70, marginHorizontal:20, flexDirection:'row'}}>
                    <Image source={{uri:info.thumb}} style={{height:110,width:100,borderRadius:10}} />
                    <View style={{width:'70%', justifyContent:'space-between',margin:9}}>
                        <View>
                            <Text style={{width:'100%',color:'#fff',fontSize:19}}>{info.title}</Text>
                            <Text style={{color:'#fff', fontSize:15}}>{info.author}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{alignSelf:'flex-end', position:'relative', right:20, top:-23, backgroundColor:'#fff', padding:10, fontSize:18, borderRadius:10}}>{info.status}</Text>
            <View style={{marginHorizontal:25}}>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Genre</Text>
                <ScrollView horizontal={true}>
                    {info?.genre_list ? info.genre_list.map((value, index) => (
                        <View key={index} style={{marginHorizontal:5,paddingVertical:7}}>
                            <Text style={{backgroundColor:'#fff', borderRadius:10, padding:8}}>{value.genre_name}</Text>
                        </View>
                    )) : null}
                </ScrollView>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Sinopsis</Text>
                <View style={{marginVertical:5, borderRadius:10, backgroundColor:'#fff',justifyContent:'flex-end', padding:15}}>
                    <Text style={{fontSize:14, textAlign:'justify'}}>{info.synopsis}</Text>
                </View>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Chapter</Text>
                <View style={{marginVertical:5, borderRadius:10, backgroundColor:'#fff', padding:15, flexDirection:'row', width:'100%'}}>
                <ScrollView alwaysBounceVertical={true}>    
                    {info?.chapter ? info.chapter.map((value, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Chapter', {id:value.chapter_endpoint})} key={index}>
                            <Text style={{width:'90%', marginVertical:3, fontSize:18}}>{value.chapter_title}</Text>
                        </TouchableOpacity>
                    )) : null}
                </ScrollView>
                </View>
            </View>
            </View>
        </ScrollView>
        </>
    )
}

export default DetailKomik

const styles = StyleSheet.create({})
