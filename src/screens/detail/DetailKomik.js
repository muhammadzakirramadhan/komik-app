import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../helper/const'
import Icon from 'react-native-vector-icons/Feather'

const DetailKomik = ({navigation, route}) => {
    const [loading, setloading] = React.useState(true)
    const [info, setinfo] = React.useState({})
    const params = `komik?id=${route.params.id}`
    React.useEffect(() => {
        api.get(params).then(result =>{
            setloading(false)
            setinfo(result.data.results.komik)
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
        <ScrollView>
        <View style={{height:60, position: 'absolute', backgroundColor: 'transparent', zIndex: 2, flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.pop()} style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name="chevron-left" size={24} color={'#fff'} style={{marginLeft:8}}></Icon>
                <Text style={{margin:5,color:'#fff',fontSize:18}}>Kembali</Text>
            </TouchableOpacity>
        </View>
            <View style={{backgroundColor:'#f0f0f0'}}>
            <View style={{width:'100%',height:250, backgroundColor:'#7371fc', borderBottomLeftRadius:30, padding:20}}>
                <View style={{alignSelf:'flex-start',marginTop:70, marginHorizontal:20, flexDirection:'row'}}>
                    <Image source={{uri:info.image}} style={{height:110,width:100,borderRadius:10}} />
                    <View style={{width:'70%', justifyContent:'space-between',margin:9}}>
                        <View>
                            <Text style={{width:'100%',color:'#fff',fontSize:19}} numberOfLines={2} ellipsizeMode='tail'>{info.title}</Text>
                            <Text style={{color:'#fff', fontSize:15}}>{info.author}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{alignSelf:'flex-end', position:'relative', right:20, top:-23, backgroundColor:'#fff', padding:10, fontSize:18, borderRadius:10}}>{info.status}</Text>
            <View style={{marginHorizontal:25}}>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Detail</Text>
                <View style={{marginVertical:5, borderRadius:10, backgroundColor:'#fff',justifyContent:'flex-end', padding:18}}>
                    <View style={{flexDirection:'row', width:'80%'}}>
                        <Text style={{marginRight:5}}>Title :</Text>
                        <Text>{info.title}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:5}}>Total Chapter :</Text>
                        <Text>{info.total_chapter}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:5}}>Type :</Text>
                        <Text>{info.type}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:5}}>Last Update :</Text>
                        <Text>{info.updated_on}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:5}}>Rating :</Text>
                        <Text>{info.rating}</Text>
                    </View>
                </View>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Genre</Text>
                <ScrollView horizontal={true}>
                    {info?.genres ? info.genres.map((value, index) => (
                        <View key={index} style={{marginHorizontal:5,paddingVertical:7,backgroundColor:'#fff',padding:5}}>
                            <Text style={{backgroundColor:'#fff', borderRadius:10, padding:8}}>{value}</Text>
                        </View>
                    )) : null}
                </ScrollView>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Sinopsis</Text>
                <View style={{marginVertical:5, borderRadius:10, backgroundColor:'#fff',justifyContent:'flex-end', padding:15}}>
                    <Text style={{fontSize:14, textAlign:'justify'}}>{info.sinopsis}</Text>
                </View>
                <Text style={{fontSize:25,textDecorationStyle:'solid',textDecorationLine:'underline'}}>Chapter</Text>
                <View style={{borderRadius:10, backgroundColor:'transparent', padding:0, flexDirection:'row', width:'100%'}}>
                <ScrollView alwaysBounceVertical={true}>    
                    {info?.list_chapter ? info.list_chapter.map((value, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Chapter', {id:value.linkId})} key={index} style={{backgroundColor:'#fff',marginVertical:5,padding:9,borderRadius:10,width:'100%'}}>
                            <Text style={{width:'90%', marginVertical:3, fontSize:18}}>Chapter : {value.chapter}</Text>
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
