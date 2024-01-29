import { FieldHookConfig, useField } from "formik";
import { LegacyRef } from "react";

type FileInputProps = {
  fileRef: LegacyRef<HTMLInputElement>;
  props: string | FieldHookConfig<string>;
};

export function FileInput({ fileRef, props }: FileInputProps) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor="files">Choose files</label>
      <input ref={fileRef} multiple={true} type="file" {...field} />
      {meta.touched && meta.error ? (
        <span className="invalid-feedback">{meta.error}</span>
      ) : null}
    </div>
  );
}
