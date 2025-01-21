
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    member:TeamMember
  }
  
  export type Task = {
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Completed";
    assignTo:string;
  };