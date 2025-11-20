import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Image, View } from 'react-native'
import { AuthContext } from '../../providers/AuthProvider'

export default function TabLayout () {
  const { currentUser } = useContext(AuthContext)

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name='search' size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name='newPost'
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='add-circle-outline' size={size + 4} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#000' : '#888'
              }}
            >
              <Image
                source={{
                  uri: currentUser?.image || 'https://placehold.co/100'
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover'
                }}
              />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
