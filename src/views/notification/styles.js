import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flex: 1,
    // alignSelf: "stretch",
  },
  notif_item: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  notif_icon: {
    width: 50,
    height: 50,
  },
  notif_left: {
    width: 70,
    paddingRight: 16,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  notif_right: {
    flex: 1,
  },
  notif_title: {
    // color: Colors.text_normal,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notif_des: {
    // color: Colors.text_value,
    fontSize: 16,
    marginBottom: 5,
  },
  notif_time: {
    // color: Colors.text_hint,
    fontSize: 14,
  },
  detail_avatar: {
    height: 200,
    width: width - 32,
    borderRadius: 12,
  },
  detail_content: {
    flex: 1,
  },
  detail_title: {
    fontWeight: "bold",
    // color: Colors.text_normal,
    fontSize: 22,
    margin: 16,
    marginBottom: 0,
  },
});
