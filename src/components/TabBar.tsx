'use client'
import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props{
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({currentTab = 1, tabOptions = [1,2,3,4,5]}: Props) => {

  const [selected, setSelected] = useState(currentTab)

  const onSelectedTab = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
  }

  return (
    <div className={`
      grid w-full space-x-2 rounded-xl bg-gray-200 p-2 
      ${'grid-cols-'+tabOptions.length }
    `}>
      {
        tabOptions.map( tab => (
        <div key={tab}>
          <input 
            checked={selected === tab} 
            onChange={()=>{}}
            id={ tab.toString() } 
            type="radio" 
            className="peer hidden" 
          />
          <label onClick={()=>onSelectedTab( tab )} className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              { tab }
          </label>
        </div>
      ))}
    </div>
  )
}