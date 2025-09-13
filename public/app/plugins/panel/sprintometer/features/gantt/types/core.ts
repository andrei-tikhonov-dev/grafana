export interface MTask {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    percent?: number;
    dependencies?: string[];
    [key: string]: unknown;
}

export interface MTaskGroup {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    tasks: MTask[];
    [key: string]: unknown;
}

export interface MGanttStyles {
    container?: string;
    title?: string;
    header?: string;
    taskList?: string;
    timeline?: string;
    todayMarker?: string;
    taskRow?: string;
    taskItem?: string;
    tooltip?: string;
}
