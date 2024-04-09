import AsyncStorage from '@react-native-async-storage/async-storage';

const guardarRegistroLocal = async (registro) => {
  try {
    const registrosAnteriores = await AsyncStorage.getItem('registros') || '[]';
    const nuevosRegistros = JSON.stringify([...JSON.parse(registrosAnteriores), registro]);
    await AsyncStorage.setItem('registros', nuevosRegistros);
    console.log('Registro guardado localmente:', registro);
  } catch (error) {
    console.error('Error al guardar el registro local:', error);
  }
};

export default guardarRegistroLocal;
