import { executeSearch, pageSize } from "../services";
import { getSessionKey } from "../utils";

export const searchModule = {
    executeSearch: async (moduleInfo, values = [], size = pageSize, conditions = []) => {
        return await executeSearch({
            sessionId: await getSessionKey(),
            conditions: conditions,
            data: {
                pageSize: size
            },
            values: values,
            moduleInfo
        })
    }
}