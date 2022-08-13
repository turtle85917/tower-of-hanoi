import toast from "react-hot-toast";

interface P {
  content: string;
  toastId: string;
}

export default function Toast({ content, toastId }: P) {
  return (
    <span>
      {content}
      <button className="close" onClick={() => {
        toast.dismiss(toastId); // close toast
      }} />
    </span>
  );
};