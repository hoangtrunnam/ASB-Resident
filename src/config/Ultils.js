import { Dimensions, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import jwtDecode from "jwt-decode";
import { CONST } from "../constant/const";
import moment from "moment";
import "moment/locale/vi";

async function getUsername() {
  try {
    const token = await AsyncStorage.getItem(CONST.TOKEN);
    const content = jwtDecode(token);
    console.warn("content", content);
    return content.sub;
  } catch (error) {
    return "";
  }
}

export function isError(response) {
  return response.status === "Error";
}

export const Ultils = {
  dimensions: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  ios: Platform.OS === "ios",
  username: () => getUsername(),
  convertTime: (time) => moment(time).fromNow(true),
  convertDate: (time) => moment(time).format("DD/MM/YYYY"),
  converDateTime: (time) => moment(time).format("DD/MM/YYYY HH:ss"),
  getFileNameAndroid: (path) => path.split("/").pop(),
  getFileType: (filename) => filename.split(".").pop(),
  getStatus: (codes, Status, CdType, CdName) => {
    let value = "";
    codes.forEach((e) => {
      if (
        e.CdType === CdType &&
        e.CdName === CdName &&
        e.CdValue === Status.toString()
      ) {
        value = e.CdValueName;
      }
    });
    return value;
  },
  checkReply: async (CreatedBy) => {
    const username = await getUsername();
    if (username === CreatedBy) return true;
    return false;
  },
  getStatusRequest: (code) => {
    // const codes = getCodes('BMS_REQUEST.STATUS');
    // console.log('codes', codes);
    const requestStatus = [
      {
        value: 0,
        // code: 0,
        status: "ALL",
        name: "Tất cả",
        label: "Tất cả",
      },
      {
        value: 1,
        // code: 1,
        status: "PENDING",
        name: "Chờ xử lý",
        label: "Chờ xử lý",
        backgroundColor: "#f6b6003d",
        color: "#f6b600",
      },
      {
        value: 2,
        code: 2,
        status: "PROCESSING",
        name: "Đang xử lý",
        label: "Đang xử lý",
        backgroundColor: "#FAEDDF",
        color: "#935D2B",
      },
      {
        value: 3,
        // code: 3,
        status: "COMPLETED",
        name: "Hoàn thành",
        label: "Hoàn thành",
        backgroundColor: "#D9F2DD",
        color: "#03A000",
      },
      {
        value: 4,
        // code: 4,
        status: "OVERDUE",
        name: "Quá hạn",
        label: "Quá hạn",
        backgroundColor: "#F4D0CC",
        color: "#DA0000",
      },
      {
        value: 5,
        // code: 5,
        status: "REJECTED",
        name: "Bị từ chối",
        label: "Bị từ chối",
        backgroundColor: "#1a1a1a70",
        color: "#1a1a1a",
      },
    ];
    if (code !== undefined) return requestStatus[code];
    return requestStatus;
  },
};
