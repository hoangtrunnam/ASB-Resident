import {ModuleInfo} from "./moduleinfo";
import {FieldValue} from "./fieldvalue";
import {ConditionFieldInstance} from "./conditionfield";

export class PostDataInfo {
    sessionId: string;
    moduleInfo: ModuleInfo;
    values: FieldValue[] = [];
    conditions: ConditionFieldInstance[] = [];
    data: any = {};
}