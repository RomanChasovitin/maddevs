import { mount } from '@vue/test-utils';
import MobileHeader from '@/components/Header/mobile-header';

describe('MobileHeader', () => {
  let wrapper;
  let getMountParams = includesValue => {
    let mountParams = {
      stubs: ['router-link', 'headerLogo'],
      mocks: {
        $nuxt: {
          $route: {
            path: {
              includes: jest.fn(() => includesValue)
            }
          }
        }
      }
    };
    return mountParams;
  };
  const htmlElementsId = ['case-main-container', 'read-our-case-btn', 'case-first-section', 'case-main-container', 'case-header', 'header-logo-text'];
  htmlElementsId.forEach(elementId => {
    let element = document.createElement('div');
    element.setAttribute('id', elementId);
    element.getBoundingClientRect = jest.fn(() => ({ // Set custom value for getBoundingClientRect
      top: 100
    }));
    document.body.appendChild(element);
  });
  beforeEach(() => {
    wrapper = mount(MobileHeader, getMountParams(true));
  });

  // ------ IMPORTANT ----- //
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  // --------------------- //
});
