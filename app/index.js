import react from "react";
import { View, Text, Image, FlatList } from "react-native";
import { IMAGES } from "../assets/USER/links.mjs";

export default function App() {

    const Data = IMAGES
    // console.log(Data);

    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <FlatList
                data={Data}
                ItemSeparatorComponent={() => <View style={{ height: 20, width: '100%' }}></View>}
                renderItem={({ index, item }) => {
                    if (index != 0) {

                        return (
                            <View style={{ width: 300, height: 300, elevation: 4, backgroundColor: "#fff" }}>
                                <Image style={{ flex: 1 }} source={{ uri: item.image }} />
                                <Text style={{ padding: 10, paddingHorizontal: 20, fontWeight: '700', letterSpacing: 2, fontSize: 16 }}>{item.name}</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View style={{ position: 'absolute', top: 0, left: 10, elevation: 4, backgroundColor: "#fff" }}>
                                <Image style={{ flex: 1 }} source={{ uri: item.image }} />
                                <Text style={{ padding: 10, paddingHorizontal: 20, fontWeight: '700', letterSpacing: 2, fontSize: 16 }}>{item.name}</Text>
                            </View>
                        )
                    }
                }}
            />
        </View>
    )
}