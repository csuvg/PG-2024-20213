import { shallowMount } from '@vue/test-utils';
import tableHeaders from '@/components/TableHeaders.vue';
import FontsCat from '@/components/FontsCat.vue';

jest.mock('@/components/FontsCat.vue', () => ({
  name: 'FontsCat',
  props: ['text', 'type'],
  template: '<div class="mock-fonts-cat">{{ text }}</div>',
}));

describe('tableHeaders.vue', () => {
  it('renders correctly with given options', () => {
    const options = ['Header 1', 'Header 2', 'Header 3'];
    const wrapper = shallowMount(tableHeaders, {
      props: { options },
    });

    // Verificar que se haya renderizado el número correcto de opciones
    const renderedHeaders = wrapper.findAll('.ObjContainer');
    expect(renderedHeaders.length).toBe(options.length);

    // Verificar que cada opción se muestre correctamente
    renderedHeaders.forEach((headerWrapper, index) => {
      const fontsCat = headerWrapper.findComponent(FontsCat);
      expect(fontsCat.exists()).toBe(true);
      expect(fontsCat.props('text')).toBe(options[index]);
    });
  });

  it('renders no headers when options array is empty', () => {
    const wrapper = shallowMount(tableHeaders, {
      props: { options: [] },
    });

    // Verificar que no se haya renderizado ningún elemento
    const renderedHeaders = wrapper.findAll('.ObjContainer');
    expect(renderedHeaders.length).toBe(0);
  });
});
