import { describe } from "node:test";
import { beforeEach, expect, it, Mock, vi } from "vitest";
import { register } from "./register";
import { $api } from "@/shared/api/instance";

vi.mock('@/shared/api/instance');
const mockPost = $api.post as Mock;

describe('register user', () => {
  
  beforeEach(() => {
    mockPost.mockClear();
  })

  it('1. Успешная регистрация', async () => {
    mockPost.mockResolvedValue({
        status: 200,
        data: { message: 'Регистрация прошла успешно' }
    });

    const data = await register({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(data).toEqual({ data: 'Регистрация прошла успешно', error: null });
  })

  it('2. Неудачная регистрация', async () => {
    mockPost.mockResolvedValue({
        status: 400,
        data: { message: 'Bad Request' }
    });

    expect(register({
      email: 'test@example.com',
      password: 'password123'
    })).rejects.toThrowError('Ошибка регистрации');
  })
})