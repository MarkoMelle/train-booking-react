import SelectComponent from "./selectComponent/SelectComponent";
import PropTypes from "prop-types";
import ShowCount from "./showCount/ShowCount";
import "./SortControl.css";

export default function SortControl({
  limit,
  handleLimitChange,
  sort,
  handleSortChange,
  totalCount,
}) {
  const sortOptions = [
    { value: "date", label: "времени" },
    { value: "price_min", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ];

  return (
    <div className="sort-control">
      <p className="sort-control__quantity">Найдено {`${totalCount}`}</p>
      <div className="sort-control__sort-by">
        сортировать по:
        <SelectComponent
          defaultValue={sort}
          handleChange={handleSortChange}
          options={sortOptions}
        />
      </div>
      <ShowCount showCount={limit} setShowCount={handleLimitChange} />
    </div>
  );
}

SortControl.propTypes = {
  limit: PropTypes.number.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};
