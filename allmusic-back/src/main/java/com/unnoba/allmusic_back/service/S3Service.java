package com.unnoba.allmusic_back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class S3Service {

    @Value("${AWS_S3_BUCKET_NAME}")
    private String bucketName;


    private final S3Client s3Client;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(String folder, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

        // Genéro nombre con fecha y hora actual
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String newFileName = timestamp + extension;

        String newFilePath = folder + newFileName;

        try (InputStream inputStream = file.getInputStream()) {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(newFilePath)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen a S3", e);
        }

        return s3Client.utilities().getUrl(b -> b.bucket(bucketName).key(newFilePath)).toString();

    }
}
