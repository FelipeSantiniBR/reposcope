import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../theme/ThemeProvider';
import { Badge } from './Badge';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Badge', () => {
  it('renders the given label', async () => {
    await renderWithTheme(<Badge label="Bug" tone="danger" />);

    expect(screen.getByText('Bug')).toBeTruthy();
  });

  it('defaults to the "default" tone when none is given', async () => {
    await renderWithTheme(<Badge label="Novo" />);

    expect(screen.getByText('Novo')).toBeTruthy();
  });
});
