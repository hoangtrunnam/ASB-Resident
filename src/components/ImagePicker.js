import { openPicker as RNOpenPicker } from "react-native-image-crop-picker";
import Ultils from "../config/Ultils";
export const openPicker = async () => {
  let images = await RNOpenPicker({
    multiple: true,
    includeBase64: true,
  });
  images = images.map((e) => {
    let data = {};
    const FileName = ios ? e.filename : Ultils.getFileNameAndroid(e.path);
    data.FileName = FileName;
    data.FileType = Ultils.getFileType(fileName).toLowerCase();
    data.FileData = e.data;
    return data;
  });
  return images;
};
