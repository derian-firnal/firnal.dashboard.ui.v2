// pages/feedback/FeedbackFormPage.tsx
import { useParams } from "react-router-dom";

const formUrls: Record<string, string> = {
  question: "https://docs.google.com/forms/d/e/1FAIpQLSfCpn9le1qYY5bDxdeI79hQ0pH56rJNyhKIfLYlnTpQbkcJ3A/viewform?embedded=true",
  bug: "https://docs.google.com/forms/d/e/1FAIpQLSdKm_7v1Xj-VnQTX40kjW5okNTf7Ql-SUROk6rK_pgkscVjNA/viewform?embedded=true",
  recommendations: "https://docs.google.com/forms/d/e/1FAIpQLSeYe07Ri8HS5WQpaTk-KGoXoZAosS0bvUh7IZ1IyJJ_5QJ3sQ/viewform?embedded=true",
};

export default function FeedbackFormPage() {
  const { formType } = useParams();
  const url = formUrls[formType ?? ""];

  if (!url) {
    return <div className="p-6 text-red-500 font-semibold">Invalid feedback form</div>;
  }

  return (
    <div className="w-full h-full p-6">
      <iframe
        src={url}
        width="100%"
        height="800"
        frameBorder="0"
        className="border rounded-md shadow-md"
        title="Feedback Form"
      >
        Loading…
      </iframe>
    </div>
  );
}
