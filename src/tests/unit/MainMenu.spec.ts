import { mount } from '@vue/test-utils';
import MainMenu from '@/components/MainMenu.vue';
import { signOut } from "firebase/auth";
import { config } from '@vue/test-utils';

// Mock de Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(() => Promise.resolve())
}));

describe('MainMenu Component', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(MainMenu, {
      global: {
        mocks: {
          $router: {
            push: jest.fn()
          }
        }
      }
    });
  });

  it('debería inicializar con el estado correcto', () => {
    expect(wrapper.vm.showAgenda).toBe(false);
    expect(wrapper.vm.showExpedientes).toBe(false);
    expect(wrapper.vm.showConta).toBe(false);
    expect(wrapper.vm.showVentas).toBe(false);
    expect(wrapper.vm.showConfig).toBe(false);
  });

  it('should render the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ContainerMenu').exists()).toBe(true);
    expect(wrapper.findAll('.pairMenu').length).toBe(5); // Número de menús principales
  });

  it('should toggle expedientes dropdown on click', async () => {
    const expedientesMenu = wrapper.find({ ref: 'expedientesMenu' });
    await expedientesMenu.trigger('click');
    
    expect(wrapper.vm.showExpedientes).toBe(true);
    expect(wrapper.find('.dropdownContent').exists()).toBe(true);
  });

  it('should navigate to correct route when a menu item is clicked', async () => {
    const agendaMenu = wrapper.find({ ref: 'agendaMenu' });
    await agendaMenu.trigger('click');
    
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/agendar');
  });

  it('debería llamar a logOut y cerrar sesión', async () => {
    await wrapper.vm.logOut();
    expect(signOut).toHaveBeenCalled();
  });
});
