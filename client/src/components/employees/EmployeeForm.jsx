import { useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
const initial = { name:"", email:"", password:"", employeeCode:"", department:"", phone:"" };
export default function EmployeeForm({ onSubmit, loading=false }) {
  const [form,setForm]=useState(initial);
  const update=(field,value)=>setForm(prev=>({...prev,[field]:value}));
  async function submit(e){e.preventDefault(); const ok=await onSubmit(form); if(ok)setForm(initial);}
  return <form className="card form-grid" onSubmit={submit}><Input required label="Name" value={form.name} onChange={e=>update("name",e.target.value)}/><Input required type="email" label="Email" value={form.email} onChange={e=>update("email",e.target.value)}/><Input required type="password" label="Password" value={form.password} onChange={e=>update("password",e.target.value)}/><Input required label="Employee code" value={form.employeeCode} onChange={e=>update("employeeCode",e.target.value)}/><Input required label="Department" value={form.department} onChange={e=>update("department",e.target.value)}/><Input label="Phone" value={form.phone} onChange={e=>update("phone",e.target.value)}/><div className="form-actions full"><Button type="submit" loading={loading}>Add Employee</Button></div></form>;
}