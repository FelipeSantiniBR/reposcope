import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../theme/ThemeProvider';
import { Button } from './Button';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Button', () => {
  it('renders the label and calls onPress when tapped', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Salvar" onPress={onPress} />);

    fireEvent.press(screen.getByText('Salvar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Salvar" onPress={onPress} disabled />);

    fireEvent.press(screen.getByText('Salvar'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a loading indicator instead of the label when loading', async () => {
    await renderWithTheme(<Button label="Salvar" onPress={jest.fn()} loading />);

    expect(screen.queryByText('Salvar')).toBeNull();
    expect(screen.getByTestId('button-loading-indicator')).toBeTruthy();
  });
});
