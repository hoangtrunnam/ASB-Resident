import AsyncStorage from "@react-native-community/async-storage";

import { StoreKey } from "../constanst";
import axios from "axios";

export async function checkHealthy() {
  const notify_url = await AsyncStorage.getItem("notify_url");
  try {
    let res = await fetch(`${notify_url}/api/healthy`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function setToken(username, token) {
  try {
    return await post_notify("/api/set-token", { username, token });
  } catch (error) {
    throw error;
  }
}

export async function post_notify(url, postData) {
  let session: Session = JSON.parse(
    await AsyncStorage.getItem(StoreKey.Session)
  );
  if (session) {
    const notify_url = await AsyncStorage.getItem("notify_url");
    let res = await axios.post(`${notify_url}${url}`, postData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Base " + session.SessionKey
      }
    });
    if (res.status === 200) {
      return res.data;
    } else {
      return {
        status: "ERROR",
        message: res.statusText,
        data: res.data
      };
    }
  }
}
