import React,{ useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


// or any pure javascript modules available in npm
import { Button,TextInput } from 'react-native-paper';

export default function App() {
  const [imc, setImc] = useState(0);
  const [legenda, setLegenda] = useState('Indeterminado')
  const [altura, setAltura] = useState(0)
  const [peso, setPeso] = useState(0)
  const [cor, setCor] = useState("#bdc3c7")

  const calcularIMC = () =>{
    // const peso = 106
    // const altura = 1.86
   
    if(altura == 0 && peso == 0){
      alert("Entre com altura e peso")
    }else{
      const calc = peso / (altura * altura)
      setImc(Math.ceil(calc))
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

  return (
    <View style={styles.app}>
      <Text style={styles.legenda}>Seu IMC</Text>

      <View style={[styles.painel, {backgroundColor: cor,}]}>
        <Text style={styles.resultado}>{imc}</Text>
        <Text style={styles.diagnostico}>{legenda}</Text>
      </View>

      <View>
        <TextInput label="peso"  style={styles.peso} onChangeText={valor => { setPeso(valor.replace(',', '.')) }} 
          />
        <TextInput label="altura"  style={styles.altura} onChangeText={valor => { setAltura(valor.replace(',', '.')) }}              />
        <Button mode="contained" onPress={calcularIMC}>
          Calcular
        </Button>
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

});
