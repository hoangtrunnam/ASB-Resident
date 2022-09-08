import { StyleSheet } from "react-native";
import { Ultils } from "../../config/Ultils";
export default StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  imageTop: {
    // position: "absolute"
    // width: width,
    // height: (width * 452) / 750
  },
  mgHeader: {},
  headerRight: { flexDirection: "row", alignItems: "center" },
  titleHeader: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardMenu: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
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
  itemMenu: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 6
  },
  itemCategory: {
    width: Ultils.dimensions.width / 1.5,
    marginLeft: 16,
    padding: 0
  },
  itemNews: {
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  titleCategory: {
    lineHeight: 20,
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 6
  },
  imageCategory: {
    width: Ultils.dimensions.width / 1.5,
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  imageBanner: {
    width: Ultils.dimensions.width - 32,
    height: 150,
    borderRadius: 4
  },
  apartment: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#00000070', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20}
});
