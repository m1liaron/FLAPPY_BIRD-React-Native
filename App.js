import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ImageBackground, Image, Linking  } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities'
import Physics from './Physics';
import { useEffect, useState } from 'react';
import ComeBackAlive from './images/Come_Back_Alive_Ukrainian_logo_09.2022.svg.png'

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, [])

  return (
    <ImageBackground
      source={require('./images/gfdgdd.png')} // replace with your image path
      style={{ flex: 1 }}
    >
      <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {setGameEngine(ref)}}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch(e.type){
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
             break;
             case 'new_point':
                setCurrentPoints(currentPoints + 1);
                break;
          }
        }}
        style={{
          flex: 1
        }}
      >
        <StatusBar style="auto" hidden={true}/>
      </GameEngine>

      {!running ? 
          <View style={{position:'absolute',backgroundColor:'#F2D7D5', height:'100%', width:'100%', display:'flex', justifyContent:'center'}}>
              <View style={{display:'flex', justifyContent:'center', marginBottom:20}}>
                  <Text style={{fontSize:30}}>
                    Help Ukraine!🙏
                  </Text>
                  <TouchableOpacity
                  onPress={() => {
                    // Replace the URL with the one you want to navigate to
                    const url = 'https://savelife.in.ua/donate/#donate-army-card-monthly';
                    Linking.openURL(url)
                      .then(() => console.log(`Opened URL: ${url}`))
                      .catch((error) => console.error(`Error opening URL: ${url}`, error));
                  }}
                >
                  <Image
                    source={ComeBackAlive}
                    style={{
                      width: 350, height: 140, backgroundColor: 'white'
                    }}
                  />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity style={{backgroundColor: 'black', padiingHorizotal: 30, paddingVertical: 10, marginBottom:'10px'}}
                onPress={() => {
                  setCurrentPoints(0);
                  setRunning(true)
                  gameEngine.swap(entities());
                }}
              >

                <Text style={{fontWeight:'bold', color:'white', fontSize: 30, textAlign:'center'}}>
                  START GAME
                </Text>
              </TouchableOpacity>
          </View>  : null
      }
    </View>
    </ImageBackground>
  );
}