import { StyleSheet } from "react-native";
import { colors } from "../../../../config/colors";

export default StyleSheet.create({
  main_view: {
    backgroundColor: colors.bg_white,
    flex: 1,
  },
  contract_view: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  contract_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contract_label: {
    flex: 1,
    color: colors.text_hint,
    fontWeight: "600",
  },
  contract_text: {
    flex: 2,
    color: colors.text_value,
    fontWeight: "bold",
    textAlign: "right",
  },
});
