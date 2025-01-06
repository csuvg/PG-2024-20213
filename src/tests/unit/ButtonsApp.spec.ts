import { shallowMount } from '@vue/test-utils';
import ButtonsApp from '@/components/ButtonsApp.vue';
import FontsCat from '@/components/FontsCat.vue';
import { config } from '@vue/test-utils';

describe('ButtonsApp.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };
  it('muestra el texto correcto', () => {
    const buttonText = 'Haz click';

    // Act: Mount the ButtonsApp component
    const wrapper = shallowMount(ButtonsApp, {
      props: { buttonText },
      global: {
        components: {
          FontsCat, // Mocking the FontsCat component
        },
      },
    });

    // Assert: Check if FontsCat is passed the correct text prop
    const fontsCatWrapper = wrapper.findComponent(FontsCat);
    expect(fontsCatWrapper.exists()).toBe(true); // Check if FontsCat is rendered
    expect(fontsCatWrapper.props('text')).toBe(buttonText); // Check the prop
  });

  it('renders the button with correct class', () => {
    // Arrange: Define the buttonText prop
    const buttonText = 'Click Me';

    // Act: Mount the ButtonsApp component
    const wrapper = shallowMount(ButtonsApp, {
      props: { buttonText },
    });

    // Assert: Check if the button is rendered with correct class
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain('btn'); // Ensure the class is correct
  });
});
