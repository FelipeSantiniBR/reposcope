import { Pressable, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Repository } from '../../domain/entities/Repository';
import { Card } from './Card';
import { Text } from './Text';
import { Badge } from './Badge';
import { Spacing } from './Spacing';

interface Props {
  repository: Repository;
  onPress?: () => void;
}

export function RepositoryCard({ repository, onPress }: Props) {
  const { spacing, colors } = useTheme();

  const card = (
    <Card>
      <Text fontWeight="bold">{repository.fullName}</Text>
      <Text numberOfLines={2}>{repository.description || ''}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          marginTop: spacing.xs,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Star color={colors.primary} size={14} />
          <Spacing direction="horizontal" size="sm" />
          <Text fontSize="sm" variant="muted">
            {repository.stars}
          </Text>
        </View>
        {repository.language && <Badge label={repository.language} />}
      </View>
    </Card>
  );

  if (!onPress) return card;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      {card}
    </Pressable>
  );
}
