import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, authorizedUser } from "../../../api/axios.config";
import { LoginDto } from "../../../dto/login.dto";
import { RegisterDto } from "../../../dto/register.dto";
import { UserDto } from "../../../dto/user.dto";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation<any>();
    const response = await api.post('/auth/login', {
      login: dto.login,
      password: dto.password
    });

    await AsyncStorage.setItem('token', response.data.token);
    console.log('response', response.data);
    navigation.navigate('Root');
  }catch(error: any) {
    console.error(error);
  }
}
