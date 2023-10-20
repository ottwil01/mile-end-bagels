import menuData from '../assets/menu.json';
import { useState, useEffect } from 'react';


export default function Menu() {
  const sandwiches = menuData.menu.find(
    (category) => category.header === 'Sandwiches'
  );
  const otherMenus = menuData.menu.filter(
    (category) => category.header !== 'Sandwiches'
  );

  const allItems = [];

// Iterate through the menu sections
menuData.menu.forEach(menuSection => {
  // Iterate through the items in each section
  menuSection.items.forEach(item => {
    // Add the item to the allItems array
    allItems.push(item);
  });
});
  console.log(allItems)

// sandwiches toggle
  const [strikethroughStatus, setStrikethroughStatus] = useState(
    sandwiches.items.map(() => false)
  );

  // Load the strike-through status from local storage when the component mounts
  useEffect(() => {
    const storedStatus = localStorage.getItem('strikethroughStatus');
    if (storedStatus) {
      setStrikethroughStatus(JSON.parse(storedStatus));
    }
  }, []);

  const toggleStrikethrough = (index) => {
    const updatedStatus = [...strikethroughStatus];
    updatedStatus[index] = !updatedStatus[index];
    setStrikethroughStatus(updatedStatus);
    // Save the updated status to local storage
    localStorage.setItem('strikethroughStatus', JSON.stringify(updatedStatus));
  };

  const resetStrikethrough = () => {
    setStrikethroughStatus(sandwiches.items.map(() => false));
    // Reset the status in local storage
    localStorage.removeItem('strikethroughStatus');
  };
// othermenus toggle
  // const [otherStatus, setOtherStatus] = useState(otherMenus.items.map(() => false))

  //   useEffect(() => {
  //   const storedStatus = localStorage.getItem('otherStatus')
  //   if (storedStatus) {
  //     setOtherStatus(JSON.parse(storedStatus))
  //   }
  // }, []);

  // const toggleOtherstrikethrough = (index) => {
  //   const updatedStatus = [...otherStatus]
  //   updatedStatus[index] = !updatedStatus[index]
  //   setOtherStatus(updatedStatus)
  //   localStorage.setItem('otherStatus', JSON.stringify(updatedStatus))
  // }

  // const resetOther = () => {
  //   setOtherStatus(otherMenus.items.map(() => false))
  //   localStorage.removeItem('otherStatus')
  // }


  return (
    <div className="flex flex-row gap-20 m-10">
      <div className="flex flex-col">
        <h1 className="text-3xl ml-7">{sandwiches.header}</h1>
        <button onClick={resetStrikethrough}>Reset</button>
        <div className="relative leading-normal">
          {sandwiches.items.map((item, i) => (
            <div
              key={i}
              className={`flex text-lg w-full ${strikethroughStatus[i] ? 'line-through' : ''}`}
              onClick={() => toggleStrikethrough(i)}
            >
              <span className="w-[30px]">{i + 1}</span>
              <span className="mr-5">{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {otherMenus.map((category, i) => (
          <div key={i}>
            <h1 className="text-3xl">{category.header}</h1>
            {/* <button onClick={resetOther}>Reset</button> */}
            <div className="relative leading-normal">
              {category.items.map((item, i) => (
                <div
                  key={i}
                  className="flex text-lg w-full"
                  /* onClick={() => toggleOtherstrikethrough(i)} */
                >
                  <span className="mr-5">{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
