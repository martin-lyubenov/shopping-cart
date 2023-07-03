import classes from "./SizesFilter.module.css";

const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

function CheckboxInput({ value, onChangeHandler }) {
  return (
    <div className={classes["filter-holder"]}>
      <label className={classes.label}>
        <input onChange={onChangeHandler} type="checkbox" value={value} />
        <span className={classes.checkmark}>{value}</span>
      </label>
    </div>
  );
}

function SizesFilter({ onSizeFilterCheck }) {
  function onCheck(event) {
    const sizeFilterCriteria = {
      checked: event.target.checked,
      value: event.target.value,
    };

    onSizeFilterCheck(sizeFilterCriteria);
  }

  return (
    <section>
      <h3>Sizes</h3>
      <div className={classes.filter}>
        {sizes.map((size) => (
          <CheckboxInput key={size} value={size} onChangeHandler={onCheck} />
        ))}
      </div>
    </section>
  );
}

export default SizesFilter;
