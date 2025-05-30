import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import styles from "./index.module.scss";

const SelectLivro = ({
  nomeCampo,
  placeholder,
  values = [],
  control,
  rules,
  error,
  isMulti = true,
  filledStatus = false,
}) => {
  const [filled, setFilled] = useState(filledStatus);

  const options = values.map((val) =>
    typeof val === "string" ? { label: val, value: val } : val
  );

  return (
    <div>
      <label className={styles.label}>
        <Controller
          name={nomeCampo}
          control={control}
          rules={rules}
          render={({ field }) => {
            const currentValue = field.value;

            const selectedOptions = isMulti
              ? options.filter((opt) =>
                  Array.isArray(currentValue)
                    ? currentValue.includes(opt.value)
                    : false
                )
              : options.find((opt) => opt.value === currentValue) || null;

            return (
              <CreatableSelect
                isMulti={isMulti}
                classNamePrefix="custom-select"
                className={`${styles.input} ${filled ? styles.filled : ""}`}
                value={selectedOptions}
                onChange={(selected) => {
                  if (isMulti) {
                    const valuesOnly = selected.map((opt) => opt.value);
                    field.onChange(valuesOnly);
                    setFilled(valuesOnly.length > 0);
                  } else {
                    const valueOnly = selected ? selected.value : null;
                    field.onChange(valueOnly);
                    setFilled(!!valueOnly);
                  }
                }}
                onBlur={field.onBlur}
                options={options}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    minHeight: "40px",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0 8px",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "inherit",
                    margin: 0,
                    padding: 0,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "inherit",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: () => ({
                    display: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    color: "inherit",
                    margin: 0,
                    padding: 0,
                    zIndex: 2,
                  }),
                  menuList: () => ({
                    backgroundColor: "#FFFAF0",
                    color: "#002A3D",
                  }),
                }}
              />
            );
          }}
        />
        <span className={styles.placeholder}>{placeholder}</span>
      </label>
      <p className={styles.error}>{error && error.message}</p>
    </div>
  );
};

export default SelectLivro;