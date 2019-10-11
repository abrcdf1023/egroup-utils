import React from 'react';

import { withRouter } from 'react-router'
import { storiesOf } from '@storybook/react';
import makeSearchDataList from '@e-group/hooks/makeSearchDataList';

import StoryRouter from 'storybook-react-router';
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import SearchDataList from '@e-group/material-module/SearchDataList';

const useSearchDataList = makeSearchDataList({
  fromKey: "skip",
  sizeKey: "take",
  queryKey: "keyword",
});

const data = [
  {"id":"1","name":"name1"},
  {"id":"2","name":"name2"},
]

storiesOf('makeSearchDataList', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      const Demo = withRouter(({ location, history }) => {
        const [text, setText] = React.useState('')
        const {
          handleSearchChange,
          handleSearchSubmit,
          handleChangePage,
          handleChangeRowsPerPage,
          setFormPayload,
          payload
        } = useSearchDataList({
          fetchGet: React.useCallback((payload) => {
            setText(val => val += 'dispatch action ! <br/>')
          }, []),
          history
        });

        const handleInputChange = (e) => {
          const value = e.target.value
          setFormPayload(val => ({
            ...val,
            input: value
          }))
        }

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
          <React.Fragment>
            <h1 dangerouslySetInnerHTML={{__html: text}} />
            <h1>{location.search}</h1>
            <div>
              {JSON.stringify(payload, null, 4)}
            </div>
            
            <SearchDataList
              onSubmit={handleSearchSubmit}
              title="列表"
              SearchBarProps={{
                placeholder: '搜尋',
                onChange: handleSearchChange,
                defaultValue: payload.query
              }}
              toolsbar={
                <TextField
                  placeholder="customized search value"
                  onChange={handleInputChange}
                  fullWidth
                />
              }
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
          </React.Fragment>
        )
      })

      return (
        <Demo />   
      )
    }
  )