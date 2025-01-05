import { shallowMount } from '@vue/test-utils';
import BackBtn from '@/components/BackBtn.vue';
import { config } from '@vue/test-utils';

describe('BackBtn.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };
  it('calls router.push with correct route when clicked', async () => {
    // Arrange: Mock Vue Router
    const mockRouter = {
      push: jest.fn(),
    };

    // Act: Mount the component with the mock router
    const wrapper = shallowMount(BackBtn, {
      props: { ruta: '/test-route' }, // Provide the 'ruta' prop
      global: {
        mocks: {
          $router: mockRouter, // Mock the $router
        },
      },
    });

    // Simulate click event on the .btnBack div
    await wrapper.find('.btnBack').trigger('click');

    // Assert: Check if the router.push method was called with the correct route
    expect(mockRouter.push).toHaveBeenCalledWith('/test-route');
  });

  it('defaults to "/" if no route is provided', async () => {
    // Arrange: Mock Vue Router
    const mockRouter = {
      push: jest.fn(),
    };

    // Act: Mount the component with the default 'ruta' prop
    const wrapper = shallowMount(BackBtn, {
      global: {
        mocks: {
          $router: mockRouter, // Mock the $router
        },
      },
    });

    // Simulate click event on the .btnBack div
    await wrapper.find('.btnBack').trigger('click');

    // Assert: Check if router.push was called with the default route "/"
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
