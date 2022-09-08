import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { searchModule } from "../../core/modules/search";
import { ModuleInfos } from "../../core/moduleList";
import { isError } from "../../core/utils";
const ContactManagement = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getContacts();
  }, []);
  const getContacts = async () => {
    searchModule
      .executeSearch({
        ModuleID: "03513",
        SubModule: "MMN",
      })
      .then((res) => {
        if (isError(res)) {
          alert(res.message);
          return;
        }
        console.log(res);
        setContacts(res.result.data);
      });
  };

  return (
    <View style={{ flex: 1, margin: 16 }}>
      <FlatList
        data={contacts}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "#A1A1A1", fontSize: 16 }}>
              Chưa có dữ liệu
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.contact}>
            <View>
              <Text style={styles.contactName}>{item.CONTACT_NAME}</Text>
              <Text style={styles.contactPhone}>{item.CONTACT_PHONE}</Text>
            </View>
            <TouchableOpacity
              style={styles.call}
              onPress={() => Linking.openURL(`tel:${item.CONTACT_PHONE}`)}
            >
              <Icon name={"phone"} size={16} color={"#fff"} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cardMenu: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  name: { color: "#323232", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  label: { color: "#666" },
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16 },
  contact: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  call: { backgroundColor: "#1595ee", padding: 8, borderRadius: 4 },
  contactName: { fontWeight: "600", marginBottom: 8 },
  contactPhone: { color: "#888", marginBottom: 8 },
});

export default ContactManagement;
