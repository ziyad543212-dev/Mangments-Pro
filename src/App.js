import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';
import Footer from './components/Footer';
import { initialProjects } from './data/mockData';

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [filter, setFilter] = useState('الكل');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      setProjects(projects.filter(project => project.id !== projectId));
    }
  };

  // دالة جديدة لإدارة تفعيل/إلغاء تفعيل المهام
  const handleTaskToggle = (projectId, taskId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        
        const progress = calculateProgress(updatedTasks);
        const status = getProjectStatus(progress, project.status);
        
        return {
          ...project,
          tasks: updatedTasks,
          progress: progress,
          status: status
        };
      }
      return project;
    }));
  };

  // دالة لتحديد حالة المشروع بناءً على التقدم
  const getProjectStatus = (progress, currentStatus) => {
    if (progress === 100) return 'مكتمل';
    if (progress > 0 && progress < 100) return 'قيد التنفيذ';
    if (progress === 0 && currentStatus === 'مكتمل') return 'مخطط';
    return currentStatus;
  };

  const handleSubmitProject = (projectData) => {
    if (editingProject) {
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { 
              ...projectData, 
              id: editingProject.id,
              progress: calculateProgress(projectData.tasks),
              status: getProjectStatus(calculateProgress(projectData.tasks), projectData.status)
            }
          : project
      ));
    } else {
      const newProject = {
        ...projectData,
        id: Date.now(),
        progress: calculateProgress(projectData.tasks),
        status: getProjectStatus(calculateProgress(projectData.tasks), projectData.status)
      };
      setProjects([...projects, newProject]);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const calculateProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'الكل') return true;
    return project.status === filter;
  });

  const getButtonGradient = (buttonFilter) => {
    if (filter === buttonFilter) {
      switch (buttonFilter) {
        case 'مخطط':
          return 'bg-filter-planned text-white shadow-lg transform scale-105';
        case 'قيد التنفيذ':
          return 'bg-filter-progress text-gray-800 shadow-lg transform scale-105';
        case 'مكتمل':
          return 'bg-filter-completed text-white shadow-lg transform scale-105';
        case 'الكل':
          return 'bg-filter-all text-white shadow-lg transform scale-105';
        default:
          return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-white';
      }
    }
    return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800 dark:to-gray-700 dark:text-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="app-background min-h-screen flex flex-col">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
          {/* الشريط العلوي مع التدرج */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="text-center lg:text-right">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  قائمة المشاريع
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  إدارة وتتبع جميع مشاريعك في مكان واحد
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
                {/* أزرار التصفية مع تدرجات */}
                <div className="flex flex-wrap gap-3 bg-white/60 dark:bg-gray-800/60 p-3 rounded-xl shadow-lg glass-effect dark:glass-effect-dark">
                  <button
                    onClick={() => setFilter('الكل')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center ${getButtonGradient('الكل')}`}
                  >
                    <span>الكل</span>
                    {/* <span className="text-sm bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full">
                      {projects.length}
                    </span> */}
                  </button>
                  
                  <button
                    onClick={() => setFilter('مخطط')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center ${getButtonGradient('مخطط')}`}
                  >
                    <span>مخطط</span>
                    {/* <span className="text-sm bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full">
                      {projects.filter(p => p.status === 'مخطط').length}
                    </span> */}
                  </button>
                  
                  <button
                    onClick={() => setFilter('قيد التنفيذ')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center ${getButtonGradient('قيد التنفيذ')}`}
                  >
                    <span>قيد التنفيذ</span>
                    {/* <span className="text-sm bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full">
                      {projects.filter(p => p.status === 'قيد التنفيذ').length}
                    </span> */}
                  </button>
                  
                  <button
                    onClick={() => setFilter('مكتمل')}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center ${getButtonGradient('مكتمل')}`}
                  >
                    <span>مكتمل</span>
                    {/* <span className="text-sm bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full">
                      {projects.filter(p => p.status === 'مكتمل').length}
                    </span> */}
                  </button>
                </div>
                
                {/* زر إضافة مشروع جديد */}
                <button
                  onClick={handleAddProject}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة مشروع جديد
                </button>
              </div>
            </div>
          </div>

          {/* إحصائيات سريعة مع تدرجات */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">{projects.length}</div>
              <div className="text-blue-100 text-sm">إجمالي المشاريع</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status === 'مخطط').length}
              </div>
              <div className="text-yellow-100 text-sm">مخطط</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status === 'قيد التنفيذ').length}
              </div>
              <div className="text-purple-100 text-sm">قيد التنفيذ</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">
                {projects.filter(p => p.status === 'مكتمل').length}
              </div>
              <div className="text-green-100 text-sm">مكتمل</div>
            </div>
          </div>

          {/* عرض المشاريع */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onTaskToggle={handleTaskToggle}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* حالة عدم وجود مشاريع */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                لا توجد مشاريع لعرضها
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {filter !== 'الكل' ? `لا توجد مشاريع بحالة "${filter}"` : 'قم بإضافة مشروع جديد للبدء'}
              </p>
              {filter !== 'الكل' && (
                <button
                  onClick={() => setFilter('الكل')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  عرض جميع المشاريع
                </button>
              )}
            </div>
          )}
        </main>

        {/* إضافة ال Footer */}
        <Footer darkMode={darkMode} />

        {showForm && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleSubmitProject}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;