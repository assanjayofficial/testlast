import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView, TextInput,
  Keyboard, ActivityIndicator, } from 'react-native';

//Brilliant
export default class App extends Component {
  state = {
    isEdit: null,
    list: [],
    isLoading: false,
    editText: '',
  };
  componentDidMount = () => {
    this.setState({isLoading: true});
    // AsyncStorage.removeItem('list')
    AsyncStorage.getItem('list')
      .then(list => {
        if (list) {
          this.setState({list: JSON.parse(list), isLoading: false});
        } else {
          this.setState({list: [], isLoading: false});
        }
      })
      .catch(err => {
        this.setState({isLoading: false});
      });
  };
  add = () => {
    let list = this.state.list;
    list.push('');
    this.setState({list: list});
    this.saveToStorage();
    
    this.setEdit(list.length-1);
  };
  setEdit = index => {
    if (this.state.isEdit !== index) {
      this.setState({isEdit: index, editText: this.state.list[index]});
    }
  };
  setList = (text, index) => {
    let list = this.state.list;
    list[index] = text;
    this.setState({list: list, isEdit: null, editText: ''});

    this.saveToStorage();
  };
  saveToStorage = () => {
    let data = JSON.stringify(this.state.list);
    AsyncStorage.setItem('list', data);
  };
  deleteItem = index => {
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({list: list});
    this.saveToStorage();
  };

  //Eben
  render() {
    return (
      <ScrollView style={style.container}>
        <View style={style.header}>
          <Text style={style.Textatas}>Apa yang perlu diingatkan?</Text>
        </View>
        {this.state.isLoading ? (
          <ActivityIndicator color="#d28888" size="large" />
        ) : (
          <View style={style.body}>
            {this.state.list.map((item, key) => (
              <React.Fragment>
                {this.state.isEdit === null || this.state.isEdit !== key ? (
                  <TouchableOpacity
                    style={style.item}
                    activeOpacity={0.5}
                    onLongPress={() => this.setEdit(key)}>
                    <Text style={style.itemText}>{item}</Text>
                    <TouchableOpacity
                      style={style.itemDelete}
                      onPress={() => this.deleteItem(key)}>
                      <Text style={style.itemDeleteText}>x</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : null}
                {this.state.isEdit !== null ? (
                  key == this.state.isEdit ? (
                    <TextInput
                      style={style.itemInput}
                      onBlur={() => this.setList(this.state.editText, key)}
                      onSubmitEditing={() =>
                        this.setList(this.state.editText, key)
                      }
                      value={this.state.editText}
                      autoFocus
                      onChangeText={editText => this.setState({editText})}
                    />
                  ) : null
                ) : null}
              </React.Fragment>
            ))}
            <TouchableOpacity style={style.tombolTambah} onPress={() => this.add()}>
              <Text style={style.isiTambah}>Tambahkan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}
//Fanuel
const style = StyleSheet.create({
  container: {
      backgroundColor: '#5B8A72', 
      height: '100%'
    },
  header: {
    backgroundColor: '#464f41',
    elevation: 5,
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },
  Textatas: {
    fontSize: 20,
    color : 'white',
    fontWeight : 'bold',
  },
  tombolTambah: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor : '#464f41'
  },
  isiTambah: {
    fontSize: 25,
    fontWeight: '700',
    color : 'white',
  },
  body: {paddingHorizontal: '4%', paddingVertical: 15},
  item: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    minHeight: 50,
    position: 'relative',
  },
  itemDelete: {
    position: 'absolute',
    fontSize: 16,
    padding: 10,
    right: 0,
  },
  itemDeleteText: {
    fontSize: 16,
    color : 'red',
  },
  itemText: {
    fontSize: 16,
    paddingHorizontal: '1%',
  },
  itemInput: {
    borderBottomWidth: 1,
    fontSize: 16,
  },
});