import { shallowMount } from '@vue/test-utils';
import ShowingBox from '@/components/ShowingBox.vue';
import FontsCat from '@/components/FontsCat.vue';

describe('ShowingBox.vue', () => {
  it('should update container width on window resize', async () => {
    const wrapper = shallowMount(ShowingBox, {
      props: {
        text: 'Sample Text',
        minWidth: '35%',
        maxWidth: '20%',
      },
    });

    // Simula una ventana grande
    window.innerWidth = 800;
    await wrapper.vm.updateContainerWidth();
    
    // Verifica que el valor de los estilos cambie según el tamaño de la ventana
    expect(wrapper.vm.containerMinWidth).toBe('auto');
    expect(wrapper.vm.containerMaxWidth).toBe('20%');

    // Simula una ventana pequeña
    window.innerWidth = 400;
    await wrapper.vm.updateContainerWidth();

    expect(wrapper.vm.containerMinWidth).toBe('35%');
    expect(wrapper.vm.containerMaxWidth).toBe('0%');
  });

  it('should pass the correct props to FontsCat component', () => {
    const wrapper = shallowMount(ShowingBox, {
      props: {
        text: 'Test Text',
      },
    });

    const fontsCatWrapper = wrapper.findComponent(FontsCat);
    
    // Verifica que se pase correctamente la propiedad 'text' al componente FontsCat
    expect(fontsCatWrapper.props('text')).toBe('Test Text');
    expect(fontsCatWrapper.props('type')).toBe('Text_B');
  });

  it('should render the correct max and min width on initial render', () => {
    const wrapper = shallowMount(ShowingBox, {
      props: {
        text: 'Sample Text',
        minWidth: '35%',
        maxWidth: '20%',
      },
    });

    const containerDiv = wrapper.find('.Conteiner');
    
    // Verifica que el ancho mínimo y máximo se apliquen correctamente
    expect(containerDiv.attributes('style')).toContain('min-width: 35%;');
    expect(containerDiv.attributes('style')).toContain('max-width: 20%;');
  });

  it('should add and remove resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const wrapper = shallowMount(ShowingBox, {
      props: { text: 'Test Text' },
    });

    // Verifica que el listener de 'resize' se haya agregado
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);

    wrapper.unmount();
    
    // Verifica que el listener de 'resize' se haya eliminado
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
