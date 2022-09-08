import React from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
const LoadingPlaceholder = ({number = 4}) => {
    const data = new Array(number);
    return(
        <View style={{flex: 1, padding: 16}}>
            <ScrollView style={{flex: 1}}>
                <FlatList
                    data={data}
                    renderItem={() => (
                        <Placeholder
                            Animation={Fade}
                            Left={PlaceholderMedia}
                            Right={PlaceholderMedia}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
};
export default LoadingPlaceholder;
