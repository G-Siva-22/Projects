const { Project } = require('../../models');
const { User } = require('../../models');
const { ProjectStatus } = require('../../constants/projectStatus');
const { ErrorMessages } = require('../../constants/errorMessages');

// Create a new project
const createProject = async (req, res) => {
  const { title, description, mentor_id } = req.body;

  try {
    const mentor = await User.findByPk(mentor_id);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(400).json({ error: ErrorMessages.USER_NOT_FOUND });
    }
    console.log(req.user.user.id)

    const project = await Project.create({
      title,
      description,
      created_by_id: req.user.user.id,
      mentor_id,
    });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

// Fetch all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { status: ProjectStatus.ACTIVE },
      include: [{ model: User, as: 'mentor' }, {model: User, as: 'creator', attributes: ['id', 'name']}],
      
    });

    return res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

// Fetch a specific project
const getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId, {
      include: [{ model: User, as: 'mentor' }]
    });

    if (!project) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    return res.status(200).json({ success: true, project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

// Update project status
const updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    project.status = status;
    await project.save();

    return res.status(200).json({ success: true, project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProjectStatus
};
