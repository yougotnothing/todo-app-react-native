import { api } from "../../../api/axios.config";
import { LoginDto } from "../../../types/login.type";
import { RegisterDto } from "../../../types/register.type";

export const handleRegister = async (dto: RegisterDto) => {
  try {
    const response = await api.post('/auth/register', {
      name: dto.name,
      password: dto.password,
      email: dto.email,
      confirmPassword: dto.confirmPassword
    });
    console.log('response', response.data);
  }catch(error: any) {
    console.error(error);
  }
}

export const handleLogin = async (dto: LoginDto) => {
  try {
    const response = await api.post('/auth/login', {
      name: dto.name,
      password: dto.password
    });

    console.log('response', response.data);
  }catch(error: any) {
    console.error(error);
  }
}