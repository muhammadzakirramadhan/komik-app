import React from 'react'
import { ActivityIndicator, StyleSheet, ScrollView, Text, View, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../helper/const'

const Home = ({navigation}) => {
    const [manga, setmanga] = React.useState([])
    const [loading, setloading] = React.useState(true)
    const [refresh, setrefresh] = React.useState(false)
    const [offset, setoffset] = React.useState(10)

    const [load, setload] = React.useState(false)

    const params = ''
    React.useEffect(() => {
        api.get(params).then(result => {
            setloading(false)
            setmanga(result.data.results.latest_chapter)
        }).catch(err => console.log(err))
    }, [])

    const onRefresh = () => {
        setrefresh(true)
        api.get(params).then(result => {
            setoffset(10)
            setrefresh(false)
            setmanga(result.data.results.latest_chapter)
        }).catch(err => console.log(err))
    }

    const loadmore = () => {
        setload(true)
        setTimeout(() => {
            setoffset(offset + 10)
            setload(false)
        }, 2000);
    }

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
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} /> }>
            <View style={{justifyContent:'center',margin:6,backgroundColor:'#f0f0f0'}}>
                {manga.slice(0,offset).map((value, index) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailKomik', {id:value.linkId})} style={{flexDirection:'row',padding:8,borderRadius:10,marginBottom:4, backgroundColor:'#7371fc'}} key={index}>
                        <ImageBackground source={{uri:value.image}} style={{height:100,width:100,borderRadius:10,alignItems:'flex-end'}}>
                            {value.isHot ? <Text style={{backgroundColor:'red',paddingHorizontal:7,color:'#fff',marginVertical:5,opacity:0.7,borderRadius:4}}>Popular</Text> : null}
                        </ImageBackground>
                        <View  style={{width: '80%',margin:9, justifyContent:'space-between'}}>
                            <Text style={{color:'#fff',width:'70%', fontSize:17}} numberOfLines={2} ellipsizeMode='tail'>{value.title}</Text>
                            {value.chapters.map((val, ind) => (
                                <View style={{flexDirection:'row'}} key={ind}>
                                    <Text style={{color:'#fff'}}>{val.title}</Text>
                                    <Text style={{color:'#2c3e50', paddingLeft:8}}>{val.time_uploaded}</Text>
                                </View>
                            ))}
                            {/* <Text style={{color:'#fff'}}>{value.chapter}</Text> */}
                        </View>
                    </TouchableOpacity>
                ))}
                {
                    load ? 
                        <ActivityIndicator size="large" color="#000" style={{alignSelf: "center"}} /> :

                    <TouchableOpacity onPress={loadmore} style={{alignItems:'center',backgroundColor:'#7371fc',paddingVertical:10,marginHorizontal:10,borderRadius:10}}>
                        <Text style={{fontSize:20,color:'#fff'}}>Load More</Text>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    
})
