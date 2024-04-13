import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../api/axios.config";
import { LoginDto } from "../../../dto/login.dto";
import { RegisterDto } from "../../../dto/register.dto";
import { UserDto } from "../../../dto/user.dto";

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

    await AsyncStorage.setItem('token', response.data.token);
    console.log('response', response.data);
  }catch(error: any) {
    console.error(error);
  }
}

export const handleGetUser = async (set: React.Dispatch<React.SetStateAction<UserDto | undefined>>) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if(!token) {
      return;
    }

    const response = await api.get('/user/get-user', {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    const user = await AsyncStorage.getItem('user');
    user && set(JSON.parse(user));
  }catch(error: any) {
    console.error(error);
  }
}