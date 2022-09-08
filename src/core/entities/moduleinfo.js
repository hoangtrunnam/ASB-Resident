import {ModuleFieldInfo} from "./fieldinfo";
import {ModuleValidateInfo} from "./modulevalidator";

export class ModuleInfo {
    ModuleID: string;
    SubModule: string;
    ModuleType: string;
    ModuleName: string;
    LoadHandler: string;
    Fields: ModuleFieldInfo[] = [];
    Validators: ModuleValidateInfo[] = [];
}