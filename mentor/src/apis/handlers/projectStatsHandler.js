const { ProjectStats } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

//create project stats
const createProjectStats = async (req, res) => {
  const { projectId } = req.params;
  const { views, likes, comments } = req.body;

  try {
    if (!views || !likes || !comments) {
      return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
    }

    const projectStats = await ProjectStats.create({
      project_id: projectId,
      views,
      likes,
      comments
    });

    return res.status(201).json({ success: true, projectStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

//get project stats
const getProjectStats = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectStats = await ProjectStats.findOne({
      where: { project_id: projectId }
    });

    if (!projectStats) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    return res.status(200).json({ success: true, projectStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

//update project stats
const updateProjectStats = async (req, res) => {
  const { projectId } = req.params;
  const { views, likes, comments } = req.body;

  try {
    const projectStats = await ProjectStats.findOne({
      where: { project_id: projectId }
    });

    if (!projectStats) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    if (views) projectStats.views = views;
    if (likes) projectStats.likes = likes;
    if (comments) projectStats.comments = comments;

    await projectStats.save();

    return res.status(200).json({ success: true, projectStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

//delete project stats
const deleteProjectStats = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectStats = await ProjectStats.findOne({
      where: { project_id: projectId }
    });

    if (!projectStats) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    await projectStats.destroy();

    return res.status(200).json({ success: true, message: 'Project stats deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

// Exporting the functions
module.exports = {
  createProjectStats,
  getProjectStats,
  updateProjectStats,
  deleteProjectStats
};