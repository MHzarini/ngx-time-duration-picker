export interface TimeUnit {
    label: string;
    max: number;
    min: number;
    value: number;
    step: number;
}

export interface SupportedUnits {
    millisecond: TimeUnit;
    second: TimeUnit;
    minute: TimeUnit;
    hour: TimeUnit;
    day: TimeUnit;
    week: TimeUnit;
    month: TimeUnit;
    year: TimeUnit;
}
