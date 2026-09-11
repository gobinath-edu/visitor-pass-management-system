import { useEffect, useState } from "react";
import { requestService } from "../../services/request.service.js";
import RequestTable from "../../components/requests/RequestTable.jsx";
import ApprovalModal from "../../components/requests/ApprovalModal.jsx";
import RejectionModal from "../../components/requests/RejectionModal.jsx";
import Loader from "../../components/common/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

export default function VisitorRequests() {
  const [requests, setRequests] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [action, setAction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => {
    setError("");
    return requestService
      .list()
      .then((response) => setRequests(response.data.data.items))
      .catch((err) => setError(err.response?.data?.message || "Failed to load requests"));
  };

  useEffect(() => {
    load();
  }, []);

  const closeModal = () => {
    if (!loading) {
      setSelectedRequest(null);
      setAction(null);
    }
  };

  const handleAction = async (remarks) => {
    if (!selectedRequest || !action) return;

    try {
      setLoading(true);
      setError("");

      if (action === "approve") {
        await requestService.approve(selectedRequest._id, remarks);
      } else {
        await requestService.reject(selectedRequest._id, remarks);
      }

      closeModal();
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  if (!requests) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Visitor Requests</h2>
          <p>Review requests assigned to you.</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="card">
        {requests.length ? (
          <RequestTable
            requests={requests}
            onApprove={(request) => {
              setSelectedRequest(request);
              setAction("approve");
            }}
            onReject={(request) => {
              setSelectedRequest(request);
              setAction("reject");
            }}
          />
        ) : (
          <div className="empty-state">
            <strong>No pending requests</strong>
            <span>New visitor requests assigned to you will appear here.</span>
          </div>
        )}
      </div>

      <ApprovalModal
        request={action === "approve" ? selectedRequest : null}
        open={action === "approve" && Boolean(selectedRequest)}
        onClose={closeModal}
        onApprove={handleAction}
        loading={loading}
      />

      <RejectionModal
        request={action === "reject" ? selectedRequest : null}
        open={action === "reject" && Boolean(selectedRequest)}
        onClose={closeModal}
        onReject={handleAction}
        loading={loading}
      />
    </>
  );
}
