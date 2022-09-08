export class StringBuilder {
    Values: string[] = [];

    constructor(value: string = StringUtils.Empty) {
        this.Values = new Array(value);
    }
    ToString() {
        return this.Values.join('');
    }
    Append(value: string) {
        this.Values.push(value);
    }
    AppendFormat(value: string, ...args: string[]) {
        this.Values.push(StringUtils.Format(value, ...args));
    }
    Clear() {
        this.Values = [];
    }
}


export class StringUtils {
    static Empty = '';

    static IsNullOrWhiteSpace(value: string): boolean {
        try {
            if (value === null || value === 'undefined') {
                return true;
            }
            return value.toString().replace(/\s/g, '').length < 1;
        } catch (e) {
            return false;
        }
    }

    static splitGVI(source: string){
        let tempArr = source.split("$");
        if(tempArr.length > 0){
            let fields = tempArr[0].split("|");
            for (let index = 1; index < tempArr.length; index++) {
                const s = tempArr[index];
                let values = s.split("|");
            }
            let values = tempArr[1].split("");
        }
    }

    static getDisplayDateFromString(input: string): string {
        let splitted: string[];
        splitted = input.split('-');

        if (splitted.length <= 1) {
            return input;
        }

        let day = splitted[splitted.length - 1];
        const month = splitted[splitted.length - 2];
        const year = splitted[splitted.length - 3];
        day = day.split('T')[0];
        day = day.split(' ')[0];

        return day + '.' + month + '.' + year;
    }

    static getSortableDateFromString(input: string): string {
        const splitted = input.replace(',', '').split('.');
        if (splitted.length <= 1) {
            return input;
        }

        const times = splitted[splitted.length - 1].split(' ');
        let time = splitted[0];
        if (times.length > 1) {
            time = times[times.length - 1];
        }

        const year = splitted[splitted.length - 1].split(' ')[0];
        const month = splitted[splitted.length - 2];
        const day = splitted[splitted.length - 3];

        let result = year + '-' + month + '-' + day;
        if (time.length > 1) {
            result += 'T' + time;
        } else {
            result += 'T' + '00:00:00';
        }
        return result;
    }

    static formatNumber(input: number, formatTemplate: string): string {
        const count = formatTemplate.length;
        const stringValue = input.toString();
        if (count <= stringValue.length) {
            return stringValue;
        }

        let remainingCount = count - stringValue.length;
        remainingCount += 1; ///Das Array muss einen Eintrag mehr als die benötigten Nullen besitzen
        return new Array(remainingCount).join('0') + stringValue;
    }

    static Format(format: string, ...args: (string | Date | number | any)[]): string {
        try {
            return format.replace(/{(\d+(:\w*)?)}/g, function (match, i) { ///0
                const s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', ''); ///U
                }

                const arg = StringUtils.parsePattern(match, args[i]);
                return typeof arg !== 'undefined' && arg !== null ? arg : StringUtils.Empty;
            });
        } catch (e) {
            return StringUtils.Empty;
        }
    }

    static join(delimiter: string, ...args: string[]): string {
        let temp = StringUtils.Empty;
        for (let i = 0; i < args.length; i++) {
            if ((typeof args[i] === 'string' && StringUtils.IsNullOrWhiteSpace(args[i]))
                || (typeof args[i] !== 'number' && typeof args[i] !== 'string')) {
                continue;
            }

            const arg = '' + args[i];
            temp += arg;
            for (let i2 = i + 1; i2 < args.length; i2++) {
                if (StringUtils.IsNullOrWhiteSpace(args[i2])) {
                    continue;
                }

                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }
        return temp;
    }

    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        try {
            const firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                let tempString = StringUtils.Empty;
                const count = 0;

                for (let i = 0; i < firstArg.length; i++) {
                    const current = firstArg[i];
                    if (i < firstArg.length - 1) {
                        tempString += current + delimiter;
                    } else {
                        tempString += current;
                    }
                }

                return tempString;
            } else if (typeof firstArg === 'object') {
                let tempString = StringUtils.Empty;
                const objectArg = firstArg;
                const keys = Object.keys(firstArg); ///get all Properties of the Object as Array
                keys.forEach(element => {
                    tempString += (objectArg)[element] + delimiter;
                });
                tempString = tempString.slice(0, tempString.length - delimiter.length); ///remove last delimiter
                return tempString;
            }
            const stringArray: string[] = args;

            return StringUtils.join(delimiter, ...stringArray);
        } catch (e) {
            console.log(e);
            return StringUtils.Empty;
        }
    }


    static parsePattern(match: 'L' | 'U' | 'd' | 's' | 'n' | string, arg: string | Date | number | any): string {
        if (arg == null || arg == undefined) {
            return arg;
        }

        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                return arg;
            case 'U':
                arg = arg.toUpperCase();
                return arg;
            case 'd':
                if (typeof (arg) == 'string') {
                    return StringUtils.getDisplayDateFromString(arg);
                } else if (arg instanceof Date) {
                    return StringUtils.Format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            case 's':
                if (typeof (arg) == 'string') {
                    return StringUtils.getSortableDateFromString(arg);
                } else if (arg instanceof Date) {
                    return StringUtils.Format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            case 'n': ///Tausender Trennzeichen
                const replacedString = arg.replace(/,/g, '.');
                if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3) {
                    break;
                }
                const numberparts = replacedString.split(/[^0-9]+/g);
                let parts = numberparts;

                if (numberparts.length > 1) {
                    parts = [StringUtils.join('', ...(numberparts.splice(0, numberparts.length - 1))), numberparts[numberparts.length - 1]];
                }

                const integer = parts[0];

                const mod = integer.length % 3;
                let output = (mod > 0 ? (integer.substring(0, mod)) : StringUtils.Empty);
                const firstGroup = output;
                const remainingGroups = integer.substring(mod).match(/.{3}/g);
                output = output + '.' + StringUtils.Join('.', remainingGroups);
                arg = output + (parts.length > 1 ? ',' + parts[1] : '');
                return arg;
            default:
                break;
        }

        if (typeof (arg) == 'number') {
            return StringUtils.formatNumber(arg, match);
        }

        return arg;
    }
}

