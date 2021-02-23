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
    wrapper = mount(Header, getMountParams(false));
    wrapper.vm.$refs = { 
      headerContainer: {
        offsetHeight: 60
      },
      header: {
        style: {
          width: 0
        }
      },
      overlay: {
        style: {
          width: 0
        }
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

  test('getHtmlElements method set html items in data instances', () => {
    wrapper.vm.getHtmlElements();
    expect(wrapper.vm.$data.caseHeader.getAttribute('id')).toEqual('case-header');
    expect(wrapper.vm.$data.headerWhiteLogoText.getAttribute('id')).toEqual('header-logo-text');
  });

  test('addEventListenersForGoDeeCase method set html items in data instances', () => { // Не нашел способа как протестировать event listener поэтому пока-что тестирую только получение элементов
    wrapper.vm.addEventListenersForGoDeeCase();
    expect(wrapper.vm.$data.caseGoDeeFirstSection.getAttribute('id')).toEqual('case-first-section');
    expect(wrapper.vm.$data.caseGoDeeMainContainer.getAttribute('id')).toEqual('case-main-container');
  });

  test('setWidthForHeader calculate window width and set new styles for header elements', () => {
    wrapper.vm.$data.caseGoDeeMainContainer = {
      offsetWidth: 1280,
      clientWidth: 1260
    };
    wrapper.vm.setWidthForHeader();
    expect(wrapper.vm.$refs.header.style.width && wrapper.vm.$refs.overlay.style.width).toEqual('calc(100% - 20px)');
  });
});
