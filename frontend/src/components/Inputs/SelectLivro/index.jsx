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

            const filled = isMulti
              ? Array.isArray(currentValue) && currentValue.length > 0
              : !!currentValue;

            const allValues = isMulti
              ? Array.isArray(currentValue)
                ? currentValue
                : []
              : currentValue
              ? [currentValue]
              : [];

            const extraOptions = allValues
              .filter((val) => !options.some((opt) => opt.value === val))
              .map((val) => ({ label: val, value: val }));

            const finalOptions = [...options, ...extraOptions];

            const selectedOptions = isMulti
              ? finalOptions.filter((opt) =>
                  Array.isArray(currentValue)
                    ? currentValue.includes(opt.value)
                    : false
                )
              : finalOptions.find((opt) => opt.value === currentValue) || null;

            return (
              <>
                <div style={{ position: "relative" }}>
                  <CreatableSelect
                    isMulti={isMulti}
                    classNamePrefix="custom-select"
                    className={`${styles.input} ${filled ? styles.filled : ""}`}
                    value={selectedOptions}
                    onChange={(selected) => {
                      if (isMulti) {
                        const valuesOnly = selected
                          ? selected.map((opt) => opt.value)
                          : [];
                        field.onChange(valuesOnly);
                      } else {
                        const valueOnly = selected ? selected.value : null;
                        field.onChange(valueOnly);
                      }
                    }}
                    onBlur={field.onBlur}
                    options={finalOptions}
                    placeholder={null} // placeholder nativo desabilitado, vamos usar o manual
                    styles={{
                      container: (base) => ({
                        ...base,
                        width: "100%",
                      }),
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                          ? "#002A3D"
                          : filled
                          ? "#002A3D"
                          : "#FFC09E",
                        border: state.isFocused
                          ? "2px solid #FFFAF0"
                          : "1px solid #40606F", // cor padrão da borda quando não está focado
                        boxShadow: "none", // Tira qualquer sombra que o react-select coloca
                        minHeight: "40px",
                        cursor: "pointer",
                        width: "100%",
                        paddingInline: "10px",
                        color: "#FFFAF0",
                        borderRadius: "12px",

                        ":hover": {
                          border: state.isFocused
                            ? "2px solid #FFFAF0"
                            : "1px solid #40606F", // Mantém a borda igual mesmo quando hover
                          boxShadow: "none",
                        },

                        ":focus": {
                          border: "2px solid #FFFAF0", // Controle extra para focus
                          boxShadow: "none",
                        },
                      }),

                      valueContainer: (base) => ({
                        ...base,
                        maxHeight: "40px",
                        overflowX: "auto",
                        overflowY: "hidden",
                        whiteSpace: "nowrap",
                        display: "flex",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        paddingRight: "10px",
                      }),
                      input: (base) => ({
                        ...base,
                        color: "#FFFAF0",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#FFFAF0",
                        fontWeight: "bold",
                      }),
                      multiValue: (base) => ({
                        ...base,
                        flexShrink: 0,
                        marginRight: "4px",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#002A3D",
                        fontWeight: "bold",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "#002A3D",
                        ":hover": {
                          backgroundColor: "#DDC1A7",
                          color: "#002A3D",
                        },
                      }),
                      placeholder: (base) => ({
                        ...base,
                        display: "none",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#FFFAF0",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      menu: (base) => ({
                        ...base,
                        width: "100%",
                        left: 0,
                        right: 0,
                        margin: "8px 0 0 0",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#002A3D",
                        color: "#FFFAF0",
                        zIndex: 1000,
                        position: "absolute",
                      }),
                      menuList: (base) => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }),
                      option: (base, state) => ({
                        ...base,
                        padding: "12px 16px",
                        backgroundColor: state.isSelected
                          ? "#FFC09E"
                          : state.isFocused
                          ? "#40606F"
                          : "transparent",
                        color: state.isSelected
                          ? "#002A3D"
                          : state.isFocused
                          ? "#FFFAF0"
                          : "#FFFAF0",
                        cursor: "pointer",
                        fontWeight: state.isSelected ? "bold" : "normal",
                        transition:
                          "background-color 0.2s ease, color 0.2s ease",
                      }),
                    }}
                  />
                  {!filled && (
                    <span className={styles.placeholder}>{placeholder}</span>
                  )}
                </div>
              </>
            );
          }}
        />
      </label>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default SelectLivro;
