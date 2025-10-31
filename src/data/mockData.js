export const initialProjects = [
  {
    id: 1,
    title: "تطبيق ويب للتجارة الإلكترونية",
    description: "تطوير منصة تجارة إلكترونية متكاملة",
    status: "قيد التنفيذ",
    progress: 65,
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    tasks: [
      { id: 1, title: "تصميم واجهة المستخدم", completed: true },
      { id: 2, title: "تطوير نظام الدفع", completed: true },
      { id: 3, title: "ربط مع البوابات البنكية", completed: false },
      { id: 4, title: "اختبار النظام", completed: false }
    ]
  },
  {
    id: 2,
    title: "نظام إدارة الموارد البشرية",
    description: "بناء نظام لإدارة الموظفين والإجازات",
    status: "مكتمل",
    progress: 100,
    startDate: "2023-08-15",
    endDate: "2023-10-30",
    tasks: [
      { id: 1, title: "تحليل المتطلبات", completed: true },
      { id: 2, title: "تصميم قاعدة البيانات", completed: true },
      { id: 3, title: "تطوير الوحدات الأساسية", completed: true }
    ]
  },
  {
    id: 3,
    title: "تطبيق جوال لللياقة البدنية",
    description: "تطوير تطبيق متابعة التمارين الرياضية",
    status: "مخطط",
    progress: 0,
    startDate: "2023-11-15",
    endDate: "2024-02-28",
    tasks: [
      { id: 1, title: "دراسة السوق", completed: false },
      { id: 2, title: "تخطيط التصميم", completed: false }
    ]
  }
];