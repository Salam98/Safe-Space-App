import {React, useLayoutEffect, useState, useEffect } from 'react'
import {View, Text, StatusBar, StyleSheet,TouchableOpacity,ScrollView,Image,Linking} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from "react-native-paper";


const Game1Screen = ({route,navigation})=> {

  const { gameId, gemeName } = route.params;
  const [data, setData] = useState([]);

  const handleNavigation = () => {
    navigation.navigate("ChatRoom", {
        gameId: gameId , gemeName:gemeName,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: gemeName + ' News',
      headerRight: () => (
      <TouchableOpacity onPress={handleNavigation}>
      <Ionicons 
          name="chatbubble-ellipses-outline"
          size={28} 
          color={'white'} 
        />
      </TouchableOpacity>
    )});
  }, []);

  const getURL =()=>{
    if(gameId==1){
      const url =
      'https://newsapi.org/v2/everything?' +
      'q="Fortnite" OR "Fortnite News" OR "FortniteGame" '+
      'OR "@FNCompetitive" OR "Battle Royale"OR "@FortniteBR"'+
      'OR "fortnite skin"'+
      '&language=en&'+
      'sortBy=date'+
      '&apiKey=9987af03179644588005867b2342ea94';
      return url;
    }else {
      const url = 
      'https://newsapi.org/v2/everything?'+
      'q="CallOfDuty" OR "WarZone" OR "Modern Warfare"'+
      'OR "CallofDutyUK" OR "Warzone2News" OR "Call of Duty News" '+
      '&language=en&'+
      'sortBy=date'+
      '&apiKey=9987af03179644588005867b2342ea94';
      return url ;
  }
}

  const getArticles = () => {
    fetch(getURL())
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  };

  useEffect(() => {getArticles();}, []);

  return (
    <View style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyles="light-content" />

    {Object.keys(data).length > 0 && (
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 10,
            }}
          >
            {data.articles.map((article, index) => (
              <Card key={index} style={{ marginBottom:15 ,width: 370,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 15,
                    margin: 15,
                    marginBottom:5
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
                    {article.title}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: article.urlToImage }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{margin: 15, fontSize: 16 }}>{article.description}</Text>
                <Text style={{margin: 15, fontSize: 14, fontWeight: "bold"}} onPress={()=> Linking.openURL(article.url)}>Read More</Text>
                <Text style={{margin: 15, marginTop: 0, fontSize: 12 }}>{article.publishedAt}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});


export default Game1Screen;