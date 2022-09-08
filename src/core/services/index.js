import { PostDataInfo } from "../entities/postdata";
import AsyncStorage from "@react-native-community/async-storage";

import { AppCache, StoreKey, apiUrl } from "../constanst";
import { Session } from "../entities/session";
import {
  CodeInfo,
  ErrorInfo,
  FieldValue,
  LanguageInfo,
  ModuleFieldInfo,
  ModuleInfo,
  ModuleValidateInfo,
} from "../entities";
import { StringUtils } from "../utils/stringutils";

export const pageSize = 20;
const url = apiUrl;
export async function login({ username, password }) {
  try {
    const res = await fetch(url + "/session/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    // res.oke res.status
    if (res.status === 503) {
      return {
        status: "Error",
        message: "Server Error",
        fullMessage: error,
      };
    }
    let responseJson = await res.json();
    return responseJson;
  } catch (error) {
    return {
      status: "Error",
      message: "404",
      fullMessage: error,
    };
  }
}

export async function post(
  controller: string,
  functionname: string,
  postData: PostDataInfo
) {
  let session: Session = JSON.parse(
    await AsyncStorage.getItem(StoreKey.Session)
  );
  if (session) {
    if (postData.moduleInfo) {
      const modInfo = new ModuleInfo();
      modInfo.ModuleID = postData.moduleInfo.ModuleID;
      modInfo.SubModule = postData.moduleInfo.SubModule;
      postData.moduleInfo = modInfo;
    }
    postData.sessionId = session.SessionKey;
    const res = await fetch(url + "/" + controller + "/" + functionname, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Base " + session.SessionKey,
      },
      body: JSON.stringify(postData),
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      return {
        status: "error",
        message: res.status,
        fullMessage: res.statusText,
      };
    }
  }
  return {
    status: "error",
    message: "101",
    fullMessage: "Session not found",
  };
}

async function postUnAuthen(
  controller: string,
  functionname: string,
  postData: PostDataInfo
) {
  const res = await fetch(url + "/" + controller + "/" + functionname, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return await res.json();
}

export async function refreshSession() {
  const res = await post("session", "refreshSession", new PostDataInfo());
  if (res.status === "Ok") {
    return res.result;
  }
  return null;
}

export async function executeSearch(data: PostDataInfo) {
  return await post("search", "executeSearch", data);
}

export async function fetchToEnd(data: PostDataInfo) {
  return await post("buffer", "fetchToEnd", data);
}

export async function fetchNextPage(data: PostDataInfo) {
  return await post("buffer", "fetchNextPage", data);
}

export async function getListSource(data: PostDataInfo) {
  return await post("module", "getListSource", data);
}

export async function executeCallback(
  fieldInfo: ModuleFieldInfo,
  moduleInfo: ModuleInfo,
  values: FieldValue[]
) {
  const data = new PostDataInfo();
  const modInfo = new ModuleInfo();
  modInfo.ModuleID = moduleInfo.ModuleID;
  modInfo.SubModule = moduleInfo.SubModule;
  data.moduleInfo = modInfo;
  data.data = { FieldId: fieldInfo.FieldID };
  data.values = values;
  return await post("module", "executeCallback", data);
}

export async function executeLoadHandler(
  moduleInfo: ModuleInfo,
  values: FieldValue[]
) {
  const data = new PostDataInfo();
  const modInfo = new ModuleInfo();
  modInfo.ModuleID = moduleInfo.ModuleID;
  modInfo.SubModule = moduleInfo.SubModule;
  data.moduleInfo = modInfo;
  data.values = values;
  return await post("module", "executeLoadHandler", data);
}

export async function executeMaintain(
  moduleInfo: ModuleInfo,
  values: FieldValue[]
) {
  const data = new PostDataInfo();
  const modInfo = new ModuleInfo();
  modInfo.ModuleID = moduleInfo.ModuleID;
  modInfo.SubModule = moduleInfo.SubModule;
  data.moduleInfo = modInfo;
  data.values = values;
  return await post("maintain", "execute", data);
}

export async function executeProcedure(data: PostDataInfo) {
  return await post("execute", "executeProcedure", data);
}

export async function registrationToken(data: PostDataInfo) {
  return await post("itransapi", "registrationToken", data);
}

export async function updateCache() {
  let version = await AsyncStorage.getItem(StoreKey.Version);
  if (!version) {
    version = "";
  }
  let data = new PostDataInfo();
  data.data.Version = version;
  const res = await postUnAuthen("cache", "updateForMobile", data);
  const serverVesion = res.Version;
  if (version !== serverVesion) {
    await AsyncStorage.setItem(StoreKey.Version, serverVesion);
    await AsyncStorage.setItem(
      StoreKey.Languages,
      JSON.stringify(res.result.Languages)
    );
    await AsyncStorage.setItem(
      StoreKey.Codes,
      JSON.stringify(res.result.Codes)
    );
    await AsyncStorage.setItem(
      StoreKey.Errors,
      JSON.stringify(res.result.Errors)
    );
    await AsyncStorage.setItem(
      StoreKey.Modules,
      JSON.stringify(res.result.Modules)
    );
    await AsyncStorage.setItem(
      StoreKey.Fields,
      JSON.stringify(res.result.Fields)
    );
    await AsyncStorage.setItem(
      StoreKey.Validators,
      JSON.stringify(res.result.Validators)
    );
    await AsyncStorage.setItem(
      StoreKey.ModuleValidators,
      JSON.stringify(res.result.ModuleValidators)
    );
    AppCache.Languages = res.result.Languages;
    AppCache.Modules = res.result.Modules;
    AppCache.Fields = res.result.Fields;
    AppCache.Codes = res.result.Codes;
  } else {
    AppCache.Languages = JSON.parse(
      await AsyncStorage.getItem(StoreKey.Languages)
    );
    AppCache.Modules = JSON.parse(await AsyncStorage.getItem(StoreKey.Modules));
    AppCache.Fields = JSON.parse(await AsyncStorage.getItem(StoreKey.Fields));
    AppCache.Codes = JSON.parse(await AsyncStorage.getItem(StoreKey.Codes));
  }
}

export function getCodes(listSource: string): CodeInfo[] {
  const arr = listSource.replace(":", "").split(".");
  return AppCache.Codes.filter(
    (code) => code.Type === arr[0] && code.Name === arr[1]
  );
}

export async function getModule(moduleId: string, submod: string) {
  try {
    const modules: ModuleInfo[] = AppCache.Modules;
    let module = modules.filter(
      (f) => f.ModuleID === moduleId && f.SubModule === submod
    )[0];
    module.Fields = await getFields(moduleId, submod);
    module.Validators = await getModuleValidators(moduleId, submod);
    return module;
  } catch (e) {
    return null;
  }
}

export async function getFields(moduleId: string, submod: string) {
  try {
    const fields: ModuleFieldInfo[] = AppCache.Fields;
    return fields
      .filter(
        (f) =>
          f.ModuleID === moduleId &&
          (f.SubModule === submod || f.SubModule === "ALL")
      )
      .sort((a, b) => {
        if (a.ColumnIndex > b.ColumnIndex) {
          return 1;
        }
        if (a.ColumnIndex < b.ColumnIndex) {
          return -1;
        }
        return 0;
      });
  } catch (e) {
    return [];
  }
}

export async function getModuleValidators(moduleId: string, submod: string) {
  try {
    const validators: ModuleValidateInfo[] = JSON.parse(
      await AsyncStorage.getItem(StoreKey.ModuleValidators)
    );
    return validators.filter(
      (f) => f.ModuleID === moduleId && f.SubModule === submod
    );
  } catch (e) {
    return [];
  }
}

export async function getValidator(ruleName: string) {}

export async function translate(key: string) {
  const langId = "VN";
  const languages: LanguageInfo[] = (AppCache.Languages: LanguageInfo[]);
  try {
    const langValue = languages.filter(
      (f) => f.LanguageName === langId + key
    )[0];
    if (langValue) {
      return langValue.LanguageValue;
    } else {
      return key;
    }
  } catch (e) {
    return key;
  }
}

export function t(key: string) {
  const langId = "VN";
  const languages: LanguageInfo[] = (AppCache.Languages: LanguageInfo[]);
  const langValue = languages.filter((f) => f.LanguageName === langId + key)[0];
  if (langValue) {
    return langValue.LanguageValue;
  } else {
    return key;
  }
}

export async function translateModuleTitle(
  modInfo: ModuleInfo,
  title: string = "Default"
) {
  if (modInfo) {
    let key = modInfo.ModuleName + ".Title[" + title + "]";
    let translated = await translate(key);
    if (translated === key) {
      key = modInfo.ModuleTypeName + ".Title[" + title + "]";
      translated = await translate(key);
      if (translated === key) {
        key = "GLOBAL.Title[" + title + "]";
        translated = await translate(key);
        if (translated === key) {
          return modInfo.ModuleName + ".Title[" + title + "]";
        }
      }
    }
    return translated;
  } else {
    return "Van tai thong minh";
  }
}

export async function translateModuleStatus(
  modInfo: ModuleInfo,
  title: string = "Default"
) {
  if (modInfo) {
    let key = modInfo.ModuleName + ".Status[" + title + "]";
    let translated = await translate(key);
    if (translated === key) {
      key = modInfo.ModuleTypeName + ".Status[" + title + "]";
      translated = await translate(key);
      if (translated === key) {
        key = "GLOBAL.Status[" + title + "]";
        translated = await translate(key);
        if (translated === key) {
          return modInfo.ModuleName + ".Status[" + title + "]";
        }
      }
    }
    return translated;
  } else {
    return "Van tai thong minh";
  }
}

export async function translateFieldLabel(
  modInfo: ModuleInfo,
  fieldName: string
) {
  let key = modInfo.ModuleName + "$" + fieldName + "." + "Label";
  let translated = await translate(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + fieldName + "." + "Label";
    translated = await translate(key);
    if (translated === key) {
      key = "GLOBAL$" + fieldName + "." + "Label";
      translated = await translate(key);
      if (translated === key) {
        return fieldName;
      }
    }
  }
  return translated;
}

export function translateLabel(modInfo: ModuleInfo, fieldName: string) {
  let key = modInfo.ModuleName + "$" + fieldName + "." + "Label";
  let translated = t(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + fieldName + "." + "Label";
    translated = t(key);
    if (translated === key) {
      key = "GLOBAL$" + fieldName + "." + "Label";
      translated = t(key);
      if (translated === key) {
        return fieldName;
      }
    }
  }
  return translated;
}

export async function translateFieldColor(
  modInfo: ModuleInfo,
  fieldName: string
) {
  let key = modInfo.ModuleName + "$" + fieldName + "." + "Color";
  let translated = await translate(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + fieldName + "." + "Color";
    translated = await translate(key);
    if (translated === key) {
      key = "GLOBAL$" + fieldName + "." + "Color";
      translated = await translate(key);
      if (translated === key) {
        return "black";
      }
    }
  }
  return translated;
}

export async function translateError(errorCode: string, ...params: string[]) {
  const errorInfos: ErrorInfo[] = JSON.parse(
    await AsyncStorage.getItem(StoreKey.Errors)
  );
  const errorInfo = errorInfos.filter((f) => f.ErrorCode == errorCode)[0];
  let error: string;
  if (errorInfo) {
    error = await translate("ERROR$" + errorInfo.ErrorName);
  } else {
    error = await translate(errorCode);
  }
  return error;
}

export async function translateButtonCaption(
  modInfo: ModuleInfo,
  buttonName: string
) {
  let key = modInfo.ModuleName + "$" + buttonName + "." + "Caption";
  let translated = await translate(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + buttonName + "." + "Caption";
    translated = await translate(key);
    if (translated === key) {
      key = "GLOBAL$" + buttonName + "." + "Caption";
      translated = await translate(key);
      if (translated === key) {
        return buttonName;
      }
    }
  }
  return translated;
}

export async function translateButtonIcon(
  modInfo: ModuleInfo,
  buttonName: string
) {
  let key = modInfo.ModuleName + "$" + buttonName + "." + "Icon";
  let translated = await translate(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + buttonName + "." + "Icon";
    translated = await translate(key);
    if (translated === key) {
      translated = await translate("GLOBAL$" + buttonName + "." + "Icon");
    }
  }
  if (translated === "GLOBAL$" + buttonName + "." + "Icon") {
    return "send";
  }
  return translated.toLowerCase();
}

export async function translateCode(codeInfo: CodeInfo) {
  return await translate(
    StringUtils.Format(
      "CODE${0}${1}.{2}",
      codeInfo.Type,
      codeInfo.Name,
      codeInfo.ValueName
    )
  );
}

export function translateCodeSync(codeInfo: CodeInfo) {
  return t(
    StringUtils.Format(
      "CODE${0}${1}.{2}",
      codeInfo.Type,
      codeInfo.Name,
      codeInfo.ValueName
    )
  );
}

export function translateCodeByCodeValue(
  listSource: string,
  cdvalue: string
): string {
  let codes = getCodes(listSource);
  if (codes.length === 0) return cdvalue;
  let cd = codes.filter((o) => o.Value === cdvalue);
  if (cd.length > 0) {
    return translateCodeSync(cd[0]);
  }
  return cdvalue;
}

export function translateButtonIconSync(
  modInfo: ModuleInfo,
  buttonName: string
) {
  let key = modInfo.ModuleName + "$" + buttonName + "." + "Icon";
  let translated = t(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + buttonName + "." + "Icon";
    translated = t(key);
    if (translated === key) {
      translated = t("GLOBAL$" + buttonName + "." + "Icon");
    }
  }
  if (translated === "GLOBAL$" + buttonName + "." + "Icon") {
    return "send";
  }
  return translated.toLowerCase();
}

export function translateButtonCaptionSync(
  modInfo: ModuleInfo,
  buttonName: string
) {
  let key = modInfo.ModuleName + "$" + buttonName + "." + "Caption";
  let translated = t(key);
  if (translated === key) {
    key = modInfo.ModuleTypeName + "$" + buttonName + "." + "Caption";
    translated = t(key);
    if (translated === key) {
      key = "GLOBAL$" + buttonName + "." + "Caption";
      translated = t(key);
      if (translated === key) {
        return buttonName;
      }
    }
  }
  return translated;
}

export function writeLog(page, functionName, logText) {
  if (__DEV__) {
    console.warn(
      "Page: " +
        page +
        "; Function: " +
        functionName +
        "; Log: " +
        JSON.stringify(logText)
    );
  } else {
    const data = new PostDataInfo();
    data.data = {
      Page: page,
      FunctionName: functionName,
      Log: JSON.stringify(logText),
    };
    postUnAuthen("log", "writeLog", data);
  }
}
