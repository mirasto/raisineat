import renderer from 'react-test-renderer';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders snapshot matching default state', () => {
    const tree = renderer.create(<Badge label="Default" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders info variant snapshot correctly', () => {
    const tree = renderer.create(<Badge label="20-30 min" variant="info" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders danger variant correctly', () => {
    const tree = renderer.create(<Badge label="Error" variant="danger" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
