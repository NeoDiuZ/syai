'use client';

import { useState, useEffect } from 'react';

// --- Helper Components ---

function AdminForm({ title, children, onSubmit }) {
  return (
    <section className="bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </section>
  );
}

function FormField({ label, id, type = 'text', value, onChange, required = false, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      />
    </div>
  );
}

function SubmitButton({ text, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full sm:w-auto px-6 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300"
    >
      {isLoading ? 'Saving...' : text}
    </button>
  );
}

// --- Main Admin Page Component ---

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Link-in-bio state
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  // Team members state
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    imageUrl: '',
    linkedinUrl: '',
  });
  
  // --- Effects ---

  useEffect(() => {
    // This effect can be used to check if the user is already authenticated on page load
    // For simplicity, we are not implementing a "check auth" endpoint, but it's a good practice.
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchLinks();
      fetchTeam();
    }
  }, [isAuthenticated]);

  // --- API Functions ---

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/admin/linkinbio');
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (e) {
      console.error('Failed to fetch links', e);
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (e) {
      console.error('Failed to fetch team', e);
    }
  };

  // --- Handlers ---

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed.');
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleUpdateLinks = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const updatedLinks = newLink.title && newLink.url ? [...links, newLink] : links;

    try {
      const res = await fetch('/api/admin/linkinbio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLinks),
      });

      if (res.ok) {
        setLinks(updatedLinks);
        setNewLink({ title: '', url: '' });
        alert('Links updated successfully!');
      } else {
        alert('Failed to update links.');
      }
    } catch (e) {
      alert('An error occurred while updating links.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    // Note: This only updates the state. The user needs to click "Save Links" to persist.
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let teamToSave = [...team];
    if (newMember.name && newMember.role && newMember.imageUrl && newMember.linkedinUrl) {
      teamToSave.push(newMember);
    }

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamToSave),
      });

      if (res.ok) {
        setTeam(teamToSave);
        setNewMember({ name: '', role: '', imageUrl: '', linkedinUrl: '' });
        alert('Team updated successfully!');
      } else {
        alert('Failed to update team.');
      }
    } catch (e) {
      alert('An error occurred while updating the team.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = (index) => {
    const updatedTeam = team.filter((_, i) => i !== index);
    setTeam(updatedTeam);
    // Note: This only updates the state. The user needs to click "Save Team" to persist.
  };
  
  // --- Render Logic ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <FormField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="space-y-12">
          {/* Link-in-Bio Management */}
          <AdminForm title="Manage Link-in-Bio" onSubmit={handleUpdateLinks}>
            <div className="space-y-4 mb-6">
              {links.map((link, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700 rounded-md">
                  <div className="flex-grow">
                    <p className="font-semibold">{link.title}</p>
                    <p className="text-sm text-gray-400">{link.url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4 pt-4 border-t border-gray-700">Add New Link</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Link Title"
                id="newLinkTitle"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                placeholder="Our Website"
              />
              <FormField
                label="Link URL"
                id="newLinkUrl"
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="pt-4 text-right">
              <SubmitButton text="Save Links" isLoading={isLoading} />
            </div>
          </AdminForm>

          {/* Team Members Management */}
          <AdminForm title="Manage Team Members" onSubmit={handleUpdateTeam}>
            <div className="space-y-4 mb-6">
              {team.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700 rounded-md">
                  <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4 pt-4 border-t border-gray-700">Add New Team Member</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Name"
                id="newMemberName"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                required
                placeholder="John Doe"
              />
              <FormField
                label="Role"
                id="newMemberRole"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                required
                placeholder="Developer"
              />
              <FormField
                label="Image URL"
                id="newMemberImageUrl"
                value={newMember.imageUrl}
                onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
                required
                placeholder="/team/new-member.png"
              />
              <FormField
                label="LinkedIn URL"
                id="newMemberLinkedinUrl"
                type="url"
                value={newMember.linkedinUrl}
                onChange={(e) => setNewMember({ ...newMember, linkedinUrl: e.target.value })}
                required
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div className="pt-4 text-right">
              <SubmitButton text="Save Team" isLoading={isLoading} />
            </div>
          </AdminForm>
        </div>
      </div>
    </div>
  );
} 