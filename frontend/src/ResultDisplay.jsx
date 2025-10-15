import React from "react";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return <p>No response yet. Start by asking a question.</p>;
  }

  // Handle INVALID responses
  if (result.type === "INVALID") {
    return (
      <div className="error-message" style={{ color: "red", marginTop: "1rem" }}>
        <h3>⚠️ Invalid Query</h3>
        <p>{result.message}</p>
      </div>
    );
  }

  // Handle GENERAL responses
  if (result.type === "GENERAL") {
    return (
      <div className="general-response" style={{ marginTop: "1rem" }}>
        <h3>🪐 Assistant says:</h3>
        <p>{result.answer}</p>
      </div>
    );
  }

  // Handle IMAGE responses
  if (result.type === "IMAGE" && result.image) {
    const { title, description, date_created, url } = result.image;
    return (
      <div className="image-response" style={{ marginTop: "1rem" }}>
        <h3>📸 {title}</h3>
        <img src={url} alt={title} style={{ maxWidth: "100%", borderRadius: "8px" }} />
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Date Created:</strong> {new Date(date_created).toLocaleString()}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Full Image 🔗
        </a>
      </div>
    );
  }

  // Handle SQL responses
  if (result.type === "SQL") {
    return (
      <div className="sql-response" style={{ marginTop: "1rem" }}>
        <h3>📄 SQL Query:</h3>
        <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
          {result.sql}
        </pre>

        {/* Render data as a table */}
        {result.data && result.data.length > 0 ? (
          <div className="table-wrapper" style={{ marginTop: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {Object.keys(result.data[0]).map((key) => (
                    <th
                      key={key}
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        background: "#eee",
                      }}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No data available for this query.</p>
        )}
      </div>
    );
  }

  // Default fallback if type is unknown
  return (
    <div className="unknown-response" style={{ marginTop: "1rem" }}>
      <p>⚠️ Received an unknown response type.</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ResultDisplay;
