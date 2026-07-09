const express = require("express");
const multer = require("multer");
const Papa = require("papaparse");
const { extractCRM } = require("../services/gemini");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
async function processBatch(batch, batchNumber) {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `📦 Batch ${batchNumber} | Attempt ${attempt}/${maxRetries}`
      );

      const result = await extractCRM(batch);

      return result;
    } catch (err) {
      console.log(
        `❌ Batch ${batchNumber} failed (Attempt ${attempt})`
      );

      if (attempt === maxRetries) {
        throw err;
      }

      console.log("⏳ Waiting 15 seconds before retry...");

      await new Promise((resolve) =>
        setTimeout(resolve, 15000)
      );
    }
  }
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV uploaded",
      });
    }

    const csvText = req.file.buffer.toString("utf8");

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const records = parsed.data;

    console.log("🚀 Starting AI Import...");

    const batchSize = 25;
    const totalBatches = Math.ceil(records.length / batchSize);

    let aiResponse = [];
    let imported = 0;
    let skipped = 0;
    let failedBatches = [];
    const seenRecords = new Set();
    let duplicateCount = 0;

    const startTime = Date.now();

    for (let i = 0; i < records.length; i += batchSize) {
      const batchNumber = Math.floor(i / batchSize) + 1;

      const batch = records.slice(i, i + batchSize);

      console.log(
        `📦 Batch ${batchNumber}/${totalBatches} (${batch.length} records)`
      );

      try {
        const result = await processBatch(
  batch,
  batchNumber
);

aiResponse.push(...result);

imported += result.length;
skipped += batch.length - result.length;

        console.log(
          `✅ Batch ${batchNumber} completed (${result.length} imported)`
        );
      } catch (error) {
        console.error(
          `❌ Batch ${batchNumber} failed`
        );

        console.error(error.message);

        skipped += batch.length;

        failedBatches.push(batchNumber);

        // Continue with remaining batches
        continue;
      }
    }

    const processingTime = (
      (Date.now() - startTime) /
      1000
    ).toFixed(2);

    console.log("=================================");
    console.log("🎉 Import Finished");
    console.log("Total Rows :", records.length);
    console.log("Imported   :", imported);
    console.log("Skipped    :", skipped);
    console.log("Failed     :", failedBatches.length);
    console.log("Time       :", processingTime + " sec");
    console.log("=================================");

    res.json({
      success: true,
      totalRows: records.length,
      imported,
      skipped,
      failedBatches,
      processingTime,
      crmRecords: aiResponse,
    });

  } catch (err) {
    console.error("Upload Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;