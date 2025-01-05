// InputBoxBigger.spec.ts
import { mount } from '@vue/test-utils';
import InputBoxBigger from '@/components/InputBoxBigger.vue';
import { config } from '@vue/test-utils';

describe('InputBoxBigger.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };

  it('renders the placeholder text', async () => {
    const placeholderText = 'Ingrese texto aquí...'
    const wrapper = mount(InputBoxBigger, {
      props: {
        placeholder: placeholderText,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('textarea').attributes('placeholder')).toBe(placeholderText);
  });

  it('binds modelValue correctly and emits update:modelValue', async () => {
    const wrapper = mount(InputBoxBigger, {
      props: {
        modelValue: 'Texto inicial',
      },
    });

    // Verificar que el valor inicial sea el correcto
    const textarea = wrapper.find('textarea');
    expect(textarea.element.value).toBe('Texto inicial');

    // Simular un cambio en el valor del textarea
    await textarea.setValue('Nuevo texto');

    // Verificar que se haya emitido el evento correcto
    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(['Nuevo texto']);
  });

  it('updates the container width when resized', async () => {
    const wrapper = mount(InputBoxBigger, {
      props: {
        minWidth: '300px',
        maxWidth: '600px',
      },
    });

    // Simular que el ancho de la ventana es mayor a 600
    window.innerWidth = 700;
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('auto');
    expect(wrapper.vm.containerMaxWidth).toBe('600px');

    // Simular que el ancho de la ventana es menor a 600
    window.innerWidth = 500;
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('300px');
    expect(wrapper.vm.containerMaxWidth).toBe('0px');
  });

  it('cleans up event listeners on component unmount', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const wrapper = mount(InputBoxBigger);
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
