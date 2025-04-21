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
}) => {
  const [filled, setFilled] = useState(false);

  const options = values.map((val) => ({ label: val, value: val }));

  return (
    <label className={styles.label}>
      <Controller
        name={nomeCampo}
        control={control}
        rules={rules}
        render={({ field }) => {
          const currentValue = field.value || [];

          const selectedOptions = options.filter((opt) =>
            currentValue.includes(opt.value)
          );

        

          return (
            <CreatableSelect
              isMulti={isMulti}
              classNamePrefix="custom-select"
              className={`${styles.input} ${filled ? styles.filled : ""}`}
              value={selectedOptions}
              onChange={(selectedOptions) => {
                const valuesOnly = selectedOptions.map((opt) => opt.value);
                field.onChange(valuesOnly); // passa só os valores
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
              }}
            />
          );
        }}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      {error && <span className={styles.error}>{error.message}</span>}
    </label>
  );
};

export default SelectLivro;
