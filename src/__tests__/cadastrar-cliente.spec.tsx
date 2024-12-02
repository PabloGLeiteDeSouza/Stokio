import { render, screen, userEvent } from '@testing-library/react-native';
import Create from '@/app/screens/cliente/create';

test('form submits two answers', async () => {
  const questions = ['q1', 'q2'];
  const onSubmit = jest.fn();

  const user = userEvent.setup();
  render(<Create />);

  const answerInputs = screen.getAllByLabelText('answer input');
  await user.type(answerInputs[0], 'a1');
  await user.type(answerInputs[1], 'a2');
  await user.press(screen.getByRole('button', { name: 'Submit' }));

  expect(onSubmit).toHaveBeenCalledWith({
    1: { q: 'q1', a: 'a1' },
    2: { q: 'q2', a: 'a2' },
  });
});
