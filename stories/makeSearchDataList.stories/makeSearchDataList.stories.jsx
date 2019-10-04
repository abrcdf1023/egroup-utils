import React from 'react';

import { storiesOf } from '@storybook/react';
import makeSearchDataList from '@e-group/hooks/makeSearchDataList';

import ListItem from '@material-ui/core/ListItem'
import SearchDataList from '@e-group/material-module/SearchDataList';

const useSearchDataList = makeSearchDataList('skip', 'take');

const data = [
  {"id":"1","name":"name1"},
  {"id":"2","name":"name2"},
]

storiesOf('makeSearchDataList', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const {
          handleSearchSubmit,
          handleChangePage,
          handleChangeRowsPerPage,
          payload
        } = useSearchDataList({
          fetchGet: React.useCallback(
            payload => {
              console.log(payload)
            },
            []
          ),
        });

        const renderColumns = (rowData, index) => {
          return (
            <ListItem key={index}>
              {rowData[0]}
            </ListItem>
          );
        };
      
        const renderDataRow = el => {
          return (
            <ListItem
              key={el.id}
            >
              {el.name}
            </ListItem>
          );
        };

        return (
          <SearchDataList
            onSubmit={handleSearchSubmit}
            title="列表"
            columns={['名稱']}
            data={data}
            renderColumns={renderColumns}
            renderDataRow={renderDataRow}
            disablePadding
            MuiTablePaginationProps={{
              count: 100,
              labelRowsPerPage: '每頁幾筆',
              page: Math.ceil(payload.skip / payload.take),
              rowsPerPage: parseInt(payload.take),
              onChangePage: handleChangePage,
              onChangeRowsPerPage: handleChangeRowsPerPage
            }}
          />
        )
      }

      return (
        <Demo />   
      )
    }
  )