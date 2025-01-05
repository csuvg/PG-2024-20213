// InputPass.spec.ts
import { mount } from '@vue/test-utils';
import InputPass from '@/components/inputPassword.vue'; // Ajustar la ruta según sea necesario
import { config } from '@vue/test-utils';

describe('InputPass.vue', () => {
  config.global.config.warnHandler = (msg, vm, trace) => {
    // console.warn('Vue warning: ', msg);
  };

  it('renders with the correct placeholder', () => {
    const wrapper = mount(InputPass, {
      props: {
        placeholder: 'Ingrese su contraseña',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Ingrese su contraseña');
  });

  it('binds modelValue correctly and emits update:modelValue', async () => {
    const wrapper = mount(InputPass, {
      props: {
        modelValue: 'password123',
      },
    });

    const input = wrapper.find('input');

    // Verificar que el valor inicial del input sea el correcto
    expect(input.element.value).toBe('password123');

    // Simular cambio de valor
    await input.setValue('newpassword456');

    // Verificar que se haya emitido el evento correcto
    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(['newpassword456']);
  });

  it('toggles the password visibility', async () => {
    const wrapper = mount(InputPass, {
      props: {
        modelValue: 'password123',
      },
    });

    const input = wrapper.find('input');

    // Verificar que el campo inicialmente sea de tipo 'password'
    expect(input.attributes('type')).toBe('password');

    // Simular clic en el icono para cambiar la visibilidad
    await wrapper.find('fa').trigger('click');

    // Verificar que el tipo haya cambiado a 'text'
    expect(input.attributes('type')).toBe('text');

    // Simular otro clic para volver a ocultar la contraseña
    await wrapper.find('fa').trigger('click');

    // Verificar que el tipo vuelva a ser 'password'
    expect(input.attributes('type')).toBe('password');
  });

  it('adjusts container width on window resize', async () => {
    const wrapper = mount(InputPass, {
      props: {
        minWidth: '200px',
        maxWidth: '400px',
      },
    });

    // Simular que la ventana es mayor a 600px
    window.innerWidth = 700;
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('auto');
    expect(wrapper.vm.containerMaxWidth).toBe('400px');

    // Simular que la ventana es menor a 600px
    window.innerWidth = 500;
    await wrapper.vm.updateContainerWidth();
    expect(wrapper.vm.containerMinWidth).toBe('200px');
    expect(wrapper.vm.containerMaxWidth).toBe('100px');
  });

  it('cleans up event listeners on component unmount', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const wrapper = mount(InputPass);
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.updateContainerWidth);
  });
});
