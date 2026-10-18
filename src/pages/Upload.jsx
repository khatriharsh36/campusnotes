import { useState } from "react";
import FormInput from "../components/FormInput";
import SelectField from "../components/SelectField";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/Modal";
import { SUBJECTS, RESOURCE_TYPES, SEMESTERS } from "../data/resources";
import {
  validateName, validateEmail, validateTitle,
  validateRequired, validateDescription, validateFile,
} from "../utils/validation";

const INITIAL_FORM = {
  studentName: "", email: "", title: "", subject: "",
  topic: "", type: "", semester: "", description: "", terms: false,
};
const INITIAL_TOUCHED = Object.keys(INITIAL_FORM).reduce((a, k) => ({ ...a, [k]: false }), {});

export default function Upload({ onAddResource, onNavigate }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [file, setFile] = useState(null);
  const [fileTouched, setFileTouched] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successResource, setSuccessResource] = useState(null);

  const errors = {
    studentName: validateName(form.studentName),
    email: validateEmail(form.email),
    title: validateTitle(form.title),
    subject: validateRequired(form.subject, "Subject"),
    topic: validateRequired(form.topic, "Topic"),
    type: validateRequired(form.type, "Resource type"),
    semester: validateRequired(form.semester, "Semester"),
    description: validateDescription(form.description),
    terms: form.terms ? "" : "You must agree to the terms.",
    file: validateFile(file),
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleFileChange = (e) => {
    setFileTouched(true);
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL_TOUCHED).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    setFileTouched(true);
    if (hasErrors) {
      setSubmitError("Please correct the highlighted fields before submitting.");
      return;
    }
    setSubmitError("");
    const newResource = {
      id: Date.now(),
      title: form.title.trim(),
      subject: form.subject,
      topic: form.topic.trim(),
      type: form.type,
      semester: form.semester,
      description: form.description.trim(),
      uploadedBy: form.studentName.trim(),
      uploadedDate: new Date().toISOString().split("T")[0],
      rating: 0,
      views: 0,
      fileName: file.name,
    };
    onAddResource(newResource);
    setSuccessResource(newResource);
    setForm(INITIAL_FORM);
    setTouched(INITIAL_TOUCHED);
    setFile(null);
    setFileTouched(false);
  };

  return (
    <div>
      {/* Dark Banner */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <p className="page-banner-label">⬆️ Contribute</p>
          <h1 className="page-banner-title">Upload Resource</h1>
          <p className="page-banner-subtitle">Share your study materials with fellow students</p>
        </div>
      </div>

      <div className="page">
        <div className="upload-layout">
          {/* Form */}
          <form className="upload-form card" onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h2 className="form-section-title">👤 Your Information</h2>
              <div className="form-row">
                <FormInput
                  label="Student Name" id="studentName" type="text"
                  placeholder="e.g. Aryan Mehta"
                  value={form.studentName}
                  onChange={(e) => set("studentName", e.target.value)}
                  onBlur={() => touch("studentName")}
                  error={errors.studentName} touched={touched.studentName}
                />
                <FormInput
                  label="College Email" id="email" type="email"
                  placeholder="e.g. aryan@college.edu"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("email")}
                  error={errors.email} touched={touched.email}
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">📄 Resource Details</h2>
              <FormInput
                label="Resource Title" id="title" type="text"
                placeholder="e.g. Java Collections Framework Notes"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                onBlur={() => touch("title")}
                error={errors.title} touched={touched.title} maxLength={80}
              />
              <div className="form-row">
                <SelectField
                  label="Subject" id="subject" options={SUBJECTS}
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  onBlur={() => touch("subject")}
                  error={errors.subject} touched={touched.subject}
                />
                <FormInput
                  label="Topic" id="topic" type="text"
                  placeholder="e.g. Object Oriented Programming"
                  value={form.topic}
                  onChange={(e) => set("topic", e.target.value)}
                  onBlur={() => touch("topic")}
                  error={errors.topic} touched={touched.topic}
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Resource Type" id="type" options={RESOURCE_TYPES}
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  onBlur={() => touch("type")}
                  error={errors.type} touched={touched.type}
                />
                <SelectField
                  label="Semester" id="semester" options={SEMESTERS}
                  value={form.semester}
                  onChange={(e) => set("semester", e.target.value)}
                  onBlur={() => touch("semester")}
                  error={errors.semester} touched={touched.semester}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <div className="input-wrapper">
                  <textarea
                    id="description"
                    className={`form-input form-textarea ${touched.description && errors.description ? "input-error" : ""} ${touched.description && !errors.description && form.description ? "input-success" : ""}`}
                    placeholder="Briefly describe what this resource covers..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    onBlur={() => touch("description")}
                    maxLength={300} rows={4}
                  />
                </div>
                <div className="desc-footer">
                  {touched.description && errors.description && (
                    <ErrorMessage message={errors.description} />
                  )}
                  <span className={`char-counter ${form.description.length > 270 ? "counter-warn" : ""}`}>
                    {form.description.length} / 300
                  </span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">📎 File Upload</h2>
              <div className="file-upload-area">
                <label htmlFor="file" className={`file-label ${fileTouched && errors.file ? "file-label-error" : ""}`}>
                  <div className="file-icon-wrap">📎</div>
                  <div className="file-text-wrap">
                    {file ? (
                      <>
                        <span className="file-text-main">{file.name}</span>
                        <span className="file-text-sub">{(file.size / 1024 / 1024).toFixed(2)} MB · PDF</span>
                      </>
                    ) : (
                      <>
                        <span className="file-text-main">Click to select a PDF file</span>
                        <span className="file-text-sub">Only .pdf files · Maximum 5 MB</span>
                      </>
                    )}
                  </div>
                  <input id="file" type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="file-input-hidden" />
                </label>
                {fileTouched && errors.file && <ErrorMessage message={errors.file} />}
                {file && !errors.file && <p className="file-success">✓ PDF selected successfully</p>}
              </div>
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox" checked={form.terms}
                  onChange={(e) => { set("terms", e.target.checked); touch("terms"); }}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  I confirm that this resource is appropriate academic material and I have permission to share it.
                </span>
              </label>
              {touched.terms && errors.terms && <ErrorMessage message={errors.terms} />}
            </div>

            {submitError && (
              <div className="submit-error-banner">⚠️ {submitError}</div>
            )}

            <button type="submit" className="btn btn-primary btn-lg submit-btn">
              ⬆️ Submit Resource
            </button>
          </form>

          {/* Sidebar */}
          <aside className="upload-tips card">
            <h3>📋 Submission Guidelines</h3>
            <ul>
              <li>Only upload your own or freely shareable materials</li>
              <li>PDF format only, max 5 MB</li>
              <li>Use a clear, descriptive title</li>
              <li>Select the correct subject and semester</li>
              <li>Write a helpful description so others know what to expect</li>
            </ul>
            <div className="tips-divider" />
            <h3>✅ Validation Checklist</h3>
            <ul className="checklist">
              {[
                ["Student Name", !errors.studentName && touched.studentName],
                ["Email", !errors.email && touched.email],
                ["Title", !errors.title && touched.title],
                ["Subject", !errors.subject && touched.subject],
                ["Topic", !errors.topic && touched.topic],
                ["Type", !errors.type && touched.type],
                ["Semester", !errors.semester && touched.semester],
                ["Description", !errors.description && touched.description],
                ["PDF File", !errors.file && fileTouched],
                ["Terms", !errors.terms && touched.terms],
              ].map(([label, valid]) => (
                <li key={label} className={valid ? "check-valid" : "check-pending"}>
                  {valid ? "✓" : "○"} {label}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <Modal isOpen={!!successResource} onClose={() => setSuccessResource(null)} size="sm">
        {successResource && (
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>Resource Submitted Successfully!</h2>
            <p className="success-resource-name">"{successResource.title}"</p>
            <p>has been added to CampusNotes.</p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => { setSuccessResource(null); onNavigate("explore"); }}>
                View Resource
              </button>
              <button className="btn btn-outline" onClick={() => setSuccessResource(null)}>
                Upload Another
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
