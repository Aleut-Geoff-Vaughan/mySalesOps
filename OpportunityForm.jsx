import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OpportunityFormEnhanced = ({ 
  formData = {}, 
  setFormData, 
  agencies = [], 
  contacts = [], 
  activeStages = [], 
  getAgencyContacts = () => [], 
  editingId, 
  onSubmit, 
  onCancel 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    financial: false,
    dates: false,
    contract: false,
    competitive: false,
    assessment: false,
    teaming: false,
    business: false,
    proposal: false,
    codes: false,
    status: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const Section = ({ title, sectionKey, children }) => (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
      >
        <h3 className="text-md font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      {/* Basic Information */}
      <Section title="Basic Information" sectionKey="basic">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Name *</label>
          <input
            type="text"
            value={formData.opportunity_name || ''}
            onChange={(e) => setFormData({...formData, opportunity_name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agency *</label>
            <select
              value={formData.agency_id || ''}
              onChange={(e) => setFormData({...formData, agency_id: Number(e.target.value), primary_contact_id: ''})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Agency</option>
              {agencies.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
            <select
              value={formData.primary_contact_id || ''}
              onChange={(e) => setFormData({...formData, primary_contact_id: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={!formData.agency_id}
            >
              <option value="">Select Contact</option>
              {formData.agency_id && getAgencyContacts(formData.agency_id).map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
            <select
              value={formData.stage || ''}
              onChange={(e) => setFormData({...formData, stage: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              {activeStages.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.opportunity_status || ''}
              onChange={(e) => setFormData({...formData, opportunity_status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={formData.priority || ''}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </Section>

      {/* Financial Information */}
      <Section title="Financial Information" sectionKey="financial">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
            <input
              type="number"
              value={formData.value || ''}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Contract Value (TCV)</label>
            <input
              type="number"
              value={formData.total_contract_value || ''}
              onChange={(e) => setFormData({...formData, total_contract_value: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Revenue</label>
            <input
              type="number"
              value={formData.expected_revenue || ''}
              onChange={(e) => setFormData({...formData, expected_revenue: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Winning Price</label>
            <input
              type="number"
              value={formData.winning_price || ''}
              onChange={(e) => setFormData({...formData, winning_price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target GM %</label>
            <input
              type="number"
              value={formData.target_gm_percent || ''}
              onChange={(e) => setFormData({...formData, target_gm_percent: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target OI %</label>
            <input
              type="number"
              value={formData.target_oi_percent || ''}
              onChange={(e) => setFormData({...formData, target_oi_percent: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%) *</label>
            <input
              type="number"
              value={formData.probability || ''}
              onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              max="100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">P-Go (%)</label>
            <input
              type="number"
              value={formData.p_go || ''}
              onChange={(e) => setFormData({...formData, p_go: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Category</label>
            <select
              value={formData.forecast_category || ''}
              onChange={(e) => setFormData({...formData, forecast_category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Pipeline">Pipeline</option>
              <option value="Best Case">Best Case</option>
              <option value="Commit">Commit</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.included_in_forecast || false}
              onChange={(e) => setFormData({...formData, included_in_forecast: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Included in Forecast</span>
          </label>
        </div>
      </Section>

      {/* Dates */}
      <Section title="Key Dates" sectionKey="dates">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date *</label>
            <input
              type="date"
              value={formData.close_date || ''}
              onChange={(e) => setFormData({...formData, close_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Start Date</label>
            <input
              type="date"
              value={formData.project_start_date || ''}
              onChange={(e) => setFormData({...formData, project_start_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Planned RFP Release</label>
            <input
              type="date"
              value={formData.planned_rfp_release_date || ''}
              onChange={(e) => setFormData({...formData, planned_rfp_release_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actual RFP Release</label>
            <input
              type="date"
              value={formData.actual_rfp_release_date || ''}
              onChange={(e) => setFormData({...formData, actual_rfp_release_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Planned Proposal Submission</label>
            <input
              type="date"
              value={formData.planned_proposal_submission_date || ''}
              onChange={(e) => setFormData({...formData, planned_proposal_submission_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actual Proposal Submission</label>
            <input
              type="date"
              value={formData.actual_proposal_submission_date || ''}
              onChange={(e) => setFormData({...formData, actual_proposal_submission_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* Contract Information */}
      <Section title="Contract Information" sectionKey="contract">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
            <select
              value={formData.contract_type || ''}
              onChange={(e) => setFormData({...formData, contract_type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="FFP">Firm Fixed Price (FFP)</option>
              <option value="T&M">Time & Materials (T&M)</option>
              <option value="Cost Plus">Cost Plus</option>
              <option value="IDIQ">IDIQ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Solicitation Number</label>
            <input
              type="text"
              value={formData.solicitation_number || ''}
              onChange={(e) => setFormData({...formData, solicitation_number: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Type</label>
            <select
              value={formData.acquisition_type || ''}
              onChange={(e) => setFormData({...formData, acquisition_type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Full and Open">Full and Open</option>
              <option value="Set Aside">Set Aside</option>
              <option value="Sole Source">Sole Source</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
            <input
              type="number"
              value={formData.duration || ''}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Place of Performance</label>
          <input
            type="text"
            value={formData.place_of_performance || ''}
            onChange={(e) => setFormData({...formData, place_of_performance: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.direct_award || false}
              onChange={(e) => setFormData({...formData, direct_award: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Direct Award</span>
          </label>
        </div>
      </Section>

      {/* Competitive Information */}
      <Section title="Competitive Information" sectionKey="competitive">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent</label>
            <input
              type="text"
              value={formData.incumbent || ''}
              onChange={(e) => setFormData({...formData, incumbent: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent Contract #</label>
            <input
              type="text"
              value={formData.incumbent_contract_number || ''}
              onChange={(e) => setFormData({...formData, incumbent_contract_number: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent Award Date</label>
            <input
              type="date"
              value={formData.incumbent_award_date || ''}
              onChange={(e) => setFormData({...formData, incumbent_award_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incumbent Expire Date</label>
            <input
              type="date"
              value={formData.incumbent_expire_date || ''}
              onChange={(e) => setFormData({...formData, incumbent_expire_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DB Competitor</label>
            <input
              type="text"
              value={formData.db_competitor || ''}
              onChange={(e) => setFormData({...formData, db_competitor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Winning Competitor</label>
            <input
              type="text"
              value={formData.winning_competitor || ''}
              onChange={(e) => setFormData({...formData, winning_competitor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* Assessment Scores */}
      <Section title="Assessment & Scoring" sectionKey="assessment">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitive Positioning</label>
            <select
              value={formData.competitive_positioning || ''}
              onChange={(e) => setFormData({...formData, competitive_positioning: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            >
              <option value="">Select</option>
              <option value="Strong">Strong</option>
              <option value="Medium">Medium</option>
              <option value="Weak">Weak</option>
            </select>
            <textarea
              placeholder="Notes..."
              value={formData.competitive_positioning_notes || ''}
              onChange={(e) => setFormData({...formData, competitive_positioning_notes: e.target.value})}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Intent to Buy</label>
            <select
              value={formData.client_intent_to_buy || ''}
              onChange={(e) => setFormData({...formData, client_intent_to_buy: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <textarea
              placeholder="Notes..."
              value={formData.client_intent_to_buy_notes || ''}
              onChange={(e) => setFormData({...formData, client_intent_to_buy_notes: e.target.value})}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Insight</label>
            <select
              value={formData.customer_insight || ''}
              onChange={(e) => setFormData({...formData, customer_insight: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            >
              <option value="">Select</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <textarea
              placeholder="Notes..."
              value={formData.customer_insight_notes || ''}
              onChange={(e) => setFormData({...formData, customer_insight_notes: e.target.value})}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationships</label>
            <select
              value={formData.relationships || ''}
              onChange={(e) => setFormData({...formData, relationships: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            >
              <option value="">Select</option>
              <option value="Strong">Strong</option>
              <option value="Moderate">Moderate</option>
              <option value="Weak">Weak</option>
            </select>
            <textarea
              placeholder="Notes..."
              value={formData.relationships_notes || ''}
              onChange={(e) => setFormData({...formData, relationships_notes: e.target.value})}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* Teaming & Personnel */}
      <Section title="Teaming & Personnel" sectionKey="teaming">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teaming Strategy</label>
          <select
            value={formData.teaming || ''}
            onChange={(e) => setFormData({...formData, teaming: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
          >
            <option value="">Select</option>
            <option value="Prime">Prime</option>
            <option value="Subcontractor">Subcontractor</option>
            <option value="Joint Venture">Joint Venture</option>
            <option value="Teaming Partner">Teaming Partner</option>
          </select>
          <textarea
            placeholder="Teaming Notes..."
            value={formData.teaming_notes || ''}
            onChange={(e) => setFormData({...formData, teaming_notes: e.target.value})}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Personnel</label>
          <textarea
            value={formData.key_personnel || ''}
            onChange={(e) => setFormData({...formData, key_personnel: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="List key personnel and their roles..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Manager</label>
          <select
            value={formData.proposal_manager_contact_id || ''}
            onChange={(e) => setFormData({...formData, proposal_manager_contact_id: Number(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Contact</option>
            {contacts.map(c => (
              <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
            ))}
          </select>
        </div>
      </Section>

      {/* Business Classification */}
      <Section title="Business Classification" sectionKey="business">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Business Line</label>
            <input
              type="text"
              value={formData.primary_business_line || ''}
              onChange={(e) => setFormData({...formData, primary_business_line: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary NAICS Code</label>
            <input
              type="text"
              value={formData.primary_naics_code || ''}
              onChange={(e) => setFormData({...formData, primary_naics_code: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
            <input
              type="text"
              value={formData.portfolio || ''}
              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Stream</label>
            <input
              type="text"
              value={formData.revenue_stream || ''}
              onChange={(e) => setFormData({...formData, revenue_stream: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
          <input
            type="text"
            value={formData.solution || ''}
            onChange={(e) => setFormData({...formData, solution: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Solution Details</label>
          <textarea
            value={formData.solution_details || ''}
            onChange={(e) => setFormData({...formData, solution_details: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </Section>

      {/* Proposal Information */}
      <Section title="Proposal Information" sectionKey="proposal">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Tech Volume</label>
            <select
              value={formData.proposal_tech_volume || ''}
              onChange={(e) => setFormData({...formData, proposal_tech_volume: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Pricing</label>
            <select
              value={formData.proposal_pricing || ''}
              onChange={(e) => setFormData({...formData, proposal_pricing: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Competitive">Competitive</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Orals / Site Visit</label>
          <select
            value={formData.orals_site_visit || ''}
            onChange={(e) => setFormData({...formData, orals_site_visit: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
          >
            <option value="">Select</option>
            <option value="Required">Required</option>
            <option value="Optional">Optional</option>
            <option value="Not Required">Not Required</option>
          </select>
          <textarea
            placeholder="Orals/Site Visit Notes..."
            value={formData.orals_site_visit_notes || ''}
            onChange={(e) => setFormData({...formData, orals_site_visit_notes: e.target.value})}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Comments</label>
          <textarea
            value={formData.proposal_comments || ''}
            onChange={(e) => setFormData({...formData, proposal_comments: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Response Folder URL</label>
          <input
            type="text"
            value={formData.response_folder || ''}
            onChange={(e) => setFormData({...formData, response_folder: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="https://..."
          />
        </div>
      </Section>

      {/* Project Codes & References */}
      <Section title="Project Codes & References" sectionKey="codes">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">B&P Code</label>
            <input
              type="text"
              value={formData.bp_code || ''}
              onChange={(e) => setFormData({...formData, bp_code: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CostPoint Project Code</label>
            <input
              type="text"
              value={formData.costpoint_project_code || ''}
              onChange={(e) => setFormData({...formData, costpoint_project_code: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GovWin ID</label>
            <input
              type="text"
              value={formData.govwin_id || ''}
              onChange={(e) => setFormData({...formData, govwin_id: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              maxLength="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Legacy ID</label>
            <input
              type="text"
              value={formData.legacy_id || ''}
              onChange={(e) => setFormData({...formData, legacy_id: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              maxLength="10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Link</label>
          <input
            type="text"
            value={formData.opportunity_link || ''}
            onChange={(e) => setFormData({...formData, opportunity_link: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="https://..."
          />
        </div>
      </Section>

      {/* Status Flags */}
      <Section title="Status & Flags" sectionKey="status">
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.budget_confirmed || false}
              onChange={(e) => setFormData({...formData, budget_confirmed: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Budget Confirmed</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.discovery_completed || false}
              onChange={(e) => setFormData({...formData, discovery_completed: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Discovery Completed</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.roi_analysis_completed || false}
              onChange={(e) => setFormData({...formData, roi_analysis_completed: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">ROI Analysis Completed</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.front_door || false}
              onChange={(e) => setFormData({...formData, front_door: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Front Door</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loss / No-Bid Reason</label>
          <input
            type="text"
            value={formData.loss_reason || ''}
            onChange={(e) => setFormData({...formData, loss_reason: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Feedback / Debrief</label>
          <textarea
            value={formData.customer_feedback || ''}
            onChange={(e) => setFormData({...formData, customer_feedback: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">General Notes</label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
        <button
          onClick={onSubmit}
          type="button"
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {editingId ? 'Update' : 'Create'} Opportunity
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OpportunityFormEnhanced;