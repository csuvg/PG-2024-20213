import { shallowMount } from '@vue/test-utils';
import AlfabetoList from '@/components/AlfabetoList.vue';
import FontsCat from '@/components/FontsCat.vue';

describe('Alphabet.vue', () => {
  it('renders all letters of the alphabet', () => {
    // Act: Mount the component
    const wrapper = shallowMount(AlfabetoList);

    // Assert: Check if all 26 letters are rendered using FontsCat
    const fontsCatComponents = wrapper.findAllComponents(FontsCat);
    expect(fontsCatComponents.length).toBe(26); // Ensure that there are 26 letters

    // Assert: Check if the letters are correct
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    fontsCatComponents.forEach((fontsCatWrapper, index) => {
      expect(fontsCatWrapper.props('text')).toBe(alphabet[index]); // Ensure the correct letter is passed
    });
  });

  it('emits textClicked event when a letter is clicked', async () => {
    // Act: Mount the component
    const wrapper = shallowMount(AlfabetoList);

    // Find the first FontsCat component (for letter "A")
    const firstLetter = wrapper.findComponent(FontsCat);

    // Simulate a click event on the first letter
    await firstLetter.trigger('click');

    // Assert: Check if the textClicked event is emitted with the correct letter "A"
    const emittedEvents = wrapper.emitted('textClicked');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(['A']);
  });
});

