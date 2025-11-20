import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default function LoadingIcon () {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center'
  },
  loading: {}
})
