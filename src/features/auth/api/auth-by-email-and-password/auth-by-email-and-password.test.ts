import { $api } from "@/shared/api/instance";
import { authByEmailAndPassword } from "./auth-by-email-and-password";
import { ACCESS_TOKEN_KEY } from "../../lib/consts/local-storage";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";


vi.mock('@/shared/api/instance');
const mockPost = $api.post as Mock;

describe('authByEmailAndPassword', () => {
   beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

 it('1. Успешная авторизация', async () => {
    mockPost.mockResolvedValue({
      status: 200,
      data: { 
        accessToken: 'custom-token',
        user: {
          id: 'test-id',
          email: 'test@example.com',
          role: 'ADMIN'
        }
      }
    });

    const result = await authByEmailAndPassword({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(mockPost).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe('custom-token');
    expect(result).toEqual({
      data: { 
        accessToken: 'custom-token',
        user: {
          id: 'test-id',
          email: 'test@example.com',
          role: 'ADMIN'
        }
      },
      error: null
    });
  });

  it('2. Обработка ошибки сервера', async () => {
    mockPost.mockResolvedValue({
      status: 401,
      data: { message: 'Unauthorized' }
    });

    await expect(() => authByEmailAndPassword({ 
      email: 'bad@test.com', 
      password: 'wrong' 
    })).rejects.toThrowError('Неверные логин или пароль');
  });
})
