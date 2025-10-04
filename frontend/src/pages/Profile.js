import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone } from 'lucide-react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile: {
      phone: '',
      address: '',
      city: '',
      postal_code: '',
      country: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        profile: {
          phone: user.profile?.phone || '',
          address: user.profile?.address || '',
          city: user.profile?.city || '',
          postal_code: user.profile?.postal_code || '',
          country: user.profile?.country || '',
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.patch('/users/profile/', formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <User size={64} />
            </div>
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
          </div>

          <div className="profile-content">
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="label">
                    <Phone size={16} />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="profile.phone"
                    value={formData.profile.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <MapPin size={20} />
                  Address Information
                </h3>
                
                <div className="form-group">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    name="profile.address"
                    value={formData.profile.address}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">City</label>
                    <input
                      type="text"
                      name="profile.city"
                      value={formData.profile.city}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Postal Code</label>
                    <input
                      type="text"
                      name="profile.postal_code"
                      value={formData.profile.postal_code}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Country</label>
                  <input
                    type="text"
                    name="profile.country"
                    value={formData.profile.country}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
