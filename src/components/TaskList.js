import React from 'react';

const TaskList = ({ tasks, darkMode, onTaskToggle }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const handleTaskToggle = (taskId) => {
    if (onTaskToggle) {
      onTaskToggle(taskId);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white">
          المهام ({completedTasks}/{totalTasks})
        </h4>
        {totalTasks > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((completedTasks / totalTasks) * 100)}% مكتمل
          </div>
        )}
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
              task.completed 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
            onClick={() => handleTaskToggle(task.id)}
          >
            <div className={`flex items-center justify-center w-5 h-5 rounded border mr-3 transition-all duration-200 ${
              task.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
            }`}>
              {task.completed && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={`flex-1 text-sm transition-all duration-200 ${
                task.completed 
                  ? 'text-green-700 dark:text-green-300 line-through' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {task.title}
            </span>
            {task.completed && (
              <svg className="w-4 h-4 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
          لا توجد مهام مضافة لهذا المشروع
        </div>
      )}
    </div>
  );
};

export default TaskList;