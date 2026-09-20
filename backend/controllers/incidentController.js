const dynamoClient = require('../config/aws');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const { createReportItem } = require('../models/reportModel');
const { createIncidentItem } = require('../models/incidentModel');
const { analyzeReport } = require('../services/aiService');


exports.createReport = async (req, res) => {
    try {
        const { name, phone, rawText, lat, lng } = req.body;

        if (!rawText || lat == null || lng == null) {
            return res.status(400).json({
                message: "Required details missing"
            });
        }

        const aiData = await analyzeReport({ rawText });


        const incidentData = createIncidentItem({
            aiData,
            lat,
            lng,
        });

        await docClient.send(
            new PutCommand({
                TableName: "Incidents",
                Item: incidentData
            })
        );

        const reportData = createReportItem({
            name,
            phone,
            rawText,
            lat,
            lng,
        },
            incidentData.incidentId
        );

        await docClient.send(
            new PutCommand({
                TableName: "Reports",
                Item: reportData
            })
        );

        res.status(201).json({
            success: true,
            message: "Report submitted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


exports.getIncidents = async (req, res) => {
    try {
        const command = new ScanCommand({
            TableName: "Incidents"
        });

        const result = await docClient.send(command);

        res.status(200).json({
            success: true,
            message: "All incidents fetched successfully!",
            data: result.Items
        });

    } catch (error) {
        console.error("Server Error", error);
        res.status(500).json({
            success: false,
            message: "Incidents not fetched at the moment."
        });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const { incidentId, status } = req.body;

        if (!incidentId || !status) {
            return res.status(400).json({
                success: false,
                message: "incidentId and status are required"
            });
        }

        const command = new UpdateCommand({
            TableName: "Incidents",

            Key: {
                incidentId: incidentId
            },

            UpdateExpression: "SET #s = :status",

            ExpressionAttributeNames: {
                "#s": "status"
            },

            ExpressionAttributeValues: {
                ":status": status
            },

            ReturnValues: "ALL_NEW"
        });

        const result = await docClient.send(command);

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: result.Attributes
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update status"
        });
    }
}

