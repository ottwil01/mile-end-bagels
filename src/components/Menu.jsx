import MenuData from '../assets/menu.json';
import { useState, useEffect } from 'react';


export default function Menu() {

  const [sandwichState, setSandwichState] = useState([])
  const [bagelState, setBagelState] = useState([])
  const [drinksState, setDrinkState] = useState([])

  // more generic version.
  // setter is the setState for whichever val you are trying to change.
  // set is the current val for that state.
  // item is what you are adding.
  function handleAdd (setter, set, item) {
    if (set.includes(item)) {
      return setter(set)
    }
    return setter([...set, item])
  }

  function handleClear (setter) {
    setter([])
  }

  // non generic simple version (perfectly reasonable)
  function handleAddSandwich(item) {
    if (sandwichState.includes(item)) {
      return setSandwichState(sandwichState)
    }
    return setSandwichState([...sandwichState, item])
  }

  function handleDel(setter, set, item) {
    return setter(set.filter((it) => {
      return it != item
    }))
  }

  return (
    <div>
      <div className="flex flex-row gap-20 m-10 bg-[url(./outline.svg)]">
        <div className="flex flex-col">
          <h1 className="text-3xl ml-7">Sandwiches</h1>
          <div className="relative leading-normal">
            {MenuData.sandwiches.map((item, i) => (
              <div
                key={i}
                className="flex text-lg w-full cursor-pointer"
                onClick={() => sandwichState.includes(item.name) ? handleDel(setSandwichState, sandwichState, item.name) : handleAdd(setSandwichState, sandwichState, item.name)}
              >
                <span className="w-[30px]">{i + 1}</span>
                {sandwichState.includes(item.name) ?
                <span className='mr-5 line-through select-none'>{item.name}</span>
                :
                <span className='mr-5 select-none'>{item.name}</span>}
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <Header text="Bagels" />
            <Items items={MenuData.bagels} />
          </div>
          <div>
            <Header text="Hot Drinks" />
            <Items items={MenuData.hotDrinks} />
          </div>
          <div>
            <Header text="Cold Drinks" />
            <Items items={MenuData.coldDrinks} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header(props) {

  return (
    <h1 className="text-3xl">{props.text}</h1>
  )
}

 function Items(props) {

   const items = props.items

   return (
          <div className="mb-4">
            <div className="relative leading-normal">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex text-lg w-full"

                >
                  <span className="mr-5">{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
   )
 }
