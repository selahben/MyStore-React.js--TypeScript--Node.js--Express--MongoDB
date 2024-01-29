import { useStoreContext } from "../../context/store.context";

type ModalProps = {
  modalTitle: string;
  children: React.ReactNode;
};

export function Modal({ modalTitle, children }: ModalProps) {
  const { modalFormType, setModalFormType, modalFormError } = useStoreContext();

  return (
    <div id="modalOuterFrame">
      <div
        id={
          modalFormType === "quickview"
            ? "modalQuickInnerFrame"
            : "modalInnerFrame"
        }
      >
        <button onClick={() => setModalFormType(null)} id="closeModalBTN">
          <i className="bi bi-x"></i>
        </button>
        <h3>{modalTitle}</h3>
        {children}
        {modalFormError && (
          <p id="modalFormError" className="alert alert-danger">
            {modalFormError}
          </p>
        )}
      </div>
    </div>
  );
}
