
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import {useFonts} from 'expo-font'
import { colors } from './src/global/colors'
import MainNavigator from './src/navigation/MainNavigator'
import {Provider} from 'react-redux'
import store from './src/store/store'
import { initDatabase } from './src/db'

export default function App() {
  initDatabase()
    .then(()=> console.log('***** Database Initialized *****'))
    .catch((error)=> console.log('***** Database Initialization Failed *****', error))

  const [fontLoaded] = useFonts({
    'MeowScript': require('./assets/fonts/MeowScript-Regular.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  })

  if(!fontLoaded) return <View style={styles.spinnerContainer}>
                          <ActivityIndicator style={styles.fontLoadSpinner} size={'large'} />
                          <Text style={styles.fontLoadText}>Cargando Fonts...</Text>    
                        </View>
  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clear,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily: 'MeowScript',
    fontSize:35
  },
  spinnerContainer:{
    height:200,  
    alignSelf: 'center', 
    textAlign: 'center',
    backgroundColor: colors.primary,
    width: '80%',
    borderRadius:8,
    margin: 20,
    padding: 15

  },
  fontLoadSpinner:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 2 }],
    color: '#ffffff' // <-- por qué no funciona salvo que vaya en inline??
    
  },
  fontLoadText:{
    color: colors.clear,
    textAlign: 'center'
  }
});

