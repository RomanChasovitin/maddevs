import { mount } from '@vue/test-utils';
import Header from '@/components/Header';

describe('Header', () => {
  let wrapper;
  let getMountParams = includesValue => {
    let mountParams = {
      stubs: ['router-link', 'headerLogo', 'mobileHeader'],
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
  const classes = ['main'];
  classes.forEach(className => {
    let element = document.createElement('div'); // Mock getElementsByClassName and addEventListener functions 
    element.setAttribute('class', className);
    document.body.appendChild(element);
  });

  beforeEach(() => {
    wrapper = mount(Header, getMountParams(false));
    wrapper.vm.$refs = { 
      headerContainer: {
        offsetHeight: 60
      }
    };
  });

  // ------ IMPORTANT ----- //
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  // --------------------- //

  test('setDefaultStateForHeader function, should set "true" for data instances', () => {
    wrapper = mount(Header, getMountParams(true));
    expect(wrapper.vm.$data.headerIsTransparent && wrapper.vm.$data.isCasePage).toEqual(true);
  });

  test('setDefaultStateForHeader function, should set "false" for data instances', () => {
    wrapper = mount(Header, getMountParams(false));
    expect(wrapper.vm.$data.headerIsTransparent && wrapper.vm.$data.isCasePage).toEqual(false);
  });

  test('goToTopPage method call window.scrollTo()', () => {
    window.scrollTo = jest.fn();
    wrapper.vm.goToTopPage();
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });

  test('getScollTop set new value for data instance scrollTop', () => {
    wrapper.vm.$data.caseMoreButton = {
      getBoundingClientRect: jest.fn(() => ({
        top: 100
      }))
    };
    wrapper.vm.getScrollTop();
    expect(wrapper.vm.$data.scrollTop).toEqual(40);
  });

  test('scrollHandler method call setStylesForHeader', () => {
    const spySetStylesForHeader = jest.spyOn(wrapper.vm, 'setStylesForHeader');
    wrapper.vm.scrollHandler();
    expect(spySetStylesForHeader).toHaveBeenCalled();
    spySetStylesForHeader.mockReset();
  });

  test('scrollHandlerGodeeCase method call setStylesForHeaderInGoDeeCase', () => {
    const spySetStylesForHeaderInGoDeeCase = jest.spyOn(wrapper.vm, 'setStylesForHeaderInGoDeeCase');
    wrapper.vm.scrollHandlerGodeeCase();
    expect(spySetStylesForHeaderInGoDeeCase).toHaveBeenCalled();
    spySetStylesForHeaderInGoDeeCase.mockReset();
  });
});
