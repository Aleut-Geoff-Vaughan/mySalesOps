import React, { useState } from 'react';
import { AlertCircle, LogOut, Plus, Edit2, Trash2, DollarSign, TrendingUp, Clock, CheckCircle, Building2, Phone, Mail, MapPin, ChevronRight, User, Settings, Eye, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const SalesTracker = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'password123', role: 'admin', email: 'admin@company.com', firstName: 'Admin', lastName: 'User', isActive: true },
    { id: 2, username: 'sales', password: 'sales123', role: 'sales', email: 'sales@company.com', firstName: 'Sales', lastName: 'Rep', isActive: true },
    { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer', email: 'viewer@company.com', firstName: 'View', lastName: 'Only', isActive: true }
  ]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('opportunities');
  
  const [stages, setStages] = useState([
    { id: 1, name: 'Prospecting', order: 1, isActive: true },
    { id: 2, name: 'Qualification', order: 2, isActive: true },
    { id: 3, name: 'Proposal', order: 3, isActive: true },
    { id: 4, name: 'Negotiation', order: 4, isActive: true },
    { id: 5, name: 'Closed Won', order: 5, isActive: true },
    { id: 6, name: 'Closed Lost', order: 6, isActive: true }
  ]);

  const [agencyTypes, setAgencyTypes] = useState([
    { id: 1, name: 'Federal', isActive: true },
    { id: 2, name: 'State', isActive: true },
    { id: 3, name: 'County', isActive: true },
    { id: 4, name: 'Municipal', isActive: true }
  ]);

  const [agencies, setAgencies] = useState([
    { id: 1, name: 'Federal Bureau of Investigation', parentId: null, agencyType: 'Federal', address: '935 Pennsylvania Avenue NW', city: 'Washington', state: 'DC', zip: '20535', phone: '202-324-3000', website: 'www.fbi.gov', notes: 'Parent agency' },
    { id: 2, name: 'FBI Los Angeles', parentId: 1, agencyType: 'Federal', address: '11000 Wilshire Blvd', city: 'Los Angeles', state: 'CA', zip: '90024', phone: '310-477-6565', website: '', notes: 'Regional office' }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, agencyId: 2, firstName: 'John', lastName: 'Smith', title: 'Special Agent', email: 'john.smith@fbi.gov', phone: '310-477-6565', mobile: '310-555-0100', isPrimary: true, notes: 'Decision maker' }
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 1, opportunity_name: 'Cybersecurity Upgrade', agency_id: 2, primary_contact_id: 1, value: 250000, stage: 'Negotiation', probability: 75, close_date: '2024-11-15', notes: 'Follow up next week' }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formType, setFormType] = useState('opportunity');
  const [formData, setFormData] = useState({});
  const [expandedSections, setExpandedSections] = useState({ basic: true, financial: false, dates: false, notes: false });

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.isActive);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      setUserRole(user.role);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const getAgencyName = (id) => agencies.find(a => a.id === id)?.name || 'Unknown';
  const getParentAgencyName = (id) => {
    const agency = agencies.find(a => a.id === id);
    if (agency?.parentId) return agencies.find(a => a.id === agency.parentId)?.name || null;
    return null;
  };
  const getContactName = (id) => {
    const contact = contacts.find(c => c.id === id);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  };
  const getAgencyContacts = (agencyId) => contacts.filter(c => c.agencyId === agencyId);

  const calculateStats = () => {
    const total = opportunities.reduce((sum, opp) => sum + opp.value, 0);
    const weighted = opportunities.filter(opp => !opp.stage.includes('Closed')).reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
    const active = opportunities.filter(opp => !opp.stage.includes('Closed')).length;
    const won = opportunities.filter(opp => opp.stage === 'Closed Won').length;
    return { total, weighted, active, won };
  };

  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const openForm = (type, item = null) => {
    if (userRole === 'viewer') return;
    setFormType(type);
    setEditingId(item?.id || null);
    
    if (type === 'opportunity') {
      setFormData(item || { opportunity_name: '', agency_id: '', primary_contact_id: '', value: '', stage: 'Prospecting', probability: 10, close_date: '', notes: '' });
      setExpandedSections({ basic: true, financial: false, dates: false, notes: false });
    } else if (type === 'agency') {
      setFormData(item || { name: '', parentId: '', agencyType: 'Federal', address: '', city: '', state: '', zip: '', phone: '', website: '', notes: '' });
    } else if (type === 'contact') {
      setFormData(item || { agencyId: '', firstName: '', lastName: '', title: '', email: '', phone: '', mobile: '', isPrimary: false, notes: '' });
    } else if (type === 'stage') {
      setFormData(item || { name: '', order: stages.length + 1, isActive: true });
    } else if (type === 'agencyType') {
      setFormData(item || { name: '', isActive: true });
    } else if (type === 'user') {
      setFormData(item || { username: '', password: '', email: '', firstName: '', lastName: '', role: 'sales', isActive: true });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (formType === 'opportunity') {
      const oppData = { ...formData, value: Number(formData.value) };
      setOpportunities(prev => editingId ? prev.map(o => o.id === editingId ? { ...oppData, id: editingId } : o) : [...prev, { ...oppData, id: Date.now() }]);
    } else if (formType === 'agency') {
      setAgencies(prev => editingId ? prev.map(a => a.id === editingId ? { ...formData, id: editingId } : a) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'contact') {
      setContacts(prev => editingId ? prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'stage') {
      setStages(prev => editingId ? prev.map(s => s.id === editingId ? { ...formData, id: editingId } : s) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'agencyType') {
      setAgencyTypes(prev => editingId ? prev.map(t => t.id === editingId ? { ...formData, id: editingId } : t) : [...prev, { ...formData, id: Date.now() }]);
    } else if (formType === 'user') {
      if (editingId) {
        const updatedUser = { ...formData, id: editingId };
        if (!formData.password) updatedUser.password = users.find(u => u.id === editingId).password;
        setUsers(prev => prev.map(u => u.id === editingId ? updatedUser : u));
      } else {
        setUsers(prev => [...prev, { ...formData, id: Date.now() }]);
      }
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (type, id) => {
    if (userRole === 'viewer' || !window.confirm(`Delete this ${type}?`)) return;
    if (type === 'opportunity') setOpportunities(prev => prev.filter(o => o.id !== id));
    else if (type === 'agency') setAgencies(prev => prev.filter(a => a.id !== id));
    else if (type === 'contact') setContacts(prev => prev.filter(c => c.id !== id));
    else if (type === 'stage') setStages(prev => prev.filter(s => s.id !== id));
    else if (type === 'agencyType') setAgencyTypes(prev => prev.filter(t => t.id !== id));
    else if (type === 'user') setUsers(prev => prev.filter(u => u.id !== id));
  };

  const stats = calculateStats();
  const activeStages = stages.filter(s => s.isActive).sort((a, b) => a.order - b.order);
  const activeAgencyTypes = agencyTypes.filter(t => t.isActive);

  const Section = ({ title, sectionKey, children }) => (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button type="button" onClick={() => toggleSection(sectionKey)} className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg">
        <h3 className="text-md font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {expandedSections[sectionKey] && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Tracker</h1>
            <p className="text-gray-600">Sign in to manage opportunities</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter password" />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {loginError}
              </div>
            )}
            <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">Sign In</button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2 font-medium">Demo Credentials:</p>
            <p className="text-xs text-gray-500">admin / password123</p>
            <p className="text-xs text-gray-500">sales / sales123</p>
            <p className="text-xs text-gray-500">viewer / viewer123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Sales Opportunity Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, <span className="font-medium">{currentUser}</span></span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${userRole === 'admin' ? 'bg-purple-100 text-purple-800' : userRole === 'sales' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              {userRole === 'admin' ? <><Shield className="w-3 h-3" /> Admin</> : userRole === 'viewer' ? <><Eye className="w-3 h-3" /> View Only</> : 'Sales'}
            </span>
            <button onClick={() => { setIsAuthenticated(false); setCurrentUser(''); setUserRole(''); setUsername(''); setPassword(''); setActiveTab('opportunities'); }} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Pipeline</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Weighted Pipeline</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${Math.round(stats.weighted).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Deals</p>
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Closed Won</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.won}</p>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button onClick={() => setActiveTab('opportunities')} className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === 'opportunities' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>Opportunities</button>
            <button onClick={() => setActiveTab('agencies')} className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === 'agencies' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>Agencies</button>
            <button onClick={() => setActiveTab('contacts')} className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === 'contacts' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>Contacts</button>
            {userRole === 'admin' && (
              <button onClick={() => setActiveTab('configuration')} className={`pb-3 px-1 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'configuration' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>
                <Settings className="w-4 h-4" />Configuration
              </button>
            )}
          </div>
        </div>

        {activeTab !== 'configuration' && userRole !== 'viewer' && (
          <div className="mb-6">
            <button onClick={() => openForm(activeTab === 'opportunities' ? 'opportunity' : activeTab === 'agencies' ? 'agency' : 'contact')} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              <Plus className="w-5 h-5" />
              Add {activeTab === 'opportunities' ? 'Opportunity' : activeTab === 'agencies' ? 'Agency' : 'Contact'}
            </button>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Close Date</th>
                    {userRole !== 'viewer' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {opportunities.map(opp => (
                    <tr key={opp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{opp.opportunity_name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{getAgencyName(opp.agency_id)}</div>
                        {getParentAgencyName(opp.agency_id) && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <ChevronRight className="w-3 h-3" />{getParentAgencyName(opp.agency_id)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{getContactName(opp.primary_contact_id)}</td>
                      <td className="px-6 py-4 text-sm font-medium">${opp.value.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${opp.stage === 'Closed Won' ? 'bg-green-100 text-green-800' : opp.stage === 'Closed Lost' ? 'bg-red-100 text-red-800' : opp.stage === 'Negotiation' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {opp.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{opp.probability}%</td>
                      <td className="px-6 py-4 text-sm">{opp.close_date}</td>
                      {userRole !== 'viewer' && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => openForm('opportunity', opp)} className="text-indigo-600 hover:text-indigo-800"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete('opportunity', opp.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isFormOpen && formType === 'opportunity' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => { setIsFormOpen(false); setEditingId(null); setFormData({}); }}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'New'} Opportunity</h2>
                
                <Section title="Basic Information" sectionKey="basic">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Name *</label>
                    <input type="text" value={formData.opportunity_name || ''} onChange={(e) => setFormData({...formData, opportunity_name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agency *</label>
                      <select value={formData.agency_id || ''} onChange={(e) => setFormData({...formData, agency_id: Number(e.target.value), primary_contact_id: ''})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select Agency</option>
                        {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
                      <select value={formData.primary_contact_id || ''} onChange={(e) => setFormData({...formData, primary_contact_id: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" disabled={!formData.agency_id}>
                        <option value="">Select Contact</option>
                        {formData.agency_id && getAgencyContacts(formData.agency_id).map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
                    <select value={formData.stage || ''} onChange={(e) => setFormData({...formData, stage: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      {activeStages.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </Section>

                <Section title="Financial" sectionKey="financial">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value ($) *</label>
                      <input type="number" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%) *</label>
                      <input type="number" value={formData.probability || ''} onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="0" max="100" />
                    </div>
                  </div>
                </Section>

                <Section title="Dates" sectionKey="dates">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Close Date *</label>
                    <input type="date" value={formData.close_date || ''} onChange={(e) => setFormData({...formData, close_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </Section>

                <Section title="Notes" sectionKey="notes">
                  <textarea value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Additional notes..." />
                </Section>

                <div className="flex gap-3 pt-4 border-t">
                  <button onClick={handleSubmit} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">{editingId ? 'Update' : 'Create'}</button>
                  <button onClick={() => { setIsFormOpen(false); setEditingId(null); setFormData({}); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTracker;