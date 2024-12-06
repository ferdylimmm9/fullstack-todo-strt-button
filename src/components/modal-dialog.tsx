import React from "react";

export type ModalDialogRef = {
  open: () => void;
  close: () => void;
};

export interface ModalDialogProps {
  children: (close: () => void) => React.ReactNode;
}

const ModalDialog = React.forwardRef<ModalDialogRef, ModalDialogProps>(
  (props, ref) => {
    const modalRef = React.useRef<HTMLDialogElement>(null);

    const openModal = () => {
      modalRef.current?.showModal();
    };

    const closeModal = () => {
      modalRef.current?.close();
    };

    React.useImperativeHandle(ref, () => ({
      open: openModal,
      close: closeModal,
    }));

    return (
      <>
        {/* Dialog Modal */}
        <dialog
          ref={modalRef}
          className="rounded-lg shadow-lg p-6 bg-white w-11/12 sm:w-96"
        >
          {props.children(closeModal)}
          {/* <div className="flex justify-between items-center mb-4">
           <Text variant="subheadingMedium">coba</Text>
            <CloseButton onClick={closeModal} />
          </div> */}

          {/* Modal Content */}
          {/* <div className="mb-4">
            <Text variant="paragraphNormal">
              This is a sample dialog box. You can place any content here such
              as forms, text, images, etc.
            </Text>
          </div> */}

          {/* Modal Footer */}
          {/* <div className="flex justify-end space-x-4">
            <Button className="flex-1" variant="secondary">Cancel</Button>
            <Button className="flex-1">Confirm</Button>
          </div> */}
        </dialog>
      </>
    );
  }
);

ModalDialog.displayName = "ModalDialog";

export default ModalDialog;
