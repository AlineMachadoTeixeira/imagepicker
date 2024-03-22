import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";

import { useState, useEffect } from "react";

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (através do hook useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  console.log(status);

  /* Ao entrar no app, será executada a verificação de permissões de uso  */
  useEffect(() => {
    /* Esta função mostrará um popup para o usuário perguntando
    se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto). */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      /* Ele dando autorização (granted), isso será armazenado
      no state de requestPermission. */
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  /* Ao pressionar o botão, executa esta função */
  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      /* Acessando via ImagePicker a biblioteca 
    para seleção de apenas imagens, com recurso de edição habilitado,
    proporção 16,9 e qualidade total. */
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1 /* melhora qualidade no 1 */,
    });

    /* Se o usuário não cancelar a operação, pegamos a 
    imagem e colocamos no state */
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const acessarCamera = async () => {
    /* Ao executar esta função quando o usuário escolhe tirar uma foto, utilizamos o launchCameraAsync para abrir a câmera do sistema operacional */
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5 /* Qualidade pela metade */,
    });

    //console.log(imagem);

    /* Se o usuário não cancelar, atualizamos o state com novo foto capturada */
    if (!imagem.canceled) {
      /* Usando a API do MediaLibrary para salvar no armazenamento físico do dispositivo */
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  console.log(foto);
  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={escolherFoto} title="Escolher foto" />
        <Button onPress={acessarCamera} title="tirar uma nova foto" />
        {foto ? (
          <Image source={{ uri: foto }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>Você ainda não escolheu uma foto </Text>
        )}
      </View>
    </>
  );
}
