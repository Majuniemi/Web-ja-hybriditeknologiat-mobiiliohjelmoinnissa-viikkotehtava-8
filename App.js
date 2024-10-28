import { StatusBar } from 'expo-status-bar'
import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { firestore, addDoc, collection, serverTimestamp, deleteDoc, doc, onSnapshot, SHOPPING_LIST } from './firebase/Config'
import { useEffect, useState } from 'react'
import Constants from 'expo-constants'

export default function App() {
  const [shoppingItems, setShoppingItems] = useState([])
  const [newShoppingItem, setNewShoppingItem] = useState('')

  useEffect(() => {
    const q = collection(firestore, SHOPPING_LIST)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        tempItems.push({ ...doc.data(), id: doc.id })
      })
      setShoppingItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const addShoppingItem = async () => {
    const docRef = await addDoc(collection(firestore, SHOPPING_LIST), {
      name: newShoppingItem,
      created: serverTimestamp()
    }).catch(error => console.log('Error adding document:', error))
    setNewShoppingItem('')
    console.log('Item saved.')
  }

  const deleteShoppingItem = async (id) => {
    const docRef = doc(firestore, SHOPPING_LIST, id)
    await deleteDoc(docRef).catch(error => console.log('Error deleting document:', error))
    console.log('Item deleted.')
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar style="auto" />
        <Text style={styles.headerText}>Shopping list</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder='Add new item...'
          value={newShoppingItem}
          onChangeText={text => setNewShoppingItem(text)}
        />
        <Button title="Add" onPress={addShoppingItem} />
      </View>
      <ScrollView style={styles.listView}>
        {
          shoppingItems.map(item => (
            <View key={item.id} style={styles.items}>
              <Text>{item.name}</Text>
              <Button title="Delete" onPress={() => deleteShoppingItem(item.id)} />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 16
  },
  header: {
    width: '100%',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    backgroundColor: '#f0f8fc',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  listView: {
    width: '100%',
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#fcf1e6',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  }
})
