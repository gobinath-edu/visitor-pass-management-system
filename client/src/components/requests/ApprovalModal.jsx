import { useState } from "react";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import RequestDetails from "./RequestDetails.jsx";
export default function ApprovalModal({ request, open, onClose, onApprove, loading }) { const [remarks,setRemarks]=useState(""); return <Modal open={open} title="Approve Visitor Request" onClose={onClose} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button loading={loading} onClick={()=>onApprove(remarks)}>Approve</Button></>}><RequestDetails request={request}/><Input label="Remarks" value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="Optional remarks"/></Modal>; }
