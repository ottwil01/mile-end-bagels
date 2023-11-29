import MenuData from '../assets/menu.json';
import { useState, useEffect } from 'react';


export default function Menu() {

  // Initialize strike-through status for all items
  const initialStrikethroughStatus = Object.keys(MenuData).reduce((acc, category) => {
    acc[category] = MenuData[category].map(() => false);
    return acc;
  }, {});

  // State for strike-through status
  const [strikethroughStatus, setStrikethroughStatus] = useState(initialStrikethroughStatus);

  // Load the strike-through status from local storage when the component mounts
  useEffect(() => {
    const storedStrikethroughStatus = localStorage.getItem('strikethroughStatus');
    if (storedStrikethroughStatus) {
      setStrikethroughStatus(JSON.parse(storedStrikethroughStatus));
    }
  }, []);

  const toggleStrikethrough = (category, index) => {
    const updatedStatus = { ...strikethroughStatus };
    updatedStatus[category][index] = !updatedStatus[category][index];
    setStrikethroughStatus(updatedStatus);
    // Save the updated status to local storage
    localStorage.setItem('strikethroughStatus', JSON.stringify(updatedStatus));
  };

  const resetStrikethrough = (category) => {
    const updatedStatus = { ...strikethroughStatus };
    updatedStatus[category] = updatedStatus[category].map(() => false);
    setStrikethroughStatus(updatedStatus);
    // Reset the status in local storage
    localStorage.removeItem('strikethroughStatus');
  };

  return (
    <div>
      <div className="flex flex-row gap-20 m-10 bg-[url(./outline.svg)]">
        <div className="flex flex-col">
          <h1 className="text-3xl ml-7">Sandwiches</h1>
          {/* <button onClick={() => resetStrikethrough('sandwiches')}>Reset</button> */}
          <div className="relative leading-normal">
            {MenuData.sandwiches.map((item, i) => (
              <div
                key={i}
                className="flex text-lg w-full"
              /* onClick={() => toggleStrikethrough('sandwiches', i)} */
              >
                <span className="w-[30px]">{i + 1}</span>
                <span className="mr-5">{item.name}</span>
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
            {/* <button onClick={() => resetStrikethrough('otherMenus', i)}>Reset</button> */}
            <div className="relative leading-normal">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex text-lg w-full"
                  /* className={`flex text-lg w-full ${otherMenuStrikethroughStatus[i][j] ? 'line-through' : ''}`} */
                  /* onClick={() => toggleStrikethrough('otherMenus', j)} */
                >
                  <span className="mr-5">{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
   )
 }
