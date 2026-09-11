import { useEffect, useState } from "react";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import RequestDetails from "./RequestDetails.jsx";

export default function RejectionModal({ request, open, onClose, onReject, loading }) {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (open) setRemarks("");
  }, [open, request?._id]);

  return (
    <Modal
      open={open}
      title="Reject Visitor Request"
      onClose={onClose}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={() => onReject(remarks)}>
            Reject
          </Button>
        </>
      )}
    >
      <RequestDetails request={request} />
      <Input
        label="Remarks"
        value={remarks}
        onChange={(event) => setRemarks(event.target.value)}
        placeholder="Optional remarks"
      />
    </Modal>
  );
}
