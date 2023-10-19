import menuData from '../assets/menu.json';
import { useState } from 'react';

export default function Menu() {
  const sandwiches = menuData.menu.find(
    (category) => category.header === 'Sandwiches'
  );
  const otherMenus = menuData.menu.filter(
    (category) => category.header !== 'Sandwiches'
  );
  return (
    <div className="flex flex-row gap-20 m-10">
      <div className="flex flex-col">
        <h1 className="text-3xl ml-7">{sandwiches.header}</h1>
        <div className="relative leading-normal">
          {sandwiches.items.map((item, i) => (
            <div
              key={i}
              className="flex text-lg w-full"
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
            <div className="relative leading-normal">
              {category.items.map((item, i) => (
                <div
                  className="flex text-lg w-full"
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
