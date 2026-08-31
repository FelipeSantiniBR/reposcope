import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { SearchScreen } from '../screens/SearchScreen';
import { RepositoryScreen } from '../screens/RepositoryScreen';
import { HeaderBackButton } from '../components/HeaderBackButton';

export type RootStackParamList = {
  Search: undefined;
  Repository: { repositoryId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Repository"
        component={RepositoryScreen}
        options={{ title: 'Repositório' }}
      />
    </Stack.Navigator>
  );
}
