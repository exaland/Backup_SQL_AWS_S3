import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { exec } from "child_process";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.AWS_BUCKET_NAME;
const backupFileName = `${process.env.BACKUP_FILE_NAME}${Date.now()}.sql`;
const backupFilePath = process.env.BACKUP_FILE_PATH;
const backupFileKey = `${backupFileName}`;

const mysqlDump = async () => {
    return new Promise((resolve, reject) => {
        exec(
            `mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PASSWORD}' ${process.env.DB_NAME} > ${backupFileName}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing mysqldump: ${error}`);
                    reject(error);
                } else {
                    console.log(`mysqldump output: ${stdout}`);
                    resolve(stdout);
                }
            }
        );
    });
};

const uploadBackupToS3 = async () => {
    try {
        const fileStream = fs.createReadStream(backupFileName);

        const readFile = fs.readFileSync(backupFileName);
        if (!readFile) {
            console.error("Error reading the backup file.");
            return;
        }

        console.log(`Uploading backup file: ${backupFileName} to S3 bucket: ${bucketName}`);    
        const uploadParams = {
            Bucket: bucketName,
            Key: `backups/${backupFileName}`,
            Body: readFile,   
        };

        const command = new PutObjectCommand(uploadParams);
        const data = await s3Client.send(command);  

        console.log(`Backup uploaded successfully: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error("Error uploading backup to S3:", error);
    }
};

const deleteBackupFile = () => {
    return new Promise((resolve, reject) => {
        fs.unlink(backupFileName, (err) => {
            if (err) {
                console.error(`Error deleting backup file: ${err}`);
                reject(err);
            } else {
                console.log(`Backup file deleted: ${backupFileName}`);
                resolve();
            }
        });
    });
}

const runBackupProcess = async () => {
    try {
        await mysqlDump();
        await uploadBackupToS3();
        await deleteBackupFile();
        console.log("Backup process completed successfully.");
    } catch (error) {
        console.error("Error during backup process:", error);
    }
};

runBackupProcess();