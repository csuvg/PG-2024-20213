import { shallowMount, VueWrapper } from '@vue/test-utils';
import inputDropDown from '@/components/inputDropDown.vue';


describe('inputDropDown.vue', () => {
  // Verifica si se monta correctamente el componente
  it('should render correctly', () => {
    const wrapper: VueWrapper = shallowMount(inputDropDown, {
      props: {
        opciones: ['Opción 1', 'Opción 2'],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  // Verifica si el placeholder se renderiza correctamente
  it('should render the placeholder correctly', () => {
    const placeholderText = 'Seleccione una opción';
    const wrapper: VueWrapper = shallowMount(inputDropDown, {
      props: {
        placeholder: placeholderText,
        opciones: ['Opción 1', 'Opción 2'],
      },
    });
    const placeholderOption = wrapper.find('option[value=""]');
    expect(placeholderOption.exists()).toBe(true);
    expect(placeholderOption.text()).toBe(placeholderText);
  });

  // Verifica si el valor inicial de la prop 'modelValue' se refleja en el select
  it('should initialize with the correct selected value', () => {
    const modelValue = 'Opción 1';
    const wrapper: VueWrapper = shallowMount(inputDropDown, {
      props: {
        modelValue,
        opciones: ['Opción 1', 'Opción 2'],
      },
    });
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe(modelValue);
  });

  // Verifica si las opciones se renderizan correctamente
  it('should render the options correctly', () => {
    const opciones = ['Opción 1', 'Opción 2'];
    const wrapper = shallowMount(inputDropDown, {
      props: {
        opciones,
      },
    });

    const optionElements = wrapper.findAll('option');
    expect(optionElements.length).toBe(3); // Dos opciones más el placeholder
    expect(optionElements[1].text()).toBe('Opción 1');
    expect(optionElements[2].text()).toBe('Opción 2');
  });

  // Verifica si se emite correctamente el evento 'update:modelValue' al seleccionar una opción
  it('should emit update:modelValue when an option is selected', async () => {
    const wrapper = shallowMount(inputDropDown, {
      props: {
        opciones: ['Opción 1', 'Opción 2'],
      },
    });

    const select = wrapper.find('select');
    await select.setValue('Opción 2');
    
    // Verifica que se emitió el evento con el valor correcto
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Opción 2']);
  });

  // Verifica si el ancho del contenedor se ajusta correctamente según el tamaño de la pantalla
  it('should update container width on window resize', async () => {
    const wrapper = shallowMount(inputDropDown, {
      props: {
        minWidth: '50px',
        maxWidth: '100px',
        opciones: ['Opción 1', 'Opción 2'],
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

    const wrapper = shallowMount(inputDropDown, {
      props: { opciones: ['Opción 1', 'Opción 2'] },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
