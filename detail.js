import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Chip,
  PaperProvider,
  Button,
  ActivityIndicator,
  FAB,
} from "react-native-paper";
import RenderHtml from "react-native-render-html";

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const [article, setArticle] = useState();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (id) {
      fetch(`https://dev.to/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
        });
    }
  });

  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView>
      {/* <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text> Details</Text>
  
          <View style={{ flexDirection: "row" }}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => navigation.navigate("Comment")}
            >
              Comment
            </Button>
          </View>
      </View> */}

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          {article.title}
        </Text>
        <RenderHtml
          contentWidth={width - 20}
          source={{ html: article.body_html }}
        />
      </View>
    </ScrollView>
  );
}
