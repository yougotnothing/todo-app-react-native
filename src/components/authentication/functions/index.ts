import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "axios-config";
import { LoginDto } from "dto/login";
import { RegisterDto } from "dto/register";

export const handleRegister = async (dto: RegisterDto) => {
  try {
    const response = await api.post('/auth/register', {
      name: dto.name,
      password: dto.password,
      email: dto.email
    });

    await AsyncStorage.setItem('token', response.data.token);
    console.log('response', response.data);
  }catch(error: any) {
    console.error(error);
  }
}

export const handleLogin = async (dto: LoginDto) => {
  try {
    const response = await api.post('/auth/login', {
      login: dto.login,
      password: dto.password
    });

    console.log('response', response.data);
  }catch(error: any) {
    console.error(error);
  }
}
