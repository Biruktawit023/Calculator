const { useState, useEffect } = React;

function Calculator() {
  const [currentOperand, setCurrentOperand] = useState("0");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState(null);
  const [memory, setMemory] = useState(0);
  const [overwrite, setOverwrite] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        appendNumber(e.key);
      } else if (e.key === ".") {
        appendNumber(".");
      } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/"
      ) {
        chooseOperation(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        compute();
      } else if (e.key === "Escape") {
        clear();
      } else if (e.key === "Backspace") {
        deleteNumber();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentOperand, previousOperand, operation]);

  const appendNumber = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    if (overwrite) {
      setCurrentOperand(number);
      setOverwrite(false);
    } else {
      setCurrentOperand(
        currentOperand === "0" ? number : currentOperand + number,
      );
    }
  };

  const chooseOperation = (op) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setOverwrite(true);
  };

  const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    setCurrentOperand(computation.toString());
    setOperation(null);
    setPreviousOperand("");
    setOverwrite(true);
  };

  const clear = () => {
    setCurrentOperand("0");
    setPreviousOperand("");
    setOperation(null);
    setOverwrite(false);
  };

  const deleteNumber = () => {
    if (currentOperand.length === 1) {
      setCurrentOperand("0");
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const toggleSign = () => {
    if (currentOperand === "0") return;
    setCurrentOperand((parseFloat(currentOperand) * -1).toString());
  };

  const percentage = () => {
    setCurrentOperand((parseFloat(currentOperand) / 100).toString());
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryRecall = () => {
    setCurrentOperand(memory.toString());
    setOverwrite(true);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(currentOperand));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(currentOperand));
  };

  const memoryStore = () => {
    setMemory(parseFloat(currentOperand));
  };

  const formatDisplay = (value) => {
    if (value === "") return "";
    const number = parseFloat(value);
    if (isNaN(number)) return value;
    return number.toLocaleString("en-US", { maximumFractionDigits: 10 });
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="memory-indicator">{memory !== 0 ? "M" : ""}</div>
        <div className="previous-operand">
          {formatDisplay(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatDisplay(currentOperand)}</div>
      </div>
      <div className="buttons">
        <button className="btn-memory" onClick={memoryClear}>
          MC
        </button>
        <button className="btn-memory" onClick={memoryRecall}>
          MR
        </button>
        <button className="btn-memory" onClick={memoryAdd}>
          M+
        </button>
        <button className="btn-memory" onClick={memorySubtract}>
          M-
        </button>

        <button className="btn-function" onClick={clear}>
          AC
        </button>
        <button className="btn-function" onClick={toggleSign}>
          +/-
        </button>
        <button className="btn-function" onClick={percentage}>
          %
        </button>
        <button className="btn-operator" onClick={() => chooseOperation("/")}>
          ÷
        </button>

        <button className="btn-number" onClick={() => appendNumber("7")}>
          7
        </button>
        <button className="btn-number" onClick={() => appendNumber("8")}>
          8
        </button>
        <button className="btn-number" onClick={() => appendNumber("9")}>
          9
        </button>
        <button className="btn-operator" onClick={() => chooseOperation("*")}>
          ×
        </button>

        <button className="btn-number" onClick={() => appendNumber("4")}>
          4
        </button>
        <button className="btn-number" onClick={() => appendNumber("5")}>
          5
        </button>
        <button className="btn-number" onClick={() => appendNumber("6")}>
          6
        </button>
        <button className="btn-operator" onClick={() => chooseOperation("-")}>
          -
        </button>

        <button className="btn-number" onClick={() => appendNumber("1")}>
          1
        </button>
        <button className="btn-number" onClick={() => appendNumber("2")}>
          2
        </button>
        <button className="btn-number" onClick={() => appendNumber("3")}>
          3
        </button>
        <button className="btn-operator" onClick={() => chooseOperation("+")}>
          +
        </button>

        <button
          className="btn-number span-two"
          onClick={() => appendNumber("0")}
        >
          0
        </button>
        <button className="btn-number" onClick={() => appendNumber(".")}>
          .
        </button>
        <button className="btn-equals" onClick={compute}>
          =
        </button>

        <button className="btn-function span-two" onClick={deleteNumber}>
          DEL
        </button>
        <button className="btn-memory span-two" onClick={memoryStore}>
          MS
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
