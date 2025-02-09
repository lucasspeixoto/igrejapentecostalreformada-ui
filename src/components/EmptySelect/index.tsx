interface LoadingSelectProps {
  text: string;
}
const LoadingSelect = ({ text }: LoadingSelectProps) => {
  return (
    <div className="w-auto">
      <select
        className="relative z-20 w-full animate-pulse cursor-not-allowed appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        value={text}>
        <option disabled>{text}</option>
      </select>
    </div>
  );
};

export default LoadingSelect;
