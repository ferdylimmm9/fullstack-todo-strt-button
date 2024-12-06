import Button from "@/components/button";
import CloseButton from "@/components/close-button";
import ModalDialog, { ModalDialogRef } from "@/components/modal-dialog";
import Text from "@/components/text";
import { AuthToken } from "@/repositories/auth-token";
import { useRouter } from "next/router";
import React from "react";

export default function useLogout() {
  const modalRef = React.useRef<ModalDialogRef>(null);
  const { replace } = useRouter();
  const onConfirm = () => {
    AuthToken.remove();
    replace("/sign-in");
    modalRef.current?.close();
  };

  const dialog = (
    <ModalDialog ref={modalRef}>
      {(close) => {
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <Text variant="subheadingMedium">Logout</Text>
              <CloseButton onClick={close} />
            </div>
            <div className="mb-4">
              <Text variant="paragraphNormal">
                Are you sure you want to logout?
              </Text>
            </div>
            <div className="flex justify-end space-x-4">
              <Button className="flex-1" variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button className="flex-1" variant="error" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        );
      }}
    </ModalDialog>
  );

  return {
    dialog,
    modalRef,
  };
}
