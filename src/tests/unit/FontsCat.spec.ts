import { shallowMount } from '@vue/test-utils';
import FontsCat from '@/components/FontsCat.vue';

describe('FontsCat.vue', () => {
  it('should render the correct tag based on the "type" prop', () => {
    const wrapper = shallowMount(FontsCat, {
      props: {
        text: 'Sample Title',
        type: 'titulo',
      },
    });

    // Verifica que se renderiza un <h1> si el tipo es 'titulo'
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Sample Title');
  });

  it('should render the correct tag based on different types', () => {
    const types = [
      { type: 'subtitulo1', tag: 'h2', className: 'Title2' },
      { type: 'subtitulo2', tag: 'h3', className: 'SubT' },
      { type: 'WhiteText', tag: 'h3', className: 'Wtext' },
      { type: 'Receta', tag: 'h3', className: 'Receta' },
      { type: 'HeaderReceta', tag: 'h3', className: 'HReceta' },
      { type: 'Text_P', tag: 'p', className: 'Text_P' },
      { type: 'Text_N', tag: 'p', className: 'Text_N' },
      { type: 'Text_B', tag: 'p', className: 'Text_B' },
      { type: 'Text_G', tag: 'p', className: 'Text_G' },
      { type: 'BoldText', tag: 'p', className: 'BoldT' },
      { type: 'Notification', tag: 'p', className: 'Noti' },
      { type: 'Error', tag: 'p', className: 'error' },
      { type: 'Referencia', tag: 'a', className: 'Referencia' },
    ];

    types.forEach(({ type, tag, className }) => {
      const wrapper = shallowMount(FontsCat, {
        props: {
          text: 'Sample Text',
          type,
        },
      });

      // Verifica que el tag correspondiente exista y tenga el contenido correcto
      const element = wrapper.find(tag);
      expect(element.exists()).toBe(true);
      expect(element.classes()).toContain(className);
      expect(element.text()).toBe('Sample Text');
    });
  });

  it('should update customText when text prop changes', async () => {
    const wrapper = shallowMount(FontsCat, {
      props: {
        text: 'Initial Text',
        type: 'Text_B',
      },
    });

    // Verifica que el texto inicial sea el correcto
    expect(wrapper.find('p.Text_B').text()).toBe('Initial Text');

    // Cambia la propiedad 'text' y verifica que el texto se actualice
    await wrapper.setProps({ text: 'Updated Text' });
    expect(wrapper.find('p.Text_B').text()).toBe('Updated Text');
  });

  it('should correctly initialize customText in setup', () => {
    const wrapper = shallowMount(FontsCat, {
      props: {
        text: 'Test Text',
        type: 'Text_B',
      },
    });

    // Verifica que el valor de customText se inicialice correctamente
    expect(wrapper.vm.customText).toBe('Test Text');
  });
});
