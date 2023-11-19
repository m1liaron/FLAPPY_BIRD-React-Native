import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities'
import Physics from './Physics';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-web';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, [])

  return (
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
              setCurrentPoints(0)
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
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity style={{backgroundColor: 'black', padiingHorizotal: 30, paddingVertical: 10}}>
                <Text style={{fontWeight:'bold', color:'white', fontSize: 30}}>
                  START GAME
                </Text>
              </TouchableOpacity>
          </View>  : null
      }
    </View>
  );
}