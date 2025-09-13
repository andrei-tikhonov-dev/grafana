import React from 'react';

import { MTask, MTaskGroup, MGanttStyles } from './core';
import { EViewMode } from './enums';

export interface MTaskListRenderProps {
  tasks: MTaskGroup[];
  headerLabel?: string;
  onGroupClick?: (group: MTaskGroup) => void;
  viewMode: EViewMode;
}

export interface MTaskRenderProps {
  task: MTask;
  leftPx: number;
  widthPx: number;
  topPx: number;
  isHovered: boolean;
  isDragging: boolean;
  editMode: boolean;
  showProgress?: boolean;
}

export interface MTooltipRenderProps {
  task: MTask;
  position: { x: number; y: number };
  dragType: 'move' | 'resize-left' | 'resize-right' | null;
  startDate: Date;
  endDate: Date;
  viewMode: EViewMode;
}

export interface MViewModeSelectorRenderProps {
  activeMode: EViewMode;
  onChange: (mode: EViewMode) => void;
  darkMode: boolean;
  availableModes?: EViewMode[];
}

export interface MHeaderRenderProps {
  title: string;
  darkMode: boolean;
  viewMode: EViewMode;
  onViewModeChange: (mode: EViewMode) => void;
  showViewModeSelector: boolean;
}

export interface MTimelineHeaderRenderProps {
  timeUnits: Date[];
  currentUnitIndex: number;
  viewMode: EViewMode;
  locale: string;
  unitWidth: number;
}

export interface MTaskColorProps {
  task: MTask;
  isHovered: boolean;
  isDragging: boolean;
}

// Component props
export interface MGanttChartProps {
  tasks: MTaskGroup[];
  startDate?: Date;
  endDate?: Date;
  title?: string;
  currentDate?: Date;
  showCurrentDateMarker?: boolean;
  todayLabel?: string;
  editMode?: boolean;
  headerLabel?: string;
  showProgress?: boolean;
  darkMode?: boolean;
  locale?: string;
  styles?: MGanttStyles;
  viewMode?: EViewMode;

  // Updated ViewMode configuration
  viewModes?: EViewMode[] | false; // Array of allowed modes, or false to hide selector

  smoothDragging?: boolean;
  movementThreshold?: number;
  animationSpeed?: number;
  minuteStep?: number; // For minute view granularity (e.g., 5, 10, 15 minutes)

  // Custom rendering functions
  renderTaskList?: (props: MTaskListRenderProps) => React.ReactNode;
  renderTask?: (props: MTaskRenderProps) => React.ReactNode;
  renderTooltip?: (props: MTooltipRenderProps) => React.ReactNode;
  renderViewModeSelector?: (props: MViewModeSelectorRenderProps) => React.ReactNode;
  renderHeader?: (props: MHeaderRenderProps) => React.ReactNode;
  renderTimelineHeader?: (props: MTimelineHeaderRenderProps) => React.ReactNode;
  getTaskColor?: (props: MTaskColorProps) => {
    backgroundColor: string;
    borderColor?: string;
    textColor?: string;
  };

  // Event handlers
  onTaskUpdate?: (groupId: string, updatedTask: MTask) => void;
  onTaskClick?: (task: MTask, group: MTaskGroup) => void;
  onTaskSelect?: (task: MTask, isSelected: boolean) => void;
  onTaskDoubleClick?: (task: MTask) => void;
  onGroupClick?: (group: MTaskGroup) => void;
  onViewModeChange?: (viewMode: EViewMode) => void;

  // Visual customization
  fontSize?: string;
  rowHeight?: number;
  timeStep?: number;
  unitWidth?: number;
}

export interface MTaskRowProps {
  taskGroup: MTaskGroup;
  startDate: Date;
  endDate: Date;
  totalMonths: number;
  monthWidth: number;
  editMode?: boolean;
  showProgress?: boolean;
  className?: string;
  tooltipClassName?: string;
  smoothDragging?: boolean;
  movementThreshold?: number;
  animationSpeed?: number;
  onTaskUpdate?: (groupId: string, updatedTask: MTask) => void;
  onTaskClick?: (task: MTask, group: MTaskGroup) => void;
  onTaskSelect?: (task: MTask, isSelected: boolean) => void;
  onAutoScrollChange?: (isScrolling: boolean) => void;
  viewMode?: EViewMode;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;

  // Custom render functions
  renderTask?: (props: MTaskRenderProps) => React.ReactNode;
  renderTooltip?: (props: MTooltipRenderProps) => React.ReactNode;
  getTaskColor?: (props: MTaskColorProps) => {
    backgroundColor: string;
    borderColor?: string;
    textColor?: string;
  };
}

export interface MTaskListProps {
  tasks: MTaskGroup[];
  headerLabel?: string;
  showIcon?: boolean;
  showTaskCount?: boolean;
  showDescription?: boolean;
  rowHeight?: number;
  className?: string;
  onGroupClick?: (group: MTaskGroup) => void;
  viewMode?: EViewMode;
}

export interface MTimelineProps {
  months: Date[];
  currentMonthIndex: number;
  locale?: string;
  className?: string;
  viewMode?: EViewMode;
  unitWidth?: number;
}

export interface MTaskItemProps {
  task: MTask;
  leftPx: number;
  widthPx: number;
  topPx: number;
  isHovered: boolean;
  isDragging: boolean;
  editMode: boolean;
  showProgress?: boolean;
  instanceId: string;
  className?: string;
  getTaskColor?: (props: MTaskColorProps) => {
    backgroundColor: string;
    borderColor?: string;
    textColor?: string;
  };
  renderTask?: (props: MTaskRenderProps) => React.ReactNode;
  onMouseDown: (event: React.MouseEvent, task: MTask, type: 'move' | 'resize-left' | 'resize-right') => void;
  onMouseEnter: (event: React.MouseEvent, task: MTask) => void;
  onMouseLeave: () => void;
  onClick: (event: React.MouseEvent, task: MTask) => void;
  onProgressUpdate?: (task: MTask, newPercent: number) => void;
}

export interface MTooltipProps {
  task: MTask;
  position: { x: number; y: number };
  dragType: 'move' | 'resize-left' | 'resize-right' | null;
  taskId?: string;
  startDate: Date;
  endDate: Date;
  totalMonths: number;
  monthWidth: number;
  showProgress?: boolean;
  instanceId: string;
  className?: string;
  viewMode?: EViewMode;
  renderTooltip?: (props: MTooltipRenderProps) => React.ReactNode;
}

export interface MTodayMarkerProps {
  currentMonthIndex: number;
  height: number;
  label?: string;
  dayOfMonth?: number;
  className?: string;
  markerClass?: string;
  viewMode?: EViewMode;
  unitWidth?: number;
}

// Interaction states for custom hooks
export interface MTaskInteraction {
  draggingTask: MTask | null;
  dragType: 'move' | 'resize-left' | 'resize-right' | null;
  dragStartX: number;
  hoveredTask: MTask | null;
  tooltipPosition: { x: number; y: number };
  previewTask: MTask | null;
}
