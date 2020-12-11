import React from 'react'
import { StyleSheet, Image, ActivityIndicator } from 'react-native'

const Landing = ({navigation}) => {
    React.useEffect(() => {
        const otwhome = setTimeout(() => {
            navigation.replace('Home')
        }, 3000);        
        return () => {
            clearTimeout(otwhome)
        }
    }, [])
    return (
        <>
        <Image source={require('../../assets/landing.jpg')} style={styles.container} />
        <ActivityIndicator size={'large'} color='#000' style={styles.activityLoader} />
        </>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        height:'85%',
        width:'100%',
        alignSelf:'center'
    },
    activityLoader:{
        marginTop:25
    }
})
