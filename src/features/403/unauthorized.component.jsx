import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div id="app">
      <div>403</div>
      <div class="txt">
        Unauthorized<span class="blink">_</span>
      </div>
      <Button variant="danger" className="my-4" onClick={() => navigate("/")}>
        Back{" "}
      </Button>
    </div>
  );
};
