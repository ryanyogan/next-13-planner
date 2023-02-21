import clsx from "clsx";

interface InputGroupProps extends React.ComponentPropsWithRef<"input"> {
  className?: string;
}

export function TextInput({ className, ...props }: InputGroupProps) {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
}
