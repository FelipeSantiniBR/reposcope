import { View } from 'react-native';
import { Star, GitFork, Eye } from 'lucide-react-native';
import { Repository } from '../../domain/entities/Repository';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Badge } from './Badge';
import { Spacing } from './Spacing';

interface Props {
  repository: Repository;
}

export function RepositoryDetailsTab({ repository }: Props) {
  const { spacing, colors } = useTheme();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Star color={colors.primary} size={16} />
          <Text variant="muted">{repository.stars}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <GitFork color={colors.primary} size={16} />
          <Text variant="muted">{repository.forks}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Eye color={colors.primary} size={16} />
          <Text variant="muted">{repository.watchers}</Text>
        </View>
      </View>

      {repository.language && (
        <>
          <Spacing />
          <Badge label={repository.language} />
        </>
      )}
    </View>
  );
}
