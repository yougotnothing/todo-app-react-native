import { api } from "../../../api/axios.config";
import { LoginDto } from "../../../dto/login.dto";
import { RegisterDto } from "../../../dto/register.dto";

export const handleRegister = async (dto: RegisterDto) => {
  try {
    const response = await api.post('/auth/register', {
      name: dto.name,
      password: dto.password,
      email: dto.email
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