import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import theme from './theme';

addParameters({
  options: {
    theme
  },
});
addDecorator(withKnobs)
addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../stories/makeSearchDataList.stories');
  require('../stories/useInfiniteScroll.stories');
  require('../stories/makeUseInfiniteScroll.stories');
  // You can require as many stories as you need.
}

configure(loadStories, module);
