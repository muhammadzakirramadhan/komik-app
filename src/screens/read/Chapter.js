import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Chapter = ({route}) => {
    return (
        <View>
            <Text>{route.params.id}</Text>
        </View>
    )
}

export default Chapter

const styles = StyleSheet.create({})
