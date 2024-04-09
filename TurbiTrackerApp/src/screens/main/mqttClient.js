// const mqtt = require('mqtt');

// const username = "hivemq.webclient.1711425349658";
// const password = "5210ILDKFGoramip;,<.";

// const client = mqtt.connect({
//     hostname: "9316442d5cd740eaa3e88fe5a1848169.s1.eu.hivemq.cloud",
//     port: 8883,
//     protocol: 'mqtts',
//     username: username,
//     password: password
// });

// function setupMQTT() {
//     client.on('connect', function () {
//         console.log('Conexión establecida con HiveMQ');
//         client.subscribe("sensores/ph", { qos: 0 }, function (err) {
//             if (!err) {
//                 console.log('Suscripción exitosa al tema sensores/ph');
//             } else {
//                 console.error('Error al suscribirse a sensores/ph:', err);
//             }
//         });
        
//         client.subscribe("sensores/turbidity", { qos: 0 }, function (err) {
//             if (!err) {
//                 console.log('Suscripción exitosa al tema sensores/turbidity');
//             } else {
//                 console.error('Error al suscribirse a sensores/turbidity:', err);
//             }
//         });
//     });

//     client.on('message', function (topic, message) {
//         console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
//     });

//     client.on('error', function (err) {
//         console.error('Error en cliente MQTT:', err);
//     });

//     client.on('close', function () {
//         console.log('Conexión MQTT cerrada');
//     });
// }

// module.exports = { setupMQTT };




// // -------------------------
// /* @flow */
// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
// } from 'react-native';

// import { Input, Button} from '@rneui/base';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import init from 'react_native_mqtt';

// init({
//   size: 10000,
//   storageBackend: AsyncStorage,
//   defaultExpires: 1000 * 3600 * 24,
//   enableCache: true,
//   sync : {}
// });
// const options = {
//   host: '9316442d5cd740eaa3e88fe5a1848169.s1.eu.hivemq.cloud',
//   port: 8083,
//   path: '',
//   id: 'id_' + parseInt(Math.random()*100000)
// };

// client = new Paho.MQTT.Client(options.host, options.port, options.path);

// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       topic: 'temperatura',
//       subscribedTopic: 'temperatura',
//     };
//     client.onConnectionLost = this.onConnectionLost;
//     client.onMessageArrived = this.onMessageArrived;
//   }
//   // 连接成功
//   onConnect = () => {
//     console.log('onConnect');
//     this.setState({ status: 'connected' });
//   }
//   // 连接失败
//   onFailure = (err) => {
//     console.log('Connect failed!');
//     console.log(err);
//     this.setState({ status: 'failed' });
//   }
//   // 连接 MQTT 服务器
//   connect = () => {
//     this.setState(
//       { status: 'isFetching' },
//       () => {
//         client.connect({
//           onSuccess: this.onConnect,
//           useSSL: false,
//           timeout: 3,
//           onFailure: this.onFailure
//         });
//       }
//     );
//   }
//   // 连接丢失
//   onConnectionLost=(responseObject)=>{
//     if (responseObject.errorCode !== 0) {
//       console.log('onConnectionLost:' + responseObject.errorMessage);
//     }
//   }
//   // 收到消息
//   onMessageArrived = (message )=> {
//     console.log('onMessageArrived:' + message.payloadString);
//     newmessageList = this.state.messageList;
//     newmessageList.unshift(message.payloadString);
//     this.setState({ messageList: newmessageList });
//     // this.MessageListRef.scrollToEnd({animated: false});
//   }
//   onChangeTopic = (text) => {
//     this.setState({ topic: text });
//   }
//   // 主题订阅
//   subscribeTopic = () => {
//     this.setState(
//       { subscribedTopic: this.state.topic },
//       () => {
//         client.subscribe(this.state.subscribedTopic, { qos: 0 });
//       }
//     );
//   }
//   // 取消订阅
//   unSubscribeTopic = () => {
//     client.unsubscribe(this.state.subscribedTopic);
//     this.setState({ subscribedTopic: '' });
//   }
//   onChangeMessage = (text) => {
//     this.setState({ message: text });
//   }
//   // 消息发布
//   sendMessage = () =>{
//     var message = new Paho.MQTT.Message(options.id + ':' + this.state.message);
//     message.destinationName = this.state.subscribedTopic;
//     client.send(message);
//   }
//   renderRow = ({ item, index }) => {
//     idMessage = item.split(':');
//     console.log('>>>ITEM', item);
//     return(
//       <View 
//         style={[
//           styles.componentMessage,
//           idMessage[0] == options.id ?
//             styles.myMessageComponent
//           :
//             (idMessage.length == 1 ? styles.introMessage : styles.messageComponent),
//         ]}
//       >
//         <Text style={idMessage.length == 1 ? styles.textIntro : styles.textMessage}>
//           {item}
//         </Text>
//       </View>
//     )
//   }
//   _keyExtractor = (item, index) => item + index;
//   render() {
//     const { status, messageList } = this.state;
//     return (
//       <View style={styles.container}>
//         <Text
//           style={{
//             marginBottom: 50,
//             textAlign: 'center',
//             color: this.state.status === 'connected' ? 'green' : 'black'
//           }}
//         >
//           ClientID: {options.id}
//         </Text>
//         {
//           this.state.status === 'connected' ?
//             <View>
//               <Button
//                 type='solid'
//                 title='DISCONNECT'
//                 onPress={() => {
//                   client.disconnect();
//                   this.setState({ status: '', subscribedTopic: '' });
//                 }}
//                 buttonStyle={{ marginBottom:50, backgroundColor: '#397af8' }}
//                 icon={{ name: 'lan-disconnect', type: 'material-community', color: 'white' }}
//               />
//               <View style={{ marginBottom: 30, alignItems: 'center' }}>
//                 <Input
//                   label='TOPIC'
//                   placeholder=''
//                   value={this.state.topic}
//                   onChangeText={this.onChangeTopic}
//                   disabled={this.state.subscribedTopic}
//                 />
//                 {
//                   this.state.subscribedTopic ?
//                     <Button
//                       type='solid'
//                       title='UNSUBSCRIBE'
//                       onPress={this.unSubscribeTopic}
//                       buttonStyle={{ backgroundColor: '#397af8' }}
//                       icon={{ name: 'link-variant-off', type: 'material-community', color: 'white' }}
//                     />
//                   :
//                     <Button
//                       type='solid'
//                       title='SUBSCRIBE'
//                       onPress={this.subscribeTopic}
//                       buttonStyle={{ backgroundColor: '#397af8' }}
//                       icon={{ name: 'link-variant', type: 'material-community', color: 'white' }}
//                       disabled={!this.state.topic || this.state.topic.match(/ /) ? true : false}
//                     />
//                 }
//               </View>
//               {
//                 this.state.subscribedTopic ?
//                   <View style={{ marginBottom: 30, alignItems: 'center' }}>
//                     <Input
//                       label='MESSAGE'
//                       placeholder=''
//                       value={this.state.message}
//                       onChangeText={this.onChangeMessage}
//                     />
//                     <Button
//                       type='solid'
//                       title='PUBLISH'
//                       onPress={this.sendMessage}
//                       buttonStyle={{ backgroundColor: status === 'failed' ? 'red' : '#397af8' }}
//                       icon={{ name: 'send', color: 'white' }}
//                       disabled={!this.state.message || this.state.message.match(/^[ ]*$/) ? true : false}
//                     />
//                   </View>
//                 :
//                   null
//               }
//             </View>
//           :
//             <Button
//               type='solid'
//               title='CONNECT'
//               onPress={this.connect}
//               buttonStyle={{
//                 marginBottom:50,
//                 backgroundColor: status === 'failed' ? 'red' : '#397af8'
//               }}
//               icon={{ name: 'lan-connect', type: 'material-community', color: 'white' }}
//               loading={status === 'isFetching' ? true : false}
//               disabled={status === 'isFetching' ? true : false}
//             />
//         }
//         <View style={styles.messageBox}>
//           <FlatList
//             ref={ref => (this.MessageListRef = ref)}
//             data={messageList}
//             renderItem={this.renderRow}
//             keyExtractor={this._keyExtractor}
//             extraData={this.state}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 70,
//   },
//   messageBox:{
//     margin: 16,
//     flex: 1,
//   },
//   myMessageComponent:{
//     backgroundColor: '#000000',
//     borderRadius: 3,
//     padding: 5,
//     marginBottom: 5,
//   },
//   messageComponent:{
//     marginBottom: 5,
//     backgroundColor: '#0075e2',
//     padding: 5,
//     borderRadius: 3,
//   },
//   introMessage:{
//   },
//   textInput:{
//     height: 40,
//     margin: 5,
//     borderWidth: 1,
//     padding: 5,
//   },
//   textIntro:{
//     color: 'black',
//     fontSize: 12,
//   },
//   textMessage:{
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default App;

// // ----------------------

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MQTT from 'paho-mqtt';

// const SensorsScreen = () => {
//   const [connectionResult, setConnectionResult] = useState('');
//   const [subscriptionResult, setSubscriptionResult] = useState('');

//   useEffect(() => {
//     // Create a client instance
//     const client = new MQTT.Client("9316442d5cd740eaa3e88fe5a1848169.s1.eu.hivemq.cloud", Number(8883), "clientId1");

//     // set callback handlers
//     client.onConnectionLost = onConnectionLost;
//     client.onMessageArrived = onMessageArrived;

//     // connect the client with authentication
//     const options = {
//       onSuccess: onConnect,
//       useSSL: true, // Enable SSL/TLS
//       userName: "hivemq.webclient.1711425349658",
//       password: "5210ILDKFGoramip;,<."
//     };
//     client.connect(options);

//     // called when the client connects
//     setConnectionResult('Comezando'); 

//     // called when the client connects
//     function onConnect() {
//       // Once a connection has been made, make a subscription.
//       console.log("onConnect");
//       client.subscribe("temperatura");
//       setConnectionResult('Connected'); // Update connection result state
//     }

//     // called when the client loses its connection
//     function onConnectionLost(responseObject) {
//       if (responseObject.errorCode !== 0) {
//         console.log("onConnectionLost:" + responseObject.errorMessage);
//         setConnectionResult('Connection lost'); // Update connection result state
//       }
//     }

//     // called when a message arrives
//     function onMessageArrived(message) {
//       console.log("onMessageArrived:" + message.payloadString);
//       setSubscriptionResult(message.payloadString); // Update subscription result state
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Sensors Screen</Text>
//       <Text style={styles.text}>{connectionResult}</Text>
//       <Text style={styles.text}>{subscriptionResult}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#000000',
//   },
//   result: {
//     marginTop: 10,
//     color: '#FF0000',
//   }
// });

// export default SensorsScreen;
// // ---------------


// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text } from 'react-native';

// const App = () => {
//     const [phData, setPhData] = useState(null);
//     const [turbidityData, setTurbidityData] = useState(null);
//     const ws = useRef(null);

//     useEffect(() => {
//         const connectWebSocket = () => {
//             ws.current = new WebSocket('ws://192.168.56.1:3000');

//             ws.current.onopen = () => {
//                 console.log('Conexión WebSocket establecida');
//             };

//             ws.current.onmessage = (event) => {
//                 console.log('Mensaje recibido del servidor:', event.data);
//                 try {
//                     const data = JSON.parse(event.data);
//                     if (data.topic === 'sensores/ph') {
//                         setPhData(data.message);
//                     } else if (data.topic === 'sensores/turbidity') {
//                         setTurbidityData(data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error al parsear datos JSON:', error);
//                 }
//             };

//             ws.current.onclose = () => {
//                 console.log('Conexión WebSocket cerrada');
//                 // Intentar reconexión después de un intervalo de tiempo
//                 setTimeout(connectWebSocket, 5000);
//             };

//             ws.current.onerror = (error) => {
//                 console.error('Error en conexión WebSocket:', error);
//             };
//         };

//         connectWebSocket();

//         return () => {
//             if (ws.current) {
//                 ws.current.close();
//             }
//         };
//     }, []);

//     return (
//         <View style={{ backgroundColor: "#000000", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>WebSocket en React Native</Text>
//             <Text>Datos de pH: {phData}</Text>
//             <Text>Datos de turbidez: {turbidityData}</Text>
//         </View>
//     );
// };

// export default App;




