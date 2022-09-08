import { StyleSheet } from "react-native";
import { Ultils } from "../../config/Ultils";

export default StyleSheet.create({
  container: { flex: 1 },
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16, fontWeight: "bold" },
  cardMenu: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  topCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  center: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    padding: 16,
  },
  btn: {
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    marginVertical: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  removeImage: {
    backgroundColor: "#00000090",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
    position: "absolute",
    top: 0,
    right: 0,
  },
  msgLeft: {
    backgroundColor: "#EFEFEF",
    padding: 8,
    borderRadius: 10,
    borderTopRightRadius: 0,
    maxWidth: Ultils.dimensions.width / 2,
  },
  msgRight: {
    backgroundColor: "#3784FF",
    padding: 8,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    maxWidth: Ultils.dimensions.width / 2,
  },
  userRight: {
    borderRadius: 16,
    marginRight: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  userLeft: {
    borderRadius: 16,
    marginLeft: 4,
    padding: 8,
    paddingTop: 0,
  },
});
