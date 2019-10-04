import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs)
addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../stories/makeSearchDataList.stories');
  // You can require as many stories as you need.
}

configure(loadStories, module);
