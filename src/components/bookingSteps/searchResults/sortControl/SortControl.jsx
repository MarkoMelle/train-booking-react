import { useState } from "react";
import SelectComponent from "./selectComponent/SelectComponent";
import ShowCount from "./showCount/ShowCount";
import "./SortControl.css";

export default function SortControl() {
  const [sortBy, setSortBy] = useState("времени");
  const [showCount, setShowCount] = useState(5);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sort-control">
      <p className="sort-control__quantity">Найдено 20</p>
      <div className="sort-control__sort-by">
        сортировать по:
        <SelectComponent
          defaultValue={sortBy}
          handleChange={handleSortChange}
          options={["времени", "cтоимости", "длительности"]}
        />
      </div>
      <ShowCount showCount={showCount} setShowCount={setShowCount} />
    </div>
  );
}
