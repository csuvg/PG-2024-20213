import { shallowMount, VueWrapper } from '@vue/test-utils';
import SubMenu3 from '@/components/SubMenu3.vue';
import { useRoute, useRouter } from 'vue-router';
import { ComponentPublicInstance } from 'vue';
import { mount } from '@vue/test-utils';
import { config } from '@vue/test-utils';

// Mock para useRoute y useRouter
jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(),
}));

describe('SubMenu3.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };
  
  let wrapper: VueWrapper<any, ComponentPublicInstance<unknown, any>>;

  beforeEach(() => {
    // Mock de la ruta
    const mockRoute = {
      name: 'MostrarFichaMedica', // Ruta inicial
    };
    
    (useRoute as jest.Mock).mockReturnValue(mockRoute);

    // Mock del enrutador
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    wrapper = mount(SubMenu3, {
      props: {
        idDocumento: '12345',
        VistaFicha: 'MostrarFichaMedica',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  it('should render the correct number of options', () => {
    const options = wrapper.findAll('.option');
    expect(options.length).toBe(3); // Hay 3 opciones en el menú
  });

  it('should display the correct text for each option', async () => {
    const options = wrapper.findAll('.option');
    const texts = ['Ficha Medica', 'Historial', 'Recetar'];
    await wrapper.vm.$nextTick();
    options.forEach((option, index) => {
      expect(option.text()).toContain(texts[index]);
    });
  });

  it('should activate the correct circle when an option is clicked', async () => {
    const options = wrapper.findAll('.option');
    
    // Simula el click en la segunda opción (índice 1)
    await options[1].trigger('click');
    
    // Verifica que el círculo activo sea el de índice 1
    expect(wrapper.vm.activeCircle).toBe(1);
  });

  it('should navigate to the correct route when an option is clicked', async () => {
    const options = wrapper.findAll('.option');
    const router = useRouter();

    // Simula el click en la tercera opción (índice 2)
    await options[2].trigger('click');

    // Verifica que el método `push` haya sido llamado con la ruta correcta
    expect(router.push).toHaveBeenCalledWith({
      name: 'Medicamentos_Recetar',
      params: { idDocumento: '12345' },
    });
  });

  it('should initialize with the correct activeCircle based on the current route', () => {
    // La ruta mockeada es 'MostrarFichaMedica', por lo que el índice activo debería ser 0
    expect(wrapper.vm.activeCircle).toBe(0);
  });

  it('should update the activeCircle based on the route change', async () => {
    // Cambia la ruta mockeada a 'HistorialMedico' y reinicializa el componente
    (useRoute as jest.Mock).mockReturnValue({
      name: 'HistorialMedico',
    });

    wrapper = shallowMount(SubMenu3, {
      props: {
        idDocumento: '12345',
        VistaFicha: 'MostrarFichaMedica',
      },
    });

    // Verifica que el índice activo se actualice
    expect(wrapper.vm.activeCircle).toBe(1); // Historial es el índice 1
  });
});
