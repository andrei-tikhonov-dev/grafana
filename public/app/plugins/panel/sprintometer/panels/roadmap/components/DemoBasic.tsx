import * as React from 'react';

import { GanttChart } from '../../../features/gantt';
import { MTask, MTaskGroup } from '../../../features/gantt/types';
import { basicDemoData } from '../mocks/mock';

interface DemoBasicProps {
  darkMode: boolean;
}

const DemoBasic: React.FC<DemoBasicProps> = ({ darkMode }: DemoBasicProps) => {
  const [tasks, setTasks] = React.useState<MTaskGroup[]>(basicDemoData);

  // Handle task updates
  const handleTaskUpdate = (groupId: string, updatedTask: MTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
            }
          : group
      )
    );
  };

  // Handle task click
  const handleTaskClick = (task: MTask, group: MTaskGroup) => {
    console.log('Task clicked:', task.name, 'in group:', group.name);
  };

  // Handle group click
  const handleGroupClick = (group: MTaskGroup) => {
    console.log('Group clicked:', group.name);
  };

  return (
    <div>
      <div className="control-panel">
        <button onClick={() => setTasks(basicDemoData)}>Reset Demo</button>
      </div>

      <GanttChart
        tasks={tasks}
        title="Project Timeline"
        darkMode={darkMode}
        showProgress={true}
        onTaskUpdate={handleTaskUpdate}
        onTaskClick={handleTaskClick}
        onGroupClick={handleGroupClick}
      />
    </div>
  );
};

export default DemoBasic;
