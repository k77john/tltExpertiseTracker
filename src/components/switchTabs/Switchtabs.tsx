import { FC, useState } from "react";

interface SwitchtabsProps {
  value: string;
  tabValues: { left: string; right: string };
  onClick: (value: string) => void;
  label: string;
}

const Switchtabs: FC<SwitchtabsProps> = ({ value, tabValues, label }) => {
  const [selectedTab, setSelectedTab] = useState<string>(value || "");

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs">{label}</p>
      <div className="flex items-center p-1 bg-gray-300 rounded-md">
        <button
          className={`py-2 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
            selectedTab === tabValues.left
              ? "bg-white text-black"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => handleTabClick(tabValues.left)}
        >
          {tabValues.left}
        </button>
        <button
          className={`py-2 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
            selectedTab === tabValues.right
              ? "bg-white text-black"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => handleTabClick(tabValues.right)}
        >
          {tabValues.right}
        </button>
      </div>
    </div>
  );
};

export default Switchtabs;
