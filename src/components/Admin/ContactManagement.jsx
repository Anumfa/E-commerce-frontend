import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Mail, Phone, User, Calendar, MessageSquare, CheckCircle, XCircle, Clock, Trash2, ExternalLink } from 'lucide-react';
import { fetchContacts, setMeeting, deleteContact } from '../../redux/slices/contactSlice';
import './AdminStyles.css';

const ContactManagement = () => {
  const dispatch = useDispatch();
  const { items: contacts, loading } = useSelector((state) => state.contact);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedContact, setExpandedContact] = useState(null);
  const [meetingModal, setMeetingModal] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpandedContact(expandedContact === id ? null : id);
  };

  const handleSetMeeting = (contact) => {
    setMeetingModal({
      id: contact._id,
      name: contact.name,
      meetingDate: '',
      meetingNotes: ''
    });
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    if (!meetingModal.meetingDate) {
      alert('Please select a meeting date and time');
      return;
    }
    try {
      await dispatch(setMeeting({
        id: meetingModal.id,
        meetingData: {
          meetingDate: meetingModal.meetingDate,
          meetingNotes: meetingModal.meetingNotes
        }
      })).unwrap();
      alert('Meeting scheduled successfully!');
      setMeetingModal(null);
    } catch (error) {
      alert('Error scheduling meeting: ' + (typeof error === 'string' ? error : error.message || 'Unknown error'));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      dispatch(deleteContact(id));
    }
  };

  const getMeetingStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <span className="status-badge pending"><Clock size={14} /> Scheduled</span>;
      case 'completed':
        return <span className="status-badge approved"><CheckCircle size={14} /> Completed</span>;
      case 'cancelled':
        return <span className="status-badge declined"><XCircle size={14} /> Cancelled</span>;
      default:
        return <span className="status-badge" style={{ background: '#e5e7eb', color: '#6b7280' }}>No Meeting</span>;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contact-management">
      <div className="management-header">
        <h2 className="section-title">Contact Submissions</h2>
      </div>

      {/* Filter bar */}
      <div className="top-filter-bar">
        <div className="filter-item search-item">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name, email, subject or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="order-count">{filteredContacts.length} submissions</span>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading contacts...</div>
      ) : filteredContacts.length === 0 ? (
        <div className="empty-state">
          <MessageSquare size={48} />
          <h3>No contact submissions</h3>
          <p>{searchQuery ? 'Try a different search term.' : 'No one has submitted the contact form yet.'}</p>
        </div>
      ) : (
        <div className="contact-list">
          {filteredContacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <div className="contact-card-header" onClick={() => toggleExpand(contact._id)}>
                <div className="contact-user-info">
                  <div className="contact-avatar">
                    {contact.name ? contact.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="contact-info-text">
                    <h4 className="contact-name">{contact.name}</h4>
                    <span className="contact-email">
                      <Mail size={12} /> {contact.email}
                    </span>
                    {contact.subject && (
                      <span className="contact-subject-preview">{contact.subject}</span>
                    )}
                  </div>
                </div>
                <div className="contact-card-meta">
                  <div className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'short', day: 'numeric', 
                      hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                  {getMeetingStatusBadge(contact.meetingStatus)}
                </div>
              </div>

              {expandedContact === contact._id && (
                <div className="contact-card-body">
                  <div className="contact-detail-row">
                    <span className="contact-detail-label"><User size={14} /> Name:</span>
                    <span>{contact.name}</span>
                  </div>
                  <div className="contact-detail-row">
                    <span className="contact-detail-label"><Mail size={14} /> Email:</span>
                    <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
                  </div>
                  {contact.subject && (
                    <div className="contact-detail-row">
                      <span className="contact-detail-label"><MessageSquare size={14} /> Subject:</span>
                      <span>{contact.subject}</span>
                    </div>
                  )}
                  <div className="contact-detail-row message-row">
                    <span className="contact-detail-label"><MessageSquare size={14} /> Message:</span>
                    <p className="contact-message-text">{contact.message}</p>
                  </div>

                  {contact.meetingStatus === 'scheduled' && contact.meetingDate && (
                    <div className="contact-detail-row">
                      <span className="contact-detail-label"><Calendar size={14} /> Meeting:</span>
                      <span>{new Date(contact.meetingDate).toLocaleString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}</span>
                    </div>
                  )}

                  {contact.meetingNotes && (
                    <div className="contact-detail-row">
                      <span className="contact-detail-label">Notes:</span>
                      <span>{contact.meetingNotes}</span>
                    </div>
                  )}

                  <div className="contact-card-actions">
                    {contact.meetingStatus !== 'scheduled' && contact.meetingStatus !== 'completed' && (
                      <button className="contact-action-btn schedule" onClick={() => handleSetMeeting(contact)}>
                        <Calendar size={16} /> Schedule Meeting
                      </button>
                    )}
                    <button className="contact-action-btn email-btn" onClick={() => window.open(`mailto:${contact.email}`)}>
                      <Mail size={16} /> Send Email
                    </button>
                    <button className="contact-action-btn delete" onClick={() => handleDelete(contact._id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Meeting Scheduling Modal */}
      {meetingModal && (
        <div className="modal-overlay" onClick={() => setMeetingModal(null)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule Meeting</h3>
              <button className="modal-close" onClick={() => setMeetingModal(null)}>&times;</button>
            </div>
            <form onSubmit={handleMeetingSubmit} className="modal-body">
              <p style={{ marginBottom: '20px', color: 'var(--admin-text-muted)' }}>
                Schedule a meeting with <strong>{meetingModal.name}</strong>
              </p>
              <div className="form-group">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  value={meetingModal.meetingDate}
                  onChange={(e) => setMeetingModal({ ...meetingModal, meetingDate: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Meeting Notes (Optional)</label>
                <textarea
                  value={meetingModal.meetingNotes}
                  onChange={(e) => setMeetingModal({ ...meetingModal, meetingNotes: e.target.value })}
                  placeholder="Add notes about the meeting purpose..."
                  rows="3"
                  className="form-textarea"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setMeetingModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  <Calendar size={16} /> Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
