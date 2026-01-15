// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { updateUser } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        
        if (currentUser) {
          setName(currentUser.username || currentUser.name || "");
          setEmail(currentUser.email || "");
        }

        
        const res = await api.get("/api/users/me");
        if (!isMounted) return;

        const freshUser = res.data.user || res.data;
        setName(freshUser.username || freshUser.name || "");
        setEmail(freshUser.email || "");
        dispatch(updateUser(freshUser));
      } catch (err) {
        console.error("Profile load error:", err);
        if (!isMounted) return;
        setError(
          err?.response?.data?.message ||
            "Couldn't load your profile. Showing cached data if available."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [dispatch, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setSaving(true);

      const res = await api.put("/api/users/me", {
        username: name.trim(),
        name: name.trim(),
      });

      const updatedUser = res.data.user || res.data;
      dispatch(updateUser(updatedUser));
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err?.response?.data?.message ||
          "Couldn't update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading && !currentUser) {
    return (
      <main className="page">
        <section className="profile-section">
          <p>Loading your profile…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="profile-section">
        <h1 className="profile-title">Account details</h1>
        <p className="profile-subtitle">
          Update your basic information used across Cartify.
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div className="profile-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} disabled />
            <p className="profile-help">
              Email is used to sign in and can’t be changed.
            </p>
          </div>

          {error && <p className="profile-error">{error}</p>}
          {message && <p className="profile-success">{message}</p>}

          <div className="profile-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
