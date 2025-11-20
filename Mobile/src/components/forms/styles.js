import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '70%',
    alignItems: 'stretch',
    gap: 8
  },
  button: {
    backgroundColor: '#808EFB',
    padding: 10,
    borderRadius: 12,
    flexGrow: 1
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#C2C2C2',
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
    flexGrow: 1,
    fontSize: 15
  },
  error: {
    fontSize: 12,
    color: '#a43030ff'
  }
})
