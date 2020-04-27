import React,{ useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import Constants from 'expo-constants';
import Moment from 'moment'


// or any pure javascript modules available in npm
import { Button,TextInput } from 'react-native-paper';
import {List} from './styles'

export default function App() {
  const [imc, setImc] = useState(0);
  const [legenda, setLegenda] = useState('Indeterminado')
  const [altura, setAltura] = useState(0)
  const [peso, setPeso] = useState(0)
  const [cor, setCor] = useState("#bdc3c7")
  const [dbImc, setDbImc] = useState([])

  useEffect(() => {
    const data = AsyncStorage.getItem("imc").then(data => {
        if (data) {
          const getImc = JSON.parse(data);
          setDbImc(getImc);
        } 
      // console.warn(`read dbImc: ${dbImc.id}`);
        
      })
  }, []);

  const calcularIMC = async () =>{
    // const peso = 106
    // const altura = 1.86
   
    if(altura == 0 && peso == 0){
      alert("Entre com altura e peso")
    }else{
      const calc = peso / (altura * altura)
      setImc(Math.ceil(calc))
      await saveImac()
      if(calc < 18.5){
        setLegenda("Magreza")
        setCor("#e74c3c")
      }else if(calc >= 18.5 && calc < 25){
        setLegenda("Normal")
        setCor("#2ecc71")
      }else if(calc >=25 && calc < 30){
          setLegenda("Sobrepeso")
          setCor("#f1c40f")
      }else if(calc >= 30 && calc < 40){
        setLegenda("Obesidade")
        setCor("#e67e22")
      }else if(calc >= 40){
        setLegenda("Obesidade Grave")
        setCor("#e74c3c")
      } 
    }
  }

  const saveImac = async () => {
    const obj = []
    const date = Moment().locale('pt-br').format('DD/MM/YYYY').toString()
    const id = Math.random(5000).toString()
    const data = {
      id,
      peso,
      altura,
      imc,
      date
    }
    obj.push(data)
    // console.warn(`set data obj: ${JSON.stringify(data)} `);
    
    await AsyncStorage.setItem('imc', JSON.stringify(obj))
    
  }

 

  return (
    <View style={styles.app}>
      <Text style={styles.legenda}>Seu IMC</Text>

      <View style={[styles.painel, {backgroundColor: cor,}]}>
        <Text style={styles.resultado}>{imc}</Text>
        <Text style={styles.diagnostico}>{legenda}</Text>
      </View>
 
      <View style={{marginBottom:80}}>
        <TextInput label="peso"  style={styles.peso} onChangeText={valor => { setPeso(valor.replace(',', '.')) }} 
          />
        <TextInput label="altura"  style={styles.altura} onChangeText={valor => { setAltura(valor.replace(',', '.')) }}              />
        <Button mode="contained" onPress={calcularIMC}>
          Calcular
        </Button>
      </View>
 
      <View style={styles.list}>
        <Text style={styles.txtHistory}>Histórico de Consultas</Text>
        <FlatList
        data={dbImc}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View >
            <Text style={styles.txtResult}>IMC: {item.imc}</Text>
            <Text style={styles.txtResult}>Peso: {item.peso}</Text>
            <Text style={styles.txtResult}>Altura: {item.altura}</Text>
            <Text style={styles.txtResult}>Data: {item.date}</Text>
          </View>

        )}
        />
        {/* <Text>{dbImc.imc}</Text> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  app: {
    padding: 40,
  },
  legenda:{
    textAlign:"center",
    fontWeight:'bold',
    fontSize: 19,
  },
  resultado:{
    textAlign: 'center',
    fontSize: 22,
    fontWeight:'bold'
  },
  diagnostico:{
    textAlign: 'center',
    fontSize:16,
  },
  peso:{
  marginVertical: 10,
  marginBottom: 10,
  },
  altura:{
    marginVertical: 10,
    marginBottom: 10,
  },
  painel:{
    alignSelf: 'center',
    
    borderRadius: 5,
    width: 150,
    margin: 10,
    padding: 8
  },
  list:{
    marginTop: 10,
    borderColor: '#000',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10

  },
  txtHistory:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  txtResult:{
    margin: 5,
    padding: 5,
    fontSize: 15,
  },

});
