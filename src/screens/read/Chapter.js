import React from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../helper/const'
import Icon from 'react-native-vector-icons/Feather'

const {width} = Dimensions.get('screen')

const Chapter = ({route, navigation}) => {
    const [loading, setloading] = React.useState(true)
    const [chapterlist, setchapterlist] = React.useState({})
    const params = `chapter?id=${route.params.id}`

    React.useEffect(() => {
        api.get(params).then(result => {
            setloading(false)
            setchapterlist(result.data.results.komik)
            console.log(result.data.results.komik.images)
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
        <View style={{backgroundColor:'#f0f0f0'}}>
        <ScrollView>
           <View style={{paddingHorizontal: 14, paddingVertical: 10}}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="chevron-left" size={24} color={'#000'} style={{marginLeft:8}}></Icon>
                    <Text style={{margin:5,color:'#000',fontSize:18}}>Kembali</Text>
                </TouchableOpacity>
            </View>
                <View style={{margin:10,padding:10,backgroundColor:'#fff',borderRadius:10}}>
                    <Text style={{fontSize:20}}>{chapterlist.title}</Text>
                </View>
                <View style={{width:'100%',height:'100%'}}>
                    {chapterlist?.images ? chapterlist.images.map((value, index) => (
                        <View key={index}>
                            <Image source={{uri:value.link}} style={{height:1024,width: width}} />
                        </View>
                    )) : null}
                </View>
       </ScrollView>
       </View>
       </>
    )
}

export default Chapter

const styles = StyleSheet.create({})
