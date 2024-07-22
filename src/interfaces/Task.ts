
export interface Task {
    id?: number; 
    title: string;
    description: string;
    dueDate: string; 
    priority: '1' | '2' | '3';
    status: 'Incomplete' | 'Complete'; 
    userId?: number; 
  }
  