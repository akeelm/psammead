/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import Timestamp from '@bbc/psammead-timestamp';
import MostReadList from './List';
import MostReadTitle from './Title';
import { MostReadLink, MostReadRank } from './Item';
import loadItems from './testHelpers/fixtureData';
import MostRead from './index';

const arabicServiceDecorator = withServicesKnob({
  defaultService: 'arabic',
});

const bengaliServiceDecorator = withServicesKnob({
  defaultService: 'bengali',
});

const burmeseServiceDecorator = withServicesKnob({
  defaultService: 'burmese',
});

const newsServiceDecorator = withServicesKnob({
  defaultService: 'news',
});

const renderList = ({ service, script }, number, type) => (
  <MostReadList
    items={loadItems(number, type)}
    service={service}
    script={script}
    dir={type === 'LTR' ? 'ltr' : 'rtl'}
  />
);

const renderRank = ({ service, script, rank }) => (
  <MostReadRank service={service} script={script}>
    {rank}
  </MostReadRank>
);

const lastUpdated = (script, service) => (
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    script={script}
    padding={false}
    service={service}
  >
    Last updated: 5th November 2016
  </Timestamp>
);

const stories = storiesOf('Components|MostRead/Item', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

[loadItems(1, 'LTR')[0], loadItems(1, 'RTL')[0]].forEach(
  ({ service: itemService, ...props }) => {
    stories.add(`MostReadLink ${itemService}`, ({ script, service }) => (
      <MostReadLink link={props} service={service} script={script} />
    ));
  },
);

stories.add(`MostReadLink with last updated date`, ({ script, service }) => (
  <MostReadLink
    link={loadItems(1, 'LTR')[0]}
    lastUpdated={lastUpdated(script, service)}
    service={service}
    script={script}
  />
));

stories
  .add(`MostReadRank LTR`, ({ script, service }) =>
    renderRank({ service, script, rank: 5 }),
  )
  .add(`MostReadRank LTR double digits`, ({ script, service }) =>
    renderRank({ service, script, rank: 10 }),
  )
  .add(`MostReadRank RTL`, ({ script, service }) =>
    renderRank({ service, script, rank: '۲' }),
  );

storiesOf('Components|MostRead/List/LTR', module)
  .addDecorator(withKnobs)
  .add(`News LTR`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`News LTR 5 items`, () =>
    newsServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  )
  .add(`Bengali LTR`, () =>
    bengaliServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`Bengali LTR 5 items`, () =>
    bengaliServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  )
  .add(`Burmese LTR`, () =>
    burmeseServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'LTR'),
    ),
  )
  .add(`Burmese LTR 5 items`, () =>
    burmeseServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'LTR'),
    ),
  );

storiesOf('Components|MostRead/List/RTL', module)
  .addDecorator(withKnobs)
  .add(`Arabic RTL`, () =>
    arabicServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 10, 'RTL'),
    ),
  )
  .add(`Arabic RTL 5 items`, () =>
    arabicServiceDecorator(({ script, service }) =>
      renderList({ service, script }, 5, 'RTL'),
    ),
  );

storiesOf('Components|MostRead/Title', module)
  .addDecorator(withKnobs)
  .add('LTR', () =>
    newsServiceDecorator(({ script, service }) => (
      <MostReadTitle
        header="Most Read"
        script={script}
        service={service}
        dir="ltr"
      />
    )),
  )
  .add('RTL', () =>
    arabicServiceDecorator(({ script, service }) => (
      <MostReadTitle
        header="الأكثر قراءة"
        script={script}
        service={service}
        dir="rtl"
      />
    )),
  );

storiesOf('Components|MostRead', module)
  .addDecorator(withKnobs)
  .add('default LTR', () =>
    newsServiceDecorator(({ script, service }) => (
      <MostRead
        items={loadItems(10, 'LTR')}
        service={service}
        script={script}
        dir="ltr"
        header="Most Read"
      />
    )),
  )
  .add('default RTL', () =>
    arabicServiceDecorator(({ script, service }) => (
      <MostRead
        items={loadItems(10, 'RTL')}
        service={service}
        script={script}
        dir="rtl"
        header="الأكثر قراءة"
      />
    )),
  );
