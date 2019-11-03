import React from 'react';

import { storiesOf } from '@storybook/react';
import makeUseInfiniteScroll from '@e-group/hooks/makeUseInfiniteScroll';

const makeData = (number) => {
  const result = []
  for (let i = 0; i < number; i++) {
    const item = {
      id: i,
      name: `name${i}`
    }
    result.push(item)
  }
  return result
}

const data = makeData(10)

const useInfiniteScroll = makeUseInfiniteScroll({
  offset: 500
})

storiesOf('makeUseInfiniteScroll', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const [isLoading, setIsLoading] = React.useState(false)
        const [items, setItems] = React.useState(data)
        const [page, setPage] = useInfiniteScroll({
          isLoading,
          maxPage: 9
        });

        const fetchItem = () => {
          console.log('fetchItem')
          setIsLoading(true)
          setTimeout(() => {
            const item = {
              id: new Date().getTime(),
              name: `name${new Date().getTime()}`
            }
            setItems(val => [...val, item])
            setIsLoading(false)
          }, 500)
        }

        const resetPage = () => {
          setItems(data)
          setPage(0)
        }

        React.useEffect(() => {
          fetchItem()
        }, [page])
        
        return (
          <div style={{
            height: '100vh'
          }}>
            {
              items.map(el => (
                <div
                  key={el.id}
                  style={{
                    height: '10vh'
                  }}
                >{el.name}</div>
              ))
            }
            {isLoading && 'Loading...'}
            <br />
            <button onClick={resetPage}>reset page</button>
          </div>
        )
      }

      return (
        <Demo />
      )
    }
  )
  .add(
    'withDifferentTarget',
    () => {
      const Demo = () => {
        const boxEl = React.useRef()
        const [isLoading, setIsLoading] = React.useState(false)
        const [items, setItems] = React.useState(data)
        const [page, setPage] = useInfiniteScroll({
          target: boxEl.current,
          scrollHeight: boxEl.current && boxEl.current.scrollHeight,
          isLoading,
          maxPage: 10
        });

        const fetchItem = () => {
          setIsLoading(true)
          setTimeout(() => {
            const item = {
              id: new Date().getTime(),
              name: `name${new Date().getTime()}`
            }
            setItems(val => [...val, item])
            setIsLoading(false)
          }, 500)
        }

        const resetPage = () => {
          setItems(data)
          setPage(0)
        }

        React.useEffect(() => {
          fetchItem()
        }, [page])
        
        return (
          <div
            ref={boxEl}
            style={{
              height: '200px',
              overflowY: 'scroll'
            }}
          >
            {
              items.map(el => (
                <div
                  key={el.id}
                  style={{
                    height: '10vh'
                  }}
                >{el.name}</div>
              ))
            }
            {isLoading && 'Loading...'}
            <br />
            <button onClick={resetPage}>reset page</button>
          </div>
        )
      }

      return (
        <Demo />
      )
    }
  )