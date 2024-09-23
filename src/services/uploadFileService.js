import * as AWS from "aws-sdk";
import {v4 as uuidv4} from "uuid";

export class UploadFileService {
    async upload(file, folder){
        const s3 = new AWS.S3({
            endpoint: new AWS.Endpoint('https://storage.yandexcloud.net'),
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        })

        const prom = await new Promise((resolve, reject) => {
            s3.upload({
                Bucket: 'like2024',
                Key: folder + '/' + uuidv4() + '.' + file.type.split('/')[1],
                Body: file,
                ContentType: file.type
            }, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            })
        })

        return prom.Location
    }

    async uploadVideo(file, folder){
        const s3 = new AWS.S3({
            endpoint: new AWS.Endpoint('https://storage.yandexcloud.net'),
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        })

        const prom = await new Promise((resolve, reject) => {
            s3.upload({
                Bucket: 'like2024',
                Key: folder + '/' + uuidv4() + '.mp4',
                Body: file,
                ContentType: file.type
            }, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            })
        })

        return prom.Location
    }

    async uploadBlob(file, folder){
        const s3 = new AWS.S3({
            endpoint: new AWS.Endpoint('https://storage.yandexcloud.net'),
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        })

        const prom = await new Promise((resolve, reject) => {
            s3.upload({
                Bucket: 'like2024',
                Key: folder + '/' + uuidv4() + '.jpeg',
                Body: file,
                ContentType: file.type
            }, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            })
        })

        return prom.Location
    }
}
