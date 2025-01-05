import { shallowMount } from '@vue/test-utils';
import CheckBox from '@/components/CheckBox.vue';

describe('CheckBox.vue', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  it('renders checkbox options correctly', () => {
    const wrapper = shallowMount(CheckBox, {
      props: {
        options,
        modelValue: [],
      },
    });

    // Check that the number of checkboxes matches the number of options
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(options.length);

    // Check that each checkbox has the correct value
    checkboxes.forEach((checkbox, index) => {
      expect((checkbox.element as HTMLInputElement).value).toBe(options[index]);
    });
  });

  it('updates selectedOptions when modelValue changes', async () => {
    const wrapper = shallowMount(CheckBox, {
      props: {
        options,
        modelValue: ['Option 1'],
      },
    });
  
    // Verify that 'Option 1' checkbox is checked
    const firstCheckbox = wrapper.find('input[value="Option 1"]');
    expect((firstCheckbox.element as HTMLInputElement).checked).toBe(true);
  
    // Change the value of modelValue
    await wrapper.setProps({ modelValue: ['Option 2'] });
  
    // Check that 'Option 1' is unchecked and 'Option 2' is checked
    expect((firstCheckbox.element as HTMLInputElement).checked).toBe(false);
    const secondCheckbox = wrapper.find('input[value="Option 2"]');
    expect((secondCheckbox.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits update:modelValue when a checkbox is changed', async () => {
    const wrapper = shallowMount(CheckBox, {
      props: {
        options,
        modelValue: [],
      },
    });

    // Find the checkbox for 'Option 1' and select it
    const firstCheckbox = wrapper.find('input[value="Option 1"]');
    await firstCheckbox.setValue(true); // Simulating checkbox check

    // Verify that the event is emitted with the new value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents?.[emittedEvents.length - 1][0]).toEqual([
      'Option 1'
    ]); // Should contain the selected option

    // Select 'Option 2'
    const secondCheckbox = wrapper.find('input[value="Option 2"]');
    await secondCheckbox.setValue(true); // Simulating checkbox check

    // Check that the event is emitted again with the new value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const updatedEmittedEvents = wrapper.emitted('update:modelValue');
    expect(updatedEmittedEvents?.[updatedEmittedEvents.length - 1][0]).toEqual([
      'Option 1', 
      'Option 2'
    ]); // Should contain both options
  });
});
