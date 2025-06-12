'use client';

import { useState, useEffect } from 'react';

function EditModal({ item, onSave, onCancel, type }) {
    const [formData, setFormData] = useState(item);

    useEffect(() => {
        setFormData(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="glass-card-strong p-8 rounded-2xl shadow-2xl w-full max-w-md text-text-light dark:text-text-dark border border-white/20">
                <h2 className="text-2xl font-bold mb-4 text-primary-light dark:text-primary-dark">Edit {type}</h2>
                <form onSubmit={handleSubmit}>
                    {type === 'Team Member' && (
                        <>
                            <label className="block mb-1 font-semibold">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                            <label className="block mb-1 font-semibold">Role</label>
                            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                            <label className="block mb-1 font-semibold">Image URL</label>
                            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                            <label className="block mb-1 font-semibold">LinkedIn URL</label>
                            <input type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="LinkedIn URL" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                            <label className="block mb-1 font-semibold">Group</label>
                            <select
                                name="group"
                                value={formData.group}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600"
                            >
                                <option value="Board Members">Board Members</option>
                                <option value="Executive Committee">Executive Committee</option>
                                <option value="Subcommittee">Subcommittee</option>
                            </select>
                        </>
                    )}
                    {type === 'Link' && (
                        <>
                            <label className="block mb-1 font-semibold">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                            <label className="block mb-1 font-semibold">URL</label>
                            <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" className="w-full p-2 mb-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                        </>
                    )}
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onCancel} className="glass-card-subtle hover:glass-hover bg-gray-500/80 hover:bg-gray-600/90 text-white font-bold py-2 px-4 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300">Cancel</button>
                        <button type="submit" className="glass-card-subtle hover:glass-hover bg-primary-light/80 hover:bg-primary-light/90 text-white font-bold py-2 px-4 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function AdminDashboard() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [links, setLinks] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', imageUrl: '', linkedinUrl: '', group: 'Subcommittee' });
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState('');

  useEffect(() => {
    fetchTeam();
    fetchLinks();
  }, []);

  const fetchTeam = async () => {
    try {
        const res = await fetch('/api/team');
        if (!res.ok) throw new Error('Failed to fetch team');
        const data = await res.json();
        setTeamMembers(data);
    } catch (error) {
        console.error(error);
    }
  };

  const fetchLinks = async () => {
    try {
        const res = await fetch('/api/linkinbio');
        if (!res.ok) throw new Error('Failed to fetch links');
        const data = await res.json();
        setLinks(data);
    } catch (error) {
        console.error(error)
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMember),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        setNewMember({ name: '', role: '', imageUrl: '', linkedinUrl: '', group: 'Subcommittee' });
        fetchTeam();
    } catch (error) {
        alert(error.message);
    }
  };
  
  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/linkinbio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLink),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        setNewLink({ title: '', url: '' });
        fetchLinks();
    } catch (error) {
        alert(error.message)
    }
  };

  const handleTeamDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
        try {
            const res = await fetch(`/api/team/${memberId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete member');
            fetchTeam();
        } catch (error) {
            console.error(error);
            alert('Failed to delete member');
        }
    }
  };

  const handleLinkDelete = async (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
        try {
            const res = await fetch(`/api/linkinbio/${linkId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete link');
            fetchLinks();
        } catch(error) {
            console.error(error);
            alert('Failed to delete link');
        }
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setEditingType(type);
  }

  const handleSave = async (updatedItem) => {
    const { id, ...data } = updatedItem;
    const url = editingType === 'Team Member' ? `/api/team/${id}` : `/api/linkinbio/${id}`;
    
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Failed to update ${editingType}`);

        if (editingType === 'Team Member') {
            fetchTeam();
        } else {
            fetchLinks();
        }
    } catch (error) {
        console.error(error);
        alert(`Failed to update ${editingType}`);
    } finally {
        setEditingItem(null);
        setEditingType('');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 text-text-light dark:text-text-dark pb-20">
        {editingItem && (
            <EditModal 
                item={editingItem}
                onSave={handleSave}
                onCancel={() => setEditingItem(null)}
                type={editingType}
            />
        )}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-primary-light dark:text-primary-dark">Admin Dashboard</h1>
      
      {/* Team Members Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow flex flex-col justify-between">
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(member, 'Team Member')} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                <button onClick={() => handleTeamDelete(member.id)} className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleTeamSubmit} className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Add New Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                <input type="text" placeholder="Role" value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                <input type="text" placeholder="Image URL" value={newMember.imageUrl} onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                <input type="text" placeholder="LinkedIn URL" value={newMember.linkedinUrl} onChange={(e) => setNewMember({ ...newMember, linkedinUrl: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                <select
                    name="group"
                    value={newMember.group}
                    onChange={(e) => setNewMember({ ...newMember, group: e.target.value })}
                    className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600 md:col-span-2"
                >
                    <option value="Board Members">Board Members</option>
                    <option value="Executive Committee">Executive Committee</option>
                    <option value="Subcommittee">Subcommittee</option>
                </select>
            </div>
            <button type="submit" className="mt-4 glass-card-strong hover:glass-hover bg-gray-800/80 hover:bg-gray-900/90 dark:bg-gray-200/80 dark:hover:bg-white/90 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-800/20 transition-all duration-300 transform hover:scale-105">Add Member</button>
        </form>
      </div>

      {/* Link in Bio Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Link in Bio</h2>
        <div className="space-y-4 mb-6">
            {links.map(link => (
                <div key={link.id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow flex justify-between items-center flex-wrap">
                    <div className="mr-4">
                        <p><span className="font-bold">{link.title}:</span> {link.url}</p>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <button onClick={() => handleEdit(link, 'Link')} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                        <button onClick={() => handleLinkDelete(link.id)} className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                    </div>
                </div>
            ))}
        </div>
        <form onSubmit={handleLinkSubmit} className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Add New Link</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
                <input type="text" placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className="w-full p-2 rounded bg-background-light dark:bg-background-dark border border-gray-600" />
            </div>
            <button type="submit" className="mt-4 glass-card-strong hover:glass-hover bg-gray-800/80 hover:bg-gray-900/90 dark:bg-gray-200/80 dark:hover:bg-white/90 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-800/20 transition-all duration-300 transform hover:scale-105">Add Link</button>
        </form>
      </div>
    </div>
  );
} 