import React from 'react';
import TaskList from './TaskList';

const ProjectCard = ({ project, onEdit, onDelete, darkMode, onTaskToggle }) => {
  const getStatusGradient = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'قيد التنفيذ':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      case 'مخطط':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getProgressGradient = (progress) => {
    if (progress === 100) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (progress >= 50) return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    return 'bg-gradient-to-r from-yellow-500 to-orange-500';
  };

  const handleTaskToggle = (taskId) => {
    if (onTaskToggle) {
      onTaskToggle(project.id, taskId);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:transform hover:scale-105">
      <div className="p-6">
        {/* الهيدر مع التدرج */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${getStatusGradient(project.status)} shadow-md`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        {/* شريط التقدم */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>التقدم</span>
            <span className="font-bold">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
            <div 
              className={`h-3 rounded-full ${getProgressGradient(project.progress)} shadow-lg transition-all duration-500`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* التواريخ */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <span className="font-bold text-gray-700 dark:text-gray-300">تاريخ البدء:</span>
            <p className="mt-1">{project.startDate}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <span className="font-bold text-gray-700 dark:text-gray-300">تاريخ الانتهاء:</span>
            <p className="mt-1">{project.endDate}</p>
          </div>
        </div>

        {/* المهام */}
        <TaskList 
          tasks={project.tasks} 
          darkMode={darkMode} 
          onTaskToggle={handleTaskToggle}
        />

        {/* الأزرار */}
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onEdit(project)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            تعديل
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;