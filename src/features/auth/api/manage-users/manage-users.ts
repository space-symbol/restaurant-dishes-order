import { z } from "zod";
import { userSchema } from "@/entities/auth";

const USERS_STORAGE_KEY = "app-users";
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

// Схема для нового пользователя
const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type NewUser = z.infer<typeof newUserSchema>;

// Интерфейс пользователя с паролем для внутреннего хранения
interface UserWithPassword {
  id: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

// Инициализация администратора
const initializeAdmin = (): void => {
  const users = getUsersFromStorage();
  
  // Проверяем, есть ли уже администратор
  const adminExists = users.some(user => user.email === ADMIN_EMAIL);
  
  if (!adminExists) {
    const admin: UserWithPassword = {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "ADMIN",
      createdAt: new Date().toISOString()
    };
    
    users.push(admin);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

// Получение пользователей из localStorage
const getUsersFromStorage = (): UserWithPassword[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch {
    return [];
  }
};

// Сохранение пользователей в localStorage
const saveUsersToStorage = (users: UserWithPassword[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Аутентификация пользователя
export const authenticateUser = (email: string, password: string): { user: z.infer<typeof userSchema>; token: string } | null => {
  initializeAdmin();
  const users = getUsersFromStorage();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return null;
  }
  
  // Создаем токен (в реальном приложении это был бы JWT)
  const token = `mock-token-${user.id}-${Date.now()}`;
  
  // Возвращаем пользователя без пароля
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token
  };
};

// Регистрация нового пользователя
export const registerUser = (email: string, password: string): { user: z.infer<typeof userSchema>; token: string } => {
  initializeAdmin();
  const users = getUsersFromStorage();
  
  // Проверяем, не существует ли уже пользователь с таким email
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }
  
  // Создаем нового пользователя
  const newUser: UserWithPassword = {
    id: `user-${Date.now()}`,
    email,
    password,
    role: "USER",
    createdAt: new Date().toISOString()
  };
  
  // Добавляем пользователя в хранилище
  users.push(newUser);
  saveUsersToStorage(users);
  
  // Создаем токен
  const token = `mock-token-${newUser.id}-${Date.now()}`;
  
  // Возвращаем пользователя без пароля
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword,
    token
  };
};

// Получение всех пользователей (только для администратора)
export const getAllUsers = (): z.infer<typeof userSchema>[] => {
  const users = getUsersFromStorage();
  return users.map(({ password, ...user }) => user);
};

// Удаление пользователя (только для администратора)
export const deleteUser = (userId: string): void => {
  const users = getUsersFromStorage();
  const filteredUsers = users.filter(u => u.id !== userId);
  saveUsersToStorage(filteredUsers);
};

// Инициализация при загрузке приложения
export const initializeAuth = (): void => {
  initializeAdmin();
}; 