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
  const [address, setAddress] = useState({
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
});


  
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
       /* setLoading(true);
        setError("");

        
        if (currentUser) {
          setName(currentUser.username || currentUser.name || "");
          setEmail(currentUser.email || "");
        }*/

        
        const res = await api.get("/users/me");
        if (!isMounted) return;

        const freshUser = res.data.user || res.data;
        setName(freshUser.username || "");
        setEmail(freshUser.email || "");
        dispatch(updateUser(freshUser));
        if (freshUser.shippingAddress) {
  setAddress((prev) => ({
    ...prev,
    ...freshUser.shippingAddress,
  }));
}
            dispatch(updateUser(freshUser));
      } catch (err) {
        console.error("Profile load error:", err);
         } finally {
      if (isMounted) setLoading(false);
    }
  };

  loadUser();
  return () => {
    isMounted = false;
  };
}, [dispatch]);

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

      const res = await api.put("/users/me", {
        username: name.trim(),
        name: name.trim(),
        shippingAddress: address,
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
          <h2 className="profile-title mt-8">Shipping Address</h2>

<div className="profile-row">
  <label>Full Name</label>
  <input value={address.fullName}
    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
  />
</div>

<div className="profile-row">
  <label>Phone</label>
  <input value={address.phone}
    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
  />
</div>

<div className="profile-row">
  <label>Address Line 1</label>
  <input value={address.addressLine1}
    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
  />
</div>

<div className="profile-row">
  <label>City</label>
  <input value={address.city}
    onChange={(e) => setAddress({ ...address, city: e.target.value })}
  />
</div>

<div className="profile-row">
  <label>State</label>
  <input value={address.state}
    onChange={(e) => setAddress({ ...address, state: e.target.value })}
  />
</div>

<div className="profile-row">
  <label>Pincode</label>
  <input value={address.postalCode}
    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
  />
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
