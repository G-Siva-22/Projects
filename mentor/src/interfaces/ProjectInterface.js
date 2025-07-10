const ProjectInterface = {
    id: 0,                // Unique identifier for the project
    title: "",            // Title of the project
    description: "",      // Brief description of the project
    created_by_id: 0,     // ID of the student who created the project
    mentor_id: 0,         // ID of the mentor assigned to the project
    status: "",           // Project status ('active' or 'completed')
    created_at: "",       // Date when the project was created
    updated_at: ""        // Date when the project was last updated
  };
  
  module.exports.ProjectInterface = ProjectInterface;
  