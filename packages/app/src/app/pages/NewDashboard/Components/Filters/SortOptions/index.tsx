import React, { FunctionComponent } from 'react';
import { useOvermind } from 'app/overmind';
import { Text, Menu, Stack } from '@codesandbox/components';

const FIELD_TO_NAME = {
  insertedAt: 'Last Created',
  updatedAt: 'Last Modified',
  title: 'Name',
};

export const SortOptions: FunctionComponent = () => {
  const {
    actions: {
      dashboard: { orderByChanged },
    },
    state: {
      dashboard: {
        orderBy: { field, order },
      },
    },
  } = useOvermind();

  const toggleSort = () => {
    orderByChanged({
      field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  const setField = (f: string) => orderByChanged({ field: f, order });

  return (
    <>
      <Menu>
        <Stack align="center">
          <Menu.Button>
            <Text variant="muted">{FIELD_TO_NAME[field]}</Text>
          </Menu.Button>
          <button
            onClick={toggleSort}
            type="button"
            style={{
              cursor: 'pointer',
              padding: 0,
              border: 'none',
              background: 'transparent',
              marginTop: 6,
              transform: `rotate(${order === 'desc' ? 0 : 180}deg)`,
            }}
          >
            <svg width={11} height={13} fill="none" viewBox="0 0 11 13">
              <path
                stroke="#343434"
                strokeWidth={2}
                d="M5.301 0v11m0 0L1.262 7.071M5.301 11L9.34 7.071"
              />
            </svg>
          </button>
        </Stack>
        <Menu.List>
          {Object.keys(FIELD_TO_NAME).map(key => (
            <Menu.Item field="title" key={key} onSelect={() => setField(key)}>
              <Text variant={FIELD_TO_NAME[key] === field ? 'body' : 'muted'}>
                {FIELD_TO_NAME[key]}
              </Text>
            </Menu.Item>
          ))}
        </Menu.List>
      </Menu>
    </>
  );
};
