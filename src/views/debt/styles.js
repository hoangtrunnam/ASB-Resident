import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
// import globalStyles from '../../../Shared/themes/globalStyles';

export default StyleSheet.create({
  main_view: {
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  giaodich_view: {
    marginVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    // ...globalStyles.box_shadow,
  },
  giaodich_row_view: {
    flexDirection: "row",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  giaodich_left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  giaodich_text_left: {
    color: colors.text_hint,
    fontSize: 14,
  },
  giaodich_right: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  giaodich_text_right: {
    color: colors.text_value,
    fontWeight: "bold",
  },
  QRCode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  QRCode_text: {
    color: colors.text_active,
    fontSize: 14,
    fontWeight: "bold",
  },
  QRCode_image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  done: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  // Công nợ all
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  tab: {
    flex: 1,
    paddingVertical: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 16,
    borderBottomColor: colors.main,
    borderBottomWidth: 2,
  },
  textTab: { color: "#888", textAlign: "center" },
  textTabActive: { color: colors.main, textAlign: "center", fontWeight: "500" },
  row: { flexDirection: "row", paddingVertical: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  bottom: {
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text_normal: {
    fontWeight: "bold",
    color: "#323232",
    fontSize: 14,
  },
});
