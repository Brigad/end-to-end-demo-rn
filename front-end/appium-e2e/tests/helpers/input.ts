import type {Element} from 'webdriverio';

export const setInputValue = async (el: Element<'async'>, value: string) => {
  try {
    await el.clearValue();
    if (platform === 'Android') {
      await el.setValue(value);
    } else {
      const letters = value.split('');
      for (const letter of letters) {
        await el.addValue(letter);
        await new Promise(r => setTimeout(r, 100));
      }
    }
  } catch (e) {
    console.log('SetInputValue Error:', e);
  }
};
