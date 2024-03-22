import { StatusBar } from "expo-status-bar";
import { Button, Image, View } from "react-native";

import { useState, useEffect } from "react";

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";

export default function App() {
  /* State Tradicional para armazenar a referencia da foto (quando exixtir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (Através do hook) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}
