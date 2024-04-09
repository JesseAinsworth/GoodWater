import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AlertNotification = ({ alerts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertContainer: {
    marginBottom: 10,
  },
  alertText: {
    fontSize: 16,
  },
});

export default AlertNotification;
