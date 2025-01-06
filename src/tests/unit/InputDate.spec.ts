import { shallowMount, VueWrapper } from '@vue/test-utils';
import InputBoxDate from '@/components/InputBoxDate.vue'; // Asegúrate de que la ruta sea correcta

describe('InputBoxDate.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(InputBoxDate);
    expect(wrapper.exists()).toBe(true);
  }); 

  it('should render the correct placeholder and type', async () => {
    const wrapper: VueWrapper = shallowMount(InputBoxDate, {
      props: {
        placeholder: 'Select a date',
        type: 'text',
        modelValue: '',
      },
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select a date');
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });


  it('should update container width on window resize', async () => {
    const wrapper = shallowMount(InputBoxDate, {
      props: {
        minWidth: '50px',
        maxWidth: '100px',
        placeholder: 'Enter a date',
        modelValue: '',
      },
    });

    // Simula una ventana grande
    window.innerWidth = 800; // Simula una ventana grande
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('auto');
    expect(wrapper.vm.containerMaxWidth).toBe('100px');

    window.innerWidth = 400; // Simula una ventana pequeña
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('50px');
    expect(wrapper.vm.containerMaxWidth).toBe('0px');
  });

  it('should update the model value on input', async () => {
    const wrapper = shallowMount(InputBoxDate, {
      props: {
        placeholder: 'Enter a date',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    
    // Simula una entrada de texto
    await input.setValue('2024-10-20');
    
    // Verifica que el valor se haya emitido correctamente
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2024-10-20']);
  });


  it('should change input type on focus to "date"', async () => {
    const wrapper: VueWrapper = shallowMount(InputBoxDate, {
      props: {
        placeholder: 'Enter a date',
        type: 'text',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    
    // Simula el evento 'focus'
    await input.trigger('focus');

    // Verifica que el tipo haya cambiado a 'date'
    expect(input.attributes('type')).toBe('date');
  });

  it('should add and remove resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const wrapper = shallowMount(InputBoxDate, {
      props: { placeholder: 'Enter a date', modelValue: '' },
    });

    // Verifica que el listener de 'resize' se haya agregado
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);

    wrapper.unmount();
    
    // Verifica que el listener de 'resize' se haya eliminado
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
