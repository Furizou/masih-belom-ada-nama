export type Role = 'user' | 'worker' | 'guest';
export type Gender = 'Male' | 'Female';

export interface AuthUser {
  id: string;
  Pno: string;
  password: string;
  role: Role;
  name: string;
  level: string;
  gender: Gender;
  birthDate: string;
  address: string;
  balance: number;

}

// Test users for development
const TEST_USERS: AuthUser[] = [
  {
    id: '1',
    Pno: '1122334455',
    password: 'password123',
    role: 'user',
    name: "John User",
    level: "Gold Member",
    gender: "Male",
    birthDate: "1990-01-01",
    address: "123 Main Street, City",
    balance: 1500000,
  },
  {
    id: '2',
    Pno: '2233445566',
    password: 'password123',
    role: 'worker',
    name: 'Jane Worker',
    gender: "Female",
    birthDate: "1992-05-15",
    address: "456 Worker Street, City",
    balance: 2500000,
    level: "gold"
    // bankName: "Bank BCA",
    // accountNumber: "1234567890",
    // npwp: "12.345.678.9-012.345",
    // rating: 4.8,
    // completedOrders: 156,
    // photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=face",
    // categories: [
    //   "House Cleaning",
    //   "Laundry Service"
    // ]
  },
  {
    id: '3',
    Pno: '3344556677',
    password: 'password123',
    role: 'guest',
    name: 'Alex Guest'
  }
];

export const getDashboardPath = (role: Role): string => {
  const paths: Record<Role, string> = {
    user: '/dashboard/user',
    worker: '/dashboard/worker',
    guest: '/dashboard/guest',
  };
  return paths[role];
};

export const authenticateUser = async (
  Pno: string,
  password: string,
): Promise<AuthUser> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = TEST_USERS.find(u => u.Pno === Pno);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};