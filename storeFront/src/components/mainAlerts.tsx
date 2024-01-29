type MainAlertsProps = {
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
};

export function MainAlerts({ alert, setAlert }: MainAlertsProps) {
  return (
    <div id="myAlert">
      <span
        id="closeBTN"
        onClick={() => {
          setAlert("");
        }}
      >
        &times;
      </span>
      <span id="alertText">{alert}</span>
    </div>
  );
}
