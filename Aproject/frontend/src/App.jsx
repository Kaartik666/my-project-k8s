import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [emails, setEmails] = useState([])
  const [showEmails, setShowEmails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingEmails, setIsLoadingEmails] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter an email address.' })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      await axios.post(`${API_URL}/api/emails`, { email })
      setMessage({ type: 'success', text: `"${email}" saved successfully!` })
      setEmail('')

      // Refresh the list if it's already visible
      if (showEmails) {
        fetchEmails()
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Something went wrong.'
      setMessage({ type: 'error', text: errMsg })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchEmails = async () => {
    setIsLoadingEmails(true)
    try {
      const res = await axios.get(`${API_URL}/api/emails`)
      setEmails(res.data)
    } catch (err) {
      setMessage({ type: 'error', text: 'Could not load emails.' })
    } finally {
      setIsLoadingEmails(false)
    }
  }

  const handleShowEmails = () => {
    if (!showEmails) {
      fetchEmails()
    }
    setShowEmails(!showEmails)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="card">
      <h1>Email Collector</h1>
      <p className="subtitle">Enter an email address and hit Submit to save it.</p>

      <div className="input-group">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <hr className="divider" />

      <button className="btn-show" onClick={handleShowEmails}>
        {showEmails ? 'Hide Emails' : 'Show Emails'}
      </button>

      {showEmails && (
        <div className="emails-list">
          {isLoadingEmails ? (
            <p className="loading">Loading...</p>
          ) : emails.length === 0 ? (
            <p className="empty-state">No emails saved yet.</p>
          ) : (
            emails.map((item) => (
              <div className="email-item" key={item._id}>
                <span className="email-dot" />
                {item.email}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default App