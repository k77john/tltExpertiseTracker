import { ChangeEvent, FC, CSSProperties } from "react";

interface InputFieldProps {
  height?: string;
  width?: string;
  type?: "text" | "password" | "email" | "textarea";
  label: string;
  placeholder?: string;
  disabled?: boolean;
  backgroundColor?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField: FC<InputFieldProps> = ({
  height = "2.5rem",
  width = "100%",
  type = "text",
  label = "",
  placeholder = "",
  disabled = false,
  backgroundColor = "white",
  onChange,
}) => {
  const commonStyles: CSSProperties = {
    height,
    backgroundColor,
  };

  return type === "textarea" ? (
    <div className="flex flex-col gap-2" style={{ width }}>
      <p className="text-sm text-black-color">{label}</p>
      <textarea
        style={{ ...commonStyles, resize: "none" }}
        title={label}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className="p-4 rounded border border-light-gray-color w-full text-sm"
      />
    </div>
  ) : (
    <div className="flex flex-col gap-2" style={{ width }}>
      <p className="text-sm text-black-color">{label}</p>
      <input
        className="p-4 rounded border border-light-gray-color w-full text-sm"
        style={commonStyles}
        type={type}
        title={label}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
