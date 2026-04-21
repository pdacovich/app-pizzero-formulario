"use client";

import { useState } from "react";

import type { SurveyResponseRecord } from "@/lib/domain/types";

interface ResponseDetailEditorProps {
  response: SurveyResponseRecord;
}

export function ResponseDetailEditor({ response }: ResponseDetailEditorProps) {
  const [adminNotes, setAdminNotes] = useState(response.admin_notes);
  const [tags, setTags] = useState(response.tags.join(", "));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isSavingTags, setIsSavingTags] = useState(false);

  async function saveNotes() {
    setIsSavingNotes(true);
    setError("");
    setMessage("");

    try {
      const request = await fetch(`/api/admin/responses/${response.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          admin_notes: adminNotes
        })
      });

      if (!request.ok) {
        const payload = (await request.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "No pudimos guardar las notas.");
      }

      setMessage("Notas internas actualizadas.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No pudimos guardar las notas.");
    } finally {
      setIsSavingNotes(false);
    }
  }

  async function saveTags() {
    setIsSavingTags(true);
    setError("");
    setMessage("");

    try {
      const request = await fetch(`/api/admin/responses/${response.id}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tags: tags
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)
        })
      });

      if (!request.ok) {
        const payload = (await request.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "No pudimos guardar los tags.");
      }

      setMessage("Tags actualizados.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No pudimos guardar los tags.");
    } finally {
      setIsSavingTags(false);
    }
  }

  return (
    <div className="detail-panel">
      <h2>Notas internas</h2>

      <div className="field-shell">
        <label htmlFor="admin-notes">Notas</label>
        <textarea
          id="admin-notes"
          className="text-field textarea-field"
          value={adminNotes}
          onChange={(event) => setAdminNotes(event.target.value)}
          rows={7}
        />
      </div>

      <div className="detail-actions">
        <button type="button" className="primary-button" onClick={saveNotes} disabled={isSavingNotes}>
          {isSavingNotes ? "Guardando..." : "Guardar notas"}
        </button>
      </div>

      <div className="field-shell" style={{ marginTop: "1.5rem" }}>
        <label htmlFor="admin-tags">Tags internos</label>
        <input
          id="admin-tags"
          className="text-field"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="Ejemplo: beta-alta, costos, owner"
        />
        <p className="field-hint">Separalos con coma.</p>
      </div>

      <div className="detail-actions">
        <button type="button" className="secondary-button" onClick={saveTags} disabled={isSavingTags}>
          {isSavingTags ? "Guardando..." : "Guardar tags"}
        </button>
      </div>

      {message ? <p className="meta-copy" style={{ marginTop: "1rem" }}>{message}</p> : null}
      {error ? <p className="inline-error">{error}</p> : null}
    </div>
  );
}
