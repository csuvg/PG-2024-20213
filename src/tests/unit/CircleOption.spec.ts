import { shallowMount } from '@vue/test-utils';
import CircleOption from '@/components/CircleOption.vue';
import FontsCat from '@/components/FontsCat.vue';

describe('CircleOption.vue', () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const modelValue = '1'; // Selected option index

  it('renders pairs of radio options', () => {
    const wrapper = shallowMount(CircleOption, {
      props: {
        options,
        modelValue,
      },
    });

    // Check if radio buttons are rendered correctly
    const radioInputs = wrapper.findAll('input[type="radio"]');
    expect(radioInputs.length).toBe(options.length);

    // Check if labels are associated with each radio input
    const labels = wrapper.findAllComponents(FontsCat);
    labels.forEach((labelWrapper, index) => {
      expect(labelWrapper.props('text')).toBe(options[index]);
    });
  });

  it('checks the correct radio button based on modelValue', async () => {
    const wrapper = shallowMount(CircleOption, {
      props: {
        options,
        modelValue: '2', // Initially set modelValue
      },
    });

    // Find the input with value '2' and check if it's checked
    const secondRadio = wrapper.find('input[id="2"]');
    expect((secondRadio.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits update:modelValue when a radio button is clicked', async () => {
    const wrapper = shallowMount(CircleOption, {
      props: {
        options,
        modelValue,
      },
    });

    // Find a radio input and simulate a change
    const thirdRadio = wrapper.find('input[id="2"]');
    await thirdRadio.setValue(true);

    // Assert that the update:modelValue event is emitted correctly
    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[emittedEvents.length - 1][0]).toBe('2');
  });

  it('updates the selected radio when modelValue changes', async () => {
    const wrapper = shallowMount(CircleOption, {
      props: {
        options,
        modelValue: '1',
      },
    });

    // Initially the second option is selected
    const secondRadio = wrapper.find('input[id="1"]');
    expect((secondRadio.element as HTMLInputElement).checked).toBe(true);

    // Change the modelValue
    await wrapper.setProps({ modelValue: '3' });

    // Now the fourth option should be selected
    const fourthRadio = wrapper.find('input[id="3"]');
    expect((fourthRadio.element as HTMLInputElement).checked).toBe(true);
  });
});
