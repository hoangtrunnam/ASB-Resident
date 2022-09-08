import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import styles from "./styles";

import { formatNumber, formatDate } from "../../../../core/utils";

const ThongTinHopDong = ({ apartment }) => {
  const data = apartment;
  const getStatusName = (status) => {
    switch (status) {
      case "L":
        return "Đang ở";
      case "N":
        return "Chưa ở";
      case "R":
        return "Cho thuê";
      default:
        break;
    }
  };
  const getTypeNameApartment = (type) => {
    switch (type) {
      case "N":
        return "Thông thường";
      case "T":
        return "Studio";
      case "O":
        return "Officetel";
      case "S":
        return "Shophouse";
      case "P":
        return "Penhouse";
      case "D":
        return "Duplex";
      case "B":
        return "SkyBar";
      case "K":
        return "DualKey";
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.main_view}>
      <ScrollView style={{ paddingTop: 8 }}>
        <View style={styles.contract_view}>
          <View style={styles.contract_row}>
            <Text style={styles.contract_label}>Mã căn hộ</Text>
            <Text style={styles.contract_text}>{data.APARTMENT_CODE}</Text>
          </View>
        </View>

        <View style={styles.contract_view}>
          <View style={styles.contract_row}>
            <Text style={styles.contract_label}>Tầng - Toà</Text>
            <Text style={styles.contract_text}>
              {data.FLOOR_CODE}-{data.BUILDING_CODE}
            </Text>
          </View>
        </View>

        <View style={styles.contract_view}>
          <View style={styles.contract_row}>
            <Text style={styles.contract_label}>Dự án</Text>
            <Text style={styles.contract_text}>{data.PROJECT_NAME}</Text>
          </View>
        </View>
        <View style={styles.contract_view}>
          <View style={styles.contract_row}>
            <Text style={styles.contract_label}>Loại căn hộ</Text>
            <Text style={styles.contract_text}>
              {getTypeNameApartment(data.APARTMENT_TYPE)}
            </Text>
          </View>
        </View>

        <View style={styles.contract_view}>
          <View style={styles.contract_row}>
            <Text style={styles.contract_label}>Diện tích</Text>
            {/* <Text style={styles.contract_text}>{data.APARTMENT_SIZE} m<Text style={{fontSize: 12, lineHeight: 0}}>2</Text></Text> */}
            <Text style={[styles.contract_text, { lineHeight: 30 }]}>
              {data.APARTMENT_SIZE} m
            </Text>
            {/*Superscript*/}
            <Text style={{ fontSize: 12, lineHeight: 22 }}>2</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThongTinHopDong;
