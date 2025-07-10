const express = require("express");
const {
    createMonthlyReport,
    getAllMonthlyReports,
    getMonthlyReportById,
    updateMonthlyReport,
    deleteMonthlyReport
} = require("../handlers/monthlyReportsHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

// Route to get all monthly reports
router.get("/monthly-reports", authenticate, getAllMonthlyReports);

// Route to get a specific monthly report by ID
router.get("/monthly-reports/:monthlyReportId", authenticate, getMonthlyReportById);

// Route to create a new monthly report
router.post("/projects/:projectId/monthly-reports", authenticate, createMonthlyReport);

// Route to update a monthly report
router.put("/monthly-reports/:monthlyReportId", authenticate, updateMonthlyReport);

// Route to delete a monthly report
router.delete("/monthly-reports/:monthlyReportId", authenticate, deleteMonthlyReport);  

module.exports = router;
