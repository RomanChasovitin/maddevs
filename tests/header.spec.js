import {
  mount
} from '@vue/test-utils';
import Header from '@/components/Header';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header, {
      stubs: ['router-link', 'modal']
    });
  });

  // ------ IMPORTANT ----- //
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  // --------------------- //

  it('sets the correct default data', () => {
    expect(typeof Header.data).toBe('function');
    const defaultData = Header.data();
    expect(defaultData.modalWindowName).toBe('contact-me');
  });
});
