import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, ScrollView, TextInput,
  Keyboard, ActivityIndicator, } from 'react-native';

//Brilliant
export default class App extends Component {
  state = {
    formIsi: null,
    list: [],
    memuat: false,
    masukanTugas: '',
  };
  componentDidMount = () => {
    this.setState({memuat: true});
    AsyncStorage.getItem('list')
      .then(list => {
        if (list) {
          this.setState({list: JSON.parse(list), memuat: false});
        } else {
          this.setState({list: [], memuat: false});
        }
      })
      .catch(err => {
        this.setState({memuat: false});
      });
  };
  tambahTugas = () => {
    let list = this.state.list;
    list.push('');
    this.setState({list: list});
    this.saveToStorage();
    
    this.formPengisian(list.length-1);
  };
  formPengisian = index => {
    if (this.state.isEdit !== index) {
      this.setState({isEdit: index, editText: this.state.list[index]});
    }
  };
  daftarTugas = (text, index) => {
    let list = this.state.list;
    list[index] = text;
    this.setState({list: list, formIsi: null, editText: ''});

    this.saveToStorage();
  };
  saveToStorage = () => {
    let data = JSON.stringify(this.state.list);
    AsyncStorage.setItem('list', data);
  };
  hapusTugas = index => {
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({list: list});
    this.saveToStorage();
  };

  //Eben
  render() {
    return (
      <ScrollView style={style.keseluruhanAplikasi}>
        <View style={style.bagianAwal}>
          <Text style={style.Textatas}>Apa yang perlu diingatkan?</Text>
        </View>
        {this.state.memuat ? (
          <ActivityIndicator color="#d28888" size="large" />
        ) : (
          <View style={style.body}>
            {this.state.list.map((item, key) => (
              <React.Fragment>
                {this.state.formIsi === null || this.state.formIsi !== key ? (
                  <TouchableOpacity
                    style={style.isi}
                    activeOpacity={0.5}
                    onLongPress={() => this.formPengisian(key)}>
                    <Text style={style.isiTeks}>{item}</Text>
                    <TouchableOpacity
                      style={style.hapusIsi}
                      onPress={() => this.hapusTugas(key)}>
                      <Text style={style.tulisanX}>x</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : null}
                {this.state.formIsi !== null ? (
                  key == this.state.formIsi ? (
                    <TextInput
                      style={style.masukanDaftar}
                      onBlur={() => this.daftarTugas(this.state.masukanTugas, key)}
                      onSubmitEditing={() =>
                        this.daftarTugas(this.state.masukanTugas, key)
                      }
                      value={this.state.masukanTugas}
                      autoFocus
                      onChangeText={editText => this.setState({editText})}
                    />
                  ) : null
                ) : null}
              </React.Fragment>
            ))}
            <TouchableOpacity style={style.tombolTambah} onPress={() => this.tambahTugas()}>
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
  keseluruhanAplikasi: {
      backgroundColor: '#5B8A72', 
      height: '100%'
    },
  bagianAwal: {
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
  body: {
    paddingHorizontal: '4%', 
    paddingVertical: 15
  },
  isi: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    minHeight: 50,
    position: 'relative',
  },
  hapusIsi: {
    position: 'absolute',
    fontSize: 16,
    padding: 10,
    right: 0,
  },
  tulisanX: {
    fontSize: 16,
    color : 'red',
  },
  isiTeks: {
    fontSize: 16,
    paddingHorizontal: '1%',
  },
  masukanDaftar: {
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
