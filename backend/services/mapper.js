function mapRecord(row, mapping) {
  return {
    created_at: new Date().toISOString(),

    name: row[mapping.name] || "",

    email: row[mapping.email] || "",

    country_code: row[mapping.country_code] || "",

    mobile_without_country_code:
      row[mapping.mobile_without_country_code] || "",

    company: row[mapping.company] || "",

    city: row[mapping.city] || "",

    state: row[mapping.state] || "",

    country: row[mapping.country] || "",

    lead_owner: "",

    crm_status: "New",

    crm_note: "",

    data_source: "CSV Import",

    possession_time: "",

    description: "",
  };
}

module.exports = {
  mapRecord,
};