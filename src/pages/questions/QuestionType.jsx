import {useLocation, useNavigate} from "react-router-dom";

    export default function QuestionType() {
      const navigate = useNavigate();
      const location = useLocation();
      const extractedType = location.state?.text || "";

      const chooseType = (type) => {
        navigate("/generate", {
          state: { text: extractedType, type },
        });
      };

      return (
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Select Question Type</h1>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => chooseType("mcq")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Multiple Choice Questions
            </button> 
            <button disabled className="w-full bg-gray-300 text-gray-500 p-3 rounded">
            True / False
        </button>

        <button disabled className="w-full bg-gray-300 text-gray-500 p-3 rounded">
           Fill in the Blank
        </button>

        <button disabled className="w-full bg-gray-300 text-gray-500 p-3 rounded">
          Short Answer
        </button>
        </div>
      </div>
      );
    }