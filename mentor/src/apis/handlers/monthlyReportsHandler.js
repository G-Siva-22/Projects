const { MonthlyReport } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

// Create a new monthly report
const createMonthlyReport = async (req, res) => {
    const { projectId } = req.params;
    const { reportDate, content } = req.body;

    try {
        if (!reportDate || !content) {
            return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
        }

        const monthlyReport = await MonthlyReport.create({
            project_id: projectId,
            report_date: reportDate,
            content
        })

        return res.status(201).json({ success: true, monthlyReport });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Get all monthly reports for a project
const getAllMonthlyReports = async (req, res) => {
    const { projectId } = req.params;    

    try {
        const monthlyReports = await MonthlyReport.findAll({
            where: { project_id: projectId }
        });

        if (!monthlyReports) {
            return res.status(404).json({ error: ErrorMessages.MONTHLY_REPORT_NOT_FOUND });
        }

        return res.status(200).json({ success: true, monthlyReports });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
    }
// Get a specific monthly report by ID
const getMonthlyReportById = async (req, res) => {
    const { monthlyReportId } = req.params;

    try {
        const monthlyReport = await MonthlyReport.findByPk(monthlyReportId);        
        if (!monthlyReport) {
            return res.status(404).json({ error: ErrorMessages.MONTHLY_REPORT_NOT_FOUND });
        }

        return res.status(200).json({ success: true, monthlyReport });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Update a specific monthly report by ID
const updateMonthlyReport = async (req, res) => {
    const { monthlyReportId } = req.params;
    const { reportDate, content } = req.body;

    try {
        const monthlyReport = await MonthlyReport.findByPk(monthlyReportId);
        if (!monthlyReport) {
            return res.status(404).json({ error: ErrorMessages.MONTHLY_REPORT_NOT_FOUND });
        }

        if (reportDate) monthlyReport.report_date = reportDate;
        if (content) monthlyReport.content = content;

        await monthlyReport.save();

        return res.status(200).json({ success: true, monthlyReport });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};  

// Delete a specific monthly report by ID
const deleteMonthlyReport = async (req, res) => {
    const { monthlyReportId } = req.params;

    try {
        const monthlyReport = await MonthlyReport.findByPk(monthlyReportId);
        if (!monthlyReport) {
            return res.status(404).json({ error: ErrorMessages.MONTHLY_REPORT_NOT_FOUND });
        }

        await monthlyReport.destroy();

        return res.status(200).json({ success: true, message: 'Monthly report deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

module.exports = {
    createMonthlyReport,
    getAllMonthlyReports,
    getMonthlyReportById,
    updateMonthlyReport,
    deleteMonthlyReport
};
