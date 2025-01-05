import { shallowMount } from '@vue/test-utils';
import InputBox from '@/components/InputBox.vue';
import { config } from '@vue/test-utils';

describe('InputBox.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };
  // Verifica si se inicializa correctamente el componente
  it('should render correctly', () => {
    const wrapper = shallowMount(InputBox);
    expect(wrapper.exists()).toBe(true);
  });

  // Verifica si el placeholder se renderiza correctamente
  it('should render the placeholder correctly', async () => {
    const placeholderText = 'Enter text';
    const wrapper = shallowMount(InputBox, {
      props: { placeholder: placeholderText },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholderText); // Resultado que se esepra
  });

  // Verifica si el valor inicial de la prop 'modelValue' se refleja en el input
  it('should initialize with the correct value', () => {
    const modelValue = 'Initial value';
    const wrapper = shallowMount(InputBox, {
      props: { modelValue },
    });
    expect(wrapper.find('input').element.value).toBe(modelValue);
  });

  // Verifica si se emite correctamente el evento 'update:modelValue'
  it('should emit update:modelValue when input changes', async () => {
    const wrapper = shallowMount(InputBox);
    const input = wrapper.find('input');

    await input.setValue('new value');
    
    // Verifica que se emitió el evento con el valor correcto
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['new value']);
  });

  // Verifica si el ancho del contenedor se ajusta correctamente según el tamaño de la pantalla
  it('should update container width on window resize', async () => {
    const wrapper = shallowMount(InputBox, {
      props: {
        minWidth: '50px',
        maxWidth: '100px',
      },
    });

    window.innerWidth = 800; // Simula una ventana grande
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('auto');
    expect(wrapper.vm.containerMaxWidth).toBe('100px');

    window.innerWidth = 400; // Simula una ventana pequeña
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('50px');
    expect(wrapper.vm.containerMaxWidth).toBe('0px');
  });

  // Verifica si el evento resize es agregado y removido correctamente
  it('should add and remove resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const wrapper = shallowMount(InputBox);
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
